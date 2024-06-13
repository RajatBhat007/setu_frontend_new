import React, { useState, useEffect } from 'react'
import learningBG from "../../assets/Learning Card Background (1).png"
import setuLogo from "../../assets/gameBoard/setu-white.png"
import userSettingIc from "../../assets/userSetting.png"
import { Button } from 'antd'
import behaviourBG from "../../assets/Behavior BG (1).png"
import { connect } from 'react-redux'
import pollBG from "../../assets/learningCardIcons/Behavior poll BG.svg"
import pollQuestionBg from "../../assets/learningCardIcons/Behavior poll options BG.svg"
import pollOptionBg from "../../assets/learningCardIcons/Option BG.svg"
import "./feeback.css"
import { saveFeedback, getFeedbackQuestions, setStep, pauseGame } from '../../reduxStore/actions/action'
import SettingsModal from '../components/settingsModal'



function FeedBack({ learningCardData, correctValueBuddies, valueBuddiesImg, getFeedbackQuestions, setStep, saveFeedback, pauseGame }) {
    console.log("learningData", learningCardData)


    const [downloadCertificate, setDownloadCertificate] = useState(true);
    const [isOpenModalSetting, setIsOpenModalSetting] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [formData, setFormData] = useState([]);
    const handleSetting = () => {
        setIsOpenModalSetting(true);
        setOpenSettings(true);
        pauseGame(true)
    }
    useEffect(() => {
        getFeedbackQuestions(() => {
            setFormData(learningCardData?.map(ele => {
                let obj = {};
                obj["questionId"] = ele.id;
                obj["question"] = ele.question;
                obj["feedback"] = correctValueBuddies?.map(v => {
                    return { [valueBuddiesImg[v - 1].name]: '' }
                })
                return obj;
            }))
        }, () => {

        })
    }, [])


    // Handle form submission (optional)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        saveFeedback({ response: formData }, () => {
            setStep(5)
        }, () => {

        })

    };

    const BehaviorFeed = ({ learningData, index1 }) => {
        console.log("learningDataa", learningData)
        return (
            <div className="behavior-feed">


                <div className="r-c-fs beh-feed-sub">

                    <img className='full-img' src={behaviourBG} alt="Behavior Background" />


                    <div className='beh-cards'>
                        <div className="r-c-fs cards-header">
                            <div className='card-ic'><img className='full-img' src={learningData?.icon} /> </div>
                            <div className="feed-question-text" >{learningData?.question}</div>
                        </div>
                        <div className=' cards-input-box'>
                            {correctValueBuddies?.map((item, index) => (
                                <div className='' style={{ width: "100%", display: "flex", padding: "5px 0px" }}>
                                    <span class='input-1 r-c-fs' data-fulltext="{valueBuddiesImg[item - 1].name}">
                                        {valueBuddiesImg[item - 1].name}
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        className='r-c-fs input-2'
                                        onChange={(e) => {

                                            formData[index1]["questionId"] = learningData['id']
                                            formData[index1]["question"] = learningData['question']
                                            formData[index1]["feedback"][index][valueBuddiesImg[item - 1].name] = e.target.value
                                            setFormData(formData)
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="super-parent">
            <div className='r-c-c header-text' >Now, Analyze your learnings and fill up the card</div>
            <form onSubmit={handleSubmit}>
                <div className='r-c-c behaviour-parent' >
                    <div className='r-c-sb beh-headers'>
                        <div className='setting-div'><img className='full-img cursor-pointer' onClick={(e) => { e.preventDefault(); handleSetting() }} src={userSettingIc} alt="User Setting" /></div>
                        <div className='beh-text' >LEARNING CARD</div>
                        <div className='beh-setu-logo' ><img className='full-img' src={setuLogo} alt="Setu Logo" /></div>
                    </div>
                    <div className='r-c-c-c beh-bg'>
                        <img className='full-img' src={learningBG} alt="Learning Background" />

                        <div className="grid-container-feed scroll-bar-universal" >
                            {learningCardData?.map((item, index) => (
                                <div key={index} className="grid-item-feed"><BehaviorFeed learningData={item} index1={index} /></div>
                            ))}
                        </div>
                        <div className='r-c-c powered-by-text'>Powered by The Gamification Company. </div>
                    </div>
                </div>
                <div className="r-c-c done-btn-learning" style={{}}><Button style={{}} htmlType='submit'>DONE</Button></div>
            </form>
            {isOpenModalSetting && <SettingsModal
                isOpenModal={isOpenModalSetting}
                setIsOpenModal={setIsOpenModalSetting}
                setIsOpenModalSetting={setIsOpenModalSetting}
                setOpenSettings={setOpenSettings}
                openSettings={openSettings}
            />}
        </div>
    )
}

const mapStateToProps = state => {

    const { learningCardData, correctValueBuddies, valueBuddiesImg } = state?.SeTu;
    return { learningCardData, correctValueBuddies, valueBuddiesImg }
}


const mapDispatchToProps = dispatch => ({
    getFeedbackQuestions: (successCallBack, callBack) => dispatch(getFeedbackQuestions(successCallBack, callBack)),
    saveFeedback: (params, successCallBack, callBack) => dispatch(saveFeedback(params, successCallBack, callBack)),
    setStep: (val) => dispatch(setStep(val)),
    pauseGame: (val) => dispatch(pauseGame(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack)
