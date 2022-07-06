export {createCard};
import {openPopup} from './modal.js';



const content=document.querySelector('.main');
const templatePhotoCards=content.querySelector('.template-photo-card').content;
const cardPhoto=templatePhotoCards.querySelector('.photo-card');
const popUpImageImage=content.querySelector('.form-image__image');
const popUpImageTitle=content.querySelector('.form-image__title');
const popUpImage=content.querySelector('#pop-up-image');

//Функция Удаления карточек
function deleteCard(evt) {
  const item = evt.target.closest(".photo-card");
  item.remove();
}

//Функция работы лайка
function like(evt) {
  evt.target.classList.toggle("button-like_active");
}


//Функция создания карточек
function createCard(name, img) {
  const card = cardPhoto.cloneNode(true);
  const cardItemPhoto = card.querySelector(".photo-card__photo");
  const cardItemTitle = card.querySelector(".photo-card__title");
  const cardItemButtonLike = card.querySelector(".button-like");
  const cardItemButtonDelete = card.querySelector(".button-delete");
  cardItemTitle.textContent = name;
  cardItemPhoto.setAttribute("src", img);
  cardItemPhoto.alt = name;
  cardItemButtonLike.addEventListener("click", like);
  cardItemButtonDelete.addEventListener("click", deleteCard);
  cardItemPhoto.addEventListener("click", () => openImagePopup(name, img));
  return card;
}


function openImagePopup(name, img) {
  popUpImageImage.setAttribute('src', img);
  popUpImageImage.alt=name;
  popUpImageTitle.textContent=name;
  openPopup(popUpImage);
}
