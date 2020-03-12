import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import numeral from 'numeral'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import page404 from './page404';

class FoodMerchant extends Component {
    state = {
        datamain: [],
        dataextras: [],
        datadrinks: [],
        loading: true,
        modaladdmain: false,
        modaladdextras: false,
        modaladddrinks: false,
        modalkepastianhapus: false,
        namahapus: '',
        ihapus: -1,
        iedit: -1,
        modaleditmain: false,
        modaleditextras: false,
        modaleditdrinks: false
      }

      componentDidMount(){
        // console.log(this.props.Auth)
        Axios.get(`http://localhost:4000/custmenus/getcustmenus-main/${this.props.Auth.merchantid}`)
        .then((res)=>{
          // console.log(res.data)
          Axios.get(`http://localhost:4000/custmenus/getcustmenus-extras/${this.props.Auth.merchantid}`)
          .then((res1) => {
            // console.log(res1.data)
            Axios.get(`http://localhost:4000/custmenus/getcustmenus-drinks/${this.props.Auth.merchantid}`)
            .then((res2) => {
              // console.log(res2)
              this.setState({ datamain:res.data, dataextras:res1.data, datadrinks:res2.data, loading: false })
            }).catch((err) => {
              console.log(err)
            })
          }).catch((err) => {
            console.log(err)
          })
        }).catch((err)=>{
          console.log(err)
        })
      }

