// eslint-disable-next-line no-unused-vars
import { doc } from "prettier";

//popupAdd
const page = document.querySelector(".page"); //pageObj

//popup edit vars
const popupEdit = page.querySelector(".popup_type_edit");
const popupAdd = page.querySelector(".popup_type_add");
const popupImage = page.querySelector(".popup_type_image");

const popupEditForm = popupEdit.querySelector(".popup__container");
const popupAddForm = page.querySelector(".popup_type_add");
const popupAvatar = document.querySelector(".popup_type_avatar");

const popups = document.querySelectorAll(".popup");

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(evt.target);
    }
  });
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export {
  popupAddForm,
  popupEditForm,
  openPopup,
  popupImage,
  popupAdd,
  closePopup,
  popupEdit,
  popupAvatar,
};
