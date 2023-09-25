<script lang="ts">
    import { onMount } from 'svelte';
    import { CONFIG } from './stores/stores';
    import AlwaysListened from '@utils/listeners';
    import Visibility from '@providers/Visibility.svelte';
    import Debug from '@providers/Debug.svelte';
    import ImageHolder from '@components/ImageHolder.svelte';
    import { ReceiveEvent } from '@utils/eventsHandlers';

    CONFIG.set({
        fallbackResourceName: 'debug',
        allowEscapeKey: true,
    });

    function init() {
        for (const debug of AlwaysListened) {
            ReceiveEvent(debug.action, debug.handler);
        }
    }

    init();
</script>

<Visibility>
    <ImageHolder />
</Visibility>

<Debug />
