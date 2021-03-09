<script>
    let time = 0;
    let duration;
    let paused = true;
    let showControls = false;
    let handleMouseMove = evt => {
        showControls = true;
    };

    let handleMouseDown = e => {
        function handleMouseup() {
            if (paused) e.target.play();
            else e.target.pause();
            cancel();
        }

        function cancel() {
            e.target.removeEventListener("mouseup", handleMouseup);
        }

        e.target.addEventListener("mouseup", handleMouseup);

        setTimeout(cancel, 200);
    };
</script>

<div class="simple-video">
    <video
        poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
        src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
        on:mousemove={handleMouseMove}
        on:mousedown={handleMouseDown}
        bind:currentTime={time}
        bind:duration
        bind:paused
    >
        <track kind="captions" />
    </video>
    <div
        class:paused
        class="controls"
        style="display:{showControls ? 'block' : 'none'}"
    >
        <progress value={time / duration || 0} />

        <div class="info">
            <span class="time">{time}</span>
            <span
                >click anywhere to {paused ? "play" : "pause"} / drag to seek</span
            >
            <span class="time">{duration}</span>
        </div>
    </div>
</div>

<style>
    .simple-video {
        position: absolute;
        font-size: 10px;
    }
    .controls {
        position: absolute;
        top: 0;
        width: 100%;
        transition: opacity 1s;
    }

    .info {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    span {
        padding: 0.2em 0.5em;
        color: white;
        text-shadow: 0 0 8px black;
        opacity: 0.7;
    }

    .time {
        width: 3em;
    }

    .time:last-child {
        text-align: right;
    }

    progress {
        display: block;
        width: 100%;
        height: 10px;
        -webkit-appearance: none;
        appearance: none;
    }

    progress::-webkit-progress-bar {
        background-color: rgba(0, 0, 0, 0.2);
    }

    progress::-webkit-progress-value {
        background-color: rgba(255, 255, 255, 0.6);
    }

    video {
        width: 100%;
    }
</style>
