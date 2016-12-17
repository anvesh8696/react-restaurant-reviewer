import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import PageLayout from 'components/layout/PageLayout';
import Empty from 'components/layout/PageLayout/Empty';
import SimpleLayout from 'components/layout/SimpleLayout';
import Landing from 'components/routes/Landing';
import Immutable from 'seamless-immutable';

const LandingRoutes = Immutable([
  { href:'#/', label: 'Home', icon: 'room'},
  { href:'#/editor', label: 'Editor', icon: 'room'}
]);

export default class Routes extends Component {
  
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  
  state = {
    ready: false
  }
  
  renderLoading(){
    return (
      <div>LOADING</div>
    );
  }
  
  renderRoutes(){
    return (
      <Router history={ this.props.history }>
        <Route path="/" component={ SimpleLayout(Landing) } />
        <Route path="*" component={Empty}/>
      </Router>
    );
  }
  
  componentDidMount(){
    this.setState({...this.state, ready: true});
  }
  
  render() {
    let content = this.state.ready ? this.renderRoutes() : this.renderLoading();
    return (
      <Provider store={this.props.store}>
        {content}
      </Provider>
    );
  }
}
