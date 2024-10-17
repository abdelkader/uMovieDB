<script lang="ts">
    import MovieCardVertical from "./MovieCardVertical.svelte";
    import MovieCardHorizantal from "./MovieCardHorizantal.svelte";

    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import Progress from "$lib/Progress.svelte";

    let files: any;
    let results: any[] = [];
    let circumference = 2 * Math.PI * 30;
    let percent = 0;
    let selected: string = "title";

    enum DISPOSITION {
        Horizontal,
        Vertical,
    }
    let disposition: DISPOSITION = DISPOSITION.Horizontal;
    function DispositionChanged() {
        console.log(disposition);
        if (disposition == DISPOSITION.Horizontal) {
            disposition = DISPOSITION.Vertical;
        } else {
            disposition = DISPOSITION.Horizontal;
        }
    }

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
        <img src="/movie-logo.png" alt="logo" class="h-10 w-12" />
        <a class="btn btn-ghost text-xl -m-3" href="/"> Movie Scraper </a>
    </div>
    <div class="flex-none">
        <ThemeSwitcher />
    </div>
</div>

<div class="md:container md:mx-auto mt-10">
    <div class="flex justify-center mb-8">
        <input
            multiple
            bind:files
            type="file"
            class="file-input file-input-bordered file-input-sm file-input-accent
                 w-full max-w-xs"
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
    </div>
    {#if results.length > 0}
        <Progress bind:circumference bind:percent />
    {/if}
    <div class="flex">
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text pr-2">Horizontal</span>
                <input
                    type="radio"
                    name="radio-10"
                    class="radio checked:bg-red-500"
                    checked={disposition == DISPOSITION.Horizontal}
                    on:click={() => {
                        DispositionChanged();
                    }}
                />
            </label>
        </div>
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text pr-2">Vertical</span>
                <input
                    type="radio"
                    name="radio-10"
                    class="radio checked:bg-blue-500"
                    checked={disposition == DISPOSITION.Vertical}
                    on:click={() => {
                        DispositionChanged();
                    }}
                />
            </label>
        </div>
    </div>
    <div class="flex flex-wrap gap-x-8 gap-y-4">
        {#each results as movie}
            {#if disposition == DISPOSITION.Horizontal}
                <MovieCardHorizantal {movie} />
            {:else}
                <MovieCardVertical {movie} />
            {/if}
        {/each}
    </div>
</div>
