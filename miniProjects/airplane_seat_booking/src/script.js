// default values
const DV_DEFAULTARRIVALTIME = '22:30';
const DV_DEFAULTDEPARTURETIME = '19:45';

// let variables
let sum = 0;
let price = 50;
let selectedSeat = [];

// class name
const CL_SELECTED = 'selected';
const CL_OCCUPIED = 'occupied';
const CL_SEAT = 'seat';

// localStorage Keys
const LS_SELECTED_AIRPORT_INDEX = 'selectedAirportIndex';
const LS_SELECTED_SEATS = 'selectedSeats';
const LS_SELECTED_ARRIVAL_TIME = 'selectedArrivalTime';
const LS_SELECTED_DEPARTURE_TIME = 'selectedDepartureTime';
const LS_SELECTED_SEAT_PRICE = 'selectedSeatPrice';

// selectors
const selection = document.querySelector('.seat-selection');
const seatNumber = document.querySelector('#seat-number');
const seatPrice = document.querySelector('#seat-price');
const select = document.querySelector('#country-area_select');
const arrivalAirport = document.querySelector('#arrival-airport');
const arrivalTime = document.querySelector('#arrival-time');
const departureTime = document.querySelector('#departure-time');
const seats = document.querySelectorAll('.seat');

const checkout = document.querySelector('#checkout');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

closeModal.addEventListener('click', function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
});

checkout.addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

// 좌석 선택 selectedSeatIndex(e.target) index localStorage에 저장하기
function saveSelectedSeatNumber(selectedSeatIndex) {
    selectedSeat.push(selectedSeatIndex);
    localStorage.setItem(LS_SELECTED_SEATS, JSON.stringify(selectedSeat));
}

// 좌석 선택 selectedSeatIndex (e.target) index localStorage에서 삭제하기
function deleteSelectedSeatNumber(selectedSeatIndex) {
    selectedSeat = selectedSeat.filter((seatIndex) => seatIndex !== selectedSeatIndex);
    localStorage.setItem(LS_SELECTED_SEATS, JSON.stringify(selectedSeat));
}

// 좌석 선택되었을 시, 선택한 좌석들 보여주기
function loadSeat() {
    const loadedSelectedSeats = localStorage.getItem(LS_SELECTED_SEATS);

    if (loadedSelectedSeats !== null) {
        const parsedSelectedSeats = JSON.parse(loadedSelectedSeats);

        parsedSelectedSeats.forEach(function (selectedSeatIndex) {
            selectedSeat.push(selectedSeatIndex);
            swapSeatColor(seats[selectedSeatIndex]);
        });
    }
}

// 공항 선택 인덱스 localStorage에 저장하기
function saveAirportIndex(text) {
    localStorage.setItem(LS_SELECTED_AIRPORT_INDEX, text);
}

// 공항 선택 가격 localStorage에 저장하기
function saveTicketPrice(text) {
    localStorage.setItem(LS_SELECTED_SEAT_PRICE, text);
}

// 공항 도착 시간 localStorage에 저장하기
function saveArrivalTime(text) {
    localStorage.setItem(LS_SELECTED_ARRIVAL_TIME, text);
}

// 공항 출발 시간 localStorage에 저장하기
function saveDepartureTime(text) {
    localStorage.setItem(LS_SELECTED_DEPARTURE_TIME, text);
}

// 공항 변경시, 공항 이름, 도착시간 다시 띄우기
function changeAirport() {
    arrivalAirport.innerText = select.value;
    if (select.selectedIndex == 0) {
        arrivalTime.innerText = DV_DEFAULTARRIVALTIME;
        departureTime.innerText = DV_DEFAULTDEPARTURETIME;
        price = 50;
        select.selectedIndex = 1;
    } else if (select.selectedIndex == 1) {
        arrivalTime.innerText = DV_DEFAULTARRIVALTIME;
        departureTime.innerText = DV_DEFAULTDEPARTURETIME;
        price = 50;
    } else if (select.selectedIndex == 2) {
        arrivalTime.innerText = '11:05';
        departureTime.innerText = '03:35';
        price = 90;
    } else if (select.selectedIndex == 3) {
        arrivalTime.innerText = '08:15';
        departureTime.innerText = '16:21';
        price = 100;
    } else if (select.selectedIndex == 4) {
        arrivalTime.innerText = '20:14';
        departureTime.innerText = '14:13';
        price = 110;
    }
    saveAirportIndex(select.selectedIndex);
    saveTicketPrice(price);
    saveDepartureTime(departureTime.innerText);
    saveArrivalTime(arrivalTime.innerText);
}

// 버튼 색상 변경
function swapSeatColor(target) {
    if (target.classList.contains(CL_SEAT) && !target.classList.contains(CL_OCCUPIED)) {
        target.classList.toggle(CL_SELECTED);
    }
}

// 선택 좌석 수 세기
function countSelectedSeat(e) {
    let selectedSeatIndex = null;
    for (let i = 0; i < seats.length; i++) {
        if (seats[i] === e.target) {
            selectedSeatIndex = i;
            break;
        }
    }

    const seat = document.querySelectorAll('.selected');
    if (e.target.classList.contains(CL_SEAT) && !e.target.classList.contains(CL_OCCUPIED)) {
        if (e.target.classList.contains(CL_SELECTED)) {
            seatNumber.innerText = seat.length;
            sumTicketPrice(price);
            saveSelectedSeatNumber(selectedSeatIndex);
        } else if (!e.target.classList.contains(CL_SELECTED)) {
            seatNumber.innerText = seat.length;
            sumTicketPrice(-price);
            deleteSelectedSeatNumber(selectedSeatIndex);
        }
    }
}

// 선택된 좌석에 따라, 티켓 가격 계산하기
function sumTicketPrice(n) {
    sum += n;
    seatPrice.innerText = sum;
}

// 젤리 애니메이션 추가하기
function jellyAnimation(e) {
    if (e.target.classList.contains(CL_SEAT) && !e.target.classList.contains(CL_OCCUPIED)) {
        e.target.classList.toggle('jello-horizontal');
    }
}

// 공항 변경시 선택된 값들 초기화 시키기
function removeClass() {
    for (let i = 0; i < seats.length; i++) {
        seats[i].classList.remove(CL_SELECTED);
        seats[i].classList.remove('jello-horizontal');
    }
    sum = 0;
    seatPrice.innerText = 0;
    seatNumber.innerText = 0;
}

// 디폴트 값 설정
function setDefault() {
    saveAirportIndex(1);
    saveTicketPrice(50);
    saveDepartureTime(DV_DEFAULTDEPARTURETIME);
    saveArrivalTime(DV_DEFAULTARRIVALTIME);
}

// 초기화 함수
function init() {
    // localStorage에 이미 값이 저장되어있으면, 값 출력하기.
    const airportIndex = localStorage.getItem(LS_SELECTED_AIRPORT_INDEX);

    if (airportIndex !== null) {
        // 미리 저장된 값이 있다면 불러오기
        console.log('there is airport index');
        select.selectedIndex = airportIndex;
        changeAirport();
        loadSeat();
    } else {
        // 미리 저장된 값이 없다면 디폴트 값 localStorage에 저장하기
        console.log('there is not airport index');
        setDefault();
    }

    selection.addEventListener('click', function (event) {
        swapSeatColor(event.target);
        countSelectedSeat(event);
        jellyAnimation(event);
    });

    select.addEventListener('change', function (event) {
        changeAirport(event);
        removeClass(event);
    });
}

init();
