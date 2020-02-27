import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'

class WaitingVerification extends Component {
    state = {  }

    onBtnResendEmailClick=()=>{
        // console.log(`http://localhost:2033/user/resendemailver`)
        Axios.post(`http://localhost:2033/user/resendemailver`,{
            username: this.props.username,
            email: this.props.email
        }).then((res)=>{
            console.log(res.data)
            alert('email berhasil')
        }).catch((err)=>{
            console.log(err)
        })

    }

    render() { 
        return ( 
            <div>
                cek aja dulu
            </div>
         );
    }
}
 
export default WaitingVerification;