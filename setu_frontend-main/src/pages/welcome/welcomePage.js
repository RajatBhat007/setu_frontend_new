import {Form, Input,Button} from 'antd'
import './styles.css'
import React from 'react';
import setuLogo from '../../assets/setuLogo.png';
import { EyeInvisibleOutlined,EyeTwoTone, UserOutlined } from '@ant-design/icons';
function Welcome() {

 
    return (
        <div className='component-wrapper'>
        <div className='welcome-container'>
     
       <img src={setuLogo} className='logo-img'/>

       <span className='welcome-heading'>Welcome to</span>
       <span className='welcome-heading'>SeTU</span>
       <span className='welcome-subheading'>Bridge of Values</span>

       </div>
           
        </div>
    )
}

export default Welcome
