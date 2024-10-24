<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import { ClipboardList } from "lucide-svelte";

    let movies: any[] = [];
    let clipboard_movies: string = "";
</script>

<button
    class="btn btn-accent btn-sm ml-2 mt-2"
    onclick="movie_modal.showModal()"><ClipboardList /></button
>
<dialog id="movie_modal" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
        <label class="form-control max-w-none w-full">
            <div class="label">
                <span class="label-text">Paste movies list</span>
            </div>
            <textarea
                class="textarea textarea-bordered
                        h-96 text-sm"
                bind:value={clipboard_movies}
            ></textarea>
            <div class="label">
                <span class="label-text-alt">lines</span>
            </div>
        </label>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button, it will close the modal -->
                <button
                    class="btn"
                    on:click={() => {
                        if (clipboard_movies) {
                            movies = clipboard_movies
                                .split("\n")
                                .filter(function (line) {
                                    return line.trim() !== ""; // Filter out empty or whitespace-only lines
                                })
                                .map(function (line) {
                                    return { name: line };
                                });
                            dispatch("clipboard-changed", { movies });
                        }
                    }}>Close</button
                >
            </form>
        </div>
    </div>
</dialog>
