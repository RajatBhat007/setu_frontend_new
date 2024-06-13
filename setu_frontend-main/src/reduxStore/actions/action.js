import ApiClass from '../../services/Api';
export const LOGIN = "LOGIN";
export const SET_ORGANISATION = "SET_ORGANISATION";
export const SET_IS_OTP_SENT = "SET_IS_OTP_SENT";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const PREV_URL = "PREV_URL";
export const STEP = "STEP";
export const SET_OTP_VERIFIED = "SET_OTP_VERIFIED";
export const SET_INTRO_STEPS = "SET_INTRO_STEPS";
export const SET_GAME_INTRO_STEPS = "SET_GAME_INTRO_STEPS";
export const SET_GAME_ID = "SET_GAME_ID";
export const SET_SHOW_DICE_BTN = "SET_SHOW_DICE_BTN";
export const SET_GAME_STATE = "SET_GAME_STATE";
export const SET_VALUE_BUDDY_CHOOSEN = "SET_VALUE_BUDDY_CHOOSEN";
export const STORE_SELECTED_TOKEN = "STORE_SELECTED_TOKEN";
export const SET_CORRECT_VALUE_BUDDIES = "SET_CORRECT_VALUE_BUDDIES";
export const SET_TOKENS = "SET_TOKENS";
export const SET_GATE_POSITIONS = "SET_GATE_POSITIONS"
export const SET_TIMER = "SET_TIMER";
export const SET_PAUSE_GAME = "SET_PAUSE_GAME"
export const SET_REMAINING_TIME = "SET_REMAINING_TIME";
export const SET_TIMER_ID = "SET_TIMER_ID";
export const ADD_INTERVAL = 'ADD_INTERVAL';
export const CLEAR_ALL_INTERVALS = 'CLEAR_ALL_INTERVALS';
export const CHOOSE_VALUE_BUDDY_MODAL = "CHOOSE_VALUE_BUDDY_MODAL";
export const SET_FEEDBACK_QUESTIONS = "SET_FEEDBACK_QUESTIONS";
export const SET_POLL_QUESTIONS = "SET_POLL_QUESTIONS";
export const PLAY_AUDIO = "PLAY_AUDIO";

export const setLogin = (val) => ({
  type: LOGIN,
  val
})

export const setOrganisation = (val) => ({
  type: SET_ORGANISATION,
  val
})


export const setIsOtpSent = (val) => ({
  type: SET_IS_OTP_SENT,
  val
})

export const setOtpVerified = (val) => ({
  type: SET_OTP_VERIFIED,
  val
})
export const setUserInfo = (val) => ({
  type: SET_USER_INFO,
  val
})

export const setUserDetails = (val) => ({
  type: SET_USER_DETAILS,
  val
})
export const setPrevUrl = (val) => ({
  type: PREV_URL,
  val
})

export const setStep = (val) => ({
  type: STEP,
  val
})

export const setIntroSteps = (val) => ({
  type: SET_INTRO_STEPS,
  val
})
export const setGameIntroSteps = (val) => ({
  type: SET_GAME_INTRO_STEPS,
  val
})

export const setGameId = (val) => ({
  type: SET_GAME_ID,
  val
})

export const setShowDiceBtn = (val) => ({
  type: SET_SHOW_DICE_BTN,
  val
})
export const setGameState = (val) => ({
  type: SET_GAME_STATE,
  val
})
export const setCorrectValueBuddies = (val) => ({
  type: SET_CORRECT_VALUE_BUDDIES,
  val
})

export const setTokens = (val) => ({
  type: SET_TOKENS,
  val
})
export const setGatePositions = (val) => ({
  type: SET_GATE_POSITIONS,
  val
})


export const setValueBuddyChoosen = (val) => ({
  type: SET_VALUE_BUDDY_CHOOSEN,
  val
})

export const setTimer = (val) => ({
  type: SET_TIMER,
  val
})

export const pauseGame = (val) => ({
  type: SET_PAUSE_GAME,
  val
})

export const setRemainingTime = (val) => ({
  type: SET_REMAINING_TIME,
  val
})

export const setTimerId = (val) => ({
  type: SET_TIMER_ID,
  val
})

export const addInterval = (val) => ({
  type: ADD_INTERVAL,
  val
});

export const clearAllIntervals = () => ({
  type: CLEAR_ALL_INTERVALS
});

export const setChooseValueModal = (val) => ({
  type: CHOOSE_VALUE_BUDDY_MODAL,
  val
})


export const setFeedbackQuestions = (val) => ({
  type: SET_FEEDBACK_QUESTIONS,
  val
})



export const setPollQuestions = (val) => ({
  type: SET_POLL_QUESTIONS,
  val
})


