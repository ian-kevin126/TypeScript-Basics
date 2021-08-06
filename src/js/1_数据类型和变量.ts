// 1，数组的定义：长度不定&类型可以不定
let arr: Array<number> = [1, 2, 3, 4];
let arr1: number[] = [1, 2, 3, 4, 5];
let arr2: any[] = [1, "3", 4, true];
console.log(arr, arr1, arr2);

// 2，联合类型
let arr3: (string | number)[] = [1, "2", 3, "kevin"];
console.log(arr3);

// 3，元祖类型：数量固定、类型固定的数组
let tuple1: [string, number, boolean] = ["1", 1, true];
console.log(tuple1);

// 4，枚举类型
enum Gender {
  MALE,
  FEMALE = 4
}
console.log(Gender.MALE); // 0
console.log(Gender.FEMALE); // 4

/**  enum编译后的底层实现
 var Gender;
(function (Gender) {
    Gender[Gender["MALE"] = 0] = "MALE";
    Gender[Gender["FEMALE"] = 4] = "FEMALE";
})(Gender || (Gender = {}));
 */
// 由于enum枚举的底层实现是number，所以被枚举声明的变量是可以赋值成数值的
let gen: Gender = 4;
console.log(gen); // 4
console.log(Gender[0]); // MALE
console.log(Gender["MALE"]); // 0

// 5，any类型：任意类型
let value: any = 1;
value = "22";
value = true;
value = { name: "kevin" };
console.log(value); // { name: "kevin" };

// 6，void：与any正好相反，表示没有任何类型，一般用于函数，表示不返回任何值
function log(): void {
  console.log("loggger");
}

// 需要注意的是，在tsconfig.json中如果设置strict为true，即开启严格模式的时候
// 被void声明的变量是不能赋予任何类型的值的，如果关闭严格模式，void声明的变量是可以被null和undefined赋值
// let value1: void = null;
// let value2:void = undefined;

// null和undefined是所有类型的子类型，所以，可以将null和undefined赋值给任意类型

// 7，Never：表示那些永远不可能存在的值，一般用于排除错误和用于永远不可能有返回值的函数
// function catchError(): never {
//   throw new Error("报错了");
// }
// catchError();

// 8，Object：表示一个对象
let obj: object = {
  a: 1,
  b: '1212'
};
console.log(obj);

// 9，类型断言：可以将一种类型强制转换成另一种类型
// 方式一：这种方式有兼容性问题，使用JSX的时候不好
let num1: any = 111;
let str1 = <string>num1;  // str这时候就是string类型
// 方式二：推荐方式
let num2: any = 213221;
let str2 = num2 as string;  // 这时候str2也是string类型
 
