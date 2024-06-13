import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import nextIcon from "../../assets/next icon.svg";
import backIcon from "../../assets/previous icon.svg";
import skipIntro from "../../assets/skip intro.svg";
import "./styles.css";
import "../../design/layout.css";

import { overView, setIntroSteps, setLogin, setStep } from "../../reduxStore/actions/action";
import QuestionAnswersModal from "./questionAnswersModal";

function Intro({ assests, setIntroSteps, introSteps, setLogin, setStep, overView }) {
  console.log("assests11", introSteps, assests[introSteps]);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [choiceIndex, setChoiceIndex] = useState(null);
  const MagnusIntro1 = () => {
    return (
      <div className="intro-parent r-c-fs" style={{}}>
        <div className={introSteps == 1 ? "magnus-2" : "magnus-1"}>
          <img className="magnus-img" src={assests?.[introSteps]?.magnus} />
        </div>
        <div className={introSteps == 1 ? "text-1-1" : "text-1"}>
          <img className="text-img" src={assests?.[introSteps]?.text} />
        </div>
      </div>
    );
  };
  const MagnusIntro2 = () => {
    return (
      <div className="intro-parent r-c-fs" style={{}}>
        <div className="magnus-3">
          <img className="magnus-img" src={assests?.[introSteps]?.magnus} />
        </div>
        <div className="text-left">
          <img className="text-img" src={assests?.[introSteps]?.text} />
        </div>
        <div className="game-board1" style={{}}>
          <img className="magnus-img" src={assests?.[introSteps]?.gameBoard} />
        </div>
      </div>
    );
  };
  const MagnusIntro3 = () => {
    return (
      <div className="intro-parent" style={{}}>
        <div className="text-2">
          <img className="text-img" src={assests?.[introSteps]?.text} />
        </div>
        <div className={"magnus-4"}>
          <img className="magnus-img" src={assests?.[introSteps]?.magnus} />
        </div>
        <div className="tokens-card">
          <div className="r-c-c">
            <img
              className="magnus-img p-10"
              src={assests?.[introSteps]?.tokenCard?.card1}
            />
          </div>
          <div className="r-c-c">
            <img
              className="magnus-img p-10"
              src={assests?.[introSteps]?.tokenCard?.card2}
            />
          </div>
          <div className="r-c-c">
            <img
              className="magnus-img p-10"
              src={assests?.[introSteps]?.tokenCard?.card3}
            />
          </div>
          <div className="r-c-c">
            <img
              className="magnus-img p-10"
              src={assests?.[introSteps]?.tokenCard?.card4}
            />
          </div>
        </div>
      </div>
    );
  };
  const MagnusIntro4 = () => {
    return (
      <div className="intro-parent r-c-fs" style={{}}>
        <div className={"badges-1"}>
          <img className="magnus-img" src={assests?.[introSteps]?.badges} />
        </div>
        <div className={"magnus-5"}>
          <img className="magnus-img" src={assests?.[introSteps]?.magnus} />
        </div>
        <div className="text-3">
          <img className="text-img" src={assests?.[introSteps]?.text} />
        </div>
      </div>
    );
  };
  const MagnusIntro5 = () => {
    return (
      <div className="intro-parent r-c-fs" style={{}}>
        <div className="text-4">
          <img className="text-img" src={assests?.[introSteps]?.text} />
        </div>
        <div className={"magnus-6"}>
          <img className="magnus-img" src={assests?.[introSteps]?.magnus} />
        </div>
        <div className={"badges-2"}>
          <img className="magnus-img" src={assests?.[introSteps]?.badges} />
        </div>
      </div>
    );
  };
  const MagnusIntro6 = () => {
    return (
      <div className="intro-parent r-c-fs" style={{}}>
        <div className={"magnus-7"}>
          <img className="magnus-img" src={assests?.[introSteps]?.magnus} />
        </div>
        <div className="text-5">
          <img className="text-img" src={assests?.[introSteps]?.text} />
        </div>
        <div className="crossBoardImg">
          <img className="text-img" src={assests?.[introSteps]?.crossBoard} />
        </div>
      </div>
    );
  };
  const MagnusIntro7 = () => {
    return (
      <div className="intro-parent r-c-fs" style={{}}>
        <div className="valueBuddies">
          <img
            className="magnus-img"
            src={assests?.[introSteps]?.valueBuddies}
          />
        </div>
        <div className={"magnus-8"}>
          <img className="magnus-img" src={assests?.[introSteps]?.magnus} />
        </div>
        <div className="text-6">
          <img className="text-img" src={assests?.[introSteps]?.text} />
        </div>
      </div>
    );
  };
  const MagnusIntro8 = () => {
    let backGate = assests?.[introSteps]?.gate;
    return (
      <div className="intro-parent r-c-fs">
        <div className="bg-1-parent " style={{}}>
          <img className='bg-1' src={assests?.[introSteps]?.gate} />
        </div>
        <div className={"magnus-8-1"}>
          <img className='magnus-img' src={assests?.[introSteps]?.magnus} />
        </div>
        <div className='text-7'>
          <img className='text-img' src={assests?.[introSteps]?.text} />
        </div>


      </div>
    );
  };
  const MagnusIntro9 = () => {
    return (
      <div className="intro-parent r-c-fs">
        <div className="bg-1-parent " style={{}}>
          <img className='bg-1' src={assests?.[introSteps]?.background1} />
        </div>
        <div className="bg-2-parent " style={{}}>
          <img className="magnus-img" src={assests?.[introSteps]?.background2} />
        </div>
        <div className={"magnus-9"}>
          <img className='magnus-img' src={assests?.[introSteps]?.magnus} />
        </div>
        <div className='text-8'>
          <img className='text-img' src={assests?.[introSteps]?.text} />
        </div>
        <div className='text-9' style={{}}>{assests?.[introSteps]?.headingText}</div>
        <div className='client-1'>
          <img className='magnus-img' src={assests?.[introSteps]?.clientGirl} />
        </div>
        <div className="r-c-c-c parent-cards">
          <div className="card-1 cursor-pointer" onClick={() => { setChoiceIndex(1); setIsOpenModal(true) }} > <img className='magnus-img' src={assests?.[introSteps]?.cards?.card1} /></div>
          <div className="card-2 cursor-pointer" onClick={() => { setChoiceIndex(2); setIsOpenModal(true) }}> <img className='magnus-img' src={assests?.[introSteps]?.cards?.card2} /></div>
          <div className="card-3 cursor-pointer" onClick={() => { setChoiceIndex(3); setIsOpenModal(true) }}> <img className='magnus-img' src={assests?.[introSteps]?.cards?.card3} /></div>
          <div className="card-4 cursor-pointer" onClick={() => { setChoiceIndex(0); setIsOpenModal(true) }}> <img className='magnus-img' src={assests?.[introSteps]?.cards?.card4} /></div>
        </div>
      </div>
    );
  };
  const MagnusIntro10 = () => {
    return (
      <div className="intro-parent r-c-fs">
        <div className="bg-1-parent " style={{}}>
          <img className='bg-1' src={assests?.[introSteps]?.gate} />
        </div>
        <div className={"magnus-10"}>
          <img className='magnus-img' src={assests?.[introSteps]?.magnus} />
        </div>
        <div className='text-10'>
          <img className='text-img' src={assests?.[introSteps]?.text} />
        </div>
        <div className='client-2'>
          <img className='magnus-img' src={assests?.[introSteps]?.clientGirl} />
        </div>

      </div>
    );
  };
  const MagnusIntro11 = () => {
    return (
      <div className="intro-parent r-c-fs">
        <div className="bg-1-parent " style={{}}>
          <img className='bg-1' src={assests?.[introSteps]?.gate} />
        </div>
        <div className={"magnus-10"}>
          <img className='magnus-img' src={assests?.[introSteps]?.magnus} />
        </div>
        <div className='text-11'>
          <img className='text-img' src={assests?.[introSteps]?.text} />
        </div>
        <div className='client-2'>
          <img className='magnus-img' src={assests?.[introSteps]?.clientGirl} />
        </div>

      </div>
    );
  };
  const MagnusIntro12 = () => {
    return (
      <div className="intro-parent r-c-fs">

        <div className='text-12'>
          <img className='text-img' src={assests?.[introSteps]?.text} />
        </div>
        <div className={"magnus-10-1"}>
          <img className='magnus-img' src={assests?.[introSteps]?.magnus} />
        </div>
        <div className='learning-card'>
          <img className='magnus-img' src={assests?.[introSteps]?.learningCard} />
        </div>

      </div>
    );
  };

  



  console.log("checkimg", assests?.[introSteps]?.cards?.card1)
  return (
    <>
      {introSteps == 3 ? (
        <MagnusIntro2 />
      ) : introSteps == 4 ? (
        <MagnusIntro3 />
      ) : introSteps == 5 ? (
        <MagnusIntro4 />
      ) : introSteps == 6 ? (
        <MagnusIntro5 />
      ) : introSteps == 7 ? (
        <MagnusIntro6 />
      ) : introSteps == 8 ? (
        <MagnusIntro7 />
      ) : introSteps == 9 ? (
        <MagnusIntro8 />
      ) : introSteps == 10 ? (
        <MagnusIntro9 />
      ) : introSteps == 11 ? (
        <MagnusIntro10 />
      ) : introSteps == 12 ? (
        <MagnusIntro11 />
      ) : introSteps == 13 ? (
        <MagnusIntro12 />
      ) : (
        <MagnusIntro1 />
      )}

      {introSteps == 14 ? null :
        <div className="parent-btn-img r-c-sb" style={{}}>

          <div className="parent-btns r-c-fs" style={{}}>
            <img
              className="full-img"
              style={{ cursor: introSteps > 0 ? "pointer" : "not-allowed" }}
              onClick={() => {
                if (introSteps > 0) setIntroSteps(introSteps - 1);
              }}

              src={backIcon}
            />
            <img
              className="full-img"
              style={{
                cursor: "pointer"
              }}
              onClick={() => {
                if (introSteps < assests.length - 1 && introSteps !== 13) {
                  console.log("check10");
                  setIntroSteps(introSteps + 1);
                } else if (introSteps === 13) {
                  console.log("check14");
                  overView((e) => {
                    if(e==-2){
                      setStep(-1);
                    }
                   }, () => { 
                    setStep(-1);
                   })
                  
                }
              }}
              src={nextIcon}
            />
          </div>
          <div className="parent-skip cursor-pointer" onClick={() => overView((e) => { if(e==-2){
                      setStep(-1);
                    } }, () => { })} style={{}}>
            <img className="full-img" src={skipIntro} />
          </div>

        </div>
      }
      {isOpenModal &&
        <QuestionAnswersModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          choiceIndex={choiceIndex}
        />}
    </>
  );
}

const mapStateToProps = (state) => {
  const { assests, introSteps } = state.SeTu;
  return { assests, introSteps };
};

const mapDispatchToProps = (dispatch) => ({
  setIntroSteps: (val) => dispatch(setIntroSteps(val)),
  setLogin: (val) => dispatch(setLogin(val)),
  setStep: (val) => dispatch(setStep(val)),
  overView: (successCallBack, callBack) => dispatch(overView(successCallBack, callBack)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
