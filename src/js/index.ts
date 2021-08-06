// 1，接口：可选属性、索引签名、只读属性
interface MyBrother {
  name: string;
  age: number;
  lastName?: string; // 可选属性
  [propName: string]: any; // 索引签名：可以穿任意多个参数
}

function showMyName({ name, age }: MyBrother): void {
  console.log(`${name}-${age}`);
}

// 小技巧：如果我们实际的传参比定义的接口要多，可以用类型断言来强制处理
showMyName({ name: 'kevin', age: 13, lastName: 'Liao', abd: '1212' } as MyBrother)
// 可选属性
function showMyName1({ name, age, lastName }: MyBrother): void {
  console.log(`${name}-${age}`);
}

// 2，索引签名
interface FullName {
  [propName: string]: string
}

const obj1: FullName = {
  name: "kevin",
  lastName: 'liao',
  // addr: 1212,  报错
  false: '1212',  // 不报错，false最终会被转化为string类型
}
// console.log({ 1: 'abc', '1': '123' }) // 这里面的第一个1最后都会被转化为string类型，所最终输出{'1': '123'}

interface NumArray {
  [propName: number]: string
}

// 还可来声明数组
const _numArr: NumArray = ['a', 'b', 'c'];
console.log(_numArr[0]); // a
console.log(_numArr[1]); // b
console.log(_numArr[2]); // c

// 3，只读属性
interface FullName1 {
  readonly firstName: string;
  lastName: string
}

const _name: FullName1 = {
  firstName: 'kevin',
  lastName: 'liao'
};

_name.lastName = 'Tooooom';
console.log(_name.lastName); // Tooooom
// _name.firstName = 'ian'; // Cannot assign to 'firstName' because it is a read-only property.
// console.log(_name.firstName); // kevin

// 4，只读数组
const arr4: ReadonlyArray<number> = [1, 2, 3, 4, 5];
// arr4[0] = 99; // 报错：Index signature in type 'readonly number[]' only permits reading.

// 5，函数接口
interface SumInterface {
  (a: number, b?: number): number
}

function sum({ x, y }: { x: number, y: number }): number {
  return x + y;
}

const sumFun: SumInterface = function (x: number, y: number | undefined): number {
  return x + (y ? y : 0);
}

// 6，混合类型接口：约定的内容里既有属性又有方法
