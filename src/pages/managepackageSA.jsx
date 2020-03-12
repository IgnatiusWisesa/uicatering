import React, { Component } from 'react';
import Axios from 'axios';

class ManagePlaylistSA extends Component {
    state = { 
        dataplaylist: [],
        datarecommend: [],
        datafavourite: [],
        loading: true
     }

    componentDidMount(){
        Axios.get('http://localhost:4000/playlists/get-playlists_allnull/0')
        .then((res)=>{
            console.log(res.data)
            Axios.get('http://localhost:4000/playlists/get-playlists_allnull/1')
            .then((res1) => {
                Axios.get(`http://localhost:4000/playlists/get-playlists_allnull/2`)
                .then((res2) => {
                    this.setState({ 
                        dataplaylist:res.data, 
                        datarecommend:res1.data[0],
                        datafavourite:res2.data[0],
                        loading: false 
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    makerecommend=(id,index)=>{
        let playlistrecommend = {...this.state.dataplaylist[index], status:1 }
        // console.log(playlistrecommend)

        // console.log(this.state.datarecommend.id)
        let gantirecommend = {...this.state.datarecommend, status: 0}
        // console.log(gantirecommend)
        
        Axios.put(`http://localhost:4000/playlists/edit-playlists/${id}`,playlistrecommend)
        .then((res) => {
            Axios.put(`http://localhost:4000/playlists/edit-playlists/${this.state.datarecommend.id}`,gantirecommend)
            .then((res) => {
                
                Axios.get('http://localhost:4000/playlists/get-playlists_allnull/0')
                .then((res)=>{
                    console.log(res.data)
                    Axios.get('http://localhost:4000/playlists/get-playlists_allnull/1')
                    .then((res1) => {
                        Axios.get(`http://localhost:4000/playlists/get-playlists_allnull/2`)
                        .then((res2) => {
                            this.setState({ 
                                dataplaylist:res.data, 
                                datarecommend:res1.data[0],
                                datafavourite:res2.data[0],
                                loading: false 
                            })
                        }).catch((err) => {
                            console.log(err)
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })

            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    makefavourite=(id,index)=>{
        let playlistfavourite = {...this.state.dataplaylist[index], status:2 }
        // console.log(playlistfavourite)

        // console.log(this.state.datafavourite.id)
        let gantifavourite = {...this.state.datafavourite, status: 0}
        // console.log(gantifavourite)

        Axios.put(`http://localhost:4000/playlists/edit-playlists/${id}`,playlistfavourite)
        .then((res) => {
            Axios.put(`http://localhost:4000/playlists/edit-playlists/${this.state.datafavourite.id}`,gantifavourite)
            .then((res) => {
                
                Axios.get('http://localhost:4000/playlists/get-playlists_allnull/0')
                .then((res)=>{
                    console.log(res.data)
                    Axios.get('http://localhost:4000/playlists/get-playlists_allnull/1')
                    .then((res1) => {
                        Axios.get(`http://localhost:4000/playlists/get-playlists_allnull/2`)
                        .then((res2) => {
                            this.setState({ 
                                dataplaylist:res.data, 
                                datarecommend:res1.data[0],
                                datafavourite:res2.data[0],
                                loading: false 
                            })
                        }).catch((err) => {
                            console.log(err)
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })

            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    renderrecommend=()=>{
        return(
            <tr className="deskripsi" style={{fontSize:'100px'}}>
                <td>{this.state.datarecommend.id}</td>
                <td>{this.state.datarecommend.playlistname}</td>
                <td>{this.state.datarecommend.name}</td>
                <td style={{width:'200px'}}>{this.state.datarecommend.description}</td>
            </tr>
        )
    }

    renderfavourite=()=>{
        return(
            <tr className="deskripsi" style={{fontSize:'100px'}}>
                <td>{this.state.datafavourite.id}</td>
                <td>{this.state.datafavourite.playlistname}</td>
                <td>{this.state.datafavourite.name}</td>
                <td style={{width:'200px'}}>{this.state.datafavourite.description}</td>
            </tr>
        )
    }

    renderPackage=()=>{
        return this.state.dataplaylist.map((val,index)=>{
            return(
                <tr key={index} className="deskripsi" style={{fontSize:'100px'}}>
                    <td>{val.id}</td>
                    <td>{val.playlistname}</td>
                    <td>{val.name}</td>
                    <td>{val.description}</td>
                    <button type="button" onClick={()=>this.makerecommend(val.id,index)} className="btn btn-outline-warning btn-rounded waves-effect">Recommend</button>
                    <button type="button" onClick={()=>this.makefavourite(val.id,index)} className="btn btn-outline-default btn-rounded waves-effect">Favourite</button>
                </tr>
            )
        })
    }

    render() {
        if(this.props.Auth.roleid===1){
            if(this.state.loading){
                return(
                    <div className="mb-5">
                        <div class="loading">Loading&#8230;</div>
                    </div>
                )
            }
    
            return ( 
                <div className="mb-5">
    
                    <h2>Recommended Playlist</h2>
                    <table className="table">
                        <thead className="black orange-text">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Package Name</th>
                                <th scope="col">Merchant</th>
                                <th scope="col">Desc</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderrecommend()}
                        </tbody>
                    </table>
    
                    <h2>Favourite Playlist</h2>
                    <table className="table">
                        <thead className="black orange-text">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Package Name</th>
                                <th scope="col">Merchant</th>
                                <th scope="col">Desc</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderfavourite()}
                        </tbody>
                    </table>
    
                    <table className="table">
                        <thead className="black orange-text">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Package Name</th>
                                <th scope="col">Merchant</th>
                                <th scope="col">Desc</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderPackage()}
                        </tbody>
                    </table>
                </div>
             );
        }
        else{
            return(
                <div className="mb-5">
                    <page404 />
                </div>
            )
        }
        
    }
}
 
export default ManagePlaylistSA;