<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let selected = "title";

    function OrderChanged(value: string) {
        dispatch("order-changed", {
            value: selected,
        });
    }
</script>

<select
    bind:value={selected}
    on:change={() => OrderChanged(selected)}
    id="order-by"
    class="select select-accent select-sm w-full max-w-xs"
>
    <option disabled>Order by</option>
    <option selected value="title">Title</option>
    <option value="year">Year</option>
    <option value="rating">Rating</option>
    <option value="VoteCount">Vote Count</option>
</select>
