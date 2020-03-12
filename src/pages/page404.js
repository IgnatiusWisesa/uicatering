import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

class page404 extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="kode-content">
                <div className="container">
                <div className="error-404">
                    <h2>Whooos!!!</h2>
                    <div className="page-404">
                    <p>404</p>
                    <span>The page can not be found</span>
                    </div>
                    <p>We could not found the page you are looking for. Please try another page and verify the URL you have entered.</p>
                    <Link to={'/'}>
                        <a className="go-back">Go back to home page</a>
                    </Link>
                </div>   
                </div>   
            </div>
         );
    }
}
 
export default page404;