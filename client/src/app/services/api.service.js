import { default as React, useContext, createContext} from 'react';
import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);
const ApiProvider = ({children}) => {

  const BASE_URL = `${apiConfig.baseURL}`;

  
  // API CALLS FOR GETTING DATA


  const getRenners = async () => {
    let url = `${BASE_URL}/api/renner`;
    

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

  const getScores = async () => {
    let url = `${BASE_URL}/api/score`;

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


  const getRidersFromPeriod = async (id) => {
    let url = `${BASE_URL}/api/renner-periode/${id}`;

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

  const getRitten = async () => {
    let url = `${BASE_URL}/api/ritten`;

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
  
  const getPeriodes = async () => {
    let url = `${BASE_URL}/api/periode`;

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
    let url = `${BASE_URL}/api/periode/${id}`;

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


  // API CALLS FOR CREATING

  const createPeriode = async (data,author, authorMail) => {
    let url = `${BASE_URL}/api/periode/add`;

    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "data" : data,
        "author" :author,
        "authorMail" : authorMail
      })
    };
    const response = await fetch(url, options);
    if(response.status === 201){
      return response
    }else{
      return(`Invalid response from API : status ${response.status}`)
    }
  }

  const createRenner = async (data,author,authorMail) => {
    let url = `${BASE_URL}/api/renner/add`;

    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "data" : data,
        "author" :author,
        "authorMail" : authorMail
      })
    };
    const response = await fetch(url, options);
    if(response.status === 201){
      return response
    }else{
      return(`Invalid response from API : status ${response.status}`)
    }
  }

  const createRit = async (data,author,authorMail) => {
    let url = `${BASE_URL}/api/ritten/add`;

    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "data" : data,
        "author" :author,
        "authorMail" : authorMail
      })
    };
    const response = await fetch(url, options);
    if(response.status === 201){
      return response
    }else{
      return(`Invalid response from API : status ${response.status}`)
    }
  }

  const createScore = async (data) => {
    let url = `${BASE_URL}/api/score/add`;

    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "data" : data,
      })
    };
    const response = await fetch(url, options);
    if(response.status === 201){
      return response
    }else{
      return(`Invalid response from API : status ${response.status}`)
    }
  }
  

  return (
    <ApiContext.Provider value={{ 
      createPeriode,getPeriodes,getPeriode,getScores,createRenner,getRenners,createRit,getRitten,getRidersFromPeriod,createScore
      
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