import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import numeral from 'numeral'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner,Col,Row } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import ImageUploader from 'react-images-upload';

class AfterOrder extends Component {
    state = { 
        dataorderbelumbayar:[],
        detailorderbelumbayar: false,
        pictures: []
     }

     componentDidMount(){
         Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
         .then((res)=>{
            console.log(res.data)
            this.setState({dataorderbelumbayar: res.data})
         }).catch((err)=>{
             console.log(err)
         })
     }

     renderstatusbelumadaorder=()=>{
        if(this.state.dataorderbelumbayar.length===0){
            return(
               <div className="card card-image" style={{backgroundImage: 'url(https://images.all-free-download.com/images/graphiclarge/abstract_circles_background_vector_graphic_art_569555.jpg)'}}>
                   <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                   <div>
                       <h5 className="orange-text"><i class="fas fa-thermometer-empty"/> Your Have No Order Yet!</h5>
                       <a style={{cursor:'default'}} className="btn btn-orange">Cart Empty</a>
                   </div>
                   </div>
               </div>
            )
        }
     }

     rendermainbelumadaorder=()=>{
        if(this.state.dataorderbelumbayar.length===0){
            return(
                <Fragment>
                    <img src="https://i.pinimg.com/474x/96/f2/d8/96f2d82d67d1222ecd13e241170b0d1b--intagram-alone.jpg" />
                    <div style={{position: 'absolute', top: '800px', left: '825px', right: '1080px', bottom: 0}} className="mt-5">
                        <h1 className="headercomment">Your Have No Order</h1>
                    </div>
                    <div style={{position: 'absolute', top: '800px', left: '1080px', right: '1080px', bottom: 0}} className="mt-5">
                        <h2 className="headercomment">Please Order, Accompany the Bear!</h2>
                    </div>
                </Fragment>
            )
        }
     }
     
     hargabelumadaorder=()=>{
        if(this.state.dataorderbelumbayar.length){
            let output=0

            for(let i=0;i<this.state.dataorderbelumbayar.length;i++){
                output += this.state.dataorderbelumbayar[i].price
            }

            console.log(output)
            return(
                <div>
                    {'Rp.'+numeral(output).format('Rp,0.00')}
                </div>
            )
        }
     }

     modaldetail=()=>{
         this.setState({detailorderbelumbayar: true})
     }

     constructor(props) {
        super(props);
         this.onDrop = this.onDrop.bind(this);
    }

     onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

     renderstatuswaitingpayment=()=>{
         if(this.state.dataorderbelumbayar.length){
             return(
                <div className="card card-image" style={{backgroundImage: 'url(https://images.all-free-download.com/images/graphiclarge/abstract_circles_background_vector_graphic_art_569555.jpg)'}}>
                    <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                    <div>
                        <h5 className="orange-text"><i class="fas fa-thermometer-half"/> Your Order Status</h5>
                        <h3 className="card-title pt-2"><strong>Total Order</strong></h3>
                        <p>{this.state.dataorderbelumbayar.length}</p>
                        <h3 className="card-title pt-2"><strong>Price</strong></h3>
                        <p>{this.hargabelumadaorder()}</p>
                        <button type="button" class="btn btn-outline-mdb-color waves-effect mb-3" onClick={this.modaldetail}>
                            <div>
                                <h5 className="card-title mb-2"><a>Order Detail</a></h5>
                            </div>
                        </button>
                        <a style={{cursor:'default'}} className="btn btn-orange">Waiting for Payment</a>
                    </div>
                    </div>
                </div>
             )
         }
     }

     renderIsimodalTanggalbelumbayar=()=>{
        if(this.state.dataorderbelumbayar){
                return this.state.dataorderbelumbayar.map((val,index)=>{
                    return(
                        <tr key={index}>
                            <p>{val.order}</p>
                        </tr>
                    )
                })
        }
    }

    renderIsimodalHargabelumbayar=()=>{
        if(this.state.dataorderbelumbayar){
            return this.state.dataorderbelumbayar.map((val,index)=>{
                return(
                    <tr key={index}>
                        <p>{'Rp.'+numeral(val.price).format('Rp,0.00')}</p>
                    </tr>
                )
            })
        }
    }

    rendermainwaitingpayment=()=>{
        if(this.state.dataorderbelumbayar.length){
            return(
                <div>
                    <h1 className="subjudul">Waiting For Payment</h1>
                    <h2 className="mb-3">12 Hours Left</h2>
                    {
                        this.state.pictures===[]?
                        <div className="mt-3">
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                accept="image/*"
                            />
                        </div>
                        :
                        <div>Taro gambarnya</div>
                    }
                </div>
            )
        }
    }

    render() {
        console.log(this.state.pictures)
        return (
            <div className="wrapper">
                <div className="sidebar mt-4">
                    {this.renderstatusbelumadaorder()}
                    {this.renderstatuswaitingpayment()}
                </div>
                <div className="main mt-4 mb-5">

                    <Modal style={{width:'16%'}} isOpen={this.state.detailorderbelumbayar} toggle={()=>this.setState({detailorderbelumbayar:false})}>
                        <ModalHeader style={{backgroundColor:'#ff8364'}}>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <td>
                                        {this.renderIsimodalTanggalbelumbayar()}
                                    </td>
                                    <td>
                                        {this.renderIsimodalHargabelumbayar()}
                                    </td>
                                </tbody>
                            </table>
                        </ModalHeader>
                        <Button style={{width:'92%'}} color="warning" onClick={()=>this.setState({detailorderbelumbayar:false})}>Okay!</Button>
                        <Link to={'/cart'}>
                            <Button style={{width:'92%'}} color="secondary" >Back to Cart</Button>
                        </Link>
                    </Modal>
                    {this.rendermainbelumadaorder()}
                    {this.rendermainwaitingpayment()}
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
 
export default connect(MapstateToprops, {LoginSuccessAction}) (AfterOrder);