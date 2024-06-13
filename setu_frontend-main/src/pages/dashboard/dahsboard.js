import { Form, Input, Button, Modal, Dropdown, Space, message } from 'antd'
import './styles.css'
import React, { memo, useEffect, useState } from 'react';
import { RotateRightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Welcome from '../welcome/welcomePage';
import Intro from '../intro';
import { connect } from 'react-redux';

import ApiClass from '../../services/Api';
import io from 'socket.io-client';
import settings from "../../assets/settings-icons/Settings.svg";
import {
  setIntroSteps, setLogin, setStep,
  gameStart, setGameType, selectToken,
  setGameIntroSteps, overView, fetchGameState, pauseGame,
  setRemainingTime,
  setChooseValueModal, playAudio
} from "../../reduxStore/actions/action";
import "../intro/styles.css"
import letsPlayFrame from "../../assets/magnus-intro/letsPlay-frame.svg"

import tokenBG from "../../assets/selectTokens/Tokens BG.png"
import singleUser from "../../assets/Single Player.png"
import GamePlayBoard from './gamePlayBoard';
import NotFound from '../notfound/notfound';
import multiPlayerIc from "../../assets/multipPlayer-icon.png";
import SettingsModal from '../components/settingsModal';
import UserInitials from '../components/userInitials';
import FeedBack from './feedBack';
import { ChooseCorrectValue } from './leftSidePanel';
import Poll from './poll';
import ThanksPage from './thanksPage';
import auido from '../../assets/music/audio.mp3'
import Certificate from './certificate';


function Dashboard({ step, setLogin, setIntroSteps, resume, selectTokens, setStep,
  gameStart, setGameType, selectToken, setGameIntroSteps,
  overView, fetchGameState, pauseGame, isGamePaused, auth, setChooseValueModal, introSteps, isPlaying, playAudio, userDetails

}) {

  const socket = io(ApiClass._base_url, {
    query: {
      token: auth,
    },
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000
  });


  const [isLandscape, setIsLandscape] = useState();
  const [welcomeScreen, setWelcomeScreen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  console.log("step", step);

  const handleGameStart = () => {
    overView(() => {
      gameStart(() => {
        setStep(1);
      }, () => {
        console.log('unable to start game')
      })

    }, () => { })

  }

  const handleResume = () => {
    fetchGameState(() => {

    }, () => { })
  }

  useEffect(() => {
    pauseGame()
    setWelcomeScreen(true);
    if (step <= 0 || step == undefined) {
      overView((e) => {
        if (introSteps == 13 && e == -2) {
          setStep(-1);
        }
        setWelcomeScreen(false);
      }, () => {
        setWelcomeScreen(false);
        setStep(-2)

      })
    } else {
      fetchGameState(() => {
        setWelcomeScreen(false);
      }, () => { })
    }
  }, [isLandscape])



  // useEffect(()=>{
  //   const audioIcon= document.getElementById("audio-icon");
  //   if(audioIcon){
  //     audioIcon.click()
  //   }
  //   // if(isPlaying==undefined|| isPlaying){

  //   //   audio.play();
  //   //   playAudio(true);
  //   // }else{
  //   //   audio.pause();
  //   // }
  // },[])


  // useEffect(()=>{
  //     // const handleOrientationChange = () => {
  //     //     setIsLandscape(window.matchMedia("(orientation: landscape)").matches); 
  //     //     console.log('window orientation changed',window.matchMedia("(orientation: landscape)").matches) 

  //     // };

  //     // // Listen for orientation changes
  //     // window.addEventListener("orientationchange", handleOrientationChange);
  //     // // Initial check
  //     // console.log('window orientation changed from useeffect',window.matchMedia("(orientation: landscape)").matches) 

  //     // return () => {
  //     //     // Clean up the event listener
  //     //     window.removeEventListener("orientationchange", handleOrientationChange);
  //     // };

  //     const handleOrientationChange = (event) => {
  //         const { alpha, beta, gamma } = event;
  //         // Checking the gamma angle to determine landscape or portrait orientation
  //         setIsLandscape(Math.abs(gamma) > 45);
  //         console.log(Math.abs(gamma))
  //     };

  //     // Listen for deviceorientation event
  //     window.addEventListener("deviceorientation", handleOrientationChange);

  //     return () => {
  //         // Clean up the event listener
  //         window.removeEventListener("deviceorientation", handleOrientationChange);
  //     };
  // },[])

  const LetsPlayFrame = () => {
    return (
      <div className="r-c-c" style={{ width: "100%", height: "100%" }}>
        <div className="r-c-c letsPlayFrame"><img className="full-img" src={letsPlayFrame} /></div>

        <div className='r-c-c-c' style={{ position: "absolute", width: "100%", height: "100%", display: "flex" }} >
          <div className="let-text" >
            Let's Play
          </div>
          <div className='r-c-c play-btn  m-t-20' style={{ display: 'flex', justifyContent: 'center', alignItmes: 'center', width: '50%' }} >
            <Button onClick={handleGameStart} style={{ width: "100%", cursor: "pointer", maxWidth: '200px' }}>Play</Button>
          </div>
        </div>

      </div>
    )
  }
  const LetsResumeFrame = () => {
    return (
      <div className="r-c-c" style={{ width: "100%", height: "100%" }}>
        <div className="r-c-c letsPlayFrame" style={{ position: "relative" }}>
          <img className="full-img" src={letsPlayFrame} />
          <div className="letsPlayResume" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: "100%", position: "absolute" }}>

            <div className='r-c-c-c' style={{ position: 'absolute', height: '100%', width: "100%", display: "flex" }}>
              <div className="let-text" >
                Let's Play
              </div>
              <div className='r-c-c m-t-20' style={{ gap: 20, display: 'flex', justifyContent: 'center', alignItmes: 'center' }}>
                <div className='play-btn' style={{ display: 'flex', justifyContent: 'center', alignItmes: 'center', width: '50%' }}>
                  <Button style={{ width: "100%", cursor: "pointer", maxWidth: '200px' }} onClick={handleGameStart}>PLAY AGAIN</Button>
                </div>
                <div className='play-btn' style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItmes: 'center' }}>
                  <Button style={{ width: "100%", cursor: "pointer", maxWidth: '200px' }} onClick={handleResume}>RESUME</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }


  const SelectToken = () => {
    const [selectedTokenId, setSelectedTokenId] = useState(null);
    const [storeToken, setStoreToken] = useState(null);
    const [showToken, setShowToken] = useState(false);

    const handleTokenClick = (token) => {
      setSelectedTokenId(token?.id);
      setStoreToken(token)
      setShowToken(true);

    };
    return (
      <>
        <div className="r-c-c" style={{ width: "100%", height: "100%" }}>
          <div className="r-c-c letsPlayFrame"><img className="full-img" src={letsPlayFrame} /></div>
          <div className='r-c-c' >
            <div className="letsPlay">
              Select Tokens
            </div>
          </div>
          <div className='r-c-c token-bg'><img className="full-img" src={tokenBG} /></div>

          <div className='tokens-parent r-c-c'>
            {selectTokens?.map(token => (

              <div key={token.id} className='token-resize r-c-c-c cursor-pointer p-10' onClick={() => handleTokenClick(token)}>
                <img className='full-img' src={token.image} />
                <div style={{ color: token.color }}>{token.name}</div>
              </div>

            ))}
          </div>
        </div>
        {showToken && <Modal open={showToken}     closeIcon={false} className='r-c-c-c token-model' footer={null} bodyStyle={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} centered={true} style={{}} onCancel={() => setShowToken(false)}  >
          <div className='r-c-c-c' style={{ width: "40%", position: "relative" }}>
            <img className="full-img" src={storeToken?.image} />
            <span style={{ color: storeToken?.color }}> {storeToken?.name}</span>
            <div style={{ color: storeToken?.color, position: "absolute", fontWeight: "bold", fontSize: "100px", bottom: "-50px" }}> <UserInitials fullName={userDetails?.name} /></div>
          </div>

          <div className='r-c-c done-btn m-t-50'  ><Button onClick={() => {
            setChooseValueModal(true);
            const params = {
              selectedToken: selectedTokenId
            }
            selectToken(params, () => { setStep(3); setIsOpenModal(false); setShowToken(false); setGameIntroSteps(0); },
              () => { setIsOpenModal(false); setShowToken(false) })

          }} >Done</Button></div>
        </Modal>}

      </>

    );
  };

  console.log("userDetails", userDetails?.name)
  const SelectPlayer = () => {
    return (
      <div className="r-c-c" style={{ width: "100%", height: "100%" }}>
        <div className="r-c-c letsPlayFrame" style={{ position: "absolute" }}><img className="full-img" src={letsPlayFrame} /></div>
        <div className='r-c-c-c' style={{ width: "100%", height: "100%", position: "absolute" }} >
          <div className="r-c-c select-player-text">
            Select Player
          </div>
          <div className='r-c-c m-t-20 select-player-ls'>
            <div className='r-c-c-c cursor-pointer ' onClick={() => {
              setGameType(() => {
                setStep(2)
              }, () => {
                console.log('Error while setting game type!')
              })
            }}>
              <div style={{ width: "30%" }}>
                <img className="full-img" src={singleUser} />
              </div>
              Single Player
            </div>
            <div className='r-c-c-c ' style={{}}>
              <div style={{ width: "30%" }}>
                <img className="full-img" src={multiPlayerIc} />
              </div>
              Coming Soon
            </div>
          </div>
        </div>

      </div>
    )
  }


  useEffect(() => {
    pauseGame();
  }, [])




  const Step = () => {

    switch (step) {
      case -2: return <><Intro /></>
      case -1: return <div className='r-c-c' style={{ width: "100%", height: "100%" }}> <LetsPlayFrame /></div>
      case 0: return <div className='r-c-c' style={{ width: "100%", height: "100%" }}><LetsResumeFrame /></div>
      case 1: return <div className='r-c-c' style={{ width: "100%", height: "100%" }} ><SelectPlayer /></div>
      case 2: return <div className='r-c-c' style={{ width: "100%", height: "100%" }} ><SelectToken /></div>
      case 3: return <div><GamePlayBoard isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} socket={socket} /></div>
      case 4: return <div><FeedBack /></div>
      case 5: return <div><Poll /></div>
      case 6: return <div><Certificate /></div>
      case 7: return <div><ThanksPage /></div>
      default: return <NotFound />

    }
  }

  const Settings = () => {

    const [isOpenModalSetting, setIsOpenModalSetting] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    useEffect(() => {

      if (isOpenModalSetting) {
        pauseGame(true);
      } else {
        pauseGame(false);
      }
    }, [isOpenModalSetting])

    const handleSetting = () => {
      setIsOpenModalSetting(true);
      setOpenSettings(true);
      pauseGame(true)
    }


    // if(openSettings){
    //   handleSetting()
    // }

    return (
      <>
        {!isOpenModalSetting && step != 3 ?

          <div id="lock-btn-2" style={{}}>

            <img
              className="btn-img-settings"
              src={settings}
              onClick={(e) => { e.preventDefault(); handleSetting() }}
            />
          </div>
          : null}
        {isOpenModalSetting && <SettingsModal
          isOpenModal={isOpenModalSetting}
          setIsOpenModal={setIsOpenModalSetting}
          setIsOpenModalSetting={setIsOpenModalSetting}
          setOpenSettings={setOpenSettings}
          openSettings={openSettings}
        />}
      </>
    )
  }
  return (
    <>
      <div className="portrait-prompt">
        <div className='component-wrapper'>
          <div className='portrait-container'>
            <RotateRightOutlined style={{ fontSize: 120 }} />

            <span className='portrait-heading'>Please Rotate Your Device </span>

            <span className='portrait-subheading'>This game is best viewed in landscape mode.</span>
          </div>

        </div>
      </div>
      <div className='landscape'>

        {welcomeScreen ?
          <Welcome />
          :
          <>
            <Settings />
            <Step />
          </>

        }
      </div>




    </>

  )
}

