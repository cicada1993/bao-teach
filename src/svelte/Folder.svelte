<script>
    import File from "./File";

    export let expanded = false;
    export let name;
    export let files;
</script>

<span
    class="folder"
    class:expanded
    on:click={() => {
        expanded = !expanded;
    }}>{name}</span
>

{#if expanded}
    <ul>
        {#each files as file}
            <li>
                {#if file.type == "folder"}
                    <svelte:self {...file} />
                {:else}
                    <File {...file} />
                {/if}
            </li>
        {/each}
    </ul>
{/if}

<style>
    .folder {
        color: black;
        font-weight: bold;
    }

    .expanded {
        color: red;
    }
</style>
