import {getDataProfile, setDataProfile, setAvatarProfile, getDataCard, putNewCard} from './api.js';
import {createCard} from './card.js'
import {closePopup, openPopup, closeWithOverlay} from './modal.js';
import {enableValidation, toggleButtonState} from './validate.js';
export {profileID, massiveCards, enableRenderLoadin, disableRenderLoadin};

import '../pages/index.css';


const content= document.querySelector('.main');
const buttonEdit=content.querySelector('.button-edit');
const buttonAddCard=content.querySelector('#buttonAddCard');
const buttonsClose=content.querySelectorAll('.button-exit, .pop-up');
const buttonsEditAvatar=content.querySelector('.profile__avatar-edit');
const photoPanel = content.querySelector(".photo-panel");
const popupEdit=content.querySelector('#pop-up-edit');
const popupAdd=content.querySelector('#pop-up-add');
const popupAvatar=content.querySelector('#pop-up-add-avatar');
const formPopUpEdit=popupEdit.querySelector('#edit-form');
const formPopUpAdd=content.querySelector('#add-form');
const formPopUpAvatar=content.querySelector('#add-avatar');
const editTitleName=popupEdit.querySelector('#edit-name');
const editSubTitleName=popupEdit.querySelector('#edit-subname');
const titleName=content.querySelector('.profile__title-name');
const subTitleName=content.querySelector('.profile__subtitle-description');
const nameAdd=content.querySelector('#add-name');
const imageAdd=content.querySelector('#add-image');
const avatarAdd=content.querySelector('#input-add-avatar');
const porfileAvatar=content.querySelector('.profile__avatar');
const massiveCards=[];
let profileID='';

//Загрузка данных профиля

getDataProfile()
.then(res=>{
  if (res.ok){
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
})
.then(res=>{
  setProfileData(res.name, res.about);
  setProfileAvatar(res.avatar);
  profileID=res._id;
})
.catch(err=> console.log(err));


//Загрузка карточек пользователей
getDataCard()
.then(res=>{
  if (res.ok){
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
})
.then(res=>{
  res.forEach(function(item){
    massiveCards.push(item);
    addPhotoCardApend(item.name, item.link, item.likes, item._id, true);
  });
})
.catch(err=> console.log(err));

function setProfileData(title, subtitle) {
  titleName.textContent=title;
  subTitleName.textContent=subtitle;
}


function setProfileAvatar(img) {
  porfileAvatar.setAttribute('src', img);
};


//Добавление слушателей
buttonsClose.forEach(button => {
  button.addEventListener('click', closeWithOverlay);
});


formPopUpEdit.addEventListener('submit', editProfile);
formPopUpAdd.addEventListener('submit', addNewCard);
buttonsEditAvatar.addEventListener('click', () => {
  toggleButtonState(Array.from(formPopUpAvatar), formPopUpAvatar.buttonAddAvatar, 'button-save_inactive');
  openPopup(popupAvatar);
});
formPopUpAvatar.addEventListener('submit', addAvatar);



buttonEdit.addEventListener('click', () =>{
  editTitleName.value=titleName.textContent;
  editSubTitleName.value=subTitleName.textContent;
  toggleButtonState(Array.from(formPopUpEdit), formPopUpEdit.buttonEdit, 'button-save_inactive');
  openPopup(popupEdit);
});
buttonAddCard.addEventListener('click',() => {
  toggleButtonState(Array.from(formPopUpAdd), formPopUpAdd.buttonAddCard, 'button-save_inactive');
  openPopup(popupAdd);
});

//Функция обновления аватара
function addAvatar(evt) {
  evt.preventDefault();
  enableRenderLoadin(formPopUpAvatar.buttonAddAvatar);
  setAvatarProfile(avatarAdd.value)
  .then(res=>{
    if (res.ok){
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .then(res=>{
  setProfileAvatar(res.avatar);
  })
  .catch(err=> console.log(err))
  .finally(()=>{
    disableRenderLoadin(formPopUpAvatar.buttonAddAvatar);
    evt.target.reset();
    closePopup(popupAvatar);
  });
};

//Рендер загругзки
function enableRenderLoadin(buttonElement){
  buttonElement.textContent+='...';
}

function disableRenderLoadin(buttonElement){
  buttonElement.textContent=buttonElement.textContent.slice(0,-3);
}

//Функция работы формы добавления карточек
function addNewCard(evt) {
  evt.preventDefault();
  enableRenderLoadin(formPopUpAdd.buttonAddCard);
  putNewCard(nameAdd.value, imageAdd.value)
  .then(res=>{
    if (res.ok){
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .then(res=>{
    massiveCards.push(res);
    addPhotoCardPrepand(res.name, res.link, res.likes, res._id, false);
  })
  .catch(err=> console.log(err))
  .finally(()=>{
    disableRenderLoadin(formPopUpAdd.buttonAddCard)
    evt.target.reset();
    closePopup(popupAdd);
  });
};

//Функция добавление самих карточек
function addPhotoCardPrepand(name, img, likes, id, disable) {
  const photoCard = createCard(name, img, likes, id, disable);
  photoPanel.prepend(photoCard);
}

function addPhotoCardApend(name, img, likes, id, disable) {
  const photoCard = createCard(name, img, likes, id, disable);
  photoPanel.append(photoCard);
}

//Функция редактирования профиля
function editProfile(evt) {
  evt.preventDefault();
  enableRenderLoadin(formPopUpEdit.buttonEdit)
  setDataProfile(editTitleName.value, editSubTitleName.value)
  .then(res=>{
    if (res.ok){
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .then(res=>{
  setProfileData(res.name, res.about);
  })
  .catch(err=> console.log(err))
  .finally(()=>{
    disableRenderLoadin(formPopUpEdit.buttonEdit)
    closePopup(popupEdit);
  })

}



enableValidation({
  formSelector: '.edit-from__input-container',
  inputSelector: '.edit-form__edit',
  buttonSelector: '.button-save',
  editFormErrorClass: 'edit-form__edit_error',
  inactiveButtonClass: 'button-save_inactive'
});
