<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { t } from "svelte-i18n";

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
    <option disabled>{$t("OrderBy")}</option>
    <option selected value="title"> {$t("Title")} </option>
    <option value="year">{$t("Year")}</option>
    <option value="rating">{$t("Rating")}</option>
    <option value="VoteCount">{$t("VoteCount")}</option>
</select>
