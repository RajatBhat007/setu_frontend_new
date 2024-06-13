import React, { useEffect, useState } from 'react';
import barometer from "../../assets/gameBoard/BM.png"


function DecisionImpact({ percent }) {
    const [height, setHeight] = useState(0);

    useEffect(() => {
      setHeight(percent);
    }, [percent]);
  
    // Function to calculate color stops based on percentage
    function getColorStops(percentage) {
        return [
        '#48887b 0%', '#48887b 19%',//color

        '#44301E 19%','#44301E 20%',

        '#bdda55 20%','#bdda55 39%',//color

        '#44301E 39%','#44301E 40%',

        '#fffc28 40%','#fffc28 59%',//color

        '#44301E 59%','#44301E 60%',

        '#f89f32 60%','#f89f32 79%',//color

        '#44301E 79%','#44301E 80%',

        '#ed3237 80%',`#ed3237 99%`,//color
        
        '#44301E 99%','#44301E 100%',
    ];
    
    }
  
    return (
        <div className="vertical-progress-container" style={{ width: '80%',height:'100%' , borderRadius: '10px', margin: '0 10px', overflow: 'hidden', position: 'relative' }}>
          <div
        className="overlay"
        style={{ height: `${100-height}%` ,position: "absolute",
  bottom:"0",
  left: "0",
  width: "100%",
  borderTopLeftRadius:'10px',
  borderTopRightRadius:'10px',
  background: `#583218`,
  opacity:'0.9',
  transition: "height 1s ease-in-out", /* Transition height from the bottom */
  zIndex: "1"}}
      ></div>
     
        <div
          className="vertical-progress"
          style={{
         
            width: '100%',
            height: '100%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#583218',
            padding:'3%'
        
          }}
        >
        <div style={{
        
            width: '1.6vw',
            minWidth:'15px',
            height: '100%',
            // border:'5px solid #44301E',
            // backgroundImage: `linear-gradient(to top, ${getColorStops(height).join(', ')})`,
            background:`url(${barometer}) no-repeat center`,
            backgroundSize:'100% 100%'
          
        }}>

        </div>

        </div>
        {/* <div style={{width:'98%',height:'100%'}}>
        <img src={barometer} style={{height:'100%',width:'100%',objectFit:'contain'}}/>
        </div> */}
      
      </div>
    );
  }

export default DecisionImpact;
