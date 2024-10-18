<script lang="ts">
    export let movie;

    function getYear(dateString: string) {
        return dateString.split("-")[0];
    }
</script>

{#if movie}
    <div class="flex flex-row pt-2">
        <div
            class="relative flex flex-col md:flex-row
        md:space-x-5 space-y-3
        md:space-y-0 rounded-xl shadow-lg p-3 max-w-md
        md:max-w-3xl mx-auto border border-white bg-white
        dark:border-gray-700
         dark:bg-gray-800"
        >
            <div
                class=" w-full md:w-1/3 bg-white grid place-items-center
             dark:border-gray-700
         dark:bg-gray-800"
            >
                <img
                    src="https://image.tmdb.org/t/p/w500/{movie.poster_path}?height=200&width=200"
                    alt="poster"
                    class="rounded-xl"
                />
            </div>
            <div
                class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3
             dark:border-gray-700
         dark:bg-gray-800"
            >
                <div class="flex justify-between item-center">
                    <div class="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>

                        <p class="text-gray-600 font-bold text-sm ml-1">
                            {Math.floor(movie.vote_average * 10)}%
                            <span class="text-gray-500 font-normal"
                                >({movie.vote_count} Count)</span
                            >
                        </p>
                    </div>
                    {#if movie.vote_average >= 7}
                        <div
                            class="bg-red-500 px-3 py-1 rounded-full text-xs f
                ont-medium text-white hidden md:block"
                        >
                            Super !
                        </div>
                    {/if}
                </div>
                <h3 class="font-black text-gray-800 text-xl dark:text-white">
                    {movie.title} ({getYear(movie.release_date)})
                </h3>
                <p class=" text-gray-500">
                    {movie.overview}
                </p>
                <p class="pt-5 text-gray-500 font-black">
                    {movie.filename}
                </p>
            </div>
        </div>
    </div>
{/if}
