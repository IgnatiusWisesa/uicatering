import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import numeral from 'numeral'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner,Col,Row } from 'reactstrap'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import { Redirect, Link } from 'react-router-dom'
import {Growl} from 'primereact/growl';
import {FileUpload} from 'primereact/fileupload';
// import ReactMomentCountDown from 'react-moment-countdown';
import Countdown from 'react-countdown'
import moment from 'moment';
import { Table,CustomInput } from 'reactstrap'

class Cart extends Component {
    state = { 
        dataorder: [],
        datatunggu: [],
        modalDetailcat: false,
        modalDetailcust: false,
        indexDetail: '',
        tampilDetail: [],
        makanancustom: [],
        loading: true,
        modalkeafterorder: false,
        COall: false,
        timeCOall: -1,
        labeltranssatu: 'Select Image...',
        addimagefile: ''
     }

    componentDidMount(){
        Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`http://localhost:4000/orders/get-orders-tunggubayar/${this.props.Auth.id}`)
            .then((res1) => {
                for(var i=0;i<res1.data.length;i++){
                    if(Date.now()-res1.data[i].waktucekout>0){
                        Axios.delete(`http://localhost:4000/orders/delete-order/${res1.data[i].id}`)
                        .then((res2) => {
                            console.log(res2.data)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }

            }).catch((err) => {
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
            .then((res)=>{
                console.log(res.data)
                Axios.get(`http://localhost:4000/orders/get-orders-tunggubayar/${this.props.Auth.id}`)
                .then((res1) => {
                    console.log(res1.data)

                    for(var i=0;i<res1.data.length;i++){
                        for(var j=i;j<res1.data.length;j++){
                            if(res1.data[i].waktucekout==res1.data[j].waktucekout){
                                this.setState({dataorder: res.data, datatunggu: res1.data, COall:true, loading:false})
                            }
                        }
                    }
                    this.setState({dataorder: res.data, datatunggu: res1.data, loading:false})
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
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
        var putbaru = {...this.state.dataorder[del], detaili: this.state.dataorder[del].detail, makanani: this.state.dataorder[del].makanan,status: 'dihapus'}
        // console.log(this.state.dataorder)
        // console.log(putbaru)
        Axios.put(`http://localhost:4000/orders/edit-orders/${index}`,putbaru)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
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

    unpaid=(id, index)=>{
        Axios.delete(`http://localhost:4000/orders/delete-order/${id}`)
        .then((res) => {
            // console.log(res.data)
            Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
            .then((res)=>{
                console.log(res.data)
                Axios.get(`http://localhost:4000/orders/get-orders-tunggubayar/${this.props.Auth.id}`)
                .then((res1) => {
                    console.log(res1.data)
                    this.setState({dataorder: res.data, datatunggu: res1.data, loading:false})
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

    rendertunggu=()=>{
        console.log(this.state.datatunggu)
        return this.state.datatunggu.map((val,index) => {
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
                    <td style={{color:'red'}}>
                        <Countdown date={parseInt(val.waktucekout)} onComplete={()=>this.unpaid(val.id, index)} />
                    </td>
                    {
                        this.state.COall?
                        <td>
                            ***
                        </td>
                        :
                        <td>
                            <td>
                                <CustomInput id="foto" type='file' label={this.state.labeltranssatu} onChange={this.onAddImageFileChange} />
                            </td>
                            <td>
                                <button onClick={()=>this.adddata(val.id, index)}> add photo</button>
                            </td>
                        </td>
                    }
                </tr>
            )
        })
    }

    renderOrder=()=>{
        if(this.state.COall){
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
                        <td>***</td>
                        <td>
                            <button onClick={()=>this.modaldetail(index)} type="button" className="btn btn-outline-warning btn-rounded waves-effect">View Detail</button>
                        </td>
                    </tr>
                )
            })
        }
        else{
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
                        <td>***</td>
                        <td>
                            <button onClick={()=>this.modaldetail(index)} type="button" className="btn btn-outline-warning btn-rounded waves-effect">View Detail</button>
                            <button onClick={()=>this.hapus(val.id, index)} type="button" className="btn btn-outline-danger btn-rounded waves-effect">X</button>
                            <button onClick={()=>this.cekoutsatu(val.id, index)} type="button" className="btn btn-outline-success btn-rounded waves-effect">Check Out This Order</button>
                        </td>
                    </tr>
                )
            })
        }
    }

    cekoutsatu=(id,index)=>{
        let orderupdate = {...this.state.dataorder[index], makanani:this.state.dataorder[index].makanan, detaili:this.state.dataorder[index].detail ,status: 'tunggu bayar', waktucekout: Date.now()+3600000}
        // console.log(orderupdate)

        Axios.put(`http://localhost:4000/orders/edit-orders/${id}`, orderupdate)
        .then((res) => {
            Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
            .then((res)=>{
                console.log(res.data)
                Axios.get(`http://localhost:4000/orders/get-orders-tunggubayar/${this.props.Auth.id}`)
                .then((res1) => {
                    console.log(res1.data)
                    this.setState({dataorder: res.data, datatunggu: res1.data, loading:false})
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

    onAddImageFileChange=(e)=>{
        console.log(e.target.files[0])
        var file=e.target.files[0]

        if(file){
            this.setState({ labeltranssatu:file.name, addimagefile:file })
        }
        else{
            this.setState({ labeltranssatu:'Select Image...', addimagefile:undefined })
        }
    }

    adddata=(id, index)=>{
        var formdata = new FormData()

        // console.log(formdata)
        // console.log(this.props.Auth.id)
        let makanan = JSON.stringify(this.state.datatunggu[index].makanan)
        let detail = JSON.stringify(this.state.datatunggu[index].detail)

        let orderan = {
            userid: this.state.datatunggu[index].userid,
            merchant: this.state.datatunggu[index].merchant,
            type: this.state.datatunggu[index].type,
            order: this.state.datatunggu[index].order,
            makanan:makanan,
            price: this.state.datatunggu[index].price,
            status: this.state.datatunggu[index].status,
            tanggalpesanan: this.state.datatunggu[index].tanggalpesanan,
            undate: this.state.datatunggu[index].undate,
            detail:detail,
            waktucekout: this.state.datatunggu[index].waktucekout
        }

        var Headers = {
            headers:
            {
                'Content-Type':'multipart/form-data'
            }
        }
        formdata.append('image', this.state.addimagefile)
        formdata.append('data', JSON.stringify(orderan))
        // console.log(formdata)

        Axios.put(`http://localhost:4000/orders/put-transaksi/${id}`,formdata, Headers)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`http://localhost:4000/orders/get-orders-tunggubayar/${this.props.Auth.id}`)
            .then((res1) => {
                for(var i=0;i<res1.data.length;i++){
                    if(Date.now()-res1.data[i].waktucekout>0){
                        Axios.delete(`http://localhost:4000/orders/delete-order/${res1.data[i].id}`)
                        .then((res2) => {
                            console.log(res2.data)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }

                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
                .then((res)=>{
                    console.log(res.data)
                    Axios.get(`http://localhost:4000/orders/get-orders-tunggubayar/${this.props.Auth.id}`)
                    .then((res1) => {
                        console.log(res1.data)
                        this.setState({dataorder: res.data, datatunggu: res1.data, loading:false})
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    cekoutsemua=()=>{

        let idorders = []

        for(var i=0; i<this.state.dataorder.length;i++){
            idorders.push(
                this.state.dataorder[i].id
            )
        }

        console.log(idorders)
        Axios.put(`http://localhost:4000/orders/edit-orders-trans-all`, {
            id: idorders,
            waktucekout: Date.now()+3600000,
            status: 'tunggu bayar'
        })
        .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
            .then((res)=>{
                console.log(res.data)
                Axios.get(`http://localhost:4000/orders/get-orders-tunggubayar/${this.props.Auth.id}`)
                .then((res1) => {
                    console.log(res1.data)

                    for(var i=0;i<res1.data.length;i++){
                        for(var j=i;j<res1.data.length;j++){
                            if(res1.data[i].waktucekout==res1.data[j].waktucekout){
                                this.setState({dataorder: res.data, datatunggu: res1.data, COall:true, loading:false})
                            }
                        }
                    }
                    this.setState({dataorder: res.data, datatunggu: res1.data, loading:false})
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

    uploadimagesemua=(e)=>{
        console.log(e.target.value)
    }

    renderhargatotal=()=>{
        
        let output = 0
        for(var i=0;i<this.state.datatunggu.length;i++){
            output+=this.state.datatunggu[i].price
        }

        return(
            <h5>
                {'Rp.'+numeral(output).format('Rp,0.00')}
            </h5>
        )
    }

    adddatasemua=()=>{
        let userid = []
        for(var i=0;i<this.state.datatunggu.length;i++){
            userid.push(this.state.datatunggu[i].id)
        }

        var formdata = new FormData()

        var Headers = {
            headers:
            {
                'Content-Type':'multipart/form-data'
            }
        }
        formdata.append('image', this.state.addimagefile)
        formdata.append('userid', JSON.stringify(userid))
        Axios.put(`http://localhost:4000/orders/edit-orders-transtowait-all`,formdata, Headers)
        .then((res) => {
            console.log(res.data)

            Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
            .then((res)=>{
                console.log(res.data)
                Axios.get(`http://localhost:4000/orders/get-orders-tunggubayar/${this.props.Auth.id}`)
                .then((res1) => {
                    for(var i=0;i<res1.data.length;i++){
                        if(Date.now()-res1.data[i].waktucekout>0){
                            Axios.delete(`http://localhost:4000/orders/delete-order/${res1.data[i].id}`)
                            .then((res2) => {
                                console.log(res2.data)
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    }

                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                Axios.get(`http://localhost:4000/orders/get-orders-belumbayar/${this.props.Auth.id}`)
                .then((res)=>{
                    console.log(res.data)
                    Axios.get(`http://localhost:4000/orders/get-orders-tunggubayar/${this.props.Auth.id}`)
                    .then((res1) => {
                        console.log(res1.data)

                        for(var i=0;i<res1.data.length;i++){
                            for(var j=i;j<res1.data.length;j++){
                                if(res1.data[i].waktucekout==res1.data[j].waktucekout){
                                    this.setState({dataorder: res.data, datatunggu: res1.data, COall:false, loading:false})
                                }
                            }
                        }
                        this.setState({dataorder: res.data, datatunggu: res1.data, COall:false, loading:false})
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    render() { 
        if(this.state.loading){
            return(
                <div className="mb-5">
                    <div class="loading">Loading&#8230;</div>
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
                    <th scope="col">Exp. Time</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                    {this.rendertunggu()}
                    {this.renderOrder()}
                </tbody>
            </table>
            {
                this.state.dataorder.length || this.state.datatunggu.length && this.state.COall===false?
                <button type="button" onClick={this.cekoutsemua} className="btn btn-outline-default btn-rounded waves-effect mb-4">Check Out All Orders</button>
                :
                this.state.COall?
                <div className="mb-4">
                    {this.renderhargatotal()}
                    <div>
                        <table style={{marginLeft:'80vh'}}>
                            <tr className="mb-4">
                                <CustomInput id="foto" type='file' label={this.state.labeltranssatu} onChange={this.onAddImageFileChange} />
                            </tr>
                            <tr>
                                <button onClick={this.adddatasemua}> add photo</button>
                            </tr>
                        </table>
                    </div>
                </div>
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

                