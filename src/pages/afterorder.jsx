import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import numeral from 'numeral'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner,Col,Row } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import ImageUploader from 'react-images-upload';
import StarRatings from 'react-star-ratings';

class AfterOrder extends Component {
    state = { 
        dataonwaiting: [],
        dataonProgress:[],
        datatunggurating: [],
        loading: true,
        rating: 5,
        sudahselesai: false
     }

     componentDidMount(){
         Axios.get(`http://localhost:4000/orders/get-orders-onprogress/${this.props.Auth.id}`)
         .then((res)=>{
            console.log(res.data)
            Axios.get(`http://localhost:4000/orders/get-orders-onwaitingConfirm/${this.props.Auth.id}`)
            .then((res1) => {
                console.log(res1.data)
                Axios.get(`http://localhost:4000/orders/get-orders-tunggurating/${this.props.Auth.id}`)
                .then((res2) => {
                    this.setState({dataonProgress: res.data, dataonwaiting: res1.data, datatunggurating: res2.data, loading: false})
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

     finish=(id,index)=>{
        console.log(id, index)
        console.log(this.state.dataonProgress[index])
        let putbaru = ({...this.state.dataonProgress[index],makanani:this.state.dataonProgress[index].makanan, detaili:this.state.dataonProgress[index].detail, status:'tunggurating'})

        console.log(putbaru)

        Axios.put(`http://localhost:4000/orders/edit-orders/${id}`, putbaru)
        .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/orders/get-orders-onprogress/${this.props.Auth.id}`)
            .then((res)=>{
                console.log(res.data)
                Axios.get(`http://localhost:4000/orders/get-orders-onwaitingConfirm/${this.props.Auth.id}`)
                .then((res1) => {
                    console.log(res1.data)
                    Axios.get(`http://localhost:4000/orders/get-orders-tunggurating/${this.props.Auth.id}`)
                    .then((res2) => {
                        this.setState({dataonProgress: res.data, dataonwaiting: res1.data, datatunggurating: res2.data, loading: false})
                    }).catch((err) => {
                        console.log(err)
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

     sudahselesai=(rating, id, index)=>{
        // console.log(rating)
        // console.log(id, index)
        // console.log(this.state.datatunggurating[index].merchant)

        Axios.post(`http://localhost:4000/merchants/get-merchants_name`,{merchantname: this.state.datatunggurating[index].merchant})
        .then((res) => {
            // console.log(res.data[0].id)
            Axios.get(`http://localhost:4000/rating/get-rating/${res.data[0].id}`)
            .then((res1) => {
                // console.log(res1.data[0].idmerchants)
                Axios.put(`http://localhost:4000/rating/add-rating/${res1.data[0].idmerchants}`, {inputrating: rating})
                .then((res2) => {
                    console.log(res2.data)

                    let putbaru = ({
                        ...this.state.datatunggurating[index], 
                        makanani: this.state.datatunggurating[index].makanan,
                        detaili: this.state.datatunggurating[index].detail,
                        status: 'finish'
                    })
                    Axios.put(`http://localhost:4000/orders/edit-orders/${id}`, putbaru)
                    .then((res3)=>{
                        console.log(res3.data)
                        
                        // didmount ulang
                        Axios.get(`http://localhost:4000/orders/get-orders-onprogress/${this.props.Auth.id}`)
                        .then((res)=>{
                            console.log(res.data)
                            Axios.get(`http://localhost:4000/orders/get-orders-onwaitingConfirm/${this.props.Auth.id}`)
                            .then((res1) => {
                                console.log(res1.data)
                                Axios.get(`http://localhost:4000/orders/get-orders-tunggurating/${this.props.Auth.id}`)
                                .then((res2) => {
                                    this.setState({dataonProgress: res.data, dataonwaiting: res1.data, datatunggurating: res2.data, loading: false})
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }).catch((err) => {
                                console.log(err)
                            })
                        }).catch((err)=>{
                            console.log(err)
                        })
                        //

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

     rendertunggurating=()=>{
         return this.state.datatunggurating.map((val,index) => {
             return(
                 <tr key={index}>
                    <td style={{color:'orange'}}>Waiting for Feedback</td>
                    <td>{val.order}</td>
                    <td>{val.merchant}</td>
                    <td>{'Rp.'+numeral(val.price).format('Rp,0.00')}</td>
                    <td>
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="gold"
                            changeRating={(x)=>{this.sudahselesai(x, val.id, index)}}
                            numberOfStars={5}
                            name='rating'
                        />
                    </td>
                </tr>
             )
         })
     }

     renderonwaiting=()=>{
         return this.state.dataonwaiting.map((val,index) => {
             return(
                 <tr key={index}>
                    <td style={{color:'#f8615a'}}>{val.status}</td>
                    <td>{val.order}</td>
                    <td>{val.merchant}</td>
                    <td>{'Rp.'+numeral(val.price).format('Rp,0.00')}</td>
                    <td>***</td>
                </tr>
             )
         })
     }

     renderonProgress=()=>{
         return this.state.dataonProgress.map((val,index) => {
             return(
                <tr key={index}>
                    <td style={{color:'steelblue'}}>{val.status}</td>
                    <td>{val.order}</td>
                    <td>{val.merchant}</td>
                    <td>{'Rp.'+numeral(val.price).format('Rp,0.00')}</td>
                    <td style={{color:'green'}}>
                        <button type="button" onClick={()=>this.finish(val.id,index)} className="btn btn-outline-default btn-rounded waves-effect">Rate Us!</button>
                    </td>
                </tr>
             )
         })
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
                <table className="table table-hover mb-3">
                    <thead>
                    <tr>
                        <th scope="col">Status</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Merchant</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.rendertunggurating()}
                        {this.renderonProgress()}
                        {this.renderonwaiting()}
                    </tbody>
                </table>
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