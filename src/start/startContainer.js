import StartView from './startView.js';
import {connect} from 'react-redux';
import {setUsername, setCategory} from '../actions';

const mapStateToProps = state => ({
    username: state.username,
    category: state.category
});

const mapDispatchToProps = dispatch => ({
    setUsername: username => dispatch(setUsername(username)),
    setCategory: category => dispatch(setCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(StartView);