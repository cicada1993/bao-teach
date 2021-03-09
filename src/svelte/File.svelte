<script>
    export let name;
    $: type = name.slice(name.lastIndexOf(".") + 1);
</script>

<span class="file">{name}</span>

<style>
    .file {
        color: gray;
    }
</style>
