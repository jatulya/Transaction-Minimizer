export class MaxHeap<T> {
    private heap: T[] = [];

    insert(item: T) {
        this.heap.push(item);
        this.bubbleUp();
    }

    extractMax(): T {
        if (this.heap.length === 0) throw new Error("Heap is empty");
        if (this.heap.length === 1) return this.heap.pop()!;
        
        const maxItem = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown();
        
        return maxItem;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    private bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if ((this.heap[index] as any).amount <= (this.heap[parentIndex] as any).amount) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    private bubbleDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            let leftChildIndex = index * 2 + 1;
            let rightChildIndex = index * 2 + 2;
            let largestIndex = index;

            if (leftChildIndex < length && (this.heap[leftChildIndex] as any).amount > (this.heap[largestIndex] as any).amount) {
                largestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && (this.heap[rightChildIndex] as any).amount > (this.heap[largestIndex] as any).amount) {
                largestIndex = rightChildIndex;
            }
            if (largestIndex === index) break;

            [this.heap[index], this.heap[largestIndex]] = [this.heap[largestIndex], this.heap[index]];
            index = largestIndex;
        }
    }
}

export class MinHeap<T> {
    private heap: T[] = [];

    insert(item: T) {
        this.heap.push(item);
        this.bubbleUp();
    }

    extractMin(): T {
        if (this.heap.length === 0) throw new Error("Heap is empty");
        if (this.heap.length === 1) return this.heap.pop()!;
        
        const minItem = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown();
        
        return minItem;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    private bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if ((this.heap[index] as any).amount >= (this.heap[parentIndex] as any).amount) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    private bubbleDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            let leftChildIndex = index * 2 + 1;
            let rightChildIndex = index * 2 + 2;
            let smallestIndex = index;

            if (leftChildIndex < length && (this.heap[leftChildIndex] as any).amount < (this.heap[smallestIndex] as any).amount) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && (this.heap[rightChildIndex] as any).amount < (this.heap[smallestIndex] as any).amount) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex === index) break;

            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
            index = smallestIndex;
        }
    }
}