const mapStateToProps = state => {

  const { step, resume, selectTokens, isGamePaused, auth, introSteps, isPlaying, userDetails } = state?.SeTu;
  return { step, resume, selectTokens, auth, introSteps, isPlaying, userDetails }
}


const mapDispatchToProps = dispatch => ({

  setLogin: (val) => dispatch(setLogin(val)),
  setChooseValueModal: (val) => dispatch(setChooseValueModal(val)),
  pauseGame: (val) => dispatch(pauseGame(val)),
  setIntroSteps: (val) => dispatch(setIntroSteps(val)),
  setStep: (val) => dispatch(setStep(val)),
  setGameIntroSteps: (val) => dispatch(setGameIntroSteps(val)),
  gameStart: (successCallBack, callBack) => dispatch(gameStart(successCallBack, callBack)),
  setGameType: (successCallBack, callBack) => dispatch(setGameType(successCallBack, callBack)),
  selectToken: (params, successCallBack, callBack) => dispatch(selectToken(params, successCallBack, callBack)),
  overView: (successCallBack, callBack) => dispatch(overView(successCallBack, callBack)),
  fetchGameState: (successCallBack, callBack) => dispatch(fetchGameState(successCallBack, callBack)),
  playAudio: (val) => dispatch(playAudio(val))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)


