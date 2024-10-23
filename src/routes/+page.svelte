<script lang="ts">
    import LayoutHandler from "./LayoutHandler.svelte";
    import { LAYOUT } from "$lib/layout";
    import OrderHandler from "./OrderHandler.svelte";
    import Logo from "./Logo.svelte";

    import MovieCardVertical from "./MovieCardVertical.svelte";
    import MovieCardHorizantal from "./MovieCardHorizantal.svelte";
    import MovieCardTable from "./MovieCardTable.svelte";

    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import Progress from "$lib/Progress.svelte";
    import LangSwitcher from "./LangSwitcher.svelte";

    let files: any;
    let movies: any[] = [];
    let percent = 50;

    let layout: LAYOUT = LAYOUT.Horizontal;

    function DispositionChanged(event: any) {
        layout = event.detail.value;
    }

    function OrderChanged(event: any) {
        let selected = event.detail.value;
        movies = movies.sort((a, b) => {
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
    <div class="flex-0">
        <Logo />
    </div>
    <div class="flex-2">
        <input
            multiple
            bind:files
            type="file"
            class="file-input file-input-bordered
                    file-input-sm file-input-accent
                     w-full max-w-xs mt-2"
            on:change={async () => {
                if (files) {
                    movies = [];
                    const MovieWorker = await import(
                        "$lib/movie.worker?worker"
                    );
                    let movieWorker = new MovieWorker.default();
                    movieWorker.postMessage({ files });
                    movieWorker.onmessage = (event) => {
                        if (event.data) {
                            movies = [...movies, event.data];
                            percent = Math.ceil(
                                (movies.length / files.length) * 100,
                            );
                        }
                    };
                }
            }}
            on:click={() => {
                files = null;
            }}
        />
        <!-- {#if movies.length > 0} -->
        <Progress {percent} />
        <!-- {/if} -->
    </div>

    <div class="flex-end">
        <LangSwitcher />
        <ThemeSwitcher />
    </div>
</div>

<div class="md:container md:mx-auto mt-4">
    <!-- {#if movies.length > 0} -->
    <div class="flex justify-between">
        <div class="flex">
            <LayoutHandler on:layout-changed={DispositionChanged} />
        </div>

        {#if layout != LAYOUT.Table}
            <div class="flex">
                <OrderHandler on:order-changed={OrderChanged} />
            </div>
        {:else}
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
                <div
                    class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                    <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    id="table-search-users"
                    class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for movies"
                />
            </div>
        {/if}
    </div>

    <!-- {/if} -->

    <div class="flex flex-wrap gap-x-8 gap-y-4 mt-4">
        {#if layout == LAYOUT.Horizontal}
            <MovieCardHorizantal {movies} />
        {:else if layout == LAYOUT.Vertical}
            <MovieCardVertical {movies} />
        {:else}
            <MovieCardTable {movies} on:order-changed={OrderChanged} />
        {/if}
    </div>
</div>
