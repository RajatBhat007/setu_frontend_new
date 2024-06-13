import React, { useState, useEffect } from 'react'
import learningBG from "../../assets/Learning Card Background (1).png"
import setuLogo from "../../assets/gameBoard/setu-white.png"
import userSettingIc from "../../assets/userSetting.png"
import { Button, message } from 'antd'
import behaviourBG from "../../assets/Behavior BG (1).png"
import { connect } from 'react-redux'
import pollBG from "../../assets/learningCardIcons/Behavior poll BG.svg"
import pollQuestionBg from "../../assets/learningCardIcons/Behavior poll options BG.svg"
import pollOptionBg from "../../assets/learningCardIcons/Option BG.svg"
import "./feeback.css"
import { savePoll, getPollQuestions, setStep } from '../../reduxStore/actions/action'



function Poll({ getPollQuestions, savePoll, setStep, pollQuestions }) {



    const [formData, setFormData] = useState([]);

    useEffect(() => {
        getPollQuestions(() => {
            let arr=pollQuestions?.map(ele => {
                let obj = {};
                obj["questionId"] = ele.id;
                obj["question"] = ele.question;
                obj["option"] = null
                return obj;
            })
            setFormData([...arr])
        }, () => {

        })
    }, [])


    // Handle form submission (optional)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        let allSelected = true;
        formData?.forEach(f => {
            if (f.option == null) {
                message.error('Please choose all the questions!');
                allSelected = false;
                return
            }

        });

        if (allSelected) {
            savePoll({ response: formData }, () => {
                setStep(6)
            }, () => {

            })
        }
    };

    const PollsDesign = ({ pollsData, index1 }) => {
        
        return (
            <div className="poll-container" >
                <div className="poll-question-bg">
                    <img className="full-img" src={pollQuestionBg} alt="Poll Question Background" />

                    <div className="poll-parent ">
                        <div className="poll-options scroll-bar-universal" style={{  }}>
                            <div className="poll-question-text">
                                {pollsData?.question} 
                            </div>
                            {pollsData?.options?.map((item, index) => (
                                <div
                                    key={index}
                                    className="poll-option"
                                    style={{
                                        boxShadow: formData?.[index1]?.["option"] === item ? "0 0 5px 5px green" : "none",
                                        // transform: formData?.[index1]?.["option"] === item ? "scale(1.1)" : "scale(1)",
                                        transition: "transform 0.3s, box-shadow 0.3s",
                                    }}
                                    onClick={() => {
                                        if (formData && formData.length > 0) {
                                            formData[index1]["option"] = item;
                                            setFormData([...formData]);
                                        }
                                    }}
                                >
                                    <img className="full-img" src={pollOptionBg} alt="Poll Option Background" />
                                    <div className="poll-option-text">
                                        {item}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        );
    }
    return (
        <div className="super-parent">
            <div className='r-c-c header-text' > "Now, Analyze your behavior and answer the poll" </div>
            <>
                <div className='r-c-c m-t-20' style={{ position: "relative", width: "100%", height: "100%", alignItems: "flex-start" }}>

                    <div className='r-c-c-c parent-poll-bg' style={{  }}>
                        <img className='full-img' src={pollBG} alt="Learning Background" />

                        <div className="grid-container-feed scroll-bar-universal" style={{}}>
                            {pollQuestions?.map((item, index1) => (
                                <div key={index1} className="grid-item-feed">
                                     <div className="poll-container" >
                <div className="poll-question-bg">
                    <img className="full-img" src={pollQuestionBg} alt="Poll Question Background" />

                    <div className="poll-parent ">
                        <div className="poll-options scroll-bar-universal" style={{  }}>
                            <div className="poll-question-text">
                                {item?.question}
                            </div>
                            {item?.options?.map((item, index) => (
                                <div
                                    key={index}
                                    id={'poll-options'+Math.random()}
                                    className="poll-option"
                                    style={{
                                        boxShadow: formData?.[index1]?.["option"] === item ? "0 0 5px 5px green" : "none",
                                        // transform: formData?.[index1]?.["option"] === item ? "scale(1.1)" : "scale(1)",
                                        transition: "transform 0.3s, box-shadow 0.3s",
                                    }}
                                    onClick={() => {
                                        if (formData && formData.length > 0) {
                                            formData[index1]["option"] = item;
                                            setFormData([...formData]);
                                        }
                                    }}
                                >
                                    <img className="full-img" src={pollOptionBg} alt="Poll Option Background" />
                                    <div className="poll-option-text">
                                        {item}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="r-c-c done-btn-learning" style={{}}><Button style={{  }} onClick={handleSubmit}>DONE</Button></div>
            </>
        </div>
    )
}

const mapStateToProps = state => {

    const { pollQuestions } = state?.SeTu;
    return { pollQuestions }
}


const mapDispatchToProps = dispatch => ({
    getPollQuestions: (successCallBack, callBack) => dispatch(getPollQuestions(successCallBack, callBack)),
    savePoll: (params, successCallBack, callBack) => dispatch(savePoll(params, successCallBack, callBack)),
    setStep: (val) => dispatch(setStep(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Poll)
