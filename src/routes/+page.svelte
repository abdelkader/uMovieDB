<script lang="ts">
    import LayoutHandler from "./LayoutHandler.svelte";
    import { LAYOUT } from "$lib/layout";
    import OrderHandler from "./OrderHandler.svelte";
    import Logo from "./Logo.svelte";

    import MovieCardVertical from "./MovieCardVertical.svelte";
    import MovieCardHorizantal from "./MovieCardHorizantal.svelte";

    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import Progress from "$lib/Progress.svelte";

    let files: any;
    let results: any[] = [];
    let circumference = 2 * Math.PI * 30;
    let percent = 0;

    let layout: LAYOUT = LAYOUT.Horizontal;

    function DispositionChanged(event: any) {
        event.detail.value == LAYOUT.Horizontal
            ? (layout = LAYOUT.Horizontal)
            : (layout = LAYOUT.Vertical);
    }

    function OrderChanged(event: any) {
        let selected = event.detail.value;
        results = results.sort((a, b) => {
            switch (selected) {
                case "title":
                    return a.title.localeCompare(b.title);
                case "year":
                    return a.release_date.localeCompare(b.release_date);
                case "rating":
                    return b.vote_average - a.vote_average;
                case "VoteCount":
                    return b.vote_count - a.vote_count;
            }
        });
    }
</script>

<div class="navbar bg-base-100 justify-between">
    <Logo></Logo>
    <div class="flex">
        <input
            multiple
            bind:files
            type="file"
            class="file-input file-input-bordered
                    file-input-sm file-input-accent
                     w-full max-w-xs mt-2"
            on:change={async () => {
                if (files) {
                    results = [];
                    const MovieWorker = await import(
                        "$lib/movie.worker?worker"
                    );
                    let movieWorker = new MovieWorker.default();
                    movieWorker.postMessage({ files });
                    movieWorker.onmessage = (event) => {
                        if (event.data) {
                            results = [...results, event.data];
                            percent = Math.ceil(
                                (results.length / files.length) * 100,
                            );
                        }
                    };
                }
            }}
            on:click={() => {
                files = null;
            }}
        />
        {#if results.length > 0}
            <Progress bind:circumference bind:percent />
        {/if}
    </div>

    <ThemeSwitcher />
</div>

<div class="md:container md:mx-auto mt-4">
    {#if results.length > 0}
        <div class="flex justify-between">
            <div class="flex">
                <LayoutHandler on:layout-changed={DispositionChanged} />
            </div>

            <div class="flex">
                <OrderHandler on:order-changed={OrderChanged} />
            </div>
        </div>
    {/if}

    <div class="flex flex-wrap gap-x-8 gap-y-4 mt-4">
        {#each results as movie}
            {#if layout == LAYOUT.Horizontal}
                <MovieCardHorizantal {movie} />
            {:else}
                <MovieCardVertical {movie} />
            {/if}
        {/each}
    </div>
</div>
