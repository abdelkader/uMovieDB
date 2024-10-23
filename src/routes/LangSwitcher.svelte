<script lang="ts">
    import { locale, locales } from "svelte-i18n";

    let selected = "en";

    function OrderChanged(value: string) {
        locale.set(value);
    }
</script>

<select
    bind:value={selected}
    on:change={() => OrderChanged(selected)}
    id="order-by"
    class="select select-sm w-full max-w-xs"
>
    <option selected value="en">🇺🇸 English </option>
    <option value="fr">🇫🇷 Français</option>
    <option value="es">🇪🇸 Espanol</option>
</select>
