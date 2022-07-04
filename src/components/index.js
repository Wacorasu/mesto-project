import {addNewCard, addPhotoCard} from './card.js'
import {closePopup, openPopup} from './utils.js';
import {editProfile} from './modal.js';
import {enableValidation} from './validate.js';
export {popupEdit, popupAdd, editTitleName, editSubTitleName, titleName, subTitleName};

const initialCards = [
  {
    name: 'Калифорния',
    link: './images/card-california.jpg'
  },
  {
    name: 'Финляндия',
    link: './images/card-finland.jpg'
  },
  {
    name: 'Марке Италия',
    link: './images/card-italia-marche.jpg'
  },
  {
    name: 'Кижи Карелия',
    link: './images/card-kizhi.jpg'
  },
  {
    name: 'Швейцария',
    link: './images/card-schweiz.jpg'
  },
  {
    name: 'Окинава Япония',
    link: './images/card_okinawa.jpg'
  }
  ];
const content= document.querySelector('.main');
const buttonEdit=content.querySelector('.button-edit');
const buttonAdd=content.querySelector('.button-add');
const buttonsClose=content.querySelectorAll('.button-exit');
const popupEdit=content.querySelector('#pop-up-edit');
const popupAdd=content.querySelector('#pop-up-add');
const formPopUpEdit=popupEdit.querySelector('#edit-form');
const formPopUpAdd=content.querySelector('#add-form');
const editTitleName=popupEdit.querySelector('#edit-name');
const editSubTitleName=popupEdit.querySelector('#edit-subname');
const titleName=content.querySelector('.profile__title-name');
const subTitleName=content.querySelector('.profile__subtitle-description');
editTitleName.value=titleName.textContent;
editSubTitleName.value=subTitleName.textContent;

//Изначальное добавление карточек
initialCards.forEach(function(item){
  addPhotoCard(item.name, item.link);
});

buttonsClose.forEach((button) => {
  const popup=button.closest('.pop-up');
  button.addEventListener('click', () => closePopup(popup));
});

formPopUpEdit.addEventListener('submit', editProfile);
formPopUpAdd.addEventListener('submit', addNewCard);
buttonEdit.addEventListener('click', () =>{
  editTitleName.value=titleName.textContent;
  editSubTitleName.value=subTitleName.textContent;
  openPopup(popupEdit)
});
buttonAdd.addEventListener('click',() => openPopup(popupAdd));


enableValidation({
  formSelector: '.edit-from__input-container',
  inputSelector: '.edit-form__edit',
  buttonSelector: '.button-save',
  editFormErrorClass: 'edit-form__edit_error',
  inactiveButtonClass: 'button-save_inactive'
});
