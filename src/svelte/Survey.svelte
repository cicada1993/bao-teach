<script>
    const { each } = require("svelte/internal");

    let radioMenu = ["top", "bottom", "left", "right"];
    let radioOpt = 1;

    let checkMenu = ["eat", "drink", "play", "sleep"];

    let checkOpt = [1, 2];

    let note = "";

    let selectMenu = ["大学", "高中", "初中", "小学"];

    let selectOpt = 1;

    let heartWords = "i love you"

    $:{
        console.log({
            radioOpt,
            checkOpt,
            note,
            selectOpt,
            heartWords
        })
    }
</script>

<h3>单选</h3>
{#each radioMenu as opt, i}
    <label class="radio-opt">
        <input type="radio" bind:group={radioOpt} value={i} />
        {opt}
    </label>
{/each}

<h3>多选</h3>
{#each checkMenu as opt, i}
    <label class="check-opt">
        <input type="checkbox" bind:group={checkOpt} value={i} />
        {opt}
    </label>
{/each}

<h3>笔记</h3>
<textarea class="read-note" bind:value={note} placeholder="阅读笔记" />

<h3>下拉单选</h3>
<select class="drop-select" bind:value={selectOpt}>
    {#each selectMenu as opt, i}
        <option value={i}>{opt}</option>
    {/each}
</select>

<h3>可编辑组件</h3>
<div contenteditable="true" bind:textContent ={heartWords}></div>
<style>
    .radio-opt,
    .check-opt,
    .read-note,
    .drop-select {
        display: block;
    }
</style>
