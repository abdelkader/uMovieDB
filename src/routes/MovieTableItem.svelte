<script lang="ts">
    export let movie: any;

    function getYear(dateString: string) {
        return dateString.split("-")[0];
    }
</script>


<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       
        <div class="indicator">
            { movie.title }
            {#if movie.vote_average >= 7}
                <div class="badge badge-secondary ml-2">Super!</div>
            {/if}
          </div>
       
        
    </th>
    <td class="px-6 py-4">
        {getYear(movie.release_date)}
    </td>
    <td class="px-6 py-4">
        {Math.floor(movie.vote_average * 10)}%
    </td>
    <td class="px-6 py-4">
        {movie.vote_count}
    </td>
   
</tr>