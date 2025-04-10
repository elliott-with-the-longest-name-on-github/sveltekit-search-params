export type EncodeAndDecodeOptions<T = any> = {
	encode: (value: T) => string | undefined;
	decode: (value: string | null) => T | null;
	defaultValue?: T;
	equalityFn?: T extends object
		? (current: T | null, next: T | null) => boolean
		: never;
};

export type CurriedEncodeAndDecode<T> = ((
	equalityFn: EncodeAndDecodeOptions<T>['equalityFn'],
) => EncodeAndDecodeOptions<T>) &
	EncodeAndDecodeOptions<T>;

export type NavigationType = 'soft' | 'hard' | 'both';

export type NavigationOptions<TNavigation extends NavigationType> = {
	/**
	 * The number of milliseconds to delay the writing of the history when the state changes.
	 * This is to avoid cluttering the history of the user especially when some parameter is
	 * bound to an input text (every keystroke would cause a new history entry). It defaults
	 * to 0. If set a new entry in the history will be added only after `debounceHistory`
	 * milliseconds of "inactivity".
	 *
	 * @default 0
	 */
	debounceHistory?: number;
	/**
	 * When `true`, changes in the state will create new history entries. When `false`, they
	 * will replace the existing history entry.
	 *
	 * @default true
	 */
	pushHistory?: boolean;
	/**
	 * Whenever you interact with a store, it navigates for you. By default the search params are
	 * sorted to allow for better cache-ability. You can disable this behavior by passing `false`
	 * to this option. Keep in mind that this is a per-store settings. This mean that if you interact
	 * with a store that has this option set to `false` and than interact with one that has this
	 * option set to `true` (the default) the resulting URL will still have the search params sorted.
	 *
	 * @default true
	 */
	sort?: boolean;
	/**
	 * Default values for search params are automatically synced to the URL on hydration. If this isn't
	 * the behavior you want, set this to false, and the default values will be omitted from the URL until
	 * they're set to something other than the default.
	 */
	showDefaults?: boolean;
	/**
	 * SvelteKit has two different kinds of navigation: "soft" (`pushState` and `replaceState`) and "hard" (`goto`).
	 * Soft navigation creates or replaces history entries, but does not load new data from ther server.
	 * Hard navigations are more akin to a browser navigation, and they reload data from the server.
	 * When set to `hard` (the default), the store will use `goto` to navigate to the new URL.
	 * When set to `soft`, the store will use `pushState` or `replaceState` to navigate to the new URL.
	 * When set to `both`, `queryParameters` will return both `hard` and `soft` stores.
	 *
	 * If both soft and hard navigations are queued during the same debounce interval, all of the navigations will be
	 * applied as one hard navigation.
	 *
	 * @default 'hard'
	 *
	 * @example
	 * ```ts
	 * 	const hard = queryParameters({
	 *    username: true,
	 *  });
	 * 	const soft = queryParameters(
	 *    {
	 *      username: true,
	 *    },
	 *    {
	 * 	    navigationType: 'soft',
	 *    }
	 *  );
	 * 	const { soft, hard } = queryParameters(
	 *    {
	 *      username: true,
	 *    },
	 *    {
	 * 	    navigationType: 'both',
	 *    }
	 *  );
	 * ```
	 */
	navigationType?: TNavigation;
};
