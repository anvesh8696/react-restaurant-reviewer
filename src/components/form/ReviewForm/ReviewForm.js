import React, { Component, PropTypes } from 'react';
import { themr } from 'react-css-themr';
import defaultTheme from './ReviewForm.scss';
import { Input, Card, CardTitle, CardActions, Button } from 'react-toolbox/components';
import StarSlider from 'components/slider/StarSlider';

@themr('ReviewForm', defaultTheme)
class ReviewForm extends Component {
  
    static propTypes = {
      theme: PropTypes.object.isRequired,
      onSubmit: PropTypes.func.isRequired
    }
    
    state = {
      review: '',
      rating: 3,
    }
    
    handleChange = (prop, value) => {
      this.setState({...this.state, [prop]:value});
    }
    
    handleClick = () => {
      const { onSubmit } = this.props;
      const { review, rating } = this.state;
      
      if(review != ''){
        onSubmit(review, rating);
      }
    }
  
    render() {
      const { theme } = this.props;
      const { review, rating } = this.state;
      return (
        <Card className={theme.card} role="form" aria-label="Add Review">
          <div className={theme.cardBody}>
            <StarSlider value={rating} onChange={(value)=>this.handleChange('rating', value)}/>
            <Input type="text" multiline label="Leave a review" maxLength={40}
              value={review} onChange={(value)=>this.handleChange('review', value)}/>
          </div>
          <CardActions theme={theme}>
            <Button label="Add Review" raised={review != ''} primary disabled={review === ''} onClick={this.handleClick}/>
          </CardActions>
        </Card>
      );
    }
}
export default ReviewForm;
