import React, { useEffect, useState } from 'react'

const Conversation = ({data, currentUserId}) => {
    const [userData, setUserData] = useState(null)
    useEffect(()=>{
        const userId = data.members.find((id)=>id!==currentUserId)
        // console.log(userId);
        const getUserData = async() => {
            const {data} = await getUserData(userId)
            setUserData(data)
        }
    }, [])
  return (
    <div>
      Conversation
    </div>
  )
}

export default Conversation
