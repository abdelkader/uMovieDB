
async function HandleWork(files: [], lang: string, percent: number) {

    let movies: any[] = [];
    const MovieWorker = await import(
        "$lib/movie.worker?worker"
    );
    let movieWorker = new MovieWorker.default();
    movieWorker.postMessage({ files, lang });
    movieWorker.onmessage = (event) => {
        if (event.data) {
            movies = [...movies, event.data];
            percent = Math.ceil(
                (movies.length / files.length) * 100,
            );
        }
    };
}

function GetLocaleCode(lang: string): string {

    let value = "";
    switch (lang) {
        case "en":
            value = "en-US";
            break;
        case "fr":
            value = "fr-FR";
            break;
        case "es":
            value = "es-ES";
            break;
        default:
            value = "en-US";
            break;
    }

    return value;


}

export { HandleWork, GetLocaleCode }   