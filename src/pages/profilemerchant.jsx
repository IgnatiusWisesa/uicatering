import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import StarRatings from 'react-star-ratings';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner,Col,Row } from 'reactstrap'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'

class ProfileMerchant extends Component {
    state = {
      datamerchant: [],
      loading: true,
      modaledit: false,
      currentvalue: '',
      modalkepastian: false,
      pengganti: '',
      variabelganti: ''
      }

      componentDidMount(){
        console.log(this.props.Auth.merchantid)

        Axios.get(`http://localhost:4000/merchants/get-merchants/${this.props.Auth.merchantid}`)
        .then((res)=>{
          console.log(res.data[0])
          this.setState({ datamerchant: res.data[0], loading: false })
        }).catch((err)=>{
          console.log(err)
        })
      }

      rendermodal=(x)=>{
        console.log(x)
        let tampil = ''
        if(x==="name"){
          tampil = this.state.datamerchant.name
        }
        else if(x==="Manager"){
          tampil = this.state.datamerchant.Manager
        }
        else if(x==="PhotoManager"){
          tampil = this.state.datamerchant.PhotoManager
        }
        else if(x==="Kitchen"){
          tampil = this.state.datamerchant.Kitchen
        }
        else if(x==="Staff"){
          tampil = this.state.datamerchant.Staff
        }
        else if(x==="Specialcook"){
          tampil = this.state.datamerchant.Specialcook
        }
        else if(x==="Photocook"){
          tampil = this.state.datamerchant.Photocook
        }

        console.log(tampil)
        this.setState({modaledit: true, currentvalue: tampil, variabelganti: x})
      }

