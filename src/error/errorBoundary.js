import React from 'react';
import {withRouter} from 'react-router';

// A simple view that will be shown on any errors thrown that do not concern API, database or internet connection.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.history = this.props;
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }
  
  render() {
    if (this.state.errorInfo) {
      return (
        <div style={{marginTop: "10%", textAlign: "center"}}>
          <h5>Something went wrong :(</h5>
          <h5>Please refresh.</h5>
        </div>);
    }
    return this.props.children;
  }  
}

export default withRouter(ErrorBoundary);