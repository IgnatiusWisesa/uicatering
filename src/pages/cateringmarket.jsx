import React, { Component } from 'react';

class CateringMarket extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
            <div className="jumbotron card card-image" style={{backgroundImage: 'url(https://ak5.picdn.net/shutterstock/videos/28510165/thumb/1.jpg)', height:'480px'}}>
                <div className="text-white text-center py-3 px-4">
                <div>
                    <h2 className="card-title h1-responsive pt-3 mb-5 font-bold subjudul" style={{color: '#ff8364'}}><strong>Catering Market</strong></h2>
                    <h4 className="mx-5 mb-2" style={{color:'#ff6464'}}>We are a collection of highly dedicated food vendors who prepare the best food at the best prices at ease of a grasp.
                    </h4>
                    <p className="mx-5 mb-5" style={{color:'#ff6464'}}>Catering Market provides delicious, fresh, and creative food solutions for everyday needs for everyone who needs simplicity in dine. We give a new spin on food facility management, delivering you a noteworthy experience while helping you manage costs.
                    We are an affiliate of Ismaya Group, the leading brand in the Lifestyle Food & Beverage company with more than 70 outlets operating across Indonesia, Singapore, Shanghai, and Dubai. With more than 15 years of culinary experience, our company truly understands the art of creating affordable high quality food.
                    </p>
                    <a className="btn btn-outline-white btn-md"><a style={{color: '#ff8364'}}><strong>Our Partners</strong></a></a>
                </div>
                </div>
            </div>
            </div>
         );
    }
}
 
export default CateringMarket;