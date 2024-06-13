import {Form, Input,Button,Modal,Select} from 'antd'
import './styles.css'
import React, { useState } from 'react';
import setuLogo from '../../assets/setuLogo.png';
import Otp from './otp';
import tickmark from '../../assets/tickmark.png'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {sendOtp,checkUserName, register } from '../../reduxStore/actions/action';
import CountryPhoneInput,{ConfigProvider} from 'antd-country-phone-input';

import en from 'world_countries_lists/data/countries/en/world.json';
const { Option } = Select;
function Signup({sendOtp,isOtpSent,checkUserName,register,configuredAuth}) {
const [isModalVisible, setIsModalVisible] = useState(false);
const [authMethod,setAuthMethod]=useState('Email');
const [form] = Form.useForm();
const options=[
  {
    lable:'Email',
    value:'Email'
  },{
    lable:"Phone",
    value:'Phone'
  }
]
const history = useHistory();
 const handleSendOtp=(value)=>{
      value['newUser']=true;
      if(value.hasOwnProperty('phone')){
        value['uniqueId']='+'+value.phone.code+value.phone.phone;
      }
      console.log('form value',value)
       sendOtp(value,()=>{
         
       })
 }

 const handleCancel=()=>{
    setIsModalVisible(false);
    history.push('/setu_game/login');
 }
 const handleAuthMethodChange=(value)=>{
  setAuthMethod(value)

 }


 const validatePhone = async (_, value) => {
    // Basic phone number validation
  
 
    const countryCode = value.short; // Get the country code

  if (countryCode === 'IN'  && value.phone?.length !== 10) {
    return Promise.reject('Invalid phone number!');
  }
   else if (value.phone?.length < 6 || value.phone?.length > 14) {
      return Promise.reject('Invalid phone number!');
    }
    
  
    // Proceed with further validation or logic if needed
  
    return Promise.resolve();


};

const validateEmail = async (_, value) => {

    // Basic email format validation
    if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
      if(!value){
        return Promise.reject();
      }
      return Promise.reject('Please enter a valid email address!');
    }
  return Promise.resolve();
};

const validateUsername = async (_, value) => {
  if (!value) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    checkUserName(
      { "username": value },
      (res) => {
        if (res) {
          reject('Username already exists!');
        } else {
           resolve()
        }
      },
      (err) => {
        console.error('Error checking username', err);
        reject('Unable to process this time!');
      }
    );
  });
};

 const handleVerifyOtp = async (otp) => {
  const param={
    otp:otp
  }
      register(param,()=>{
        setIsModalVisible(true);
        setTimeout(() => {
          history.push('/setu_game/login'); // Automatically navigate to login page after 5 seconds
        }, 5000);
      },()=>{

      })
  }

  
  // const validatePhone = (_, value) => {
  //   // Your phone validation logic here
  // };

  // const validateEmail = (_, value) => {
  //   // Your email validation logic here
  // };
    return (
        <>
      {!isOtpSent?
        <div className='component-wrapper'>
        <div className='form-container'>
     
       <img src={setuLogo} className='logo-img'/>

       <span className='form-heading'>Sign Up</span>
   
        <div className='form-wrapper'>
        <ConfigProvider locale={en}>
            <Form
             layout="vertical"
             className='setu-form'
             autoComplete='off'
             onFinish={ handleSendOtp}
             form={form}
             initialValues={{ phone: { short: 'In' } }}
            >
                     <Form.Item
    className='form-item'
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}
    >
      <Input  className='form-input' placeholder='Name' />
    </Form.Item>
            <Form.Item
    className='form-item'
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
        {
            validator: validateUsername,
          },
      ]}
    >
      <Input  className='form-input' placeholder='Username' />
    </Form.Item>
    {configuredAuth=="Both"?
    <div>
    <Form.Item
        className='form-item'
    >
    <Select
    className='form-input'
      
          defaultValue="Email"
          onChange={handleAuthMethodChange}
          options={options}
        />

    </Form.Item>
   { authMethod=='Email'?
   <Form.Item
    className='form-item'
      name="uniqueId"
      rules={[
        {
          required: true,
          message: 'Please input your email id!',
        },
        {
            validator: async (_, value) => {
         
  
              return  validateEmail(_,value)
              
            },
          },
       
      ]}
    >
      <Input  className='form-input' placeholder='Enter email id' />
    </Form.Item>
   
   :
 

<Form.Item
  name="phone"
   className='form-item'
   form={form}
  rules={[
        { required: true, message: 'Please input your phone number!' },
        validate => ({
          validator(_, value) {
            console.log(value)
            if (!value.phone ) {
              return Promise.reject('Please input your phone number');
            }
            return validatePhone(_,value)
          },
        }),
      ]}
      

>



    <CountryPhoneInput  placeholder="Enter phone number"  className='form-input' inline 
     defaultValue={{ short: 'In' }}
  

    onKeyPress={(e) => {
      // Allow only numeric characters
      const charCode = e.which ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
      }
    }}
    />
  

 
</Form.Item>


   
   }

   </div>
    
     :
    configuredAuth=='Email'?
   <Form.Item
    className='form-item'
      name="uniqueId"
      rules={[
        {
          required: true,
          message: 'Please input your email id!',
        },
        {
            validator: async (_, value) => {
         
  
              return  validateEmail(_,value)
              
            },
          },
       
      ]}
    >
      <Input  className='form-input' placeholder='Enter email id' />
    </Form.Item>
   
   :
   <Form.Item
  name="phone"
   className='form-item'
   form={form}
  rules={[
        { required: true, message: 'Please input your phone number!' },
        validate => ({
          validator(_, value) {
           
            if (!value.phone) {
              return Promise.reject('Please input your phone number');
            }
            return validatePhone(_,value)
          },
        }),
      ]}
      

