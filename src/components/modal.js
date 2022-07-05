export { closePopup, openPopup, closeWithOverlay };

function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  if (popup.classList.contains("pop-up__opened-image")){
    popup.classList.remove("pop-up__opened-image");
  }
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

function closeWithOverlay(evt){
  const popup=document.querySelector('.pop-up_opened')
  if (evt.target===evt.currentTarget){
    closePopup(popup);
  };
}



