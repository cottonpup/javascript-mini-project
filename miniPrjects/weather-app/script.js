const api = {
    key: '3bdc5356fdc697c05d0005461b4942e4',
    baseurl: 'https://openweathermap.org/'
};

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    Image();
}