>



    <CountryPhoneInput  placeholder="Enter phone number"  className='form-input' inline 
     defaultValue={{ short: 'In' }}
  

    onKeyPress={(e) => {
      // Allow only numeric characters
      const charCode = e.which ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
      }
    }}
    />
  

 
</Form.Item>
   
   
   }
  
    <Form.Item
    className='form-item'
   
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input new password!',
        },
      ]}
    >
      <Input  autoComplete="new-password"  placeholder="Create password"  className='form-input'   />
    </Form.Item>

    <Form.Item
    className='form-item'
   
      name="city"
      rules={[
        {
          required: true,
          message: 'Please input city!',
        },
      ]}
    >
      <Input placeholder="City"  className='form-input'   />
    </Form.Item>
    <Form.Item
 
    >
      <Button className='form-submit-btn' htmlType="submit" >
        Get OTP
      </Button>
    </Form.Item>
            </Form>
            </ConfigProvider>
       <div className='form-link'>
        <p>Already have an Account? <a href='/setu_game/login'>Login</a></p>
       
       </div>
        </div>

       </div>
           
        </div>:
        <Otp title={"Sign Up"}  handleVerifyOtp={handleVerifyOtp}/>}
        <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
       centered={true}
       maskClosable={false}
        className='success-modal'
      >
      <div className='otp-success-modal'>
        <img src={tickmark} style={{maxWidth:'150px'}}></img>
        <span>Thank You!</span>
        <p>Your code has been successfully verified!</p>
      </div>
    
      </Modal>

        </>
    )
}

const mapStateToProps = state => {
  const {
isOtpSent,organisation
}  = state.SeTu;

const configuredAuth=organisation?.configuredAuth
return { isOtpSent,configuredAuth}
}


const mapDispatchToProps = dispatch =>  ({
  sendOtp: (params,successCallback) => dispatch(sendOtp(params,successCallback)),
  checkUserName:(params,successCallback,callback)=>dispatch(checkUserName(params,successCallback,callback)),
  register:(param,successCallback,callback)=>dispatch(register(param,successCallback,callback))
 
})

export default connect( mapStateToProps,mapDispatchToProps)(Signup)


