import React, { Component } from 'react'
import Axios from 'axios';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'

class ManageUsers extends Component {
    state = { 
        datausers: [],
        loading: true,
        modalkepastianhapus: false,
        namahapus: '',
        ihapus: -1,
        IDhapus: -1,
        modaleditrole: false, 
        namaedit: '', 
        iedit: -1, 
        IDedit: -1,
        modalsalahrole: false
     }

    componentDidMount(){
        Axios.get('http://localhost:4000/users/get-all')
        .then((res)=>{
            console.log(res.data)
            this.setState({
                datausers:res.data, 
                loading: false
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    pastihapus=()=>{

        console.log('pasti hapus')

        Axios.delete(`http://localhost:4000/users/delete-users/${this.state.IDhapus}`)
        .then((res) => {
            console.log(res.data)
            Axios.get('http://localhost:4000/users/get-all')
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    datausers:res.data,
                    modalkepastianhapus:false
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    gantirole=()=>{
        let idrolebaru = this.refs.roleganti.value

        if(idrolebaru>3 || idrolebaru<1){
            this.setState({ modalsalahrole: true })
        }
        else{
            let editrole = {...this.state.datausers[this.state.iedit], roleid:`${idrolebaru}` }

            Axios.put(`http://localhost:4000/users/edit-users/${this.state.IDedit}`,editrole)
            .then((res) => {
                console.log(res.data)
                Axios.get('http://localhost:4000/users/get-all')
                .then((res1)=>{
                    console.log(res1.data)
                    this.setState({
                        datausers:res1.data,
                        modaleditrole:false
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }

    }

    renderUsers=()=> {
        return this.state.datausers.map((val, index) => {
            return(
                <tr key={index} className="deskripsi" style={{fontSize:'100px'}}>
                    <td>{val.id}</td>
                    <td>{val.first}</td>
                    <td>{val.last}</td>
                    <td>{val.username}</td>
                    <td>{val.phone}</td>
                    <td>{val.email}</td>
                    <td>{val.city}</td>
                    <td>{val.fulladdress}</td>
                    <td>{val.roleid}</td>
                    {
                        val.id!==1?
                        <div>
                        <button onClick={()=>this.setState({ modaleditrole:true, namaedit: val.name, iedit: index, IDedit: val.id })} type="button" className="btn btn-outline-warning btn-rounded waves-effect">Edit Role</button>
                        <button onClick={()=>this.setState({ modalkepastianhapus:true, namahapus: val.username, ihapus: index, IDhapus: val.id })} type="button" className="btn btn-outline-danger btn-rounded waves-effect">X</button>
                        </div>
                        :
                        null
                    }
                </tr>
            )
        })
    }

    render() {
        if(this.props.Auth.roleid===1){
            if(this.state.loading){
                return(
                    <div>
                        Loading..
                    </div>
                )
            }
    
            return ( 
                <div className="mb-5">
                    
                    <Modal isOpen={this.state.modalkepastianhapus} toggle={()=>this.setState({modalkepastianhapus:false})}>
                        <div className="card">
                            <div className="card-body">
                            <h4 className="card-title">Are You Sure Want to Delete <a style={{color: 'orange'}}>{this.state.namahapus}?</a></h4>
                            <h5 className="card-title">This action can not be reversed</h5>
                            </div>
                        </div>
                            <Button color="warning" onClick={this.pastihapus}>Confirm</Button>
                            <Button color="secondary" onClick={()=>this.setState({modalkepastianhapus:false})}>Cancel</Button>
                    </Modal>
    
                    {
                        this.state.modaleditrole?
                        <Modal isOpen={this.state.modaleditrole} toggle={()=>this.setState({modaleditrole:false})}>
                            <div className="card">
                                <div className="card-body">
                                    <input style={{textAlign:"center"}} type="number" ref='roleganti' defaultValue={this.state.datausers[this.state.iedit].roleid} className='form-control mt-2'/>
                                </div>
                            </div>
                                <Button color="warning" onClick={this.gantirole}>Change</Button>
                                <Button color="secondary" onClick={()=>this.setState({modaleditrole:false})}>Cancel</Button>
                        </Modal>
                        :
                        null
                    }
    
                    <Modal isOpen={this.state.modalsalahrole} toggle={()=>this.setState({modalsalahrole:false})}>
                        <div className="card">
                            <div className="card-body">
                            <h4 className="card-title">You have entered wrong role id</h4>
                            <h5 className="card-title">1. Super Admin; 2. Users; 3. Merchants</h5>
                            </div>
                        </div>
                            <Button color="secondary" onClick={()=>this.setState({modalsalahrole:false})}>Close</Button>
                    </Modal>
    
                    <table className="table">
                        <thead className="black orange-text">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">City</th>
                            <th scope="col">Full Address</th>
                            <th scope="col">Role id</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderUsers()}
                        </tbody>
                    </table>
    
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
 
export default connect(MapstateToprops, {LoginSuccessAction}) (ManageUsers);