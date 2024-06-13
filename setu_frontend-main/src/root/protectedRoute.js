
import { connect } from 'react-redux';
import React ,{useEffect,useRef, useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect , useLocation,useParams } from "react-router-dom";
import NotFound from '../pages/notfound/notfound';
import { setIsOtpSent, setPrevUrl ,setOtpVerified} from '../reduxStore/actions/action';
import Organisation from '../pages/organisation/organisation';
const PrivateRoute = ({ setIsOtpSent,setOtpVerified,setPrevUrl,handleOrientationChange,prevUrl,isAuthenticated,organisation, component: Component, ...rest}) => {


    const location = useLocation();
 
    if(prevUrl!='/setu_game/signup' && prevUrl!='/setu_game/forgot-password'){
        setIsOtpSent()
        
    }

    if(prevUrl!=='/setu_game/forgot-password'){
        setOtpVerified()
    }
    const searchParams = new URLSearchParams(location.search);
    const orgId = searchParams.get('orgId');

  // Update the previous URL whenever the location changes
     setPrevUrl(location.pathname);


   const isAuthRoute=['/setu_game/login', '/setu_game/signup', '/setu_game/forgot-password'].includes(location.pathname);
   if(!organisation && !orgId){
   return <Route component={NotFound} />
   }


   if(orgId){
 
    return <Route component={Organisation} />
   }
 

      return  <Route
         {...rest}
         render={(props) => (
     
             isAuthRoute?
              isAuthenticated ? 
             <Redirect to='/setu_game' />:
             <Component {...props}  handleOrientationChange={handleOrientationChange}/>
             :
             isAuthenticated?
             <Component {...props}  handleOrientationChange={handleOrientationChange}/>
             : <Redirect to='/setu_game/login' />
         )}
       />
   
       };
   
   const mapStateToProps = state => ({
       
       isAuthenticated: state?.SeTu?.auth,
       organisation: state?.SeTu?.organisation,
       prevUrl:state?.SeTu?.prevUrl
   
   });
   const mapDispatchToProps = dispatch =>  ({
    setIsOtpSent:(val)=>dispatch(setIsOtpSent(val)),
    setPrevUrl:(val)=>dispatch(setPrevUrl(val)),
    setOtpVerified:(val)=>dispatch(setOtpVerified(val))


   
  })


   export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);