import React, { Component } from 'react';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBModalFooter,
    MDBIcon,
    MDBCardHeader,
    MDBBtn
  } from "mdbreact";
import Axios from 'axios';

class GantiPassword extends Component {
    state = {
        datauser: [],
        passerror:false,
        modalberhasil:false
    }

    componentDidMount(){
        let idgantipass = this.props.match.params.id

        Axios.get(`http://localhost:4000/users/get-userid/${idgantipass}`)
        .then((res) => {
            console.log(res.data)
            this.setState({datauser:res.data[0]})
        }).catch((err) => {
            console.log(err)
        })
    }

    onPassChange =()=>{
        var newpass = this.refs.pass.value
        var konfpassword = this.refs.konfpass.value

        // console.log({...this.state.datauser, password:newpass})
        
        if(newpass!==konfpassword){
            this.setState({ passerror:true })
        }
        else{
            Axios.put(`http://localhost:4000/users/edit-users/${this.props.match.params.id}`,{...this.state.datauser, password:newpass})
            .then((res) => {
                console.log(res.data)
                this.setState({ modalberhasil:true })
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    render() { 
        return ( 
            <div>
            <div class="container">

                <Modal isOpen={this.state.modalberhasil} toggle={()=>this.setState({modalberhasil:false})}>
                    <ModalHeader style={{backgroundColor:'#b21f66'}}>
                        Password Successfully Changed!
                    </ModalHeader>
                        <Link to={'/'}>
                            <Button color="warning" style={{width:'490px'}}>Oke!</Button>
                        </Link>
                </Modal>

                <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center mb-4">Change Password</h5>
                        <form class="form-signin">
        
                        <label
                            htmlFor="defaultFormPasswordEx"
                            className="grey-text font-weight-light"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="defaultFormPasswordEx"
                            className="form-control text-center mb-3"
                            ref = "pass"
                        />
                        <label
                            htmlFor="defaultFormPasswordEx"
                            className="grey-text font-weight-light"
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="defaultFormPasswordEx"
                            className="form-control text-center"
                            ref = "konfpass"
                        />

                        <hr class="my-4" />
                        </form>
                        {this.state.passerror===false?
                            null:
                            <div className='alert alert-danger'>
                                Password do not match!
                                <span onClick={()=>this.setState({passerror:false})} className='float-right font-weight-bold'>X</span>
                            </div>
                        }
                        <MDBBtn onClick={this.onPassChange} color="deep-orange" className="mb-4" type="submit" style={{width:'260px', height:'60px'}}>
                          Submit
                        </MDBBtn>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
         );
    }
}

const MapstateToprops =(state)=>{
    return{
        Auth: state.Auth
    }
}

export default connect(MapstateToprops, {LoginSuccessAction}) (GantiPassword);