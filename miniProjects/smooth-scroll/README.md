# Smooth Scroll with Vanilla Javascript 

# Code Note

# [Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

> viewport? 사용자에게 보여지는 웹페이지의 영역

요소의 크기와 뷰포트에 따라 읽기 전용 값인 상대적인 위치를 반환한다.

요소의 크기: `width/height + padding + border-width`

`box-sizing: border-box;` 가 사용될 때의 요소의 크기: `width/height`

## value 

반환 값은 `DOMRect` 객체이다. 이 객체는  `getClientRects()`로 반환하는 요소의 직사각형 결합이다.

반환 값은 요소의 전체를 포함하는 가장 작은 직사각형이다. 

만약 요소가 비었다면, width와 height는 0을 반환한다. 

이 값들은 스크롤을 내릴 때마다, 계속 바뀐다. 왜냐하면 값들은 뷰포트에 상대적이기 때문이다. 

## top-left만 받고 싶다면? 

> If you need the bounding rectangle relative to the top-left corner of the document, just add the current scrolling position to the top and left properties (these can be obtained using window.scrollX and window.scrollY) to get a bounding rectangle which is independent from the current scrolling position.

> 그냥 프로퍼티로 주면 된다. 

```javascript
let targetPosition = target.getBoundingClientRect().top;
```

# [getClientRects()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getClientRects)

# [window.pageYOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset)

윈도우 페이지의 Y축 포지션이라고 보면된다.

`scrollY`의 다른이름인 `pageYOffset`는 읽기 전용 값 Window 속성이다. 일부 오래된 브라우저는 scrollY 대신 pageYOffset만 지원하는 경우가 있지만, 노후 환경을 신경쓰지 않아도 된다면 둘 중 아무거나 사용해도 괜찮다. 

수평 스크롤을 나타내는 `pageXOffset` 속성 역시 `scrollX`의 다른 이름!

## value 

window 안의 Document가 수직 방향으로 스크롤된 거리를 픽셀 단위로 나타낸 부동소숫점 수. 단일 픽셀보다 높은 수준의 정밀도를 가지므로 정수가 아닐 수 있습니다. 0.0은 창의 콘텐츠 영역과 문서의 위쪽 모서리 위치가 일치함을 나타냅니다.

# [scrollTo](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo)

The scrollTo() method of the Element interface scrolls to a particular set of coordinates **inside a given element.**

## Syntax
```javascript
element.scrollTo(x-coord, y-coord)
element.scrollTo(options)
```

# [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.

https://youtu.be/9XnqDSabFjM

브라우저가 매번 화면을 그리는데, 그릴 준비가 되었을 때 호출이 된다. 예전에는 setInterval를 사용하여 이런 작업을 했었는데, 프레임 유실이나 모바일 기기의 배터리 절약등의 단점이 있었다. 

반복시킬 함수 안에 requestAnimation(반복시킬 함수를 인자)을 호출하면 빠르게 함수를 반복시킨다. 초당 60번을 목표를 한다. 기기에 따라 느려지거나 할 수 있다. 

# cancelAnimationFrame 

애니메이션 멈추기

---

# Code Review 