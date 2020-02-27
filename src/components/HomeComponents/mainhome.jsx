import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { Link } from 'react-router-dom'

class Mainhome extends Component {
    state = { 
        hoverfirst: false,
        hoversecond: false,
        hoverthird: false,
        clickfirst: false,
        clicksecond: false,
        clickthird: false,
    }

    render() {
        return ( 
            <div>
                <MDBNav className="nav-tabs nav-fill">
                <MDBNavItem 
                onMouseEnter={()=>this.setState({hoverfirst:true})}
                onMouseOut={()=>this.setState({hoverfirst:false})}
                onClick={()=>this.setState({clickfirst:true})}
                >
                {   
                    this.state.hoverfirst && this.state.clickfirst===false?
                    <MDBNavLink to="/packages" className="dusty-grass-gradient">
                        1. Pick Your Diet
                    </MDBNavLink>
                    :this.state.hoverfirst===false && this.state.clickfirst===false?
                    <MDBNavLink to="/packages" className="juicy-peach-gradient">
                        Packages
                    </MDBNavLink>
                    :
                    <MDBNavLink to="/packages" className="peach-gradient">
                        Packages
                    </MDBNavLink>
                }
                </MDBNavItem>

                <MDBNavItem
                onMouseEnter={()=>this.setState({hoversecond:true})}
                onMouseOut={()=>this.setState({hoversecond:false})}
                onClick={()=>this.setState({clicksecond:true})}
                >
                {
                    this.state.hoversecond && this.state.clicksecond===false?
                    <MDBNavLink to="/location" className="dusty-grass-gradient">
                        2. Where the food should be deliver?
                    </MDBNavLink>
                    :this.state.hoversecond===false && this.state.clicksecond===false?
                    <MDBNavLink to="/location" className="juicy-peach-gradient">
                        Location
                    </MDBNavLink>
                    :
                    <MDBNavLink to="/location" className="peach-gradient">
                        Location
                    </MDBNavLink>
                }
                </MDBNavItem>


                <MDBNavItem
                onMouseEnter={()=>this.setState({hoverthird:true})}
                onMouseOut={()=>this.setState({hoverthird:false})}
                onClick={()=>this.setState({clickthird:true})}
                >
                {
                    this.state.hoverthird && this.state.clickthird===false?
                    <MDBNavLink to="/merchants" className="dusty-grass-gradient">
                        3. Pick Your Favourite Seller from Our Best Lists
                    </MDBNavLink>
                    :this.state.hoverthird===false && this.state.clickthird===false?
                    <MDBNavLink to="/merchants" className="juicy-peach-gradient">
                        Merchants
                    </MDBNavLink>
                    :
                    <MDBNavLink to="/merchants" className="peach-gradient">
                        Merchants
                    </MDBNavLink>
                }
                </MDBNavItem>
                </MDBNav>
            </div>
         );
    }
}
 
export default Mainhome;