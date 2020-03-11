import React, { Component } from 'react'
import Axios from 'axios';
import numeral from 'numeral'

class ConfirmTrans extends Component {
    state = { 
        datatrans: []
     }

    componentDidMount(){
        Axios.get(`http://localhost:4000/orders/get-orders-waiting`)
        .then((res) => {
            console.log(res.data)
            this.setState({ datatrans: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    toonprogress=(id,index)=>{
        let data = {...this.state.datatrans[index], status: 'onProgress', makanani:this.state.datatrans[index].makanan, detaili:this.state.datatrans[index].detail }
        
        console.log(data)

        Axios.put(`http://localhost:4000/orders/edit-orders/${id}`, data)
        .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/orders/get-orders-waiting`)
            .then((res1) => {
                console.log(res1.data)
                this.setState({ datatrans: res1.data })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    hapustrans=(id,index)=>{
        Axios.delete(`http://localhost:4000/orders/delete-order/${id}`)
        .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/orders/get-orders-waiting`)
            .then((res) => {
                console.log(res.data)
                this.setState({ datatrans: res.data })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    renderdatatrans=()=>{
        return this.state.datatrans.map((val,index) => {
            return(
                <tr key={index}>
                    <td>{val.order}</td>
                    <td>{val.merchant}</td>
                    <td>{'Rp.'+numeral(val.price).format('Rp,0.00')}</td>
                    <td>Ini bukti foto</td>
                    <td>
                    <button type="button" onClick={()=>this.toonprogress(val.id,index)} className="btn btn-outline-default btn-rounded waves-effect">Confirm Order</button>
                    <button type="button" onClick={()=>this.hapustrans(val.id,index)} className="btn btn-outline-danger btn-rounded waves-effect">X</button>
                    </td>
                </tr>
            )
        })
    }

    render() { 
        return ( 
            <div className="mb-5">
                <table className="table table-hover mb-3">
                    <thead>
                    <tr>
                        <th scope="col">Order Date</th>
                        <th scope="col">Merchant</th>
                        <th scope="col">Price</th>
                        <th scope="col">Transaction</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderdatatrans()}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default ConfirmTrans;