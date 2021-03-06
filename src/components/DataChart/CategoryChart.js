import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

//handles the creation of a pie chart on the category page

class DataChart extends Component {

  render() {
    return (
        <div id="chart">
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
            height={400}
            
            options={{
                title:{
                    display:false,
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