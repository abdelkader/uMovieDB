<script lang="ts">
    import { Divide } from "lucide-svelte";

    export let movie;

    function getYear(dateString: string) {
        return dateString.split("-")[0];
    }
</script>

{#if movie}
    <div
        class="flex flex-col bg-white border border-gray-200 rounded-lg
        shadow md:flex-row
        hover:bg-gray-100 dark:border-gray-700
         dark:bg-gray-800 dark:hover:bg-gray-700"
    >
        <img
            class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-s-lg"
            src="https://image.tmdb.org/t/p/w500/{movie.poster_path}"
            alt=""
        />
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {movie.title} ({getYear(movie.release_date)})
                {#if movie.vote_average >= 7}
                    <div class="badge badge-secondary">Hot!</div>
                {/if}
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {movie.overview}
            </p>
        </div>
    </div>
{/if}
