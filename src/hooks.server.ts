import { loggedInUntis } from "$lib";
import type { ServerInit } from "@sveltejs/kit";

export const init: ServerInit = async () => {
    if (loggedInUntis) {
        console.log("Untis logged in successfully as " + loggedInUntis.username);
    }
}
