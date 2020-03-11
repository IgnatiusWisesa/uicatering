import React, { Component } from 'react';
import Calendar from 'react-calendar';
import "react-datepicker/dist/react-datepicker.css";
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import Axios from 'axios';
import Slider from "react-slick";
import numeral from 'numeral'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import { Redirect, Link } from 'react-router-dom'

class Selectcustomorder extends Component {
    state = { 
      startDate: new Date(),
      date:'',
      packages: '',
      quantvalue: 0, 
      modalDetail: false,
      indexDetail: '',
      Tanggal:[

      ],
      datamain: [],
      loading:true,
      indexSelect: [],
      modalDetailExtras: false,
      indexDetailExtras: '',
      indexSelectExtras: [],
      modalDetailDrinks: false,
      indexDetailDrinks: '',
      indexSelectDrinks: [],
      orderclicked: false,
      modalisitanggal: false,
      modalisipaket: false,
      modalkelogin: false,
      modalkeprofilesetting: false,
      orderbaru : {},
      modalorder: false,
      sukseskehome: false
    }

    componentDidMount(){
      Axios.get(`http://localhost:4000/custmenus/getcustmenus-all/${this.props.match.params.id}`)
      .then((res)=>{
        console.log(res.data)
        Axios.get(`http://localhost:4000/orders/get-date-unavailable`)
        .then((res1) => {
          // console.log(res1.data[0].undate)
          // console.log(res1.data[1].undate)
          // console.log(res1.data[2].undate)
          
          console.log(res1.data)
          var tanggalun = []
          for(var i=0;i<res1.data.length;i++){
            var timestamp = res1.data[i].undate,
            date = new Date(timestamp * 1000),
            datevalues = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),[]
            )
            // console.log(datevalues)
            tanggalun.push(datevalues)
          }
          // console.log(tanggalun)
          this.setState({
            Tanggal: this.state.Tanggal.concat(tanggalun),
            datamain: res.data,
            loading:false
        });
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err)=>{
        console.log(err)
      })
    }

    cardMainDish=()=>{
      // console.log(this.state.indexSelect)
      let output = []
      for(let i=0;i<this.state.datamain.main.length;i++){
        output.push(
            <div>
              <div className="card" style={{width:'250px', height:'350px'}}>
                <img onClick={()=>this.openModal(i)} className="card-img-top" style={{height:'180px', cursor:'pointer'}} src={this.state.datamain.gambarmain[i]} alt="Card image cap" data-toggle="modal" data-target="basicExampleModal" />
                <div>
                  <h5 className="subjudul">{this.state.datamain.main[i].split('').filter((val, index)=>index<=23)}</h5>
                  <p className="deskripsi">
                    {this.state.datamain.descmain[i].split('').filter((val, index)=>index<=20)}...
                  </p>
                  <p className="card-text">{'Rp.'+numeral(this.state.datamain.hargamain[i]).format('Rp,0.00')}</p>
                    {this.state.indexSelect[i]===1?
                      <a className="btn aqua-gradient" onClick={()=>this.handleSelect(i)} style={{color: '#ff8364'}}><strong>Select</strong></a>
                      :
                      <a className="btn" onClick={()=>this.handleSelect(i)} style={{color: '#ff8364'}}><strong>Select</strong></a>
                    }

                </div>
              </div>
            </div>
          )
      }
      return output
    }

