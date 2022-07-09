export {enableValidation, toggleButtonState};

function isValid(form, element, nameClass){
  if(!element.validity.valid){
    showInputError(form, element, nameClass, element.validationMessage);
  } else {
    hideInputError(form, element, nameClass);
  }
}

function showInputError(formElement, element, nameClass, errorMessage){
  const errorElement=formElement.querySelector(`#${element.id}-error`);
  element.classList.add(nameClass);
  errorElement.textContent=errorMessage;
};

function hideInputError(formElement, element, nameClass){
  const errorElement=formElement.querySelector(`#${element.id}-error`);
  element.classList.remove(nameClass);
  errorElement.textContent='';
};

function toggleButtonState (inputListForm, buttonElement, classButtonInactive){
  if (hasInvaliadForm(inputListForm)) {
    buttonElement.classList.add(classButtonInactive);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(classButtonInactive);
    buttonElement.removeAttribute("disabled");
  }
};

function hasInvaliadForm(inputListForm){
  return inputListForm.some(item=>{
    return  !item.validity.valid;
  });
}

function setEventListener(classForm, classInput, classButton, classEditFormError, classButtonInactive){
  const inputListForm=Array.from(document.querySelectorAll(classForm));
  inputListForm.forEach(form=>{
      const button=form.querySelector(classButton);
      const inputList=Array.from(form.querySelectorAll(classInput));
      toggleButtonState(inputList, button, classButtonInactive);
      inputList.forEach(item=>{
      item.addEventListener('input', ()=>{
        isValid(form, item, classEditFormError);
        toggleButtonState(inputList, button, classButtonInactive);
      });
    });
  });
};

function enableValidation(parametrs){
  const classForm=parametrs.formSelector;
  const classInput=parametrs.inputSelector;
  const classButton=parametrs.buttonSelector;
  const classEditFormError=parametrs.editFormErrorClass;
  const classButtonInactive=parametrs.inactiveButtonClass;
  setEventListener(classForm, classInput, classButton, classEditFormError, classButtonInactive);
};

/* function disabledButton(buttonElement, classButtonInactive) {
  buttonElement.classList.add(classButtonInactive);
  buttonElement.setAttribute("disabled", "disabled");
} */
