import React, { Component } from 'react';
import Menubesok from '../components/HomeComponents/menubesok';
import Playlist from '../components/HomeComponents/playlist';
import Custom from '../components/HomeComponents/custom';
import Topmonth from '../components/HomeComponents/topmonth';
import Recom from '../components/HomeComponents/recom';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
        <div>
            <div>
                <Menubesok/>
                <Custom />
                <Topmonth />
                <Recom />
                <Playlist />
            </div>
        </div>
         );
    }
}
 
export default Home;