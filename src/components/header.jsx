import React, { Component, Fragment } from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import Axios from 'axios';

class Header extends Component {
    state={
      profilactive : false,
      showNav: false,
      refreshhome: false,
      belumscroll: true
    }

    // gantiheader(){
    //   window.addEventListener('scroll', ()=>{
    //     if (window.scrollTop() > 10) {
    //       // this.setState({color: 'black'})
    //       console.log('top')
    //       (".header").addClass("active");
    //     } else {
    //       // this.setState({color: 'white'})
    //       console.log('down')
    //       (".header").removeClass("active");
    //     }
    //   })
    // }

    componentDidMount(){
      document.addEventListener('scroll', () => {
        var isTop = window.scrollY < 510;
        if (isTop === true) {
            this.setState({ belumscroll: isTop })
        }
        else{
          this.setState({ belumscroll: false })
        }
      })
     }

    loggingout=()=>{
      let logoutuser={
        id: '',
        roleid: '',
        merchantid: '',
        first: '',
        last: '',
        username: '',
        phone: '',
        email: '',
        city: '',
        fulladdress: '',
        password: '',
        login: ''
      }
      localStorage.clear();
      
      Axios.put(`http://localhost:4000/users/edit-users_tanpapass/${this.props.Auth.id}`,{...this.props.Auth, login:0})
      .then((res) => {
        console.log(res.data)
        this.props.LoginSuccessAction(logoutuser)
        this.setState({ refreshhome: true })
      }).catch((err) => {
        console.log(err)
      })
    }

     openNavClick = e => {
        e.preventDefault()
        this.openNav()
      }
    
      closeNavClick = e => {
        e.preventDefault()
        this.closeNav()
      }
    
      openNav = () => {
        this.setState({
          showNav: true
        })
        document.addEventListener("keydown", this.handleEscKey)
      }
      closeNav = () => {
        this.setState({
          showNav: false
        })
        document.removeEventListener("keydown", this.handleEscKey)
      }
    
      handleEscKey = e => {
        if (e.key === "Escape") {
          this.closeNav()
        }
      }

     hoverprofile=()=>{
        //  console.log('masuk')
         this.setState({profilactive: true})
     }

     unhoverprofile=()=>{
        //  console.log('keluar')
         this.setState({profilactive: false})
     }

     modalkehome=()=>{
       return(
         <Modal isOpen={this.state.refreshhome}>
              <ModalHeader style={{backgroundColor:'#ff8364'}}>
                  <div>
                      You Have Been Logged Out!
                  </div>
              </ModalHeader>
                  <Link to={'/'}>
                      <Button onClick={()=>{this.setState({refreshhome:false})}} color="warning" style={{width:'97%'}}>Oke!</Button>
                  </Link>
          </Modal>
       )
     }

