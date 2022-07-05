export { closePopup, openPopup };

function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener('keydown', closeWithEsc);
}

function openPopup(popup) {
  popup.classList.add("pop-up_opened");
  document.addEventListener('keydown', closeWithEsc);
}

function closeWithEsc(evt){
  const popup=document.querySelector('.pop-up_opened')
  if (evt.key==='Escape'){
    closePopup(popup);
  }
};
