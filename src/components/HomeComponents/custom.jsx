import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom'

class Custom extends Component {
    state = {  }

    buttonorder=()=>{
        return(
            <Link to={'/ordercustom'}>
                <div className="card-body text-center mb-5" style={{cursor:'pointer'}}>
                    <a href="#" className="btn" style={{color: '#ff8364'}}>Yes Please!</a>
                </div>
            </Link>
        )
    }

    render() { 
        return ( 
            <div>
            <div className='mb-2'>
                {/* Card */}
                <div className="card">
                    {/* Background color */}
                    <div className="card-up indigo lighten-1" />
                    {/* Avatar */}
                    <div className="avatar mx-auto white">
                    <img src="https://cdn3.f-cdn.com/contestentries/1445149/31773046/5beb30db5b6bc_thumb900.jpg" style={{height:'230px', width:'300px'}} className="rounded-circle mr-2" alt="woman avatar" />
                    <div style={{position: 'absolute', top: '150px', left: 0, right: '650px', bottom: 0}} className="mt-5">
                        <h2><strong>One-time Delivery</strong></h2>
                    </div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ybIF4Symk6VSPcg6EnZdHDZ4C6DcmiOYtutjXHi5Y41ix6ms&s" style={{height:'230px', width:'300px'}} className="rounded-circle mr-2" alt="woman avatar" />
                    <div style={{position: 'absolute', top: '150px', left: 0, right: '30px', bottom: 0}} className="mt-5">
                        <h2><strong>Group Order</strong></h2>
                    </div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8SPHks8qzO8PnhpnQwvp2W6QjZh6WmCEb92oDE6z8yXg57aX8&s" style={{height:'160px', width:'300px'}} className="rounded-circle mr-2" alt="woman avatar" />
                    <div style={{position: 'absolute', top: '150px', left: '610px', right: 0, bottom: 0}} className="mt-5">
                        <h2><strong>Wedding Packages</strong></h2>
                    </div>
                    </div>
                    {/* Content */}
                    <div className="card-body">
                    {/* Name */}
                    <h4 className="card-title">Custom your Order</h4>
                    <hr />
                    {/* Quotation */}
                    <p> One click away from one-time delivery, group order, or wedding packages</p>
                    </div>
                </div>
                    {this.buttonorder()}
                {/* Card */}
            </div>
                
            </div>
         );
    }
}
 
export default Custom;