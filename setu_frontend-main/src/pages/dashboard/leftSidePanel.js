import React, { useState, useRef, useEffect, useMemo, memo, useCallback } from 'react'
import leftPanel from '../../assets/gameBoard/Left panal.png'
import barometer from "../../assets/gameBoard/barometer-1.png"
import karmaBadgesMeter from "../../assets/gameBoard/karma-meter.png"
import { connect } from 'react-redux'
import { Badge, Button, Modal } from 'antd'
import GamePlayModals from './gamePlayModals'
import { setGameIntroSteps, selectValueBuddies, handleRestart, setRemainingTime, fetchGameState, setChooseValueModal, setStep } from '../../reduxStore/actions/action'
import letsPlayFrame from '../../assets/magnus-intro/letsPlay-frame.svg';
import answerEmptyBG from "../../assets/Empty Choice Box.png"
import answerBG from "../../assets/Answer box BG.png"
import leftQuestionBg from "../../assets/Left Panel BG.png"
import positivePath from "../../assets/Positive path.png"
import negativePath from "../../assets/Negative path.png"
import MagunsOpenHand from "../../assets/magnus-intro/new magnus1magnus-2-p-r-2.svg"
import MagnusTakingBack from "../../assets/magnus-taking-back.png"
import CustomBox from "../../assets/customText-box.png"
import diceImg from '../../assets/dice/dice.png'
import goodPathGif from "../../assets/Good_Path.gif"
import badPathGif from "../../assets/Snake_Loop.gif"

import badge5 from "../../assets/karma-badges/badge-1.svg"
import badge4 from "../../assets/karma-badges/badge-2.svg"
import badge3 from "../../assets/karma-badges/badge-3.svg"
import badge2 from "../../assets/karma-badges/badge-4.svg"
import badge1 from "../../assets/karma-badges/badge-5.svg"




