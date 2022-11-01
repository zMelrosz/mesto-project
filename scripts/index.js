
import {putCardToContainer, putInitialCards, addCardButton} from "./card.js";
import {popupAddForm, popupEditForm, openPopup, popupAdd, popupEdit, closePopup} from "./modal.js";
import {enableValidation, editFormInput, isValid} from "./validate.js";
import { changeExplorerInfo } from "./utils.js";

const page = document.querySelector('.page'); //pageObj
const main = page.querySelector('main'); //mainOb

//explorer
const explorerEditButton = main.querySelector('.explorer__edit');
const explorerTitle = main.querySelector('.explorer__title');
const explorerSubtitle = main.querySelector('.explorer__subtitle'); 

enableValidation();

editFormInput.addEventListener('input', isValid);

popupAddForm.addEventListener('submit', putCardToContainer);
putInitialCards();

// popup open listeners
explorerEditButton.addEventListener('click', function () // Благодарю
{ 
  const titleInput = popupEditForm.querySelector('.popup__input_edit_title');
  const subtitleInput = popupEditForm.querySelector('.popup__input_edit_subtitle');
  titleInput.value = explorerTitle.textContent;
  subtitleInput.value = explorerSubtitle.textContent;
  openPopup(popupEdit); 
});

addCardButton.addEventListener('click', function()
{
  openPopup(popupAdd);
});

popupEditForm.addEventListener('submit', changeExplorerInfo);