// User Stories
//   User can see a list of person names arranged vertically in a summary pane on the page.
//   User can click on a name in the list to update an adjacent pane on the page with that individuals full name, address, telephone number, and birthday.
//   User can click on another name in the list to refresh the detail pane with that individuals information.
// Bonus features
//   User can see the person name in the summary pane highlighted when the cursor is hovered over it.
//   User can see the person name in the summary pane highlighted using a selection effect (color, size, etc.) when it is clicked. This is a different effect from the hover effect
//   User can see the selection effect removed from a name in the summary list when a new name is clicked.

/*
                <div class="profile-detail hidden">
                    <div class="profile-detail-info">
                        <label for="full-name">Full name : </label>
                        <input type="text" value="김철수" id="full-name" />
                    </div>
                    <div class="profile-detail-info">
                        <label for="adresss">Address : </label>
                        <input type="text" value="경기도 고양시 얌얌" id="address" />
                    </div>
                    <div class="profile-detail-info">
                        <label for="telephone number">Telephone number : </label>
                        <input type="text" value="010-1234-1234" id="telephone-number" />
                    </div>
                    <div class="profile-detail-info">
                        <label for="birthday">birthday</label>
                        <input type="text" value="1988.12.03" id="birthday" />
                    </div>
                    <div class="button-lsit">
                        <input type="button" value="Edit" id="edit-button" />
                        <input type="button" value="Save" id="save-button" />
                    </div>
                </div>

*/

const profileName = document.querySelector('profile');
const name = document.querySelectorAll('.profile-list-name');
const modal = document.querySelector('.modal');

/*
    만약 이름을 지금 액티브된 이름이 아닌 다른 이름을 누르면 애니메이션 발동! 
    1. 애니메이션을 지운다
    2. 애니메이션을 다시 넣는다.  
*/

// profileName.forEach((profileName) => {
//     profileName.addEventListener('click', function (event) {
//         profileName.classList.add('left-to-right');
//         modal.classList.toggle('modal-animation-in');
//     });
// });

name.forEach((name) => {
    name.addEventListener('click', function () {
        profileName.classList.add('left-to-right');
        modal.classList.toggle('modal-animation-in');
        const activeName = document.querySelector('.profile-list-name.active');
        name.classList.toggle('active');
        if (activeName && activeName !== name) {
            activeName.classList.toggle('active');
        }
    });
});
