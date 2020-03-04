import React, { Component } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
// import { isValidPhoneNumber } from 'react-phone-number-input'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import { Redirect, Link } from 'react-router-dom'
import Axios from 'axios';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import {
    MDBBtn
  } from "mdbreact";

class Profilesetting extends Component {
    state = {
        datauser: [],
        loading: true,
        telponawal: "Enter a Phone Number",
        firstname: '',
        lastname: '',
        username: '',
        phone: '',
        email: '',
        fulladdress: '',
        city: '',
        modalRedirectLogin: false
     }

     componentDidMount(){
        let id = localStorage.getItem('dino')
        Axios.get(`http://localhost:4000/users/get-userid/${id}`)
        .then((res) => {
          console.log(res.data[0])
          this.setState({datauser:res.data[0], loading: false})
        }).catch((err) => {
          console.log(err)
        })
      }

    firstnamechange=(e)=>{
        this.setState({firstname: e.target.value})
    }

    lastnamechange=(e)=>{
        this.setState({lastname: e.target.value})
    }

    usernamechange=(e)=>{
        this.setState({username:e.target.value})
    }

    emailchange=(e)=>{
        this.setState({email: e.target.value})
    }

    addresschange=(e)=>{
        this.setState({fulladdress: e.target.value})
    }

    citychange=(e)=>{
        this.setState({city: e.target.value})
    }

    submit=(e)=>{
        e.preventDefault()
        
        let updated = {
            first: this.state.firstname ||this.props.Auth.first,
            last: this.state.lastname ||this.props.Auth.last,
            username: this.state.username ||this.props.Auth.username,
            phone: this.state.phone ||this.props.Auth.phone,
            email: this.state.email ||this.props.Auth.email,
            fulladdress: this.state.fulladdress ||this.props.Auth.fulladdress,
            city: this.state.city ||this.props.Auth.city,
            roleid: this.props.Auth.roleid,
            password: this.props.Auth.password,
            login: 1
        }
        console.log(updated)
        
        Axios.put(`http://localhost:4000/users/edit-users_tanpapass/${this.props.Auth.id}`,updated)
        .then((res)=>{
            console.log(res.data)
            Axios.post(`http://localhost:4000/users/get-userid/${this.props.Auth.id}`)
            .then((res1) => {
            console.log(res1.data[0])
            this.setState({datauser:res1.data[0], loading: false, modalberhasil: true})
            }).catch((err) => {
            console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() {
        
        if(this.props.Auth.id===''){
            return(
                <div className="mb-5">
                    Page 404 not found
                </div>
            )
        }

        if(this.state.loading){
            return(
                <div className="mb-5">
                    Loading...
                </div>
            )
        }

        return (
            <div style={{marginLeft:'20vh'}} className="mb-5 d-flex justify-content-around">

                <Modal isOpen={this.state.modalberhasil}>
                    <ModalHeader style={{backgroundColor:'#ff8364'}}>
                        <div>
                            Profile Successfully Saved!
                        </div>
                    </ModalHeader>
                        <Link to={'/'}>
                            <Button color="warning" style={{width:'97%'}}>Oke!</Button>
                        </Link>
                </Modal>

                <div>
                    <form className="w-75">
                    <h3 className='mb-4'>Profile Setting</h3>
                    <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label>First name</label>
                        <input onChange={this.firstnamechange} defaultValue={this.state.datauser.first} type="text" className="form-control" placeholder="First name" required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Last name</label>
                        <input onChange={this.lastnamechange} defaultValue={this.state.datauser.last}  type="text" className="form-control" placeholder="Last name" required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationServerUsername33">Username</label>
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupPrepend33">@</span>
                        </div>
                        <input onChange={this.usernamechange} defaultValue={this.state.datauser.username} type="text" className="form-control" placeholder="Username" aria-describedby="inputGroupPrepend33" required />
                        </div>
                    </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationServer013">Phone Number</label>
                            {/* <input type="number" className="form-control is-valid" id="validationServer013" placeholder="First name" defaultValue="Mark" required /> */}
                            <PhoneInput
                            placeholder={this.state.phone || this.props.Auth.phone}
                            defaultValue={this.state.phone || this.props.Auth.phone || this.state.telponawal}
                            value={this.state.phone}
                            onChange={phone => this.setState({ phone })}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Email</label>
                            <input onChange={this.emailchange} defaultValue={this.state.datauser.email} type="email" className="form-control" placeholder="First name" required />
                        </div>
                        
                    </div>

                    <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label>Full Address</label>
                        <input onChange={this.addresschange} defaultValue={this.state.datauser.fulladdress} type="text" className="form-control" placeholder="Full Address" required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>City</label>
                        <input onChange={this.citychange} defaultValue={this.state.datauser.city} type="text" className="form-control" placeholder="City" required />
                    </div>
                    </div>
                    <div className="d-flex flex-column">
                        <MDBBtn onClick={this.submit} color="deep-orange" className="mb-4" type="submit">
                            Save Profile
                        </MDBBtn>
                    </div>
                </form>
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
 
export default connect(MapstateToprops, {LoginSuccessAction}) (Profilesetting) ;