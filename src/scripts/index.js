// my avatar url = https://cs.pikabu.ru/post_img/2013/07/09/10/1373385319_602508560.jpg
// black picture url = https://phonoteka.org/uploads/posts/2021-10/1634565314_27-phonoteka-org-p-ochen-chyornii-fon-bez-nichego-krasivie-fo-28.jpg

import { putCardToContainer, addCardButton } from "./card.js";
import {
  popupAddForm,
  popupEditForm,
  openPopup,
  popupAdd,
  popupEdit,
  closePopup,
  popupAvatar,
} from "./modal.js";
import { enableValidation, validationSettings } from "./validate.js";
import { changeExplorerInfo, loadUserInfoAndInitialCards, changeUserAvatar } from "./utils.js";
import "../pages/pages.css"; // импортировали главный файл стилей

const page = document.querySelector(".page"); //pageObj
const main = page.querySelector("main"); //mainOb

//explorer
const explorerEditButton = main.querySelector(".explorer__edit");
const explorerTitle = main.querySelector(".explorer__title");
const explorerSubtitle = main.querySelector(".explorer__subtitle");
const explorerAvatar = document.querySelector(".explorer__avatar");
const titleInput = popupEditForm.querySelector(".popup__input_edit_title");
const subtitleInput = popupEditForm.querySelector(
  ".popup__input_edit_subtitle"
);

loadUserInfoAndInitialCards(); //load user info

//enable validation
enableValidation(validationSettings);

//add initial cards
popupAddForm.addEventListener("submit", putCardToContainer);

// popup open listeners
explorerEditButton.addEventListener("click", () => {
  titleInput.value = explorerTitle.textContent;
  subtitleInput.value = explorerSubtitle.textContent;
  openPopup(popupEdit);
});

// addCardButton listener
addCardButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

// explorer listeners
popupEditForm.addEventListener("submit", changeExplorerInfo);
explorerAvatar.addEventListener("click", () => {
  openPopup(popupAvatar);
});
popupAvatar.addEventListener("submit", changeUserAvatar);

//popup closers listeners
const allClosers = document.querySelectorAll(".popup__close");
allClosers.forEach((closer) => {
  closer.addEventListener("click", function (evt) {
    const closestPopup = evt.target.closest(".popup");
    closePopup(closestPopup);
  });
});

export { popupEditForm, explorerTitle, explorerSubtitle };
