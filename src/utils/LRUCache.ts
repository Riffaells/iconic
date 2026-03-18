/**
 * Least Recently Used (LRU) Cache implementation.
 * Automatically evicts least recently used items when capacity is reached.
 */
export class LRUCache<K, V> {
	private cache: Map<K, V>;
	private readonly capacity: number;

	constructor(capacity: number) {
		this.capacity = capacity;
		this.cache = new Map();
	}

	get(key: K): V | undefined {
		if (!this.cache.has(key)) {
			return undefined;
		}
		// Move to end (most recently used)
		const value = this.cache.get(key)!;
		this.cache.delete(key);
		this.cache.set(key, value);
		return value;
	}

	set(key: K, value: V): void {
		// Remove if exists to update position
		if (this.cache.has(key)) {
			this.cache.delete(key);
		}
		// Add to end (most recently used)
		this.cache.set(key, value);
		
		// Evict least recently used if over capacity
		if (this.cache.size > this.capacity) {
			const firstKey = this.cache.keys().next().value;
			this.cache.delete(firstKey);
		}
	}

	has(key: K): boolean {
		return this.cache.has(key);
	}

	clear(): void {
		this.cache.clear();
	}

	get size(): number {
		return this.cache.size;
	}
}
