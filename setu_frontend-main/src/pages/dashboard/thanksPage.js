import React, { useState,useEffect } from 'react'

import { connect } from 'react-redux'
import "./feeback.css"
import letsPlayFrame from "../../assets/magnus-intro/letsPlay-frame.svg"
import { endGame } from '../../reduxStore/actions/action'


function ThanksPage({endGame}) {

    useEffect(()=>{
   endGame(()=>{
   
   },()=>{
    
   })
    },[])

    
    return (
        <div className="r-c-c" style={{width:"100%", height:"100dvh"}}>
          <div className='r-c-c' style={{ width:"50%", height:"100%"}} ><img src={letsPlayFrame} className='full-img' /></div>
          <div className='r-c-c-c' style={{position:"absolute"}}>
          <div style={{fontSize:45, fontWeight:"bolder", width:"70%",textAlign:"center"}} >Thank you for playing SeTU</div>
          <div className='m-t-10' style={{fontSize:25, fontWeight:'bolder'}}>Do play again!</div>
          </div>
        </div>
    )
}

const mapStateToProps = state => {

    const {  } = state?.SeTu;
    return {  }
}


const mapDispatchToProps = dispatch => ({
    endGame:(successCallback,callBack)=>dispatch(endGame(successCallback,callBack))
})

export default connect(mapStateToProps, mapDispatchToProps)(ThanksPage)
