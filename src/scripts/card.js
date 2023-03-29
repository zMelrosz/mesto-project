import { openPopup, popupImage, popupAddForm, closePopup } from "./modal.js";
import {
  getInitialCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
} from "./api.js";

//----------cards----------
const page = document.querySelector(".page"); //pageObj
const main = page.querySelector("main");
const cardsContainer = main.querySelector(".cards");
const addCardButton = page.querySelector(".explorer__add");
const popupAddNameInput = popupAddForm.querySelector(".popup__input_edit_name");
const popupAddUrlInput = popupAddForm.querySelector(".popup__input_edit_url");

// cards bigger
function listenChosenImage(evt) {
  const clickedImage = evt.target;
  const imageSrc = clickedImage.src;
  const imageCaption = clickedImage
    .closest(".card")
    .querySelector(".card__name").textContent;
  const chosenImage = popupImage.querySelector(".card__image");
  const chosenImageCaption = popupImage.querySelector(".card__image-caption");
  openPopup(popupImage);
  chosenImage.src = imageSrc;
  chosenImage.alt = "Пейзаж";
  chosenImageCaption.textContent = imageCaption;
}

function createCard(cardObj) {
  const userId = document.querySelector(".explorer__person").dataset.user_id;
  const cardTemp = document.querySelector("#card-temp").content;
  const cardClone = cardTemp.querySelector(".card").cloneNode(true);
  const cloneImage = cardClone.querySelector(".card__image");
  const cloneLikes = cardClone.querySelector(".card__like-sch");
  const cloneLikeIcon = cardClone.querySelector(".card__like");
  const cloneDeleteIcon = cardClone.querySelector(".card__delete");

  if (cardObj._id) {
    cardClone.dataset.card_id = cardObj._id; // set card ID
  }
  if (cardObj.owner && cardObj.owner._id) {
    cardClone.dataset.owner_id = cardObj.owner._id; // set owner ID
  }

  //card settings
  cardClone.querySelector(".card__name").textContent = cardObj.name;
  cloneImage.src = cardObj.link;
  cloneImage.alt = "Картинка";
  cloneLikes.textContent = cardObj.likes ? cardObj.likes.length : 0;
  if (cardObj.likes && cardObj.likes.some((like) => like._id === userId)) {
    // user like check
    cloneLikeIcon.classList.add("card_liked");
  }

  if (cardClone.dataset.owner_id === userId) {
    // add delete icons
    cloneDeleteIcon.style = "display: block;";
  }

  // delete card listener
  const cardDelete = cardClone.querySelector(".card__delete");
  cardDelete.addEventListener("click", function (evt) {
    const cardToDelete = evt.target.closest(".card");
    deleteCard(cardToDelete.dataset.card_id)
      .then(() => {
        cardToDelete.remove();
      })
      .catch((err) => console.log(`Ошибка при удалении карточки ${err}`));
  });

  //add cards like listener
  const cloneLike = cardClone.querySelector(".card__like");
  const cloneLikeSch = cardClone.querySelector(".card__like-sch");
  cloneLike.addEventListener("click", function (evt) {
    // toggle like
    const cardToLike = evt.target.closest(".card");
    if (!cardToLike.querySelector(".card_liked")) {
      putLike(cardToLike.dataset.card_id)
        .then((res) => (cloneLikeSch.textContent = res.likes.length))
        .catch((err) => console.log(`Ошибка при постановки лайка ${err}`));
      cardToLike.querySelector(".card__like").classList.add("card_liked");
    } else {
      deleteLike(cardToLike.dataset.card_id)
        .then((res) => (cloneLikeSch.textContent = res.likes.length))
        .catch((err) => console.log(`Ошибка при снятии лайка ${err}`));
      cardToLike.querySelector(".card__like").classList.remove("card_liked");
    }
  });

  cloneImage.addEventListener("click", listenChosenImage); // set "image bigger" listener

  return cardClone;
}

function putCardToContainer(evt) {
  evt.preventDefault();
  const cardNameInputValue = popupAddNameInput.value;
  const cardUrlInputValue = popupAddUrlInput.value;
  const nearestPopup = evt.target.closest(".popup");
  const submitButton = nearestPopup.querySelector(".popup__button");

  function sendCard(cardName, url, submitButton, loadingText) {
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = loadingText;

    postCard(cardName, url)
      .then((responceCard) => {
        const newCard = createCard(responceCard);
        cardsContainer.prepend(newCard);
      })
      .catch((err) =>
        console.log(`Ошибка при отправке карточки на сервер ${err}`)
      )
      .finally(() => {
        submitButton.textContent = originalButtonText;
      });
  }

  sendCard(cardNameInputValue, cardUrlInputValue, submitButton, "Создание...");

  closePopup(nearestPopup);
  popupAddNameInput.value = "";
  popupAddUrlInput.value = "";
  nearestPopup.querySelector(".popup__button").disabled = true;
  evt.submitter.classList.add("popup__button_inactive");
}

function putInitialCards() {
  getInitialCards()
    .then((cards) => {
      cards.forEach(function (card) {
        const initialCard = createCard(card);
        cardsContainer.prepend(initialCard);
      });
    })
    .catch((err) =>
      console.log(`Ошибка при загрузке инициированных карточек ${err}`)
    );
}

export { putCardToContainer, putInitialCards, addCardButton };
