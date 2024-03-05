import React, { useContext, useEffect, useState } from 'react'
import { db } from '../Config/firebase'
import { collection, getDocs, addDoc, serverTimestamp, where, limit, doc } from 'firebase/firestore'
import ChatMessage from './ChatMessage'
import LoginInfoContext from '../Context/LogInContext';
import { AI_CHAT } from '../Config/openAi';



export default function Home() {
  const [user_data, setUsers] = useState([])
  const [chat_message, set_chat_message] = useState("")
  const [reciverId, set_reciverId] = useState("")
  const [reciver, set_reciver] = useState("")
  const [AI_assistance, set_AI_assistance] = useState(false)
  const { Myid, setMyid, UserName, setUserName } = useContext(LoginInfoContext)

  const AI_ID="R7qwKVw4xmzFuYVDyUYZ"
  const user_ref = collection(db, "user")
  const messageRef = collection(db, 'messages');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(user_ref)
        const filtered_data = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setUsers(filtered_data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])

  const sendMessage = async (text, userId) => {
    try {
      let curr_sender=Myid;
      let curr_reciver=userId;
      
      await addDoc(messageRef, {
        text,
        senderId: curr_sender,
        reciverId: curr_reciver,
        createdAt: serverTimestamp()
      })
      
      if(AI_assistance)
      {
        curr_sender=AI_ID
        curr_reciver=Myid
        text = await AI_CHAT(chat_message)

        console.log(text,curr_reciver,curr_sender)

        await addDoc(messageRef,{
          text,
          senderId: curr_sender,
          reciverId: curr_reciver,
          createdAt: serverTimestamp()
        })
      }

    } catch (error) {
      console.log(error)
    }
  }



  const handle_message = async () => {
    await sendMessage(chat_message, reciverId)
    set_chat_message("")
  }


  return (
    <>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", height: "100vh", paddingTop: "5%", paddingBottom: "2%" }}>
        <div className="all_users" style={{ display: "flex", flexDirection: "column", width: "20%", maxHeight: "100%", overflowY: "auto" }}>
        <div className="temp">{reciver}</div>
          <button type="button" className="btn btn-outline-dark" onClick={(e) => { set_AI_assistance(true) ; set_reciverId(AI_ID) ; set_reciver("AI BOT") }}>AI BOT</button>

          {user_data.map((user) => (
            <button type="button" className="btn btn-light" key={user.id} onClick={(e) => { set_reciverId(user.id); set_reciver(user.name); set_AI_assistance(false) }}>{user.name}</button>
          ))}
        </div>
        <div className="div" style={{ display: "flex", flexDirection: "column", width: "80%", padding: "0 1% 0 1%", maxHeight: "100%" }}>
          <div className="chat" style={{ width: "100%", padding: "0 1% 0 1%", flex: 1, overflowY: "auto" }}>
            <ChatMessage reciverId={reciverId} reciver_name={reciver} sender_name={UserName} active_ai={AI_assistance}></ChatMessage>
          </div>
          <div style={{ width: "100%", display: "flex", marginTop: "auto" }}>
            <input type="text" className="form-control" value={chat_message} onChange={(e) => { set_chat_message(e.target.value) }} />
            <button type="submit" className="btn btn-light" onClick={handle_message} disabled={chat_message.length === 0}>send</button>
          </div>
        </div>
      </div>
    </>
  )
}
