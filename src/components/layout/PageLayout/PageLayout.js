import React, { Component, PropTypes } from 'react';
import { Layout, NavDrawer, Navigation } from 'react-toolbox/components/index.js';
import { themr } from 'react-css-themr';
import Empty from './Empty';
import theme from './theme.scss';
import { withRouter } from 'react-router';

export default function (Wrapped, Sidebar, routes = []){
  
  @themr('PageLayout', theme)
  class PageLayout extends Component {
    
    static propTypes = {
      location: PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired,
      router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
      }).isRequired
    }
  
    state = {
      drawerActive: false,
      drawerPinned: false
    };

    toggleDrawerActive = () => {
      this.setState({...this.state, drawerActive: !this.state.drawerActive });
    };

    toggleDrawerPinned = () => {
      this.setState({...this.state, drawerPinned: !this.state.drawerPinned });
    }
    
    isActive = (url, pathname) => {
      return pathname === (url.substring(0, 1) === '#' ? url.substring(1) : url);
    }

    render() {
      const { pathname } = this.props.location;
      const { theme } = this.props;
      const r = routes.map((e) => e.set('active', this.isActive(e.href, pathname)));
      return (
        <Layout theme={theme}>
          <NavDrawer active={this.state.drawerActive}
            pinned={this.state.drawerPinned}
            permanentAt="md"
            onOverlayClick={ this.toggleDrawerActive }>
            <Navigation type="vertical" routes={r} className={theme.nav} />
          </NavDrawer>
          <Wrapped toggleDrawerActive={this.toggleDrawerActive} {...this.props} role="main"/>
          { Sidebar ? <Sidebar /> : <Empty /> }
        </Layout>
      );
    }
  }
  return withRouter(PageLayout, { withRef: true });
}
