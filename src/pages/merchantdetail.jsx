import React, { Component } from 'react';
import Axios from 'axios';
import StarRatings from 'react-star-ratings';
import { LoginSuccessAction } from './../redux/actions'
import { connect } from 'react-redux'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'

class MerchantDetail extends Component {
    state = { 
        datamerchant: [],
        datakomentar: [],
        datausers: [],
        loading: true,
        komentar: ''
     }

     componentDidMount(){
         Axios.get(`http://localhost:4000/merchants/get-merchants/${this.props.match.params.id}`)
         .then((res)=>{
             console.log(res.data[0])
            Axios.get(`http://localhost:4000/comments/get-comments_merchants/${this.props.match.params.id}`)
            .then((res1)=>{
                console.log(res1.data)
                Axios.get(`http://localhost:4000/users/get-all`)
                .then((res2)=>{
                    console.log(res2.data)
                    this.setState({datamerchant:res.data[0], datakomentar: res1.data, datausers: res2.data, loading: false})
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
         }).catch((err)=>{
             console.log(err)
         })
     }

     commentbox=()=>{
        if(this.state.datakomentar){
            // console.log(this.state.datausers[this.state.datakomentar[0].userid].username)
            // console.log(this.state.datakomentar[0].userid)
    
            let output = []
            for(let i=0;i<this.state.datakomentar.length;i++){
                output.push(
                    <div className="media">
                        <div className="media-body">
                            <h5 className="mt-0 font-weight-bold orange-text">{this.state.datausers[this.state.datakomentar[i].userid-1].username}</h5>
                            {this.state.datakomentar[i].komentar}
                        </div>
                    </div>
                )
            }
            return output
        }
     }

     onSubmitKomen=()=>{
        if(this.props.Auth.username){
            let komentar = this.state.komentar
            let merchantid = this.state.datamerchant.id
            let userid = this.props.Auth.id

            let komentarbaru = {
                merchantid,
                komentar,
                userid
            }
            console.log(komentarbaru)

            Axios.post('http://localhost:4000/comments/add-comment', komentarbaru)
            .then((res)=>{
                Axios.get(`http://localhost:4000/comments/get-comments_merchants/${this.props.match.params.id}`)
                .then((res1)=>{
                    console.log(res.data)
                    console.log(res1.data)
                    this.setState({datakomentar:res1.data})
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
            

        }
     }

    render() { 
        if(this.state.loading){
            return(
              <div>loading</div>
            )
        }

        console.log(this.props.Auth)

        return (
            <div className="mb-5">
                <div className="mb-4">
                    <div><h1 className="subjudul">{this.state.datamerchant.name}</h1></div>
                    <div>
                            <StarRatings
                            rating={this.state.datamerchant.rating}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name='rating'
                            starDimension="20px"
                            starSpacing="5px"
                            isSelectable={true}
                            />
                    </div>
                </div>
            <div className="card-group mb-5">
                {/* Card */}
                <div className="card mb-4">
                {/* Card image */}
                <div className="view overlay">
                    <img className="card-img-top" src={this.state.datamerchant.Kitchen} style={{height:'100%'}} alt="Card image cap" />
                    <a>
                    <div className="mask rgba-white-slight" />
                    </a>
                </div>
                {/* Card content */}
                <div className="card-body">
                    {/* Title */}
                    <h4 className="card-title subjudul">Our kitchen</h4>
                    {/* Text */}
                    <p className="card-text deskripsi">Clean and standardize kitchen of Catering Market member.</p>
                </div>
                {/* Card content */}
                </div>
                {/* Card */}
                {/* Card */}
                <div className="card mb-4">
                {/* Card image */}
                <div className="view overlay">
                    <img className="card-img-top" src={this.state.datamerchant.Staff} style={{height:'100%'}} alt="Card image cap" />
                    <a>
                    <div className="mask rgba-white-slight" />
                    </a>
                </div>
                {/* Card content */}
                <div className="card-body">
                    {/* Title */}
                    <h4 className="card-title subjudul">Our Staff</h4>
                    {/* Text */}
                    <p className="card-text deskripsi">Experienced staff to prepare your food.</p>
                </div>
                {/* Card content */}
                </div>
                {/* Card */}
                {/* Card */}
                <div className="card mb-4">
                {/* Card image */}
                <div className="view overlay">
                    <img className="card-img-top" src={this.state.datamerchant.Photocook} style={{height:'100%'}} alt="Card image cap" />
                    <a>
                    <div className="mask rgba-white-slight" />
                    </a>
                </div>
                {/* Card content */}
                <div className="card-body">
                    {/* Title */}
                    <h4 className="card-title subjudul">Our Favorite Menu</h4>
                    {/* Text */}
                    <p className="card-text deskripsi">Favorite menu said by our customer.</p>
                </div>
                {/* Card content */}
                </div>
                {/* Card */}
            </div>
            
            <div className="container mt-4">
                <div className="row no-gutters">
                <div className="col-12 col-sm-6 col-md-8 pr-5">
                    <div className="mb-3">
                        <h3 className="headercomment">Comments</h3>
                        
                    </div>
                <div>
                    {this.commentbox()}
                    <div className="media mt-3 shadow-textarea">
                         <div className="media-body">
                             <h5 className="mt-0 font-weight-bold orange-text">{this.props.Auth.username}</h5>
                             <div className="form-group basic-textarea rounded-corners">
                             <textarea onChange={(e)=>this.setState({komentar: e.target.value})} className="form-control z-depth-1" name="komen" id="exampleFormControlTextarea345" rows={3} placeholder="Write your comment..." defaultValue={""} />
                             </div>
                         </div>
                    </div>
                    <div>
                        <Button color="secondary" onClick={this.onSubmitKomen}>Add Comment</Button>
                    </div>
                </div>
                    </div>
                    <div className="col-6 col-md-4">
                        <div className="d-flex justify-content-start">
                        <div>
                            <img className="d-flex rounded-circle avatar z-depth-1-half mr-3" src={this.state.datamerchant.PhotoManager} style={{height:'25vh', width:'30vh'}} alt="Card image cap" />
                        </div>
                        <div className="ml-4 mt-3">
                            <div className=""><h3>Manager on Duty: <a>{this.state.datamerchant.Manager}</a></h3></div>
                            <div className="subjudul ml-1">We proud to be part of Catering Market</div>
                        </div>
                    </div>
                    </div>
                    </div>
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
 
export default connect(MapstateToprops, {LoginSuccessAction}) (MerchantDetail);