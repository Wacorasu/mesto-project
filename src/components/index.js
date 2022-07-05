import {addNewCard, addPhotoCard} from './card.js'
import {closePopup, openPopup} from './utils.js';
import {editProfile} from './modal.js';
import {enableValidation} from './validate.js';
import '../pages/index.css';
export {popupEdit, popupAdd, editTitleName, editSubTitleName, titleName, subTitleName};

const californiaImage = new URL('../images/card-california.jpg', import.meta.url);
const fanlandImage = new URL('../images/card-finland.jpg', import.meta.url);
const italiImage = new URL('../images/card-italia-marche.jpg', import.meta.url);
const kareliaImage = new URL('../images/card-kizhi.jpg', import.meta.url);
const switzerlandImage = new URL('../images/card-schweiz.jpg', import.meta.url);
const japanImage = new URL('../images/card_okinawa.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Калифорния',
    link: californiaImage
  },
  {
    name: 'Финляндия',
    link: fanlandImage
  },
  {
    name: 'Марке Италия',
    link: italiImage
  },
  {
    name: 'Кижи Карелия',
    link: kareliaImage
  },
  {
    name: 'Швейцария',
    link: switzerlandImage
  },
  {
    name: 'Окинава Япония',
    link: japanImage
  }
  ];
const content= document.querySelector('.main');
const buttonEdit=content.querySelector('.button-edit');
const buttonAdd=content.querySelector('.button-add');
const buttonsClose=content.querySelectorAll('.button-exit, .pop-up');
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


buttonsClose.forEach(button => {
  const popup=button.closest('.pop-up');
  button.addEventListener('click', (evt) => {
    if (evt.target===evt.currentTarget){
    closePopup(popup);
    }});
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
