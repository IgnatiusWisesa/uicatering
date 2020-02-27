import React, { Component } from 'react';
import Axios from 'axios';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'

class ManageMerchantSA extends Component {
    state = { 
        datamerchant: [],
        datamerchantreviewed: [],
        datamerchantdeleted: [],
        loading: true,
        modaltambahmerchant: false,
        modalsudahdireview: false,
        modalisireviewed: false,
        namareviewed: '',
        ireviewed: -1,
        IDreviewed: -1,
        modalkepastianhapus: false,
        namahapus: '',
        ihapus: -1,
        IDhapus: -1,
        modalreaktivasi: false,
        namareaktivasi: '', 
        ireaktivasi: -1, 
        IDreaktivasi: -1
     }

    componentDidMount(){
        Axios.get('http://localhost:4000/merchants/get-merchants_active')
        .then((res)=>{
            console.log(res.data)
            Axios.get(`http://localhost:4000/merchants/get-merchants_reviewed`)
            .then((res1) => {
                console.log(res1.data)
                Axios.get(`http://localhost:4000/merchants/get-merchants_deleted`)
                .then((res2) => {
                    console.log(res2.data)
                    this.setState({
                        datamerchant: res.data,
                        datamerchantreviewed: res1.data,
                        datamerchantdeleted: res2.data,
                        loading: false
                    })
                })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    hapus=(index)=>{
        this.setState({ indexhapus:index, modalkepastianhapus:true, namahapus: this.state.datamerchant[index-1].name})
    }

    pastihapus=()=>{
        let merchanthapus = {...this.state.datamerchant[this.state.ihapus], status:'deleted' }

        // console.log(merchanthapus)

        Axios.put(`http://localhost:4000/merchants/edit-merchants/${this.state.IDhapus}`,merchanthapus)
        .then((res0) => {
            console.log(res0.data)
            Axios.get('http://localhost:4000/merchants/get-merchants_active')
            .then((res)=>{
                console.log(res.data)
                Axios.get(`http://localhost:4000/merchants/get-merchants_reviewed`)
                .then((res1) => {
                    console.log(res1.data)
                    Axios.get(`http://localhost:4000/merchants/get-merchants_deleted`)
                    .then((res2) => {
                        console.log(res2.data)
                        this.setState({
                            datamerchant: res.data,
                            datamerchantreviewed: res1.data,
                            datamerchantdeleted: res2.data,
                            modalkepastianhapus: false
                        })
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    addmerchant=()=>{
        let name = this.refs.name.value
        let Manager = this.refs.Manager.value
        let PhotoManager = this.refs.PhotoManager.value
        let Kitchen = this.refs.Kitchen.value
        let Staff = this.refs.Staff.value
        let Specialcook = this.refs.Specialcook.value
        let Photocook = this.refs.Photocook.value

        let merchantbaru = {
            name,
            Manager,
            PhotoManager,
            Kitchen,
            Staff,
            Specialcook,
            Photocook,
            status:'review'
        }
        
        Axios.post(`http://localhost:4000/merchants/add-merchants`, merchantbaru)
        .then((res)=>{
            Axios.get('http://localhost:4000/merchants/get-merchants_active')
            .then((res)=>{
                console.log(res.data)
                Axios.get(`http://localhost:4000/merchants/get-merchants_reviewed`)
                .then((res1) => {
                    console.log(res1.data)
                    Axios.get(`http://localhost:4000/merchants/get-merchants_deleted`)
                    .then((res2) => {
                        console.log(res2.data)
                        this.setState({
                            datamerchant: res.data,
                            datamerchantreviewed: res1.data,
                            datamerchantdeleted: res2.data,
                            modaltambahmerchant: false
                        })
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    reviewed=()=>{
        // console.log('masuk reviewed')
        let merchantbaru = {...this.state.datamerchantreviewed[this.state.ireviewed], status:'active' }

        let usernameNM = this.refs.usernameNM.value
        let passwordNM = this.refs.passwordNM.value
        let emailNM = this.refs.emailNM.value

        let datamerchantbaru={
            usernameNM,
            passwordNM,
            emailNM
        }

        // console.log(this.state.IDreviewed)

        let userbaru={
            username:usernameNM,
            password:passwordNM,
            email:emailNM,
            roleid:3,
            merchantid:this.state.IDreviewed
        }
        console.log(datamerchantbaru)

        Axios.put(`http://localhost:4000/merchants/edit-merchants/${this.state.IDreviewed}`,merchantbaru)
        .then((res) => {
            Axios.post(`http://localhost:4000/merchants/sendmail-merchant`,datamerchantbaru)
            .then((res1) => {
                console.log(res1.data)
                Axios.get(`http://localhost:4000/merchants/get-merchants_active`)
                .then((res2) => {
                    console.log(res2.data)
                    Axios.post(`http://localhost:4000/users/add-users`,userbaru)
                    .then((res3) => {
                        console.log(res3.data)
                        Axios.get(`http://localhost:4000/merchants/get-merchants_reviewed`)
                        .then((res4) => {
                            this.setState({ 
                                datamerchant:res2.data,
                                datamerchantreviewed: res4.data,
                                modalsudahdireview: false, 
                                modalisireviewed:false })
                        }).catch((err) => {
                            console.log(err)
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    reaktivasi=()=>{
        // console.log('masuk reaktivasi')

        let merchantreaktivasi = {...this.state.datamerchantdeleted[this.state.ireaktivasi], status:'active' }
        // console.log(merchantreaktivasi)
        
        Axios.put(`http://localhost:4000/merchants/edit-merchants/${this.state.IDreaktivasi}`,merchantreaktivasi)
        .then((res0) => {
            console.log(res0.data)
            Axios.get('http://localhost:4000/merchants/get-merchants_active')
            .then((res)=>{
                console.log(res.data)
                Axios.get(`http://localhost:4000/merchants/get-merchants_reviewed`)
                .then((res1) => {
                    console.log(res1.data)
                    Axios.get(`http://localhost:4000/merchants/get-merchants_deleted`)
                    .then((res2) => {
                        console.log(res2.data)
                        this.setState({
                            datamerchant: res.data,
                            datamerchantreviewed: res1.data,
                            datamerchantdeleted: res2.data,
                            modalreaktivasi: false
                        })
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    renderMerchant=()=>{
        return this.state.datamerchant.map((val,index)=>{
            return(
                <tr key={index} className="deskripsi" style={{fontSize:'100px'}}>
                    <td>{val.id}</td>
                    <td>{val.name}
                        <br></br>
                        <a style={{color:'green'}}>{val.status}</a>
                    </td>
                    <td>{val.Manager}</td>
                    <td><img className="card-img-top rounded-bottom" src={val.PhotoManager} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <td><img className="card-img-top rounded-bottom" src={val.Kitchen} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <td><img className="card-img-top rounded-bottom" src={val.Staff} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <td>{val.Specialcook}</td>
                    <td><img className="card-img-top rounded-bottom" src={val.Photocook} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <button onClick={()=>this.setState({ modalkepastianhapus:true, namahapus: val.name, ihapus: index, IDhapus: val.id })} type="button" className="btn btn-outline-info btn-rounded waves-effect">Delete</button>
                </tr>
            )
        })
    }

    renderMerchantReviewed=()=>{
        return this.state.datamerchantreviewed.map((val,index)=>{
            return(
                <tr key={index} className="deskripsi" style={{fontSize:'100px'}}>
                    <td>{val.id}</td>
                    <td>{val.name} 
                        <br></br>
                        <a style={{color:'orange'}}>in {val.status}</a>
                    </td>
                    <td>{val.Manager}</td>
                    <td><img className="card-img-top rounded-bottom" src={val.PhotoManager} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <td><img className="card-img-top rounded-bottom" src={val.Kitchen} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <td><img className="card-img-top rounded-bottom" src={val.Staff} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <td>{val.Specialcook}</td>
                    <td><img className="card-img-top rounded-bottom" src={val.Photocook} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <button type="button" onClick={()=>{this.setState({ modalsudahdireview: true, namareviewed: val.name, ireviewed: index, IDreviewed: val.id  })}} className="btn btn-outline-warning btn-rounded waves-effect">Reviewed</button>
                </tr>
            )
        })
    }

    renderMerchantDeleted=()=>{
        return this.state.datamerchantdeleted.map((val,index)=>{
            return(
                <tr key={index} className="deskripsi" style={{fontSize:'100px'}}>
                    <td>{val.id}</td>
                    <td>{val.name}
                        <br></br>
                        <a style={{color:'red'}}>{val.status}</a>
                    </td>
                    <td>{val.Manager}</td>
                    <td><img className="card-img-top rounded-bottom" src={val.PhotoManager} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <td><img className="card-img-top rounded-bottom" src={val.Kitchen} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <td><img className="card-img-top rounded-bottom" src={val.Staff} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <td>{val.Specialcook}</td>
                    <td><img className="card-img-top rounded-bottom" src={val.Photocook} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <button type="button" onClick={()=>{this.setState({ modalreaktivasi: true, namareaktivasi: val.name, ireaktivasi: index, IDreaktivasi: val.id  })}} className="btn btn-outline-default btn-rounded waves-effect">Activate Deleted</button>
                </tr>
            )
        })
    }

    render() {
        if(this.props.Auth.roleid===1){
            if(this.state.loading){
                return(
                    <div className="mb-5">
                        Loading...
                    </div>
                )
            }
    
            return ( 
                <div className="mb-5">
    
                    <Modal isOpen={this.state.modaltambahmerchant} toggle={()=>this.setState({modaltambahmerchant:false})}>
                        <div className="card">
                            <div className="card-body">
                                <input type="text" ref='name' placeholder="Merchant" className='form-control mt-2'/>
                                <input type="text" ref='Manager' placeholder="Manager" className='form-control mt-2'/>
                                <textarea rows='3' type="text" ref='PhotoManager'  placeholder="URL Manager Photo" className='form-control mt-2 mb-2'/>
                                <textarea rows='3' type="text" ref='Kitchen'  placeholder="URL Kitchen Photo" className='form-control mt-2 mb-2'/>
                                <textarea rows='3' type="text" ref='Staff'  placeholder="URL Staff Photo" className='form-control mt-2 mb-2'/>
                                <input type="text" ref='Specialcook' placeholder="Special Cook" className='form-control mt-2'/>
                                <textarea rows='3' type="text" ref='Photocook'  placeholder="URL Food Photo" className='form-control mt-2 mb-2'/>
                            </div>
                        </div>
                            <Button color="warning" onClick={this.addmerchant}>Add New Merchant</Button>
                            <Button color="secondary" onClick={()=>this.setState({modaltambahmerchant:false})}>Close</Button>
                    </Modal>
                    
                    <Modal isOpen={this.state.modalkepastianhapus} toggle={()=>this.setState({modalkepastianhapus:false})}>
                        <div className="card">
                            <div className="card-body">
                            <h4 className="card-title">Are You Sure Want to Delete <a style={{color: 'orange'}}>{this.state.namahapus}?</a></h4>
                            </div>
                        </div>
                            <Button color="warning" onClick={this.pastihapus}>Confirm</Button>
                            <Button color="secondary" onClick={()=>this.setState({modalkepastianhapus:false})}>Cancel</Button>
                    </Modal>
    
                    <Modal isOpen={this.state.modalsudahdireview} toggle={()=>this.setState({modalsudahdireview:false})}>
                        <div className="card">
                            <div className="card-body">
                            <h4 className="card-title">Have you carefully reviewed <a style={{color: 'orange'}}>{this.state.namareviewed}?</a></h4>
                            </div>
                        </div>
                            <Button color="warning" onClick={()=>this.setState({modalisireviewed:true})}>Yes</Button>
                            <Button color="secondary" onClick={()=>this.setState({modalsudahdireview:false})}>No</Button>
                    </Modal>
    
                    <Modal isOpen={this.state.modalisireviewed} toggle={()=>this.setState({modalisireviewed:false})}>
                        <div className="card">
                            <div className="card-body">
                                <input type="text" ref='usernameNM' placeholder="New Merchant Username" className='form-control mt-2'/>
                                <input type="text" ref='passwordNM' placeholder="New Merchant Password" className='form-control mt-2'/>
                                <input type="text" ref='emailNM' placeholder="New Merchant Email" className='form-control mt-2'/>
                            </div>
                        </div>
                            <Button color="warning" onClick={this.reviewed}>Confirm</Button>
                            <Button color="secondary" onClick={()=>this.setState({modalisireviewed:false})}>Cancel</Button>
                    </Modal>
    
                    <Modal isOpen={this.state.modalreaktivasi} toggle={()=>this.setState({modalreaktivasi:false})}>
                        <div className="card">
                            <div className="card-body">
                            <h4 className="card-title">Are you sure want to reactivate <a style={{color: 'orange'}}>{this.state.namareaktivasi}?</a></h4>
                            </div>
                        </div>
                            <Button color="warning" onClick={this.reaktivasi}>Yes</Button>
                            <Button color="secondary" onClick={()=>this.setState({modalreaktivasi:false})}>No</Button>
                    </Modal>
    
                    <table className="table">
                        <thead className="black orange-text">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Merchant</th>
                            <th scope="col">Manager</th>
                            <th scope="col">Photo Manager</th>
                            <th scope="col">Kitchen</th>
                            <th scope="col">Staff</th>
                            <th scope="col">Special Cook</th>
                            <th scope="col">Food Photo</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderMerchant()}
                            {this.renderMerchantReviewed()}
                            {this.renderMerchantDeleted()}
                        </tbody>
                    </table>
                    <button onClick={()=>this.setState({ modaltambahmerchant:true })} type="button" className="btn btn-outline-success btn-rounded waves-effect">Add New Merchant</button>
                </div>
             );
        }
        else{
            return(
                <div className="mb-5">
                    Page not found
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

export default connect(MapstateToprops, {LoginSuccessAction}) (ManageMerchantSA);