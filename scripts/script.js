let page = document.querySelector('.page'); //pageObj
let main = page.querySelector('main'); //mainObj
let explorerEditButton = main.querySelector('.explorer').querySelector('.explorer__person').querySelector('.explorer__description').querySelector('.explorer__title-edit').querySelector('.explorer__edit');
let explorerTitle = main.querySelector('.explorer').querySelector('.explorer__person').querySelector('.explorer__description').querySelector('.explorer__title-edit').querySelector('.explorer__title');
let explorerSubtitle = main.querySelector('.explorer').querySelector('.explorer__person').querySelector('.explorer__description').querySelector('.explorer__subtitle'); 
let popup = page.querySelector('.popup'); //popupObj
let popupCloseButton = popup.querySelector('.popup__container').querySelector('.popup__close');
let popupForm = popup.querySelector('.popup__container').querySelector('.popup__form');
let titleInput = popupForm.querySelector('.popup__input_edit_title');
let subtitleInput = popupForm.querySelector('.popup__input_edit_subtitle');
log(titleInput.value);



// popup events
function popupToggle()
{
  popup.classList.toggle('popup_opened');
}
explorerEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

function log(log)
{
  console.log(log);
}

function formSubmitHandler (evt) 
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let titleInputValue = titleInput.value;
  let subtitleInputValue = subtitleInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let newTitleInputValue = titleInputValue;
  let newSubtitleInputValue = subtitleInputValue;


  // Вставьте новые значения с помощью textContent
  titleInput.textContent = newTitleInputValue;
  subtitleInput.textContent = newSubtitleInputValue;
  explorerTitle.textContent = newTitleInputValue;
  explorerSubtitle.textContent = newSubtitleInputValue;
  popupToggle();
}

popupForm.addEventListener('submit', formSubmitHandler);