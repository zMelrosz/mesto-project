
import {putCardToContainer, putInitialCards, addCardButton} from "./card.js";
import {popupAddForm, popupEditForm, openPopup, popupAdd, popupEdit, closePopup} from "./modal.js";
import {enableValidation, classes} from "./validate.js";
import { changeExplorerInfo, updateUserInfo } from "./utils.js"; 
import '../pages/pages.css' // импортировали главный файл стилей

const page = document.querySelector('.page'); //pageObj
const main = page.querySelector('main'); //mainOb

//explorer
const explorerEditButton = main.querySelector('.explorer__edit');
const explorerTitle = main.querySelector('.explorer__title');
const explorerSubtitle = main.querySelector('.explorer__subtitle'); 
const titleInput = popupEditForm.querySelector('.popup__input_edit_title');
const subtitleInput = popupEditForm.querySelector('.popup__input_edit_subtitle');

//updateUserInfo
updateUserInfo();

//enable validation
enableValidation(classes);

//add initial cards
popupAddForm.addEventListener('submit', putCardToContainer);
putInitialCards();


// popup open listeners
explorerEditButton.addEventListener('click', function () 
{ 
  titleInput.value = explorerTitle.textContent;
  subtitleInput.value = explorerSubtitle.textContent;
  openPopup(popupEdit);
});

// addCardButton listener
addCardButton.addEventListener('click', function()
{
  openPopup(popupAdd);
});

popupEditForm.addEventListener('submit', changeExplorerInfo);

//popup closers listeners 
const allClosers = document.querySelectorAll('.popup__close');
allClosers.forEach(function(closer)
{
  closer.addEventListener('click', function(evt)
  {
    const closestPopup = evt.target.closest('.popup');
    closePopup(closestPopup);
  });
});

export {popupEditForm, explorerTitle, explorerSubtitle};
