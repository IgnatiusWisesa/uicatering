import React, { Component } from 'react';
import LineChart from 'react-linechart';
import StarRatings from 'react-star-ratings';
import Axios from 'axios';
import numeral from 'numeral'

class SalesMerchant extends Component {
    state = {
      datamerchant: []
      }

      componentDidMount(){
        Axios.get(`http://localhost:2000/report`)
        .then((res)=>{
          console.log(res.data[0])
          this.setState({datamerchant: res.data[0]})
        }).catch((err)=>{
          console.log(err)
        })
      }

      render() {
        console.log(this.state.datamerchant)
        const data = [
            {									
                color: "steelblue", 
                points: [{x: 1, y: 10}, {x: 2, y: 20}, {x: 3, y: 30}, {x: 4, y: 40}, {x: 5, y: 50}, {x: 6, y: 60}] 
            }
        ];
        return (
          <div className="mb-5">
            <h1 className="deskripsi">Sales Report</h1>
            <h2 className="subjudul">{this.state.datamerchant.merchantid}</h2>
            <LineChart 
                width={600}
                height={400}
                data={data}
                xLabel="Periode"
                yLabel="Pax"
                margins={{ top: 50, right: 20, bottom: 50, left: 70 }}
            />
            <div className="deskripsi mt-3">This Week Income: <a style={{color:'orange'}}>{'Rp.'+numeral(this.state.datamerchant.weekincome).format('Rp,0.00')}</a></div>
            <div className="deskripsi mt-1">Weekly Income Average: <a style={{color:'orange'}}>{'Rp.'+numeral(this.state.datamerchant.weekincomeaverage).format('Rp,0.00')}</a></div>
            <div className="deskripsi mt-1">Weekly Income Average: <a style={{color:'orange'}}>{this.state.datamerchant.weeksale} pax</a></div>
            <div className="deskripsi mt-1">Weekly Income Average: <a style={{color:'orange'}}>{this.state.datamerchant.weeksaleaverage} pax</a></div>
            <div className="deskripsi mt-1">Customer Satisfaction: 
              <a style={{color:'orange'}}>&nbsp;
                <StarRatings
                rating={this.state.datamerchant.star}
                starRatedColor="gold"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="5px"
                isSelectable={true}
                />
              </a>
            </div>

          </div>
        )
      }
}
 
export default SalesMerchant;