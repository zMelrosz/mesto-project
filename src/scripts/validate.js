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

const setEventListeners = (formElement, inputClass, buttonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputClass));
  const buttonElement = formElement.querySelector(buttonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
}

const enableValidation = (classes) => {
  const formList = Array.from(document.querySelectorAll(classes.formClass));
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
