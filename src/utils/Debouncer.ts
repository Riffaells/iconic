/**
 * Debouncer utility for delaying function execution.
 * Properly handles cleanup and cancellation.
 */
export class Debouncer {
	private timeouts: Map<string, number> = new Map();

	/**
	 * Debounce a function call.
	 * @param key Unique identifier for this debounced operation
	 * @param fn Function to execute
	 * @param delay Delay in milliseconds
	 */
	debounce(key: string, fn: () => void, delay: number): void {
		this.cancel(key);
		const timeout = window.setTimeout(() => {
			this.timeouts.delete(key);
			fn();
		}, delay);
		this.timeouts.set(key, timeout);
	}

	/**
	 * Cancel a pending debounced operation.
	 */
	cancel(key: string): void {
		const timeout = this.timeouts.get(key);
		if (timeout !== undefined) {
			window.clearTimeout(timeout);
			this.timeouts.delete(key);
		}
	}

	/**
	 * Cancel all pending operations.
	 */
	cancelAll(): void {
		this.timeouts.forEach(timeout => window.clearTimeout(timeout));
		this.timeouts.clear();
	}
}
