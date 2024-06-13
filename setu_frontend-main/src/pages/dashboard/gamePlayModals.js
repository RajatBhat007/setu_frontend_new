import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import letsPlayFrame from '../../assets/magnus-intro/letsPlay-frame.svg';
import { setRemainingTime } from '../../reduxStore/actions/action';


function GamePlayModals({ isOpenModal, setIsOpenModal, title, btnText,
  subText, setTriggerFunction, triggerValue, isNextActive, setShowDiceBtn, runTimer, setRemainingTime, gameIntroSteps, fetchGameState, countSelected, correctValueBuddies }) {
  useEffect(() => { setIsOpenModal(true) }, [])
  const handleNext = () => {
    if (isNextActive) {

      setTriggerFunction(1)
      setIsOpenModal(false);
    } else {

      setShowDiceBtn(true);
      setIsOpenModal(false);

      if (gameIntroSteps == 4) {
        setRemainingTime(1);
        runTimer();
        fetchGameState(() => {

        }, () => { })
      }

    }
  }

  console.log("correeeee", countSelected, correctValueBuddies)



  return (
    <Modal
      visible={isOpenModal}
      onCancel={() => setIsOpenModal(false)}
      footer={null}
      maskClosable={false}
      closeIcon={false}
      className='token-model'
      width={1000}
      style={{ overflow: 'hidden !important' }}
    >
      <div className="r-c-c" style={{ width: "100%", height: "100%", textAlign: "center" }}>
        <div className="r-c-c letsPlayFrame" style={{ width: "80%" }} ><img style={{ width: "100%" }} src={letsPlayFrame} alt="lets play" /></div>
        <div className='r-c-c-c' style={{}} >
          <div className="r-c-c-c letsPlay" style={{ left: "30%", width: "44%", color: "#44301E" }}>
            {title}
            <div style={{ fontSize: "20px", fontWeight: "bold" }} >{subText ? subText : null}</div>
            <div className='r-c-c play-btn m-t-20' style={{ position: "relative", width: "100%" }} >
              <Button onClick={handleNext}>{btnText}</Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}


export default GamePlayModals;
