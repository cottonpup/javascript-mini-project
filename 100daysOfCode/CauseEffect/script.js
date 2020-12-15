// User Stories
//   User can see a list of person names arranged vertically in a summary pane on the page.
//   User can click on a name in the list to update an adjacent pane on the page with that individuals full name, address, telephone number, and birthday.
//   User can click on another name in the list to refresh the detail pane with that individuals information.
// Bonus features
//   User can see the person name in the summary pane highlighted when the cursor is hovered over it.
//   User can see the person name in the summary pane highlighted using a selection effect (color, size, etc.) when it is clicked. This is a different effect from the hover effect
//   User can see the selection effect removed from a name in the summary list when a new name is clicked.

const profileName = document.querySelector('profile');
let names = document.getElementsByClassName('profile-list-name');
const modal = document.querySelector('.modal');
const setFullName = document.querySelector('#full-name');
const setStreet = document.querySelector('#street');
const setCity = document.querySelector('#city');
const setState = document.querySelector('#state');
const setCountry = document.querySelector('#country');
const setTelephone = document.querySelector('#telephone-number');
const setBirthday = document.querySelector('#birthday');

const setModal = document.querySelector('.modal');
const people = [
    {
        name: 'James Smith',
        street: '2130 66th Ave',
        city: 'California(CA)',
        state: 'Oakland',
        country: 'United States',
        telephone: '(408) 606-5775',
        birthday: '1987.04.21'
    },
    {
        name: 'Michael Smith',
        street: '123 11th Ave',
        city: 'Texas(TX)',
        state: 'Throckmorton',
        country: 'China',
        telephone: '010-323-1234',
        birthday: '1960.08.12'
    },
    {
        name: 'Maria Rodriguez',
        street: '561 21th Ave',
        city: 'Missouri(MO)',
        state: 'Hazelwood',
        country: 'Mexico',
        telephone: '(45) 2313-4342',
        birthday: '1994.02.24'
    },
    {
        name: 'Ariana Grande-Butera',
        street: '130 5th Ave',
        city: 'Georgia(GA)',
        state: 'Atlanta',
        country: 'United States',
        telephone: '134-206-5775',
        birthday: '2004.11.25'
    },
    {
        name: 'Taylor Alison Swift',
        street: '1230 1th Ave',
        city: 'Florida(FL)',
        state: 'Ponte Vedra Beach',
        country: 'Japan',
        telephone: '32-3423-21',
        birthday: '1997.04.01'
    }
];
const newPersonAdd = document.querySelector('#new-person-add');
const newPersonInput = document.querySelector('#new-person-input');
const newPersonSave = document.querySelector('#new-person-save');

// 데이터 값 불러오는 함수
const getValue = () => {
    const activeName = document.querySelector('.profile-list-name.active');
    console.log(activeName);
    for (let num = 0; num < people.length; num++) {
        if (people[num].name.includes(activeName.innerText)) {
            setFullName.value = people[num].name;
            setStreet.value = people[num].street;
            setCity.value = people[num].city;
            setState.value = people[num].state;
            setCountry.value = people[num].country;
            setTelephone.value = people[num].telephone;
            setBirthday.value = people[num].birthday;
        }
    }
};

// 데이터 값 설정하는 함수
const setValue = () => {
    const activeName = document.querySelector('.profile-list-name.active');
    console.log(activeName);
    for (let num = 0; num < people.length; num++) {
        if (people[num].name.includes(activeName.innerText)) {
            activeName.innerText = setFullName.value.split(' ')[0];
            people[num].name = setFullName.value;
            people[num].street = setStreet.value;
            people[num].city = setCity.value;
            people[num].state = setState.value;
            people[num].country = setCountry.value;
            people[num].telephone = setTelephone.value;
            people[num].birthday = setBirthday.value;
        }
    }
};

// 이름을 클릭해서 액티브 상태일 때의 함수
const activeEvent = (event) => {
    console.log(`노드리스트 길이는 ${names.length}`);
    //   console.log(`지금 클릭한 이름은 ${name.innerText}`);

    const activeName = document.querySelector('.profile-list-name.active');

    profileName.classList.add('name-in-and-out');
    modal.classList.add('modal-animation-in');
    event.target.classList.toggle('active');

    if (activeName && activeName !== event.target) activeName.classList.toggle('active');

    if (activeName === event.target) {
        profileName.classList.remove('name-in-and-out');
        modal.classList.remove('modal-animation-in');
    }
    getValue();
};

// 이름을 클릭할 때 마다 액티브 이벤트를 삽입하는 함수
// 동적 노드리스트를 인자 값에 다시 업데이트 하기 위함.
const addEvent = (htmlElements) => {
    [...htmlElements].forEach((name) => name.addEventListener('click', activeEvent));
};

addEvent(names);

// nerPersonAdd 버튼을 클릭했을 때, 인풋, save 버튼을 보이는 함수
const addNewPerson = () => {
    newPersonInput.focus();
    newPersonAdd.classList.toggle('hidden');
    newPersonInput.classList.toggle('hidden');
    newPersonSave.classList.toggle('hidden');
    if (modal.classList.contains('')) {
        newPersonAdd.classList.toggle('hidden');
    }
};

newPersonAdd.addEventListener('click', function () {
    addNewPerson();
});

// save 버튼을 클릭했을 때, 새로운 사람들의 데이터를 넣어주는 함수
newPersonSave.addEventListener('click', function () {
    document
        .querySelector('.profile-list')
        .insertAdjacentHTML(
            'beforeend',
            `<h1 class='profile-list-name'>${newPersonInput.value.split(' ')[0]}</h1>`
        );

    people.push({
        name: newPersonInput.value,
        street: '',
        city: '',
        state: '',
        country: '',
        telephone: '',
        birthday: ''
    });
    console.log(people);

    newPersonInput.value = '';

    // 새로운 사람들의 데이터가 들어왔을 때, names 다시 선언하여, 업데이트
    // TODO: addEvent([names[names.length - 1]]); 이 부분 이해하기!
    names = document.getElementsByClassName('profile-list-name');
    console.log(names + '지금 새로운 사람이 들어왔따!');
    addEvent([names[names.length - 1]]);

    // names = [{}.{},{}]
    // [[ㅜㅜ], [ㅜㅜ], [ㅜㅜ]]

    // 활성화 된 버튼들 비활성화
    newPersonAdd.classList.toggle('hidden');
    newPersonInput.classList.toggle('hidden');
    newPersonSave.classList.toggle('hidden');
});

// 캔슬 이벤트
document.querySelector('#cancel-button').addEventListener('click', function () {
    getValue();
});

// 세이브 이벤트
document.querySelector('#save-button').addEventListener('click', function () {
    setValue();
});
