<script lang="ts">
    let { form, data } = $props();

    function formatTime(time: number) {
        const hour = Math.floor(time / 100);
        const minutes = time - hour * 100;
        return hour + ":" + String(minutes).padStart(2, "0");
    }
</script>

<main-view>
    <form method="POST">
        <label for="teacher-name">
            Teacher Shortname
        </label>
        <input id="teacher-name" name="teacher-name" type="text" />
        <button type="submit">Find!</button>
    </form>

    {#if form}
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
                                    <td-color>
                                        {#if lessonData}
                                            <lesson-data>
                                                {lessonData}
                                            </lesson-data>
                                        {:else}
                                            <lesson-empty></lesson-empty>
                                        {/if}
                                    </td-color>
                                </td>
                            {/each}
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    {#if form && form.errorMessage}
        <error-message>
            {form.errorMessage}
        </error-message>
    {/if}
</main-view>

<style>
    :root {
        color-scheme: light dark;
        --text: light-dark(#000, #FFF);
        --bg: light-dark(hsl(0, 0%, 93%), #242936);
        --time-bg: light-dark(hsl(0, 0%, 80%), hsl(223, 5%, 18%));
        --table-bg: light-dark(hsl(0, 00%, 80%), hsl(223, 5%, 16%));
        --lesson-bg: light-dark(hsl(42, 87%, 50%), hsl(42, 100%, 50%));
    }
    
    :global(body) {
        background-color: var(--bg);
        color: var(--text);
        height: 90vh;
        max-height: fit-content;
        width: 100vw;
        margin: 0;
        margin-top: 5vh;
    }

    main-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        gap: 2rem;
        justify-content: center;
        min-height: 66.6%;
        height: fit-content;
        padding-bottom: 5vh;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        & button {
            width: 70%;
            height: 2rem;
            font-weight: bold;
        }
    }

    table {
        border-spacing: 0px;
        border-radius: 1em;
        background-color: var(--table-bg);
        overflow: hidden;
    }

    th {
        width: max-content;
        padding: 0.5rem 1rem;
    }

    tbody tr {
        height: 4.5rem;
    }

    td {
        padding: 2px;
        height: 100%;
    }

    td-color:has(lesson-data) {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 10%;
        background-color: var(--lesson-bg);
    }

    thead,
    tbody tr td:nth-child(1) {
        background-color: var(--time-bg);
    }

    lesson-data {
        width: 100%;
        display: inline-block;
        text-align: center;
        margin-top: 1rem;
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
