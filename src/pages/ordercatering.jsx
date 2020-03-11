import React, { Component } from 'react';
import Axios from 'axios';
import numeral from 'numeral'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import { Redirect, Link } from 'react-router-dom'

class OrderCatering extends Component {
    state = { 
        gambar: 'https://i.gifer.com/6lS.gif',
        dataplaylist: [],
        datamenu: [],
        belumpilih: true,
        jumlahhari: 0,
        indexDetail: 0,
        modalDetail: false,
        QO: [1,1,1,1,1,1,1,1,1,1],
        loading: true,
        modalkelogin: false,
        diskon: [
            1,
            0.97,
            0.93,
            0.9,
            0.85
        ],
        jumlah: 1,
        sukseskehome: false
     }

     componentDidMount(){
        //  console.log(this.props.match.params.id)
         Axios.get(`http://localhost:4000/playlists/get-playlists_playlistid/${this.props.match.params.id}`)
         .then((res)=>{
             Axios.get(`http://localhost:4000/menus/get-menus_playlist/${this.props.match.params.id}`)
             .then((res1)=>{
                 console.log(res.data[0])
                 console.log(res1.data)
                 this.setState({dataplaylist:res.data[0], datamenu: res1.data, harga: res1.data.harga,loading: false})
             }).catch((err1)=>{
                console.log(err1)
             })
         }).catch((err)=>{
             console.log(err)
         })
     }

