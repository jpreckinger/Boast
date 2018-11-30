import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';
import Input from '@material-ui/core/Input';
import DataChart from '../DataChart/DataChart';
import CategoryChart from '../DataChart/CategoryChart';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';


class GamePage extends Component {

    state = {
        category: ''
    }

    handleChange = (event) => {
        this.setState({
            category: event.target.value
        })
    }

    submitCategory = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'ASSIGN_CATEGORY', payload: {
            category: this.state.category,
            game: this.props.state.prepareInstance.id
            }
        });
        this.setState({category: ''})
    }

    playGameClick = () => {
        this.props.history.push('/playgame');
        this.props.dispatch({type: 'CREATE_NEW_INSTANCE', payload: this.props.state.prepareInstance})
    }

    componentDidMount() {
            console.log(this.props.match.params); 
            this.props.dispatch({type: 'GET_PREVIOUS_STATS', payload: this.props.state.prepareInstance.id});
            this.props.dispatch({type: 'GET_GAME_DATA', payload: this.props.state.prepareInstance.id});
    }


    render() {
        return (
            <div >    
                 <div id="instanceCard">
                    {this.props.state.prepareInstance && <InstanceCard />}
                 </div>
                 <div>
                    <button onClick={this.playGameClick}>Play Now</button>
                    <form id="setCategory" onSubmit={this.submitCategory}>
                        <Input onChange={this.handleChange} type="text" 
                        placeholder="Assign Category" value={this.state.category}/>
                    </form>
                 </div>
                <div  id='barChart' >
                    {/* <h2>Previous Results:</h2> */}
                    {this.props.state.previousStats.notes.map( (noteLine, index) => (
                        <div key={index}>
                            <div >
                                <Bar
                                    data={{
                                        labels: this.props.state.previousStats.users[index],
                                        datasets: [
                                            {
                                                data: this.props.state.previousStats.scores[index],
                                                backgroundColor: ['purple','gold','aqua','green','red','blue','orange','indigo','yellow','violet',],
                                                label: 'Scores'
                                            }
                                        ]
                                    }}
                                    
                                    
                                
                                    options={{
                                        maintainAspectRatio: false,
                                        title:{
                                            display:true,
                                            text: moment(noteLine.date_played).format('MMM Do YY'),
                                            fontSize:25
                                        },
                                        legend:{
                                            display:true,
                                            position: 'bottom'
                                        },
                                        // scales: {
                                        //     xAxes: [{
                                        //         barThickness : 15,
                                        //     }]
                                        // },
                                        // maintainAspectRatio: false
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        );
    }
}

const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(GamePage);

