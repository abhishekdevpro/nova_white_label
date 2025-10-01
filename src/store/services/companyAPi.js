// src/services/locationService.js
import axios from "axios";
import { BASE_URL } from "../constant";

export const getCountries = (token) =>
  axios.get(`${BASE_URL}/api/employeer/countries`, {
    headers: { Authorization: token },
  });

export const getStates = (token, countryId) =>
  axios.get(`${BASE_URL}/api/employeer/stats/${countryId}`, {
    headers: { Authorization: token },
  });

export const getCities = (token, stateId) =>
  axios.get(`${BASE_URL}/api/employeer/cities/${stateId}`, {
    headers: { Authorization: token },
  });

export const getIndustries = (token) => {
  return axios.get(`${BASE_URL}/api/employeer/company-industry`, {
    headers: { Authorization: token },
  });
};
