<script>
    import Book from "./Book"; // imports

    let toggle = false; // inner variables
    let gifSrc =
        "http://img.doutula.com/production/uploads/image/2019/02/21/20190221754682_CVfKon.jpg";
    let numArr = [1, 2, 3];

    // inner methods
    let changeGreet = () => {
        toggle = !toggle;
        if (numArr.length >= 2) {
            numArr.splice(1, 1);
            numArr = numArr;
        }
        numArr[0] = Math.random();
        files = readFolder();
    };

    let handleMessage = data => {
        console.log("handleMessage", data);
    };

    let handleMove = evt => {
        console.log("handleMove", evt);
    };

    let delay = () => {
        // 延迟三秒
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    };

    let readFolder = async () => {
        await delay();
        const res = await fetch("local/ems/folders");
        const data = await res.text();
        if (res.ok) {
            return JSON.parse(data);
        } else {
            return new Error(data);
        }
    };

    let files = readFolder();

    $: greet = toggle ? "hello,world" : "hello,svelte"; // passive variables
    $: greetObj = greet.split(",")[1];
    $: numStr = numArr.join(",");

    export let title = "svelte app"; // outer variables
</script>

<h3>{title}</h3>
<p>{greet}</p>
{#if toggle}
    <img src={gifSrc} alt="throw a pot" />
{/if}
<Book on:message={handleMessage} on:mousemove={handleMove} />
<button on:click={changeGreet}>click me</button>
<p>
    greet target is:{greetObj}<br />
    numArr is:{numStr}
</p>

{#if numArr.length >= 3}
    <p>the length of numArr is over 3</p>
{:else if numArr.length >= 2}
    <p>the length of numArr is over 2</p>
{:else}
    <p>the length of numArr is {numArr.length}</p>
{/if}

{#await files}
    <p>...waiting</p>
{:then arr}
    <ul>
        {#each arr as name, i}
            <li>{name}</li>
        {/each}
    </ul>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<style>
    p {
        color: red;
    }

    button {
        margin-top: 20px;
    }
</style>
