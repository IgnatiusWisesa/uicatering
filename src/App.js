import React, { Component } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { connect } from 'react-redux'
import { LoginSuccessAction } from './../src/redux/actions'
import Axios from 'axios';

import Home from './pages/Home';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header';
import Carouselhome from './components/HomeComponents/carouselhome';
import Footer from './components/footer';
import Register from './pages/register';
import Login from './pages/login';
import CateringMarket from './pages/cateringmarket';
import Profilesetting from './pages/profilesetting';
import ManageMerchantSA from './pages/managemerchantSA';
// import SalesMerchant from './pages/sales';
import ProfileMerchant from './pages/profilemerchant';
import FoodMerchant from './pages/food';
import OrderCatering from './pages/ordercatering';
import Selectcustomorder from './pages/selectcustomorder';
import OrderCustoms from './pages/ordercustom';
import merchantdetail from './pages/merchantdetail';
import Cart from './pages/cart';
import AfterOrder from './pages/afterorder';
import RegisMerchant from './pages/regismerchant';
import managemerchant from './pages/managemerchant';
import ManageUsers from './pages/manageusers';
import Foodcat from './pages/foodcat';
import Partners from './pages/partners'
import gantipassword from './pages/gantipassword';
import ChatPage from './pages/chat';
import ManagePlaylistSA from './pages/managepackageSA'
import ConfirmTrans from './pages/confirmtrans';
import page404 from './pages/page404';

class App extends Component{
  state={
    loading: true
  }

  componentDidMount(){
    let id = localStorage.getItem('dino')
    console.log(id)
    Axios.get(`http://localhost:4000/users/get-userid/${id}`)
    .then((res) => {
      console.log(res.data[0])
      this.props.LoginSuccessAction(res.data[0])
    }).catch((err) => {
      console.log(err)
    }).finally(()=>{
      this.setState({loading: false})
    })
  }

  render(){
    
    // const sectionOne = document.querySelector('.h1')
    // const options = {}
    // const observer = new IntersectionObserver((entries, observer)=>{
    //   entries.forEach((entry) => {
    //     console.log(entry)
    //   })
    // }, options)
  
    // observer.observe(sectionOne)

    if(this.state.loading){
      return(
        <div className="mb-5">
          Loading..
        </div>
      )
    }

    return (
      <div className="App">
        <div>
          <Header />
          <Carouselhome />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profilesetting" component={Profilesetting} />
            <Route exact path="/cateringmarket" component={CateringMarket} />
            {/* <Route exact path="/sales" component={SalesMerchant} /> */}
            <Route exact path="/profile" component={ProfileMerchant} />
            <Route exact path="/food" component={FoodMerchant} />
            <Route exact path="/ordercatering/:id" component={OrderCatering} />
            <Route exact path="/ordercustom" component={OrderCustoms} />
            <Route exact path="/selectcustomorder/:id" component={Selectcustomorder} />
            <Route exact path="/merchantdetail/:id" component={merchantdetail} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/afterorder" component={AfterOrder} />
            <Route exact path="/regismerchant" component={RegisMerchant} />
            <Route exact path="/managemerchantSA" component={ManageMerchantSA} />
            <Route exact path="/manageusersSA" component={ManageUsers} />
            <Route exact path="/foodcat" component={Foodcat} />
            <Route exact path="/partners" component={Partners} />
            <Route exact path="/gantipassword/:id" component={gantipassword} />
            <Route exact path="/chat" component={ChatPage} />
            <Route exact path="/managepackage" component={ManagePlaylistSA} />
            <Route exact path="/confirmTrans" component={ConfirmTrans} />
            <Route exact path="/managemerchant" component={managemerchant} />
            <Route path="/*" component={page404} />

          </Switch>
        </div>
        <div>
          <Footer />
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

export default connect(MapstateToprops, {LoginSuccessAction}) (App);