export const playAudio = (val) => ({
  type: PLAY_AUDIO,
  val
})
export const handleRestart = () => (dispatch, getState) => {
  dispatch(setGameState())
  dispatch(setGameId())
  dispatch(setGameIntroSteps(0))
  dispatch(setStep(-1))
  dispatch(setValueBuddyChoosen(false))
  dispatch(setShowDiceBtn(true))
}

export const register = (param, successCallback, callback) => (dispatch, getState) => {
  const userInfo = getState().SeTu?.userInfo;
  const suborganisationId = getState()?.SeTu?.organisation?.id
  console.log('from register', param)
  userInfo['otp'] = param.otp;
  userInfo['suborganisationId'] = suborganisationId;
  ApiClass.post("/user/register").params(userInfo).send((response, err) => {

    if (response) {
      dispatch(setIsOtpSent())
      dispatch(setUserInfo())
      successCallback()

    } else {
      callback()
    }

  });
};

export const resendOtp = (successCallback) => (dispatch, getState) => {
  const uniqueId = getState()?.SeTu?.userInfo?.uniqueId;
  const newUser = getState()?.SeTu?.userInfo?.hasOwnProperty("name");
  const orgId = getState().SeTu?.organisation?.id;
  ApiClass.post("/user/sendOTP").params({ uniqueId, newUser: newUser == true, orgId }).send((response, err) => {
    console.log('from action', response, err)
    if (err) {
      dispatch(setIsOtpSent())
    }

    if (response) {
      dispatch(setIsOtpSent({ otpSent: true, timer: 30 }))
      successCallback()
    }

  });
};

export const sendOtp = (params, successCallback) => (dispatch, getState) => {

  const orgId = getState().SeTu?.organisation?.id;
  const payload = {
    orgId,
    uniqueId: params?.uniqueId,
    newUser: params?.newUser
  }

  ApiClass.post("/user/sendOTP").params(payload).send((response, err) => {
    console.log('from action', response, err)
    if (err) {
      dispatch(setIsOtpSent())
      return
    }

    if (response) {
      dispatch(setIsOtpSent({ otpSent: true, timer: 30 }))
      dispatch(setUserInfo(params))
      successCallback()
    }

  });
};

export const verifyOtp = (params, successCallback) => (dispatch, getState) => {
  const uniqueId = getState().SeTu?.userInfo?.uniqueId;
  params['uniqueId'] = uniqueId;
  const suborgId = getState().SeTu?.organisation?.id;
  params["suborgId"] = suborgId;

  ApiClass.post("/user/verifyOTP").params(params).send((response, err) => {
    console.log('from action', response, err)

    if (response) {
      dispatch(setIsOtpSent())
      dispatch(setOtpVerified(true))
      successCallback()
    }

  });
};

export const login = (params, successCallback) => (dispatch, getState) => {
  const suborgId = getState().SeTu?.organisation?.id;
  params["suborgId"] = suborgId;
  ApiClass.post("/user/login").params(params).send((response, err) => {


    if (response) {

      dispatch(setLogin(response?.token))
      ApiClass.header(response?.token)
      successCallback()
    }

  });
};

export const checkOrganisation = (params, successCallback, callback) => (dispatch, getState) => {

  const { id } = params;

  ApiClass.get(`/suborganisation/check?id=${id}`).send((response, err) => {

    if (err) {

      callback()
      return
    }
    if (response) {

      dispatch(setOrganisation(response))

      successCallback()


    }



  });
};


export const checkUserName = (params, successCallback, callback) => (dispatch, getState) => {

  ApiClass.get(`/user/checkUserName/${params.username}`).send((response, err) => {


    if (response) {
      successCallback(response.exists)
    } else {
      callback(err)
    }


  });
};

export const updatePassword = (params, successCallback) => (dispatch, getState) => {
  const uniqueId = getState().SeTu?.userInfo?.uniqueId;
  params['uniqueId'] = uniqueId;
  const suborgId = getState().SeTu?.organisation?.id;
  params["suborgId"] = suborgId;
  ApiClass.patch("/user/updatePassword").params(params).send((response, err) => {

    if (response) {
      dispatch(setIsOtpSent())
      dispatch(setOtpVerified())
      dispatch(setUserInfo())
      successCallback()
    }

  });
};



export const overView = (successCallback, callback) => (dispatch, getState) => {

  ApiClass.get(`/user/overview`).send((response, err) => {

    if (err) {

      callback()
      return
    }
    if (response) {
      dispatch(setStep(response?.step))
      dispatch(setCorrectValueBuddies(response?.correctValueBuddies))
      dispatch(setTokens(response?.tokens))

      dispatch(setGatePositions(response?.gatePositions))
      dispatch(setUserDetails({ name: response?.name, username: response?.username, email: response?.email, phone: response?.phone, city: response?.city }))
      successCallback(response?.step)

      if(response?.valueBuddies){
        getState().SeTu.valueBuddiesImg=getState().SeTu?.valueBuddiesImg?.map((ele,index)=>{
          return {
            ...ele,
            name:response?.valueBuddies[index]

          }
        })
      }
      if(response?.tokens){
        
        getState().SeTu.selectTokens=getState().SeTu?.selectTokens?.map((ele,index)=>{
          return {
            ...ele,
            name:response?.tokens[index]

          }
        })
      }

    }



  });
};

