<script lang="ts">
    import { Receive, Send } from '@enums/events';
    import { VISIBLE, CONFIG } from '@stores/stores.svelte';
    import { ReceiveEvent, SendEvent } from '@utils/eventsHandlers';
    import { onMount } from 'svelte';
    import type { Snippet } from 'svelte';

    let { children }: { children?: Snippet } = $props();

    ReceiveEvent(Receive.visible, (visible: boolean): void => {
        VISIBLE.value = visible;
    });

    onMount(() => {
        if (!CONFIG.allowEscapeKey) return;

        const keyHandler = (e: KeyboardEvent) => {
            if (VISIBLE.value && ['Escape'].includes(e.code)) {
                SendEvent(Send.close);
            }
        };
        window.addEventListener('keydown', keyHandler);
        return () => window.removeEventListener('keydown', keyHandler);
    });
</script>

{#if VISIBLE.value}
    <main>
        {@render children?.()}
    </main>
{/if}

<style>
    main {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        user-select: none;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        height: 100vh;
        width: 100vw;
    }
</style>
