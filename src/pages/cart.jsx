import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import numeral from 'numeral'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner,Col,Row } from 'reactstrap'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import { Redirect, Link } from 'react-router-dom'

class Cart extends Component {
    state = { 
        dataorder: [],
        modalDetailcat: false,
        modalDetailcust: false,
        indexDetail: '',
        tampilDetail: [],
        makanancustom: [],
        loading: true,
        modalkeafterorder: false
     }

    componentDidMount(){
        Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({dataorder: res.data, loading:false})
        }).catch((err)=>{
            console.log(err)
        })
    }

    modaldetail=(index)=>{
        // console.log(index)
        if(this.state.dataorder[index].type===2){
            this.setState({indexDetail:index, tampilDetail:this.state.dataorder[index].detail , makanancustom:this.state.dataorder[index].makanan , modalDetailcust: true})
        }
        else{
            this.setState({indexDetail:index, tampilDetail:this.state.dataorder[index].detail , modalDetailcat: true})
        }
    }

    hapus=(index, del)=>{
        console.log(index)
        var putbaru = {...this.state.dataorder[del], status: 'dihapus'}
        // console.log(this.state.dataorder)
        // console.log(putbaru)
        Axios.put(`http://localhost:2000/orders/${index}`,putbaru)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`http://localhost:2000/orders?status=belum%20bayar&userid=${this.props.Auth.id}`)
            .then((res1)=>{
                console.log(res1.data)
                this.setState({dataorder: res1.data, loading:false})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderIsimodalTanggal=()=>{
        if(this.state.modalDetailcat){
                return this.state.tampilDetail[0].map((val,index)=>{
                    return(
                        <tr key={index}>
                            {val}
                        </tr>
                    )
                })
        }
    }

    renderIsimodalMenu=()=>{
        if(this.state.modalDetailcat){
                return this.state.tampilDetail[1].map((val,index)=>{
                    return(
                        <tr key={index}>
                            {val}
                        </tr>
                    )
                })
        }
    }

    renderIsimodalQuant=()=>{
        if(this.state.modalDetailcat){
                return this.state.tampilDetail[2].map((val,index)=>{
                    return(
                        <tr key={index}>
                            {val}
                        </tr>
                    )
                })
        }
    }

    renderIsimodalcustom=()=>{
        if(this.state.modalDetailcust){
            // console.log(this.state.tampilDetail)
            // console.log(this.state.makanancustom)
            var makanan = this.state.makanancustom
    
            let tampilmakan = ''
            for(var i=0; i<makanan.length; i++){
                tampilmakan += makanan[i] + ' '
            }

            return(
                <Fragment>
                    <td>
                        <tr>Date: {this.state.tampilDetail[0]}</tr>
                        <tr>Place: {this.state.tampilDetail[1]}</tr>
                        <tr>{this.state.tampilDetail[2]}</tr>
                        <tr>{this.state.tampilDetail[3]} pax</tr>
                    </td>
                    <td>
                        {tampilmakan}
                    </td>
                </Fragment>
            )

        }
    }

    renderOrder=()=>{
        return this.state.dataorder.map((val,index)=>{
            return(
                <tr key={index}>
                    {  
                        (val.type) === 1?
                        <td>Catering Service</td>
                        :
                        <td>Custom Ordered</td>
                    }
                    <td>{val.order}</td>
                    <td>{val.merchant}</td>
                    <td>{'Rp.'+numeral(val.price).format('Rp,0.00')}</td>
                    <td>
                        <button onClick={()=>this.modaldetail(index)} type="button" className="btn btn-outline-warning btn-rounded waves-effect">View Detail</button>
                        <button onClick={()=>this.hapus(val.id, index)} type="button" className="btn btn-outline-danger btn-rounded waves-effect">X</button>
                    </td>
                </tr>
            )
        })
    }

    orderclicked=()=>{
        console.log('masuk order clicked')
    }

    render() { 
        if(this.state.loading){
            return(
                <div className="mb-5">
                    Loading...
                </div>
            )
        }

        return ( 
            <div className="mb-5">

            <Modal isOpen={this.state.modalDetailcat} toggle={()=>this.setState({modalDetailcat:false})}>
                <ModalHeader>
                    Order Detail 
                    <br></br>
                </ModalHeader>
                <ModalBody>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Menu</th>
                            <th scope="col">Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                            <td>
                                {this.renderIsimodalTanggal()}
                            </td>
                            <td>
                                {this.renderIsimodalMenu()}
                            </td>
                            <td>
                                {this.renderIsimodalQuant()}
                            </td>
                        </tbody>
                    </table>
                </ModalBody>
                    <Button color="secondary" onClick={()=>this.setState({modalDetailcat:false})}>Close</Button>
            </Modal>

            <Modal isOpen={this.state.modalDetailcust} toggle={()=>this.setState({modalDetailcust:false})}>
                <ModalHeader>
                    Order Detail
                </ModalHeader>
                <ModalBody>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">Place & Time</th>
                            <th scope="col">Menu</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderIsimodalcustom()}
                        </tbody>
                    </table>
                </ModalBody>
                    <Button color="secondary" onClick={()=>this.setState({modalDetailcust:false})}>Close</Button>
            </Modal>

            <table className="table table-hover mb-3">
                <thead>
                <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Merchant</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                    {this.renderOrder()}
                </tbody>
            </table>
            {
                this.state.dataorder.length?
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={this.orderclicked}>
                    <div>
                        <h5 className="card-title"><a>Confirm Order</a></h5>
                    </div>
                </button>
                :
                <Fragment>
                    <img className="card-img-top" style={{height:'200px'}} src="https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-yellow-background-hand-drawn-cartoon-desert-print-ad-image_148796.jpg" style={{height:'100%'}} alt="Card image cap" />
                    <div style={{position: 'absolute', top: '1000px', left: 0, right: '1080px', bottom: 0}} className="mt-5">
                        <h1 className="headercomment">Your Cart is Empty</h1>
                    </div>
                </Fragment>
            }
            
            </div>
         );
    }
}
const MapstateToprops =(state)=>{
    return{
        Auth: state.Auth
    }
  }
 
export default connect(MapstateToprops, {LoginSuccessAction}) (Cart);

                