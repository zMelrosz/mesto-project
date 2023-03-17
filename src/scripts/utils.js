import { popupEditForm, explorerTitle, explorerSubtitle, } from "./index.js";
import { closePopup } from "./modal.js";

const tempCohortId = "plus-cohort-22";
const tempAuthTn = "37ffcee9-990f-410f-926f-55d3b1286071";

const userName = document.querySelector(".explorer__title");
const userSubname = document.querySelector(".explorer__subtitle");
const userAvatar = document.querySelector(".explorer__avatar");
const userId = document.querySelector(".explorer__person"); // dataset

const titleInput = popupEditForm.querySelector(".popup__input_edit_title");
const subtitleInput = popupEditForm.querySelector(
  ".popup__input_edit_subtitle"
);

function getUserInfo() {
  fetch(`https://nomoreparties.co/v1/${tempCohortId}/users/me`, {
    headers: {
      authorization: `${tempAuthTn}`,
    },
  })
    .then((res) => res.json())
    .then((userInfo) => {
      userName.textContent = userInfo.name;
      userSubname.textContent = userInfo.about;
      userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
      userId.dataset.user_id = userInfo._id;
    });
}

function changeExplorerInfo(evt) {
  evt.preventDefault();

  const titleInputValue = titleInput.value;
  const subtitleInputValue = subtitleInput.value;
  const newTitleInputValue = titleInputValue;
  const newSubtitleInputValue = subtitleInputValue;
  explorerTitle.textContent = newTitleInputValue;
  explorerSubtitle.textContent = newSubtitleInputValue;

  function putUserInfo(userName, userAbout) {
    fetch(`https://nomoreparties.co/v1/${tempCohortId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${tempAuthTn}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    });
  }

  putUserInfo(newTitleInputValue, newSubtitleInputValue);
  const nearestPopup = evt.target.closest(".popup");

  closePopup(nearestPopup);
}

function changeUserAvatar (evt) {
  evt.preventDefault();

  const avatarUrl = evt.target.closest(".popup__form").querySelector(".popup__input_edit_avatar").value;

  fetch(`https://nomoreparties.co/v1/${tempCohortId}/users/me/avatar`, {
    method: "PATCH",
      headers: {
        authorization: `${tempAuthTn}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar : avatarUrl,
      }),
  }).then((res) => res.json()).then((res => console.log(res)))

  userAvatar.style.backgroundImage = `url(${avatarUrl})`;
  console.log(evt.target.closest('.popup'));
  closePopup(evt.target.closest('.popup'));
}

export { changeExplorerInfo, getUserInfo, changeUserAvatar };
