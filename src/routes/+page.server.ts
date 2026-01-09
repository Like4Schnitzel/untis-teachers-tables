import { WebUntis, type WebAPITimetable } from "webuntis";
import { fail } from "@sveltejs/kit";
import { loggedInUntis as untis } from "$lib";

function lessonDate(lesson: WebAPITimetable) {
    const dateString = lesson.date.toString();
    const year = dateString.at(0)! + dateString.at(1)! + dateString.at(2)! + dateString.at(3)!;
    const month = dateString.at(4)! + dateString.at(5)!;
    const day = dateString.at(6)! + dateString.at(7)!;

    let timeString = lesson.startTime.toString();
    if (timeString.length < 4) timeString = "0" + timeString;
    const startHour = timeString.at(0)! + timeString.at(1)!;
    const startMinute = timeString.at(2)! + timeString.at(3)!;

    let endTimeString = lesson.startTime.toString();
    if (endTimeString.length < 4) endTimeString = "0" + endTimeString;
    const endHour = endTimeString.at(0)! + endTimeString.at(1)!;
    const endMinute = timeString.at(2)! + endTimeString.at(3)!;

    const start = new Date(parseInt(year), parseInt(month)-1, parseInt(day), parseInt(startHour), parseInt(startMinute));
    const end = new Date(parseInt(year), parseInt(month)-1, parseInt(day), parseInt(endHour), parseInt(endMinute));

    return {
        start,
        end
    }
}

// TODO export time grid

export const actions = {
    default: async ({ request }) => {
        try {
            const teacherName = (await request.formData()).get("teacher-name");
            if (!teacherName) {
                fail(400, { errorMessage: "Teacher name was not provided." });
            }

            const rooms = await untis.getRooms();
            const lessonsByRoom: {[x: string]: WebAPITimetable[]} = {};

            for (const room of rooms) {
                lessonsByRoom[room.name] = await untis.getTimetableForWeek(new Date(), room.id, WebUntis.TYPES.ROOM);
            }

            const lessons = Object.values(lessonsByRoom)
                .flat(1)
                .filter((l) => l.teachers.some((t) => t.element.name === teacherName))
                .map((l) => {
                    const time = lessonDate(l);
                    return {
                        room: l.rooms[0].element.name,
                        startTime: time.start,
                        endTime: time.end
                    }
                });
            return { timesAndRooms: lessons };
        } catch (e) {
            console.error(e);
            let errorMessage = e instanceof Error ? e.message : null;
            return fail(500, { errorMessage: errorMessage });
        }
    }
}
