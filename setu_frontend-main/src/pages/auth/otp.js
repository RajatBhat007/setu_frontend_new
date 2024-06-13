import {Form, Input,Button} from 'antd'
import './styles.css'
import React ,{memo,useEffect,useState} from 'react';
import setuLogo from '../../assets/setuLogo.png';
import { setIsOtpSent,resendOtp } from '../../reduxStore/actions/action';
import { connect } from 'react-redux';

function Otp({ title,handleVerifyOtp, setIsOtpSent,resendOtp,isOtpSent }) {

    const [isResendBlocked, setIsResendBlocked] = useState(false);
  
    useEffect(() => {
      let timer;
      if (isOtpSent?.timer > 0) {
        timer = setInterval(() => {
          setIsOtpSent({"otpSent":true,"timer":(isOtpSent.timer-1)})
        }, 1000);
      } else {
        setIsResendBlocked(false);
      }
  
      return () => clearInterval(timer);
    }, [isOtpSent?.timer]);
  
    const handleResend = () => {
      // Implement resend logic here
      resendOtp(()=>{

      })
   

    };

    const handleOtpSubmit=(value)=>{

        handleVerifyOtp(value?.otp);
    }
  
    return (
      <div className='component-wrapper'>
        <div className='form-container'>
          <img src={setuLogo} className='logo-img' />
          <span className='form-heading'>{title}</span>
          <p className='form-text'>Your one time password has been sent.</p>
          <div className='form-wrapper'>
            <Form layout="vertical" className='setu-form' autoComplete='off' onFinish={handleOtpSubmit}>
              <Form.Item
                className='form-item'
                name="otp"
                
                rules={[
                  {
                    required: true,
                    message: 'Please enter OTP!',
                  },
                ]}
              >
                <Input className='form-input' placeholder='Enter OTP' />
              </Form.Item>
              <Form.Item>
                <Button className='form-submit-btn' htmlType='submit'>
                  Verify
                </Button>
              </Form.Item>
            </Form>
            <div className='form-link'>
              {isOtpSent?.timer > 0 ? (
                <p>Did not get OTP? <a style={{cursor: "not-allowed"}} disabled={isResendBlocked}>Resend</a>:{isOtpSent?.timer}s</p>
              ) : (
                <p>Did not get OTP? <a onClick={handleResend} disabled={isResendBlocked}>Resend</a></p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const mapStateToProps = state => {
    const {
  isOtpSent
  }  = state.SeTu;
  
  return { isOtpSent}
  }
  
  
  const mapDispatchToProps = dispatch =>  ({

    setIsOtpSent:(val)=>dispatch(setIsOtpSent(val)),
    resendOtp:(successCallback)=>dispatch(resendOtp(successCallback))
   
  })
  
  export default connect( mapStateToProps,mapDispatchToProps)(Otp)

