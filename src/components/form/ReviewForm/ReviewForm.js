import React, { Component, PropTypes } from 'react';
import { themr } from 'react-css-themr';
import defaultTheme from './ReviewForm.scss';
import { Input, Card, CardActions, Button } from 'react-toolbox/components';
import StarSlider from 'components/slider/StarSlider';

@themr('ReviewForm', defaultTheme)
class ReviewForm extends Component {
  
    static propTypes = {
      theme: PropTypes.object.isRequired,
      onSubmit: PropTypes.func.isRequired
    }
    
    state = {
      username: '',
      review: '',
      rating: 3,
    }
    
    handleChange = (prop, value) => {
      this.setState({...this.state, [prop]:value});
    }
    
    handleClick = () => {
      const { onSubmit } = this.props;
      const { username,  rating, review } = this.state;
      
      if(username != '' && review != ''){
        onSubmit(username, review, rating);
      }
    }
  
    render() {
      const { theme } = this.props;
      const { username, rating, review } = this.state;
      const disabled = username === '' || review === '';
      return (
        <Card className={theme.card} role="form" aria-label="Add Review">
          <div className={theme.cardBody}>
            <StarSlider value={rating} onChange={(value)=>this.handleChange('rating', value)}/>
            <Input type="text" label="Your Name" maxLength={40} theme={theme}
              value={username} onChange={(value)=>this.handleChange('username', value)}/>
            <Input type="text" multiline label="Leave a review" maxLength={240} theme={theme}
              value={review} onChange={(value)=>this.handleChange('review', value)}/>
          </div>
          <CardActions theme={theme}>
            <Button label="Add Review" raised={!disabled} primary disabled={disabled} onClick={this.handleClick}/>
          </CardActions>
        </Card>
      );
    }
}
export default ReviewForm;
