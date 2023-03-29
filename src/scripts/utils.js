import { popupEditForm, explorerTitle, explorerSubtitle } from "./index.js";
import { closePopup } from "./modal.js";
import { getUserInfo, patchUserAvatar, updateUserInfo } from "./api.js";

const userName = document.querySelector(".explorer__title");
const userSubname = document.querySelector(".explorer__subtitle");
const userAvatar = document.querySelector(".explorer__avatar");
const userId = document.querySelector(".explorer__person"); // dataset

const titleInput = popupEditForm.querySelector(".popup__input_edit_title");
const subtitleInput = popupEditForm.querySelector(
  ".popup__input_edit_subtitle"
);

function loadUserInfo() {
  getUserInfo()
    .then((userInfo) => {
      userName.textContent = userInfo.name;
      userSubname.textContent = userInfo.about;
      userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
      userId.dataset.user_id = userInfo._id;
    })
    .catch((err) =>
      console.log(`Ошибка при загрузке пользовательских данных ${err}`)
    );
}

function patchUserInfo(userName, userAbout, submitButton, loadingText) {
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = loadingText;

  updateUserInfo(userName, userAbout)
    .catch((err) =>
      console.log(`Ошибка при обновлении пользовательских данных ${err}`)
    )
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

function changeExplorerInfo(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");

  const titleInputValue = titleInput.value;
  const subtitleInputValue = subtitleInput.value;
  explorerTitle.textContent = titleInputValue;
  explorerSubtitle.textContent = subtitleInputValue;

  patchUserInfo(
    titleInputValue,
    subtitleInputValue,
    submitButton,
    "Сохранение..."
  );
  const nearestPopup = evt.target.closest(".popup");

  closePopup(nearestPopup);
}

function changeUserAvatar(evt) {
  evt.preventDefault();

  const avatarUrl = evt.target
    .closest(".popup__form")
    .querySelector(".popup__input_edit_avatar").value;
  const avatarSubmit = evt.target.querySelector(".popup__button");

  const originalButtonText = avatarSubmit.textContent;
  avatarSubmit.textContent = "Сохранение...";

  patchUserAvatar(avatarUrl)
    .then(() => {
      userAvatar.style.backgroundImage = `url(${avatarUrl})`;
      closePopup(evt.target.closest(".popup"));
    })
    .finally(() => {
      avatarSubmit.textContent = originalButtonText;
    });
}

export { changeExplorerInfo, loadUserInfo, changeUserAvatar };
