import React, { Component } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
// import {Launcher} from 'react-chat-window'

class Carouselhome extends Component {
    state = { 
        gambar: "https://toddsunique.com/wp-content/uploads/2019/11/Christmas-background-2.jpg",
        messageList: [],
        modalkechat: false
     }

     

     _onMessageWasSent=(message)=>{
       console.log(message)
     }

    render() {
        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        };
        return (
          <div className="mt-5 mb-5">
            
            <Modal isOpen={this.state.modalkechat}>
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">Go to Chat Room?</h4>
                    </div>
                </div>
                <center>
                    <Link style={{color:'white'}} to={'/chat'}>
                        <Button onClick={()=>this.setState({ modalkechat: false })} color="warning" >
                            Okay
                        </Button>
                    </Link>
                    <Button color="secondary" onClick={()=>this.setState({modalkechat:false})}>Cancel</Button>
                </center>
            </Modal>

            <Slider {...settings}>
              <div className="mt-4">
                <img style={{height:'550px', width:'100%'}} src={this.state.gambar} />
                {/* <div className="image-box" style={{imageUrl: 'url(https://toddsunique.com/wp-content/uploads/2019/11/Christmas-background-2.jpg)'}}>
                    <h1>Buy our product</h1>
                </div> */}
                <div style={{position: 'absolute', top: '450px', left: '1200px', right: 0, bottom: 0}} className="mt-5 ask">
                    {/* <h3 class="fas fa-comment-alt subjudul"> Ask Us</h3> */}
                    {/* <Launcher
                      agentProfile={{
                        teamName: 'Ask Us'
                      }}
                      onMessageWasSent={this._onMessageWasSent.bind(this)}
                      showEmoji
                    /> */}
                    <i onClick={()=>{this.setState({ modalkechat:true })}} style={{
                      fontSize: 75, 
                      position:'absolute', 
                      top: '', 
                      left: '', 
                      right: '50px', 
                      bottom: '50px', 
                      color:'limegreen'
                      }} class="fas fa-comment-dots" />
                </div>
                <div style={{position: 'absolute', top: '70px', left: 0, right: '1080px', bottom: 0}} className="mt-5">
                    <h1>Make Catering Simple</h1>
                </div>
                <div style={{position: 'absolute', top: 0, left: 0, right: '1000px', bottom: 0}} className="mt-5 headercarousel">
                    <h1 style={{color:'orange', fontSize:80}}>Catering Market</h1>
                </div>
              </div>
            </Slider>
          </div>
        );
    }
}
 
export default Carouselhome;