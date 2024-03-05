import React, { useContext, useEffect, useState } from 'react';
import { db } from '../Config/firebase';
import { collection, query, where, limit, getDocs, onSnapshot } from 'firebase/firestore';
import LoginInfoContext from '../Context/LogInContext';

export default function ChatMessage(props) {
  const { Myid } = useContext(LoginInfoContext);
  const [chat, setChat] = useState([]);
  const [sender_chat, set_sender_chat] = useState([])
  const [reciver_chat, set_reciver_chat] = useState([])
  const reciverId = props.reciverId;
  const reciver_name = props.reciver_name;
  const sender_name = props.sender_name; 
  const active_ai = props.active_ai
  const AI_ID="R7qwKVw4xmzFuYVDyUYZ"

  useEffect(() => {
    const getMyMessage = async () => {
      try {
        let to_recive = reciverId
        let to_send = Myid

        if(active_ai)
        {
          to_recive = Myid
          to_send = AI_ID
        }

        const messageRef = collection(db, 'messages');
        const q1 = query(
          messageRef,
          where('reciverId', '==', to_recive),
          where('senderId', '==', to_send),
        );
        const q2 = query(
          messageRef,
          where('reciverId', '==', to_send),
          where('senderId', '==', to_recive),
        )

        const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
          const messages = querySnapshot.docs.map((doc) =>({ 
            ...doc.data() ,
            isSent : true
          }));
          set_sender_chat(messages)
        })

        const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
          const messages = querySnapshot.docs.map((doc) =>({ 
            ...doc.data() , 
            isSent : false
          }));
          set_reciver_chat(messages)
        })

        return () => {
          unsubscribe1()
          unsubscribe2()
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyMessage();
  }, [reciverId, Myid]);

  useEffect(()=>{
    if (Myid==reciverId) {
      const combined_chat = [...sender_chat]
      const sorted_chat = combined_chat.sort((a,b)=> a.createdAt - b.createdAt)
      setChat(sorted_chat)
    }
    else
    {
      const combined_chat = [...sender_chat,...reciver_chat]
      const sorted_chat = combined_chat.sort((a,b)=> a.createdAt - b.createdAt)
      setChat(sorted_chat)
    }
  },[sender_chat, reciver_chat])

  return (
    <>
      <div className="chat_messages" style={{display:"flex",flexDirection:"column", overflowY:"auto"}}>
        {chat.map((msg)=>{
          if (Myid===msg.senderId) {
            return (<div id={msg.id} style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end"}}>
            {sender_name} : {msg.text}</div>)
          }
          else
          {
            return (<div id={msg.id} style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start"}}> {reciver_name} : {msg.text}</div>)
          }
        })}
      </div>
    </>
  );
}
