import React, { useState, useEffect } from 'react'
import './Chat.css'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { useSelector } from "react-redux"
import { userChats } from '../../api/ChatRequests'
import Conversation from '../../components/Conversation/Conversation'

const Chat = () => {

    const { user } = useSelector((state) => state.authReducer.authData)
    // console.log(user);

    const [chats, setChats] = useState([])

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
                            <div>
                                <Conversation data={chat} currentUserId={user._id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="Right-side-chat">
                Right side
            </div>
        </div>
    )
}

export default Chat