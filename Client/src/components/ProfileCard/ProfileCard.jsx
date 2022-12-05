import React from 'react'
import { useSelector } from 'react-redux'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'

const ProfileCard = () => {
    const {user} = useSelector((state) => state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const ProfilePage = false;
    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={user.coverPicture? serverPublic + user.coverPicture: serverPublic + "cover.jpg"} alt="" />
                <img src={user.coverPicture? serverPublic + user.coverPicture: serverPublic + "cover.jpg"} alt="" />
            </div>

            <div className="ProfileName">
                <span>Zendaya MJ</span>
                <span>Senior UI/UX Designer</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>6,890</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>1</span>
                        <span>Followers</span>
                    </div>
                    {ProfilePage && (
                        <>
                            <div className="vl">

                            </div>
                            <div className="follow">
                                <span>3</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {ProfilePage ? '' : <span>My Profile</span>}
        </div>
    )
}

export default ProfileCard
