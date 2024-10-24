<script lang="ts">
    import { locale } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function LangChanged(event: Event) {
        let lang = event.target?.value;
        locale.set(lang);
        let value = "";
        switch (lang) {
            case "en":
                value = "en-US";
                break;
            case "fr":
                value = "fr-FR";
                break;
            case "es":
                value = "es-ES";
                break;
        }
        dispatch("lang-changed", {
            value: value,
        });
    }
</script>

<select
    bind:value={$locale}
    on:change={(event) => LangChanged(event)}
    id="order-by"
    class="select select-sm w-full max-w-xs"
>
    <option selected value="en">🇺🇸 English </option>
    <option value="fr">🇫🇷 Français</option>
    <option value="es">🇪🇸 Espanol</option>
</select>
