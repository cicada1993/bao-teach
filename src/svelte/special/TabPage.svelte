<script>
    import TabA from "./TabA";
    import TabB from "./TabB";
    import TabC from "./TabC";
    let tabs = ["TabA", "TabB", "TabC"];
    let curTab = tabs[0];
    // 测试出错 https://github.com/sveltejs/svelte/issues/4798
</script>

<select bind:value={curTab}>
    {#each tabs as tab}
        <option value={tab}>{tab}</option>
    {/each}
</select>

<svelte:component this={curTab} />
