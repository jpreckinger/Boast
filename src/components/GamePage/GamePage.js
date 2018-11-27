import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';
import Input from '@material-ui/core/Input';
import DataChart from '../DataChart/DataChart';

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
        if(this.props.state.prepareInstance.length < 1){
            this.props.dispatch({type: 'GET_PREVIOUS_STATS', payload: this.props.state.prepareInstance.id});
        }
    }

    render() {
        return (
            <div>
            <div>
                <DataChart />
            </div>
            <div className="fullPage">    
                <div id="instanceCard">
                    <InstanceCard />
                </div>
                <div>
                    <button onClick={this.playGameClick}>Play Now</button>
                    <form id="setCategory" onSubmit={this.submitCategory}>
                        <Input onChange={this.handleChange} type="text" 
                        placeholder="Assign Category" value={this.state.category}/>
                    </form>
                </div>
                <div id="activePlayers">
                    <h2>Previous Results:</h2>
                    {this.props.state.previousStats.notes.map( (noteLine, index) => (
                        <div key={index}>
                            <h2>{noteLine.date_played}</h2>
                           {this.props.state.previousStats.stats[index].map( (statLine, i ) => (
                               <div key={i}>
                                    <h3>{statLine.username}{statLine.score}{statLine.victory}</h3>
                               </div>
                           ))}
                        </div>
                    ))}
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(GamePage);

