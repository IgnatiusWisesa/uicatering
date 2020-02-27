import React, { Component } from 'react';
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
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import Axios from 'axios';

class Login extends Component{
    state = { 
        username: '',
        email: '',
        photo: '',
        err: false,
        modalberhasil: false,
        modalberhasilmerchant: false,
        modalberhasiladmin: false,
        mintapass: false,
        modalmintaemail: false,
        modalkeregister: false,
        modalgantipassberhasil: false
    }

     onloginclicked =()=>{
        var emailusername = this.refs.emailusername.value
        var pass = this.refs.pass.value
        let userlogin = ''

        if(emailusername.split('@').length>1){
            userlogin = {
                email: emailusername,
                password: pass,
                login: 1
            }
        }
        else{
            userlogin = {
                username: emailusername,
                password: pass,
                login: 1
            }
        }

        console.log(userlogin)

        Axios.post(`http://localhost:4000/users/get-unp`, userlogin)
        .then((res)=>{
            console.log(res.data)
            if(res.data.length){
                Axios.put(`http://localhost:4000/users/edit-users_tanpapass/${res.data[0].id}`,{...res.data[0],login:1})
                .then((res1) => {
                    console.log(res1.data)
                    localStorage.setItem('dino',res.data[0].id)
                    this.props.LoginSuccessAction(res.data[0])
                    if(res.data[0].roleid===2){
                        this.setState({modalberhasil:true})
                    }
                    else if(res.data[0].roleid===3){
                        this.setState({modalberhasilmerchant:true})
                    }
                    else if(res.data[0].roleid===1){
                        this.setState({modalberhasiladmin:true})
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
            else{
                this.setState({err: true})
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    gantipass=()=>{
        let email = this.refs.emailgantipass.value

        Axios.post(`http://localhost:4000/users/get-email`, {email})
        .then((res) => {
            if(res.data.length){
                console.log(res.data[0].id)
                Axios.post(`http://localhost:4000/users/sendmail-changepass/${res.data[0].id}`,{email})
                .then((res) => {
                    this.setState({ modalgantipassberhasil:true })
                }).catch((err) => {
                    console.log(err)
                })
            }
            else{
                this.setState({ modalkeregister:true })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    render(){
        return (
            <div style={{marginRight:'0%', marginLeft:'25%'}}>

                <Modal isOpen={this.state.modalgantipassberhasil}>
                    <div className="card">
                        <div className="card-body">
                        <h4 className="card-title">We have sent a link to your email</h4>
                        </div>
                    </div>
                    <center>
                        <Link style={{color:'white'}} to={'/'}>
                            <Button color="warning" >
                                Okay
                            </Button>
                        </Link>
                    </center>
                </Modal>

                <Modal isOpen={this.state.modalkeregister} toggle={()=>this.setState({modalkeregister:false})}>
                    <div className="card">
                        <div className="card-body">
                        <h4 className="card-title">You Have not Been Registered, yet!</h4>
                        </div>
                    </div>
                        <Button color="warning" >
                            <Link style={{color:'white'}} to={'/register'}>
                                Go to register page
                            </Link>
                        </Button>
                        <Button color="secondary" onClick={()=>this.setState({modalkeregister:false})}>Cancel</Button>
                </Modal>

                <Modal isOpen={this.state.modalmintaemail} toggle={()=>this.setState({modalmintaemail:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Please insert your registered email</h4>
                        </div>
                        <div className="card-body">
                            <input type="text" ref='emailgantipass' placeholder="email" className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={this.gantipass}>Submit</Button>
                        <Button color="secondary" onClick={()=>this.setState({modalmintaemail:false})}>Close</Button>
                </Modal>

                <Modal isOpen={this.state.mintapass} toggle={()=>this.setState({mintapass:false})}>
                    <ModalHeader style={{backgroundColor:'#ff8364'}}>
                        <div>
                            Login Success!
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <label
                            htmlFor="defaultFormPasswordEx"
                            className="grey-text font-weight-light"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="defaultFormPasswordEx"
                            className="form-control text-center"
                            ref="passfb"
                        />
        
                        <label
                            htmlFor="defaultFormPasswordEx"
                            className="grey-text font-weight-light"
                        >
                            Confirm password
                        </label>
                        <input
                            type="password"
                            id="defaultFormPasswordEx"
                            className="form-control text-center"
                            ref="konfpassfb"
                        />
                    </ModalBody>
                    {this.state.errpassfb===false?null:
                          <div className='alert alert-danger'>
                              Password do not match!
                              <span onClick={()=>this.setState({errpassfb:false})} className='float-right font-weight-bold' style={{cursor:'pointer'}}>X</span>
                          </div>
                      }
                        <Button onClick={this.registerFacebook} color="warning" style={{width:'97%'}}>Oke!</Button>
                </Modal>

                <Modal isOpen={this.state.modalberhasil} toggle={()=>this.setState({modalberhasil:false})}>
                    <ModalHeader style={{backgroundColor:'#ff8364'}}>
                        <div>
                            Login Success!
                        </div>
                    </ModalHeader>
                        <Link to={'/'}>
                            <Button color="warning" style={{width:'97%'}}>Oke!</Button>
                        </Link>
                </Modal>

                <Modal isOpen={this.state.modalberhasilmerchant} toggle={()=>this.setState({modalberhasilmerchant:false})}>
                    <ModalHeader style={{backgroundColor:'#ff8364'}}>
                        <div>
                            Login Success!
                        </div>
                    </ModalHeader>
                        <Link to={'/managemerchant'}>
                            <Button color="warning" style={{width:'97%'}}>Oke!</Button>
                        </Link>
                </Modal>

                <Modal isOpen={this.state.modalberhasiladmin} toggle={()=>this.setState({modalberhasiladmin:false})}>
                    <ModalHeader style={{backgroundColor:'#ff8364'}}>
                        <div>
                            Login Success!
                        </div>
                    </ModalHeader>
                        <Link to={'/managemerchantSA'}>
                            <Button color="warning" style={{width:'97%'}}>Oke!</Button>
                        </Link>
                </Modal>

              <MDBContainer className="mb-5">
              <MDBRow>
                  <MDBCol md="8">
                  <MDBCard>
                      <MDBCardBody>
                      <MDBCardHeader className="form-header warm-flame-gradient rounded mb-3">
                          <h3 className="my-3">
                          <MDBIcon icon="lock" /> Login:
                          </h3>
                      </MDBCardHeader>
                      <label
                          htmlFor="defaultFormEmailEx"
                          className="grey-text font-weight-light"
                      >
                          Your email/ username
                      </label>
                      <input
                          type="email"
                          id="defaultFormEmailEx"
                          className="form-control text-center"
                          ref = "emailusername"
                      />
      
                      <label
                          htmlFor="defaultFormPasswordEx"
                          className="grey-text font-weight-light"
                      >
                          Your password
                      </label>
                      <input
                          type="password"
                          id="defaultFormPasswordEx"
                          className="form-control text-center"
                          ref = "pass"
                      />

                    <div className="mt-3">
                      {this.state.err===false?null:
                          <div className='alert alert-danger'>
                              Username/ Password do not match!
                              <span onClick={()=>this.setState({err:false})} className='float-right font-weight-bold' style={{cursor:'pointer'}}>X</span>
                          </div>
                      }
                    </div>

                      <div className="text-center mt-4">
                          <MDBBtn onClick={this.onloginclicked} color="deep-orange" className="mb-4" type="submit" style={{width:'260px', height:'60px'}}>
                          Login
                          </MDBBtn>
                          <br></br>
                      </div>
      
                      <MDBModalFooter>
                          <div className="font-weight-light">
                          <p>Not a member? 
                            <Link to={'/register'}>
                              <a style={{cursor:'pointer'}}> Sign Up</a>
                            </Link>
                          </p>
                          <Link>
                            <p onClick={()=>{this.setState({ modalmintaemail:true })}} style={{cursor:'pointer'}}>Forgot Password?</p>
                          </Link>
                          </div>
                      </MDBModalFooter>

                      </MDBCardBody>
                  </MDBCard>
                  </MDBCol>
              </MDBRow>
              </MDBContainer>
            </div>
        );
    }
  
};

const MapstateToprops =(state)=>{
    return{
        Auth: state.Auth
    }
}

export default connect(MapstateToprops, {LoginSuccessAction}) (Login);