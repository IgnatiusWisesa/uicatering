import React, { Component } from 'react';
import Slider from "react-slick";
import Carouselhome from '../components/HomeComponents/carouselhome';
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
 
const mql = window.matchMedia(`(min-width: 800px)`);

class ManageMerchant extends Component {
    state = {
      }
    
      render() {
        if(this.props.Auth.roleid===3){
          return (
            <div>
              <div style={{position: 'absolute', top: '500px', left: 0, right: '1080px', bottom: 0}} className="mt-5">
                  <h1 style={{color:'orange'}} className="welcomemerchant">Welcome to Merchant Page, {this.props.Auth.username}!</h1>
              </div>
            </div>
          )
        }
        else{
          return(
            <div className="mb-5">
              Page 404
            </div>
          )
        }
      }
}

const MapstateToprops =(state)=>{
  return{
      Auth: state.Auth
  }
}
 
export default connect(MapstateToprops, {LoginSuccessAction}) (ManageMerchant);