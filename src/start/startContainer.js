import StartView from './startView.js';
import {connect} from 'react-redux';
import React from 'react';
import {setUsername, setCategory} from '../actions';

const StartContainer = (props) => {
    React.useEffect(() => {
        // Make sure the background is correct
        document.getElementsByClassName("body")[0].id = 'HitsBody';
    }, []);

    return <StartView
        username = {props.username}
        setUsername = {props.setUsername}
        category = {props.category}
        setCategory = {props.setCategory}/>
};

// Connect component to Redux store
const mapStateToProps = state => ({
    username: state.username,
    category: state.category
});

const mapDispatchToProps = dispatch => ({
    setUsername: username => dispatch(setUsername(username)),
    setCategory: category => dispatch(setCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(StartContainer);