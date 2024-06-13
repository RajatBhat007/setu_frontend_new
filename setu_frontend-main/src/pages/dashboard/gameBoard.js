import React, { useEffect, useRef, useState } from 'react'
import UserInitials from '../components/userInitials'
import mainGameboard from "../../assets/gameBoard/Game board with timer and score.png"
import barometer from "../../assets/gameBoard/barometer.svg"
import decisionimpact from "../../assets/gameBoard/decisionimpact.svg"
import karmaheading from "../../assets/gameBoard/karmaheading.svg"
import karmaBadgesMeter from "../../assets/gameBoard/karma-meter.png";
import karmalayout from "../../assets/gameBoard/karmalayout.svg"
import scoreboard from "../../assets/gameBoard/scoreboard.svg"
import { connect } from 'react-redux'
import sarpent from "../../assets/gameBoard/sarpent.svg"
import magnus from "../../assets/gameBoard/magnus.svg"
import DecisionImpact from './decisionImpact';
import badge5 from "../../assets/karma-badges/badge-1.svg"
import badge4 from "../../assets/karma-badges/badge-2.svg"
import badge3 from "../../assets/karma-badges/badge-3.svg"
import badge2 from "../../assets/karma-badges/badge-4.svg"
import badge1 from "../../assets/karma-badges/badge-5.svg"
import { pauseGame } from '../../reduxStore/actions/action'
import Learning from "../../assets/gameBoard/Learning.png"
import TgcLogo from "../../assets/gameBoard/tgc-logo.png"
import Setting from "../../assets/gameBoard/settings.png";
import SettingsModal from '../components/settingsModal'
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}


const KarmaBadges = React.memo(({noOfKarmas}) => {


  const badges = [badge1, badge2, badge3, badge4, badge5];
  return (
    <div className="vertical-progress-container-1" style={{ width: '80%', height: '100%', borderRadius: '10px', margin: '0 10px', position: 'relative', }}>
      <div
        className="overlay-1"
        style={{
          height: `${100 - (noOfKarmas * 20)}%`, position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          background: `#583218`,
          opacity: '0.9',
          trasnsition: "height 0.5s ease-in-out", /* Transition height from the bottom */
          zIndex: "1",
          borderRadius:'10px'
        }}
      ></div>

      <div
        className="vertical-progress-1"
        style={{

          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#583218',
          borderRadius:'10px'
        }}
      >
        <div style={{

          width: '90%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1%',
          gap: '5px',
          position: 'relative'
        }}>
          {badges.map((ele, index) => {
            return <div className='karma-badge' id={`badge-${index}`} >
              <img src={ele} style={{ position: 'absolute', objectFit: "contain", width: '100%', height: '100%' }} id={`karma-${index}`} />
              <div style={{ width: '100%', height: '100%', display: 5 - index > noOfKarmas ? 'none' : 'block', zIndex: 1000, position: 'absolute', borderRadius: '100%' }}></div>
            </div>
          })}

        </div>

      </div>


    </div>
  );

})

