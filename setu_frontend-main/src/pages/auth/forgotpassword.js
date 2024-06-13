import {Form, Input,Button,Modal,Select} from 'antd'
import './styles.css'
import React, { useState } from 'react';
import setuLogo from '../../assets/setuLogo.png';
import Otp from './otp';
import passwordResetSuccess from '../../assets/password-reset-success.png'
import { useHistory } from 'react-router-dom';
import { connect} from 'react-redux';
import { sendOtp,verifyOtp,updatePassword } from '../../reduxStore/actions/action';
import CountryPhoneInput,{ConfigProvider} from 'antd-country-phone-input';
import en from 'world_countries_lists/data/countries/en/world.json';
function ForgotPassword({sendOtp,isOtpSent,verifyOtp,otpVerified,updatePassword,configuredAuth}) {
const [isModalVisible, setIsModalVisible] = useState(false);
const history = useHistory();
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
 const handleOtpSent=(value)=>{
  if(value.hasOwnProperty('phone')){
    value['uniqueId']='+'+value.phone.code+value.phone.phone;
  }
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

 const handleVerifyOtp = async (otp) => {
  verifyOtp({otp},()=>{

  })
  };


  const  handleResetPassword=async(value)=>{
    updatePassword(value,()=>{
      setIsModalVisible(true)
    })
  }

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

const validatePhone = async (_, value) => {
  // Basic phone number validation
  // Check if the input starts with "+" or a digit
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





    return (
        <>
      {!isOtpSent?
        <div className='component-wrapper'>
        <div className='form-container'>
     
       <img src={setuLogo} className='logo-img'/>

       <span className='form-heading'>Forgot Password</span>
   
        <div className='form-wrapper'>
               {!otpVerified?
                <ConfigProvider locale={en}>
                <Form
             layout="vertical"
             className='setu-form'
             autoComplete='off'
             onFinish={ handleOtpSent}
             form={form}
             initialValues={{ phone: { short: 'In' } }}
        
            >
     {configuredAuth=='Both'?
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
            console.log(value)
            if (!value?.phone) {
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
 
    >
      <Button className='form-submit-btn' htmlType="submit" >
        Get OTP
      </Button>
    </Form.Item>
            </Form>
            </ConfigProvider>
            :

            <Form
             layout="vertical"
             className='setu-form'
             autoComplete='off'
             onFinish={ handleResetPassword}
        
            >
      <Form.Item
    className='form-item'
   
      name="new_password"
      rules={[
        {
          required: true,
          message: 'Please input new password!',
        },
      ]}
    >
      <Input  autoComplete="new-password"  placeholder="New password"  className='form-input'   />
    </Form.Item>

    <Form.Item
    className='form-item'
   
      name="confirm_password"
      dependencies={['new_password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
           
              if (!value || getFieldValue('new_password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
    >
      <Input  autoComplete="new-password"  placeholder="Confirm password"  className='form-input'   />
    </Form.Item>

    <Form.Item
 
    >
      <Button className='form-submit-btn' htmlType="submit" >
      Save
      </Button>
    </Form.Item>
            </Form>


               }
          

        </div>

       </div>
           
        </div>:
        <Otp title={"Forgot Password"}  handleVerifyOtp={handleVerifyOtp}/>}
        <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className='success-modal'
        getContainer={false}
        centered={true}
        maskClosable={false}
      >
      <div className='otp-success-modal'>
        <img src={passwordResetSuccess}></img>
        <span>Password Reset Successfully!</span>
        <a href='/setu_game/login'>back to Log in</a>
      </div>
    
      </Modal>

        </>
    )
}

const mapStateToProps = state => {
  const {
isOtpSent,
otpVerified,
organisation
}  = state.SeTu;
const configuredAuth=organisation?.configuredAuth

return { isOtpSent,otpVerified,configuredAuth}
}


const mapDispatchToProps = dispatch =>  ({
  sendOtp: (params,successCallback) => dispatch(sendOtp(params,successCallback)),
  verifyOtp:(params,successCallback)=>dispatch(verifyOtp(params,successCallback)),
  updatePassword:(params,successCallback)=>dispatch(updatePassword(params,successCallback))

 
})

export default connect( mapStateToProps,mapDispatchToProps)(ForgotPassword)