      modaltambahmain=()=>{
        if(this.state.modaladdmain){
            return(
                <Modal isOpen={this.state.modaladdmain} toggle={()=>this.setState({modaladdmain:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <input type="text" ref='tambahmain' placeholder="Main Menu" className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='tambahdescmain'  placeholder="Main Menu Description" className='form-control mt-2 mb-2'/>
                            <input type="text" ref='tambahgambarmain' placeholder="Image URL" className='form-control mt-2'/>
                            <input type="number" ref='tambahhargamain' placeholder="Menu's Price" className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={()=>this.isitambah(1)}>Add New Main Menu</Button>
                        <Button color="secondary" onClick={()=>this.setState({modaladdmain:false})}>Close</Button>
                </Modal>
            )
        }
      }

      modaltambahextras=()=>{
        if(this.state.modaladdextras){
            return(
                <Modal isOpen={this.state.modaladdextras} toggle={()=>this.setState({modaladdextras:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <input type="text" ref='tambahextras' placeholder="Extras Menu" className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='tambahdescextras'  placeholder="Extras Menu Description" className='form-control mt-2 mb-2'/>
                            <input type="text" ref='tambahgambarextras' placeholder="Image URL" className='form-control mt-2'/>
                            <input type="number" ref='tambahhargaextras' placeholder="Extras's Price" className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={()=>this.isitambah(2)}>Add New Extras</Button>
                        <Button color="secondary" onClick={()=>this.setState({modaladdextras:false})}>Close</Button>
                </Modal>
            )
        }
      }

      modaltambahdrinks=()=>{
        if(this.state.modaladddrinks){
            return(
                <Modal isOpen={this.state.modaladddrinks} toggle={()=>this.setState({modaladddrinks:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <input type="text" ref='tambahdrinks' placeholder="Drinks Menu" className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='tambahdescdrinks'  placeholder="Drinks Description" className='form-control mt-2 mb-2'/>
                            <input type="text" ref='tambahgambardrinks' placeholder="Image URL" className='form-control mt-2'/>
                            <input type="number" ref='tambahhargadrinks' placeholder="Drink's Price" className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={()=>this.isitambah(3)}>Add New Drink</Button>
                        <Button color="secondary" onClick={()=>this.setState({modaladddrinks:false})}>Close</Button>
                </Modal>
            )
        }
      }

      isitambah=(i)=>{
        console.log(i)

        if(i==1){
          let main = this.refs.tambahmain.value
          let descmain = this.refs.tambahdescmain.value
          let gambarmain = this.refs.tambahgambarmain.value
          let hargamain = this.refs.tambahhargamain.value

          let mainbaru = {
            idmerchant:this.props.Auth.merchantid,
            main,
            descmain,
            gambarmain,
            hargamain
          }
          
          Axios.post(`http://localhost:4000/custmenus/add-main`,mainbaru)
          .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/custmenus/getcustmenus-main/${this.props.Auth.merchantid}`)
            .then((res1) => {
              console.log(res1.data)
              this.setState({ datamain: res1.data, modaladdmain: false })
            })
          }).catch((err) => {
            console.log(err)
          })

        }
        else if(i==2){
          
          let extras = this.refs.tambahextras.value
          let descextras = this.refs.tambahdescextras.value
          let gambarextras = this.refs.tambahgambarextras.value
          let hargaextras = this.refs.tambahhargaextras.value

          let extrasbaru = {
            idmerchant:this.props.Auth.merchantid,
            extras,
            descextras,
            gambarextras,
            hargaextras
          }
          console.log(extrasbaru)

          Axios.post(`http://localhost:4000/custmenus/add-extras`,extrasbaru)
          .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/custmenus/getcustmenus-extras/${this.props.Auth.merchantid}`)
            .then((res1) => {
              console.log(res1.data)
              this.setState({ dataextras: res1.data, modaladdextras: false })
            })
          }).catch((err) => {
            console.log(err)
          })

        }
        else if(i==3){
          
          let drinks = this.refs.tambahdrinks.value
          let descdrinks = this.refs.tambahdescdrinks.value
          let gambardrinks = this.refs.tambahgambardrinks.value
          let hargadrinks = this.refs.tambahhargadrinks.value

          let drinksbaru = {
            idmerchant:this.props.Auth.merchantid,
            drinks,
            descdrinks,
            gambardrinks,
            hargadrinks
          }

          console.log(drinksbaru)

          Axios.post(`http://localhost:4000/custmenus/add-drinks`,drinksbaru)
          .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/custmenus/getcustmenus-drinks/${this.props.Auth.merchantid}`)
            .then((res1) => {
              console.log(res1.data)
              this.setState({ datadrinks: res1.data, modaladddrinks: false })
            })
          }).catch((err) => {
            console.log(err)
          })
        }
      }

      modalupdatemain=()=>{
        if(this.state.modaleditmain){
            return(
                <Modal isOpen={this.state.modaleditmain} toggle={()=>this.setState({modaleditmain:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <input type="text" ref='editmain' defaultValue={this.state.datamain[this.state.iedit].main} className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='editdescmain' defaultValue={this.state.datamain[this.state.iedit].descmain} className='form-control mt-2 mb-2'/>
                            <input type="text" ref='editgambarmain' defaultValue={this.state.datamain[this.state.iedit].gambarmain} className='form-control mt-2'/>
                            <input type="number" ref='edithargamain' defaultValue={this.state.datamain[this.state.iedit].hargamain} className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={()=>this.isiedit(1)}>Update Main Menu</Button>
                        <Button color="secondary" onClick={()=>this.setState({modaleditmain:false})}>Close</Button>
                </Modal>
            )
        }
      }

      modalupdateextras=()=>{
        if(this.state.modaleditextras){
            return(
                <Modal isOpen={this.state.modaleditextras} toggle={()=>this.setState({modaleditextras:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <input type="text" ref='editextras' defaultValue={this.state.dataextras[this.state.iedit].extras} className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='editdescextras' defaultValue={this.state.dataextras[this.state.iedit].descextras} className='form-control mt-2 mb-2'/>
                            <input type="text" ref='editgambarextras' defaultValue={this.state.dataextras[this.state.iedit].gambarextras} className='form-control mt-2'/>
                            <input type="number" ref='edithargaextras' defaultValue={this.state.dataextras[this.state.iedit].hargaextras} className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={()=>this.isiedit(2)}>Update Extras Menu</Button>
                        <Button color="secondary" onClick={()=>this.setState({modaleditextras:false})}>Close</Button>
                </Modal>
            )
        }
      }

      modalupdatedrinks=()=>{
        if(this.state.modaleditdrinks){
            return(
                <Modal isOpen={this.state.modaleditdrinks} toggle={()=>this.setState({modaleditdrinks:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <input type="text" ref='editdrinks' defaultValue={this.state.datadrinks[this.state.iedit].drinks} className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='editdescdrinks' defaultValue={this.state.datadrinks[this.state.iedit].descdrinks} className='form-control mt-2 mb-2'/>
                            <input type="text" ref='editgambardrinks' defaultValue={this.state.datadrinks[this.state.iedit].gambardrinks} className='form-control mt-2'/>
                            <input type="number" ref='edithargadrinks' defaultValue={this.state.datadrinks[this.state.iedit].hargadrinks} className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={()=>this.isiedit(3)}>Update Drinks Menu</Button>
                        <Button color="secondary" onClick={()=>this.setState({modaleditdrinks:false})}>Close</Button>
                </Modal>
            )
        }
      }

      isiedit=(index)=>{
        if(index==1){
          let main = this.refs.editmain.value
          let descmain = this.refs.editdescmain.value
          let gambarmain = this.refs.editgambarmain.value
          let hargamain = this.refs.edithargamain.value
          let makanedit = this.state.datamain[this.state.iedit].main

          let mainupdate = {
            idmerchant:this.props.Auth.merchantid,
            main,
            descmain,
            gambarmain,
            hargamain,
            makanedit
          }
          console.log(mainupdate)

          Axios.put(`http://localhost:4000/custmenus/edit-main`,mainupdate)
          .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/custmenus/getcustmenus-main/${this.props.Auth.merchantid}`)
            .then((res1) => {
              console.log(res1.data)
              this.setState({ datamain: res1.data, modaleditmain: false })
            })
          }).catch((err) => {
            console.log(err)
          })

        }
        else if(index==2){
          let extras = this.refs.editextras.value
          let descextras = this.refs.editdescextras.value
          let gambarextras = this.refs.editgambarextras.value
          let hargaextras = this.refs.edithargaextras.value
          let makanedit = this.state.dataextras[this.state.iedit].extras

          let extrasupdate = {
            idmerchant:this.props.Auth.merchantid,
            extras,
            descextras,
            gambarextras,
            hargaextras,
            makanedit
          }
          console.log(extrasupdate)

          Axios.put(`http://localhost:4000/custmenus/edit-extras`,extrasupdate)
          .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/custmenus/getcustmenus-extras/${this.props.Auth.merchantid}`)
            .then((res1) => {
              console.log(res1.data)
              this.setState({ dataextras: res1.data, modaleditextras: false })
            })
          }).catch((err) => {
            console.log(err)
          })

        }
        else if(index==3){
          let drinks = this.refs.editdrinks.value
          let descdrinks = this.refs.editdescdrinks.value
          let gambardrinks = this.refs.editgambardrinks.value
          let hargadrinks = this.refs.edithargadrinks.value
          let makanedit = this.state.datadrinks[this.state.iedit].drinks

          let drinksupdate = {
            idmerchant:this.props.Auth.merchantid,
            drinks,
            descdrinks,
            gambardrinks,
            hargadrinks,
            makanedit
          }
          console.log(drinksupdate)

          Axios.put(`http://localhost:4000/custmenus/edit-drinks`,drinksupdate)
          .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/custmenus/getcustmenus-drinks/${this.props.Auth.merchantid}`)
            .then((res1) => {
              console.log(res1.data)
              this.setState({ datadrinks: res1.data, modaleditdrinks: false })
            })
          }).catch((err) => {
            console.log(err)
          })

        }
      }

      konfhapus=()=>{
        if(this.state.modalkepastianhapus){
          return(
            <Modal isOpen={this.state.modalkepastianhapus} toggle={()=>this.setState({modalkepastianhapus:false})}>
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">Are You Sure Want to Delete <a style={{color: 'orange'}}>{this.state.namahapus}?</a></h4>
                    </div>
                </div>
                    <Button color="warning" onClick={this.pastihapus}>Confirm</Button>
                    <Button color="secondary" onClick={()=>this.setState({modalkepastianhapus:false})}>Cancel</Button>
            </Modal>
          )
        }
      }

      pastihapus=()=>{
        console.log(this.state.ihapus)

        let makanhapus = this.state.namahapus
        let idmerchant = this.props.Auth.merchantid
        let hapus = {
          idmerchant,
          makanhapus
        }

        if(this.state.ihapus==1){
          Axios.post(`http://localhost:4000/custmenus/delete-main`,hapus)
          .then((res) => {
            console.log(res)
            Axios.get(`http://localhost:4000/custmenus/getcustmenus-main/${this.props.Auth.merchantid}`)
            .then((res1) => {
              this.setState({ datamain:res1.data, modalkepastianhapus:false })
            }).catch((err) => {
              console.log(err)
            })
          }).catch((err) => {
            console.log(err)
          })
        }
        else if(this.state.ihapus==2){
          Axios.post(`http://localhost:4000/custmenus/delete-extras`,hapus)
          .then((res) => {
            console.log(res)
            Axios.get(`http://localhost:4000/custmenus/getcustmenus-extras/${this.props.Auth.merchantid}`)
            .then((res1) => {
              this.setState({ dataextras:res1.data, modalkepastianhapus:false })
            }).catch((err) => {
              console.log(err)
            })
          }).catch((err) => {
            console.log(err)
          })
        }
        else if(this.state.ihapus==3){
          Axios.post(`http://localhost:4000/custmenus/delete-drinks`,hapus)
          .then((res) => {
            console.log(res)
            Axios.get(`http://localhost:4000/custmenus/getcustmenus-drinks/${this.props.Auth.merchantid}`)
            .then((res1) => {
              this.setState({ datadrinks:res1.data, modalkepastianhapus:false })
            }).catch((err) => {
              console.log(err)
            })
          }).catch((err) => {
            console.log(err)
          })
        }
      }

      rendermain=()=>{
        console.log(this.props.Auth.merchantid)
        if(this.props.Auth.merchantid!==''){
          // console.log(this.state.datamain)
          return this.state.datamain.map((val,index) => {
            return(
              <tr key={index}>
                <td>{val.main}</td>
                <td style={{width:'500px'}}>{val.descmain}</td>
                <td><img className="card-img-top rounded-bottom" src={val.gambarmain} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                <td> {'Rp.'+numeral(val.hargamain).format('Rp,0.00')}</td>
                <td>
                  <button onClick={()=>this.setState({ iedit:index, modaleditmain:true })} type="button" className="btn btn-outline-warning btn-rounded waves-effect">Edit</button>
                  <button onClick={()=>this.setState({ ihapus:1,namahapus:val.main,modalkepastianhapus:true })} type="button" className="btn btn-outline-danger btn-rounded waves-effect">X</button>
                </td>
              </tr>
            )
          })
        }
        else{
          return(
            null
          )
        }
      }

      renderextras=()=>{
        console.log(this.props.Auth.merchantid)
        if(this.props.Auth.merchantid!==''){
          // console.log(this.state.datamain)
          return this.state.dataextras.map((val,index) => {
            return(
              <tr key={index}>
                <td>{val.extras}</td>
                <td style={{width:'500px'}}>{val.descextras}</td>
                <td><img className="card-img-top rounded-bottom" src={val.gambarextras} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                <td> {'Rp.'+numeral(val.hargaextras).format('Rp,0.00')}</td>
                <td>
                  <button onClick={()=>this.setState({ iedit:index, modaleditextras:true })} type="button" className="btn btn-outline-warning btn-rounded waves-effect">Edit</button>
                  <button onClick={()=>this.setState({ ihapus:2,namahapus:val.extras,modalkepastianhapus:true })} type="button" className="btn btn-outline-danger btn-rounded waves-effect">X</button>
                </td>
              </tr>
            )
          })
        }
        else{
          return(
            null
          )
        }
      }

      renderdrinks=()=>{
        console.log(this.props.Auth.merchantid)
        if(this.props.Auth.merchantid!==''){
          // console.log(this.state.datamain)
          return this.state.datadrinks.map((val,index) => {
            return(
              <tr key={index}>
                <td>{val.drinks}</td>
                <td style={{width:'500px'}}>{val.descdrinks}</td>
                <td><img className="card-img-top rounded-bottom" src={val.gambardrinks} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                <td> {'Rp.'+numeral(val.hargadrinks).format('Rp,0.00')}</td>
                <td>
                  <button onClick={()=>this.setState({ iedit:index, modaleditdrinks:true })} type="button" className="btn btn-outline-warning btn-rounded waves-effect">Edit</button>
                  <button onClick={()=>this.setState({ ihapus:3,namahapus:val.drinks,modalkepastianhapus:true })} type="button" className="btn btn-outline-danger btn-rounded waves-effect">X</button>
                </td>
              </tr>
            )
          })
        }
        else{
          return(
            null
          )
        }
      }

      render() {

        if(this.props.Auth.merchantid===''){
          return(
            <div className="mb-5">
              <page404 />
            </div>
          )
        }

        if(this.state.loading){
          return(
            <div className="mb-5">
              <div class="loading">Loading&#8230;</div>
            </div>
          )
        }

        return (
          <div className="mb-5">

            {this.modaltambahmain()}
            {this.modaltambahextras()}
            {this.modaltambahdrinks()}
            {this.konfhapus()}
            {this.modalupdatemain()}
            {this.modalupdateextras()}
            {this.modalupdatedrinks()}

            <h3><strong>Custom Menus</strong></h3>
                <h5>Main Menu</h5>
            <table className="table">
                <thead className="black orange-text">
                <tr>
                    <th scope="col">Main Menu</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image Menu</th>
                    <th scope="col">Menu Price</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                  {this.rendermain()}
                </tbody>
            </table>
                <a className="btn mb-5" style={{color: '#ff8364'}} onClick={()=>{this.setState({modaladdmain: true})}}>Add Main Menu</a>
                <h5>Extras</h5>
            <table className="table">
                <thead className="black orange-text">
                <tr>
                    <th scope="col">Extras</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image Extras</th>
                    <th scope="col">Extras Price</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                  {this.renderextras()}
                </tbody>
            </table>
                <a className="btn mb-5" style={{color: '#ff8364'}} onClick={()=>{this.setState({modaladdextras: true})}}>Add Extras</a>
                <h5>Drinks Menu</h5>
            <table className="table">
                <thead className="black orange-text">
                <tr>
                    <th scope="col">Drinks Menu</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image Drinks</th>
                    <th scope="col">Drinks Price</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                  {this.renderdrinks()}
                </tbody>
            </table>
              <a className="btn mb-5" style={{color: '#ff8364'}} onClick={()=>{this.setState({modaladddrinks: true})}}>Add Drinks</a>
          </div>
        )
      }
}

const MapstateToprops =(state)=>{
  return{
      Auth: state.Auth
  }
}
 
export default connect(MapstateToprops, {LoginSuccessAction}) (FoodMerchant);