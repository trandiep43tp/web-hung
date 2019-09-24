import React from "react";
import { connect } from 'react-redux';
import {  compose } from 'redux';  //cách gọi action mới
import loadingIcon from '../../assets/images/loading-3.gif';

const Globalloading = props => {
  const { loading } = props;
  let xhtml = null;
  if(loading){
      xhtml = (
        <div className="col-lg-9" >
            <img src = {loadingIcon} style = {styles.icon}   alt= "loading"/>
        </div>
      );
  }  
  return xhtml;
}; 

const styles = {
    globalloading: {        
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 99,
        backgroundColor: "rgba(242, 242, 242, 1)"
       
    },
    icon: {
        position: "fixed",
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        top: "30%",
        width: 100
    }
}
const mapStatetoProps = state => {
    return {
        loading: state.loading
    }
}

const withConnect = connect(mapStatetoProps, null);
export default compose(   
    withConnect
)(Globalloading);

