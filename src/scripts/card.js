import { openPopup, popupImage, popupAddForm, closePopup} from "./modal.js";

//----------cards----------
const page = document.querySelector('.page'); //pageObj
const main = page.querySelector('main');
const cardsContainer = main.querySelector('.cards');
const addCardButton = page.querySelector('.explorer__add');

// cards bigger
function listenChosenImage(evt)
{
  const clickedImage = evt.target;
  const imageSrc = clickedImage.src;
  const imageCaption = clickedImage.closest('.card').querySelector('.card__name').textContent;
  const chosenImage = popupImage.querySelector('.card__image');
  const chosenImageCaption = popupImage.querySelector('.card__image-caption');
  openPopup(popupImage);
  chosenImage.src = imageSrc;
  chosenImage.alt = 'Пейзаж';
  chosenImageCaption.textContent = imageCaption;
}

function createCard(cardName, imageSrc)
{
  const cardTemp = document.querySelector('#card-temp').content;
  const cardClone = cardTemp.querySelector('.card').cloneNode(true);

  cardClone.querySelector('.card__name').textContent = cardName; // set card title
  cardClone.querySelector('.card__image').src = imageSrc; //set img
  cardClone.querySelector('.card__image').alt = 'Пейзаж'; 
  const cloneImage = cardClone.querySelector('.card__image');

  cloneImage.addEventListener('click', listenChosenImage); // set image bigger listener

  //add cards like listener
  const cloneLike = cardClone.querySelector('.card__like'); 
  cloneLike.addEventListener('click', function(evt) 
    {
      const chooseLike = evt.target;
      chooseLike.classList.toggle('card_liked');
    });

    const cardDelete = cardClone.querySelector('.card__delete');
    cardDelete.addEventListener('click', function(evt)
    {
      const chosenDelete = evt.target;
      chosenDelete.closest('.card').remove();
    });

    return cardClone;
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

function putCardToContainer(evt)
{
  evt.preventDefault();
  const popupAddNameInput = popupAddForm.querySelector('.popup__input_edit_name');
  const popupAddUrlInput = popupAddForm.querySelector('.popup__input_edit_url');
  const cardNameInputValue = popupAddNameInput.value;
  const cardUrlInputValue = popupAddUrlInput.value;
  const newCard = createCard(cardNameInputValue, cardUrlInputValue);
  cardsContainer.prepend(newCard);
  const nearestPopup = evt.target.closest('.popup');
  closePopup(nearestPopup);
}

function putInitialCards()
{
  initialCards.forEach(function (card)
  {
    const initialCard = createCard(card.name, card.link);
    cardsContainer.prepend(initialCard);
  });
}

export {putCardToContainer, putInitialCards, addCardButton};

