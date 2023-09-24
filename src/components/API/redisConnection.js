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

export {
  login
};