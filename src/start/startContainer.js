import StartView from './startView.js';
import {connect} from 'react-redux';
import React from 'react';
import {setUsername, setCategory} from '../actions';
import {useHistory} from 'react-router-dom';

const StartContainer = (props) => {
    const history = useHistory();

    React.useEffect(() => {
        // Make sure the background is correct
        document.getElementsByClassName("body")[0].id = 'HitsBody';
    }, []);

    return <StartView
        username = {props.username}
        setUsername = {props.setUsername}
        category = {props.category}
        setCategory = {props.setCategory}
        goTo = {(path) => history.push(path)}
        invalidUsername = {!(/^\S.*$/.test(props.username))}
        categories = {["Hits", "EDM", "Rock", "Hip-hop"]}/>
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