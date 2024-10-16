<script lang="ts">
    import FileChooser from "./FileChooser.svelte";
    import MovieCard from "./MovieCard.svelte";
    import ThemeSwitcher from "./ThemeSwitcher.svelte";

    import Progress from "$lib/Progress.svelte";

    let files: any;
    let results: any[] = [];
    let circumference = 2 * Math.PI * 30;
    let percent = 0;
    let selected: string = "title";

    function OrderChanged() {
        results = results.sort((a, b) => {
            if (selected == "title") {
                return a.title.localeCompare(b.title);
            } else if (selected == "year") {
                return a.release_date.localeCompare(b.release_date);
            } else if (selected == "rating") {
                return b.vote_average - a.vote_average;
            } else if (selected == "VoteCount") {
                return b.vote_count - a.vote_count;
            }
        });
    }
</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/"> Movie Scraper </a>
    </div>
    <div class="flex-none">
        <ThemeSwitcher />
    </div>
</div>

<div class="container mx-auto mt-10">
    <div>
        <input
            multiple
            bind:files
            type="file"
            class="file-input file-input-bordered file-input-sm file-input-accent
                 w-full max-w-xs"
            on:change={async () => {
                if (files) {
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
    </div>
    {#if results.length > 0}
        <Progress bind:circumference bind:percent />
    {/if}

    {#await results then results}
        {#each results as movie}
            <MovieCard {movie} />
        {/each}
    {/await}
</div>
