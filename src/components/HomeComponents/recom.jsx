import React, { Component } from 'react';
import Slider from "react-slick";
import Axios from 'axios'
import { Link,Redirect } from 'react-router-dom'

class Recom extends Component {
    state = {
		datamenufavorite: [],
		loading: true
	 }

	 componentDidMount(){
        Axios.get('http://localhost:4000/menus/get-menus_playlist_recom') //nanti 3 nya diganti sama props dari admin
        .then((res)=>{
          console.log(res.data)
		  this.setState({datamenufavorite: res.data, loading: false})
        }).catch((err)=>{
          console.log(err)
        })
     }

    render() {
		if(this.state.loading){
			return(
				<div>
					Loading..
				</div>
			)
		}

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
	
	if(this.state.datamenufavorite!==0){
		var makanan = []
			for(let i=0;i<this.state.datamenufavorite.hari.length;i++){
				makanan.push(
					this.state.datamenufavorite.hari[i].split('').filter((val, index)=>index<=30)
				)
			}
		
			var gambar = []
			for(let i=0;i<this.state.datamenufavorite.gam.length;i++){
				gambar.push(
					this.state.datamenufavorite.gam[i]
				)
			}

			var desc = []
			for(let i=0;i<this.state.datamenufavorite.desc.length;i++){
				desc.push(
					this.state.datamenufavorite.desc[i].split('').filter((val, index)=>index<=50)
				)
			}
		
		var today = new Date();
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		var tanggal = []
		tanggal.push(
			String(today.getDate()+1).padStart(2, '0') + '/' + mm + '/' + yyyy ,
			String(today.getDate()+2).padStart(2, '0') + '/' + mm + '/' + yyyy ,
			String(today.getDate()+3).padStart(2, '0') + '/' + mm + '/' + yyyy ,
			String(today.getDate()+4).padStart(2, '0') + '/' + mm + '/' + yyyy ,
			String(today.getDate()+5).padStart(2, '0') + '/' + mm + '/' + yyyy ,
			String(today.getDate()+6).padStart(2, '0') + '/' + mm + '/' + yyyy ,
			String(today.getDate()+7).padStart(2, '0') + '/' + mm + '/' + yyyy ,
			String(today.getDate()+8).padStart(2, '0') + '/' + mm + '/' + yyyy ,
			String(today.getDate()+9).padStart(2, '0') + '/' + mm + '/' + yyyy ,
			String(today.getDate()+10).padStart(2, '0') + '/' + mm + '/' + yyyy ,
		)
		// console.log(tanggal)
	}
	
	const semua = []
	for(var i=0; i<makanan.length; i++){
		semua.push(
			<div style={{width:'20px', height:'50px'}}>
				<div className="card card-image" style={{backgroundImage: `url(${gambar[i]})`, height:'100%', width:'100%'}}>
					<div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4" style={{height:'400px'}}>
					<div>
						<h5 className="pink-text"><i class="fas fa-bookmark" /> {tanggal[i]}</h5>
						<h3 className="card-title pt-2"><strong>{makanan[i]}</strong></h3>
						<p style={{fontSize:'20px'}}>{desc[i]}</p>
					</div>
					</div>
				</div>
			</div>
		)
	}

        return ( 
        <div className='mb-5'>
			{/* Jumbotron */}
			<div className="">
				{/* Card image */}
				<div className="view overlay rounded-top">
				<div>
			<div className='subjudul'>
				<h3 className="card-title h3 my-4">Our Recomendation Package</h3>
				<h4 className="card-title h5 my-4"><a>{this.state.datamenufavorite.playlist} - {this.state.datamenufavorite.merchant}</a></h4>
			</div>
			<Slider {...settings}>
				{semua}
			</Slider>
		</div>
			</div>
			{/* Nanti angka 3 nya lempar dari props */}
			<Link to={'/ordercatering/'+parseInt(3)}>
				<div className="card-body text-center mb-3">
					{/* Button */}
					<a className="btn" style={{color: '#ff8364'}}>View Package!</a>
				</div>
			</Link>
		</div>
		{/* Jumbotron */}
		</div>
         );
    }
}
 
export default Recom;