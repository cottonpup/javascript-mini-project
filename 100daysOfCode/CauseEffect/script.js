// User Stories
//   User can see a list of person names arranged vertically in a summary pane on the page.
//   User can click on a name in the list to update an adjacent pane on the page with that individuals full name, address, telephone number, and birthday.
//   User can click on another name in the list to refresh the detail pane with that individuals information.
// Bonus features
//   User can see the person name in the summary pane highlighted when the cursor is hovered over it.
//   User can see the person name in the summary pane highlighted using a selection effect (color, size, etc.) when it is clicked. This is a different effect from the hover effect
//   User can see the selection effect removed from a name in the summary list when a new name is clicked.

const profileName = document.querySelector('profile');
const names = document.getElementsByClassName('profile-list-name');
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
    { name: 'James Smith', street: '2130 66th Ave', city: 'California(CA)', state: 'Oakland', country: 'United States', telephone: '(408) 606-5775', birthday: '1987.04.21' },
    { name: 'Michael Smith', street: '123 11th Ave', city: 'Texas(TX)', state: 'Throckmorton', country: 'China', telephone: '010-323-1234', birthday: '1960.08.12' },
    { name: 'Maria Rodriguez', street: '561 21th Ave', city: 'Missouri(MO)', state: 'Hazelwood', country: 'Mexico', telephone: '(45) 2313-4342', birthday: '1994.02.24' },
    { name: 'Ariana Grande-Butera', street: '130 5th Ave', city: 'Georgia(GA)', state: 'Atlanta', country: 'United States', telephone: '134-206-5775', birthday: '2004.11.25' },
    { name: 'Taylor Alison Swift', street: '1230 1th Ave', city: 'Florida(FL)', state: 'Ponte Vedra Beach', country: 'Japan', telephone: '32-3423-21', birthday: '1997.04.01' }
];
const addButton = document.querySelector('#add-button');
const newPersonInput = document.querySelector('#new-person-input');

function init(num) {
    setFullName.value = people[num].name;
    setStreet.value = people[num].street;
    setCity.value = people[num].city;
    setState.value = people[num].state;
    setCountry.value = people[num].country;
    setTelephone.value = people[num].telephone;
    setBirthday.value = people[num].birthday;
}

function setValue(num) {
    people[num].name = setFullName.value;
    people[num].street = setStreet.value;
    people[num].city = setCity.value;
    people[num].state = setState.value;
    people[num].country = setCountry.value;
    people[num].telephone = setTelephone.value;
    people[num].birthday = setBirthday.value;
}

document.querySelector('#cancel-button').addEventListener('click', function () {
    const activeName = document.querySelector('.profile-list-name.active');
    for (let num = 0; num < people.length; num++) {
        if (people[num].name.includes(activeName.innerText)) {
            init(num);
        }
    }
});

document.querySelector('#save-button').addEventListener('click', function () {
    const activeName = document.querySelector('.profile-list-name.active');
    for (let num = 0; num < people.length; num++) {
        if (people[num].name.includes(activeName.innerText)) {
            setValue(num);
            activeName.innerText = setFullName.value.substr(0, setFullName.value.indexOf(' '));
        }
    }
});

addButton.addEventListener('click', function () {
    addButton.value = 'Save';
    addButton.classList.toggle('active');
    newPersonInput.classList.toggle('hidden');

    if (!addButton.classList.contains('active') && modal.classList.contains('modal-animation-in')) {
        document.querySelector('.profile-list').insertAdjacentHTML('beforeend', `<h1 class='profile-list-name'>${newPersonInput.value}</h1>`);
        addButton.value = 'Add new person';
        const defaultObject = { name: `${newPersonInput.value}`, street: '', city: '', state: '', country: '', telephone: '', birthday: '' };
        people.push(defaultObject);
        console.log(people);
        newPersonInput.value = '';
    }
});

/*
문제 1: forEach의 인자값을 다이나믹하게 업데이트 할 필요가 있음.
문제 2: 클릭 event가 발생이 되지 않음 => name인자에 포함되어있지 않음. 왜지.. 조낸 어이..

객체에 true/false 추가해서 애니메이션. 
*/

[...names].forEach((name) => {
    name.addEventListener('click', function (event) {
        console.log(`노드리스트 길이는 ${names.length}`);
        console.log(`지금 클릭한 이름은 ${name.innerText}`);
        const activeName = document.querySelector('.profile-list-name.active');
        profileName.classList.add('name-in-and-out');
        modal.classList.add('modal-animation-in');
        event.target.classList.toggle('active');

        if (modal.classList.contains('modal-animation-in')) addButton.classList.remove('hidden');
        if (activeName && activeName !== event.target) activeName.classList.toggle('active');
        if (activeName === event.target) {
            profileName.classList.remove('name-in-and-out');
            modal.classList.remove('modal-animation-in');
            addButton.classList.add('hidden');
        }
        for (let num = 0; num < people.length; num++) {
            if (people[num].name.includes(name.innerText)) {
                init(num);
            }
        }
    });
});
