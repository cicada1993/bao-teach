<script>
    import Essay from "./Essay";
    import Survey from "./Survey";
    import Media from "./Media";
    import Folder from "./Folder";
    import Transition from "./Transition";
    import { cusCount, time, secondCount } from "./store";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { setContext } from "svelte";

    setContext("bookCtr", {
        getHandleDiv: () => handleDiv
    });
    let handleDiv;

    let author = "诺贝尔文学奖获得者——莫言";

    let praiseEssay = evt => {
        cusCount.incre();
    };

    let stampEssay = evt => {
        cusCount.decre();
    };

    let reset = evt => {
        cusCount.reset();
    };

    const formatter = new Intl.DateTimeFormat("cn", {
        hour12: false,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
    });

    const progress = tweened(0, {
        duration: 400,
        easing: cubicOut
    });

    let pStep = 15;

    let decProgress = evt => {
        let per = $progress * 100;
        if (per - pStep <= 0) {
            progress.set(0);
        } else {
            progress.set((per - pStep) / 100);
        }
    };

    let incProgress = evt => {
        let per = $progress * 100;
        if (per + pStep >= 100) {
            progress.set(100);
        } else {
            progress.set((per + pStep) / 100);
        }
    };

    let dir = [
        {
            type: "folder",
            name: "Important work stuff",
            files: [{ type: "file", name: "quarterly-results.xlsx" }]
        }
    ];
</script>

<h1>The time is {formatter.format($time)} {$secondCount} seconds passed</h1>
<Folder name="Home" files={dir} />
<Essay {author} on:message on:mousemove />
<div bind:this={handleDiv}>
    <button on:click={praiseEssay}>赞一个</button>
    <button on:click={stampEssay}>踩一个</button>
    <button on:click={reset}>重置</button>
</div>
<div>
    <progress value={$progress} />
    <button on:click={decProgress}>-</button>
    <button on:click={incProgress}>+</button>
</div>
<Transition />
<Survey />
<Media />
