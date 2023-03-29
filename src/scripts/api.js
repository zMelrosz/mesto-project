// eslint-disable-next-line no-unused-vars
import { check } from "prettier";

const token = "37ffcee9-990f-410f-926f-55d3b1286071";
const cohortID = "plus-cohort-22";

export const checkResponce = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  return fetch(`https://nomoreparties.co/v1/${cohortID}/cards`, {
    headers: {
      authorization: token,
    },
  }).then(checkResponce);
};

export const postCard = (cardName, url) => {
  return fetch(`https://nomoreparties.co/v1/${cohortID}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName,
      link: url,
    }),
  }).then(checkResponce);
};

export const deleteCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/${cohortID}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then(checkResponce);
};

export const putLike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/${cohortID}/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: token,
      },
    }
  ).then(checkResponce);
};

export const deleteLike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/${cohortID}/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    }
  ).then(checkResponce);
};

export const getUserInfo = () => {
  return fetch(`https://nomoreparties.co/v1/${cohortID}/users/me`, {
    headers: {
      authorization: token,
    },
  }).then(checkResponce);
};

export const updateUserInfo = (userName, userAbout) => {
  return fetch(`https://nomoreparties.co/v1/${cohortID}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then(checkResponce);
};

export const patchUserAvatar = (avatarUrl) => {
  return fetch(`https://nomoreparties.co/v1/${cohortID}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(checkResponce);
};
