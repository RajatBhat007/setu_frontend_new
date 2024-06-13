import {Form, Input,Button} from 'antd'
import './styles.css'
import React, { useState } from 'react';
import setuLogo from '../../assets/setuLogo.png';
import { EyeInvisibleOutlined,EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../reduxStore/actions/action';


function Login({login,handleOrientationChange}) {
  const history = useHistory();

  const [loder,setLoader]=useState(false);

  const handleLogin=async (value)=>{
    try {
  
  const param={
    username:value.username,
    password:value.password
  }
      login(param,()=>{
       
        setLoader(false);
        history.push('/setu_game');
        const audio= document.getElementById("audio-tag");;
        handleOrientationChange();
     
        if (audio.paused) {
         audio.play();
        // playAudio(false);
       
     } else {
         audio.pause();
        // playAudio(true);
 
     }
      })
    } catch (error) {
      console.error('Error in login:', error);
    }
  }

 
 
    return (
        <div className='component-wrapper'>
        <div className='form-container'>
     
       <img src={setuLogo} className='logo-img'/>

       <span className='form-heading'>Login</span>
   
        <div className='form-wrapper'>
            <Form
             layout="vertical"
             className='setu-form'
             autoComplete='off'
             onFinish={handleLogin}
        
            >
            <Form.Item
    label={<label className='form-label'>Username</label>}
    className='form-item'
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input  className='form-input' placeholder='Username' suffix={<UserOutlined/>} />
    </Form.Item>
    <Form.Item
    className='form-item'
      label={<label className='form-label'>Password</label>}
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password autoComplete="new-password"  placeholder="Password"  className='form-input'    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
    </Form.Item>
    <Form.Item
 className='form-item'
    >
      <Button className='form-submit-btn' htmlType="submit">
        Login
      </Button>
    </Form.Item>
            </Form>
       <div className='form-link'>
        <p>Don't have an Account? <a href='/setu_game/signup' >Sign Up</a></p>
       
       </div>
        </div>
        <div className='forgot-password'>
            <a href='/setu_game/forgot-password'>Forgot your password?</a>
        </div>
       </div>
           
        </div>
    )
}




   
const mapStateToProps = state => {
  const {
 auth
}  = state;

return { auth }
}


const mapDispatchToProps = dispatch =>  ({
  login: (params,successCallback) => dispatch(login(params,successCallback)),
 
})

export default connect( mapStateToProps,mapDispatchToProps)(Login)

