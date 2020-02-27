import React, { Component } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn
} from "mdbreact";
import Axios from 'axios'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'

class Register extends Component{
    state={
        passerror : false,
        usernameerror : false,
        emailerror : false,
        modalberhasil : false,
        emailfberror : false,
        modalmintapassfb: false,
        datafb: '',
        passfberror: false
    }

    registerclick=()=>{
        var username = this.refs.username.value
        var email = this.refs.email.value
        var pass = this.refs.pass.value
        var konfpass = this.refs.konfpass.value

        // console.log(username)
        // console.log(email)
        // console.log(pass)
        // console.log(konfpass)

        let cekuser = {
            username
        }
        let cekemail = {
            email
        }

        let password = pass
        let userbaru = {
            username,
            email,
            password,
            roleid:2
        }
        // console.log(userbaru)

        if(pass!==konfpass){
            this.setState({passerror: true})
        }else{
            Axios.post(`http://localhost:4000/users/get-username`,cekuser)
            .then((res)=>{

                console.log(res.data)

                if(res.data.length){
                    this.setState({usernameerror: true})
                }else{
                    Axios.post(`http://localhost:4000/users/get-email`,cekemail)
                    .then((res1)=>{
                        if(res1.data.length){
                            this.setState({emailerror: true})
                        }else{
                            Axios.post(`http://localhost:4000/users/add-users`,userbaru)
                            .then((res2)=>{
                                console.log(res2.data)
                                this.setState({modalberhasil: true})
                            }).catch((err)=>{
                                console.log(err)
                            })
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    responseFacebook =(res)=>{

        let username = res.name
        let email = res.email

        let userbaru = {
            username,
            email
        }

        // console.log(userbaru)

        Axios.post(`http://localhost:4000/users/get-email`,{email})
        .then((res) => {
            console.log(res.data)
            if(res.data.length){
                this.setState({emailfberror: true})
            }
            else{
                this.setState({ modalmintapassfb:true, datafb:userbaru })
            }
        }).catch((err) => {
            console.log(err)
        })
     }

     registerclickfb=()=>{
        let userbaru = ({...this.state.datafb, password:this.refs.passfb.value, roleid:2})
        // console.log(userbaru)

        if(this.refs.passfb.value!==this.refs.konfpassfb.value){
            this.setState({passfberror: true})
        }
        else{
            Axios.post(`http://localhost:4000/users/add-users`,userbaru)
            .then((res)=>{
                console.log(res.data)
                this.setState({modalberhasil: true})
            }).catch((err)=>{
                console.log(err)
            })
        }
     }

    render(){
        return (
            <div style={{marginRight:'0%', marginLeft:'25%'}}>

                <Modal isOpen={this.state.modalberhasil} toggle={()=>this.setState({modalberhasil:false})}>
                    <ModalHeader style={{backgroundColor:'#ff8364'}}>
                        <div>
                            Register Success!
                        </div>
                    </ModalHeader>
                        <Link to={'/'}>
                            <Button color="warning" style={{width:'97%'}}>Oke!</Button>
                        </Link>
                </Modal>

                <Modal isOpen={this.state.modalmintapassfb} toggle={()=>this.setState({modalmintapassfb:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Please insert a password for your account</h4>
                        </div>
                        <div className="card-body">
                            <input type="password" ref='passfb' placeholder="password" className='form-control mt-2'/>
                            <input type="password" ref='konfpassfb' placeholder="password confirmation" className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={this.registerclickfb}>Submit</Button>
                        <Button color="secondary" onClick={()=>this.setState({modalmintapassfb:false})}>Close</Button>
                </Modal>

              <MDBContainer className="mb-5">
              <MDBRow>
                  <MDBCol md="8">
                  <MDBCard>
                      <MDBCardBody>
                      <MDBCardHeader className="form-header warm-flame-gradient rounded mb-3">
                          <h3 className="my-3">
                          <MDBIcon icon="lock" /> Register:
                          </h3>
                      </MDBCardHeader>
      
                      <label
                          htmlFor="defaultFormEmailEx"
                          className="grey-text font-weight-light"
                      >
                          Username
                      </label>
                      <input
                          type="text"
                          id="defaultFormEmailEx"
                          className="form-control text-center"
                          ref="username"
                      />
      
                      <label
                          htmlFor="defaultFormEmailEx"
                          className="grey-text font-weight-light"
                      >
                          Your email
                      </label>
                      <input
                          type="email"
                          id="defaultFormEmailEx"
                          className="form-control text-center"
                          ref="email"
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
                          ref="pass"
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
                          ref="konfpass"
                      />
      
                      <div className="text-center mt-4">
                          <MDBBtn onClick={()=>this.registerclick()} color="deep-orange" className="mb-4" type="submit" style={{width:'260px', height:'60px'}}>
                          Register
                          </MDBBtn>
                      </div>
                      {this.state.passerror===false?null:
                          <div className='alert alert-danger'>
                              Password do not match!
                              <span onClick={()=>this.setState({passerror:false})} className='float-right font-weight-bold' style={{cursor:'pointer'}}>X</span>
                          </div>
                      }
                      {this.state.usernameerror===false?null:
                          <div className='alert alert-danger'>
                              Username taken!
                              <span onClick={()=>this.setState({usernameerror:false})} className='float-right font-weight-bold' style={{cursor:'pointer'}}>X</span>
                          </div>
                      }
                      {this.state.emailerror===false?null:
                          <div className='alert alert-danger'>
                              Email already used!
                              <span onClick={()=>this.setState({emailerror:false})} className='float-right font-weight-bold' style={{cursor:'pointer'}}>X</span>
                          </div>
                      }
                        <p>Or Register with Facebook:</p>
                        <FacebookLogin
                            datasize="small"
                            appId="786000258571405"
                            autoLoad={false}
                            fields="name,email"
                            callback={this.responseFacebook} 
                        />
                        <div className="mt-3">
                            {this.state.emailfberror===false?null:
                                <div className='alert alert-danger'>
                                    Facebook already registered!
                                    <span onClick={()=>this.setState({emailfberror:false})} className='float-right font-weight-bold' style={{cursor:'pointer'}}>X</span>
                                </div>
                            }
                            {this.state.passfberror===false?null:
                                <div className='alert alert-danger'>
                                    Password do not match!
                                    <span onClick={()=>this.setState({passfberror:false})} className='float-right font-weight-bold' style={{cursor:'pointer'}}>X</span>
                                </div>
                            }
                        </div>
                      </MDBCardBody>
                  </MDBCard>
                  </MDBCol>
              </MDBRow>
              </MDBContainer>
            </div>
        );
    }
};

export default Register;