export const fetchGameState = (successCallback, callback) => (dispatch, getState) => {

  ApiClass.get(`/game/get-data`).send((response, err) => {
    console.log('from action==>', response, err)
    if (err) {

      callback()
      return
    }
    if (response) {
      if (response.gameState) {
        dispatch(setGameState(response.gameState))

        dispatch(setGameId(response.gameState?.GameId))

        dispatch(setStep(response?.gameState?.step))

        dispatch(setValueBuddyChoosen(response?.gameState?.isValueBuddySelected))
        if (response?.gameState?.isValueBuddySelected) {

          dispatch(setGameIntroSteps(4));
        }
     
      }
      if (response.step) {
        dispatch(setStep(response?.step));
        dispatch(setGameId())
        dispatch(setGameState())
        dispatch(setGameIntroSteps(0));
        dispatch(setValueBuddyChoosen(false))
      }

      successCallback()


    }



  });

};

export const gameStart = (successCallback, callback) => (dispatch, getState) => {

  ApiClass.post(`/game/start`).send((response, err) => {


    if (response?.gameId) {
      dispatch(setGameId(response.gameId))
      setRemainingTime(1)
      successCallback()
    } else {
      callback()
    }


  });
};

export const setGameType = (successCallback, callback) => (dispatch, getState) => {

  const gameId = getState().SeTu?.gameId
  ApiClass.post(`/game/set-gametype`).params({ gameType: 'single', gameId }).send((response, err) => {

    if (response) {
      successCallback()
    } else {
      callback()
    }


  });
}


export const selectToken = (params, successCallback, callback) => (dispatch, getState) => {

  const gameId = getState().SeTu?.gameId
  params['gameId'] = gameId;
  ApiClass.post(`/game/select-token`).params(params).send((response, err) => {

    if (response) {
      successCallback()
    } else {
      callback()
    }


  });
}



export const selectValueBuddies = (successCallback, callback) => (dispatch, getState) => {

  const gameId = getState().SeTu?.gameId;

  ApiClass.post(`/game/valuebuddy-check`).params({ gameId }).send((response, err) => {

    if (response) {
      successCallback()
    } else {
      callback()
    }


  });
}

export const getFeedbackQuestions = (successCallback, callback) => (dispatch, getState) => {

  const suborgId = getState().SeTu?.organisation?.id;
  const learningCardData = getState().SeTu?.learningCardData

  ApiClass.get(`/feedback/questions`).params({ suborgId }).send((response, err) => {

    if (response) {

      for (let i = 0; i < response?.length; i++) {
        learningCardData[i] = {
          ...learningCardData[i],
          id: response[i].id,
          question: response[i].question,
        }
      }
      dispatch(setFeedbackQuestions(learningCardData))

      successCallback()
    } else {
      callback()
    }


  });
}




export const saveFeedback = (params, successCallback, callback) => (dispatch, getState) => {

  const suborgId = getState().SeTu?.organisation?.id;
  const gameId = getState().SeTu?.gameId;
  params['suborgId'] = suborgId
  params['gameId'] = gameId
  ApiClass.post(`/feedback/saveResponse`).params(params).send((response, err) => {

    if (response) {

      successCallback()
    } else {
      callback()
    }


  });
}

export const getPollQuestions = (successCallback, callback) => (dispatch, getState) => {

  const suborgId = getState().SeTu?.organisation?.id

  ApiClass.get(`/poll/questions`).params({ suborgId }).send((response, err) => {

    if (response) {
      console.log("res", response)
      dispatch(setPollQuestions(response))
      successCallback()
    } else {
      callback()
    }


  });
}

export const savePoll = (params, successCallback, callback) => (dispatch, getState) => {

  const suborgId = getState().SeTu?.organisation?.id;
  const gameId = getState().SeTu?.gameId;
  params['suborgId'] = suborgId
  params['gameId'] = gameId
  ApiClass.post(`/poll/saveResponse`).params(params).send((response, err) => {

    if (response) {

      successCallback()
    } else {
      callback()
    }


  });
}


export const endGame = (successCallback, callback) => (dispatch, getState) => {

  const gameId = getState().SeTu?.gameId;

  ApiClass.post(`/game/end-game`).params({ gameId }).send((response, err) => {

    if (response) {
       dispatch( setStep(-2))
      successCallback()
    } else {
      callback()
    }


  });
}
