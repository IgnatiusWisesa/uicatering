import React, { Component } from 'react';
import Slider from "react-slick";
import Axios from 'axios'
import { Link,Redirect } from 'react-router-dom'

class Playlist extends Component {
    state = { 
      dataplaylist: [],
      merchant:[
        "Resni's Kitchen",
        "Bakerzin",
        "Hadi's Kitchen"
      ] //ini juga nanti lewat backend
     }

    componentDidMount(){
      Axios.get('http://localhost:2000/playlists')
      .then((res)=>{
        console.log(res.data)
        this.setState({dataplaylist:res.data})
      }).catch((err)=>{
        console.log(err)
      })
    }

    renderPlaylist=()=>{
      console.log(this.state.dataplaylist)
      return this.state.dataplaylist.map((val,index)=>{
        return (
              <div key={index}>
                <div className="card ml-4" style={{height:'600px'}}>
                  {/* Card image */}
                  <img className="card-img-top" src={val.image} alt="Card image cap" style={{height:'300px'}} />
                  {/* Card content */}
                  <div className="card-body">
                  {/* Title */}
                  <h4 className="card-title"><a>{val.playlistname}</a></h4>
                  <h5 className="card-title"><a>{this.state.merchant[val.fromMerchant-1]}</a></h5>
                  {/* Text */}
                  <p className="card-text">{val.description}</p>
                  <p className="card-text">Package start from</p>
                  <h5>{val.priceFrom}</h5>
                  {/* Button */}
                  <Link to={'/ordercatering/'+parseInt(index+1)}>
                    <a className="btn" style={{color: '#ff8364'}}>Check Me!</a>
                  </Link>
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
          slidesToShow: 5, //ini harus diganti kalo yang ditampilin makin banyak
          swipeToSlide: true,
          afterChange: function(index) {
            console.log(
              `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
          }
        };
        return (
          <div className="mb-5">
            <div className='subjudul'>
              <h3>More Subscription</h3>
              <h4>From Our Best Pick</h4>
            </div>
            <Slider {...settings}>
              {this.renderPlaylist()}
            </Slider>
          </div>
        );
    }
}
 
export default Playlist;