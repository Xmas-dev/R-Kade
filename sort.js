let values = [];
let w = 10;
const quickButton = document.getElementById('quick');
const mergeButton = document.getElementById('merge');
const bubbleButton = document.getElementById('bubble');
const refresh = document.getElementById('refresh');
let initial = true;

function setup() {
    createCanvas(1000, 500);
    reset();
}

function reset() {
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
}

function draw() {
    background(42, 160, 168);
    for (let i = 0; i < values.length; i++) {
        noStroke();
        rect(i * w, height - values[i], w - 1, values[i]);
    }
}

function interface(algo) {
    if (!initial)
        reset();
    
    switch(algo) {
        case 'q': {
            quicksort(values, 0, values.length - 1);
            break;
        }
        case 'm' : {
            let aux = [];
            mergesort(values, aux, 0, values.length - 1);
            break;
        }
        case 'b' : {
            bubblesort(values);
            break;
        }
    }
    initial = false;

}

async function mergesort(arr, aux, left, right) {
    if (left >= right) {
        return;
    }
    else {
        const mid = Math.floor(left + (right - left) / 2);        
        await mergesort(arr, aux, left, mid);
        await mergesort(arr, aux, mid + 1, right);

        await merge(arr, aux, left, mid, right);
    }
}

async function merge(arr, aux, left, mid, right) {
    for (let i = 0; i < arr.length; i++) {
        aux[i] = arr[i];
    }

    let i = left, j = mid + 1, k;
    for (k = left; i < (mid + 1) && j <= right; k++) {
        await sleep(35);
        aux[i] < aux[j] ? arr[k] = aux[i++] : arr[k] = aux[j++];
    }

    while (i < (mid + 1)) {
        arr[k++] = aux[i++];
    }
    while (j <= right) {
        arr[k++] = aux[j++];
    }
}

async function quicksort(arr, start, end) {
    if (start >= end) {
        return;
    }
    else {
        let index = await partition(arr, start, end);
        
        await Promise.all([
            quicksort(arr, start, index - 1),
            quicksort(arr, index + 1, end)
        ]);
    }
}

async function partition (arr, start, end) {
    let pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            await swap(arr, pivotIndex, i);
            pivotIndex++;
        }
    }
    await swap(arr, pivotIndex, end);

    return pivotIndex;
}

async function bubblesort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                await sleep(0) 
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

async function swap(arr, x, y) {
    await sleep(35);
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
    // bubblesort(values);
    refresh.addEventListener('click', () => {
        reset();
        initial = true;
    });
    quickButton.addEventListener('click', () => interface('q'));
    mergeButton.addEventListener('click', () => interface('m'));
    bubbleButton.addEventListener('click', () => interface('b'));
}

main();