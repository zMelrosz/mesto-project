import { popupEditForm, explorerTitle, explorerSubtitle } from "./index.js";
import { closePopup } from "./modal.js";

const userName = document.querySelector(".explorer__title");
const userSubname = document.querySelector(".explorer__subtitle");
const userAvatar = document.querySelector(".explorer__avatar");
const titleInput = popupEditForm.querySelector(".popup__input_edit_title");
const subtitleInput = popupEditForm.querySelector(".popup__input_edit_subtitle");

function updateUserInfo() {
  fetch("https://nomoreparties.co/v1/plus-cohort-15/users/me",
    {
      headers: {
        authorization: "ff705783-056a-4764-ac32-7205ca669857",
      }
    })
    .then((res) => res.json())
    .then((userInfo) => {
      userName.textContent = userInfo.name;
      userSubname.textContent = userInfo.about;
      userAvatar.style.backgroundImage = `url(${userInfo.avatar})`
    });
}


function changeExplorerInfo(evt) {
  evt.preventDefault();

  const titleInputValue = titleInput.value;
  const subtitleInputValue = subtitleInput.value;

  const newTitleInputValue = titleInputValue;
  const newSubtitleInputValue = subtitleInputValue;

  titleInput.textContent = newTitleInputValue;
  subtitleInput.textContent = newSubtitleInputValue;
  explorerTitle.textContent = newTitleInputValue;
  explorerSubtitle.textContent = newSubtitleInputValue;
  const nearestPopup = evt.target.closest(".popup");
  closePopup(nearestPopup);
}

export { changeExplorerInfo, updateUserInfo};
