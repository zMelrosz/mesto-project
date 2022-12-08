import { popupEditForm, explorerTitle, explorerSubtitle} from "./index.js"; 
import {closePopup} from "./modal.js"

const titleInput = popupEditForm.querySelector('.popup__input_edit_title');
const subtitleInput = popupEditForm.querySelector('.popup__input_edit_subtitle');

function changeExplorerInfo (evt)
{
  evt.preventDefault();

  const titleInputValue = titleInput.value; 
  const subtitleInputValue = subtitleInput.value; 

  const newTitleInputValue = titleInputValue; 
  const newSubtitleInputValue = subtitleInputValue; 

  titleInput.textContent = newTitleInputValue;
  subtitleInput.textContent = newSubtitleInputValue;
  explorerTitle.textContent = newTitleInputValue;
  explorerSubtitle.textContent = newSubtitleInputValue;
  const nearestPopup = evt.target.closest('.popup');
  closePopup(nearestPopup);
}

export {changeExplorerInfo};