import { Modal } from 'antd'
import React from 'react'
import letsPlayFrame from '../../assets/magnus-intro/letsPlay-frame.svg';
import { CloseCircleOutlined } from '@ant-design/icons';
import singleUser from "../../assets/Single Player.png";

import userIc from "../../assets/user-profile.svg";
import MailIc from "../../assets/profile-mail.svg";
import LocationIc from "../../assets/profile-location.svg";


function ProfileModal({ isProfileOpen, setIsProfileOpen, userDetails }) {
    return (
        <>
            <Modal open={isProfileOpen} onCancel={() => { setIsProfileOpen(false) }}
                footer={null}
                closeIcon={false}
                className='token-model'
                width={800}


            >
                <div className="r-c-c" style={{ width: "100%", height: "100dvh" }}>
                    <div className='r-c-c' style={{ position: "relative", width: "100%", height: "100%" }}>
                        <img src={letsPlayFrame} className='full-img' style={{ width: '100%', height: '100%', display: 'block' }} />
                        <CloseCircleOutlined
                            style={{
                                position: "absolute",
                                top: "24%",
                                right: "8%",
                                fontSize: 25,
                                cursor: 'pointer',
                                color: 'black'  // Optional: Add color to make it more visible
                            }}
                            onClick={() => setIsProfileOpen(false)}
                        />
                    </div>

                    <div className='r-c-c-c' style={{ position: "absolute", width: "100%", height: "100%", fontWeight: "600" }}>
                        <div style={{ width: "15%" }}><img className='full-img' src={singleUser} /></div>
                        <div className='r-c-c p-10 m-b-10' style={{ fontSize: "18px", color: "#FFFFFF", backgroundColor: "#49260E", width: "40%", height: "5vh", borderRadius: 6 }}>{userDetails?.name}</div>
                        <div className='r-c-sb p-10 m-b-10' style={{ fontSize: "14px", color: "#FFFFFF", backgroundColor: "#49260E", width: "40%", height: "3vh", borderRadius: 6 }}>Usernamdasdasdasdasdasdasda <span><img className='full-img' src={userIc} /></span> </div>
                        <div className='r-c-sb p-10 m-b-10' style={{ fontSize: "14px", color: "#FFFFFF", backgroundColor: "#49260E", width: "40%", height: "3vh", borderRadius: 6 }}>name@gmail.com <span><img className='full-img' src={MailIc} /></span></div>
                        <div className='r-c-sb p-10 m-b-10' style={{ fontSize: "14px", color: "#FFFFFF", backgroundColor: "#49260E", width: "40%", height: "3vh", borderRadius: 6 }}>Pune <span><img className='full-img' src={LocationIc} /></span> </div>
                    </div>
                </div>
            </Modal >
        </>
    )
}

export default ProfileModal
