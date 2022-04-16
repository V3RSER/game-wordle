import { instanceClashRoyale as axios } from "./config";

export const crServices = () => {
  const getCards = () => {
    return axios({
      method: "GET",
      url: "/cards",
    });
  };
  return { getCards };
};

export default crServices();
