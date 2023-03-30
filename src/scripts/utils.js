import { popupEditForm, explorerTitle, explorerSubtitle } from "./index.js";
import { closePopup } from "./modal.js";
import { getInitialCards, getUserInfo, patchUserAvatar, updateUserInfo } from "./api.js";
import { cardsContainer, createCard } from "./card.js";

const userName = document.querySelector(".explorer__title");
const userSubname = document.querySelector(".explorer__subtitle");
const userAvatar = document.querySelector(".explorer__avatar");
const userId = document.querySelector(".explorer__person"); // dataset

const titleInput = popupEditForm.querySelector(".popup__input_edit_title");
const subtitleInput = popupEditForm.querySelector(
  ".popup__input_edit_subtitle"
);

function loadUserInfoAndInitialCards() {

  Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    //load and put user info
      userName.textContent = userInfo.name;
      userSubname.textContent = userInfo.about;
      userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
      userId.dataset.user_id = userInfo._id;

      //load and put initial cards
      cards.forEach(function (card) {
        const initialCard = createCard(card);
        cardsContainer.prepend(initialCard);
      });
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке пользовательских данных и карточек ${err}`);
  });

}

function changeExplorerInfo(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  const nearestPopup = evt.target.closest(".popup");

  const titleInputValue = titleInput.value;
  const subtitleInputValue = subtitleInput.value;

  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  updateUserInfo(titleInputValue, subtitleInputValue)
    .then(() => {
      explorerTitle.textContent = titleInputValue;
      explorerSubtitle.textContent = subtitleInputValue;
      closePopup(nearestPopup);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении пользовательских данных ${err}`);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
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
    })
    .catch((err) => console.log(`Ошибка при обновлении пользовательского аватара ${err}`))
    
}

export { changeExplorerInfo, loadUserInfoAndInitialCards, changeUserAvatar };
