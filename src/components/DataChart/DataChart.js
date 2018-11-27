import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';



class DataChart extends Component {


  render() {
    return (
        // <Card className="chartCard">
        <div id="taco">
            <Doughnut
                data={{
                    labels: ['wins', 'losses'],
                    datasets: [
                        {
                        
                            data: [
                            this.props.state.getData.wins,
                            this.props.state.getData.losses,
                        ],
                        backgroundColor: [
                            'green',
                            'red',
                            // 'rgba(213, 190, 132, 0.6)',
                            // 'rgba(255, 300, 98, 0.6)',
                            // 'rgba(25, 99, 132, 0.6)',
                            // 'rgba(255, 99, 13, 0.6)',
                        ]
                    }
                ]
            }}
            height={50}
            
            options={{
                title:{
                    display:true,
                    text: 'Are you even good?',
                    fontSize:25
                },
                legend:{
                    display:true,
                    position: 'bottom'
                }
            }}
        />
        </div>
        // </Card>
    )}
}

const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(DataChart);