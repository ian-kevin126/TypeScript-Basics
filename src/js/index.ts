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
