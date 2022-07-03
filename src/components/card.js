export {addNewCard, addPhotoCard};
import {closePopup, openPopup} from './utils.js';
import {popupAdd} from './index.js'

const content=document.querySelector('.main');
const photoPanel = content.querySelector(".photo-panel");
const templatePhotoCards=content.querySelector('.template-photo-card').content;
const cardPhoto=templatePhotoCards.querySelector('.photo-card');
const popUpImageImage=content.querySelector('.form-image__image');
const popUpImageTitle=content.querySelector('.form-image__title');
const popUpImage=content.querySelector('#pop-up-image');
const nameAdd=content.querySelector('#add-name');
const imageAdd=content.querySelector('#add-image');

//Функция Удаления карточек
function deleteCard(evt) {
  const item = evt.target.closest(".photo-card");
  item.remove();
}

//Функция работы лайка
function like(evt) {
  evt.target.classList.toggle("button-like_active");
}

//Функция работы формы добавления карточек
function addNewCard(evt) {
  evt.preventDefault();
  addPhotoCard(nameAdd.value, imageAdd.value);
  evt.target.reset();
  closePopup(popupAdd);
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

//Функция добавление самих карточек
function addPhotoCard(name, img) {
  const photoCard = createCard(name, img);
  photoPanel.prepend(photoCard);
}

function openImagePopup(name, img) {
  openPopup(popUpImage);
  popUpImageImage.setAttribute('src', img);
  popUpImageImage.alt=name;
  popUpImageTitle.textContent=name;
}
