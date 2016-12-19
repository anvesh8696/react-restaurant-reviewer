import React, { Component, PropTypes } from 'react';
import { themr } from 'react-css-themr';
import defaultTheme from './BusinessDialog.scss';
import { Dialog, Link} from 'react-toolbox/components';
import { Button } from 'react-toolbox/components/button';
import ReactDOM from 'react-dom';
import ReviewList from 'components/list/ReviewList';

@themr('BusinessDialog', defaultTheme)
class BusinessDialog extends Component {
  
    static propTypes = {
      theme: PropTypes.object.isRequired,
      open: PropTypes.bool.isRequired,
      onDone: PropTypes.func.isRequired,
      business: PropTypes.object
    }
    
    static defaultProps = {
      business: {
        name: 'beep'
      }
    }
    
    /**
     * Set focus on Modal open
     *
     */
    componentDidUpdate(prevProps, prevState){
      if(this.props.open != prevProps.open && this.props.open){
        setTimeout(() => {
          ReactDOM.findDOMNode(this.refs.businessDialog).focus();
        }, 250);
      }
    }
  
    render() {
      const { theme, open, onDone, business } = this.props;
      const { name, displayAddress, reviews } = business;
      return (
        <Dialog active={open} theme={theme}>
          <div className={theme.dialogContent}>
            <h4 ref="businessDialog">{name}</h4>
            <Link
              href={`https://www.google.com/maps/place/${encodeURI(displayAddress)}`}
              label={displayAddress}
              target="_blank"
              className={theme.link}
            />
            <ReviewList reviews={reviews} />
          </div>
          <footer className={theme.buttons}>
            <Button label="Done" raised primary onClick={onDone}/>
          </footer>
        </Dialog>
      );
    }
}
export default BusinessDialog;
