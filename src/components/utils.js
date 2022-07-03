export { closePopup, openPopup };

function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
}
function openPopup(popup) {
  popup.classList.add("pop-up_opened");
}
