const page = document.querySelector('.page'); //pageObj
const main = page.querySelector('main'); //mainObj

//explorer
const explorerEditButton = main.querySelector('.explorer__edit');
const explorerTitle = main.querySelector('.explorer__title');
const explorerSubtitle = main.querySelector('.explorer__subtitle'); 

//popupAdd
const addCardButton = page.querySelector('.explorer__add');

//popup edit vars
const popupEdit = page.querySelector('.popup_type_edit');
const popupAdd = page.querySelector('.popup_type_add');
const popupImage = page.querySelector('.popup_type_image');

//popupClosers
const popupImageCloser = popupImage.querySelector('.popup__close');
const popupClosers = page.querySelectorAll('.popup__close');

const popupEditForm = popupEdit.querySelector('.popup__container');
const titleInput = popupEditForm.querySelector('.popup__input_edit_title');
const subtitleInput = popupEditForm.querySelector('.popup__input_edit_subtitle');
const popupAddForm = page.querySelector('.popup_type_add');
const popupAddNameInput = popupAddForm.querySelector('.popup__input_edit_name');
const popupAddUrlInput = popupAddForm.querySelector('.popup__input_edit_url');


//----------cards----------
const cardsContainer = main.querySelector('.cards');
const cardImages = cardsContainer.querySelectorAll('.card__image');
const cardLike = cardsContainer.querySelectorAll('.card__like'); 
const cardTemp = document.querySelector('#card-temp').content;

// put closers
function closePopup(popup)
{
  popup.classList.remove('popup_opened');
}

popupClosers.forEach(function (closer)
{
  const popup = closer.closest('.popup');
  closer.addEventListener('click', () => closePopup(popup));
});

//----------------------------------------------------------------

function openPopup(popup)
{
  popup.classList.add('popup_opened');
}

// cards bigger
function listenChosenImage(evt)
{
  const clickedImage = evt.target;
  const imageSrc = clickedImage.src;
  const imageCaption = clickedImage.closest('.card').querySelector('.card__name').textContent;
  openPopup(popupImage);
  const chosenImage = popupImage.querySelector('.card__image');
  let chosenImageCaption = popupImage.querySelector('.card__image-caption');
  chosenImage.src = imageSrc;
  chosenImage.alt = '????????????';
  chosenImageCaption.textContent = imageCaption;
}

function createCard(cardName, imageSrc)
{
  const cardClone = cardTemp.querySelector('.card').cloneNode(true);

  cardClone.querySelector('.card__name').textContent = cardName; // set card title
  cardClone.querySelector('.card__image').src = imageSrc; //set img
  cardClone.querySelector('.card__image').alt = '????????????'; 
  const cloneImage = cardClone.querySelector('.card__image');

  cloneImage.addEventListener('click', listenChosenImage); // set image bigger listener

  //add cards like listener
  let cloneLike = cardClone.querySelector('.card__like'); 
  cloneLike.addEventListener('click', function(evt) 
    {
      let chooseLike = evt.target;
      chooseLike.classList.toggle('card_liked');
    });

    let cardDelete = cardClone.querySelector('.card__delete');
    cardDelete.addEventListener('click', function(evt)
    {
      let chosenDelete = evt.target;
      chosenDelete.closest('.card').remove();
    });

    return cardClone;
}


const initialCards = [
  {
    name: '??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: '?????????????????????? ??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: '??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: '????????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: '???????????????????????? ??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: '????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function putCardToContainer(evt)
{
  evt.preventDefault();

  const cardNameInputValue = popupAddNameInput.value;
  const cardUrlInputValue = popupAddUrlInput.value;
  const newCard = createCard(cardNameInputValue, cardUrlInputValue);
  cardsContainer.prepend(newCard);
  const nearestPopup = evt.target.closest('.popup');
  closePopup(nearestPopup);
}

initialCards.forEach(function (card)
{
  const initialCard = createCard(card.name, card.link);
  cardsContainer.prepend(initialCard);
});

popupAddForm.addEventListener('submit', putCardToContainer);

// popup events
function popupEditToggle()
{
  popupEdit.classList.toggle('popup_opened');
}

 function popupAddToggle()
{
  popupAdd.classList.toggle('popup_opened');
}

 function popupImageToggle()
{
  popupImage.classList.toggle('popup_opened');
}

// popup open listeners
explorerEditButton.addEventListener('click', function ()
{ 
  openPopup(popupEdit);
});

addCardButton.addEventListener('click', function()
{
  openPopup(popupAdd);
});

function log(log)
{
  console.log(log);
}

function formSubmitHandler (evt) // ?????? ???????????????????? ?????????? ?????? ?????? ?????????????? ?? ????????????, ?? ?????? ???????????????? - ???? ??????????!
{
  evt.preventDefault();

  let titleInputValue = titleInput.value; 
  let subtitleInputValue = subtitleInput.value; 

  let newTitleInputValue = titleInputValue; 
  let newSubtitleInputValue = subtitleInputValue; 

  titleInput.textContent = newTitleInputValue; 
  subtitleInput.textContent = newSubtitleInputValue;
  explorerTitle.textContent = newTitleInputValue;
  explorerSubtitle.textContent = newSubtitleInputValue;
  let nearestPopup = evt.target.closest('.popup');
  closePopup(nearestPopup);
}

popupEditForm.addEventListener('submit', formSubmitHandler);


