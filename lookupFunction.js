let arr = [0, 1, 2, 4, 5, 6, 7, 8];
let arr2 = [88, 77, 66, 55, 44, 33, 22, 11];

console.log('二分查找算法');
console.log(BinarySearch(arr2, 77));
console.log(BinarySearch(arr, 2));

function BinarySearch(arr, target) {
    let s = 0;
    let e = arr.length - 1;
    let m = Math.floor((s + e) / 2);
    let sortTag = arr[s] <= arr[e];//确定排序顺序

    while (s < e && arr[m] !== target) {
        if (arr[m] > target) {
            sortTag && (e = m - 1);
            !sortTag && (s = m + 1);
        } else {
            !sortTag && (e = m - 1);
            sortTag && (s = m + 1);
        }
        m = Math.floor((s + e) / 2);
    }

    if (arr[m] == target) {
        console.log('找到了,位置%s', m);
        return m;
    } else {
        console.log('没找到');
        return -1;
    }

}