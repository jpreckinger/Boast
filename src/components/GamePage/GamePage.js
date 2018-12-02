import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';
import Input from '@material-ui/core/Input';
import GameChart from '../DataChart/GameChart';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import Button from '@material-ui/core/Button';



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
            this.props.dispatch({type: 'GET_PREVIOUS_STATS', payload: this.props.state.prepareInstance.id});
            this.props.dispatch({type: 'GET_GAME_DATA', payload: this.props.state.prepareInstance.id});
    }

    render() {
        return (
            <div className="fullPage">    
                <div id="instanceCard">
                    {this.props.state.prepareInstance && <InstanceCard />}
                    <form id="setCategory" onSubmit={this.submitCategory}>
                        <Input onChange={this.handleChange} type="text" 
                        placeholder="Assign Category" value={this.state.category}/>
                    </form>
                </div>
                <div id="buttonAndPie">
                    <Button onClick={this.playGameClick} size="large" variant="contained">Play Now!</Button>
                    <div>
                        <GameChart/>
                    </div>
                </div>
                <div  id='barChart' >
                    <h2 id="previousR">Previous Results:</h2>
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
                                    height={200}
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
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                } 
                                            }]
                                        },
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

