import axios from 'axios';

// GET /chats
const getchats = async (name) => {
    try {
      const response = await axios.get(`http://localhost:3004/chats?name=${name}`);
      return (response.data)
    } catch (error) {
      console.log("Error al obtener chats del usuario", error);
    }
}

//GET /msgsbychat
const getmsg_bychat = async (name, receiver) => {
    try {
      const response = await axios.get(`http://localhost:3004/msgsbychat?name=${name}&receiver=${receiver}`);
      return (response.data)
    } catch (error) {
      console.log("Error al obtener los mensajes del chat", error);
    }
}

// POST /envia_msj
const sendMessage = async (name, receiver, msg) => {
    try {
      const response = await axios.post(`http://localhost:3004/envia_msj?name=${name}&receiver=${receiver}&msg=${msg}`);
      return true;
    } catch (error) {
      console.log("Error al enviar el mensaje", error);
      return false;
    }
}


export {
    getchats,
    getmsg_bychat,
    sendMessage
};