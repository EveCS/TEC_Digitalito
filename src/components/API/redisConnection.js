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
// http://localhost:3000/editUserField?username=armandoArce&field=dos&value=1/1/1999
// http://localhost:3000/insertUser?username=Pedropicapiedra&password=123&full_name=Pedro Pica Piedra&dob=1999/1/1&avatar_url=link_to_imagen&es_profesor=false
// http://localhost:3000/addFriend?username=armandoArce&friendUsername=pedroPicapiedra
// http://localhost:3000/getFriends?username=john_doe

export {
  login
};