import {
  LOGIN, SET_ORGANISATION, SET_IS_OTP_SENT,
  SET_USER_INFO, PREV_URL, STEP, SET_OTP_VERIFIED,
  SET_INTRO_STEPS, SET_GAME_INTRO_STEPS,
  SET_GAME_ID, SET_SHOW_DICE_BTN, SET_GAME_STATE,
  SET_VALUE_BUDDY_CHOOSEN, SET_CORRECT_VALUE_BUDDIES,
  SET_TOKENS, SET_GATE_POSITIONS, SET_TIMER, SET_PAUSE_GAME, SET_REMAINING_TIME,
  SET_TIMER_ID, ADD_INTERVAL, CLEAR_ALL_INTERVALS,
  CHOOSE_VALUE_BUDDY_MODAL,
  SET_FEEDBACK_QUESTIONS,
  SET_POLL_QUESTIONS,
  SET_USER_DETAILS,
  PLAY_AUDIO

} from "../actions/action";
import tickmark from '../../assets/tickmark.png'
import Magnus1 from "../../assets/magnus-intro/magnus-p-l-1.svg"
import MagnusOpenHand from "../../assets/magnus-intro/new magnus1magnus-2-p-r-2.svg"
import textRight1 from "../../assets/magnus-intro/p-r-1-text.svg"
import textRight2 from "../../assets/magnus-intro/p-r-2-text.svg"
import textRight3 from "../../assets/magnus-intro/p-r-3-text.svg"

import magnusRight from "../../assets/magnus-intro/magnus-right-1.svg"
import textLeft from "../../assets/magnus-intro/text-4-left.svg"
import textCenter from "../../assets/magnus-intro/text-5-center.svg"
import gameBoard1 from "../../assets/magnus-intro/game-board-1.svg"

import tokenAir from "../../assets/magnus-intro/Air.svg"
import tokenearth from "../../assets/magnus-intro/Earth.svg"
import tokenfire from "../../assets/magnus-intro/fire.svg"
import tokenwater from "../../assets/magnus-intro/Water.svg"

import magnus4 from "../../assets/magnus-intro/magnus4-right.svg"
import magnus5 from "../../assets/magnus-intro/magnus-5-right.svg"
import badges from "../../assets/magnus-intro/Badges 1badges.svg"
import badgesText from "../../assets/magnus-intro/badges-text.svg"
import barometerText from "../../assets/magnus-intro/barometerText.svg"
import barometer from "../../assets/magnus-intro/Barometer 1.svg"
import crossBoardImg from "../../assets/magnus-intro/crossBoard-1.svg"
import crossBoardText from "../../assets/magnus-intro/crossroad-text.svg"

import valueBuddies from "../../assets/magnus-intro/value-buddies-grp.svg"
import valueBuddiesText from "../../assets/magnus-intro/valueBuddiesText.svg"
import gate1Text from "../../assets/magnus-intro/Bubble with text 2.svg"
import gate1 from "../../assets/magnus-intro/gate-1.svg"

import background1 from "../../assets/magnus-intro/intro-qa-bg.png"
import background2 from "../../assets/magnus-intro/client-background-inside.svg"
import clientGirl from "../../assets/magnus-intro/client centricity girl 2.svg"
import clientGirlSad from "../../assets/magnus-intro/client certicity_wrong choice 1sadClinet.png"
import reqCard1 from "../../assets/magnus-intro/Right answerreq-cards-1.svg"
import reqCard2 from "../../assets/magnus-intro/Right answerreq-cards-2.svg"
import reqCard3 from "../../assets/magnus-intro/Right answerreq-cards-3.svg"
import reqCard4 from "../../assets/magnus-intro/Wrong answerreq-cards-4.svg"
import clientText from "../../assets/magnus-intro/client-req-text.svg"
import clientText2 from "../../assets/magnus-intro/Bubble with text 3.svg"
import clientText3 from "../../assets/magnus-intro/Bubble with text 1.svg"
import wrongGateChoice from "../../assets/magnus-intro/Wrong choice 1.svg"
import learningCard from "../../assets/magnus-intro/FINAL LEARNING CARD 1.svg"
import learningText from "../../assets/magnus-intro/Group 36729learning-text-12.svg"


import waterIc from "../../assets/selectTokens/Water.png"
import fireIc from "../../assets/selectTokens/Fire.png"
import eartIc from "../../assets/selectTokens/Earth.png"
import airIc from "../../assets/selectTokens/Air.png"