     belumpilih =()=>{
        // harga 3 hari diskon 3%
        // harga 5 hari diskon 7%
        // harga 6 hari diskon 10%
        // harga 30 hari diskon 15%

        var harga1 = this.state.datamenu.harga * this.state.diskon[0]
        var harga3 = (this.state.datamenu.harga * 3) * this.state.diskon[1]
        var harga5 = (this.state.datamenu.harga * 5) * this.state.diskon[2]
        var harga6 = (this.state.datamenu.harga * 6) * this.state.diskon[3]
        var harga30 = (this.state.datamenu.harga * 30) * this.state.diskon[4]

        return(
            <div>
                <h3 className='subjudul'>About the Package</h3>
                <h4 className='deskripsi mb-4'>{this.state.dataplaylist.longdesc}</h4>
                <h3 className='subjudul'>Pick your meal plan</h3>
                <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:1, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>One-Day Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga1).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:3, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Three-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga3).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:5, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Five-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga5).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:6, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>Six-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga6).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:30, belumpilih: false})}}>
                    <div>
                        <h4 className="card-title"><a>30-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga30).format('Rp,0.00')}</p>
                    </div>
                </button>
                </div>
            </div>
        )
     }

     satuhari=()=>{
         
        // harga 3 hari diskon 3%
        // harga 5 hari diskon 7%
        // harga 6 hari diskon 10%
        // harga 30 hari diskon 15%

        var harga1 = this.state.datamenu.harga * this.state.jumlah * this.state.diskon[0]
        var harga3 = (this.state.datamenu.harga * 3) * this.state.diskon[1]
        var harga5 = (this.state.datamenu.harga * 5) * this.state.diskon[2]
        var harga6 = (this.state.datamenu.harga * 6) * this.state.diskon[3]
        var harga30 = (this.state.datamenu.harga * 30) * this.state.diskon[4]

        return(
            <div>
                <h3 className='subjudul'>About the Package</h3>
                <h4 className='deskripsi mb-4'>{this.state.dataplaylist.longdesc}</h4>
                <h3 className='subjudul'>Pick your meal plan</h3>
                <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({jumlahhari:0, belumpilih: true})}}>
                    <div>
                        <h4 className="card-title"><a>One-Day Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga1).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:3})}}>
                    <div>
                        <h4 className="card-title"><a>Three-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga3).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:5})}}>
                    <div>
                        <h4 className="card-title"><a>Five-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga5).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:6})}}>
                    <div>
                        <h4 className="card-title"><a>Six-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga6).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:30})}}> 
                    <div>
                        <h4 className="card-title"><a>30-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga30).format('Rp,0.00')}</p>
                    </div>
                </button>
                </div>
            </div>
        )
     }

     tigahari =()=>{

        // harga 3 hari diskon 3%
        // harga 5 hari diskon 7%
        // harga 6 hari diskon 10%
        // harga 30 hari diskon 15%

        var harga1 = this.state.datamenu.harga * this.state.diskon[0]
        if(this.state.jumlah===1){
            var harga3 = (this.state.datamenu.harga * 3)* this.state.diskon[1]
        }
        else{
            var harga3 = (this.state.datamenu.harga * this.state.jumlah)* this.state.diskon[1]
        }
        var harga5 = (this.state.datamenu.harga * 5) * this.state.diskon[2]
        var harga6 = (this.state.datamenu.harga * 6) * this.state.diskon[3]
        var harga30 = (this.state.datamenu.harga * 30) * this.state.diskon[4]

        return(
            <div>
                <h3 className='subjudul'>About the Package</h3>
                <h4 className='deskripsi mb-4'>{this.state.dataplaylist.longdesc}</h4>
                <h3 className='subjudul'>Pick your meal plan</h3><a className="sale" style={{color:"red"}}>3% Discount</a>
                <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:1})}}>
                    <div>
                        <h4 className="card-title"><a>One-Day Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga1).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({jumlahhari:0, belumpilih: true})}}>
                    <div>
                        <h4 className="card-title"><a>Three-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga3).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:5})}}>
                    <div>
                        <h4 className="card-title"><a>Five-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga5).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:6})}}>
                    <div>
                        <h4 className="card-title"><a>Six-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga6).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:30})}}>
                    <div>
                        <h4 className="card-title"><a>30-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga30).format('Rp,0.00')}</p>
                    </div>
                </button>
                </div>
            </div>
        )
     }

     limahari =()=>{
        
        // harga 3 hari diskon 3%
        // harga 5 hari diskon 7%
        // harga 6 hari diskon 10%
        // harga 30 hari diskon 15%

        var harga1 = this.state.datamenu.harga * this.state.diskon[0]
        var harga3 = (this.state.datamenu.harga * 3) * this.state.diskon[1]
        if(this.state.jumlah===1){
            var harga5 = (this.state.datamenu.harga * 5) * this.state.diskon[2]
        }
        else{
            var harga5 = (this.state.datamenu.harga * this.state.jumlah) * this.state.diskon[2]
        }
        var harga6 = (this.state.datamenu.harga * 6) * this.state.diskon[3]
        var harga30 = (this.state.datamenu.harga * 30) * this.state.diskon[4]

        return(
            <div>
                <h3 className='subjudul'>About the Package</h3>
                <h4 className='deskripsi mb-4'>{this.state.dataplaylist.longdesc}</h4>
                <h3 className='subjudul'>Pick your meal plan</h3><a className="sale" style={{color:"red"}}>7% Discount</a>
                <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:1})}}>
                    <div>
                        <h4 className="card-title"><a>One-Day Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga1).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:3})}}>
                    <div>
                        <h4 className="card-title"><a>Three-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga3).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({jumlahhari:0, belumpilih: true})}}>
                    <div>
                        <h4 className="card-title"><a>Five-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga5).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:6})}}>
                    <div>
                        <h4 className="card-title"><a>Six-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga6).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:30})}}>
                    <div>
                        <h4 className="card-title"><a>30-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga30).format('Rp,0.00')}</p>
                    </div>
                </button>
                </div>
            </div>
        )
     }

     enamhari =()=>{
         
        // harga 3 hari diskon 3%
        // harga 5 hari diskon 7%
        // harga 6 hari diskon 10%
        // harga 30 hari diskon 15%

        var harga1 = this.state.datamenu.harga * this.state.diskon[0]
        var harga3 = (this.state.datamenu.harga * 3) * this.state.diskon[1]
        var harga5 = (this.state.datamenu.harga * 5) * this.state.diskon[2]
        if(this.state.jumlah===1){
            var harga6 = (this.state.datamenu.harga * 6) * this.state.diskon[3]
        }
        else{
            var harga6 = (this.state.datamenu.harga * this.state.jumlah) * this.state.diskon[3]
        }
        var harga30 = (this.state.datamenu.harga * 30) * this.state.diskon[4]

        return(
            <div>
                <h3 className='subjudul'>About the Package</h3>
                <h4 className='deskripsi mb-4'>{this.state.dataplaylist.longdesc}</h4>
                <h3 className='subjudul'>Pick your meal plan</h3><a className="sale" style={{color:"red"}}>10% Discount</a>
                <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:1})}}>
                    <div>
                        <h4 className="card-title"><a>One-Day Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga1).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:3})}}>
                    <div>
                        <h4 className="card-title"><a>Three-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga3).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:5})}}>
                    <div>
                        <h4 className="card-title"><a>Five-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga5).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({jumlahhari:0, belumpilih: true})}}>
                    <div>
                        <h4 className="card-title"><a>Six-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga6).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:30})}}>
                    <div>
                        <h4 className="card-title"><a>30-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga30).format('Rp,0.00')}</p>
                    </div>
                </button>
                </div>
            </div>
        )
     }

     tigapuluhhari =()=>{

        // harga 3 hari diskon 3%
        // harga 5 hari diskon 7%
        // harga 6 hari diskon 10%
        // harga 30 hari diskon 15%

        var harga1 = this.state.datamenu.harga * this.state.diskon[0]
        var harga3 = (this.state.datamenu.harga * 3) * this.state.diskon[1]
        var harga5 = (this.state.datamenu.harga * 5) * this.state.diskon[2]
        var harga6 = (this.state.datamenu.harga * 6) * this.state.diskon[3]
        if(this.state.jumlah===1){
            var harga30 = (this.state.datamenu.harga * 30) * this.state.diskon[4]
        }
        else{
            var harga30 = (this.state.datamenu.harga * this.state.jumlah) * this.state.diskon[4]
        }

        return(
            <div>
                <h3 className='subjudul'>About the Package</h3>
                <h4 className='deskripsi mb-4'>{this.state.dataplaylist.longdesc}</h4>
                <h3 className='subjudul'>Pick your meal plan</h3><a className="sale" style={{color:"red"}}>15% Discount</a>
                <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:1})}}>
                    <div>
                        <h4 className="card-title"><a>One-Day Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga1).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:3})}}>
                    <div>
                        <h4 className="card-title"><a>Three-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga3).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:5})}}>
                    <div>
                        <h4 className="card-title"><a>Five-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga5).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({jumlahhari:6})}}>
                    <div>
                        <h4 className="card-title"><a>Six-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga6).format('Rp,0.00')}</p>
                    </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({jumlahhari:0, belumpilih: true})}}>
                    <div>
                        <h4 className="card-title"><a>30-Days Package</a></h4>
                        <p className="card-text">{'Rp.'+numeral(harga30).format('Rp,0.00')}</p>
                    </div>
                </button>
                </div>
            </div>
        )
     }
    
    cardmakanan =()=>{
        let QO = this.state.QO

        let panjangcard = 0

        if(this.state.datamenu.hari.length<this.state.jumlahhari){
            panjangcard=this.state.datamenu.hari.length
        }
        else{
            panjangcard=this.state.jumlahhari
        }

        var output = []
        for(let i=0;i<panjangcard;i++){

        var tanggal = new Date();
        var dd = String(tanggal.getDate()+(1+i)).padStart(2, '0');
        var mm = String(tanggal.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = tanggal.getFullYear();
        tanggal = dd + '/' + mm + '/' + yyyy;
        
        output.push(
            <div key={i}>
                <div className="card" style={{width:'250px', height:'350px'}}>
                    <img onClick={()=>this.detailmakanan(i)} className="card-img-top" style={{height:'140px', cursor:'pointer'}} src={this.state.datamenu.gam[i]} alt="Card image cap" data-toggle="modal" data-target="basicExampleModal" />
                    <div className="card-body">
                    <p className="card-title">{this.state.datamenu.hari[i].split('').filter((val, index)=>index<=23)}</p>
                    <p className="card-text">{tanggal}</p>
                    <p className="card-text">Quantity Order: <a>{QO[i]}</a></p>
                        <a onClick={()=>this.orderquant(i,'kurang')} className="btn" style={{color: '#ff8364'}}><strong>-</strong></a>
                        <a onClick={()=>this.orderquant(i,'tambah')} className="btn" style={{color: '#ff8364'}}><strong>+</strong></a>
                    </div>
                </div>
            </div>
            )
          }

         return(
             <div>
                <h3 className='subjudul'>Your Package</h3>
                    <div className="d-flex flex-wrap justify-content-start">
                        {output}
                    </div>
             </div>
         )
     }

     orderquant=(index,simbol)=>{
        // console.log(index)
        // console.log(simbol)
        // console.log(this.state.QO[0]-1)


        let panjangcard = 0

        if(this.state.datamenu.hari.length<this.state.jumlahhari){
            panjangcard=this.state.datamenu.hari.length
        }
        else{
            panjangcard=this.state.jumlahhari
        }

        // console.log(this.state.jumlahhari)
        if(simbol==='tambah'){
            let output = []
            for(let j=0; j<panjangcard;j++){
                if(index===j){
                    output.push(this.state.QO[j]+1)
                }
                else if(this.state.QO[j]===undefined){
                    output.push(1)
                }
                else{
                    output.push(this.state.QO[j])
                }
            }
            console.log(output)
            let jumlah = 0
            for(let i=0;i<output.length;i++){
                jumlah += output[i]
            }
            console.log(jumlah)
            this.setState({QO: output, jumlah:jumlah})
          }
        else if(simbol==='kurang'){
            let output = []
            for(let j=0; j<panjangcard;j++){
                if(this.state.QO[j]<1){
                    output.push(0)
                }
                else if(index===j){
                    output.push(this.state.QO[j]-1)
                }
                else if(this.state.QO[j]===undefined){
                    output.push(1)
                }
                else{
                    output.push(this.state.QO[j])
                }
            }
            console.log(output)
            let jumlah = 0
            for(let i=0;i<output.length;i++){
                jumlah += output[i]
            }
            console.log(jumlah)
            this.setState({QO: output, jumlah:jumlah})
        }
     }

     renderButtonSubmit=()=>{
         return(
             <div className="mt-3">
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={this.order}>
                    <div>
                        <h4 className="card-title"><a>Order</a></h4>
                    </div>
                </button>
             </div>
         )
     }

     order=()=>{
         if(this.props.Auth.username){
            console.log('masuk order')

            let userid = this.props.Auth.id
            let type = 1
            let merchantid = this.state.dataplaylist.fromMerchant
            let status = "belum bayar"

            var tanggal = new Date();
            var dd = String(tanggal.getDate()).padStart(2, '0');
            var mm = String(tanggal.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = tanggal.getFullYear();
            tanggal = dd + '/' + mm + '/' + yyyy;

            let makanani = []
            let order = tanggal

            // console.log(this.state.datamenu.harga)
            // console.log(this.state.jumlah)
            // console.log(this.state.jumlahhari)

            let harga = 0
            if(this.state.jumlahhari===1){
                harga = this.state.diskon[0] * this.state.datamenu.harga * this.state.jumlah
            }
            else if(this.state.jumlahhari===3){
                harga = this.state.diskon[1] * this.state.datamenu.harga * this.state.jumlah
            }
            else if(this.state.jumlahhari===5){
                harga = this.state.diskon[2] * this.state.datamenu.harga * this.state.jumlah
            }
            else if(this.state.jumlahhari===6){
                harga = this.state.diskon[3] * this.state.datamenu.harga * this.state.jumlah
            }
            else if(this.state.jumlahhari===30){
                harga = this.state.diskon[4] * this.state.datamenu.harga * this.state.jumlah
            }
            
            let panjangcard = 0

            if(this.state.datamenu.hari.length<this.state.jumlahhari){
                panjangcard=this.state.datamenu.hari.length
            }
            else{
                panjangcard=this.state.jumlahhari
            }

            let detail0 = []
            let detail1 = []
            let detail2 = []
            for(let i=0; i<panjangcard;i++){
                var tanggal = new Date();
                var dd = String(tanggal.getDate() + i).padStart(2, '0');
                var mm = String(tanggal.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = tanggal.getFullYear();
                detail0.push(
                    tanggal = dd + '/' + mm + '/' + yyyy
                )
                detail1.push(
                    this.state.datamenu.hari[i]
                )
                detail2.push(
                    this.state.QO[i]
                )
            }
            let detaili = [detail0,detail1,detail2]
            
            let orderbaru={
                userid,
                merchant: this.state.datamenu.merchant,
                type,
                order,
                detaili,
                makanani,
                price:harga,
                status,
                tanggalpesanan:Math.round(new Date().getTime()/1000)
            }
            console.log(orderbaru)

            Axios.post(`http://localhost:4000/orders/add-orders`, orderbaru)
            .then((res)=>{
                console.log(res.data)
                this.setState({sukseskehome: true})
            }).catch((err)=>{
                console.log(err)
            })

         }
         else{
             this.setState({modalkelogin: true})
         }
     }

     detailmakanan=(index)=>{
        console.log('masuk')
        console.log(index)
        // console.log(this.state.datamenu.ing[index])

        this.setState({indexDetail: index, modalDetail: true})
     }

    render() {
        if(this.state.loading){
            return(
              <div className="mb-5">
                Loading..
              </div>
            )
        }
        
        if(this.state.modalkelogin){
            return(
                <Modal isOpen={this.state.modalkelogin} toggle={()=>this.setState({modalkelogin:false})}>
                    <ModalHeader style={{backgroundColor:'#ff8364'}}>
                        <div>
                            You Have to Login First!
                        </div>
                    </ModalHeader>
                    <Link to={'/login'}>
                        <Button color="warning" style={{width:'97%'}}>Oke!</Button>
                    </Link>
                    <Button color="secondary" onClick={()=>this.setState({modalkelogin:false})}>Close</Button>
                </Modal>
            )
        }

        if(this.state.sukseskehome){
            return(
                <Modal isOpen={this.state.sukseskehome} toggle={()=>this.setState({sukseskehome:false})}>
                    <ModalHeader style={{backgroundColor:'#ff8364'}}>
                        <div>
                            Your Order Are in Place!
                        </div>
                    </ModalHeader>
                    <Link to={'/'}>
                        <Button color="warning" style={{width:'97%'}}>Oke!</Button>
                    </Link>
                    {/* <Button color="secondary" onClick={()=>this.setState({sukseskehome:false})}>Close</Button> */}
                </Modal>
            )
        }

        if(this.state.belumpilih){
            return(
            <div className='mb-5'>
                <img style={{height:'550px', width:'100%'}} src={this.state.gambar} />
                {this.belumpilih()}
            </div>
            )
        }else if(this.state.jumlahhari===1 && this.state.belumpilih===false){
            return(
            <div className='mb-5'>
                <img style={{height:'550px', width:'100%'}} src={this.state.gambar} />

                <Modal isOpen={this.state.modalDetail} toggle={()=>this.setState({modalDetail:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <img className="card-img-top" src={this.state.datamenu.gam[this.state.indexDetail]} alt="Card image cap" />
                        <div className="card-body">
                        <h4 className="card-title"><a>{this.state.datamenu.hari[this.state.indexDetail]}</a></h4>
                        <p className="card-text">{this.state.datamenu.desc[this.state.indexDetail]}</p>
                        <h4 className="card-title"><a>Ingridients</a></h4>
                        <p className="card-text">{this.state.datamenu.ing[this.state.indexDetail].map((val)=>{
                                return val+' '
                            })}</p>
                        <h4 className="card-title"><a>Nutrition</a></h4>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Calories</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][0]}</a> <a> kcal</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Fat</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][1]}</a> <a> g</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Carbohydrates</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][2]}</a> <a> g</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Protein</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][3]}</a> <a> g</a></p>
                        </div>
                        </div>
                    </div>
                        <Button color="secondary" onClick={()=>this.setState({modalDetail:false})}>Close</Button>
                </Modal>

                {this.satuhari()}
                {this.cardmakanan()}
                {this.renderButtonSubmit()}

            </div>
            )
        }else if(this.state.jumlahhari===3 && this.state.belumpilih===false){
            return(
            <div className='mb-5'>
                <img style={{height:'550px', width:'100%'}} src={this.state.gambar} />
                
                <Modal isOpen={this.state.modalDetail} toggle={()=>this.setState({modalDetail:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <img className="card-img-top" src={this.state.datamenu.gam[this.state.indexDetail]} alt="Card image cap" />
                        <div className="card-body">
                        <h4 className="card-title"><a>{this.state.datamenu.hari[this.state.indexDetail]}</a></h4>
                        <p className="card-text">{this.state.datamenu.desc[this.state.indexDetail]}</p>
                        <h4 className="card-title"><a>Ingridients</a></h4>
                        <p className="card-text">{this.state.datamenu.ing[this.state.indexDetail].map((val)=>{
                                return val+' '
                            })}</p>
                        <h4 className="card-title"><a>Nutrition</a></h4>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Calories</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][0]}</a> <a> kcal</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Fat</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][1]}</a> <a> g</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Carbohydrates</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][2]}</a> <a> g</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Protein</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][3]}</a> <a> g</a></p>
                        </div>
                        </div>
                    </div>
                        <Button color="secondary" onClick={()=>this.setState({modalDetail:false})}>Close</Button>
                </Modal>

                {this.tigahari()}
                {this.cardmakanan()}
                {this.renderButtonSubmit()}
            </div>
            )
        }else if(this.state.jumlahhari===5 && this.state.belumpilih===false){
            return(
            <div className='mb-5'>
                <img style={{height:'550px', width:'100%'}} src={this.state.gambar} />

                <Modal isOpen={this.state.modalDetail} toggle={()=>this.setState({modalDetail:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <img className="card-img-top" src={this.state.datamenu.gam[this.state.indexDetail]} alt="Card image cap" />
                        <div className="card-body">
                        <h4 className="card-title"><a>{this.state.datamenu.hari[this.state.indexDetail]}</a></h4>
                        <p className="card-text">{this.state.datamenu.desc[this.state.indexDetail]}</p>
                        <h4 className="card-title"><a>Ingridients</a></h4>
                        <p className="card-text">{this.state.datamenu.ing[this.state.indexDetail].map((val)=>{
                                return val+' '
                            })}</p>
                        <h4 className="card-title"><a>Nutrition</a></h4>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Calories</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][0]}</a> <a> kcal</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Fat</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][1]}</a> <a> g</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Carbohydrates</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][2]}</a> <a> g</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Protein</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][3]}</a> <a> g</a></p>
                        </div>
                        </div>
                    </div>
                        <Button color="secondary" onClick={()=>this.setState({modalDetail:false})}>Close</Button>
                </Modal>

                {this.limahari()}
                {this.cardmakanan()}
                {this.renderButtonSubmit()}
            </div>
            )
        }else if(this.state.jumlahhari===6 && this.state.belumpilih===false){
            return(
            <div className='mb-5'>
                <img style={{height:'550px', width:'100%'}} src={this.state.gambar} />

                <Modal isOpen={this.state.modalDetail} toggle={()=>this.setState({modalDetail:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <img className="card-img-top" src={this.state.datamenu.gam[this.state.indexDetail]} alt="Card image cap" />
                        <div className="card-body">
                        <h4 className="card-title"><a>{this.state.datamenu.hari[this.state.indexDetail]}</a></h4>
                        <p className="card-text">{this.state.datamenu.desc[this.state.indexDetail]}</p>
                        <h4 className="card-title"><a>Ingridients</a></h4>
                        <p className="card-text">{this.state.datamenu.ing[this.state.indexDetail].map((val)=>{
                                return val+' '
                            })}</p>
                        <h4 className="card-title"><a>Nutrition</a></h4>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Calories</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][0]}</a> <a> kcal</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Fat</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][1]}</a> <a> g</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Carbohydrates</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][2]}</a> <a> g</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Protein</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][3]}</a> <a> g</a></p>
                        </div>
                        </div>
                    </div>
                        <Button color="secondary" onClick={()=>this.setState({modalDetail:false})}>Close</Button>
                </Modal>

                {this.enamhari()}
                {this.cardmakanan()}
                {this.renderButtonSubmit()}
            </div>
            )
        }else if(this.state.jumlahhari===30 && this.state.belumpilih===false){
            return(
            <div className='mb-5'>
                <img style={{height:'550px', width:'100%'}} src={this.state.gambar} />

                <Modal isOpen={this.state.modalDetail} toggle={()=>this.setState({modalDetail:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <img className="card-img-top" src={this.state.datamenu.gam[this.state.indexDetail]} alt="Card image cap" />
                        <div className="card-body">
                        <h4 className="card-title"><a>{this.state.datamenu.hari[this.state.indexDetail]}</a></h4>
                        <p className="card-text">{this.state.datamenu.desc[this.state.indexDetail]}</p>
                        <h4 className="card-title"><a>Ingridients</a></h4>
                        <p className="card-text">{this.state.datamenu.ing[this.state.indexDetail].map((val)=>{
                                return val+' '
                            })}</p>
                        <h4 className="card-title"><a>Nutrition</a></h4>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Calories</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][0]}</a> <a> kcal</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Fat</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][1]}</a> <a> g</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Carbohydrates</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][2]}</a> <a> g</a></p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="card-title">Protein</p>
                            <p><a>{this.state.datamenu.nut[this.state.indexDetail][3]}</a> <a> g</a></p>
                        </div>
                        </div>
                    </div>
                        <Button color="secondary" onClick={()=>this.setState({modalDetail:false})}>Close</Button>
                </Modal>

                {this.tigapuluhhari()}
                {this.cardmakanan()}
                {this.renderButtonSubmit()}
            </div>
            )
        }

        return ( 
            <div className='mb-5'>
                <img style={{height:'550px', width:'100%'}} src={this.state.gambar} />
            </div>
         );
    }
}
const MapstateToprops =(state)=>{
    return{
        Auth: state.Auth
    }
}
 
export default connect(MapstateToprops, {LoginSuccessAction}) (OrderCatering);