import React, { useEffect, useState, useRef } from 'react';
import { Button, Dropdown, Modal, Space, Tooltip } from 'antd';

import closeIcon from "../../assets/settings-icons/close.svg"
import accountIcon from "../../assets/settings-icons/account.svg"
import soundIcon from "../../assets/settings-icons/sound.svg"
import infoIcon from "../../assets/settings-icons/information.svg"
import logOutIcon from "../../assets/settings-icons/logout.svg"
import { setGameIntroSteps, setIntroSteps, setLogin, setStep, playAudio } from '../../reduxStore/actions/action';
import { connect } from 'react-redux';
import settings from "../../assets/settings-icons/Settings.svg";
import ProfileModal from '../dashboard/profileModal';

function SettingsModal({ isOpenModal, setIsOpenModal,
    step, setLogin, setIntroSteps, openSettings, setOpenSettings,
    resume, selectTokens, setStep, setIsOpenModalSetting, isPlaying, playAudio, userDetails }) {
    const [isSoundOn, setIsSoundOn] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const items = [
        {
            label: (
                <Tooltip title="Close" placement="left">
                    <div onClick={() => { setOpenSettings(false); setIsOpenModalSetting(false); }}>
                        <img className="btn-img-settings" src={closeIcon} />
                    </div>
                </Tooltip>
            ),
            key: '0',
        },
        {
            label: (
                <Tooltip title="Profile" placement="left">
                    <div onClick={() => { setIsProfileOpen(true); }}>
                        <img className="btn-img-settings" src={accountIcon} />
                    </div>
                </Tooltip>
            ),
            key: '1',
        },
        {
            label: (
                <Tooltip title={isSoundOn ? "Mute audio" : "Unmute audio"} placement="left">
                    <div id="audio-icon" onClick={() => {
                        /* setOpenSettings(false);
                        setIsOpenModalSetting(false); */
                        const audio = document.getElementById("audio-tag");
                        if (audio.paused) {
                            audio.play();
                            setIsSoundOn(true);
                        } else {
                            audio.pause();
                            setIsSoundOn(false);
                        }
                    }}>
                        <img className="btn-img-settings" src={soundIcon} />
                    </div>
                </Tooltip>
            ),
            key: '2',
        },
        {
            label: (
                <Tooltip title="Introduction" placement="left">
                    <div onClick={() => { setStep(-2); setIntroSteps(0); setOpenSettings(false); setIsOpenModalSetting(false); }}>
                        <img className="btn-img-settings" src={infoIcon} />
                    </div>
                </Tooltip>
            ),
            key: '3',
        },
        {
            label: (
                <Tooltip title="Log Out" placement="left">
                    <div onClick={() => {
                        setLogin();
                        setOpenSettings(false);
                        setIsOpenModalSetting(false);
                        const audio = document.getElementById("audio-tag");
                        audio.pause();
                    }}>
                        <img className="btn-img-settings" src={logOutIcon} />
                    </div>
                </Tooltip>
            ),
            key: '4',
        },
    ];


    return (
        <div>
            <Modal
                visible={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                footer={null}
                closeIcon={false}
                className='r-c-c token-model'
                maskClosable={false}
                style={{ overflow: 'hidden !important', top: "0px" }}
                bodyStyle={{ height: "100vh", width: "90vw", overflow: 'hidden !important', }}
            >
                <div className="r-c-c" style={{ width: "100%", height: "100%", textAlign: "center", color: "#FFFFFF", fontSize: '5vw' }}>
                    PAUSE
                </div>
                <div style={{ width: '100%', height: '100%' }}>
                    <div id="lock-btn-2" style={{ right: '0%', top: '1.4%' }}>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                            open={openSettings}
                            className='setting-drop'

                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <img
                                        className="btn-img-settings"
                                        src={settings}
                                        onClick={() => { setOpenSettings(!openSettings); setIsOpenModalSetting(false) }}
                                    />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </Modal>
            {isProfileOpen && <ProfileModal isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} userDetails={userDetails} />}
        </div>
    )
}

const mapStateToProps = state => {

    const { step, resume, selectTokens, isPlaying, userDetails } = state?.SeTu;
    return { step, resume, selectTokens, isPlaying, userDetails }
}
const mapDispatchToProps = dispatch => ({

    setLogin: (val) => dispatch(setLogin(val)),
    setIntroSteps: (val) => dispatch(setIntroSteps(val)),
    setStep: (val) => dispatch(setStep(val)),
    setGameIntroSteps: (val) => dispatch(setGameIntroSteps(val)),
    playAudio: (val) => dispatch(playAudio(val))
})


export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal)
