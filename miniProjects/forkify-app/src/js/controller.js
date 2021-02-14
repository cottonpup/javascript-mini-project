// import icon from '../img/icons.svg'; // Parcel 1
// import icons from 'url:../img/icons.svg'; // Parcel 2
// for any static assets, that are not programming files.
// console.log(icons);
import * as model from './model.js';
import recipeView from './views/recipeView.js';

// 🛠1) For polyfilling everything else
import 'core-js/stable';
// 🛠2) For polyfilling async/await
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// running it background
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    alert(err);
    console.error(err);
  }
};

['hashchange', 'load'].forEach((ev) =>
  window.addEventListener(ev, controlRecipe)
);

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe); // 이벤트 링크 바로 들어갔을 때도 레시피를 보여줘!