function GameBoard({ gameIntroSteps, gameboard, selectTokens, from, lastReachedPosition,
  noOfKarmas, totalScore, time, gameState, setFrom, karamFlag , setDiceValue,diceValue,pauseGame,userDetails}) {


const tokenID=parseInt(gameState?.selectedToken);
const [openSettings,setOpenSettings]=useState(false);
const [isOpenModalSetting, setIsOpenModalSetting] = useState(false);


useEffect(() => {

  if (isOpenModalSetting) {
    pauseGame(true);
  } else {
    pauseGame(false);
  }
}, [isOpenModalSetting])

const handleSetting=()=>{
  setIsOpenModalSetting(true); 
  setOpenSettings(true); 
  pauseGame(true)
}

  // const triggerAnimation = (from, to) => {
  //   const tokenImg=document.getElementById(`token-${tokenID}`);
  // function animate(from,to){

  //   if(from>=to)
  //     return
  //   console.log('animation range top',from,to)
  //     const fromDiv=document.getElementById(`tileplayer-${from}`);
  //     const toDiv=document.getElementById(`tileplayer-${from+1}`);
  //     const fromRect = fromDiv.getBoundingClientRect();
  //     const toRect = toDiv.getBoundingClientRect();

  //     tokenImg.style.left = `${0}px`;
  //     tokenImg.style.top = `${0}px`;
  //     tokenImg.style.setProperty('--end-x', `${toRect.left - fromRect.left}px`);
  //     tokenImg.style.setProperty('--end-y', `${toRect.top - fromRect.top}px`);

  //   tokenImg.addEventListener('animationend', () => {
  //     console.log('animation range',from,to)
  //      animate(++from,to)
  //   });


  // }
  // animate(from,to)
  // };



  //   useEffect(()=>{


  //     const triggerClimbAnimation=(from, to,tokenRect,tokenImg)=>{


  //         const animate = () => {
  //           console.log('running interval',from,to)
  //           if (from > to) {
  //             return 
  //           }

  //           const fromDiv = document.getElementById(`tileplayer-${from}`);
  //           const toDiv = document.getElementById(`tileplayer-${from + 1}`);
  //           const fromRect = fromDiv.getBoundingClientRect();
  //           const toRect = toDiv.getBoundingClientRect();
  //           console.log("tokenrect",tokenRect.left,tokenRect.top)
  //           console.log("from rect",fromRect.left,fromRect.top)
  //           console.log("to rect",toRect.left,toRect.top)
  //           tokenImg.style.left = `${-tokenRect.left}px`;
  //           tokenImg.style.top = `${-tokenRect.top}px`;
  //           tokenImg.style.setProperty('--end-x', `${toRect.left}px`);
  //           tokenImg.style.setProperty('--end-y', `${toRect.top }px`);
  //           toDiv.appendChild(tokenImg)
  //          ++from
  //           requestAnimationFrame(animate);



  //         };
  //         requestAnimationFrame(animate);




  //     }
  //     const   triggerFallAnimation=(from, to,tokenRect,tokenImg)=>{
  //       const animate = () => {
  //         console.log('running interval',from,to)
  //         if (from < to) {
  //           return 
  //         }
  //         const fromDiv = document.getElementById(`tileplayer-${from}`);
  //         const toDiv = document.getElementById(`tileplayer-${from-1}`);
  //         const fromRect = fromDiv.getBoundingClientRect();
  //         const toRect = toDiv.getBoundingClientRect();
  //         console.log("tokenrect",tokenRect.left,tokenRect.top)
  //         console.log("from rect",fromRect.left,fromRect.top)
  //         console.log("to rect",toRect.left,toRect.top)
  //         tokenImg.style.left = `${-tokenRect.left}px`;
  //         tokenImg.style.top = `${-tokenRect.top}px`;
  //         tokenImg.style.setProperty('--end-x', `${toRect.left}px`);
  //         tokenImg.style.setProperty('--end-y', `${toRect.top}px`);
  //         toDiv.appendChild(tokenImg)
  //        --from

  //         requestAnimationFrame(animate);



  //       };
  //       requestAnimationFrame(animate);


  //     }
  //     if(lastReachedPosition=from){

  //       const tokenImg=document.getElementById(`token-${tokenID}`);
  //       const tileDiv=document.getElementById(`tileplayer-${from}`);
  //       const fromRect = tokenImg.getBoundingClientRect();
  //       const toRect = tileDiv.getBoundingClientRect();
  //       tokenImg.style.left = `${0}px`;
  //       tokenImg.style.top = `${0}px`;
  //       tokenImg.style.setProperty('--end-x', `${toRect.left - fromRect.left}px`);
  //       tokenImg.style.setProperty('--end-y', `${toRect.top - fromRect.top}px`);
  //     }
  //  else if(from ==-1){
  //       const tokenImg=document.getElementById(`token-${tokenID}`);
  //       const tileDiv=document.getElementById(`tileplayer-${1}`);
  //       const fromRect = tokenImg.getBoundingClientRect();
  //       const toRect = tileDiv.getBoundingClientRect();
  //       tokenImg.style.left = `${0}px`; 
  //       tokenImg.style.top = `${0}px`;
  //       tokenImg.style.setProperty('--end-x', `${toRect.left - fromRect.left}px`);
  //       tokenImg.style.setProperty('--end-y', `${toRect.top - fromRect.top}px`);
  //       tileDiv.appendChild(tokenImg)
  //       tokenImg.addEventListener('animationend', () => {
  //         triggerClimbAnimation(1,lastReachedPosition,fromRect,tokenImg)
  //      });

  //     }else if(from<=lastReachedPosition){

  //       const tokenImg=document.getElementById(`token-${tokenID}`);
  //       tokenImg.classList.remove('tokenImg')
  //       tokenImg.classList.add('animate')
  //        const tileDiv=document.getElementById(`tileplayer-${from}`);
  //       const fromRect = tokenImg.getBoundingClientRect();
  //       const toRect = tileDiv.getBoundingClientRect();
  //       // tokenImg.style.left = `${0}px`; 
  //       // tokenImg.style.top = `${0}px`;
  //       // tokenImg.style.setProperty('--end-x', `${toRect.left - fromRect.left}px`);
  //       // tokenImg.style.setProperty('--end-y', `${toRect.top - fromRect.top}px`);
  //         // tokenImg.addEventListener('animationend', () => {

  //         //   });
  //         triggerClimbAnimation(from,lastReachedPosition,fromRect,tokenImg)



  //     }else if(from>lastReachedPosition){

  //       const tokenImg=document.getElementById(`token-${tokenID}`);
  //       tokenImg.classList.remove('tokenImg')
  //       tokenImg.classList.add('animate')
  //        const tileDiv=document.getElementById(`tileplayer-${from}`);
  //       const fromRect = tokenImg.getBoundingClientRect();
  //       const tokenRect = tileDiv.getBoundingClientRect();
  //       // tokenImg.style.left = `${0}px`; 
  //       // tokenImg.style.top = `${0}px`;
  //       // tokenImg.style.setProperty('--end-x', `${tokenRect.left - fromRect.left}px`);
  //       // tokenImg.style.setProperty('--end-y', `${tokenRect.top - fromRect.top}px`);
  //       // tileDiv.appendChild(tokenImg)
  //       // tokenImg.addEventListener('animationend', () => {
  //         triggerFallAnimation(from,lastReachedPosition,fromRect,tokenImg)
  //         // });


  //     }

  //   },[lastReachedPosition,from])




  // const tokenImg=document.getElementById(`token-${tokenID}`);

  // const tileDiv=document.getElementById(`tileplayer-${lastReachedPosition}`);
  // const fromRect = tokenImg.getBoundingClientRect();
  // const toRect = tileDiv.getBoundingClientRect();
  // tokenImg.style.left = `${0}px`;
  // tokenImg.style.top = `${0}px`;
  // tokenImg.style.setProperty('--end-x', `${toRect.left - fromRect.left}px`);
  // tokenImg.style.setProperty('--end-y', `${toRect.top - fromRect.top}px`);
  const getInitials = (name) => {
    const nameArray = name.trim().split(' ');

    if (nameArray.length === 1) {
        // Single word: return the first two letters of the word
        return nameArray[0].slice(0, 2).toUpperCase();
    } else {
        // More than one word: return the first letter of the first and last names
        const firstNameInitial = nameArray[0].charAt(0).toUpperCase();
        const lastNameInitial = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
        return firstNameInitial + lastNameInitial;
    }
};
  useEffect(() => {
    
    const debouncedAction = debounce(() => {
      if(from >100 && lastReachedPosition>100)return;
      // let startId = from == -1 ? `start-${tokenID}` : from >100?'end-position':`tileplayer-${from}`;
      // let endId =lastReachedPosition>100?'end-position': `tileplayer-${lastReachedPosition}`;
      let startId = from == -1 ? `start-${tokenID}` :`tileplayer-${from}`;
      let endId = lastReachedPosition>=100?`tileplayer-100`:`tileplayer-${lastReachedPosition}`;
     
      const startElement = document.getElementById(startId);
      const endElement = document.getElementById(endId);
      if (startElement && endElement) {
      
          
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
     
      //  let tokenImg= document.getElementById(`token-${tokenID}`);
      //  if(tokenImg && from !=-1){
      //   tokenImg.style.display='none'
      //  }
        let tokenImgContainer= document.getElementById(`token-container-${tokenID}`);
       if( tokenImgContainer && from !=-1){
        tokenImgContainer.style.display='none'
       }

        // let newImg = document.getElementById(`new-token-${tokenID}`);
      
        //   newImg = document.createElement('img');
        //   newImg.setAttribute('src', selectTokens?.[tokenID - 1]?.image); // Replace with your image path
        //   newImg.setAttribute('id', `token-${tokenID}`);

        //   newImg.className = 'animate';
        //   newImg.style.position = 'absolute';
        //   newImg.style.zIndex = '100'

        const container = document.createElement('div');
        container.setAttribute('id', `token-container-${tokenID}`);
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.className = 'animate';
      
        // Create image element
        const newImg = document.createElement('img');
        newImg.setAttribute('src', selectTokens?.[tokenID - 1]?.image);
        newImg.setAttribute('id', `token-${tokenID}`);
        
        newImg.style.position = 'absolute';
        newImg.style.zIndex = '100';
        newImg.style.width = '100%';
        newImg.style.height = '100%';
        newImg.style.objectFit='contain';
      
        // Create text element
        const textOverlay = document.createElement('div');
        textOverlay.innerText = getInitials(userDetails?.name) ;
        textOverlay.style.position = 'absolute';
        textOverlay.style.top = '50%';
        textOverlay.style.left = '50%';
        textOverlay.style.transform = 'translate(-50%, -50%)';
        textOverlay.style.color = 'white';
        textOverlay.style.fontSize = '1.4vw';
        textOverlay.style.fontWeight = 'bold';
        textOverlay.style.zIndex = '200';
        textOverlay.style.pointerEvents = 'none'; // Ensure the text does not interfere with any mouse events
      
        // Append image and text to the container
        container.appendChild(newImg);
         container.appendChild(textOverlay);
      



        
        // if (lastReachedPosition != from) {
        //   newImg.style.left = `${0}px`;
        //   newImg.style.top = `${0}px`;



        //   newImg.style.setProperty('--end-x', `${endRect.left - startRect.left}px`);
        //   newImg.style.setProperty('--end-y', `${endRect.top - startRect.top}px`);
        // }


        if (lastReachedPosition != from) {
          container.style.left = `${0}px`;
          container.style.top = `${0}px`;



          container.style.setProperty('--end-x', `${endRect.left - startRect.left}px`);
          container.style.setProperty('--end-y', `${endRect.top - startRect.top}px`);
        }


        console.log('new img', newImg, "reched", lastReachedPosition, 'from', from)
       
    
          //startElement.appendChild(newImg);
          startElement.appendChild(container);

          // let tokenEndImg= document.getElementById(`token-end-${tokenID}`);
          // if(tokenEndImg && from >100){
          //  tokenEndImg.style.display='none'
          // }
       
     

        // newImg.addEventListener('animationend', () => {
        
        //   if(from>100){
  
        //       newImg.remove();
  
       
        //   }else{
        //     setTimeout(()=>{
        //       newImg.remove();
              
        //     },2000)
        //   }
      

        // });



        container.addEventListener('animationend', () => {
        
          if(from>100){
  
              container.remove();
  
       
          }else{
            setTimeout(()=>{
              container.remove();
              
            },2000)
          }
      

        });

      }  }, 500);

    if (lastReachedPosition && from && lastReachedPosition!=from) {
     
      debouncedAction();
      
      }


      const cleanup = () => {
        clearTimeout(debouncedAction);
      };
      return cleanup;
    
  },[lastReachedPosition])







  const Tile = ({ num, players, id }) => {
    return (
      <div className="tile" >
        {/* <div className="tile-number">{num}</div> */}
        {/* <div className="tile-type">{num > to ? "S" : num < to ? "L" : ""}</div> */}
        <div className="tile-players-container" id={`tileplayer-${id}`}>
          {from == num  ?
            <div style={{position:'relative',width:'100%',height:'100%'}} id={`token-container-${tokenID}`}>
          <div style={{ color: 'white', position: "absolute", fontWeight: "bold", fontSize: "1.4vw",top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:200 }}> <UserInitials fullName={userDetails?.name} /></div>
          <img className="animate" src={selectTokens?.[parseInt(gameState?.selectedToken) - 1]?.image} alt="token Image" id={`token-${parseInt(gameState?.selectedToken)}`} />
          </div>

            : null}

            {/* check from ==-1 */}
        </div>
      </div>
    );
  };


  const renderGrid = () => {
    let tileNum = 1;
    let boardTiles = [];
    console.log('render grid called')

    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        boardTiles.push(
          <Tile
            key={tileNum} // Assign a unique key to each tile
            id={tileNum}
            row={i}
            col={j}
            num={tileNum}

          />
        );
        tileNum++;
      }
    }

    return boardTiles;
  }

  const [is58vhGreater, setIs58vhGreater] = useState(false);
  const [isWider,setIsWider]=useState(false)

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      setIsWider( window.innerWidth>window.innerHeight)

      const value58vh = (58 / 100) * viewportHeight;
      const value30vw = (36 / 100) * viewportWidth;

      setIs58vhGreater(value58vh > value30vw);
    };

    // Initial comparison
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='r-c-sa main-game-board-parent' style={{ height: '100%', width: '100%' }} >
     
        <div style={{ height: '100%', width: '20%', display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: "flex-end", position: 'relative', padding: '1vw' }}>
        <div style={{ display: 'flex', justifyContent: 'left', flexDirection: 'row', width: '100%',position:'relative',alignItems:'center' }}>

        <img src={Learning} style={{maxHeight:isWider?'6vh':'5vw',minHeight:isWider?'2vh':'2vw',width:'auto',height:'auto',maxWidth:isWider?'6vh':'5vw',minWidth:isWider?'2vh':'2vw' }} />

        </div>
        <div style={{height: '90%',maxHeight:is58vhGreater?'36vw':'65vh', width: '100%',position:'relative',display:'flex',flexDirection:'row'}}>
        {gameIntroSteps == 3 || gameIntroSteps > 2 ?
        <>
        <div style={{width:'30%',height:'100%'}}>
               <img src={decisionimpact} style={{ position: 'absolute', height: '100%', width: '25%', position: 'absolute', left: '10%', top: '5%' }} />
        </div>

          <div className="barometer-parent" style={{ width: '80%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
         
            {gameIntroSteps <= 3 ? <>
              <img src={barometer} style={{ width: '80%', height: '100%' ,objectFit:'contain'}} />
            </> : <>
              <img src={sarpent} style={{ width: '100%', height: '20%' }}></img>
              <DecisionImpact percent={lastReachedPosition} />
            </>}
          </div>
          </>
          : null}
          </div>
        </div>

     
      <div className='main-board' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',height: '100%', }} >
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: is58vhGreater?'36vw':'65vh',position:'relative' ,height:'13%'}}>
          <div style={{ color: 'black', width: '20%', display: "flex", justifyContent: 'flex-end', alignItems: 'center', position: "relative", flexDirection: 'column' }}>
            <img src={scoreboard} style={{ position: 'absolute', zIndex: 99, width: '100%', bottom: 0 }} />

            <span style={{ zIndex: 100, fontSize: '1vw', fontWeight: 700, color: '#000000',lineHeight:'60%' }}>score</span>
            <span style={{ zIndex: 100, fontSize: '1.6vw', color: '#44301E', fontWeight: 700, marginBottom:'5px' }}>{totalScore??0}</span>
          </div>

          <div className="company-logo" style={{ width: '10vw',maxWidth:'200px', display: "flex", justifyContent: 'center', alignItems: 'center' ,paddingBottom:'10px',height:'10vh',position:'absolute',top:'20%',left:'50%',transform:'translate(-50%,-50%)'}}><img src={TgcLogo} style={{ width: '100%', height: "100%" }} /></div>
          
          <div style={{ color: 'black', width: '20%', display: "flex", justifyContent: 'flex-end', alignItems: 'center', position: "relative", flexDirection: 'column' }}>
            <img src={scoreboard} style={{ position: 'absolute', zIndex: 99, bottom: 0, width: '100%' }} />
            <span style={{ zIndex: 100, fontSize: '0.9vw', fontWeight: 700, color: '#000000' ,lineHeight:'60%'}}>TIME</span>
            <span style={{ zIndex: 100, fontSize: '1.6vw', color: '#44301E', fontWeight: 700, marginBottom: '5px' }}>
              {time}
            </span>
          </div>
        </div>
        <div style={{ position: 'relative', height:  is58vhGreater?'36vw':'65vh', width: is58vhGreater?'36vw':'65vh'}}>
          <img className='full-img' src={gameboard} style={{ width: '100%', height: '100%' }} />
          <div className='overlay'>
            <div className="grid-container">
              {renderGrid()}
            </div>
          </div>
          {/* <div id='end-position' style={{position:'absolute',width:'10%',height:'10%',top:'0',left:'-10%'}}>

          {from >100 &&   !document.getElementById(`new-token-${tokenID}`)?
          <div style={{position:'relative',width:'100%',height:'100%'}}>
          <div style={{ color: 'white', position: "absolute", fontWeight: "bold", fontSize: "2vw",top:'50%',left:'50%',transform:'translate(-50%,-50%)' }}> <UserInitials fullName={userDetails?.name} /></div>
          <img className="animate" src={selectTokens?.[parseInt(gameState?.selectedToken) - 1]?.image} alt="token Image" id={`token-end-${parseInt(gameState?.selectedToken)}`} />
          </div>

          :null
          }

          </div> */}
        </div>
      </div>
     
        <div className="karma-badges-parent" style={{ height: '100%', width: '20%', display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: "flex-end", position: 'relative', padding: '1vw' }}>
          {/* <img className='full-img' src={karmaBadgesMeter} /> */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row',  width: '100%',position:'relative',alignItems:'center' }}>

        <img src={Setting } onClick={(e)=>{e.preventDefault(); handleSetting()}} style={{ maxHeight:isWider?'6vh':'5vw',minHeight:isWider?'2vh':'2vw',width:'auto',height:'auto',maxWidth:isWider?'6vh':'5vw',minWidth:isWider?'2vh':'2vw',cursor:'pointer'}} />

       </div>
    <div style={{height: '90%',maxHeight:is58vhGreater?'36vw':'65vh', width: '100%',position:'relative',display:'flex',flexDirection:'row'}}>
          {gameIntroSteps == 2 || gameIntroSteps > 1 ?
        <>
                    {/* <img src={karmalayout}  style={{height:'100%'}}></img> */}
            <div className="barometer-parent" style={{ width: '80%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {/* <img className='full-img' src={barometer} /> */}
              {gameIntroSteps <= 3 ? <>
                <img src={karmaBadgesMeter} style={{ width: '80%', height: '100%',objectFit:'contain' }} />
              </> : <>
                <img src={magnus} style={{ width: '100%', height: '20%' }}></img>
                <KarmaBadges  noOfKarmas={noOfKarmas}/>
              </>}


            </div>
            <div style={{ height: '100%', width: '30%', display: 'flex', justifyContent: "flex-start", alignItems: 'flex-start' }}>
      
            <img src={karmaheading} style={{ height: '100%', width: '25%', position: 'absolute', right: '10%', top: '5%' }} />
           
          </div>
       
          </>
          : null}
      
        </div>
        </div>   

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
  const { gameIntroSteps, gameboard, selectTokens, gameState,userDetails } = state?.SeTu;
  return { gameIntroSteps, gameboard, selectTokens, gameState ,userDetails}
}


const mapDispatchToProps = dispatch => ({
  pauseGame: (val) => dispatch(pauseGame(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