import vb1 from "../../assets/valuebuddies/accountability (1).png"
import vb2 from "../../assets/valuebuddies/achieve.png"
import vb3 from "../../assets/valuebuddies/adaptability (1).png"
import vb4 from "../../assets/valuebuddies/challenge.png"
import vb5 from "../../assets/valuebuddies/client centricity (2).png"
import vb6 from "../../assets/valuebuddies/collaboration.png"
import vb7 from "../../assets/valuebuddies/Creativity (1).png"
import vb8 from "../../assets/valuebuddies/diversity (1).png"
import vb9 from "../../assets/valuebuddies/EMPATHY.png"
import vb10 from "../../assets/valuebuddies/Engage (1).png"
import vb11 from "../../assets/valuebuddies/Initiative.png"
import vb12 from "../../assets/valuebuddies/intergrity.png"
import vb13 from "../../assets/valuebuddies/leadership.png"
import vb14 from "../../assets/valuebuddies/learn (1).png"
import vb15 from "../../assets/valuebuddies/motivate.png"
import vb16 from "../../assets/valuebuddies/reward.png"

import vbh1 from "../../assets/valuebuddies/happy_buddies/Happy_Accountability.png"
import vbh2 from "../../assets/valuebuddies/happy_buddies/Happy Full_Achieve.png"
import vbh3 from "../../assets/valuebuddies/happy_buddies/Happy full_adaptability.png"
import vbh4 from "../../assets/valuebuddies/happy_buddies/Happy_Challenge.png"
import vbh5 from "../../assets/valuebuddies/happy_buddies/Happy full_client centricity.png"
import vbh6 from "../../assets/valuebuddies/happy_buddies/Happy_Collaboration.png"
import vbh7 from "../../assets/valuebuddies/happy_buddies/Happy full_creativity.png"
import vbh8 from "../../assets/valuebuddies/happy_buddies/Happy_Diversity.png"
import vbh9 from "../../assets/valuebuddies/happy_buddies/Happy_Empathy.png"
import vbh10 from "../../assets/valuebuddies/happy_buddies/Happy full_engage.png"
import vbh11 from "../../assets/valuebuddies/happy_buddies/Happy full_initiative.png"
import vbh12 from "../../assets/valuebuddies/happy_buddies/Happy full_integrity.png"
import vbh13 from "../../assets/valuebuddies/happy_buddies/Happy_Leadership.png"
import vbh14 from "../../assets/valuebuddies/happy_buddies/Happy_learn.png"
import vbh15 from "../../assets/valuebuddies/happy_buddies/Happy _Motivate.png"
import vbh16 from "../../assets/valuebuddies/happy_buddies/happy_reward.png"

import vbs1 from "../../assets/valuebuddies/sad_buddies/Accountability.png"
import vbs2 from "../../assets/valuebuddies/sad_buddies/Achieve.png"
import vbs3 from "../../assets/valuebuddies/sad_buddies/Adaptability.png"
import vbs4 from "../../assets/valuebuddies/sad_buddies/Challenge.png"
import vbs5 from "../../assets/valuebuddies/sad_buddies/Client centericity.png"
import vbs6 from "../../assets/valuebuddies/sad_buddies/Collaboration.png"
import vbs7 from "../../assets/valuebuddies/sad_buddies/Creativity.png"
import vbs8 from "../../assets/valuebuddies/sad_buddies/Diversity.png"
import vbs9 from "../../assets/valuebuddies/sad_buddies/Empathy.png"
import vbs10 from "../../assets/valuebuddies/sad_buddies/Engage.png"
import vbs11 from "../../assets/valuebuddies/sad_buddies/Initiative.png"
import vbs12 from "../../assets/valuebuddies/sad_buddies/Integrity.png"
import vbs13 from "../../assets/valuebuddies/sad_buddies/Leadership.png"
import vbs14 from "../../assets/valuebuddies/sad_buddies/learn_sad.png"
import vbs15 from "../../assets/valuebuddies/sad_buddies/Motivate.png"
import vbs16 from "../../assets/valuebuddies/sad_buddies/Reward.png"

