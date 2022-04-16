import axios from "axios";

export const instanceClashRoyale = axios.create({
  baseURL: "https://proxy.royaleapi.dev/v1",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjkzNjEzYTMxLWNkYzEtNDUwMS04ZDZlLWY5NTFiMTFjNzJjMyIsImlhdCI6MTY1MDE0NjUyOSwic3ViIjoiZGV2ZWxvcGVyLzRmNTRlZTRiLTViOGMtZDg5NS04ZmIwLWY0N2M0OTcxN2E5MCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.P4UamE_NnV4jG0KJtQTKbx1tfjTVL4VwxdrA9FODLBPFMEltuAVgNSQk8GxSHok4ePtnqlcUji_g-TYJIjxtDQ",
  },
});

export const instanceValorant = axios.create({
  baseURL: "https://valorant-api.com/v1",
});
