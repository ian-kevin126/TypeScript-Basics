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
// let count = 0;
// function addCount() {
//   count++;
// }
// addCount();
// addCount();
// addCount();
// console.log(count); // 3   但是这种方式定义了全局变量，污染全局空间

// 改用闭包实现
const addCount = (function () {
  let count = 0;
  return () => {
    count++;
    console.log(count);
  }
})();
addCount();
addCount();
addCount();   // 3，闭包确实可以解决全局空间污染的问题，但还有更简单的方式

// 还可以用这种方式
// let addCount1 = function () {
//   addCount1.count++;
// }
// addCount1.count = 0;
// addCount1();
// addCount1();
// addCount1();

// 最后来尝试 TS 的方式
interface CountInterface {
  (): void
  count: number
}
let getCounter = (function (): CountInterface {
  /*
  CountInterface接口要求数据既要是一个没有参数没有返回值的函数
                            又要是一个拥有count属性的对象
  fn作为函数的时候符合接口中函数接口的限定 ():void
  fn作为对象的时候符合接口中对象属性的限定  count:number
  * */
  // 类型断言 
  let fn = <CountInterface>function () {
    fn.count++;
    console.log(fn.count);
  }

  /* 或者
    let fn = function () {
      fn.count++; 
      console.log(fn.count);
  } as CountInterface
  */

  fn.count = 0;
  return fn;
})();
getCounter();
getCounter();
getCounter();

// 7，接口继承
interface LengthInterface {
  length: number
}

interface WidthInterface {
  width: number
}

interface HeightInterface {
  height: number
}
// 接口可以单继承、也可以多继承
interface RectInterface extends LengthInterface, WidthInterface, HeightInterface {
  // length:number
  // width: number
  // height: number
  color: string
}

const rect: RectInterface = {
  length: 12,
  width: 22,
  height: 43,
  color: 'red'
};

