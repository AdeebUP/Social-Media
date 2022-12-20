import React, { useState, useEffect } from 'react'
import './Chat.css'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import { useSelector } from "react-redux"
import { userChats } from '../../api/ChatRequests'
import { Link } from 'react-router-dom'
import ChatBox from '../../components/ChatBox/ChatBox.jsx'
import Conversation from '../../components/Conversation/Conversation'
import { io } from 'socket.io-client'
import { useRef } from 'react'

const Chat = () => {

    const { user } = useSelector((state) => state.authReducer.authData)

    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const socket = useRef()

    // sending message to socket server

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    useEffect(() => {
        socket.current = io('http://localhost:8800')
        socket.current.emit("new-user-add", user._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
            // console.log(onlineUsers);
        })
    }, [user])

    // receive Message from socket server

    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            setReceiveMessage(data)
        })
    }, [])

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id)
                setChats(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getChats()
    }, [user])

    return (
        <div className="Chat">
            {/* Left Side */}
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat) => (
                            <div onClick={() => setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserId={user._id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="Right-side-chat">
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                    <div className="navIcons">
                        <Link to='../home'>
                            <img src={Home} alt="" />
                        </Link>
                        <UilSetting />
                        <img src={Noti} alt="" />
                        <Link to='../chat'>
                            <img src={Comment} alt="" />
                        </Link>
                    </div>
                </div>

                {/* chat body */}
                <div>
                    <ChatBox chat={currentChat} currentUser={user._id} setSendMessage=
                        {setSendMessage} receiveMessage={receiveMessage} />

                </div>
            </div>
        </div>
    )
}

export default Chat