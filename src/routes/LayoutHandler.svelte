<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { LAYOUT } from "$lib/layout";

    const dispatch = createEventDispatcher();

    let layout: LAYOUT = LAYOUT.Horizontal;
    function DispositionChanged(evt: any) {
        layout = evt.currentTarget.value;
        switch (layout) {
            case LAYOUT.Horizontal:
                layout = LAYOUT.Horizontal;
                break;
            case LAYOUT.Vertical:
                layout = LAYOUT.Vertical;
                break;
            case LAYOUT.Table:
                layout = LAYOUT.Table;
                break;
        }

        dispatch("layout-changed", {
            value: layout,
        });
    }
</script>

<div class="flex items-center me-4">
    <input
        type="radio"
        name="radio-10"
        class="radio checked:bg-red-500"
        checked={layout == LAYOUT.Horizontal}
        value={LAYOUT.Horizontal}
        on:change={DispositionChanged}
    />
    <label
        for="red-radio"
        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Horizontal</label
    >
</div>
<div class="flex items-center me-4">
    <input
        type="radio"
        name="radio-10"
        class="radio checked:bg-blue-500"
        checked={layout == LAYOUT.Vertical}
        value={LAYOUT.Vertical}
        on:change={DispositionChanged}
    />
    <label
        for="green-radio"
        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Vertical</label
    >
</div>
<div class="flex items-center me-4">
    <input
        type="radio"
        name="radio-10"
        class="radio checked:bg-blue-500"
        checked={layout == LAYOUT.Table}
        value={LAYOUT.Table}
        on:change={DispositionChanged}
    />
    <label
        for="green-radio"
        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Table</label
    >
</div>