    cardExtras=()=>{
      let output = []
      for(let i=0;i<this.state.datamain.extras.length;i++){
        output.push(
            <div>
              <div className="card" style={{width:'250px', height:'350px'}}>
                <img onClick={()=>this.openModalExtras(i)} className="card-img-top" style={{height:'180px', cursor:'pointer'}} src={this.state.datamain.gambarextras[i]} alt="Card image cap" data-toggle="modal" data-target="basicExampleModal" />
                <div>
                  <h5 className="subjudul">{this.state.datamain.extras[i].split('').filter((val, index)=>index<=23)}</h5>
                  <p className="deskripsi">
                    {this.state.datamain.descextras[i].split('').filter((val, index)=>index<=20)}...
                  </p>
                  <p className="card-text">{'Rp.'+numeral(this.state.datamain.hargaextras[i]).format('Rp,0.00')}</p>
                    {this.state.indexSelectExtras[i]===1?
                      <a className="btn aqua-gradient" onClick={()=>this.handleSelectExtras(i)} style={{color: '#ff8364'}}><strong>Select</strong></a>
                      :
                      <a className="btn" onClick={()=>this.handleSelectExtras(i)} style={{color: '#ff8364'}}><strong>Select</strong></a>
                    }

                </div>
              </div>
            </div>
          )
      }
      return output
    }

    cardDrinks=()=>{
      let output = []
      for(let i=0;i<this.state.datamain.drinks.length;i++){
        output.push(
            <div>
              <div className="card" style={{width:'250px', height:'350px'}}>
                <img onClick={()=>this.openModalDrinks(i)} className="card-img-top" style={{height:'180px', cursor:'pointer'}} src={this.state.datamain.gambardrinks[i]} alt="Card image cap" data-toggle="modal" data-target="basicExampleModal" />
                <div>
                  <h5 className="subjudul">{this.state.datamain.drinks[i].split('').filter((val, index)=>index<=23)}</h5>
                  <p className="deskripsi">
                    {this.state.datamain.descdrinks[i].split('').filter((val, index)=>index<=20)}...
                  </p>
                  <p className="card-text">{'Rp.'+numeral(this.state.datamain.hargadrinks[i]).format('Rp,0.00')}</p>
                    {this.state.indexSelectDrinks[i]===1?
                      <a className="btn aqua-gradient" onClick={()=>this.handleSelectDrinks(i)} style={{color: '#ff8364'}}><strong>Select</strong></a>
                      :
                      <a className="btn" onClick={()=>this.handleSelectDrinks(i)} style={{color: '#ff8364'}}><strong>Select</strong></a>
                    }

                </div>
              </div>
            </div>
          )
      }
      return output
    }

    handleSelect=(index)=>{
      
      var joined = this.state.indexSelect.concat(index)

      var output=[]
      for(let i=0;i<this.state.datamain.main.length;i++){
        if(index===i){
          if(this.state.indexSelect[i]!==0){
            output.push(0)
          }
          else{
            output.push(1)
          }
        }
        else if(this.state.indexSelect[i]===1){
          output.push(1)
        }
        else{
          output.push(0)
        }
      }
      console.log(output)

      this.setState({indexSelect: output})
      // console.log(this.state.indexSelect)
    }

    handleSelectExtras=(index)=>{
      
      // var joined = this.state.indexSelect.concat(index)

      var output=[]
      for(let i=0;i<this.state.datamain.extras.length;i++){
        if(index===i){
          if(this.state.indexSelectExtras[i]!==0){
            output.push(0)
          }
          else{
            output.push(1)
          }
        }
        else if(this.state.indexSelectExtras[i]===1){
          output.push(1)
        }
        else{
          output.push(0)
        }
      }
      console.log(output)

      this.setState({indexSelectExtras: output})
      // console.log(this.state.indexSelect)
    }

    handleSelectDrinks=(index)=>{
      
      // var joined = this.state.indexSelect.concat(index)
      var output=[]
      for(let i=0;i<this.state.datamain.drinks.length;i++){
        if(index===i){
          if(this.state.indexSelectDrinks[i]!==0){
            output.push(0)
          }
          else{
            output.push(1)
          }
        }
        else if(this.state.indexSelectDrinks[i]===1){
          output.push(1)
        }
        else{
          output.push(0)
        }
      }
      console.log(output)

      this.setState({indexSelectDrinks: output})
      // console.log(this.state.indexSelect)
    }