import vbt1 from "../../assets/valuebuddies/thumbs_up_buddies/Happy Full white male_thumbs uo.png"
import vbt2 from "../../assets/valuebuddies/thumbs_up_buddies/Thumbs up_Achieve.png"
import vbt3 from "../../assets/valuebuddies/thumbs_up_buddies/thumbs up_adaptability.png"
import vbt4 from "../../assets/valuebuddies/thumbs_up_buddies/Happy_CH11.png"
import vbt5 from "../../assets/valuebuddies/thumbs_up_buddies/thumbs up_customer centricity.png"
import vbt6 from "../../assets/valuebuddies/thumbs_up_buddies/Happy_CH15_thumbs up.png"
import vbt7 from "../../assets/valuebuddies/thumbs_up_buddies/Thumbsup_creativity.png"
import vbt8 from "../../assets/valuebuddies/thumbs_up_buddies/Happy_CH13_thumbs up.png"
import vbt9 from "../../assets/valuebuddies/thumbs_up_buddies/Happy_CH08 (1)_thumbs up.png"
import vbt10 from "../../assets/valuebuddies/thumbs_up_buddies/Thumbs up_engage.png"
import vbt11 from "../../assets/valuebuddies/thumbs_up_buddies/thumbs up_initiative.png"
import vbt12 from "../../assets/valuebuddies/thumbs_up_buddies/integrity_thumbs up.png"
import vbt13 from "../../assets/valuebuddies/thumbs_up_buddies/Happy_CH11.png"
import vbt14 from "../../assets/valuebuddies/thumbs_up_buddies/thumbs up_learn.png"
import vbt15 from "../../assets/valuebuddies/thumbs_up_buddies/motivate_thumps up.png"
import vbt16 from "../../assets/valuebuddies/thumbs_up_buddies/thumbs up_Reward.png"




import dice1 from "../../assets/dice/01.gif";
import dice2 from "../../assets/dice/02.gif";
import dice3 from "../../assets/dice/03.gif";
import dice4 from "../../assets/dice/04.gif";
import dice5 from "../../assets/dice/05.gif";
import dice6 from "../../assets/dice/06.gif";


import gameboard from '../../assets/gameBoard/play-board.png'

import redDot from "../../assets/learningCardIcons/redDot.svg"
import listIc from "../../assets/learningCardIcons/listIc.svg"
import minudIc from "../../assets/learningCardIcons/minusIc.svg"
import sendIc from "../../assets/learningCardIcons/sendIc.svg"

