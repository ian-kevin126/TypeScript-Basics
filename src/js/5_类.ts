// 1，类
class Person {
  name: string // 和ES6的区别，需要先定义实例属性，然后才能使用实例属性
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  say(): void {
    console.log(`我的名字叫${this.name}，我的年龄是${this.age}`)
  }

  static food: string  // 静态属性

  // 静态方法
  static eatFood(): void {
    console.log(`我正在吃${this.food}`)
  }
}

const person = new Person('kevin', 23);
person.say(); // 我的名字叫kevin，我的年龄是23
Person.food = '蛋挞';
Person.eatFood(); // 我正在吃蛋挞

// 2，类的继承：不仅可以继承类属性，还可以继承静态属性和静态方法，还可以重写静态方法
class Student extends Person {
  book: string
  constructor(name: string, age: number, book: string) {
    super(name, age)
    this.book = book
  }

  // 重写say方法
  say(): void {
    console.log(`我的名字叫${this.name}，我的年龄是${this.age}，我的书是${this.book}`)
  }

  // 重写静态方法
  static eatFood(): void {
    console.log(`我是重写的正在吃${this.food}`)
  }
}

const student = new Student('ian', 12, '相对论');
student.say(); // 我的名字叫ian，我的年龄是12，我的书是相对论
Student.food = '冰淇淋'
Student.eatFood(); // 我是重写的正在吃冰淇淋

// 3，类的属性修饰符
// public（公开的）：如果使用public来修饰属性, 那么表示这个属性是公开的。可以在类的内部使用, 也可以在子类中使用, 也可以在外部使用
// protected(受保护的) ：如果使用protected来修饰属性, 那么表示这个属性是受保护的。可以在类的内部使用, 也可以在子类中使用
// private(私有的) ：如果使用private来修饰属性, 那么表示这个属性是私有的。可以在类的内部使用
class Person1 {
  public name: string; // 默认情况下就是public的
  protected age: number;
  private gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  say(): void {
    console.log(`name=${this.name},age=${this.age},gender=${this.gender}`);
  }
}

class Student1 extends Person1 {
  constructor(name: string, age: number, gender: string) {
    super(name, age, gender);
  }
  say(): void {
    // console.log(`name=${this.name}`);
    // console.log(`age=${this.age}`);
    // console.log(`gender=${this.gender}`);
  }
}
let p = new Person1('lnj', 34, 'male');
p.say();
// console.log(p.age);  // 属性“age”受保护，只能在类“Person1”及其子类中访问。
// console.log(p.gender);  // 属性“gender”为私有属性，只能在类“Person1”中访问。 

let stu = new Student1('zs', 18, 'female');
stu.say();
// console.log(stu.age);

// 只读属性
class Demo {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
  static food: string;
}
let demo = new Demo('123');
console.log(demo.name);
// demo.name = 'abc';  // 无法分配到 "name" ，因为它是只读属性。
console.log(demo.name);

class Person2 {
  public name: string
  protected age: number
  private gender?: boolean  // 可选属性
  constructor(name: string, age: number, gender?: boolean) {
    this.name = name;
    this.age = age;
    this.gender = gender
  }

  say(): void {
    console.log(`我的名字叫${this.name}，今年${this.age}岁，我是${this.gender ? '男' : '女'}`)
  }

  static food: string

  static eatFood(): void {
    console.log(`我吃的是${this.food}`)
  }
}

class Student2 extends Person2 {
  book: string
  constructor(name: string, age: number, book: string, gender: boolean) {
    super(name, age, gender)
    this.book = book;
  }

  // 重写父类say方法
  say(): void {
    // 属性“gender”为私有属性，只能在类“Person2”中访问。
    // console.log(`我是${this.name}，我今年${this.age}岁，，我是${this.gender ? '男' : '女'}，我读的书是${this.book}`)
    console.log(`我是${this.name}，我今年${this.age}岁，我读的书是${this.book}`)
  }

  // 重写父类的静态方法
  static eatFood(): void {
    console.log(`重写静态方法，我吃的是${this.food}`);
  }
}

const person1 = new Person2('kevin', 18, true);
const stu1 = new Student2('ian', 20, '《乌合之众》', true);
person1.say()
stu1.say()

