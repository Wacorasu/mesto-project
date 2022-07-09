export {getDataProfile, setDataProfile, setAvatarProfile, getDataCard, setLikeCard, deleteLikeCard, putNewCard, deleteServerCard};

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-13',
  headers: {
    authorization: '529f3fca-6bdc-4e81-9927-7f5521acabce',
    'Content-Type': 'application/json'
  }
};

const getDataProfile = () => {
  return fetch (`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  });
};

const getDataCard = () => {
  return fetch (`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  });
};

const setDataProfile =(titleName, subTitleName) => {
 return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: titleName,
      about: subTitleName
    })
  });
};

const setAvatarProfile = img => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
     method: 'PATCH',
     headers: config.headers,
     body: JSON.stringify({avatar: img})
   });
 };

 const setLikeCard = CardId => {
  return fetch(`${config.baseUrl}/cards/likes/${CardId}`, {
     method: 'PUT',
     headers: {
       authorization: config.headers.authorization,
     }
   });
 };

 const deleteLikeCard = CardId => {
  return fetch(`${config.baseUrl}/cards/likes/${CardId}`, {
     method: 'DELETE',
     headers: {
       authorization: config.headers.authorization,
     }
   });
 };

 const putNewCard =(name, url) => {
  return fetch(`${config.baseUrl}/cards`, {
     method: 'POST',
     headers: config.headers,
     body: JSON.stringify({
      name: name,
      link: url
    })
   });
 };

 const deleteServerCard = CardId => {
  return fetch(`${config.baseUrl}/cards/${CardId}`, {
     method: 'DELETE',
     headers: {
       authorization: config.headers.authorization,
     }
   });
 };
