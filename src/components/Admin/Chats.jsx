import React, { useState, useEffect } from 'react';
import { sendMessage, getParticipantes,getchats } from '../API/neo4jConnection';

import { useNavigate, useLocation } from "react-router-dom";


export function Chats() {
    const [newMessage, setNewMessage] = useState(""); // Estado para el nuevo mensaje
    const [chatsData,setChatsData] = useState([]); // 
    const location = useLocation();
  const username = location.state.usuario;
 
    const fetchData = async () => {
        try {
            const response = await getchats(username);
            setChatsData(response);
        } catch (error) {
            console.error('Error al obtener los chats:', error);
        }
    };

    useEffect(() => {
        
        fetchData();
    }, [username]);
  
    const handleSendMessage = (chatTitle) => {
      // Aquí debes implementar la lógica de envío de mensaje con tu API
      // Puedes usar 'newMessage' para obtener el contenido del mensaje y 'chatTitle' para saber a qué chat se envía.
      console.log(`Enviando mensaje '${newMessage}' al chat '${chatTitle}'`);
      // Lógica de envío de mensaje con tu API
    };
  
    const groupedChats = {};
  
    // Agrupar los mensajes por chat
    chatsData.forEach((chat) => {
      if (groupedChats[chat.chat]) {
        groupedChats[chat.chat].push(chat);
      } else {
        groupedChats[chat.chat] = [chat];
      }
    });
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
              
              {/* Campo de enviar mensaje */}
              <div style={{ display: 'flex', marginTop: '10px' }}>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{ flex: '1', padding: '5px', marginRight: '10px' }} 
                  placeholder="Escribe tu mensaje..." 
                />
                <button 
                  className="btn btn-primary"
                  onClick={() => handleSendMessage(chatTitle)}
                >
                  Enviar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  