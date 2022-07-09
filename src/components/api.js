export {getDataProfile, setDataProfile, setAvatarProfile, getDataCard, setLikeCard, deleteLikeCard, putNewCard, deleteServerCard};

const getDataProfile = () => {
  return fetch ('https://mesto.nomoreparties.co/v1/plus-cohort-13/users/me', {
    headers: {
      authorization: '529f3fca-6bdc-4e81-9927-7f5521acabce'
    }
  });
}

const getDataCard = () => {
  return fetch ('https://mesto.nomoreparties.co/v1/plus-cohort-13/cards', {
    headers: {
      authorization: '529f3fca-6bdc-4e81-9927-7f5521acabce'
    }
  });
}

const setDataProfile =(titleName, subTitleName) => {
 return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-13/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '529f3fca-6bdc-4e81-9927-7f5521acabce',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: titleName,
      about: subTitleName
    })
  });
};

const setAvatarProfile = img => {
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-13/users/me/avatar', {
     method: 'PATCH',
     headers: {
       authorization: '529f3fca-6bdc-4e81-9927-7f5521acabce',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({avatar: img})
   });
 };

 const setLikeCard = CardId => {
  return fetch(`https://mesto.nomoreparties.co/v1/plus-cohort-13/cards/likes/${CardId}`, {
     method: 'PUT',
     headers: {
       authorization: '529f3fca-6bdc-4e81-9927-7f5521acabce',
     }
   });
 };

 const deleteLikeCard = CardId => {
  return fetch(`https://mesto.nomoreparties.co/v1/plus-cohort-13/cards/likes/${CardId}`, {
     method: 'DELETE',
     headers: {
       authorization: '529f3fca-6bdc-4e81-9927-7f5521acabce',
     }
   });
 };

 const putNewCard =(name, url) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-13/cards', {
     method: 'POST',
     headers: {
      authorization: '529f3fca-6bdc-4e81-9927-7f5521acabce',
      'Content-Type': 'application/json'
     },
     body: JSON.stringify({
      name: name,
      link: url
    })
   });
 };

 const deleteServerCard = CardId => {
  return fetch(`https://mesto.nomoreparties.co/v1/plus-cohort-13/cards/${CardId}`, {
     method: 'DELETE',
     headers: {
       authorization: '529f3fca-6bdc-4e81-9927-7f5521acabce',
     }
   });
 };
