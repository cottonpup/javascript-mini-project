# Bin2Dec

## button vs input type="button"

button태그는 자동으로 submit하는 기능을 가지고 있다. 이는 문제를 일으킬 수 있는데, 만약 submit없이 버튼만 사용하고 싶다면, `<input type="button">` or `<button type="button">`을 타입 명시와 함께 사용하
는것을 권장한다.

타입이 없으면, 버튼은 자동으로 type은 submit이 되어 버린다.

[This is the default if the attribute is not specified for buttons associated with a <form>, or if the attribute is an empty or invalid value.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)

## querySelector로 type 명시한 DOM 객체 선택하기

`const button = document.querySelector('input[type="button"]');`

따옴표를 디폴트로 사용하고 있기 때문에, type은 "쌍 따옴표"를 사용한다.

## input 비활성화 하기

`decimalNumber.setAttribute('readonly', 'readonly');`

## validation

## 모달 창에서의 키보드 이벤트

`e.key === 'Enter' && !modal.classList.contains('hidden')`

키보드의 특정 키의 이벤트가 발생하도록 두는 것보다 모달 창의 클래스를 이용해서 더 정확성을 높히는 편이 좋다.
