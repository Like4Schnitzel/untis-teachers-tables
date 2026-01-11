<script lang="ts">
    let { form, data } = $props();
    console.log(data);
    console.log(form);

    function formatTime(time: number) {
        const hour = Math.floor(time / 100);
        const minutes = time - hour * 100;
        return hour + ":" + String(minutes).padStart(2, "0");
    }
</script>

<form method="POST">
    <label for="teacher-name">
        Teacher Shortname
        <input id="teacher-name" name="teacher-name" type="text" />
    </label>
    <button type="submit">Find</button>
</form>

<timetable-view>
    <table>
        <thead>
            <tr>
                <th>Lesson #</th>
                <th>Day 1</th>
                <th>Day 2</th>
                <th>Day 3</th>
                <th>Day 4</th>
                <th>Day 5</th>
                <th>Day 6</th>
                <th>Day 7</th>
            </tr>
        </thead>
        <tbody>
            {#each data.timeGrid[0].timeUnits as timeUnits}
                <tr>
                    <td>
                        <lesson-time>
                            <lesson-index>{timeUnits.name}</lesson-index>
                            <lesson-start-time>{formatTime(timeUnits.startTime)}</lesson-start-time>
                            <lesson-end-time>{formatTime(timeUnits.endTime)}</lesson-end-time>
                        </lesson-time>
                    </td>
                    {#if form?.timesAndRooms}
                        {#each form?.timesAndRooms[timeUnits.startTime] as lessonData}
                            <td>
                                {#if lessonData}
                                    <lesson-data>
                                        {lessonData}
                                    </lesson-data>
                                {:else}
                                    <lesson-empty></lesson-empty>
                                {/if}
                            </td>
                        {/each}
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</timetable-view>
{#if form && form.errorMessage}
    <error-message>
        {form.errorMessage}
    </error-message>
{/if}


<style>
    /* TODO better styling */

    td {
        border: 1px solid black;
    }
    
    lesson-time {
        display: grid;
        grid-template-columns: 1.5fr 1fr;

        & lesson-index {
            grid-column-start: 1;
            grid-column-end: 1;
            grid-row-start: 1;
            grid-row-end: 3;
            font-size: 2rem;
            text-align: center;
        }

        & lesson-start-time,
        & lesson-end-time {
            grid-column-start: 2;
            text-align: right;
        }
    }

    error-message {
        color: red;
    }
</style>
