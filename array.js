
const array = [1, 2, 3, 4];
let sum = 0;

for (let i = 0; i < array.length; i++) {
    sum += array[i];
}
console.log(sum);

const arr = [1,2,3,4,5,6]
let num = '1'
const number = Number(num)
arr.push(number)
console.log(arr)

const reducer = (accumulator, curr) => accumulator + curr;
console.log(arr.reduce(reducer));

console.log(arr[5])

