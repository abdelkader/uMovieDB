<script lang="ts">
    export let movie;

    function getYear(dateString: string) {
        return dateString.split("-")[0];
    }
</script>

{#if movie}
    <div class="card mx-auto bg-base-100 w-80 shadow-xl">
        <figure>
            <img
                src="https://image.tmdb.org/t/p/w500/{movie.poster_path}?height=120&width=200"
                alt="Poster"
            />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
                {movie.title} ({getYear(movie.release_date)})
                {#if movie.vote_average >= 7}
                    <div class="badge badge-secondary">Hot!</div>
                {/if}
            </h2>
            <p>
                {movie.overview}
            </p>
            <div class="card-actions justify-between pt-4">
                <div class="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        ><path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        ></path></svg
                    >
                    <p class="font-bold text-sm ml-1">
                        {Math.floor(movie.vote_average * 10)}%%
                        <span class="text-gray-500 font-normal"
                            >({movie.vote_count} Count)</span
                        >
                    </p>
                </div>
               
            </div>
            <div class="text-gray-500 font-black">{movie.filename}</div>
        </div>
    </div>
{/if}
