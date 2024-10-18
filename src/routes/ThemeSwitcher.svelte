<script>
    import { fly } from "svelte/transition";
    import { Moon, Sun } from "lucide-svelte";
    import { theme, toggleTheme } from "$lib/theme";
</script>

<div class="flex">
    <button
        on:click={toggleTheme}
        aria-label="Toggle theme"
        class="inline-block align-middle"
    >
        {#if $theme === "dark"}
            <div in:fly={{ y: 10 }}>
                <Sun />
                <span>Light</span>
            </div>
        {:else}
            <div in:fly={{ y: -10 }}>
                <Moon />
                <span>Dark</span>
            </div>
        {/if}
    </button>
</div>

<style>
    button {
        padding-right: 20px;
        font-weight: inherit;
        background: none;
    }

    button > * {
        display: flex;
        gap: var(--size-2);
    }
</style>
