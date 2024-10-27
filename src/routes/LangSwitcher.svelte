<script lang="ts">
    import { locale } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";

    import { GetLocaleCode } from "$lib/utils";
    const dispatch = createEventDispatcher();

    function ChangeLanguage(event: Event) {
        let lang = event.target?.value;
        locale.set(lang);

        let value = GetLocaleCode(lang);
        dispatch("lang-changed", {
            value: value,
        });
    }
</script>

<select
    bind:value={$locale}
    on:change={(event) => ChangeLanguage(event)}
    id="order-by"
    class="select select-sm w-full max-w-xs"
>
    <option selected value="en">🇺🇸 English </option>
    <option value="fr">🇫🇷 Français</option>
    <option value="es">🇪🇸 Espanol</option>
</select>