    render() {
        const { showNav } = this.state
        let navCoverStyle = { width: showNav ? "100%" : "0" }
        let sideNavStyle = { width: showNav ? "250px" : "0" }

        // console.log(this.props.Auth)

        if(this.props.Auth.roleid===1){
          if(this.state.belumscroll){
            return ( 
            <div>
                {this.modalkehome()}
                <nav className="navbar navbar-expand-lg navbar-light scrolling-navbar fixed-top">
  
                <ul className="navbar-nav mr-auto">
                  <Link to={'/managemerchantSA'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Merchants</a>
                  </li>
                  </Link>
                  <Link to={'/manageusersSA'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Users</a>
                  </li>
                  </Link>
                  <Link to={'/managepackage'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Packages</a>
                  </li>
                  </Link>
                  <Link to={'/confirmTrans'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Transaction</a>
                  </li>
                  </Link>
                </ul>
                
                {/* <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <div className="md-form my-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        </div>
                    </li>
                </ul> */}
  
                {this.state.profilactive===false ?
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                                <a className="nav-link">{this.props.Auth.username}
                                    <span className="sr-only">(current)</span>
                                </a>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active nav-link" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                            <Link to="/profilesetting">
                                <a className="nav-link mb-1">ID: {this.props.Auth.id}
                                    <span className="sr-only">(current)</span>
                                </a>
                            </Link>
                            <li className="nav-item" onClick={this.loggingout} style={{cursor:'pointer'}}>Log Out</li>
                        </li>
                    </ul>
                }
                </nav>
            </div>
            )
          }
          return(
            <div>
                {this.modalkehome()}
                <nav className="navbar navbar-expand-lg navbar-light scrolling-navbar fixed-top navbar-down">
  
                <ul className="navbar-nav mr-auto">
                  <Link to={'/managemerchantSA'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Merchants</a>
                  </li>
                  </Link>
                  <Link to={'/manageusersSA'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Users</a>
                  </li>
                  </Link>
                  <Link to={'/managepackage'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Packages</a>
                  </li>
                  </Link>
                  <Link to={'/confirmTrans'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Transaction</a>
                  </li>
                  </Link>
                </ul>
                
                {/* <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <div className="md-form my-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        </div>
                    </li>
                </ul> */}
  
                {this.state.profilactive===false ?
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                                <a className="nav-link">{this.props.Auth.username}
                                    <span className="sr-only">(current)</span>
                                </a>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item nav-link" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                            <Link to="/profilesetting">
                                <a className="nav-link mb-1">ID: {this.props.Auth.id}
                                    <span className="sr-only">(current)</span>
                                </a>
                            </Link>
                            <li className="nav-item" onClick={this.loggingout} style={{cursor:'pointer'}}>Log Out</li>
                        </li>
                    </ul>
                }
                </nav>
            </div>
          )
        }
        else if(this.props.Auth.roleid===2){
          if(this.state.belumscroll){
            return ( 
              <div>
                  {this.modalkehome()}
                  <nav className="navbar navbar-expand-lg navbar-light scrolling-navbar fixed-top">
    
                  <ul className="navbar-nav mr-auto">
                    <Link to="/">
                      <a className="nav-link mb-1 site-logo">Catering Market
                          <span className="sr-only">(current)</span>
                      </a>
                    </Link>
                    <Link to={'/cart'}>
                    <li className="nav-item">
                      <a className="nav-link mb-1 site-logo">Cart</a>
                    </li>
                    </Link>
                    <Link to={'/afterorder'}>
                    <li className="nav-item">
                      <a className="nav-link mb-1 site-logo">Order Status</a>
                    </li>
                    </Link>
                  </ul>
                  
                  {/* <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                          <div className="md-form my-0">
                              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                          </div>
                      </li>
                  </ul> */}
    
                  {this.state.profilactive===false ?
                      <ul className="navbar-nav ml-auto">
                          <li className="nav-item" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                                  <a className="nav-link">Hello {this.props.Auth.username}!
                                      <span className="sr-only">(current)</span>
                                  </a>
                          </li>
                      </ul>
                      :
                      <ul className="navbar-nav ml-auto">
                          <li className="nav-item active nav-link" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                              <Link to="/profilesetting">
                                  <a className="nav-link mb-1">Your Profile
                                      <span className="sr-only">(current)</span>
                                  </a>
                              </Link>
                              <Link to="/profilesetting" style={{color:'black'}}>
                                <li className="nav-item mb-1" style={{cursor:'pointer'}}>Settings</li>
                              </Link>
                              
                              <li className="nav-item" onClick={this.loggingout} style={{cursor:'pointer'}}>Log Out</li>
                          </li>
                      </ul>
                  }
                  </nav>
              </div>
              )
          }
          return ( 
            <div>
                {this.modalkehome()}
                <nav className="navbar navbar-expand-lg navbar-light scrolling-navbar fixed-top navbar-down">
  
                <ul className="navbar-nav mr-auto">
                  <Link to="/">
                    <a className="nav-link mb-1 site-logo">Catering Market
                        <span className="sr-only">(current)</span>
                    </a>
                  </Link>
                  <Link to={'/cart'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Cart</a>
                  </li>
                  </Link>
                  <Link to={'/afterorder'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Order Status</a>
                  </li>
                  </Link>
                </ul>
                
                {/* <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <div className="md-form my-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        </div>
                    </li>
                </ul> */}
  
                {this.state.profilactive===false ?
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                                <a className="nav-link">Hello {this.props.Auth.username}!
                                    <span className="sr-only">(current)</span>
                                </a>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item nav-link" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                            <Link to="/profilesetting">
                                <a className="nav-link mb-1">Your Profile
                                    <span className="sr-only">(current)</span>
                                </a>
                            </Link>
                            <Link to="/profilesetting" style={{color:'black'}}>
                              <li className="nav-item mb-1" style={{cursor:'pointer'}}>Settings</li>
                            </Link>
                            
                            <li className="nav-item" onClick={this.loggingout} style={{cursor:'pointer'}}>Log Out</li>
                        </li>
                    </ul>
                }
                </nav>
            </div>
            )
        }
        else if(this.props.Auth.roleid===3){
          if(this.state.belumscroll){
            return ( 
            <div>
                {this.modalkehome()}
                <nav className="navbar navbar-expand-lg navbar-light scrolling-navbar fixed-top">
  
                <ul className="navbar-nav mr-auto">
                  <Link to="/managemerchant">
                    <a className="nav-link mb-1 site-logo">Merchant Page
                        <span className="sr-only">(current)</span>
                    </a>
                  </Link>
  
                  <Link to={'/sales'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Sales</a>
                  </li>
                  </Link>
                  <Link to={'/profile'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Merchant Profile</a>
                  </li>
                  </Link>
                  <Link to={'/food'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Food</a>
                  </li>
                  </Link>
                  <Link to={'/foodcat'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Catering</a>
                  </li>
                  </Link>
                </ul>
                
                {/* <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <div className="md-form my-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        </div>
                    </li>
                </ul> */}
  
                {this.state.profilactive===false ?
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                                <a className="nav-link">Manager: {this.props.Auth.username}
                                    <span className="sr-only">(current)</span>
                                </a>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active nav-link" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                            <Link to="/profilesetting">
                                <a className="nav-link mb-1">Merchant id: {this.props.Auth.merchantid}
                                    <span className="sr-only">(current)</span>
                                </a>
                            </Link>
                            <Link to="/profilesetting" style={{color:'black'}}>
                              <li className="nav-item mb-1" style={{cursor:'pointer'}}>Settings</li>
                            </Link>
                            <li className="nav-item" onClick={this.loggingout} style={{cursor:'pointer'}}>Log Out</li>
                        </li>
                    </ul>
                }
                </nav>
            </div>
            )
          }
          return(
            <div>
                {this.modalkehome()}
                <nav className="navbar navbar-expand-lg navbar-light scrolling-navbar fixed-top navbar-down">
  
                <ul className="navbar-nav mr-auto">
                  <Link to="/managemerchant">
                    <a className="nav-link mb-1 site-logo">Merchant Page
                        <span className="sr-only">(current)</span>
                    </a>
                  </Link>
  
                  <Link to={'/sales'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Sales</a>
                  </li>
                  </Link>
                  <Link to={'/profile'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Merchant Profile</a>
                  </li>
                  </Link>
                  <Link to={'/food'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Food</a>
                  </li>
                  </Link>
                  <Link to={'/foodcat'}>
                  <li className="nav-item">
                    <a className="nav-link mb-1 site-logo">Catering</a>
                  </li>
                  </Link>
                </ul>
                
                {/* <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <div className="md-form my-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        </div>
                    </li>
                </ul> */}
  
                {this.state.profilactive===false ?
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                                <a className="nav-link">Manager: {this.props.Auth.username}
                                    <span className="sr-only">(current)</span>
                                </a>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item nav-link" onMouseEnter={this.hoverprofile} onMouseLeave={this.unhoverprofile}>
                            <Link to="/profilesetting">
                                <a className="nav-link mb-1">Merchant id: {this.props.Auth.merchantid}
                                    <span className="sr-only">(current)</span>
                                </a>
                            </Link>
                            <Link to="/profilesetting" style={{color:'black'}}>
                              <li className="nav-item mb-1" style={{cursor:'pointer'}}>Settings</li>
                            </Link>
                            <li className="nav-item" onClick={this.loggingout} style={{cursor:'pointer'}}>Log Out</li>
                        </li>
                    </ul>
                }
                </nav>
            </div>
          )
        }
        else{
          if(this.state.belumscroll){
            return(
            <div>
              {this.modalkehome()}
              <nav className="navbar navbar-expand-lg navbar-light scrolling-navbar fixed-top">
              <ul className="navbar-nav mr-auto">
                <Link to="/">
                    <a className="nav-link mb-1 site-logo">Catering Market
                        <span className="sr-only">(current)</span>
                    </a>
                </Link>
              </ul>
              
              {/* <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <div className="md-form my-0">
                          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                      </div>
                  </li>
              </ul> */}

                  <ul className="navbar-nav ml-auto nav__list">
                      <li className="nav-item nav__list-item">
                          <Link to="/login">
                              <a className="nav-link nav__link nav__link--btn nav__link--btn--highlight">Login</a>
                          </Link>
                      </li>
                      <li className="nav-item nav__list-item">
                          <Link to="/register">
                              <a className="nav-link nav__link nav__link--btn nav__link--btn--highlight">Join</a>
                          </Link>
                      </li>
                  </ul>
                  
              </nav>
            </div>
            )
          }
          return ( 
          <div>
              {this.modalkehome()}
              <nav className="navbar navbar-expand-lg navbar-light scrolling-navbar fixed-top navbar-down">
              <ul className="navbar-nav mr-auto">
                <Link to="/">
                    <a className="nav-link mb-1 site-logo">Catering Market
                        <span className="sr-only">(current)</span>
                    </a>
                </Link>
              </ul>
              
              {/* <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <div className="md-form my-0">
                          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                      </div>
                  </li>
              </ul> */}

                <ul className="navbar-nav ml-auto nav__list">
                    <li className="nav-item nav__list-item">
                        <Link to="/login">
                            <a className="nav-link nav__link nav__link--btn nav__link--btn--highlight">Login</a>
                        </Link>
                    </li>
                    <li className="nav-item nav__list-item">
                        <Link to="/register">
                            <a className="nav-link nav__link nav__link--btn nav__link--btn--highlight">Join</a>
                        </Link>
                    </li>
                </ul>
                  
              </nav>
          </div>
          )
        }
    }
    
}

const MapstateToprops =(state)=>{
  return{
      Auth: state.Auth
  }
}
 
export default connect(MapstateToprops, {LoginSuccessAction}) (Header) ;