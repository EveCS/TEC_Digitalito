import React, { useState, useEffect } from 'react';
import { sendMessage, getParticipantes,getchats } from '../API/neo4jConnection';

import { useNavigate, useLocation } from "react-router-dom";


export function Chats() {
    const [newMessage, setNewMessage] = useState(""); // Estado para el nuevo mensaje
    const [chatsData,setChatsData] = useState([]); // 
    const [participantes,setParticipantes] = useState([]);
    const [destinatario, setDestinatario] = useState("");
    const location = useLocation();
  const username = location.state.usuario;
 
    const fetchData = async () => {
        try {
            console.log(username);
            const response = await getchats(username);
            setChatsData(response);
        } catch (error) {
            console.error('Error al obtener los chats:', error);
        }
    };



    useEffect(() => {
        
        fetchData();
    }, [username]);
    
    const handleSendMessage = async (chatTitle) => {
        console.log("chattitle" + chatTitle);
        try {
            const response = await getParticipantes(chatTitle);
    
            if (response !== null) {
                setParticipantes(response);
                console.log("username"+username);
                console.log("username"+newMessage);
                console.log(response);
                const enviarA = response.find(participant => participant !== username);
                console.log("username"+enviarA);
                sendMessage(username, enviarA, newMessage);
                setParticipantes("");
            } else {
                console.error('getParticipantes devolvió null');
            }
    
            console.log(`Enviando mensaje '${newMessage}' al chat '${chatTitle}'`);
        } catch (error) {
            console.error('Error al obtener participantes o enviar mensaje:', error);
        }
    };
    

    const handleNewContacto = async  (destinatario) => {

      sendMessage(username,destinatario,newMessage);
      console.log(`Enviando mensaje '${newMessage}' al chat '${destinatario}'`);
   
    };
  
    const groupedChats = {};
  

    // Convertir las fechas a objetos Date
chatsData.forEach((message) => {
    message.fecha = new Date(message.fecha);
});

// Ordenar los mensajes por fecha
chatsData.sort((a, b) => a.fecha - b.fecha);


chatsData.forEach((message) => {
    const participants = message.chat.split(' y ').sort().join(' y ');

    if (groupedChats[participants]) {
        groupedChats[participants].push(message);
    } else {
        groupedChats[participants] = [message];
    }
});

const groupedChatsArray = Object.keys(groupedChats).map((participants) => ({
    chat: participants,
    messages: groupedChats[participants],
}));
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ marginBottom: '20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', width: '600px' }}>
            <h3>Nuevo Mensaje</h3>
            <div>
              <input
                type="text"
                value={destinatario}
                onChange={(e) => setDestinatario(e.target.value)}
                style={{ flex: '1', padding: '5px', marginRight: '10px', width: '80%' }}
                placeholder="Destinatario"
              />
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ flex: '1', padding: '5px', marginRight: '10px', width: '80%' }}
                placeholder="Escribe tu mensaje..."
              />
              <button
                className="btn btn-primary"
                onClick={() => handleNewContacto(destinatario)}
              >
                Enviar
              </button>
            </div>
          </div>
          <div className="chat-list" style={{ maxWidth: '600px', width: '100%', padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}>
            {Object.keys(groupedChats).map((chatTitle, index) => (
              <div key={index} className="chat-card" style={{ marginBottom: '20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
                <h3>{chatTitle}</h3>
                {groupedChats[chatTitle].map((message, messageIndex) => (
                  <div key={messageIndex} className="chat-item" style={{ marginBottom: '10px' }}>
                    <div className="chat-content" style={{ fontWeight: 'bold' }}>{message.contenido}</div>
                    <div className="chat-date" style={{ fontSize: '0.8em', color: '#888' }}>{new Date(message.fecha).toLocaleString()}</div>
                  </div>
                ))}
    
                
              </div>
            ))}
          </div>
        </div>
      );
    
  }
  