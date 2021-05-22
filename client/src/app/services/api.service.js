import { default as React, useContext, createContext, useState} from 'react';
import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);
const ApiProvider = ({children}) => {
  // const BASE_URL = `${apiConfig.baseURL}`;

  const createPeriode = async (fromYear,toYear,author, authorMail) => {
    let url = `/api/periode/add`;

    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "fromYear" : parseInt(fromYear),
        "toYear" : parseInt(toYear),
        "author" : author,
        "authorMail" : authorMail
      })
    };
    const response = await fetch(url, options);
    if(response.status == 201){
      return response
    }else{
      return(`Invalid response from API : status ${response.status}`)
    }
  }
  
  const getPeriodes = async () => {
    let url = `/api/periode`;

    const options = {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(url, options);
    return response.json();
  }

  const getPeriode = async (id) => {
    let url = `/api/periode/${id}`;

    const options = {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch(url, options);
    return response.json();
  }
  

  return (
    <ApiContext.Provider value={{ 
      createPeriode,getPeriodes,getPeriode
      
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}