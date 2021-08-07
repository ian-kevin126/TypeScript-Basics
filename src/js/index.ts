// 1，接口合并：定义多个同名接口，编译的时候会产生接口合并的现象
interface TestInterface {
  name:string
}

interface TestInterface {
  age: number
}

// 类型“TestDemo”缺少类型“TestInterface”中的以下属性: name, age
// class TestDemo implements TestInterface {}

// 2，数字和字符串枚举
