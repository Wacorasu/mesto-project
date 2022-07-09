export {createCard};
import {closePopup, openPopup} from './modal.js';
import {setLikeCard, deleteLikeCard, deleteServerCard} from './api.js';
import {profileID, massiveCards, enableRenderLoadin, disableRenderLoadin} from './index.js';



const content=document.querySelector('.main');
const templatePhotoCards=content.querySelector('.template-photo-card').content;
const cardPhoto=templatePhotoCards.querySelector('.photo-card');
const popUpImageImage=content.querySelector('.form-image__image');
const popUpImageTitle=content.querySelector('.form-image__title');
const popUpImage=content.querySelector('#pop-up-image');
const popupDelete=content.querySelector('#pop-up-request-delete');
const buttonDelete=content.querySelector('#buttonDeleteCard');

buttonDelete.addEventListener('click',  deleteCard);

//Функция работы лайка
function like(evt, cardLikeCount) {
  if (evt.target.classList.contains("button-like_active")){
    deleteLikeCard(evt.target.closest('.photo-card').id)
    .then(res=>{
      if (res.ok){
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .then(res=>{
      cardLikeCount.textContent=res.likes.length;
      evt.target.classList.remove('button-like_active');
    })
    .catch(err=> console.log(err));
  }else{
    setLikeCard(evt.target.closest('.photo-card').id)
    .then(res=>{
      if (res.ok){
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .then(res=>{
      cardLikeCount.textContent=res.likes.length;
      evt.target.classList.add('button-like_active');
    })
    .catch(err=> console.log(err));
  };
}


//Функция создания карточек
function createCard(name, img, likes, id, disable) {
  const card = cardPhoto.cloneNode(true);
  const cardItemPhoto = card.querySelector(".photo-card__photo");
  const cardItemTitle = card.querySelector(".photo-card__title");
  const cardItemButtonLike = card.querySelector(".button-like");
  const cardItemButtonDelete = card.querySelector(".button-delete");
  const cardLikeCount=card.querySelector(".photo-card__like-counter");
  if (disable && !(massiveCards.find(item=>item._id===id).owner._id===profileID)) {
    cardItemButtonDelete.classList.add('button-delete_disable');
  } else {
    cardItemButtonDelete.addEventListener("click", () => openPopupDelete(id));
  };
  if (likes.some(item=>item._id===profileID)) {
    cardItemButtonLike.classList.add('button-like_active');
  };
  card.setAttribute('id', id);
  cardLikeCount.textContent=likes.length;
  cardItemTitle.textContent = name;
  cardItemPhoto.setAttribute("src", img);
  cardItemPhoto.alt = name;
  cardItemButtonLike.addEventListener("click", (evt) => like(evt, cardLikeCount));
  cardItemPhoto.addEventListener("click", () => openImagePopup(name, img));
  return card;
}


function openImagePopup(name, img) {
  popUpImageImage.setAttribute('src', img);
  popUpImageImage.alt=name;
  popUpImageTitle.textContent=name;
  openPopup(popUpImage);
}

function openPopupDelete(id) {
  buttonDelete.setAttribute('name', id);
  openPopup(popupDelete);
}

//Функция Удаления карточек
function deleteCard(evt) {
  enableRenderLoadin(buttonDelete);
  deleteServerCard(evt.target.name)
  .then(res=>{
    if (res.ok){
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .then(res=>{
    const item=document.getElementById(`${evt.target.name}`);
    item.remove();
    evt.target.name='';
  })
  .catch(err=> console.log(err))
  .finally(()=>{
    disableRenderLoadin(buttonDelete);
    closePopup(popupDelete);
  });
}
