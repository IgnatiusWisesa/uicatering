import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import Axios from 'axios';

class Footer extends Component {
  state = {
    hpadmin: "",
    loading: true
  }

  componentDidMount(){
    Axios.get(`http://localhost:4000/users/get-admin`)
    .then((res) => {
      // console.log(res.data[0].phone)
      this.setState({ 
        hpadmin: res.data[0].phone,
        loading: false
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  render(){
    if(this.state.loading){
      return(
        <div className="mb-5">
          Loading...
        </div>
      )
    }
    
    let WA = `https://api.whatsapp.com/send?phone=${this.state.hpadmin}`
    return (
      <div>
          {/* Footer */}
        <footer className="page-footer font-small peach-gradient pt-4">
          {/* Footer Links */}
          <div className="container-fluid text-center text-md-left">
            {/* Grid row */}
            <div className="row">
              {/* Grid column */}
              <div className="col-md-6 mt-md-0 mt-3">
                {/* Content */}
                <h5 className="text-uppercase pl-4 headercarousel">Catering Market</h5>
                <p className="mt-5">
                  {/* Footer Elements */}
                  <div className="container">
                    {/* Grid row*/}
                    <div className="row">
                      {/* Grid column */}
                      <div className="col-md-4">
                        <div className="mb-1 flex-center">
                          {/* Facebook */}
                          <a className="fb-ic" target="_blank" href="https://web.facebook.com/hashtag/fac?_rdc=1&_rdr">
                            <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                          </a>
                          {/*Instagram*/}
                          <a className="ins-ic" target="_blank" href="https://www.instagram.com/">
                            <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                          </a>
                        </div>
                      </div>
                      {/* Grid column */}
                    </div>
                    {/* Grid row*/}
                  </div>
                  {/* Footer Elements */}
                </p>
              </div>
              {/* Grid column */}
              <hr className="clearfix w-100 d-md-none pb-3" />
              {/* Grid column */}
              <div className="col-md-3 mb-md-0 mb-3">
                {/* Links */}
                <ul className="list-unstyled">
                  <Link to={'/cateringmarket'}>
                    <li className="mb-2">
                      <a>Catering Market</a>
                    </li>
                  </Link>
                  <Link to={'/partners'}>
                    <li className="mb-2">
                      <a>Our Partners</a>
                    </li>
                  </Link>
                  <Link to={'/regismerchant'}>
                    <li>
                      <a>Join Us</a>
                    </li>
                  </Link>
                </ul>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 mb-md-0 mb-1">
                {/* Links */}
                <h5 className="text-uppercase">Contacts</h5>
                <ul className="list-unstyled">
                  <li className="mb-1">
                    WA chat: &nbsp;
                      <a target="_blank" href={WA}>
                        {this.state.hpadmin}
                      </a>
                  </li>
                  <li style={{cursor:'pointer'}}>
                    <a target="_blank" href="https://gmail.com">
                      cs@cateringmarket.id
                    </a>
                  </li>
                </ul>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
          {/* Footer Links */}
          {/* Copyright */}
          <div className="footer-copyright text-center py-3">© 2018 Copyright</div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </div>
    );
  }
}

export default Footer;