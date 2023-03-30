// eslint-disable-next-line no-unused-vars
import { check } from "prettier";

const token = "37ffcee9-990f-410f-926f-55d3b1286071";
const cohortID = "plus-cohort-22";

export const checkResponce = async (res) => {
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(`Ошибка: ${res.status}`);
  }
};

export const getInitialCards = async () => {
    try {
        const responce = await fetch(`https://nomoreparties.co/v1/${cohortID}/cards`, {
            headers: {
                authorization: token,
            },
        });
        const cards = await checkResponce(responce);
        return cards;
    }
    catch (err) {
        console.error(`Не удалось загрузить карточки: ${err.message}`);
        throw err;
    }
}

export const postCard = async (cardName, url) => {
  try {
    const responce = await fetch(
      `https://nomoreparties.co/v1/${cohortID}/cards`,
      {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cardName,
          link: url,
        }),
      }
    );
    const card = await checkResponce(responce);
    return card;
  } catch (err) {
    console.error(`Ошибка при отправки карточки ${err}`);
  }
};

export const deleteCard = async (cardId) => {
    try {
      const response = await fetch(`https://nomoreparties.co/v1/${cohortID}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });
      const result = await checkResponce(response);
      return result;
    } catch (error) {
      console.error(`Ошибка при удалении карточки: ${error.message}`);
      throw error;
    }
  };

  export const putLike = async (cardId) => {
    try {
      const response = await fetch(`https://nomoreparties.co/v1/${cohortID}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          authorization: token,
        },
      });
      const result = await checkResponce(response);
      return result;
    } catch (error) {
      console.error(`Ошибка при постановке лайка: ${error.message}`);
      throw error;
    }
  };

  export const deleteLike = async (cardId) => {
    try {
      const response = await fetch(`https://nomoreparties.co/v1/${cohortID}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      });
      const result = await checkResponce(response);
      return result;
    } catch (error) {
      console.error(`Ошибка при удалении лайка: ${error.message}`);
      throw error;
    }
  };

  export const getUserInfo = async () => {
    try {
      const response = await fetch(`https://nomoreparties.co/v1/${cohortID}/users/me`, {
        headers: {
          authorization: token,
        },
      });
      const result = await checkResponce(response);
      return result;
    } catch (error) {
      console.error(`Ошибка при получении информации о пользователе: ${error.message}`);
      throw error;
    }
  };

  export const updateUserInfo = async (userName, userAbout) => {
    try {
      const response = await fetch(`https://nomoreparties.co/v1/${cohortID}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          about: userAbout,
        }),
      });
      const result = await checkResponce(response);
      return result;
    } catch (error) {
      console.error(`Ошибка при обновлении информации о пользователе: ${error.message}`);
      throw error;
    }
  };

  export const patchUserAvatar = async (avatarUrl) => {
    try {
      const response = await fetch(`https://nomoreparties.co/v1/${cohortID}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: avatarUrl,
        }),
      });
      const result = await checkResponce(response);
      return result;
    } catch (error) {
      console.error(`Ошибка при обновлении аватара пользователя: ${error.message}`);
      throw error;
    }
  };
