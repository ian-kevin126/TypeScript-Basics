// 1，函数
function showName1(name: string): string {
  return name;
}
const showName2 = function (name: string): string {
  return name;
}
const showName3 = (name: string): string => {
  return name;
}

// 2，函数重载：同名函数可以根据不同的参数实现不同的功能
function func(x: number): number[];
function func(x: string): string[];

function func(value: any): any {
  if (typeof value === 'string') {
    ///
  } else {
    ///
  }
}

// 3，可选参数
function concatStr(x: string, y: string, z?: string) {
  return x + y + (z ? z : '');
}
console.log(concatStr('a', 'b')); // ab
console.log(concatStr('a', 'b', 'c')); // abc

// 可选参数配合函数重载一起使用，可以使得函数重载更加强大
function add(a: number, b: number): number;
function add(a: number, b: number, c: number): number;
function add(a: number, b: number, c?: number): number {
  return a + b + (c ? c : 0);
}
// 需要注意的是：可选参数后面不能跟必传参数，可以再跟可选参数

// 4，默认参数
function func2(x: number, y: number = 10) {
  return x + y;
}

console.log(func2(20)); // 30

// 5，Rest（剩余）参数
function func3(x: number, ...args: number[]) {
  console.log('x', x); // x 1
  console.log('args', args); // args (6) [2, 3, 4, 5, 6, 7]
}

func3(1, 2, 3, 4, 5, 6, 7);

