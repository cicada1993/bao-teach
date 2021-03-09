<script>
    import {
        createEventDispatcher,
        onMount,
        beforeUpdate,
        afterUpdate,
        getContext
    } from "svelte";
    import { count, cusCount } from "./store";
    const dispath = createEventDispatcher();
    const { getHandleDiv } = getContext("bookCtr");

    let content = `枯河一轮巨大的水淋淋的<strong>鲜红月亮</strong>从村庄东边暮色苍茫的原野上升起来时,
    村子里弥漫的烟雾愈加厚重,并且似乎都染上了月亮的那种凄艳的红色。`;
    let readerMark = "";
    let agree = false;
    let praise_count = 0;
    const unsubscribe = count.subscribe(value => {
        praise_count = value;
    });
    let handleClick = evt => {
        dispath("message", { text: "essay is clicked" });
        readerMark = "这段不错哟！";
    };
    let handleKeydown = evt => {
        console.log("handleKeydown", evt);
    };
    let sy = 0;
    $: console.log("window_scrollY", sy);
    onMount(() => {
        console.log("Essay onMount");
        let handleDiv = getHandleDiv();
        console.log("handleDiv", handleDiv);
    });
    beforeUpdate(() => {
        console.log("Essay beforeUpdate");
    });
    afterUpdate(() => {
        console.log("Essay afterUpdate");
    });
    export let author = "莫言";
</script>

<svelte:window bind:scrollY={sy} on:keydown={handleKeydown} />
<p on:mousemove on:click|once={handleClick}>{@html content}</p>
<div>作者：{author} <span>点赞数：{$cusCount}</span></div>
<input class="reader-mark" bind:value={readerMark} placeholder="读者说" />

{@debug agree}
<label class="reader-agree">
    <input type="checkbox" bind:checked={agree} />
    Yes!I agree author's opinion
</label>

<style>
    .reader-mark,
    .reader-agree {
        display: block;
    }
</style>
