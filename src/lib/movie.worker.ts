// place files you want to import through the `$lib` alias in this folder.
import { filenameParse } from '@ctrl/video-filename-parser';


onmessage = async (event) => {
    const { files, lang } = event.data;
    await getMovieDetailsFromFiles(files, lang);
};



async function fetchMovieDetails(title: string, year: string | null, lang: string) {
    try {

        // Prepare the search query with the title and year
        const query = encodeURIComponent(title);
        const url = `https://umoviedb-api.vercel.app/api/moviedb?query=${query}&year=${year}&language=${lang}`;

        // Fetch data from TMDb API with Bearer Token Authorization
        const response = await fetch(url);
        const data = await response.json();

        // Check if we have any results
        if (data.results && data.results.length > 0) {
            // Return the first movie found
            return data.results[0];
        } else {
            console.log(`Movie not found: ${title} (${year})`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
}

async function getMovieDetailsFromFiles(files: any[], lang: string, delay: number = 300) {

    // Iterate through each file to extract movie titles and years
    for (let i = 0; i < files.length; i++) {
        try {
            const { title, year } = filenameParse(files[i].name);
            // Fetch movie details and add to results
            const movieDetails = await fetchMovieDetails(title, year, lang);

            let movie = {
                filename: files[i].name,
                ...movieDetails
            };
            self.postMessage(movie);

            // Throttle requests to avoid hitting the rate limit
            if (i < files.length - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        } catch (error) {
            console.error(`Error parsing file: ${files[i].name} with index: ${i}`);
        }

    }
}

export { };