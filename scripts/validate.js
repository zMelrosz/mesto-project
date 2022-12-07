//forms

const editForm = document.querySelector('.popup__form');
const editFormInput = editForm.querySelector('.popup__input');
const formError = editForm.querySelector(`.${editFormInput.id}-error`);

function showInputError(formElement, inputElement, errorMessage)
{
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement)
{
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

function isValid(formElement, inputElement)
{
console.log(inputElement);
  if (inputElement.validity.patternMismatch)
  {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else 
  {
    inputElement.setCustomValidity("");
  }

  if(!inputElement.validity.valid)
  {
    showInputError(formElement,inputElement, inputElement.validationMessage);
  }
  else
  {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement)
{
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => 
  {
    inputElement.addEventListener('input', function ()
    {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation ()
{
  const formList = Array.from(document.querySelectorAll('form'));
  formList.forEach ((formElement) => 
  {
    formElement.addEventListener('submit', function (evt)
    {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

function hasInvalidInput (inputList)
{
  return inputList.some((inputElement) =>
  {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement)
{
  if (hasInvalidInput(inputList))
  {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_inactive');
  }
  else
  {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_inactive');
  }
}

export {enableValidation, editFormInput, isValid};