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
