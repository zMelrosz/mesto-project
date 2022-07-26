let page = document.querySelector('.page'); //pageObj
let main = page.querySelector('main'); //mainObj

//explorer
let explorerEditButton = main.querySelector('.explorer').querySelector('.explorer__person').querySelector('.explorer__description').querySelector('.explorer__title-edit').querySelector('.explorer__edit');
let explorerTitle = main.querySelector('.explorer').querySelector('.explorer__person').querySelector('.explorer__description').querySelector('.explorer__title-edit').querySelector('.explorer__title');
let explorerSubtitle = main.querySelector('.explorer').querySelector('.explorer__person').querySelector('.explorer__description').querySelector('.explorer__subtitle'); 

//popupAdd
const addCardButton = page.querySelector('.explorer__add');
const addCardClose = page.querySelector('.popup__close_type_add');

//popup edit vars
const popupEdit = page.querySelector('.popup_type_edit');
const popupAdd = page.querySelector('.popup_type_add');
const popupEditCloseButton = popupEdit.querySelector('.popup__container').querySelector('.popup__close');
const popupEditForm = popupEdit.querySelector('.popup__container').querySelector('.popup__form');
let titleInput = popupEditForm.querySelector('.popup__input_edit_title');
let subtitleInput = popupEditForm.querySelector('.popup__input_edit_subtitle');
const popupAddForm = page.querySelector('.popup_type_add');
let popupAddNameInput = popupAddForm.querySelector('.popup__input_edit_name');
let popupAddUrlInput = popupAddForm.querySelector('.popup__input_edit_url');


//----------cards----------
let cardsContainer = main.querySelector('.cards');
// let cardDelete = cardsContainer.querySelectorAll('.card__delete');

function addCard(cardName, cardImg)
{
  
  const cardTemp = document.querySelector('#card-temp').content;
  let cardClone = cardTemp.querySelector('.card').cloneNode(true);
  
  cardClone.querySelector('.card__name').textContent = cardName; // set card title
  cardClone.querySelector('.card__image').src=cardImg; //set img

  cardsContainer.prepend(cardClone);
  
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

for (i=0; i < initialCards.length; i++)
{
  addCard(initialCards[i].name, initialCards[i].link)
}

let cardLike = cardsContainer.querySelectorAll('.card__like'); 

function cardToContainer(evt)
{
  log(cardLike.length);
  evt.preventDefault();

  let cardNameInputValue = popupAddNameInput.value;
  let cardUrlInputValue = popupAddUrlInput.value;

  addCard(cardNameInputValue, cardUrlInputValue);
  cardLike = cardsContainer.querySelectorAll('.card__like');
  log(cardLike.length);
  popupAddToggle();
}

popupAddForm.addEventListener('submit', cardToContainer);

// popup events
function popupEditToggle()
{
  popupEdit.classList.toggle('popup_opened');
}

function popupAddToggle()
{
  popupAdd.classList.toggle('popup_opened');
}

//clickListeners
explorerEditButton.addEventListener('click', popupEditToggle);
popupEditCloseButton.addEventListener('click', popupEditToggle);
addCardButton.addEventListener('click', popupAddToggle);
addCardClose.addEventListener('click', popupAddToggle);


function log(log)
{
  console.log(log);
}

function formSubmitHandler (evt) //popup edit func
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
  popupEditToggle();
}

popupEditForm.addEventListener('submit', formSubmitHandler);

log(cardLike.length);
for (i=0; i < cardLike.length; i++)
{
cardLike[i].addEventListener('click', function(evt)
{
  let chooseLike = evt.target;
  chooseLike.classList.toggle('card_liked');
});
}

let cardDelete = cardsContainer.querySelectorAll('.card__delete');
log(cardDelete[0]);

for (i=0; i<cardDelete.length; i++)
{
  cardDelete[i].addEventListener('click', function(evt)
  {
    let chosenDelete = evt.target;
    chosenDelete.closest('.card').remove();
  });
}
