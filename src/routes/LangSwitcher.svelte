<script lang="ts">
    import { locale } from "svelte-i18n";
</script>

<select
    bind:value={$locale}
    on:change={(event) => locale.set(event.target?.value)}
    id="order-by"
    class="select select-sm w-full max-w-xs"
>
    <option selected value="en">🇺🇸 English </option>
    <option value="fr">🇫🇷 Français</option>
    <option value="es">🇪🇸 Espanol</option>
</select>
