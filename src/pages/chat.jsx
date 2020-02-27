import React, { Component } from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Axios from 'axios';
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'
import io from 'socket.io-client'

class ChatPage extends Component {
    state = { 
      datachat: [],
      loading: true,
      userCount: 0
     }

    componentDidMount(){
      const socket = io('http://localhost:4000/')
      Axios.get(`http://localhost:4000/chat/getmessages`)
      .then((res) => {
        console.log(res.data)
        socket.on('user connected', 
            // console.log('konek')
          // this.setState({ 
          //   datachat: res.data, 
          //   loading: false, 
          //   userCount: io.props.userCount
          // })
        )
      }).catch((err) => {
        console.log(err)
      })
    }

    updateUserCount =(count) =>{
      console.log(count)
    }

    // shouldComponentUpdate(){
    //   Axios.get(`http://localhost:4000/chat/getmessages`)
    //   .then((res) => {
    //     // console.log(res.data)
    //     if(res.data.length !== this.state.datachat.length){
    //       // this.setState({ datachat: res.data })
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //   }).finally(() => {
    //     this.setState({ loading: false })
    //   })
    // }

    onSubmit=()=>{
      let username=''
      if(this.props.Auth.username!==''){
        username=this.props.Auth.username
      }
      else{
        username='Guest'
      }
      let message = this.refs.msgsubmit.value

      let kirim = {
        username,
        message
      }
      Axios.post(`http://localhost:4000/chat/sendmessage`, kirim)
      .then((res) => {
        console.log(res.data)
        {this.componentDidMount()}
      }).catch((err) => {
        console.log(err)
      })

      // {this.shouldComponentUpdate()}
    }

    renderchat =()=>{
      console.log(this.state.datachat)
      return this.state.datachat.map((val,index) => {
        return(
          <Element key={index}>
            <div className="chat"><a>{val.username}: </a>{val.message}
              <br></br>
              <a>{val.time}</a>
            </div>
          </Element>
        )
      })
    } 

    render() { 
      
      if(this.state.loading){
        return(
          <div className="mb-5">
            Loading...
          </div>
        )
      }

      return ( 
          <div style={{marginTop:'-55px'}} className="mb-5">
            <div id="chat">
              <div className="chat_header">Catering Market Chat Room <a style={{float:'right'}}>Online: {this.state.userCount}</a></div>
              <div id="chat_s" />
              <iframe name="hidden_iframe" id="hidden_iframe" style={{display: 'none'}} onload="if(submitted){add()}" />
                <Element name="test7" className="element" id="containerElement" style={{
                  position: 'relative',
                  height: '350px',
                  overflow: 'scroll',
                  marginBottom: '20px'
                }}>
                  {/* <Element>
                    <div className="chat"><a>You: </a>hasil chat disini
                    <br></br>
                    <a>26/2/2020 14:12:10</a>
                    </div>
                  </Element>
                  <Element>
                    <div className="chat_name">Eza joined the chat</div>
                  </Element>
                  <Element>
                    <div className="chat_bales"><a>Joko: </a>Balesan chat
                    <br></br>
                    <a>26/2/2020 14:12:10</a>
                    </div>
                  </Element> */}
                  {this.renderchat()}
                </Element>
              <form id="ss-form" onsubmit="submitted=true" action="https://docs.google.com/forms/d/1-PRLoHTtgldV5cNTvmVyjf-rf1p1kLhzKGXn2i1XGhQ/formResponse" method="POST" target="hidden_iframe">
                <div className="d-flex justify-content-start">
                  <input style={{width:'45vh'}} type="text" ref='msgsubmit' placeholder="chat.." className='form-control mt-2'/>
                  <Button onClick={this.onSubmit} style={{height:'80%'}} color="warning">Submit</Button>
                </div>
              </form>
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
 
export default connect(MapstateToprops, {LoginSuccessAction}) (ChatPage);