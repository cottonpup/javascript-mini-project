# Bin2Dec

## button vs input type="button"

button태그는 자동으로 submit하는 기능을 가지고 있다. 이는 문제를 일으킬 수 있는데, 만약 submit없이 버튼만 사용하고 싶다면, `<input type="button">` or `<button type="button">`을 타입 명시와 함께 사용하
는것을 권장한다.

타입이 없으면, 버튼은 자동으로 type은 submit이 되어 버린다.

[This is the default if the attribute is not specified for buttons associated with a <form>, or if the attribute is an empty or invalid value.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
