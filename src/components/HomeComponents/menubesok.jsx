import React, { Component } from 'react';
import Slider from "react-slick";
import numeral from 'numeral'
import Axios from 'axios'
import { Link,Redirect } from 'react-router-dom'

class Menubesok extends Component {
    state = { 
        datamerchant:[
            "Resni's Kitchen",
            "Bakerzin",
            "Hadi's Kitchen"
        ],
        datamenubesok: [],
        loading: true
     }

     componentDidMount(){
        Axios.get('http://localhost:2000/menus')
        .then((res)=>{
          console.log(res.data)
          this.setState({datamenubesok: res.data, loading:false})
        }).catch((err)=>{
          console.log(err)
        })
     }

     renderCard =()=>{
       console.log(this.state.datamenubesok)
        return this.state.datamenubesok.map((val,index)=>{
          return(
            <div key={index}>
              <div className="mr-1">
                    {/* Card */}
                    <div className="card border" style={{width:'300px', height:'375px'}}>
                        {/* Card image */}
                        <div className="view overlay pl-4 rounded-top">
                        <Link to={'/ordercatering/'+parseInt(index+1)}>
                          <img className="card-img-top rounded-bottom" src={val.gam[0]} alt="Card image cap" style={{height:'180px', width:'90%'}} />
                          <a>
                              <div className="mask rgba-white-slight" />
                          </a>
                        </Link>
                        </div>
                        {/* Card content */}
                        <div className="card-body">
                        {/* Title */}
                        <p className="card-title">{val.hari[0]}</p>
                        {/* Text */}
                        <p className="card-text">Packages: {val.playlist}</p>
                        <p className="card-text">By: {val.merchant}</p>
                        <h5 className="card-title">{'Rp.'+numeral(val.harga).format('Rp,0.00')}</h5>
                        </div>
                    </div>
                    {/* Card */}
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
          var today = new Date();
          var dd = String(today.getDate()+1).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          today = dd + '/' + mm + '/' + yyyy;
          console.log(today)

          if(this.state.loading){
            return(
              <div>
                Loading..
              </div>
            )
          }

        return (
          <div className='mb-5'>
            <div className='subjudul'>
              <h3>Our Menus for Tommorow</h3>
              <h4>{today}</h4>
            </div>
            <Slider {...settings}>
              {this.renderCard()}
            </Slider>
            
          </div>
        );
     }
}
 
export default Menubesok;