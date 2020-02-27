import React, { Component } from 'react';
import Axios from 'axios';
import Slider from "react-slick";

class Ordercustomselect extends Component {
    state = { 
        datamain: ''
     }

     componentDidMount(){
         Axios.get('http://localhost:2000/custommenu?merchant=Resni%27s%20Kitchen')
         .then((res)=>{
             console.log(res.data[0])
             this.setState({datamain: res.data[0]})
         }).catch((err)=>{
             console.log(err)
         })
     }

     cardMainDish=()=>{
        console.log(this.state.datamain)
        return this.state.datamain.localeCompare((val,index)=>{
            return(
            <div key={index}>
                <div className="card" style={{width:'250px', height:'350px'}}>
                    <img onClick={this.openModal} className="card-img-top" style={{height:'180px', cursor:'pointer'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT14WSgZF5CgqFNHLN6K6jTpocS6ozLWVO9yj9LuTGpzYOAgHh6&s" alt="Card image cap" data-toggle="modal" data-target="basicExampleModal" />
                    <div>
                        <h5 className="subjudul">Rice</h5>
                        <p className="deskripsi">
                        {val.descmain.split('').filter((val, index)=>index<=15)}
                        ...
                        </p>
                        <p className="card-text">Harga</p>
                        <a className="btn" style={{color: '#ff8364'}}><strong>Select</strong></a>
                    </div>
                </div>
            </div>
            )
        })
     }

    render() {
        const settings = {
            className: "center",
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 5,
            swipeToSlide: true,
            afterChange: function(index) {
              console.log(
              `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
              );
            }
            };
        return ( 
            <div className="mb-5">
              <Slider {...settings}>
                {this.cardMainDish()}
              </Slider>
            </div>
         );
    }
}
 
export default Ordercustomselect;