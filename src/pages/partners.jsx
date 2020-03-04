import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import Axios from 'axios';
import { Link,Redirect } from 'react-router-dom'

class OrderCustoms extends Component {
    state = { 
        merchants: [],
        filtered: []
     }

    componentDidMount(){
        Axios.get(`http://localhost:4000/merchants/get-merchants_active`)
        .then((res)=>{
            console.log(res.data)
            this.setState({merchants: res.data,filtered:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    handleChange=(e)=> {
        console.log(e.target.value)

        let currentList = this.state.merchants //ini nanti harus diubah, ngambil dari redux (props)

        let newList = [];

        if (e.target.value !== "") {
            
        newList = currentList.filter(item => {
            const lc = item.name.toLowerCase();
            const filter = e.target.value.toLowerCase();
            return lc.includes(filter);
        });
        this.setState({filtered:newList})
        }
        else {

            newList = currentList;
            this.setState({filtered:newList})

        }
    }

    renderMerchants=()=>{
        return this.state.filtered.map((val,index)=>{
            return(
                <div key={index} className="card card-image mb-2" style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6xX4yf3lXqcdiE9H_kMS3C6CSQ8DH18EJp0T8Trr4D7ODLDle&s)'}}>
                    <div className="text-white rgba-stylish-strong py-1 px-1">
                    <div className="py-3 d-flex justify-content-between">
                        <div className="pl-2" >
                            <h3 className="h3 orange-text pl-4">{val.name}</h3>
                            <div style={{marginLeft:'20px'}}>
                                <StarRatings
                                rating={val.rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing="5px"
                                isSelectable={true}
                                />               
                            </div>
                        </div>
                        <div>
                            <Link to={'/merchantdetail/'+parseInt(index+1)}>
                                <a className="btn peach-gradient">Merchant Detail</a>
                            </Link>
                        </div>
                    </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        console.log(this.state.filtered)
        return ( 
            <div className="mb-5">

            <div className="input-group md-form form-sm form-2 pl-0">
                <input className="form-control my-0 py-1 amber-border" onChange={this.handleChange} type="text" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                <span className="input-group-text amber lighten-3" id="basic-text1"><i className="fas fa-search text-grey" aria-hidden="true" /></span>
                </div>
            </div>
            {this.renderMerchants()}
            </div>
         );
    }
}
 
export default OrderCustoms;