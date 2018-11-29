import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

class DataChart extends Component {



  render() {
    return (
        <div id="taco">
            <Pie
                data={{
                    labels: this.props.state.getData.users,
                    datasets: [
                        {
                        
                            data: 
                            this.props.state.getData.wins
                        ,
                        backgroundColor: [
                            'purple',
                            'gold',
                            'aqua',
                            'green',
                            'red',
                            'blue',
                            'orange',
                            'indigo',
                            'yellow',
                            'violet',
                        ]
                    }
                ]
            }}
            height={100}
            
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
    )}
}

const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(DataChart);