# airplane_seat_booking

비행기 좌석 예약 시스템을 구현해보자
HTML, CSS는 디자인을 참고하여 만들었고 자바스크립트 코드는 스스로 작성하였습니다.

# Reference

[디자인 참고](https://search.muz.li/NjFiYjAwY2Iw)

[소스 참고](https://github.com/bradtraversy/vanillawebprojects/tree/master/movie-seat-booking)

# Features

- [x] 1. 버튼 선택 시, 좌석 색상 변경하기 (Occupied된 좌석은 선택불가)

- [x] 2. 좌석 선택 시, 선택 좌석 수에 따라 좌석 수 변경하기 (Occupied된 좌석은 선택불가)

- [x] 3. 좌석 선택 시, 선택 좌석 수에 따라 티켓 가격 계산하여 변경하기

- [x] 4. 도착 공항 선택 시, 도착 공항에 따라 티켓 가격 계산하여 변경하기.

- [x] 5. 도착 공항 선택 시, 도착 공항에 따라 시간표 변경하기.

- [x] 6. 도착 공항 선택 시, 헤더에 도착 공항 정보 변경하기.
  
- [x] 7. localStorage에 선택 값들 저장하기.
  - [x] 도착 공항
  - [x] 선택된 좌석
    - [x] 선택해제하면 localStorage에서 좌석 삭제
  - [x] 총 가격
  - [x] 도착 시간

- [x] 8. 좌석 선택 시, 젤리효과 애니메이션 추가하기.

- [x] 9. 도착 공항 선택 시, 선택 값(선택된 좌석, 좌석 수, 티켓 가격) 모두 초기화시키기.

- [x] 10. localStorage 값이 있을 경우, 불러와서 프린트하기. 
  - [x] 이전 선택된 좌석 색상 유지하기. 

- [x] 11. 도착 공항 선택 select창에서 이벤트가 일어나면, 'click me' 선택을 불가하게 하고 도착 공항으로 기본 값인 홍콩을 보여주게 설정하기.

# 현재 남아있는 오류 

** 좌석 선택 후 도착공항 변경 시, localStorage에 이전 선택한 좌석넘버가 사라지지 않고 남아있는다.

** 공항을 변경 되었을 때, 브라우저를 리로드 하면 좌석선택이 불가능하다.

# 코드 노트

## 1. 버튼 선택 시, 좌석 색상 변경하기 (Occupied된 좌석은 선택불가)

이벤트가 일어나는 타겟요소들을 선택할 시, `querySelectorAll`을 사용하여 요소 자체를 직접적으로 선택하기 보다는, 요소들을 포함하고 있는 컨테이너를 선택하고 이벤트가 일어나는 타겟요소가 특정 클래스 이름을 포함하고 있는 지 확인하는 조건을 줄 수 있다.

``` javascript
e.target.classList.contains(CL_SEAT) && !e.target.classList.contains(CL_OCCUPIED)
```
`DOMTokenList.contains()`API를 사용하여 특정 클래스 이름을 포함하고 있는 지 검사하여 boolean값을 받아 조건을 추가했다. 

# 아쉬운 점

*  도착 공항을 변경했을 때, 가격을 보여주는 창이 따로 있었으면 더 좋았을 것 같다.