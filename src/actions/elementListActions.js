import crStreaming from "../services/crServices";

export const LOADING = "LOADING";
export const LOADED_SUCCESS = "LOADED_SUCCESS";
export const LOADED_FAILURE = "LOADED_FAILURE";

export const loading = () => ({ type: LOADING });

export const loadedSuccess = (payload) => ({
  type: LOADED_SUCCESS,
  payload,
});

export const loadedFailure = () => ({ type: LOADED_FAILURE });

export const setCards = () => async (dispatch) => {
  dispatch(loading());
  try {
    await crStreaming.getCards().then(function (response) {
      dispatch(
        loadedSuccess({ elementList: response.data.items, redirect: null })
      );
    });
  } catch (error) {
    dispatch(loadedFailure());
  }
};
