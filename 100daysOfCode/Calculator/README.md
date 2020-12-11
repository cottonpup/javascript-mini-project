# Calculator

# [클래스 / 객체지향언어](https://ko.javascript.info/classes)

클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀로, 객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성된다.

모든 함수의 프로토타입은 'constructor' 프로퍼티를 기본으로 갖고 있습니다.

```js
class User {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        alert(this.name);
    }
}

// 클래스는 함수입니다.
alert(typeof User); // function

// 정확히는 생성자 메서드와 동일합니다.
alert(User === User.prototype.constructor); // true

// 클래스 내부에서 정의한 메서드는 User.prototype에 저장됩니다.
alert(User.prototype.sayHi); // alert(this.name);

// 현재 프로토타입에는 메서드가 두 개입니다.
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

# 순수함수로 클래스 역할을 하는 함수를 선언하는 방법과 `class` 키워드를 사용하는 방법의 차이

결과는 비슷하나 중요한 차이 몇가지가 존재한다.

1. class로 만든 함수엔 특수 내부 프로퍼티인 [[FunctionKind]]:"classConstructor"가 이름표처럼 붙습니다. 이것만으로도 두 방법엔 분명한 차이가 있음을 알 수 있습니다.

자바스크립트는 다양한 방법을 사용해 함수에 [[FunctionKind]]:"classConstructor"가 있는지를 확인합니다. 이런 검증 과정이 있기 때문에 클래스 생성자를 new와 함께 호출하지 않으면 에러가 발생합니다.

```js
class User {
    constructor() {}
}

alert(typeof User); // function
User(); // TypeError: Class constructor User cannot be invoked without 'new'
```

```js
class User {
    constructor() {}
}

alert(User); // class User { ... }
```

2. 클래스 메서드는 열거할 수 없습니다(non-enumerable). 클래스의 prototype 프로퍼티에 추가된 메서드 전체의 enumerable 플래그는 false입니다.

for..in으로 객체를 순회할 때, 메서드는 순회 대상에서 제외하고자 하는 경우가 많으므로 이 특징은 꽤 유용합니다.

3. 클래스는 항상 엄격 모드로 실행됩니다(use strict). 클래스 생성자 안 코드 전체엔 자동으로 엄격 모드가 적용됩니다.

# syntactic sugar

기능은 동일하나 기존 문법을 쉽게 읽을 수 있게 만든 문법을 편의 문법(syntactic sugar, 문법 설탕)이라고 합니다.

# 클래스 표현식

```js
// 기명 클래스 표현식(Named Class Expression)
// (명세서엔 없는 용어이지만, 기명 함수 표현식과 유사하게 동작합니다.)
let User = class MyClass {
    sayHi() {
        alert(MyClass); // MyClass라는 이름은 오직 클래스 안에서만 사용할 수 있습니다.
    }
};

new User().sayHi(); // 제대로 동작합니다(MyClass의 정의를 보여줌).

alert(MyClass); // ReferenceError: MyClass is not defined, MyClass는 클래스 밖에서 사용할 수 없습니다.
```

클래스를 동적으로 생성 가능.

```js
function makeClass(phrase) {
    // 클래스를 선언하고 이를 반환함
    return class {
        sayHi() {
            alert(phrase);
        }
    };
}

// 새로운 클래스를 만듦
let User = makeClass('Hello');

new User().sayHi(); // Hello
```

# getter와 setter

encapsulation: 유저가 데이터를 외부에서 수정하지 못하게 중요한 데이터를 보존, 보호하는 방법.

리터럴을 사용해 만든 객체처럼 클래스도 getter나 setter, 계산된 프로퍼티(computed property)를 포함할 수 있습니다.

getter와 setter을 정의하는 순간, 메모리에 할당되어 있는 값을 불러올 때는 getter를 부르고 메모리에 할당할 때는 setter를 불러온다.

```js
get age(){
    return this._age;
    // getter와 setter내에서 사용하는 변수의 이름을 다르게 만들어줘야 한다.
}
```

# pubic vs private `실험적 기능`

```js
class Experiment {
    publicField = 2; // 2
    #privateField = 0; // undefined
}
```

# static `실험적 기능`

class 자체의 변수, 함수

```js
class Article {
    static publisher = 'Dream coding';
    constructor(articleNumber) {
        this.articleNumber = articleNumber;
    }

    static printPublisher() {
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
console.log(article1.publisher); // undefined
console.log(Article.publisher); // Dream Coding
```

# extends 키워드

```js
class Shape {
    constructor(width, height, color) {
        this, (width = width);
        this.height = height;
        this.color = color;
    }

    draw(){
        console.log(`drawing ${this.color} color!`);
    }

    getArea(){
        return this.width * this.height;
    }

    class Rectangle extends Shape{}
    class Triangle extends Shape{
        draw(){
            super.draw(); // 부모의 메서드도 함께 호출
            console.log('🔺');
        }

        getArea(){
            return (this.width * this.height)/2;
        }
    }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();
console.log(rectangle.getArea());
const triangle = new Triangle(20, 20, 'red');
```

# 계산된 메서드 이름 […]

```js
class User {
    ['say' + 'Hi']() {
        alert('Hello');
    }
}

new User().sayHi();
```

# this

자바스크립트에서 this는 런타임에 결정됩니다. 메서드가 어디서 정의되었는지에 상관없이 this는 ‘점 앞의’ 객체가 무엇인가에 따라 ‘자유롭게’ 결정됩니다.

# instanceOf