const initialState = {
  auth: null,
  assests: [
    { magnus: Magnus1, text: textRight1 },
    { magnus: MagnusOpenHand, text: textRight2 },
    { magnus: Magnus1, text: textRight3 },
    { magnus: MagnusOpenHand, text: textLeft, gameBoard: gameBoard1 },
    { magnus: magnusRight, text: textCenter, tokenCard: { card1: tokenwater, card2: tokenfire, card3: tokenearth, card4: tokenAir } },
    { magnus: magnus4, text: badgesText, badges: badges },
    { magnus: MagnusOpenHand, text: barometerText, badges: barometer },
    { magnus: Magnus1, text: crossBoardText, crossBoard: crossBoardImg },
    { magnus: magnus5, text: valueBuddiesText, valueBuddies: valueBuddies },
    { magnus: magnus5, text: gate1Text, gate: gate1 },
    { magnus: MagnusOpenHand, text: clientText, headingText: "Understanding the requirment of the client", background1: background1, cards: { card1: reqCard1, card2: reqCard2, card3: reqCard3, card4: reqCard4 }, clientGirl: clientGirl },
    { magnus: MagnusOpenHand, text: clientText2, gate: gate1, clientGirl: clientGirl },
    { magnus: MagnusOpenHand, text: clientText3, gate: wrongGateChoice, clientGirl: clientGirlSad },
    { magnus: MagnusOpenHand, text: learningText, learningCard: learningCard },
  ],
  selectTokens: [
    { id: 1, name: "Water", image: waterIc, color: "#B0E2FF" },
    { id: 2, name: "Fire", image: fireIc, color: "#FDA39D" },
    { id: 3, name: "Earth", image: eartIc, color: "#94FF94" },
    { id: 4, name: "Air", image: airIc, color: "#FFEF9D" },
  ],
  tokenCard: [{ card: tokenwater }, { card: tokenfire }, { card: tokenearth }, { card: tokenAir }],
  gameIntroSteps: 0,
  introSteps: 0,
  valueBuddiesImg: [
    { image: vb1, id: 1, happy: vbh1, sad: vbs1, thumbsUp: vbt1, withName: vb1, name:"Accountability" },
    { image: vb2, id: 2, happy: vbh2, sad: vbs2, thumbsUp: vbt2, withName: vb2, name: "Achieve" },
    { image: vb3, id: 3, happy: vbh3, sad: vbs3, thumbsUp: vbt3, withName: vb3, name: "Adaptability" },
    { image: vb4, id: 4, happy: vbh4, sad: vbs4, thumbsUp: vbt4, withName: vb4, name:"Challenge"},
    { image: vb5, id: 5, happy: vbh5, sad: vbs5, thumbsUp: vbt5, withName: vb5, name:"Client centricity"},
    { image: vb6, id: 6, happy: vbh6, sad: vbs6, thumbsUp: vbt6, withName: vb6, name: "Collaboration" },
    { image: vb7, id: 7, happy: vbh7, sad: vbs7, thumbsUp: vbt7, withName: vb7, name:"Creativity"},
    { image: vb8, id: 8, happy: vbh8, sad: vbs8, thumbsUp: vbt8, withName: vb8, name:"Diversity"},
    { image: vb9, id: 9, happy: vbh9, sad: vbs9, thumbsUp: vbt9, withName: vb9, name:"Empathy" },
    { image: vb10, id: 10, happy: vbh10, sad: vbs10, thumbsUp: vbt10, withName: vb10, name:"Engage" },
    { image: vb11, id: 11, happy: vbh11, sad: vbs11, thumbsUp: vbt11, withName: vb11, name:"Initative" },
    { image: vb12, id: 12, happy: vbh12, sad: vbs12, thumbsUp: vbt12, withName: vb12, name:"Integrity" },
    { image: vb13, id: 13, happy: vbh13, sad: vbs13, thumbsUp: vbt13, withName: vb13, name:"Leadership" },
    { image: vb14, id: 14, happy: vbh14, sad: vbs14, thumbsUp: vbt14, withName: vb14, name:"Learn" },
    { image: vb15, id: 15, happy: vbh15, sad: vbs15, thumbsUp: vbt15, withName: vb15, name:"Motivate" },
    { image: vb16, id: 16, happy: vbh16, sad: vbs16, thumbsUp: vbt16, withName: vb16, name:"Reward" }
  ],
  learningCardData: [
    {
      icon: redDot, 
    },
    {
      icon: sendIc, 
    },
    {
      icon: listIc, 
    },
    {
      icon: minudIc,
    },
  ],


  dice: {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6
  },
  showDiceBtn: true,
  gameboard: gameboard,
  selectedToken: null,
  remainingTime: 1,
  chooseValueModal: false,

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      if (action.val) {
        return {
          ...state,
          auth: action.val
        }
      } else {
        return {
          ...state,
          auth: null,
          gameState: null,
          showDiceBtn: true,
          gameIntroSteps: 0,
          introSteps: 0,
          isValueBuddySelected: false,
          gameId: null,
          step: undefined
        }
      }
    case SET_ORGANISATION:
      return {
        ...state,
        organisation: action.val
      }
    case SET_IS_OTP_SENT:
      return {
        ...state,
        isOtpSent: action.val
      }
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.val
      }
      case SET_USER_DETAILS:
        return {
          ...state,
          userDetails:action.val
        }
    case PREV_URL:
      return {
        ...state,
        prevUrl: action.val
      }
    case STEP:
      return {
        ...state,
        step: action.val
      }

    case SET_OTP_VERIFIED:
      return {
        ...state,
        otpVerified: action.val
      }
    case SET_INTRO_STEPS:
      return {
        ...state,
        introSteps: action.val
      }
    case SET_GAME_INTRO_STEPS:
      return {
        ...state,
        gameIntroSteps: action.val
      }
    case SET_GAME_ID:
      return {
        ...state,
        gameId: action.val
      }
    case SET_SHOW_DICE_BTN:
      return {
        ...state,
        showDiceBtn: action.val
      }
    case SET_GAME_STATE:
      return {
        ...state,
        gameState: action.val
      }
    case SET_VALUE_BUDDY_CHOOSEN:
      return {
        ...state,
        isValueBuddySelected: action.val
      }
    case SET_CORRECT_VALUE_BUDDIES:
      return {
        ...state,
        correctValueBuddies: action.val
      }
    case SET_TOKENS:
      return {
        ...state,
        tokenNames: action.val
      }
    case SET_GATE_POSITIONS:
      return {
        ...state,
        gatePositions: action.val
      }
    case SET_TIMER:
      return {
        ...state,
        timer: action.val
      }
    case SET_REMAINING_TIME:
      return {
        ...state,
        remainingTime: action.val
      }
    case SET_PAUSE_GAME:
      return {
        ...state,
        isGamePaused: action.val
      }
    case SET_TIMER_ID:
      return {
        ...state,
        timerId: action.val
      }

    case ADD_INTERVAL:
      return {
        ...state,
        intervalIds: [...state.intervalIds, action.val]
      };
    case CLEAR_ALL_INTERVALS:
      state.intervalIds?.forEach((id) => clearInterval(id));
      return {
        ...state,
        intervalIds: []
      };
    case CHOOSE_VALUE_BUDDY_MODAL:
      return {
        ...state,
        chooseValueModal: action.val
      };

      case SET_POLL_QUESTIONS:
        return{
          ...state,
          pollQuestions:action.val
        };

      case SET_FEEDBACK_QUESTIONS:
        return{
          ...state,
          learningCardData:action.val
        };

        case PLAY_AUDIO:
          return{
            ...state,
            isPlaying:action.val
          }
     

    default:
      return { ...state };
  }
};

export default reducer;
