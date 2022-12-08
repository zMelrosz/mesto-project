//forms

const classes = {
  formClass: "form",
  popupInputClass: ".popup__input",
  popupButtonClass: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  inputActiveErrorClass: "popup__input-error_active",
};

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  errorClass,
  activeErrorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(activeErrorClass);
}

function hideInputError(
  formElement,
  inputElement,
  errorClass,
  activeErrorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(errorClass);
  errorElement.classList.remove(activeErrorClass);
  errorElement.textContent = "";
}

function isValid(formElement, inputElement) {
  console.log(inputElement);
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      classes.inputErrorClass,
      classes.inputActiveErrorClass
    );
  } else {
    hideInputError(
      formElement,
      inputElement,
      classes.inputErrorClass,
      classes.inputActiveErrorClass
    );
  }
}

function setEventListeners(formElement, inputClass, buttonClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputClass));
  const buttonElement = formElement.querySelector(buttonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation(formClass) {
  const formList = Array.from(document.querySelectorAll(formClass));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      classes.popupInputClass,
      classes.popupButtonClass
    );
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
}

export { enableValidation, classes };