    hitungquant =(tanda)=>{
      console.log(tanda)
      console.log(new Date(2020, 0, 24))
      if(this.state.packages==='buffet'){
        if(this.state.quantvalue<50){
          this.setState({quantvalue:50}) //ini nanti ambil dari database -->quantvalue
        }
        else{
          if(tanda==='tambah'){
            if(this.state.quantvalue<50){
              this.setState({quantvalue:50})
            }
            this.setState({quantvalue: this.state.quantvalue+1})
          }
          else if(tanda==='kurang'){
            
  
            if(this.state.quantvalue>50){
              this.setState({quantvalue: this.state.quantvalue-1})
            }else{
  
            }
          }
        }
      }

      else if(this.state.packages==='ricebox'){
        if(tanda==='tambah'){
          this.setState({quantvalue: this.state.quantvalue+1})
        }
        else if(tanda==='kurang'){
          if(this.state.quantvalue>0){
            this.setState({quantvalue: this.state.quantvalue-1})
          }else{

          }
        }
      }
    }

    openModal =(index)=>{
      this.setState({modalDetail: true, indexDetail: index})
    }

    openModalExtras =(index)=>{
      this.setState({modalDetailExtras: true, indexDetailExtras: index})
    }

    openModalDrinks =(index)=>{
      this.setState({modalDetailDrinks: true, indexDetailDrinks: index})
    }

    onChangeCalendar = (date) => {
      this.setState({ date })
    }

    pilihTanggal =(value)=>{
      console.log(value)
    }

    tanggal=({activedate, date, view }) =>{
      return  this.state.Tanggal.some(disabledDate =>date.getTime() === disabledDate.getTime())
    }

    orderClicked=()=>{
        if(this.props.Auth.id===''){
          this.setState({modalkelogin:true})
        }
        else if(this.props.Auth.first==='' || this.props.Auth.last==='' || this.props.Auth.phone==='' || this.props.Auth.email==='' || this.props.Auth.city==='' || this.props.Auth.fulladdress===''){
          this.setState({modalkeprofilesetting: true})
        }
        else if(this.state.date===''){
          this.setState({modalisitanggal: true})
        }
        else if(this.state.packages===''){
          this.setState({modalisipaket: true})
        }
        else{
          console.log('cek, masuk!')
          console.log(this.state.date)
          console.log(this.state.datamain.merchant)

          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          today = dd + '/' + mm + '/' + yyyy;
          console.log(today)
          // console.log(this.props.Auth.id)

          let harga=0
          for(let i=0; i<this.state.indexSelect.length;i++){
            if(this.state.indexSelect[i]===1){
              harga = harga + this.state.datamain.hargamain[i] * this.state.quantvalue
            }
          }
          for(let j=0; j<this.state.indexSelectExtras.length;j++){
            if(this.state.indexSelectExtras[j]===1){
              harga = harga + this.state.datamain.hargaextras[j] * this.state.quantvalue
            }
          }
          for(let k=0; k<this.state.indexSelectDrinks.length;k++){
            if(this.state.indexSelectDrinks[k]===1){
              harga = harga + this.state.datamain.hargadrinks[k] * this.state.quantvalue
            }
          }

          let type = 2
          let order = today
          // let merchantid = this.state.datamain.idmerchant
          let price = harga

          // console.log(this.state.date)

          var date = new Date(this.state.date)
          var mnth = ("0" + (date.getMonth() + 1)).slice(-2)
          var day = ("0" + date.getDate()).slice(-2)
          var year = this.state.date.getFullYear();
          // console.log(day+'/'+mnth+'/'+year)

          let detail0 = day+'/'+mnth+'/'+year
          let detail1 = this.props.Auth.fulladdress+' '+this.props.Auth.city
          let detail2 = this.state.packages
          let detail3 = this.state.quantvalue

          let detaili = [detail0,detail1,detail2,detail3] 

          let makanani = []
          for(let x=0;x<this.state.indexSelect.length;x++){
            if(this.state.indexSelect[x]===1){
              makanani.push(
                this.state.datamain.main[x]
              )
            }
          }
          for(let y=0;y<this.state.indexSelectExtras.length;y++){
            if(this.state.indexSelectExtras[y]===1){
              makanani.push(
                this.state.datamain.extras[y]
              )
            }
          }
          for(let z=0;z<this.state.indexSelectDrinks.length;z++){
            if(this.state.indexSelectDrinks[z]===1){
              makanani.push(
                this.state.datamain.drinks[z]
              )
            }
          }
          // console.log(makanan)
          let userid = this.props.Auth.id
          let status="belum bayar"
          let undate = 0

          var timestamp = Math.round(new Date(this.state.date).getTime()/1000)
          if(detail3>49){
            undate=timestamp
          }
          else{
            undate=null
          }
          console.log(undate)

          let orderbaru = {
            userid,
            type,
            order,
            merchant: this.state.datamain.merchant,
            price,
            detaili,
            makanani,
            status,
            tanggalpesanan: timestamp,
            undate
          }
          console.log(orderbaru)
          this.setState({orderbaru:orderbaru, modalorder:true})
        }
    }

