// User Stories
//   User can see a list of person names arranged vertically in a summary pane on the page.
//   User can click on a name in the list to update an adjacent pane on the page with that individuals full name, address, telephone number, and birthday.
//   User can click on another name in the list to refresh the detail pane with that individuals information.
// Bonus features
//   User can see the person name in the summary pane highlighted when the cursor is hovered over it.
//   User can see the person name in the summary pane highlighted using a selection effect (color, size, etc.) when it is clicked. This is a different effect from the hover effect
//   User can see the selection effect removed from a name in the summary list when a new name is clicked.

const profileName = document.querySelector('profile');
// Renato: you should call this `names` not `name`
const names = document.querySelectorAll('.profile-list-name');
const modal = document.querySelector('.modal');
const setFullName = document.querySelector('#full-name');
const setStreet = document.querySelector('#street');
const setCity = document.querySelector('#city');
const setState = document.querySelector('#state');
const setCountry = document.querySelector('#country');
const setTelephone = document.querySelector('#telephone-number');
const setBirthday = document.querySelector('#birthday');
const setProfileName = document.querySelector('profile');
const setName = document.querySelectorAll('.profile-list-name');
const setModal = document.querySelector('.modal');
const people = [
    { name: 'James Smith', street: '2130 66th Ave', city: 'California(CA)', state: 'Oakland', country: 'United States', telephone: '(408) 606-5775', birthday: '1987.04.21' },
    { name: 'Michael Smith', street: '123 11th Ave', city: 'Texas(TX)', state: 'Throckmorton', country: 'China', telephone: '010-323-1234', birthday: '1960.08.12' },
    { name: 'Maria Rodriguez', street: '561 21th Ave', city: 'Missouri(MO)', state: 'Hazelwood', country: 'Mexico', telephone: '(45) 2313-4342', birthday: '1994.02.24' },
    { name: 'Ariana Grande-Butera', street: '130 5th Ave', city: 'Georgia(GA)', state: 'Atlanta', country: 'United States', telephone: '134-206-5775', birthday: '2004.11.25' },
    { name: 'Taylor Alison Swift', street: '1230 1th Ave', city: 'Florida(FL)', state: 'Ponte Vedra Beach', country: 'Japan', telephone: '32-3423-21', birthday: '1997.04.01' }
];

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

names.forEach((name) => {
    name.addEventListener('click', function (event) {
        const activeName = document.querySelector('.profile-list-name.active');
        profileName.classList.add('left-to-right');
        name.classList.toggle('active');
        modal.classList.add('modal-animation-in');
        if (activeName === event.target) {
            modal.classList.remove('modal-animation-in');
            profileName.classList.remove('left-to-right');
        }
        if (activeName && activeName !== name) {
            activeName.classList.toggle('active');
        }
        for (let num = 0; num < people.length; num++) {
            if (people[num].name.includes(name.innerText)) {
                init(num);
            }
        }
    });
});

document.querySelector('#cancel-button').addEventListener('click', function () {
    for (let num = 0; num < 6; num++) {
        const activeName = document.querySelector('.profile-list-name.active');
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
        }
    }
});
