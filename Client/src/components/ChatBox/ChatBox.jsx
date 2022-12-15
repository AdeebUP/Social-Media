import React, { useEffect, useState } from 'react'
import { getMessages } from '../../api/MessageRequests'
import { getUser } from '../../api/UserRequest'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
// import './ChatBox.css'

const ChatBox = ({ chat, currentUser }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    // fetching data for header

    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error);
            }
        }
        if (chat !== null) getUserData();
    }, [chat, currentUser])

    // fetching data for messages

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)
                console.log(data);
                setMessages(data)
            } catch (error) {
                console.log(error);
            }
        }
        if (chat !== null) fetchMessages()
    }, [chat])

    const handleChange = (newMessages) => {
        setNewMessage(newMessage)
    }

    return (
        <>
            <div className="ChatBox-container">
                {chat? (
                    <>
                    <div className="chat-header">
                        <div className="follower">
                            <div>
                                <img
                                    src={
                                        userData?.profilePicture
                                            ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                                            : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
                                    } alt=""
                                    className='followerImage'
                                    style={{ width: '50px', height: '50px' }}
                                />
                                <div className="name" style={{ fontSize: "0.8rem" }}>
                                    <span>{userData?.firstname} {userData?.lastname}</span>
                                </div>
                            </div>
                        </div>
                        <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
                    </div>

                    {/* chatbox Messages */}

                    <div className="chat-body">
                        {messages.map((message) => (
                            <>
                                <div className={
                                    message.senderId === currentUser ? "message own" : "message"
                                }
                                >
                                    <span>{message.text}</span>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            </>
                        ))}
                    </div>

                                {/* chat-sender */}
                                <div className="chat-sender">
                                    <div>+</div>
                                    <InputEmoji 
                                    value = {newMessage}
                                    onChange = {handleChange}
                                    />
                                    <div className="send-button button">
                                        Send
                                    </div>
                                </div>
                
                </>
                ):(
                    <span className='chatbox-empty-message'>
                        Tap on a Chat to start Conversation...
                    </span>
                )}
                
            </div>
        </>
    )
}

export default ChatBox