      renderMerchant=()=>{
        return(
          <Fragment>
            <tr>
              <td>{this.state.datamerchant.id}</td>
              <td>{this.state.datamerchant.name}</td>
              <td>{this.state.datamerchant.Manager}</td>
              <td><img className="card-img-top rounded-bottom" src={this.state.datamerchant.PhotoManager} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
              <td><img className="card-img-top rounded-bottom" src={this.state.datamerchant.Kitchen} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
              <td><img className="card-img-top rounded-bottom" src={this.state.datamerchant.Staff} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
              <td>{this.state.datamerchant.Specialcook}</td>
              <td><img className="card-img-top rounded-bottom" src={this.state.datamerchant.Photocook} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
              <td>
                <StarRatings
                  rating={this.state.datamerchant.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px"
                  starSpacing="5px"
                  isSelectable={true}
                />  
              </td>
            </tr>
            <tr>
              <td></td>
              <td onClick={()=>this.rendermodal("name")} style={{width:'170px'}}><a className="btn" style={{color: '#ff8364'}}>Edit Merchant Name</a></td>
              <td onClick={()=>this.rendermodal("Manager")} style={{width:'170px'}}><a className="btn" style={{color: '#ff8364'}}>Edit Manager Name</a></td>
              <td onClick={()=>this.rendermodal("PhotoManager")} style={{width:'170px'}}><a className="btn" style={{color: '#ff8364'}}>Edit Photo of Manager</a></td>
              <td onClick={()=>this.rendermodal("Kitchen")} style={{width:'170px'}}><a className="btn" style={{color: '#ff8364'}}>Edit Kitchen Photo</a></td>
              <td onClick={()=>this.rendermodal("Staff")} style={{width:'170px'}}><a className="btn" style={{color: '#ff8364'}}>Edit the Staff Photo</a></td>
              <td onClick={()=>this.rendermodal("Specialcook")} style={{width:'170px'}}><a className="btn" style={{color: '#ff8364'}}>Edit Special Cook</a></td>
              <td onClick={()=>this.rendermodal("Photocook")} style={{width:'170px'}}><a className="btn" style={{color: '#ff8364'}}>Edit Photo Special Cook</a></td>
            </tr>
          </Fragment>
        )
      }

      handlechange=(e)=>{
        console.log(e.target.value)

        this.setState({pengganti: e.target.value})
      }

      bukamodalkepastian=()=>{
        this.setState({modalkepastian: true})
      }

      tinggalput=()=>{
        let x = this.state.variabelganti
        console.log(this.state.pengganti)

        let putbaru = {}
        let ubah = ''
        if(x==="name"){
          let name = this.state.pengganti
          putbaru = {...this.state.datamerchant, name: name}
        }
        else if(x==="Manager"){
          let Manager = this.state.pengganti
          putbaru = {...this.state.datamerchant, Manager: Manager}
        }
        else if(x==="PhotoManager"){
          let PhotoManager = this.state.pengganti
          putbaru = {...this.state.datamerchant, PhotoManager: PhotoManager}
        }
        else if(x==="Kitchen"){
          let Kitchen = this.state.pengganti
          putbaru = {...this.state.datamerchant, Kitchen: Kitchen}
        }
        else if(x==="Staff"){
          let Staff = this.state.pengganti
          putbaru = {...this.state.datamerchant, Staff: Staff}
        }
        else if(x==="Specialcook"){
          let Specialcook = this.state.pengganti
          putbaru = {...this.state.datamerchant, Specialcook: Specialcook}
        }
        else if(x==="Photocook"){
          let Photocook = this.state.pengganti
          putbaru = {...this.state.datamerchant, Photocook: Photocook}
        }

        console.log(putbaru)

        Axios.put(`http://localhost:2000/merchants/1`,putbaru)
        .then((res)=>{
          Axios.get(`http://localhost:2000/merchants/1`)
          .then((res1)=>{
            console.log(res.data)
            this.setState({ datamerchant: res1.data, modaledit: false, modalkepastian: false })
          }).catch((err)=>{
            console.log(err)
          })
        }).catch((err)=>{
          console.log(err)
        })
      }

      render() {
        if(this.props.Auth.roleid!==3){
          return(
            <div className="mb-5">
              Page 404
            </div>
          )
        }

        if(this.state.loading){
          return(
            <div className="mb-5">
              Loading..
            </div>
          )
        }

        return (
          <div className="mb-5">

              <Modal isOpen={this.state.modalkepastian} toggle={()=>this.setState({modalkepastian: false})}>
                <div className="card">
                  <ModalHeader style={{backgroundColor:'#ff8364'}}>
                    Are you sure Want to Edit?
                  </ModalHeader>
                  <ModalBody>
                    {this.state.currentvalue} <strong>to</strong> {this.state.pengganti}
                  </ModalBody>
                </div>
                  <Button color="danger" onClick={this.tinggalput}>Yes</Button>
                  <Button color="secondary" onClick={()=>this.setState({modalkepastian: false})}>Cancel</Button>
              </Modal>

            <Modal isOpen={this.state.modaledit} toggle={()=>this.setState({modaledit: false})}>
                <div className="card">
                  <table className="table table-bordered">
                      <thead>
                      <tr>
                          <th scope="col">Current Value</th>
                          <th scope="col">Edit</th>
                      </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td>{this.state.currentvalue.split('').filter((val, index)=>index<=15)}</td>
                            <td>
                              <div>
                                <input onChange={this.handlechange} type="text" defaultValue={this.state.currentvalue} className="form-control" />
                              </div>
                            </td>
                          </tr>
                      </tbody>
                  </table>
                </div>
                    <Button color="danger" onClick={this.bukamodalkepastian}>Edit</Button>
                    <Button color="secondary" onClick={()=>this.setState({modaledit: false})}>Close</Button>
            </Modal>

            <div className="mb-5">
              <h2 className="subjudul mb-3">
                {this.state.datamerchant.name}
              </h2>
              <p>cek</p>
              <p>cek</p>
              <p>cek</p>
              <p>cek</p>
            </div>

            <table className="table">
              <thead className="black orange-text">
                <tr>
                  <th scope="col" className="deskripsi">Id</th>
                  <th scope="col" className="deskripsi">Name</th>
                  <th scope="col" className="deskripsi">Manager</th>
                  <th scope="col" className="deskripsi">Photo Manager</th>
                  <th scope="col" className="deskripsi">Kitchen</th>
                  <th scope="col" className="deskripsi">Staff</th>
                  <th scope="col" className="deskripsi">Special Cook</th>
                  <th scope="col" className="deskripsi">Photo Cook</th>
                  <th scope="col" className="deskripsi">Current Rating</th>
                </tr>
              </thead>
              <tbody>
                {this.renderMerchant()}
              </tbody>
            </table>
          </div>
        )
      }
}

const MapstateToprops =(state)=>{
  return{
      Auth: state.Auth
  }
}
 
export default connect(MapstateToprops, {LoginSuccessAction}) (ProfileMerchant);