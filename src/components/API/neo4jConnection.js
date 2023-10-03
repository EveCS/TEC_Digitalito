import axios from 'axios';

// GET /chats


const getchats = async (username) => {
  try {
    const response = await axios.get(`http://localhost:3004/getChats?username=${username}`);
    return (response.data)
  } catch (error) {
    console.log("Error al obtener chats del usuario", error);
  }
}



//GET /msgsbychat
const getParticipantes = async (name) => {
    try {
      const response = await axios.get(`http://localhost:3004/chats/participants?chatName=${name}`);
      return (response.data)
    } catch (error) {
      console.log("Error al obtener los participantes", error);
    }
}

// POST /envia_msj
const sendMessage = async (name, receiver, msg) => {
    try {
      const response = await axios.post(`http://localhost:3004/enviarMensaje?nombreUsuario1=${name}&nombreUsuario2=${receiver}&contenidoMensaje=${msg}`);
      return true;
    } catch (error) {
      console.log("Error al enviar el mensaje", error);
      return false;
    }
}


export {
    getchats,
    getParticipantes,
    sendMessage
};