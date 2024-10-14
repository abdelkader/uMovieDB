<script>
    import FileChooser from "./FileChooser.svelte";

    import MovieCard from "./MovieCard.svelte";
    import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">
            <img src="/logo.png" alt="Movie Scraper logo" class="w-36 h-14" />
        </a>
    </div>
    <div class="flex-none">
        <ThemeSwitcher />
    </div>
</div>

<div class="container mx-auto mt-4">
    <FileChooser />
    <MovieCard />
    <MovieCard />
    <MovieCard />
</div>
