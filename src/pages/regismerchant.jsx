import React, { Component, Fragment } from 'react';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import Axios from 'axios';
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
import { Link } from 'react-router-dom';

class RegisMerchant extends Component {
    state = { 
        belumpilih: true,
        langkah: '',
        linkdownload: 'https://bit.ly/397uJTM',
        langkah1selesai: false,
        langkah2selesai: false,
        modalmintaemail: false,
        modaltampilstatus: false,
        statusmerchant: ''
    }

    mintaemail=()=>{
        return(
            <Modal isOpen={this.state.modalmintaemail} toggle={()=>this.setState({modalmintaemail:false})}>
                {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Please insert your merchant name!</h4>
                    </div>
                    <div className="card-body">
                        <input type="text" ref='namecekstatus' placeholder="Merchant Name" className='form-control mt-2'/>
                    </div>
                </div>
                    <Button color="warning" onClick={this.cekstatus}>Submit</Button>
                    <Button color="secondary" onClick={()=>this.setState({modalmintaemail:false})}>Close</Button>
            </Modal>
        )
    }

    cekstatus=()=>{
        let namecekstatus = this.refs.namecekstatus.value
        console.log(namecekstatus)

        Axios.post(`http://localhost:4000/merchants/get-merchants_name`,{merchantname:namecekstatus})
        .then((res) => {
            console.log(res.data[0])
            if(res.data[0].status==='review'){
                this.setState({ 
                    langkah1selesai: true,
                    modaltampilstatus: true,
                    statusmerchant: 'UNDER REVIEW'
                })
            }
            else if(res.data[0].status==='active'){
                this.setState({ 
                    langkah1selesai: true,
                    langkah2selesai: true,
                    modaltampilstatus: true,
                    statusmerchant: 'ACTIVE'
                })
            }
            else if(res.data[0].status==='deleted'){
                this.setState({ 
                    modaltampilstatus: true,
                    statusmerchant: 'SUSPENDED'
                })
            }
            else{
                this.setState({ 
                    modaltampilstatus: true,
                    statusmerchant: 'UNREGISTERED'
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    tampilstatus=()=>{
        return(
            <Modal isOpen={this.state.modaltampilstatus} toggle={()=>this.setState({modaltampilstatus:false})}>
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">Status: <a style={{color: 'orange'}}>{this.state.statusmerchant}</a></h4>
                    </div>
                </div>
                    <Button color="secondary" onClick={()=>this.setState({modaltampilstatus:false})}>Cancel</Button>
            </Modal>
        )
    }

    awal=()=>{
        return(
            <Fragment>
                {this.mintaemail()}
                {this.tampilstatus()}
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({langkah:0, belumpilih: false})}}>
                        <div>
                            <h4 className="card-title"><a>Step 0</a></h4>
                            <p className="card-text"></p>
                        </div>
                    </button>
                    <button type="button" class="btn btn-outline-mdb-color waves-effect">
                        <div>
                            <h4 className="card-title"><a>Step 1</a></h4>
                            <p className="card-text"></p>
                        </div>
                    </button>
                    <button type="button" class="btn btn-outline-mdb-color waves-effect">
                        <div>
                            <h4 className="card-title"><a>Step 2</a></h4>
                            <p className="card-text"></p>
                        </div>
                    </button>
                    <button type="button" class="btn btn-outline-mdb-color waves-effect">
                        <div>
                            <h4 className="card-title"><a>Step 3</a></h4>
                            <p className="card-text"></p>
                        </div>
                    </button>
                </div>
                <div className="text-center mt-4">
                    <MDBBtn onClick={()=>{this.setState({ modalmintaemail:true })}} color="deep-orange" className="mb-4" type="submit" style={{width:'260px', height:'60px'}}>
                        Check Status
                    </MDBBtn>
                </div>
            </Fragment>
        )
    }

    langkah0=()=>{
        return(
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({langkah:0, belumpilih: true})}}>
                    <div>
                        <h4 className="card-title"><a>Step 0</a></h4>
                        <p className="card-text">Please pay attention to these instructions!</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({langkah:1, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Step 1</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect">
                    <div>
                        <h4 className="card-title"><a>Step 2</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect">
                    <div>
                        <h4 className="card-title"><a>Step 3</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
            </div>
        )
    }

    instruksi=()=>{
        return(
            <div className="mt-4">
                <h2>Please Pay a Carefull Attention!</h2>
                <div>
                    <h5 className="deskripsi mt-2">1. Fill Our Registeration Form</h5>
                    <h5 className="deskripsi">2. Wait for our reply @ 3x24 hours</h5>
                    <h5 className="deskripsi">3. We will check your kitchen and inform your suitability @ 7x24 hours</h5>
                    <h5 className="deskripsi">4. Fill out your package playlist & we're ready to go!</h5>
                </div>
                <p>Note: Regularly Check Your Application Status</p>
            </div>
        )
    }

    langkah1=()=>{
        return(
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({langkah:0, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Step 0</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({langkah:'', belumpilih: true})}}>
                    <div>
                        <h4 className="card-title"><a>Step 1</a></h4>
                        <p className="card-text">Kindly fill out the form and send to our email!</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({langkah:2, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Step 2</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect">
                    <div>
                        <h4 className="card-title"><a>Step 3</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
            </div>
        )
    }

    langkah2=()=>{
        return(
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({langkah:0, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Step 0</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({langkah:1, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Step 1</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({langkah:'', belumpilih: true})}}>
                    <div>
                        <h4 className="card-title"><a>Step 2</a></h4>
                        <p className="card-text">We will review your kitchen and give answer within 7@ 24 hours!</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({langkah:3, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Step 3</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
            </div>
        )
    }

    langkah3=()=>{
        return(
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({langkah:0, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Step 0</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({langkah:1, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Step 1</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({langkah:2, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Step 2</a></h4>
                        <p className="card-text"></p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({langkah:'', belumpilih: true})}}>
                    <div>
                        <h4 className="card-title"><a>Step 3</a></h4>
                        <p className="card-text">Yo're almost there!</p>
                    </div>
                </button>
            </div>
        )
    }

    render() {

        if(this.state.belumpilih===false && this.state.langkah1selesai===false && this.state.langkah===2){
            return(
                <div className="mb-5">
                    <div className="mb-3 subjudul">
                        <h2>Be a Part of Our Team!</h2>
                        {this.awal()}
                    </div>
                </div>
            )
        }
        else if(this.state.belumpilih===false && this.state.langkah2selesai===false && this.state.langkah===3){
            return(
                <div className="mb-5">
                    <div className="mb-3 subjudul">
                        <h2>Be a Part of Our Team!</h2>
                        {this.awal()}
                    </div>
                </div>
            )
        }
        else if(this.state.belumpilih){
            return ( 
                <div className="mb-5">
                    <div className="mb-3 subjudul">
                        <h2>Be a Part of Our Team!</h2>
                        {this.awal()}
                    </div>
                </div>
             );
        }
        else if(this.state.belumpilih===false && this.state.langkah===0){
            // console.log('masuk, tinggal print')
            return ( 
                <div className="mb-5">
                    <div className="mb-3 subjudul">
                        <h2>Be a Part of Our Team!</h2>
                        {this.langkah0()}
                        {this.instruksi()}
                    </div>
                </div>
             );
        }
        else if(this.state.belumpilih===false && this.state.langkah===1){
            return(
                <div className="mb-5">
                    <div className="mb-5 subjudul">
                        <h2>Be a Part of Our Team!</h2>
                        {this.langkah1()}
                        <h2 className="mt-4">Please Download from the Link Below!</h2>
                        <a href={this.state.linkdownload}>
                            <h5 style={{cursor:'pointer'}} className="deskripsi mt-3">Download Link</h5>
                        </a>
                        <div>
                            <h2 className="deskripsi">And Send to 
                                <a style={{cursor:'pointer'}} target="_blank" href="https://gmail.com" className="deskripsi"> cs.cateringmarket@gmail.com</a> 
                            </h2>
                            <h3 className="deskripsi">We will review your suitability within 3 @ 24 hours!</h3>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.belumpilih===false && this.state.langkah===1){
            return(
                <div className="mb-5">
                    <div className="mb-5 subjudul">
                        <h2>Be a Part of Our Team!</h2>
                        {this.langkah1()}
                        <h2 className="mt-4">Please Download from the Link Below!</h2>
                        <a href={this.state.linkdownload}>
                            <h5 style={{cursor:'pointer'}} className="deskripsi mt-3">Download Link</h5>
                        </a>
                        <div>
                            <h2 className="deskripsi">And Send to 
                                <a style={{cursor:'pointer'}} target="_blank" href="https://gmail.com" className="deskripsi"> cs.cateringmarket@gmail.com</a> 
                            </h2>
                            <h3 className="deskripsi">We will review your suitability within 3 @ 24 hours!</h3>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.belumpilih===false && this.state.langkah===2 && this.state.langkah1selesai){
            console.log('masuk')
            return(
                <div className="mb-5">
                    <div className="mb-3 subjudul">
                        <h2>Be a Part of Our Team!</h2>
                        {this.langkah2()}
                        <h2 className="mt-4">Please Check Your Email Regularly!</h2>
                        <h3 className="mt-4">Your application is on review!</h3>
                    </div>
                </div>
            )
        }
        else if(this.state.belumpilih===false && this.state.langkah===2 && this.state.langkah1selesai){
            // console.log('masuk')
            return(
                <div className="mb-5" style={{cursor:'none'}}>
                    <div className="mb-5 subjudul">
                        <h2>Be a Part of Our Team!</h2>
                        {this.langkah1()}
                        <h2 className="mt-4">Please Download from the Link Below!</h2>
                        <a href={this.state.linkdownload}>
                            <h5 style={{cursor:'pointer'}} className="deskripsi mt-3">Download Link</h5>
                        </a>
                        <div>
                            <h2 className="deskripsi">And Send to 
                                <a style={{cursor:'pointer'}} target="_blank" href="https://gmail.com" className="deskripsi"> cs.cateringmarket@gmail.com</a> 
                            </h2>
                            <h3 className="deskripsi">We will review your suitability within 3 @ 24 hours!</h3>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.belumpilih===false && this.state.langkah===3 && this.state.langkah1selesai && this.state.langkah2selesai){
            return(
                <div className="mb-5">
                    <div className="mb-5 subjudul">
                        <Link to="/managemerchant">
                            <h2>You Are One of Us!</h2>
                            <h3>Fill your menus and starts to sell!</h3>
                        </Link>
                    </div>
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
 
export default connect(MapstateToprops, {LoginSuccessAction}) (RegisMerchant);