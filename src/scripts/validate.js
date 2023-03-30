//forms

const validationSettings = {
  formClass: "form",
  popupInputClass: ".popup__input",
  popupButtonClass: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  inputActiveErrorClass: "popup__input-error_active",
  inactiveButtonClass: "popup__button_inactive",
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputActiveErrorClass);
};


const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.inputActiveErrorClass);
  errorElement.textContent = '';
}

const isValid = (formElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    return false;
  } else {
    hideInputError(formElement, inputElement, settings);
    return true;
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.popupInputClass));
  const buttonElement = formElement.querySelector(settings.popupButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formClass));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
}

const hasInvalidInput =(inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const  toggleButtonState = (inputList, buttonElement, classes) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(classes.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(classes.inactiveButtonClass);
  }
}

export { enableValidation, validationSettings };