export const ChooseCorrectValue = ({ chooseValueModal, setChooseValueModal, correctValueBuddies }) => {

    return (
        <div>
            <Modal
                visible={chooseValueModal}
                onCancel={() => { setChooseValueModal(false) }}
                footer={null}
                closeIcon={false}
                className='token-model'
                maskClosable={false}
                width={1000}
                style={{ height: "90dvh" }}
            >
                <div className="r-c-c" style={{ width: "100%", height: "100%", textAlign: "center" }}>
                    <div className="r-c-c letsPlayFrame" style={{ width: "80%" }} ><img style={{ width: "100%" }} src={letsPlayFrame} alt="lets play" /></div>
                    <div className='r-c-c-c' style={{}} >
                        <div className="letsPlay" style={{ left: "24%", width: "52%", color: "#44301E", fontSize: "33px" }}>
                            Choose the {correctValueBuddies?.length} correct value buddies
                            <div className='r-c-c play-btn  m-t-20' style={{ position: "absolute", right: "4%", width: "100%" }} >
                                <Button onClick={() => { setChooseValueModal(false) }}>OK</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const RollDice = React.memo(({ diceValue, showDiceBtn, handleRollDice, dice, diceRandom }) => {



    const handleClick = () => {
        handleRollDice();

    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', position: 'relative', width: '100%', height: '100%' }}>

            {console.log('inside dice roll', diceValue)}

            {showDiceBtn? <div className='r-c-c done-btn' style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center',width:'100%',height:'0%', }} >
               <img src={diceImg}
                           onClick={handleClick}
                            style={{
                                width: '10vh', height: '10vh',
                                objectFit: 'contain',
                                cursor:'pointer'
                            }}  >

                        </img>
                <Button onClick={handleClick} >Roll Dice</Button>
            </div>
                :
                diceValue ?

                    <div style={{ position: 'absolute', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <img src={`${dice?.[diceValue]}?${diceRandom}`}
                            id="gif-animation"
                            style={{
                                width: '20vw', height: '20vw',
                                display: dice?.[diceValue] ? 'block' : 'none',
                                objectFit: 'contain',
                            }}  >

                        </img>
                    </div>
                    : null
            }

        </div>
    )
})

function debounce(func, wait) {
    let timeout;
    const debounced = (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
    debounced.cancel = () => {
        clearTimeout(timeout);
    };
    return debounced;
}



function LeftSidePanel({ tokenCard, valueBuddiesImg, correctValueBuddies, setGameIntroSteps,
    gameIntroSteps,
    selectValueBuddies, handleRollDice, dice, diceValue, showDiceBtn, setShowDiceBtn,
    handleQuestion, optionValue, question, lastReachedPosition, handleRestart,
    setSelectedOption, selectedOption, karmaFlag, randomIndex, runTimer,
    setRemainingTime, fetchGameState, setOptionValue, addedKarmas, removedKarmas, setAddedKarmas,
    setRemovedKarmas, diceRandom, setChooseValueModal, chooseValueModal, isGameOver, setStep
}) {


    const memoId = useMemo(() => true, [addedKarmas, removedKarmas, karmaFlag]);
    console.log('left side panel params', diceValue, selectedOption, karmaFlag, randomIndex, lastReachedPosition,)
    const [isOpenModal, setIsOpenModal] = useState(false);
    const title = ["Identify the correct values", "Personality Tokens", "Karma Badges", "The Decision Impact"]
    const modalTitle = ["Oops!", "Good Job!", "Excellent!", "Let's Play"]
    const modalSubText = ["Value buddies that you selected are not correct", "You have selected 2 correct values only 1 is left", "You have selected all your value buddies", "You have selected 1 correct value only 2 is left",]
    const modalBtnText = ["TRY AGAIN", "OK", "NEXT", "PLAY"]
    const [selectedItems, setSelectedItems] = useState([]);
    const maxAllowed = correctValueBuddies?.length;
    const [isPlayerWin, setIsPlayWin] = useState(false);

    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [isRolled, setIsRolled] = useState(false);



    setTimeout(() => {
        if (isGameOver) {
            setIsPlayWin(true);
            // setTimeout(() => {
            //     setStep(4);
            // }, 1500)
        }

    }, 1000)

    const [questionPart, setQuestionPart] = useState(false);
    const [optionPart, setOptionPart] = useState(false);
    const [magnusPart, setMagnusPart] = useState(false);

    // useEffect(() => {
    //     if (selectedOption !== null) {

    //         const resetTimeout = setTimeout(() => {
    //             setSelectedOption(null);
    //         }, 2000);

    //         return () => clearTimeout(resetTimeout);
    //     }
    // }, [selectedOption, setSelectedOption]);


    useEffect(() => {

        if (karmaFlag != null && !optionValue) {
            setIsRolled(true);
            setMagnusPart(true)
            setTimeout(() => {
                setMagnusPart(false);
                if (question) {
                    setQuestionPart(true);
                    setTimeout(() => {
                        setQuestionPart(false);
                    }, 2000)
                } else {
                    setIsRolled(false);
                }

            }, karmaFlag == 1 ? 2000 : 3000)
        }
    }, [karmaFlag, question, optionValue])

    useEffect(() => {
      
        if (question && karmaFlag == null) {
            setIsRolled(true);
            if(sessionStorage.getItem('gateReached')!='true'){
            sessionStorage.setItem('gateReached',true);
            setQuestionPart(true);
            setTimeout(() => {
                setQuestionPart(false);
            }, 2000)
        }
        }
    }, [karmaFlag, question, optionValue])
    useEffect(() => {

        if (optionValue) {
            setIsRolled(true);
            setOptionPart(true);
            setTimeout(() => {
                setOptionPart(false);
                setOptionValue()
                if (karmaFlag == null)
                    setIsRolled(false);
                else {
                    console.log("called magnus start")
                    setMagnusPart(true)
                    setTimeout(() => {
                        console.log("called magnus end")
                        setMagnusPart(false);
                        if (question) {
                            setQuestionPart(true);
                            setTimeout(() => {
                                setQuestionPart(false);
                            }, 3000)
                        } else {
                            setIsRolled(false);
                        }
                        //

                    }, 3500)
                }


            }, 3000)
        }





    }, [karmaFlag, question, optionValue]);




    useEffect(() => {
        setIsNextEnabled(selectedItems.length === maxAllowed);
    }, [selectedItems]);




    const handleNext = () => {
        if (gameIntroSteps === 1) {
            setGameIntroSteps(2);
        } else if (gameIntroSteps === 2) {
            setGameIntroSteps(3);
        } else if (gameIntroSteps === 3) {
            setGameIntroSteps(4);
            setIsOpenModal(true);
        } else if (gameIntroSteps === 4) {
            setGameIntroSteps(5);
            setIsOpenModal(true);
        } else if (gameIntroSteps === 0) {
            if (selectedItems.length === maxAllowed) {
                selectValueBuddies(() => {
                    setIsOpenModal(true);
                }, () => {
                    console.log('Error while selecting value buddies');
                });
            } else {
                setIsOpenModal(true);
            }
        }
    };
    const isCorrect = (id) => {
        return correctValueBuddies.some(item => item === id);
    };
    const countCorrectSelectedItems = () => {
        return selectedItems.filter(item => isCorrect(item.id)).length;
    };
    const countSelected = countCorrectSelectedItems();
    const totalValueBuddies = correctValueBuddies.length;

    let countIndex = 0;
    if (countSelected === 0) {
        countIndex = 0;
    } else if (countSelected < totalValueBuddies) {
        countIndex = 1;
    } else if (countSelected === totalValueBuddies) {
        countIndex = 2;
    } else {
        countIndex = 0;
    }

    const handleCheckboxChange = (item) => {
        const isChecked = selectedItems.some(selected => selected.id === item.id);

        if (isChecked) {
            setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
        } else {
            if (selectedItems.length < maxAllowed) {
                setSelectedItems([...selectedItems, item]);
            }
        }
    };





    const MagnusBadges = () => {


        const triggerAnimation = useCallback((startId, endId, animationClass, id, index) => {
            const startElement = document.getElementById(startId);
            const endElement = document.getElementById(endId);
            if (!startElement || !endElement || document.getElementById(`img-${id}`))
                return

            console.log("start id came", startId)
            const startRect = startElement.getBoundingClientRect();
            const endRect = endElement.getBoundingClientRect();
            console.log('karam badge id', id)
            const newImg = document.createElement('img');
            newImg.setAttribute('src', badges[id]); // Replace with your image path
            newImg.setAttribute('id', `img-${id}`);
            newImg.className = animationClass;
            newImg.style.width = '100%';
            newImg.style.height = '100%';
            newImg.style.objectFit = 'contain';
            newImg.style.position = 'absolute';
            newImg.style.left = `${0}px`;
            newImg.style.top = `${0}px`;
            newImg.style.zIndex = '101'

            newImg.style.setProperty('--end-x', `${endRect.left - startRect.left}px`);
            newImg.style.setProperty('--end-y', `${endRect.top - startRect.top}px`);

            startElement.appendChild(newImg);

            newImg.addEventListener('animationend', () => {


                setTimeout(() => {
                    newImg.remove();
                    setAddedKarmas([]);
                    setRemovedKarmas([])
                }, karmaFlag == 1 ? 1000 : 500)




            });

        }, []);

        const debouncedActionRef = useRef(null);

        // useEffect(()=>{


        //     if (addedKarmas.length > 0) {
        //         const debouncedAction = debounce(() => {
        //         addedKarmas.forEach((id, index) => {
        //             triggerAnimation('karma-badge-1', 'badge-' + (4 - id), 'animate-to', 4 - id, index);
        //         });
        //     }, 500);
        //     debouncedAction();
        //     const cleanup = () => {
        //         clearTimeout(debouncedAction);
        //         setAddedKarmas([]);
        //         setRemovedKarmas([]);
        //       };
        //       return cleanup;
        //     } else if (removedKarmas.length > 0) {
        //         const debouncedAction = debounce(() => {
        //         removedKarmas.forEach((id, index) => {
        //             console.log(removedKarmas, 'inside');
        //             triggerAnimation('badge-' + (4 - id), 'karma-badge-1', 'animate-back', 4 - id, index);
        //         });

        //         }, 900);
        //         debouncedAction();
        //         const cleanup = () => {
        //             clearTimeout(debouncedAction);
        //             setAddedKarmas([]);
        //             setRemovedKarmas([]);
        //           };
        //           return cleanup;
        //             }


        //     }, [addedKarmas,removedKarmas,karmaFlag])



        const createDebouncedAction = useCallback(() => {
            if (removedKarmas.length > 0) {
                return debounce(() => {
                    removedKarmas.forEach((id, index) => {
                        console.log(removedKarmas, 'inside');
                        triggerAnimation('badge-' + (4 - id), 'karma-badge-1', 'animate-back', 4 - id, index);
                    });
                }, 500);
            } else if (addedKarmas) {
                return debounce(() => {
                    addedKarmas.forEach((id, index) => {
                        triggerAnimation('karma-badge-1', 'badge-' + (4 - id), 'animate-to', 4 - id, index);
                    });
                }, 500);

            }
        }, [removedKarmas, addedKarmas]);



        useEffect(() => {
            // Assign the debounced function to the ref
            debouncedActionRef.current = createDebouncedAction();

            // Call the debounced function
            debouncedActionRef.current();

            // Cleanup function to clear the timeout
            return () => {
                if (debouncedActionRef.current) {
                    debouncedActionRef.current.cancel();
                }
            };
        }, [createDebouncedAction]);
        // useEffect(() => {
        //     if (addedKarmas.length > 0) {
        //         addedKarmas.forEach((id, index) => {
        //             triggerAnimation('karma-badge-1', 'badge-' + (4 - id), 'animate-to', 4 - id, index);
        //         });
        //     } else if (removedKarmas.length > 0) {
        //         removedKarmas.forEach((id, index) => {
        //             console.log(removedKarmas, 'inside');
        //             triggerAnimation('badge-' + (4 - id), 'karma-badge-1', 'animate-back', 4 - id, index);
        //         });
        //     }
        // }, [addedKarmas, removedKarmas, karmaFlag, triggerAnimation]);


        const badges = [badge1, badge2, badge3, badge4, badge5];
        let giving = karmaFlag == 1 ? true : karmaFlag == 0 ? false : "";

        // const [positions, setPositions] = useState({});
        // const [direction,setDirection]=useState(true);
        // useEffect(() => {
        //     const badge1 = document.getElementById(direction?'badge-1':'img-reverse-1').getBoundingClientRect();
        //     const karmaBadge1 = document.getElementById('karma-badge-1').getBoundingClientRect();

        //     const from = direction?karmaBadge1:badge1
        //     const to =  direction?badge1:karmaBadge1

        //     setPositions({
        //         fromX: from.left,
        //         fromY: from.top,
        //         toX: to.left,
        //         toY: to.top
        //     });

        //     const img1 = document.getElementById('img-1');
        //     img1.style.setProperty('--from-x', `${from.left}px`);
        //     img1.style.setProperty('--from-y', `${from.top}px`);
        //     img1.style.setProperty('--to-x', `${to.left}px`);
        //     img1.style.setProperty('--to-y', `${to.top}px`);
        // }, [direction]);





        // const handleButtonClick = () => {
        //     if (isAnimatingTo) {
        //         triggerAnimation('badge-4', 'karma-badge-1', 'animate-to');
        //     } else {
        //         triggerAnimation('karma-badge-1', 'badge-4', 'animate-to');
        //     }
        //     setIsAnimatingTo(!isAnimatingTo);
        // };

        // useEffect(() => {

        //     if(giving){
        //         removedIndexes.forEach((id)=>{
        //             triggerAnimation('badge-'+id, 'karma-badge-1', 'animate-to')
        //         })
        //     }else{
        //         newlyAddedIndexes.forEach((id)=>{
        //             triggerAnimation('karma-badge-1', 'badge-'+id, 'animate-to');
        //         })
        //     }




        // }, []);

        return (
            <div className='r-c-c' style={{
                color: "#44301E", fontWeight: "bolder", width: "100%",
                position: "relative", textAlign: "center", height: '100%',


            }}>
                {giving === true ? <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <div style={{ fontSize: "25px" }} >Well Done!.</div>
                    <div style={{ fontSize: "16px" }}>Here is a karama badge!.</div>
                    <div style={{ position: "relative", left: "0px", width: "90%" }}> <img className='full-img' src={MagunsOpenHand} /> </div>
                    <div style={{ position: 'absolute', width: '6vw', height: '6vw', borderRadius: '100%', right: 15, top: '36%' }} id='karma-badge-1'>
                    </div>
                    {/* <button onClick={handleButtonClick}>click</button> */}
                </div> : giving === false ?
                    <div style={{ height: '100%', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='fallen-text-1'  >Oops! You have fallen back.</div>
                        <div className='fallen-text-2' >I'm taking the karma badges back !.</div>
                        <div style={{ position: "relative", width: "90%" }}> <img className='full-img' src={MagnusTakingBack} />
                            <div style={{ position: 'absolute', width: '60px', height: '60px', borderRadius: '100%', left: '3vw', top: '8%' }} id='karma-badge-1'>
                            </div>
                        </div>

                    </div>
                    : null
                }
            </div>
        );
    }

    const ValueBuddyQuestion = () => {
        const [selectedQa, setSelectedQa] = useState(null);

        return (
            <>
                {questionPart ? <ValueBuddyQuestionGate /> : optionPart ? <ValueBuddyAnswerGate /> :
                    magnusPart ?
                        <MagnusBadges /> :
                        <>
                            <div className='r-c-c-c' style={{ textAlign: "center", position: "relative", height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>


                                <div className="parent-options " style={{ position: 'relative', height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', top: '0' }}>
                                    <div style={{ width: "100%", height: '90%', position: 'absolute', top: '10%' }}>

                                        <img className='full-img' src={leftQuestionBg} alt="Left Question Background" style={{ width: '100%', height: '100%' }} />
                                    </div>
                                    <div style={{ width: "100%", height: '20%', minHeight: '100px', position: 'relative' }}>
                                        <img className='full-img' src={valueBuddiesImg?.[randomIndex]?.withName} alt="Value Buddy"
                                            style={{ maxHeight: 'fit-content', maxWidth: '40%', position: 'absolute', bottom: '0%', left: '50%', transform: 'translate(-50%,0%)', minWidth: '100px', minHeight: '100px', objectFit: 'cover' }} />
                                    </div>
                                    <div className="scroll-bar-universal" style={{ padding: 10, maxHeight: '80%' }}>
                                        <span className="question-text  " style={{}}>
                                            {question?.question}
                                        </span>
                                        <div className='left-panel-options' style={{}}>
                                            {question?.options?.map((option, index) => (
                                                <div
                                                    key={option}
                                                    className='option-text cursor-pointer'
                                                    onClick={() => setSelectedQa(index)}
                                                >
                                                    <div style={{
                                                        color: optionValue?.optionId === index && optionValue?.isCorrect ? 'green' : 'black',
                                                        backgroundColor: selectedQa === index ? "#FFDBAA" : "transparent",
                                                        transform: selectedQa === index ? "scale(1.03)" : "scale(1)",
                                                        transition: "background-color 0.3s, transform 0.3s ease, box-shadow 0.3s ease",
                                                        borderRadius: 10,
                                                        padding: "10px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        position: "relative",
                                                        height: "100%",
                                                        boxShadow: selectedQa === index ? "0 0 8px 2px #52FF00" : "none",
                                                    }}>
                                                        <img
                                                            className='full-img'
                                                            src={answerBG}
                                                            alt="Background"
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                height: '100%',
                                                                width: '100%',
                                                                borderRadius: 10
                                                            }}
                                                        />
                                                        <div
                                                            style={{
                                                                position: 'relative',
                                                                zIndex: 1,
                                                                width: "100%",
                                                                height: "100%",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center"
                                                            }}
                                                        >
                                                            <div style={{ whiteSpace: "normal", textAlign: "center", width: "100%" }}>
                                                                {option}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}


                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='r-c-c done-btn ' style={{ height: '10%' }}>
                                <Button disabled={selectedQa == null} onClick={() => { handleQuestion(selectedQa); }} style={{ position: 'absolute', top: '0%' }}>Submit</Button>
                            </div>
                        </>
                }
            </>
        )
    }

    const ValueBuddyQuestionGate = () => {

        return (
            <div style={{ position: "relative", width: "100%", top: "30%" }}>
                <div style={{ position: "absolute", top: "32%" }} ><img className='full-img' src={positivePath} /></div>
                <div style={{ position: "absolute", width: "45%", left: "56%", top: "120px" }} ><img className='full-img' src={valueBuddiesImg?.[randomIndex]?.happy} /></div>
            </div>
        )
    }
    const ValueBuddyAnswerGate = () => {

        return (
            <div style={{ width: "100%", height: "100dvh" }}>
                <div className='bad-gate-text' style={{ fontSize: '1.5vw' }}>{optionValue?.metaInfo}</div>
                <div className='bad-gate-text-bg' ><img className='full-img' src={answerEmptyBG} />
                </div>
                <div className='' style={{ position: "absolute", top: "32%" }} ><img className='full-img' src={optionValue?.isCorrect ? goodPathGif : badPathGif} /></div>
                <div style={{ position: "absolute", width: "33%", left: "56%", top: "50%" }} ><img className='full-img' src={optionValue?.isCorrect ? valueBuddiesImg?.[randomIndex]?.thumbsUp : valueBuddiesImg?.[randomIndex]?.sad} /></div>
            </div>
        )
    }
    const SuccessFullMessage = () => {
        const [showMagnus, setMagnus] = useState(true);
        useEffect(() => {

            setTimeout(() => {
                setMagnus(false);
                setTimeout(() => {
                    setStep(4)
                }, 2000)

            }, 2000)

        }, [])

        return (
            <div className='r-c-c-c' style={{ width: "100%", height: "100dvh", textAlign: "center" }}>
                {showMagnus ? <>
                    <div className='final-mag-text' style={{ position: "relative", width: "65%", top: "5%" }}>
                        <img className='full-img' src={CustomBox} />
                        <div style={{ position: "absolute", fontSize: "25px", fontWeight: "bold", top: "30%", color: "#FFFFFF", alignItems: "center", left: "20%" }}>Custom Message</div>
                    </div>
                    <div style={{ position: "relative" }}>
                        <img className='full-img' src={MagunsOpenHand} />
                    </div>
                </> : <>
                    <div className='congo-text-1'>Congratulations!
                    </div>
                    <div className='congo-text-2 p-20'>You have reached the end of your Journey.</div>
                </>}

            </div>
        )
    }

    const getModalSubText = (countSelected, correctValueBuddies) => {
        if (countSelected === 0) {
            return "Value buddies that you selected are not correct";
        } else if (countSelected == correctValueBuddies) {
            return "You have selected all your value buddies";
        } else {
            return `You have selected ${countSelected} correct value${countSelected > 1 ? 's' : ''} only ${correctValueBuddies - countSelected} ${correctValueBuddies - countSelected > 1 ? 'are' : 'is'} left`;
        }
    };


    // console.log("coreecttt", selectedItems, countCorrectSelectedItems(), countIndex, countSelected)
    return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <div style={{ height: '100%', width: '100%' }}> <img className="full-img" src={leftPanel} style={{ height: '100%', width: '100%' }} /></div>
            <div className='left-panel-title' style={{}}>{title[gameIntroSteps]}</div>
            {gameIntroSteps == 0 ?
                <div className='left-panel-value-buddies' style={{ height: '80%', width: '100%' }}>
                    <div className="value-buddies-container scroll-bar-universal" style={{}}>
                        {valueBuddiesImg.map((buddy) => (
                            <div key={buddy.id} className="buddy">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.some(selected => selected.id === buddy.id)}
                                        onChange={() => { handleCheckboxChange(buddy) }}
                                        style={{
                                            accentColor: selectedItems.some(selected => selected.id === buddy.id)
                                                ? (isCorrect(buddy.id) ? 'green' : 'red')
                                                : '', cursor: "pointer"
                                        }}
                                    />
                                    <img className="full-img" src={buddy.image} />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                : null}
            {gameIntroSteps == 2 ?
                <div className='left-panel-intros'> <img className="full-img" src={karmaBadgesMeter} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                : null}
            {gameIntroSteps == 3 ?
                <div className='left-panel-intros'> <img className="full-img" src={barometer} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                : null}
            {gameIntroSteps == 4 ? <div style={{ position: "absolute", bottom: "8%", width: "100%", height: '100%', top: 0 }}>

                {isPlayerWin ?
                    <div><SuccessFullMessage /> </div> :
                    <>
                        {isRolled ==true? <ValueBuddyQuestion /> :
                            isRolled ==false?
                            <RollDice
                                diceValue={diceValue}
                                showDiceBtn={showDiceBtn}
                                handleRollDice={handleRollDice}
                                dice={dice}
                                diceRandom={diceRandom}
                            />:null
                        }

                        {/* <MagnusBadges /> */}
                        {/* <SuccessFullMessage /> */}
                    </>




                }
            </div> :
                <div className='r-c-c done-btn' style={{ position: "absolute", width: "100%", height: '20px', top: '90vh' }}>
                    <Button disabled={!isNextEnabled} onClick={handleNext}>
                        NEXT
                    </Button>
                </div>
            }

            {gameIntroSteps == 1 ?
                <div className='left-panel-intros scroll-bar-universal' style={{}} >
                    {tokenCard?.map((item) => (
                        <div className="m-b-20" >
                            <img className='full-img' src={item?.card} />
                        </div>
                    ))}
                </div>
                : null}

            {isOpenModal &&
                <GamePlayModals
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    title={gameIntroSteps == 4 ? modalTitle[3] : modalTitle[countIndex]}
                    subText={gameIntroSteps == 4 ? null : getModalSubText(countSelected, correctValueBuddies?.length)}
                    btnText={modalBtnText[countIndex]}
                    triggerValue={gameIntroSteps}
                    setTriggerFunction={setGameIntroSteps}
                    isNextActive={countIndex == 2 && gameIntroSteps <= 1 ? true : false}
                    setShowDiceBtn={setShowDiceBtn}
                    runTimer={runTimer}
                    setRemainingTime={setRemainingTime}
                    gameIntroSteps={gameIntroSteps}
                    fetchGameState={fetchGameState}
                    countSelected={countSelected}
                    correctValueBuddies={correctValueBuddies}
                />}
            {chooseValueModal &&
                <ChooseCorrectValue chooseValueModal={chooseValueModal} setChooseValueModal={setChooseValueModal} correctValueBuddies={correctValueBuddies} />
            }
        </div>
    )
}

const mapStateToProps = state => {
    const { tokenCard, valueBuddiesImg, correctValueBuddies, gameIntroSteps, dice, showDiceBtn, valueBuddiesArray, chooseValueModal } = state?.SeTu;
    return { tokenCard, valueBuddiesImg, correctValueBuddies, gameIntroSteps, dice, showDiceBtn, valueBuddiesArray, chooseValueModal }
}


const mapDispatchToProps = dispatch => ({
    setGameIntroSteps: (val) => dispatch(setGameIntroSteps(val)),
    setChooseValueModal: (val) => dispatch(setChooseValueModal(val)),
    selectValueBuddies: (successCallBack, callBack) => dispatch(selectValueBuddies(successCallBack, callBack)),
    handleRestart: () => dispatch(handleRestart()),
    setRemainingTime: (val) => dispatch(setRemainingTime(val)),
    fetchGameState: (successCallBack, callBack) => dispatch(fetchGameState(successCallBack, callBack)),
    setStep: (val) => dispatch(setStep(val))

})

export default memo(connect(mapStateToProps, mapDispatchToProps)(LeftSidePanel))
