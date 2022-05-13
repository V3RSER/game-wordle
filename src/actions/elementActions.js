import crServices from "../services/crServices";
import valorantServices from "../services/valorantServices";

export const LOADING = "LOADING";
export const LOADED_SUCCESS = "LOADED_SUCCESS";
export const LOADED_FAILURE = "LOADED_FAILURE";

export const SET_SECRET_ELEMENT = "SET_SECRET_ELEMENT";
export const SET_ELEMENT_LIST = "SET_ELEMENT_LIST";

export const loading = () => ({ type: LOADING });

export const loadedSuccess = (payload) => ({
  type: LOADED_SUCCESS,
  payload,
});

export const loadedFailure = () => ({ type: LOADED_FAILURE });

export const setCards = () => async (dispatch) => {
  dispatch(loading());
  try {
    const data1 = await crServices.getCards().then((response) => {
      return response.data.items;
    });
    const data2 = await fetch(
      "https://raw.githubusercontent.com/RoyaleAPI/cr-api-data/master/docs/json/cards_i18n.json"
    ).then((response) => {
      return response.json();
    });
    dispatch(
      loadedSuccess({
        list: data2.map((card) => {
          return {
            id: card.id,
            name: card._lang.name.es,
            img: data1.filter((c) => c.id === card.id)[0].iconUrls.medium,
            description: card._lang.description.es,
          };
        }),
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(loadedFailure());
  }
};

export const setAgents = () => async (dispatch) => {
  dispatch(loading());
  try {
    await valorantServices.getAgents().then(function (response) {
      dispatch(
        loadedSuccess({
          list: response.data.data.map((agent) => {
            return {
              id: agent.uuid,
              name: agent.displayName,
              img: agent.displayIcon,
              description: agent.description,
            };
          }),
        })
      );
    });
  } catch (error) {
    dispatch(loadedFailure());
  }
};

export const setSecretElement = (payload) => ({
  type: SET_SECRET_ELEMENT,
  payload,
});

export const setElementList = (payload) => ({
  type: SET_ELEMENT_LIST,
  payload,
});
