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

const loadUserInfoAndInitialCards = async () => {
  try {
    const [userInfo, cards] = await Promise.all([getUserInfo(), getInitialCards()]);

    //load and put user info
    userName.textContent = userInfo.name;
    userSubname.textContent = userInfo.about;
    userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    userId.dataset.user_id = userInfo._id;

    //load and put initial cards
    cards.forEach(async (card) => {
      const initialCard = await createCard(card);
      cardsContainer.prepend(initialCard);
    });
  } catch (err) {
    console.log(`Ошибка при загрузке пользовательских данных и карточек ${err}`);
  }
}

const changeExplorerInfo = async (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  const nearestPopup = evt.target.closest(".popup");

  const titleInputValue = titleInput.value;
  const subtitleInputValue = subtitleInput.value;

  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  try {
    await updateUserInfo(titleInputValue, subtitleInputValue);
    explorerTitle.textContent = titleInputValue;
    explorerSubtitle.textContent = subtitleInputValue;
    closePopup(nearestPopup);
  } catch (err) {
    console.log(`Ошибка при обновлении пользовательских данных ${err}`);
  } finally {
    submitButton.textContent = originalButtonText;
  }
}

const changeUserAvatar = async (evt) => {
  evt.preventDefault();

  const avatarUrl = evt.target
    .closest(".popup__form")
    .querySelector(".popup__input_edit_avatar").value;
  const avatarSubmit = evt.target.querySelector(".popup__button");

  const originalButtonText = avatarSubmit.textContent;
  avatarSubmit.textContent = "Сохранение...";

  try {
    await patchUserAvatar(avatarUrl);
    userAvatar.style.backgroundImage = `url(${avatarUrl})`;
    closePopup(evt.target.closest(".popup"));
  } catch (err) {
    console.log(`Ошибка при обновлении пользовательского аватара ${err}`);
  } finally {
    avatarSubmit.textContent = originalButtonText;
  }
}

export { changeExplorerInfo, loadUserInfoAndInitialCards, changeUserAvatar };
