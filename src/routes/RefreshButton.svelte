<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import { RefreshCcw } from "lucide-svelte";
</script>

<button
    title="Refresh"
    class="btn btn-accent btn-sm ml-2 mt-2"
    on:click={() => {
        dispatch("refresh-clicked");
    }}
    ><RefreshCcw />
</button>
