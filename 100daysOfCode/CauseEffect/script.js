// User Stories
//   User can see a list of person names arranged vertically in a summary pane on the page.
//   User can click on a name in the list to update an adjacent pane on the page with that individuals full name, address, telephone number, and birthday.
//   User can click on another name in the list to refresh the detail pane with that individuals information.
// Bonus features
//   User can see the person name in the summary pane highlighted when the cursor is hovered over it.
//   User can see the person name in the summary pane highlighted using a selection effect (color, size, etc.) when it is clicked. This is a different effect from the hover effect
//   User can see the selection effect removed from a name in the summary list when a new name is clicked.

const profileName = document.querySelector('profile');
const name = document.querySelectorAll('.profile-list-name');
const modal = document.querySelector('.modal');

name.forEach((name) => {
    name.addEventListener('click', function () {
        profileName.classList.add('left-to-right');
        const activeName = document.querySelector('.profile-list-name.active');
        name.classList.toggle('active');
        modal.classList.add('modal-animation-in');
        if (activeName && activeName !== name) {
            activeName.classList.toggle('active');
        }
    });
});
