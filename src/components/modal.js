export {editProfile};
import {titleName, subTitleName, editTitleName, editSubTitleName, popupEdit} from './index.js';
import {closePopup} from './utils.js';


//Функция редактирования профиля
function editProfile(evt) {
  evt.preventDefault();
  titleName.textContent=editTitleName.value;
  subTitleName.textContent=editSubTitleName.value;
  closePopup(popupEdit);
}
