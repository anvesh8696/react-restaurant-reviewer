import React, { Component, PropTypes } from 'react';
import { Panel} from 'react-toolbox/components/index.js';
import { themr } from 'react-css-themr';
import defaultTheme from './Landing.scss';

@themr('Landing', defaultTheme)
class Landing extends Component {
  
    static propTypes = {
      theme: PropTypes.object.isRequired,
      router: PropTypes.shape({
        push: PropTypes.func.isRequired
      }).isRequired
    }
    
    state = {
      loggingIn: false
    }
  
    render() {
      const { theme } = this.props;
      return (
        <Panel>
          <div className={theme.page} role="application">
            App
          </div>
        </Panel>
      );
    }
}
export default Landing;