    ngeputorderbaru=()=>{
      console.log(this.state.orderbaru)
      Axios.post(`http://localhost:4000/orders/add-orders`, this.state.orderbaru)
      .then((res)=>{
          console.log(res.data)
          this.setState({sukseskehome: true})
      }).catch((err)=>{
          console.log(err)
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

        if(this.state.loading){
          return(
            <div className="mb-5">
              Loading...
            </div>
          )
        }
        return ( 
        <div className="mb-5">

        <Modal isOpen={this.state.sukseskehome}>
            <ModalHeader style={{backgroundColor:'#ff8364'}}>
                <div>
                    Your order has been placed
                </div>
            </ModalHeader>
            <Link to={'/'}>
              <Button style={{width:'97%'}} color="warning">Okay!</Button>
            </Link>
        </Modal>
        
        {
          this.state.modalorder?
          <Modal isOpen={this.state.modalorder} toggle={()=>this.setState({modalorder:false})}>
              <ModalHeader style={{backgroundColor:'#ff8364'}}>
                  <div>
                      Check Your Order
                  </div>
              </ModalHeader>
              <ModalBody>
                Your Order: <br></br>
                Package: {this.state.orderbaru.detaili[2]} <br></br>
                For Date: {this.state.orderbaru.detaili[0]} <br></br>
                Place: {this.state.orderbaru.detaili[1]} <br></br>
                Quantity: {this.state.orderbaru.detaili[3]} <br></br>
                Price: {'Rp.'+numeral(this.state.orderbaru.price).format('Rp,0.00')}
              </ModalBody>
              <Button style={{width:'97%'}} onClick={this.ngeputorderbaru} color="warning">Okay!</Button>
              <Button color="secondary" onClick={()=>this.setState({modalorder:false})}>Close</Button>
          </Modal>
          :
          null
        }
        

        <Modal isOpen={this.state.modalkeprofilesetting} toggle={()=>this.setState({modalkeprofilesetting:false})}>
            <ModalHeader style={{backgroundColor:'#ff8364'}}>
                <div>
                    Please fill your profile data
                </div>
            </ModalHeader>
            <Link to={'/profilesetting'}>
              <Button style={{width:'97%'}} color="warning">Okay!</Button>
            </Link>
            <Button color="secondary" onClick={()=>this.setState({modalkeprofilesetting:false})}>Close</Button>
        </Modal>
        
        <Modal isOpen={this.state.modalkelogin} toggle={()=>this.setState({modalkelogin:false})}>
            <ModalHeader style={{backgroundColor:'#ff8364'}}>
                <div>
                    You Have to Login First!
                </div>
            </ModalHeader>
            <Link to={'/login'}>
              <Button style={{width:'97%'}} color="warning">Okay!</Button>
            </Link>
            <Button color="secondary" onClick={()=>this.setState({modalkelogin:false})}>Close</Button>
        </Modal>

        <Modal isOpen={this.state.modalisitanggal} toggle={()=>this.setState({modalisitanggal:false})}>
            <ModalHeader style={{backgroundColor:'#ff8364'}}>
                <div>
                    Pick a Date!
                </div>
            </ModalHeader>
            <Button color="secondary" onClick={()=>this.setState({modalisitanggal:false})}>Close</Button>
        </Modal>

        <Modal isOpen={this.state.modalisipaket} toggle={()=>this.setState({modalisipaket:false})}>
            <ModalHeader style={{backgroundColor:'#ff8364'}}>
                <div>
                    Pick your package!
                </div>
            </ModalHeader>
            <Button color="secondary" onClick={()=>this.setState({modalisipaket:false})}>Close</Button>
        </Modal>

        <Modal isOpen={this.state.orderclicked} toggle={()=>this.setState({orderclicked: false})}>
            {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
            <div className="card">
                Ini modal order clicked
            </div>
                <Button color="secondary" onClick={()=>this.setState({orderclicked: false})}>Close</Button>
        </Modal>

        <Modal isOpen={this.state.modalDetail} toggle={()=>this.setState({modalDetail: false})}>
            {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
            <div className="card">
                <img className="card-img-top" src={this.state.datamain.gambarmain[this.state.indexDetail]} alt="Card image cap" />
                <div className="card-body">
                <h4 className="card-title"><a>{this.state.datamain.main[this.state.indexDetail]}</a></h4>
                <p className="card-text">{this.state.datamain.descmain[this.state.indexDetail]}</p>
                <h4 className="card-title"><a>{'Rp.'+numeral(this.state.datamain.hargamain[this.state.indexDetail]).format('Rp,0.00')}</a></h4>
                </div>
            </div>
                <Button color="secondary" onClick={()=>this.setState({modalDetail: false})}>Close</Button>
        </Modal>

        <Modal isOpen={this.state.modalDetailExtras} toggle={()=>this.setState({modalDetailExtras: false})}>
            {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
            <div className="card">
                <img className="card-img-top" src={this.state.datamain.gambarextras[this.state.indexDetailExtras]} alt="Card image cap" />
                <div className="card-body">
                <h4 className="card-title"><a>{this.state.datamain.extras[this.state.indexDetailExtras]}</a></h4>
                <p className="card-text">{this.state.datamain.descextras[this.state.indexDetailExtras]}</p>
                <h4 className="card-title"><a>{'Rp.'+numeral(this.state.datamain.hargaextras[this.state.indexDetailExtras]).format('Rp,0.00')}</a></h4>
                </div>
            </div>
                <Button color="secondary" onClick={()=>this.setState({modalDetailExtras: false})}>Close</Button>
        </Modal>

        <Modal isOpen={this.state.modalDetailDrinks} toggle={()=>this.setState({modalDetailDrinks: false})}>
            {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
            <div className="card">
                <img className="card-img-top" src={this.state.datamain.gambardrinks[this.state.indexDetailDrinks]} alt="Card image cap" />
                <div className="card-body">
                <h4 className="card-title"><a>{this.state.datamain.drinks[this.state.indexDetailDrinks]}</a></h4>
                <p className="card-text">{this.state.datamain.descdrinks[this.state.indexDetailDrinks]}</p>
                <h4 className="card-title"><a>{'Rp.'+numeral(this.state.datamain.hargadrinks[this.state.indexDetailDrinks]).format('Rp,0.00')}</a></h4>
                </div>
            </div>
                <Button color="secondary" onClick={()=>this.setState({modalDetailDrinks: false})}>Close</Button>
        </Modal>

          <div className="mb-4">
            <h3 className='subjudul'>Check Avaibility</h3>
              <div>
                <center>
                  <Calendar
                    minDate={new Date()}
                    minDetail="year"
                    tileDisabled={this.tanggal}
                    onClickDay={()=>this.pilihTanggal(this.state.date)}
                    onChange={this.onChangeCalendar}
                    value={this.state.date}
                  />
                </center>
              </div>
          </div>
          <div className="mb-4">
            <h3 className='subjudul'>Packages</h3>
            {
              this.state.packages===''?
              <div>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({packages: 'buffet', quantvalue:50})}}>
                  <div>
                      <h4 className="card-title"><a>Buffet</a></h4>
                  </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({packages: 'ricebox', quantvalue:1})}}>
                  <div>
                      <h4 className="card-title"><a>Rice Box</a></h4>
                  </div>
                </button>
              </div>
              :this.state.packages==='buffet'?
              <div>
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({packages: ''})}}>
                  <div>
                      <h4 className="card-title"><a>Buffet</a></h4>
                      <p>For Large Order</p>
                  </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({packages: 'ricebox', quantvalue:1})}}>
                  <div>
                      <h4 className="card-title"><a>Rice Box</a></h4>
                  </div>
                </button>
              </div>
              :
              <div>
                <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={()=>{this.setState({packages: 'buffet', quantvalue:50})}}>
                  <div>
                      <h4 className="card-title"><a>Buffet</a></h4>
                  </div>
                </button>
                <button type="button" class="btn btn-outline-mdb-color waves-effect aqua-gradient" onClick={()=>{this.setState({packages: ''})}}>
                  <div>
                      <h4 className="card-title"><a>Rice Box</a></h4>
                      <p>There is no minimum order, don't worry!</p>
                  </div>
                </button>
              </div>
            }
          </div>
          <div className="mb-5">
            {
              this.state.packages==='buffet'?
              <div>
                <div>Quantity</div>
                <div>
                  <span onClick={()=>this.hitungquant('kurang')} className="minus">-</span>
                    <input className="inputquant" type="text" ref="inputval" value={this.state.quantvalue} onInput={()=>{this.setState({quantvalue: parseInt(this.refs.inputval.value)})}} />
                  <span onClick={()=>this.hitungquant('tambah')} className="plus">+</span>
                </div>
              </div>
              :this.state.packages==='ricebox'?
              <div>
                <div>Quantity</div>
                <span onClick={()=>this.hitungquant('kurang')} className="minus">-</span>
                  <input className="inputquant" type="text" value={this.state.quantvalue} />
                <span onClick={()=>this.hitungquant('tambah')} className="plus">+</span>
              </div>
              :
              <div>
                <div><h3 className='subjudul'>Quantity</h3></div>
                <span className="minus">-</span>
                  <input className="inputquant" type="text" value={0} />
                <span className="plus">+</span>
              </div>
            }
          </div>

          <div className="mb-5">
            <h3 className='subjudul'>Main Dish</h3>
            <br></br>
            <div>
              <Slider {...settings}>
                {this.cardMainDish()}
              </Slider>
            </div>
          </div>

          <div className="mb-5">
            <h3 className='subjudul'>Extras</h3>
            <br></br>
            <div>
              <Slider {...settings}>
                {this.cardExtras()}
              </Slider>
            </div>
          </div>

          <div className="mb-5">
            <h3 className='subjudul'>Drinks</h3>
            <br></br>
            <div>
              <Slider {...settings}>
                {this.cardDrinks()}
              </Slider>
            </div>
          </div>
          
          {
            this.state.orderclicked?
            <button type="button" class="btn btn-outline-mdb-color waves-effect peach-gradient" onClick={this.orderClicked}>
              <div>
                  <h4 className="card-title"><a>Order</a></h4>
              </div>
            </button>
            :
            <button type="button" class="btn btn-outline-mdb-color waves-effect" onClick={this.orderClicked}>
              <div>
                  <h4 className="card-title"><a>Order</a></h4>
              </div>
            </button>
          }

          <div>
          <div className="mr-1">
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
 
export default connect(MapstateToprops, {LoginSuccessAction}) (Selectcustomorder);