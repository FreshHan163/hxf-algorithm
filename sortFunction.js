// 快速排序--递归方法一
function partSort(array, left, right) {
    let key = array[left];
    while (left < right) {
        while (left < right && array[right] >= key) {
            right--;
        }
        array[left] = array[right]; // 找到比当前key值小的元素，移到最左边
        while (left < right && array[left] <= key) {
            left++;
        }
        array[right] = array[left];
    }
    array[left] = key;
    return left;
}
function quickSort(array, min, max) {
    if (min >= max) {
        return;
    }
    let index = partSort(array, min, max);
    console.log(array);
    quickSort(array, min, index - 1);
    quickSort(array, index + 1, max);
    return array;
}
// let sortArray = [1, 3, 2, 0, -3, 5, 2];
let sortArray = [1, 3, 2, 5, 0, 0, 7];
console.log(quickSort(sortArray, 0, sortArray.length - 1));

// 快速排序--非递归方法--栈（js中用数组替代栈）
function quickSortNotR(array, left, right) {
    let list = [[left, right]]; // 数组下标入栈
    var count = 0;
    while (list.length > 0) {
        let newArray = list.pop();
        if (newArray[0] >= newArray[1]) {
            continue;
        }
        let min = newArray[0], // 左下标
            max = newArray[1], // 右下标
            key = array[min],
            flag = newArray[0];
        while(min < max) {
            while (min < max && key <= array[max]) {
                max--;
                count++;
            }
            array[min] = array[max];
            while (min < max && key >= array[min]) {
                min++;
                count++;
            }
            array[max] = array[min];
        }
        array[min] = key;
        flag = min;
        if (flag >= 0 && (flag + 1) <= newArray[1] ) {
            list.push([newArray[0], flag - 1]);
            list.push([flag + 1, newArray[1]]);
        }
    }
    console.log('非递归总次数：', count);
    return array;
}
let quickArray = [3, 1, 2, 0, -3, 4, 1, 7];
console.log(quickSortNotR(quickArray, 0, quickArray.length - 1));

// 插入排序算法
function insertSort(array) {
    for (let i = 0; i < array.length; i++) {
        let currentIndex = i;
        while(array[currentIndex - 1] !== undefined && array[currentIndex] < array[currentIndex - 1]) {
            const temp = array[currentIndex - 1];
            array[currentIndex - 1] = array[currentIndex];
            array[currentIndex] = temp;
            currentIndex --;
        }
    }
    return array;
}
let insertArray = [3, 1, 2, 0, -3, 4, 1, 7];
console.log(insertSort(insertArray));

// 选择排序
var example=[8,94,15,88,55,76,21,39];
function selectSort(arr){
    var len=arr.length;
    var minIndex,temp;
    console.time('选择排序耗时');
    for(i=0;i<len-1;i++){
        minIndex=i;
        for(j=i+1;j<len;j++){
            if(arr[j]<arr[minIndex]){
                minIndex=j;
            }
        }
    temp=arr[i];
    arr[i]=arr[minIndex];
    arr[minIndex]=temp;
    }
    console.timeEnd('选择排序耗时');
    return arr;
}
console.log(selectSort(example));

// 归并排序
let mergeArray = [3, 1, 2, 2, 0, -4, 1, 7];
function merge(left, right) {
    var tmp = [];
    while (left.length && right.length) {
      if (left[0] < right[0])
        tmp.push(left.shift());
      else
        tmp.push(right.shift());
    }
    return tmp.concat(left, right);
  }
  function mergeSort(a) {
    if (a.length === 1)
      return a;
    var mid = ~~(a.length / 2),
        left = a.slice(0, mid),
        right = a.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
  }

// 希尔排序
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    console.time('希尔排序耗时:');
    while(gap < len/5) {          //动态定义间隔序列
        gap =gap*5+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    console.timeEnd('希尔排序耗时:');
    return arr;
}
var shellArray=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(shellSort(shellArray)); //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

// 堆排序
/*方法说明：堆排序
@param  array 待排序数组*/
function heapSort(array) {
    console.time('堆排序耗时');
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        //建堆
        var heapSize = array.length, temp;
        for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
            heapify(array, i, heapSize);
        }

        //堆排序
        for (var j = heapSize - 1; j >= 1; j--) {
            temp = array[0];
            array[0] = array[j];
            array[j] = temp;
            heapify(array, 0, --heapSize);
        }
        console.timeEnd('堆排序耗时');
        return array;
    } else {
        return 'array is not an Array!';
    }
}
/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len) {
    if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
        var l = 2 * x + 1, r = 2 * x + 2, largest = x, temp;
        if (l < len && arr[l] > arr[largest]) {
            largest = l;
        }
        if (r < len && arr[r] > arr[largest]) {
            largest = r;
        }
        if (largest != x) {
            temp = arr[x];
            arr[x] = arr[largest];
            arr[largest] = temp;
            heapify(arr, largest, len);
        }
    } else {
        return 'arr is not an Array or x is not a number!';
    }
}
var arr=[91,60,96,13,35,65,46,65,10,30,20,31,77,81,22];
console.log(heapSort(arr));//[10, 13, 20, 22, 30, 31, 35, 46, 60, 65, 65, 77, 81, 91, 96]