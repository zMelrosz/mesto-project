import { openPopup, popupImage, popupAddForm, closePopup } from "./modal.js";

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
  const userId = document.querySelector('.explorer__person').dataset.user_id;
  const cardTemp = document.querySelector("#card-temp").content;
  const cardClone = cardTemp.querySelector(".card").cloneNode(true);
  const cloneImage = cardClone.querySelector(".card__image");
  const cloneLikes = cardClone.querySelector(".card__like-sch");
  const cloneDeleteIcon = cardClone.querySelector(".card__delete");
  cardClone.dataset.cardId = cardObj._id; //set card ID
  cardClone.dataset.ownerId = cardObj.owner._id; //set owner ID
  
  if (cardClone.dataset.ownerId === userId) {  // add delete icons
    cloneDeleteIcon.style = "display: block;";
  }

  // delete card listener
  const cardDelete = cardClone.querySelector(".card__delete");
  cardDelete.addEventListener("click", function (evt) {
    const chosenDelete = evt.target;
    console.log(chosenDelete.closest(""));
    chosenDelete.closest(".card").remove();
  });

  //card settings
  cardClone.querySelector(".card__name").textContent = cardObj.name;
  cloneImage.src = cardObj.link;
  cloneImage.alt = "Пейзаж";
  cloneLikes.textContent = cardObj.likes.length;

  cloneImage.addEventListener("click", listenChosenImage); // set "image bigger" listener

  //add cards like listener
  const cloneLike = cardClone.querySelector(".card__like");
  cloneLike.addEventListener("click", function (evt) {
    const chooseLike = evt.target;
    chooseLike.classList.toggle("card_liked");
  });

  return cardClone;
}

function sendCard(cardName, url) {
  fetch("https://nomoreparties.co/v1/plus-cohort-15/cards", {
    method: "POST",
    headers: {
      authorization: "ff705783-056a-4764-ac32-7205ca669857",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName,
      link: url,
    }),
  })
    .then((res) => res.json())
    .then((responceCard) => {
      const newCard = createCard(responceCard);
      cardsContainer.prepend(newCard);
    });
}

function putCardToContainer(evt) {
  evt.preventDefault();
  const cardNameInputValue = popupAddNameInput.value;
  const cardUrlInputValue = popupAddUrlInput.value;
  sendCard(cardNameInputValue, cardUrlInputValue);

  const nearestPopup = evt.target.closest(".popup");
  closePopup(nearestPopup);
  popupAddNameInput.value = "";
  popupAddUrlInput.value = "";
  nearestPopup.querySelector(".popup__button").disabled = true;
  evt.submitter.classList.add("popup__button_inactive");
}

function putInitialCards() {
  fetch("https://nomoreparties.co/v1/plus-cohort-15/cards", {
    headers: {
      authorization: "ff705783-056a-4764-ac32-7205ca669857",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((cards) => {
      cards.forEach(function (card) {
        const initialCard = createCard(card);
        cardsContainer.prepend(initialCard);
      });
    });
}

function deleteCard(cardId) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/${cardId}`, {
    method: "delete",
    headers: {
      authorization: "ff705783-056a-4764-ac32-7205ca669857",
    },
  });
}

export { putCardToContainer, putInitialCards, addCardButton };