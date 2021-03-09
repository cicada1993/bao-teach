<script>
    import { fade, fly } from "svelte/transition";
    let visible = false;
    let typewriter = (node, { speed = 50 }) => {
        const valid =
            node.childNodes.length === 1 &&
            node.childNodes[0].nodeType === Node.TEXT_NODE;

        if (!valid) {
            throw new Error(
                `This transition only works on elements with a single text node child`
            );
        }

        const text = node.textContent;
        const duration = text.length * speed;
        return {
            duration,
            tick: t => {
                const i = ~~(text.length * t);
                node.textContent = text.slice(0, i);
            }
        };
    };
    let status = ""
</script>

<div>
    <label><input type="checkbox" bind:checked={visible} />显示 动画状态:{status}</label>
</div>
{#if visible}
    <p
        in:typewriter
        out:fade
        on:introstart={() => (status = "intro started")}
        on:outrostart={() => (status = "outro started")}
        on:introend={() => (status = "intro ended")}
        on:outroend={() => (status = "outro ended")}
    >
        hello,svelte!
    </p>
{/if}
