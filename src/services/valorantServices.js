import { instanceValorant as axios } from "./config";

export const valorantServices = () => {
  const getAgents = () => {
    return axios({
      method: "GET",
      url: "/agents?language=es-ES&&isPlayableCharacter=true",
    });
  };
  return { getAgents };
};

export default valorantServices();
