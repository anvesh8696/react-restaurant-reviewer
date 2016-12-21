import React, { Component, PropTypes } from 'react';
import { themr } from 'react-css-themr';
import defaultTheme from './BusinessDialog.scss';
import { Dialog, Link} from 'react-toolbox/components';
import { Button } from 'react-toolbox/components/button';
import ReactDOM from 'react-dom';
import ReviewList from 'components/list/ReviewList';
import ReviewForm from 'components/form/ReviewForm';
import { find } from 'lodash';

@themr('BusinessDialog', defaultTheme)
class BusinessDialog extends Component {
  
    static propTypes = {
      theme: PropTypes.object.isRequired,
      open: PropTypes.bool.isRequired,
      onDone: PropTypes.func.isRequired,
      onReviewSubmit: PropTypes.func.isRequired,
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
      const { theme, open, onDone, onReviewSubmit, business } = this.props;
      const { name, displayAddress, reviews } = business;
      const leftReview = find(reviews, (r) => { return r.user.id === 'dwwqUjXrUmMXfsEH1eOBMQ'; }) != undefined;
      return (
        <Dialog active={open} theme={theme}>
          <div className={theme.dialogContent}>
            <h4 ref="businessDialog" tabIndex="0">{name}</h4>
            <Link
              href={`https://www.google.com/maps/place/${encodeURI(displayAddress)}`}
              label={displayAddress}
              target="_blank"
              className={theme.link}
            />
            {
              leftReview ? null :
              <ReviewForm onSubmit={(review, rating) => onReviewSubmit(business.id, review, rating)} />
            }
            <ReviewList reviews={reviews} />
          </div>
          <footer className={theme.buttons}>
            <Button label="Close" raised onClick={onDone}/>
          </footer>
        </Dialog>
      );
    }
}
export default BusinessDialog;
