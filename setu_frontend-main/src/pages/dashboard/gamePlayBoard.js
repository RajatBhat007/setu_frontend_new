import React, { useState, useEffect, memo } from 'react'
import GamePlayModals from './gamePlayModals'
import GameBoard from './gameBoard'


import setuLogo from "../../assets/gameBoard/setu-white.png"
import { connect } from 'react-redux'
import tokenBG from "../../assets/selectTokens/Tokens BG.png"
import background from "../../assets/gameBoard/Background-2.png"
import LeftSidePanel from './leftSidePanel'
import { setGameIntroSteps, setShowDiceBtn, setRemainingTime, setTimerId, addInterval, clearAllIntervals } from '../../reduxStore/actions/action'


function GamePlayBoard({ isOpenModal, setIsOpenModal, selectTokens, setGameIntroSteps, gameIntroSteps,
    correctValueBuddies, isValueBuddySelected, gameId, setShowDiceBtn, auth, valueBuddiesImg, isGamePaused,
    setRemainingTime, remainingTime, addInterval, clearAllIntervals, showDiceBtn, socket }) {

    const CorrectValueBuddies = () => {
        return (
            <div className='correct-value-buddies' >
                {correctValueBuddies?.map(id => (
                    <div key={id} className="buddy">
                        <img className="full-img" src={valueBuddiesImg?.[id - 1]?.image} alt='value-buddy' />
                    </div>
                ))}
            </div>
        )
    }

    const [diceValue, setDiceValue] = useState();
    const [lastReachedPosition, setLastReachedPosition] = useState();
    const [question, setQuestion] = useState();
    const [optionValue, setOptionValue] = useState();
    // const [selectedOption, setSelectedOption] = useState();
    const [noOfKarmas, setNoOfKarmas] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [time, setTime] = useState('0:000');
    const [karmaFlag, setKarmaFlag] = useState();
    const [from, setFrom] = useState()
    const [addedKarmas, setAddedKarmas] = useState([]);
    const [removedKarmas, setRemovedKarmas] = useState([])
    const [closeModal, setCloseModal] = useState(false)
    const [randomIndex, setRandomIndex] = useState();
    const [diceRandom, setDiceRandom] = useState();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false)

    const diceTime = [2700, 4100, 3000, 2600, 3000, 2150]
    const tokenMoveTime = [1100, 1100, 1150, 1100, 1150, 1150]

    const handleQuestion = (selectedOption) => {
        clearAllIntervals()
        setRemainingTime(1);
        setDiceValue()
        socket.emit('join-game', { gameId });
        setOptionValue()
        setKarmaFlag();
        setQuestion();
        setShowDiceBtn(false);
        // setSelectedOption(null);
        socket.emit('handle-valuebuddy-question', { gameId, questionId: question?.id, selectedOption: selectedOption });

    };
    // useEffect(() => { setSelectedOption(null) }, [])
    const handleRollDice = () => {
        setShowDiceBtn(false);
        clearAllIntervals()
        setDiceValue()
        setRemainingTime(1);
        setOptionValue()
        setKarmaFlag();
        setQuestion();
        console.log('game id', gameId);
        socket.emit('join-game', { gameId });
        setTimeout(() => {
            socket.emit('roll-dice', { gameId });
        }, 500)


        console.log('dice rolled')
    };
    const runTimer = () => {
        clearAllIntervals()
        if (question || optionValue || karmaFlag != null || isAnimating)
            return

        let i = remainingTime;
        let id = setInterval(() => {
            console.log("insde the timer with remaining time:", remainingTime)
            console.log("inside timer", i, id)

            const timeString = "0:" + (i < 10 ? `00${i}` : `0${i}`)
            setTime(timeString)
            if (i >= 15) {
                clearInterval(id)
                handleRollDice();

                return
            }
            i++;
            setRemainingTime(i);

        }, 1000);
        addInterval(id)
    }

    const stopTimer = () => {

        clearAllIntervals()

    }


    useEffect(() => {
        if (remainingTime) {
            setRemainingTime(remainingTime);
        } else {
            setRemainingTime(1);
        }

        stopTimer()
    }, [])




    useEffect(() => {
        const handleDiceRoll = ({
            gameId: responseGameId,
            from: from,
            diceResult: responseDiceResult,
            lastReachedPosition: lastReachedPosition,
            question: question,
            choosenOptionResult: choosenOptionResult,
            noOfKarmas: noOfKarmas,
            totalScore: totalScore,
            karmaFlag: karmaFlag,
            refreshed: refreshed,
            addedKarmas: addedKarmas,
            removedKarmas: removedKarmas
        }) => {
            console.log("from:", from, ' to:', lastReachedPosition)
            console.log("response", responseDiceResult, responseGameId, lastReachedPosition, question, choosenOptionResult, "noOfKarmas:", noOfKarmas,
                totalScore, "karmaflag", karmaFlag, refreshed, "added karmas", addedKarmas, "removed", removedKarmas)
            if (gameId === responseGameId) {
                if(lastReachedPosition>=100){
                    lastReachedPosition=100;
                }
                if(from>=100){
                    from=100;
                }
            
             if(!question){
                 sessionStorage.setItem('gateReached',false);
                    }
                
                setQuestion();
                setKarmaFlag(null)
                setIsAnimating(true);
                setDiceRandom(Math.random())
                clearAllIntervals();
                if (question && correctValueBuddies?.length) {
                    if (!choosenOptionResult) {
                        const index = (question.id) % (correctValueBuddies?.length)
                        setRandomIndex(correctValueBuddies[index] - 1);
                    }
                }

                if (refreshed) {
                    console.log("remaing time after", remainingTime)
                    setFrom(from)
                    setDiceValue(responseDiceResult);
                    setLastReachedPosition(lastReachedPosition)
                    setTotalScore(totalScore);
                    setKarmaFlag(karmaFlag);
                    setNoOfKarmas(noOfKarmas);
                    setQuestion(question);
                    setOptionValue(choosenOptionResult);
                    setShowDiceBtn(true);
                    setAddedKarmas(addedKarmas)
                    setRemovedKarmas(removedKarmas)
                    setIsAnimating(false);
                    if (!question && lastReachedPosition < 100 && gameIntroSteps == 4) {

                        clearAllIntervals();
                        runTimer()

                    } else {
                        setRemainingTime(1)

                    }

                    if (lastReachedPosition >= 100 && !question && karmaFlag == null) {
                        setShowDiceBtn(false);
                        setIsGameOver(true)
                    }


                } else {

                    setDiceValue(responseDiceResult);


                    if (choosenOptionResult) {

                        setOptionValue(choosenOptionResult);
                        setTotalScore(totalScore);
                        setKarmaFlag(karmaFlag);
                        setAddedKarmas(addedKarmas)
                        setRemovedKarmas(removedKarmas)
                        setFrom(from)
                        setLastReachedPosition(lastReachedPosition)
                        setTimeout(() => {
                            setFrom(lastReachedPosition)

                        }, 1200)
                      setTimeout(()=>{
                        setNoOfKarmas(noOfKarmas);
                      },karmaFlag ==1 ? 5000 : 3600)

                        setTimeout(() => {

                            
                            if (question) {
                                const index = (question.id) % (correctValueBuddies?.length)
                                setRandomIndex(correctValueBuddies[index] - 1);
                            }
                            setKarmaFlag(null)
                            setQuestion(question);

                        }, karmaFlag != null ? 5000 : 3600)



                        setTimeout(() => {

                            // setAddedKarmas([])
                            // setRemovedKarmas([])
                            setTime("0:000")
                            setDiceValue();
                            setRemainingTime(1)
                            clearAllIntervals();
                            setIsAnimating(false);
                            setOptionValue()

                            if (!question && lastReachedPosition < 100 && gameIntroSteps == 4) {
                                if (karmaFlag != null) {
                                    clearAllIntervals();

                                    setRemainingTime(1)
                                    setTimeout(() => {
                                        setShowDiceBtn(true);
                                        runTimer();
                                    }, 1500)
                                }
                                else {

                                    clearAllIntervals();
                                    setRemainingTime(1);
                                    setShowDiceBtn(true);
                                    runTimer();
                                }


                            }
                            if (lastReachedPosition >= 100 && !question && karmaFlag == null) {
                                setShowDiceBtn(false);
                                setIsGameOver(true)
                            }else if (lastReachedPosition >= 100 && !question && karmaFlag !== null) {
                                setTimeout(()=>{
                                    setShowDiceBtn(false);
                                    setIsGameOver(true)
                                },2000)
                              
                            }
                            // setFrom(lastReachedPosition)
                        }, karmaFlag != null || question ? 5200 : 3500)
                    }
                    else {
                        console.log('came here============>1')
                        setTimeout(() => {
                            setFrom(from)
                            setLastReachedPosition(lastReachedPosition)
                            setTotalScore(totalScore);
                            setTimeout(() => {
                                setFrom(lastReachedPosition)
                            }, tokenMoveTime[responseDiceResult - 1])
                            console.log('came here============>2', new Date().getTime())

                        }, diceTime[responseDiceResult - 1])



                        setTimeout(() => {
                            //  setFrom(lastReachedPosition)
                            setKarmaFlag(karmaFlag);
                            setAddedKarmas(addedKarmas)
                            setRemovedKarmas(removedKarmas)
                            setQuestion(question);
                        

                            setTime("0:000")
                            setTimeout(() => {
                                setKarmaFlag(null)
                                setNoOfKarmas(noOfKarmas);
                              
                            }, 2000)

                            console.log('came here============>3', new Date().getTime(), question, gameIntroSteps)
                            setRemainingTime(1)
                            clearAllIntervals();
                            setIsAnimating(false);
                            setDiceValue()
                            if (!question && lastReachedPosition < 100 && gameIntroSteps == 4) {
                                console.log('came here============>4')
                                if (karmaFlag != null) {
                                    clearAllIntervals();
                                    console.log('came here============>5.1', new Date().getTime())
                                    setTimeout(() => {
                                        setShowDiceBtn(true)
                                        runTimer();
                                    }, 2000)
                                }
                                else {

                                    clearAllIntervals();
                                    setTimeout(() => {
                                        setShowDiceBtn(true)
                                        runTimer();
                                    }, 500)
                                    console.log('came here============>5.2', new Date().getTime())
                                }



                            } else {

                                if (lastReachedPosition >= 100 && !question && karmaFlag == null) {
                                    setShowDiceBtn(false);
                                    setIsGameOver(true)
                                }else if (lastReachedPosition >= 100 && !question && karmaFlag !== null) {
                                    setTimeout(()=>{
                                        setShowDiceBtn(false);
                                        setIsGameOver(true)
                                    },2000)
                                  
                                }

                            }


                        }, diceTime[responseDiceResult - 1] + 1200)

                        setTimeout(() => {
                            console.log('came here============>6', new Date().getTime())

                            setFrom(lastReachedPosition)
                            setRemainingTime(1)
                            setAddedKarmas([])
                            setRemovedKarmas([])

                        }, diceTime[responseDiceResult - 1] + 3500)
                    }
                }

            }

        };

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.emit('join-game', { gameId })

        socket.on('dice-rolled', handleDiceRoll);

        socket.on('disconnect', (reason) => {
            console.log('Disconnected from server:', reason);
            if (reason === 'io server disconnect') {
                socket.connect();
            }
        });
        return () => {
            socket.off('dice-rolled', handleDiceRoll);

            // socket.disconnect();

        };
    }, [gameId, socket, gameIntroSteps, isGamePaused, remainingTime, showDiceBtn]);


    useEffect(() => {

        if (isGamePaused != undefined) {
            console.log('show dice', showDiceBtn, question, optionValue, karmaFlag)
            if (isGamePaused) {
                clearAllIntervals();
                console.log("remaing time before", remainingTime)
            }

            else if (isGamePaused == false && gameIntroSteps == 4) {

                socket.emit('fetch-game-state', { gameId })

            }
        }
    }, [isGamePaused])














    /// token animation 




    return (
        <div style={{ width: "100%", height: "100%", }}>

            <div className="game-intro-part" style={{ }}>
                <LeftSidePanel handleRollDice={handleRollDice}
                    setShowDiceBtn={setShowDiceBtn}
                    diceValue={diceValue}
                    question={question}
                    handleQuestion={handleQuestion}
                    optionValue={optionValue}
                    lastReachedPosition={lastReachedPosition}
                    totalScore={totalScore}
                    noOfKarmas={noOfKarmas}
                    karmaFlag={karmaFlag}
                    randomIndex={randomIndex}
                    runTimer={runTimer}
                    setOptionValue={setOptionValue}
                    addedKarmas={addedKarmas}
                    removedKarmas={removedKarmas}
                    setAddedKarmas={setAddedKarmas}
                    setRemovedKarmas={setRemovedKarmas}
                    diceRandom={diceRandom}
                    isGameOver={isGameOver}


                />
            </div>
            <div className='r-c-c-c game-board-part' style={{ width: '71%', height: '100%', display: 'flex', flexDirection: 'column', padding: '5% 2%', background: `url(${background}) no-repeat center`, backgroundSize: '100% 100%' }}>

                {/* <div className='' style={{ width: "100%", height: "5%", display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div className='learning' style={{ width: '20%', display: "flex", justifyContent: 'center', alignItems: 'center' }} ><img src={Learning} style={{ width: '25%', height: "25%" }} /></div>

                    <div className="company-logo" style={{ width: '20%', display: "flex", justifyContent: 'center', alignItems: 'center' }}><img src={TgcLogo} style={{ width: '100%', height: "100%" }} /></div>

                    <div style={{ color: 'black', width: '20%', display: "flex", justifyContent: 'center', alignItems: 'center' }}>

                    </div>
                </div> */}

                <div className='' style={{
                    width: "100%", height: "95%",

                }} >
                    <GameBoard lastReachedPosition={lastReachedPosition} noOfKarmas={noOfKarmas}
                        totalScore={totalScore} time={time} from={from} setFrom={setFrom}
                        karamFlag={karmaFlag} setDiceValue={setDiceValue} diceValue={diceValue}

                    />
                </div>
                <div className='bottom-part-game' style={{ marginTop: '2px' }}>
                    {gameIntroSteps == 1 || gameIntroSteps > 0 ?
                        <CorrectValueBuddies />
                        : <div></div>}
                    {gameIntroSteps == 1 || gameIntroSteps > 0 ?
                        <div className="token-parent" style={{ height: '100%', width: "60%" }}>

                            <div className='r-c-c' style={{ width: "100%", height: '100%' }}>
                                <img style={{ position: 'absolute', zIndex: 80, width: '26%' }} src={tokenBG} />
                                {selectTokens?.map(token => (
                                    <div key={token.id} className='token-resize-1 r-c-c-c' style={{ zIndex: 81, position: 'relative' }}>
                                        <img className='full-img' src={token.image} />
                                        <span style={{ color: token.color }}>{token.name}</span>
                                        <div className='animate' id={`start-${token.id}`} style={{ position: 'absolute' }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        : <div style={{ width: "60%" }}></div>}
                    <div className="setu-logo-parent" style={{ height: '100%', width: '20%' }} ><img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={setuLogo} /></div>
                </div>
            </div>



            {isOpenModal &&
                <GamePlayModals
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    title={"Choose the 3 correct value buddies!"}
                    btnText={"OK"}
                />}
        </div>
    )
}



const mapStateToProps = state => {
    const { selectTokens, gameIntroSteps, correctValueBuddies, isValueBuddySelected, gameId, auth,
        valueBuddiesImg, isGamePaused, remainingTime, timerId, showDiceBtn } = state?.SeTu;
    return {
        selectTokens, gameIntroSteps, correctValueBuddies, isValueBuddySelected,
        gameId, auth, valueBuddiesImg, isGamePaused, remainingTime, timerId, showDiceBtn
    }
}


const mapDispatchToProps = dispatch => ({
    setGameIntroSteps: (val) => dispatch(setGameIntroSteps(val)),
    setShowDiceBtn: (val) => dispatch(setShowDiceBtn(val)),
    setRemainingTime: (val) => dispatch(setRemainingTime(val)),
    setTimerId: (val) => dispatch(setTimerId(val)),
    addInterval: (val) => dispatch(addInterval(val)),
    clearAllIntervals: () => dispatch(clearAllIntervals())
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayBoard)