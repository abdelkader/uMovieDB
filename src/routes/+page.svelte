<script lang="ts">
    import Logo from "./Logo.svelte";

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
                <div class="flex items-center me-4">
                    <input
                        type="radio"
                        name="radio-10"
                        class="radio checked:bg-red-500"
                        checked={disposition == DISPOSITION.Horizontal}
                        on:click={() => {
                            DispositionChanged();
                        }}
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
                        checked={disposition == DISPOSITION.Vertical}
                        on:click={() => {
                            DispositionChanged();
                        }}
                    />
                    <label
                        for="green-radio"
                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Vertical</label
                    >
                </div>
            </div>

            <div class="flex">
                <select
                    bind:value={selected}
                    on:change={() => OrderChanged()}
                    id="order-by"
                    class="select select-accent select-sm w-full max-w-xs"
                >
                    <option disabled>Order by</option>
                    <option selected value="title">Title</option>
                    <option value="year">Year</option>
                    <option value="rating">Rating</option>
                    <option value="VoteCount">Vote Count</option>
                </select>
            </div>
        </div>
    {/if}

    <div class="flex flex-wrap gap-x-8 gap-y-4 mt-4">
        {#each results as movie}
            {#if disposition == DISPOSITION.Horizontal}
                <MovieCardHorizantal {movie} />
            {:else}
                <MovieCardVertical {movie} />
            {/if}
        {/each}
    </div>
</div>
