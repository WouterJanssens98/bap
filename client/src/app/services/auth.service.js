import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser]= useState(JSON.parse(getCookie('user')));
  // const BASE_URL = `${apiConfig.baseURL}`;

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  return false;
  }

  const signIn = async (email, password) => {
    const url = `api/auth/signin`;

    const body = {
      "email": email,
      "password": password
    };

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: 'follow',
      //credentials: 'include'
    };

    try {
      const response = await fetch(`${url}`, options);
      setCurrentUser(email);
      const data = await response.json();
      console.log(data['id'])
      setCookie('user',JSON.stringify(data['id']),2)
      setCookie('userEmail',JSON.stringify(email),2)
      return response;
    } catch (error) {
      console.log(error);
    }
    
  }

  const signup = async (email, password, confirmPassword) => {
    const url = `/api/auth/signup`;

    const body = {
      "email": email,
      "password": password,
      "confirmPassword": confirmPassword
    };

    const myHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    const options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: 'follow'
    };

    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      throw new Error('Register failed');
    }
  }


  const logout = () =>{

  }

  return (
    <AuthContext.Provider value={{ currentUser,  logout, signup, signIn ,getCookie}}>
      {children}
    </AuthContext.Provider>
  )
};

export {
  AuthContext,
  AuthProvider,
  useAuth,
}