import React, { Component, Fragment } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux'
import { LoginSuccessAction } from './../redux/actions'
import numeral from 'numeral'
import { Modal,ModalBody,ModalFooter,ModalHeader, Button,Spinner } from 'reactstrap'

class Foodcat extends Component {
    state = { 
        dataplaylist: [],
        datamenu: [],
        loading: true,
        modaladdplaylist: false,
        modaleditplaylist: false,
        ieditplaylist: -1,
        IDeditplaylist: -1,
        konfdelplaylist: false,
        IDhapusplaylist: -1,
        namahapusplaylist: '',
        tampilmenu: false,
        modaladdmenu: false,
        IDdetailplaylist: -1,
        modaleditmenu: false,
        ieditmenu: -1,
        IDeditmenu: -1,
        konfdelmenu: false,
        ihapusmenu:-1,
        IDhapusmenu:-1,
        namahapusmenu: '',
        modalgantiharga: false
     }

     componentDidMount(){
        Axios.get(`http://localhost:4000/playlists/get-playlists/${this.props.Auth.merchantid}`)
        .then((res) => {
            console.log(res.data)
            this.setState({ dataplaylist: res.data, loading: false })
        }).catch((err) => {
            console.log(err)
        })
     }

     modaltambahmenu=()=>{
        if(this.state.modaladdmenu){
            return(
                <Modal isOpen={this.state.modaladdmenu} toggle={()=>this.setState({modaladdmenu:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <input type="text" ref='tambahmenuhari' placeholder="Menu's Name" className='form-control mt-2'/>
                            <input type="text" ref='tambahmenudesc' placeholder="Description" className='form-control mt-2'/>
                            {/* <input type="number" ref='tambahmenuharga' placeholder="Menu's Price" className='form-control mt-2'/> */}
                            <input type="text" ref='tambahmenuimage' placeholder="Menu's Image URL" className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='tambahmenuing'  placeholder="Ingridients (coma (,))" className='form-control mt-2 mb-2'/>
                            <input type="number" ref='tambahnut0' placeholder="nut (Calories)" className='form-control mt-2'/>
                            <input type="number" ref='tambahnut1' placeholder="nut (Fat)" className='form-control mt-2'/>
                            <input type="number" ref='tambahnut2' placeholder="nut (Carbohydrates)" className='form-control mt-2'/>
                            <input type="number" ref='tambahnut3' placeholder="nut (Protein)" className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={this.tambahmenu}>Add New Menu</Button>
                        <Button color="secondary" onClick={()=>this.setState({modaladdmenu:false})}>Close</Button>
                </Modal>
            )
        }
      }

      tambahmenu=()=>{
        let hari = this.refs.tambahmenuhari.value
        let desc = this.refs.tambahmenudesc.value
        // let harga = this.refs.tambahmenuharga.value
        let image = this.refs.tambahmenuimage.value

        let ingi = this.refs.tambahmenuing.value
        let nut0 = this.refs.tambahnut0.value
        let nut1 = this.refs.tambahnut1.value
        let nut2 = this.refs.tambahnut2.value
        let nut3 = this.refs.tambahnut3.value

        let ing= []
        ingi = ingi.split(',')
        // console.log(ingi)
        for(let i=0;i<ingi.length;i++){
            ing.push(
                ingi[i]
            )
        }
        let nut = [nut0,nut1,nut2,nut3]

        let playlistid = this.state.IDdetailplaylist

        let menubaru = {
          playlistid,
          hari,
          desc,
          harga: this.state.datamenu.harga,
          gam: image,
          ing,
          nut
        }

        console.log(menubaru)

        Axios.post(`http://localhost:4000/menus/add-menus`,menubaru)
        .then((res) => {
            console.log(res)
            Axios.get(`http://localhost:4000/menus/get-menus_playlist/${playlistid}`)
            .then((res1) => {
                console.log(res1.data)
                this.setState({ datamenu: res1.data, modaladdmenu:false })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
      }

      modalupdatemenu=()=>{
        if(this.state.modaleditmenu){
            return(
                <Modal isOpen={this.state.modaleditmenu} toggle={()=>this.setState({modaleditmenu:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                        <input type="text" ref='editmenuhari' defaultValue={this.state.datamenu.hari[this.state.ieditmenu]} className='form-control mt-2'/>
                            <input type="text" ref='editmenudesc' defaultValue={this.state.datamenu.desc[this.state.ieditmenu]} className='form-control mt-2'/>
                            {/* <input type="number" ref='editmenuharga' placeholder="Menu's Price" className='form-control mt-2'/> */}
                            <input type="text" ref='editmenuimage' defaultValue={this.state.datamenu.gam[this.state.ieditmenu]} className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='editmenuing' defaultValue={this.state.datamenu.ing[this.state.ieditmenu]} className='form-control mt-2 mb-2'/>
                            <input type="number" ref='editnut0' defaultValue={this.state.datamenu.nut[this.state.ieditmenu][0]} placeholder="nut (Calories)" className='form-control mt-2'/>
                            <input type="number" ref='editnut1' defaultValue={this.state.datamenu.nut[this.state.ieditmenu][1]} placeholder="nut (Fat)" className='form-control mt-2'/>
                            <input type="number" ref='editnut2' defaultValue={this.state.datamenu.nut[this.state.ieditmenu][2]} placeholder="nut (Carbohydrates)" className='form-control mt-2'/>
                            <input type="number" ref='editnut3' defaultValue={this.state.datamenu.nut[this.state.ieditmenu][3]} placeholder="nut (Protein)" className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={this.updatemenu}>Update Main Menu</Button>
                        <Button color="secondary" onClick={()=>this.setState({modaleditmenu:false})}>Close</Button>
                </Modal>
            )
        }
      }

      updatemenu=()=>{
        let hari = this.refs.editmenuhari.value
        let desc = this.refs.editmenudesc.value
        // let harga = this.refs.editmenuharga.value
        let image = this.refs.editmenuimage.value

        let ingi = this.refs.editmenuing.value
        let nut0 = this.refs.editnut0.value
        let nut1 = this.refs.editnut1.value
        let nut2 = this.refs.editnut2.value
        let nut3 = this.refs.editnut3.value

        let ing= []
        ingi = ingi.split(',')
        // console.log(ingi)
        for(let i=0;i<ingi.length;i++){
            ing.push(
                ingi[i]
            )
        }
        let nut = [nut0,nut1,nut2,nut3]

        let playlistid = this.state.IDdetailplaylist

        let menuedit = {
          playlistid,
          hari,
          desc,
          harga: this.state.datamenu.harga,
          gam: image,
          ing,
          nut
        }

        console.log(this.state.IDeditplaylist)
        console.log(menuedit)
        Axios.put(`http://localhost:4000/menus/edit-menus/${this.state.IDeditmenu}`,menuedit)
            .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/menus/get-menus_playlist/${this.state.IDdetailplaylist}`)
            .then((res1) => {
                console.log(res1.data)
                this.setState({ datamenu: res1.data, modaleditmenu: false })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
        console.log(err)
        })
      }

      konfhapusmenu=()=>{
        if(this.state.konfdelmenu){
          return(
            <Modal isOpen={this.state.konfdelmenu} toggle={()=>this.setState({konfdelmenu:false})}>
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">Are You Sure Want to Delete <a style={{color: 'orange'}}>{this.state.namahapusmenu}?</a></h4>
                    </div>
                </div>
                    <Button color="warning" onClick={this.pastihapusmenu}>Confirm</Button>
                    <Button color="secondary" onClick={()=>this.setState({konfdelmenu:false})}>Cancel</Button>
            </Modal>
          )
        }
      }

      pastihapusmenu=()=>{
        Axios.delete(`http://localhost:4000/menus/delete-menus/${this.state.IDhapusmenu}`)
        .then((res) => {
          console.log(res)
          Axios.get(`http://localhost:4000/menus/get-menus_playlist/${this.state.IDdetailplaylist}`)
            .then((res1) => {
                console.log(res1.data)
                this.setState({ datamenu: res1.data, konfdelmenu: false })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
          console.log(err)
        })
      }

    modalupdateharga=()=>{
        return(
            <Modal isOpen={this.state.modalgantiharga} toggle={()=>this.setState({modalgantiharga: false})}>
                <div className="card">
                  <ModalHeader style={{backgroundColor:'#ff8364'}}>
                    Are you sure Want to Edit?
                  </ModalHeader>
                  <ModalBody style={{marginLeft:'150px'}}>
                    {'Rp.'+numeral(this.state.datamenu.harga).format('Rp,0.00')} <strong>to</strong>
                  </ModalBody>
                  <ModalBody>
                    <input type="number" ref='pricepaxganti' placeholder="New Price per Pax" className='form-control mt-2'/>
                  </ModalBody>
                </div>
                  <Button color="danger" onClick={this.gantihargaperpax}>Yes</Button>
                  <Button color="secondary" onClick={()=>this.setState({modalgantiharga: false})}>Cancel</Button>
              </Modal>
        )
    }

    gantihargaperpax=()=>{
        let hargabaru = this.refs.pricepaxganti.value
        console.log(hargabaru)
        console.log(this.state.IDdetailplaylist)

        Axios.put(`http://localhost:4000/menus/edit-harga-menus/${this.state.IDdetailplaylist}`,{hargabaru})
        .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/menus/get-menus_playlist/${this.state.IDdetailplaylist}`)
            .then((res1) => {
                console.log(res1.data)
                this.setState({ datamenu: res1.data, modalgantiharga: false })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

     menuplaylist=(playlistid)=>{
        Axios.get(`http://localhost:4000/menus/get-menus_playlist/${playlistid}`)
        .then((res) => {
            console.log(res.data)
            this.setState({ tampilmenu:true, datamenu: res.data, IDdetailplaylist:playlistid })
        }).catch((err) => {
            console.log(err)
        })
     }

     rendermenu=()=>{
        let output= []
        for(let i=0;i<this.state.datamenu.hari.length;i++){
            output.push(
                <tr key={i}>
                    <td style={{width:'125px'}}>{this.state.datamenu.hari[i]}</td>
                    <td style={{width:'250px'}}>{this.state.datamenu.desc[i]}</td>
                    <td>{'Rp.'+numeral(this.state.datamenu.harga).format('Rp,0.00')}</td>
                    <td><img className="card-img-top rounded-bottom" src={this.state.datamenu.gam[i]} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                    <td>
                        {
                            this.state.datamenu.ing[i].map((val,index) => {
                                return(
                                    <div key={index}>{val} </div>
                                )
                            })
                        }
                    </td>
                    <td>
                        <td>
                            <div>Calories: </div>
                            <div>Fat: </div>
                            <div>Carbohydrates: </div>
                            <div>Protein: </div>
                        </td>
                        <td>
                            {
                                this.state.datamenu.nut[i].map((val,index) => {
                                    return(
                                        <div key={index}>
                                            {val}
                                        </div>
                                    )
                                })
                            }
                        </td>
                    </td>
                    <td>
                        <button type="button" onClick={()=>this.setState({ieditmenu:i, IDeditmenu:this.state.datamenu.id[i], modaleditmenu:true})} className="btn btn-outline-warning btn-rounded waves-effect">Edit</button>
                        <button type="button" onClick={()=>this.setState({ihapusmenu:i,IDhapusmenu:this.state.datamenu.id[i],namahapusmenu:this.state.datamenu.hari[i],konfdelmenu:true })} className="btn btn-outline-danger btn-rounded waves-effect">X</button>
                    </td>
                </tr>
            )
        }
        return output
     }

     //========================================================================================================================================

     modaltambahplaylist=()=>{
        if(this.state.modaladdplaylist){
            return(
                <Modal isOpen={this.state.modaladdplaylist} toggle={()=>this.setState({modaladdplaylist:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <input type="text" ref='tambahplaylistname' placeholder="Playlistname" className='form-control mt-2'/>
                            <input type="text" ref='tambahdescription' placeholder="Description" className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='tambahlongdesc'  placeholder="Playlis's Long Description" className='form-control mt-2 mb-2'/>
                            <input type="number" ref='tambahpriceFrom' placeholder="Playlist's Price" className='form-control mt-2'/>
                            <input type="text" ref='tambahimage' placeholder="Playlist's Image URL" className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={this.tambahplaylist}>Add New Playlist</Button>
                        <Button color="secondary" onClick={()=>this.setState({modaladdplaylist:false})}>Close</Button>
                </Modal>
            )
        }
      }

      tambahplaylist=()=>{
        let playlistname = this.refs.tambahplaylistname.value
        let description = this.refs.tambahdescription.value
        let longdesc = this.refs.tambahlongdesc.value
        let priceFrom = this.refs.tambahpriceFrom.value
        let tambahimage = this.refs.tambahimage.value

        let playlistbaru = {
          merchantid:this.props.Auth.merchantid,
          playlistname,
          description,
          longdesc,
          priceFrom,
          image:tambahimage
        }

        console.log(playlistbaru)

        Axios.post(`http://localhost:4000/playlists/add-playlists`,playlistbaru)
          .then((res) => {
            console.log(res.data)
            Axios.get(`http://localhost:4000/playlists/get-playlists/${this.props.Auth.merchantid}`)
            .then((res1) => {
                console.log(res.data)
                this.setState({ dataplaylist: res1.data, modaladdplaylist: false })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
        console.log(err)
        })
      }

      modalupdateplaylist=()=>{
        if(this.state.modaleditplaylist){
            return(
                <Modal isOpen={this.state.modaleditplaylist} toggle={()=>this.setState({modaleditplaylist:false})}>
                    {/* <ModalHeader style={{backgroundColor:'#ffb677'}}>Tanggal //dari backend</ModalHeader> */}
                    <div className="card">
                        <div className="card-body">
                            <input type="text" ref='editplaylistname' defaultValue={this.state.dataplaylist[this.state.ieditplaylist].playlistname} className='form-control mt-2'/>
                            <input type="text" ref='editdescription' defaultValue={this.state.dataplaylist[this.state.ieditplaylist].description} className='form-control mt-2'/>
                            <textarea rows='5' type="text" ref='editlongdesc' defaultValue={this.state.dataplaylist[this.state.ieditplaylist].longdesc} className='form-control mt-2 mb-2'/>
                            <input type="number" ref='editpriceFrom' defaultValue={this.state.dataplaylist[this.state.ieditplaylist].priceFrom} className='form-control mt-2'/>
                            <input type="text" ref='editimage' defaultValue={this.state.dataplaylist[this.state.ieditplaylist].image} className='form-control mt-2'/>
                        </div>
                    </div>
                        <Button color="warning" onClick={this.updateplaylist}>Update Main Menu</Button>
                        <Button color="secondary" onClick={()=>this.setState({modaleditplaylist:false})}>Close</Button>
                </Modal>
            )
        }
      }

      updateplaylist=()=>{
            let playlistname = this.refs.editplaylistname.value
            let description = this.refs.editdescription.value
            let longdesc = this.refs.editlongdesc.value
            let priceFrom = this.refs.editpriceFrom.value
            let editimage = this.refs.editimage.value

            let playlistedit = {
            merchantid:this.props.Auth.merchantid,
            playlistname,
            description,
            longdesc,
            priceFrom,
            image:editimage
            }

            console.log(playlistedit)

            Axios.put(`http://localhost:4000/playlists/edit-playlists/${this.state.IDeditplaylist}`,playlistedit)
            .then((res) => {
                console.log(res.data)
                Axios.get(`http://localhost:4000/playlists/get-playlists/${this.props.Auth.merchantid}`)
                .then((res1) => {
                    console.log(res.data)
                    this.setState({ dataplaylist: res1.data, modaleditplaylist: false })
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
            console.log(err)
            })
      }

      konfhapusplaylist=()=>{
        if(this.state.konfdelplaylist){
          return(
            <Modal isOpen={this.state.konfdelplaylist} toggle={()=>this.setState({konfdelplaylist:false})}>
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">Are You Sure Want to Delete <a style={{color: 'orange'}}>{this.state.namahapusplaylist}?</a></h4>
                    </div>
                </div>
                    <Button color="warning" onClick={this.pastihapusplaylist}>Confirm</Button>
                    <Button color="secondary" onClick={()=>this.setState({konfdelplaylist:false})}>Cancel</Button>
            </Modal>
          )
        }
      }

      pastihapusplaylist=()=>{
          Axios.delete(`http://localhost:4000/playlists/delete-playlists/${this.state.IDhapusplaylist}`)
          .then((res) => {
            console.log(res)
            Axios.get(`http://localhost:4000/playlists/get-playlists/${this.props.Auth.merchantid}`)
            .then((res1) => {
                console.log(res.data)
                this.setState({ dataplaylist: res1.data, konfdelplaylist: false })
            }).catch((err) => {
                console.log(err)
            })
          }).catch((err) => {
            console.log(err)
          })
      }

     renderplaylist=()=>{
        if(this.props.Auth.merchantid!==''){
            return this.state.dataplaylist.map((val,index) => {
                return(
                    <tr key={index}>
                        <td>{val.playlistname}</td>
                        <td style={{width:'250px'}}>{val.description}</td>
                        <td style={{width:'400px'}}>{val.longdesc}</td>
                        <td>{'Rp.'+numeral(val.priceFrom).format('Rp,0.00')}</td>
                        <td><img className="card-img-top rounded-bottom" src={val.image} alt="Card image cap" style={{height:'150px', width:'170px'}} /></td>
                        <td>
                        <button onClick={()=>{this.menuplaylist(val.id)}} type="button" className="btn btn-outline-success btn-rounded waves-effect">Detail</button>
                        </td>
                        <td>
                            <button onClick={()=>this.setState({ ieditplaylist:index, IDeditplaylist:val.id, modaleditplaylist:true })} type="button" className="btn btn-outline-warning btn-rounded waves-effect">Edit</button>
                            <button onClick={()=>this.setState({ ihapus:index, IDhapusplaylist:val.id , namahapusplaylist:val.playlistname, konfdelplaylist:true })} type="button" className="btn btn-outline-danger btn-rounded waves-effect">X</button>
                        </td>
                    </tr>
                )
            })
        }
     }

    render() {
        console.log(this.props.Auth.merchantid)
        if(this.props.Auth.merchantid===''){
            return(
              <div className="mb-5">
                Page not found
              </div>
            )
          }

        if(this.state.loading){
            return(
                <div className="mb-5">
                    Loading..
                </div>
            )
        }

        return ( 
            <div className="mb-5">
                
                {this.modaltambahplaylist()}
                {this.modalupdateplaylist()}
                {this.konfhapusplaylist()}
                {this.modalupdateharga()}

                <h3><strong>Catering Playlist</strong></h3>
                    <table className="table">
                        <thead className="black orange-text">
                            <tr>
                                <th scope="col">Playlist Name</th>
                                <th scope="col">Short Description (max 10 words)</th>
                                <th scope="col">Long Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Image</th>
                                <th scope="col">Playlist's Detail</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderplaylist()}
                        </tbody>
                    </table>
                    <button className="mb-5" type="button" onClick={()=>{this.setState({modaladdplaylist: true})}} className="btn btn-outline-default btn-rounded waves-effect">Add Playlist</button>
                    
                    {
                        this.state.tampilmenu?
                        <div>

                            {this.modaltambahmenu()}
                            {this.modalupdatemenu()}
                            {this.konfhapusmenu()}

                            <table className="table">
                                <thead className="black orange-text">
                                    <tr>
                                        <th scope="col">Menus</th>
                                        <th scope="col">Menu's Description</th>
                                        <th scope="col">Price per Pax</th>
                                        <th scope="col">Menu's Image</th>
                                        <th scope="col">Ingridients</th>
                                        <th scope="col">Nutrition</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.rendermenu()}
                                </tbody>
                            </table>
                            <button type="button" onClick={()=>{this.setState({modalgantiharga: true})}} className="btn btn-outline-warning btn-rounded waves-effect">Edit Price per Pax</button>
                            <br></br>
                            <button type="button" onClick={()=>{this.setState({modaladdmenu: true})}} className="btn btn-outline-default btn-rounded waves-effect">Add Menu</button>
                        </div>
                        :
                        null
                    }
            
            </div>
         );
    }
}

const MapstateToprops =(state)=>{
    return{
        Auth: state.Auth
    }
}
 
export default connect(MapstateToprops, {LoginSuccessAction}) (Foodcat);