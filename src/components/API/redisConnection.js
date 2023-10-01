import React, { useState, useEffect } from 'react';
import axios from 'axios';


const login = async (username) => {
  try {
    const response = await axios.get(`http://localhost:3000/getUser?username=${username}`);

    return (response.data)
  } catch (error) {
    console.log("Error al buscar el usuario", error);
  }
}

// http://localhost:3000/insertUser?username=Pedropicapiedra&password=123&full_name=Pedro Pica Piedra&dob=1999/1/1&avatar_url=link_to_imagen&es_profesor=false
const registerUser = async (userData) => {
  try {
    const response = await axios.post(`http://localhost:3000/insertUser?username=${userData.username}&password=${userData.password}&full_name=${userData.full_name}&dob=${userData.dob}&avatar_url=${userData.avatar_url}&es_profesor=${userData.es_profesor}`);

    return true;
  } catch (error) {
    console.log("Error al registrar el usuario", error);
    return false;
  }
}

// http://localhost:3000/editUserField?username=armandoArce&field=dos&value=1/1/1999
const editUserField = async (username, field, value) => {
  try {
    const response = await axios.post(`http://localhost:3000/editUserField?username=${username}&field=${field}&value=${value}`);

    return true;
  } catch (error) {
    console.log("Error al registrar el usuario", error);
    return false;
  }
}

// http://localhost:3000/getUser?username=JuanPerez
const getUser = async (username) => {
  try {
    const response = await axios.get(`http://localhost:3000/getUser?username=${username}`);

    return (response.data)
  } catch (error) {
    console.log("Error al buscar el usuario", error);
  }
}

// http://localhost:3000/getFriends?username=john_doe
const getFriends = async (username) => {
  try {
    const response = await axios.get(`http://localhost:3000/getFriends?username=${username}`);

    return (response.data)
  } catch (error) {
    console.log("Error al buscar el usuario", error);
  }
}

// http://localhost:3000/addFriend?username=armandoArce&friendUsername=pedroPicapiedra
const addFriend = async (username, frienduser) => {
  try {
    const response = await axios.post(`http://localhost:3000/addFriend?username=${username}&friendUsername=${frienduser}`);

    return true;
  } catch (error) {
    return false;
  }
}

export {
  login,
  registerUser,
  editUserField,
  getUser,
  getFriends,
  addFriend
};