// 4，类方法修饰符：有一个基类, 所有的子类都需要继承于这个基类, 但是我们不希望别人能够通过基类来创建对象，
// 就可以用protected来修饰constructor
class Person3 {
  name: string
  age: number
  protected constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}
class Student3 extends Person3 {
  constructor(name: string, age: number) {
    super(name, age);
  }
}
// 不能通过基类来创建对象了
// const person3 = new Person3('kevin', 12); // 类“Person3”的构造函数是受保护的，仅可在类声明中访问。
const stu4 = new Student3('ian', 12);

// 5、参数属性，一句话搞定实例属性的接收和定义，是上面的构造函数的简写
class Person4 {
  constructor(public name: string, public age: number) { }
}

const person4 = new Person4('liao', 12);
console.log('person4', person4); // person4 Person4 {name: "liao", age: 12}

// 6、类存取器：通过setter和getter来访问和控制类成员，提升安全性
class Person5 {
  private _age: number = 0;
  set age(val: number) {
    if (val < 0) {
      throw new Error('年龄不能小于0')
    }
    this._age = val;
  }

  get age(): number {
    return this._age
  }
}

// 7，抽象类
/**
 * 1）抽象类一般用来定义不希望被外界直接创建的基类
 * 2）抽象类和接口的去呗：接口中只能定义约束, 不能定义具体实现，而抽象类中既可以定义约束, 又可以定义具体实现
 */

// 虽然我们可以通过上面的方式——在constructor上加protected修饰符来禁止用基类创建实例，
// 但这不是TypeScript中的正确姿势，需要用到abstract抽象类
abstract class Person6 {
  abstract name: string
  abstract say(): void

  eat(): void {
    console.log('我是父类的eat方法')
  }
}

// const person5 = new Person6(); // 无法创建抽象类的实例。ts(2511)
// 1）抽象类一般用来定义不希望被外界直接创建的基类 
// 2）抽象类和接口的去呗：接口中只能定义约束, 不能定义具体实现，而抽象类中既可以定义约束, 又可以定义具体实现
class Student4 extends Person6 {
  name: string = 'kevin'
  say(): void {
    console.log(`我叫${this.name}`)
  }
}

const stu5 = new Student4();
stu5.eat(); // 我是父类的eat方法
stu5.say(); // 我叫kevin

// 8，类和接口
// 1）类实现接口
interface PersonInterface {
  name: string
  say(): void
}

// 要用类实现接口，就要实现这个接口里面所有的属性和方法
class PersonCls implements PersonInterface {
  name: string = 'kevin'
  say(): void {
    console.log(`我的名字是${this.name}`)
  }
}

const per1 = new PersonCls();
per1.say(); // 我的名字是kevin

// 2）接口继承类
// 注意点1: 只要一个接口继承了某个类, 那么就会继承这个类中所有的属性和方法
//         但是只会继承属性和方法的声明, 不会继承属性和方法实现
// 注意点2: 如果接口继承的类中包含了protected的属性和方法, 那么就只有这个类的子类才能实现这个接口
class Person8 {
  name: string = 'kevin'
  age: number = 18
  protected say(): void {
    console.log(`我是${this.name}，今年${this.age}岁`)
  }
}
interface Child extends Person8 {
  gender: string
}

// 由于say方法加上了protected修饰符，也就是只有Person8的子类才可以实现say方法
// 解决方法：将Stud变成Person8的子类 extends Person8
// 注意：方法和属性都可以加修饰符
class Stud extends Person8 implements Child {
  name: string = 'ian'
  age: number = 19
  gender: string = 'male'
  say(): void {
    console.log(`我是${this.name}，性别${this.gender}，今年${this.age}岁`)
  }
}

const stud = new Stud();
stud.say(); // 我是ian，性别male，今年19岁

// 9，类和泛型
class Chache<T> {
  arr: T[] = []
  add(value: T): T {
    this.arr.push(value);
    return value;
  }
  all(): T[] {
    return this.arr;
  }
}

let chache = new Chache<number>();
// chache.add('abc'); // 类型“string”的参数不能赋给类型“number”的参数。
chache.add(1);
chache.add(2);
chache.add(3);
console.log(chache.all()); // [1, 2, 3]
