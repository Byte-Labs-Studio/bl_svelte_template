// Svelte 5 Shared Reactive State
// This file replaces stores.ts and implements Svelte 5 Runes for reactive shared states.

export const CONFIG = $state<any>({
    /** Fallback resource name for when the resource name cannot be found. */
    fallbackResourceName: 'debug',

    /** Whether the escape key should make visibility false. */
    allowEscapeKey: true,
});

/**
 * The name of the resource. This is used for the resource manifest.
 */
export const RESOURCE_NAME: string = (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
    : 'debug';

/**
 * Whether the current environment is the browser or the client.
 */
export const IS_BROWSER: boolean = !(window as any).invokeNative;

/**
 * Whether the UI is visible or not.
 * Wrapped in an object structure so that it can be dynamically muted/updated reactively in Svelte 5.
 */
class VisibleState {
    value = $state<boolean>(false);
}
export const VISIBLE = new VisibleState();
