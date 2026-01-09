<script lang="ts">
    let { form } = $props();
</script>

<form method="POST">
    <label for="teacher-name">
        Teacher Shortname
        <input id="teacher-name" name="teacher-name" type="text" />
    </label>
    <button type="submit">Find</button>
</form>

{#if form}
    {#if 'timesAndRooms' in form}
        <form-response>
            <!--Display result as table-->
            {JSON.stringify(form.timesAndRooms)}
        </form-response>
    {:else if form.errorMessage}
        <error-message>
            {form.errorMessage}
        </error-message>
    {/if}
{/if}

<style>
    error-message {
        color: red;
    }
</style>
