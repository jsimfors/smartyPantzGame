import GameOverView from './gameOverView.js'
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    score: state.score,
});

export default connect(mapStateToProps)(GameOverView);