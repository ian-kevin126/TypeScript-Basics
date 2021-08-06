// 1，泛型
// 我们来考虑这样一个需求：定义一个创建数组的方法，创建出指定长度并且可以用任意指定的内容填充的数组
// let getArray = (value: number, items: number = 5): number[] => {
//   return new Array(items).fill(value);
// }
// const arr5 = getArray(6, 8);
// console.log('arr5', arr5); // arr5 (8) [6, 6, 6, 6, 6, 6, 6, 6]

// 这只满足了指定长度，但是value的值的类型是无法任意指定的，这就需要用到泛型了。

let getArray = <T>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value);
}
const arr5 = getArray(6, 8);
const arr6 = getArray('a', 8);
console.log('arr5', arr5); // arr5 (8) [6, 6, 6, 6, 6, 6, 6, 6]
console.log('arr6', arr6); // arr6 (8) ["a", "a", "a", "a", "a", "a", "a", "a"]

// 需求:要有代码提示, 如果写错了要在编译的时候报错
// <T>意思是我调用getArray函数的时候传的是T类型的参数。
let getArray1 = <T>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value);
};
// let arr = getArray1<string>('abc');
// let arr = getArray1<number>(6);
// 注意点: 泛型具体的类型可以不指定
//         如果没有指定, 那么就会根据我们传递的泛型参数自动推导出来
let arr7 = getArray1('abc');
// let arr = getArray1(6);
let res = arr7.map(item => item.length);
console.log(res); // (5) [3, 3, 3, 3, 3]

// 2，泛型约束
/*
1.什么是泛型约束?
默认情况下我们可以指定泛型为任意类型
但是有些情况下我们需要指定的类型满足某些条件后才能指定
那么这个时候我们就可以使用泛型约束
* */
// 需求: 要求指定的泛型类型必须有Length属性才可以
interface LengthInterface1 {
  length: number
}
let getArray2 = <T extends LengthInterface1>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value);
};

// string字符串是由length属性的，所以没报错，如果传number就会报错
let arr8 = getArray2<string>('abc');
// let arr = getArray<number>(6);
let res1 = arr8.map(item => item.length);
console.log('res1', res1); // res1 (5) [3, 3, 3, 3, 3]

// 3，在泛型类约束中使用类型参数
/*
1.在泛型约束中使用类型参数?
一个泛型被另一个泛型约束, 就叫做泛型约束中使用类型参数
* */
// 需求: 定义一个函数用于根据指定的key获取对象的value
// interface KeyInterface{
//     [key:string]:any
// }

// <T, K extends keyof T> 中的T指的是我调用getProps的时候传类型为T的参数，
// K extends keyof T 指的是，K一定要是T中的属性，否则报错
let getProps = <T, K extends keyof T>(obj: T, key: K): any => {
  return obj[key];
}
let obj2 = {
  a: 'a',
  b: 'b'
}
// 代码不够健壮, 明明obj中没有c这个key但是却没有报错
// let res = getProps(obj, "c");
let res2 = getProps(obj2, "a");
console.log(res2); // a