function changeExplorerInfo (evt)
{
  evt.preventDefault();
  const titleInput = popupEditForm.querySelector('.popup__input_edit_title');
  const subtitleInput = popupEditForm.querySelector('.popup__input_edit_subtitle');
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