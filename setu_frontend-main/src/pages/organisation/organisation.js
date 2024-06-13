

import './styles.css'
import React ,{useEffect, useState} from 'react';
import {useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkOrganisation } from '../../reduxStore/actions/action';
function Organisation({organisation,checkOrganisation}) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orgId = searchParams.get('orgId');
    const history = useHistory();
    const [loading,setLoading]=useState(true);
    useEffect(() => {

      checkOrganisation({id:orgId},()=>{
        setLoading(false);
        history.push('/setu_game/login');
      },()=>{
        setLoading(false);
      })
    }, [orgId]);
 
    return (
        <>
  

        <div className='component-wrapper'>
        <div className='notfound-container'>
        <h1>{loading?"Loading...":"404! Page Not Found"}</h1>
        </div>    
        </div>

      
        </>
    )
}


const mapStateToProps = state => {
    const {organisation}  = state.SeTu;
  
  return { organisation}
  }
  
  
  const mapDispatchToProps = dispatch =>  ({
    checkOrganisation: (params,successCallback,callback) => dispatch( checkOrganisation(params,successCallback,callback)),
   
  })
  
  export default connect( mapStateToProps,mapDispatchToProps)(Organisation)
