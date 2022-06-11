const initialCards = [
  {
    name: 'Калифорния',
    link: '../images/card-california.jpg'
  },
  {
    name: 'Финляндия',
    link: '../images/card-finland.jpg'
  },
  {
    name: 'Марке Италия',
    link: '../images/card-italia-marche.jpg'
  },
  {
    name: 'Кижи Карелия',
    link: '../images/card-kizhi.jpg'
  },
  {
    name: 'Швейцария',
    link: '../images/card-schweiz.jpg'
  },
  {
    name: 'Окинава Япония',
    link: '../images/card_okinawa.jpg'
  }
  ];
const content= document.querySelector('.main');
const buttonEdit=content.querySelector('.button-edit');
const buttonAdd=content.querySelector('.button-add');
const buttonsClose=content.querySelectorAll('.button-exit');
const popupEdit=content.querySelector('#pop-up-edit');
const popupAdd=content.querySelector('#pop-up-add');
const popUpImage=content.querySelector('#pop-up-image');
const formPopUpEdit=popupEdit.querySelector('#edit-form');
const formPopUpAdd=content.querySelector('#add-form');
const editTitleName=popupEdit.querySelector('#edit-name');
const editSubTitleName=popupEdit.querySelector('#edit-subname');
const nameAdd=content.querySelector('#add-name');
const imageAdd=content.querySelector('#add-image');
const photoPanel=content.querySelector('.photo-panel');
const templatePhotoCards=content.querySelector('.template-photo-card').content;
const titleName=content.querySelector('.profile__title-name');
const subTitleName=content.querySelector('.profile__subtitle-description');
const popUpImageImage=content.querySelector('.form-image__image');
const popUpImageTitle=content.querySelector('.form-image__title');
const cardPhoto=templatePhotoCards.querySelector('.photo-card');



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


function closePopup(popup) {
   popup.classList.remove('pop-up_opened');
}

function openPopup(popup) {
  popup.classList.add('pop-up_opened');
}


// Функция работы окна просмотра фото
function openImagePopup(name, img) {
  openPopup(popUpImage);
  popUpImageImage.setAttribute('src', img);
  popUpImageImage.alt=name;
  popUpImageTitle.textContent=name;
}


//Функция Удаления карточек
function deleteCard(evt) {
   const item = evt.target.closest('.photo-card');
   item.remove();
}

//Функция работы лайка
function like(evt) {
  evt.target.classList.toggle('button-like_active');
}

//Функция работы формы добавления карточек
function addNewCard(evt) {
  evt.preventDefault();
  addPhotoCard(nameAdd.value, imageAdd.value);
  evt.target.reset()
  closePopup(popupAdd);
}

//Функция редактирования профиля
function editProfile(evt) {
  evt.preventDefault();
  titleName.textContent=editTitleName.value;
  subTitleName.textContent=editSubTitleName.value;
  closePopup(popupEdit);
}

//Функция создания карточек
function createCard(name, img) {
  const card= cardPhoto.cloneNode(true);
  const cardItemPhoto=card.querySelector('.photo-card__photo');
  const cardItemTitle=card.querySelector('.photo-card__title');
  const cardItemButtonLike=card.querySelector('.button-like');
  const cardItemButtonDelete=card.querySelector('.button-delete');
  cardItemTitle.textContent=name;
  cardItemPhoto.setAttribute('src', img);
  cardItemPhoto.alt=name;
  cardItemButtonLike.addEventListener('click', like);
  cardItemButtonDelete.addEventListener('click', deleteCard);
  cardItemPhoto.addEventListener('click', () => openImagePopup(name, img));
  return card;
}


//Функция добавление самих карточек
function addPhotoCard(name, img) {
  const photoCard=createCard(name, img);
  photoPanel.prepend(photoCard);
}
