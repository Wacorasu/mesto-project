import {getDataProfile, setDataProfile, setAvatarProfile, getDataCard, putNewCard} from './api.js';
import {createCard} from './card.js'
import {closePopup, openPopup} from './modal.js';
import {enableValidation, toggleButtonState} from './validate.js';
export {profileID, massiveCards, enableRenderLoadin, disableRenderLoadin, checkResponse};

import '../pages/index.css';


const content= document.querySelector('.main');
const buttonEdit=content.querySelector('.button-edit');
const buttonAddCard=content.querySelector('#buttonAddCard');
const buttonsClose=content.querySelectorAll('.pop-up');
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


function setProfileData(title, subtitle) {
  titleName.textContent=title;
  subTitleName.textContent=subtitle;
}

//Загрузка данных профиля
function setProfileAvatar(img) {
  porfileAvatar.setAttribute('src', img);
};
Promise.all([getDataProfile(), getDataCard()])
.then(([userData, cards]) =>{
  if (userData.ok && cards.ok){
    return Promise.all([userData.json(), cards.json()]);
  } else {
    return Promise.reject([userData.status, cards.status]);
  }
})
.then((res) => {
  setProfileData(res[0].name, res[0].about);
  setProfileAvatar(res[0].avatar);
  profileID=res[0]._id;
  res[1].forEach(function(item){
    massiveCards.push(item);
    addPhotoCardApend(item.name, item.link, item.likes, item._id, true);
  });
})
.catch(err => console.log(err));



//Добавление слушателей на закртыие попапов
buttonsClose.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('pop-up_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('button-exit')) {
        closePopup(popup)
      }
  })
})

//Добавление слушателей
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
  .then(checkResponse)
  .then(res=>{
    setProfileAvatar(res.avatar);
    closePopup(popupAvatar);
    evt.target.reset();
  })
  .catch(err=> console.log(err))
  .finally(()=>{
    disableRenderLoadin(formPopUpAvatar.buttonAddAvatar);
  });
};

//Рендер загругзки
function enableRenderLoadin(buttonElement){
  buttonElement.textContent+='...';
}

function disableRenderLoadin(buttonElement){
  buttonElement.textContent=buttonElement.textContent.slice(0,-3);
}

//обработчик запроса
function checkResponse(res){
    if (res.ok){
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
};

//Функция работы формы добавления карточек
function addNewCard(evt) {
  evt.preventDefault();
  enableRenderLoadin(formPopUpAdd.buttonAddCard);
  putNewCard(nameAdd.value, imageAdd.value)
  .then(checkResponse)
  .then(res=>{
    massiveCards.push(res);
    addPhotoCardPrepand(res.name, res.link, res.likes, res._id, false);
    closePopup(popupAdd);
    evt.target.reset();
  })
  .catch(err=> console.log(err))
  .finally(()=>{
    disableRenderLoadin(formPopUpAdd.buttonAddCard);
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
  .then(checkResponse)
  .then(res=>{
    setProfileData(res.name, res.about);
    closePopup(popupEdit);
  })
  .catch(err=> console.log(err))
  .finally(()=>{
    disableRenderLoadin(formPopUpEdit.buttonEdit)
  })

}



enableValidation({
  formSelector: '.edit-from__input-container',
  inputSelector: '.edit-form__edit',
  buttonSelector: '.button-save',
  editFormErrorClass: 'edit-form__edit_error',
  inactiveButtonClass: 'button-save_inactive'
});
