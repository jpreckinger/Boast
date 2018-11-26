import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';


class Chart extends Component {

  render() {
    return (
        <div id="taco">
            <Doughnut
                data={{
                    labels: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
                    datasets: [
                        {
                            label:'Pops',
                            data: [
                            487555,
                            349587,
                            457389,
                            45453,
                            475394,
                            435934
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(100, 99, 132, 0.6)',
                            'rgba(213, 190, 132, 0.6)',
                            'rgba(255, 300, 98, 0.6)',
                            'rgba(25, 99, 132, 0.6)',
                            'rgba(255, 99, 13, 0.6)',
                        ]
                    }
                ]
            }}
            height={50}
            
            options={{
                title:{
                    display:true,
                    text: 'Test data',
                    fontSize:25
                },
                legend:{
                    display:true,
                    position: 'right'
                }
            }}
        />
        </div>
    )}
}

const mapStateToProps = state => ({state});

export default connect(mapReduxStateToProps)(Chart);