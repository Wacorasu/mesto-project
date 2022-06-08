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
const buttonPopUpEditClose=content.querySelector('#button-exit-edit');
const buttonPopUpAddClose=content.querySelector('#button-exit-add');
const buttonPopUpImageClose=content.querySelector('#button-exit-image');
const popUpEdit=content.querySelector('#pop-up-edit');
const popUpAdd=content.querySelector('#pop-up-add');
const popUpImage=content.querySelector('.pop-up-image');
const buttonPopUpEdit=popUpEdit.querySelector('#edit-form');
const buttonPopUpAdd=content.querySelector('#add-form');
const editTitleName=popUpEdit.querySelector('#edit-name');
const editSubTitleName=popUpEdit.querySelector('#edit-subname');
const AddName=content.querySelector('#add-name');
const AddImage=content.querySelector('#add-image');
const photoPanel=content.querySelector('.photo-panel');
const templatePhotoCards=content.querySelector('.template-photo-card').content;
let titleName=content.querySelector('.profile__title-name');
let subTitleName=content.querySelector('.profile__subtitle-description');
let popUpImageImage=content.querySelector('.pop-up-image__image');
let popUpImageTitle=content.querySelector('.pop-up-image__title');

//Изначальное добавление карточек
initialCards.forEach(function(item){
  addPhotoCard(item.name, item.link);
});

var buttonLike=content.querySelectorAll('.button-like');
var buttonDelete=content.querySelectorAll('.button-delete');
var buttonImage=content.querySelectorAll('.photo-card__photo');
update();

//Функция обновления списка кнопок на сайте
function update() {
buttonLike.forEach(function(item){
  item.addEventListener('click', like);
});
buttonDelete.forEach(function(item){
  item.addEventListener('click', del);
});
buttonImage.forEach(function(item){
  item.addEventListener('click', imageOpen);
});
}


buttonPopUpEdit.addEventListener('submit', formSubmitHandler);
buttonPopUpAdd.addEventListener('submit', formAddImage);
buttonEdit.addEventListener('click', openEditForm);
buttonPopUpEditClose.addEventListener('click', closeEditForm);
buttonAdd.addEventListener('click', openAddForm);
buttonPopUpAddClose.addEventListener('click', closeAddForm);
buttonPopUpImageClose.addEventListener('click', imageClose);

function closeEditForm() {
  popUpEdit.classList.add('pop-up_closed');
  popUpEdit.classList.remove('pop-up_opened');
}

function openEditForm() {
  popUpEdit.classList.add('pop-up_opened');
  popUpEdit.classList.remove('pop-up_closed');
}

function closeAddForm() {
  popUpAdd.classList.add('pop-up_closed');
  popUpAdd.classList.remove('pop-up_opened');
}

function openAddForm() {
  popUpAdd.classList.add('pop-up_opened');
  popUpAdd.classList.remove('pop-up_closed');
}

// Функция работы окна просмотра фото
function imageOpen(evt) {
  popUpImage.classList.add('pop-up-image_opened');
  popUpImage.classList.remove('pop-up-image_closed');
  popUpImageImage.setAttribute('src', evt.target.src);
  popUpImageImage.alt=evt.target.alt;
  popUpImageTitle.textContent=evt.target.alt;
}

function imageClose() {
  popUpImage.classList.add('pop-up-image_closed');
  popUpImage.classList.remove('pop-up-image_opened');
}

//Функция Удаления карточек
function del(evt) {
   let item = evt.target.parentElement;
   item.remove();
}

//Функция работы лайка
function like(evt) {
  evt.target.classList.toggle('button-like_active');
}

//Функция работы формы добавления карточек
function formAddImage(evt) {
  evt.preventDefault();
  addPhotoCard(AddName.value, AddImage.value);
  AddName.value='';
  AddImage.value='';
  closeAddForm();
  buttonLike=content.querySelectorAll('.button-like');
  buttonDelete=content.querySelectorAll('.button-delete');
  buttonImage=content.querySelectorAll('.photo-card__photo');
  update();
}

//Функция редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  titleName.textContent=editTitleName.value;
  subTitleName.textContent=editSubTitleName.value;
  closeEditForm();
}

//Функция добавление самих карточек
function addPhotoCard(name, img) {
  const photoCard=templatePhotoCards.querySelector('.photo-card').cloneNode(true);
  photoCard.querySelector('.photo-card__title').textContent=name;
  photoCard.querySelector('.photo-card__photo').setAttribute('src',img);
  photoCard.querySelector('.photo-card__photo').alt=name;
  photoPanel.prepend(photoCard);
}
