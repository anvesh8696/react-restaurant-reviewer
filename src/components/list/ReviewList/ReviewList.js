import React, { Component, PropTypes } from 'react';
import { themr } from 'react-css-themr';
import defaultTheme from './ReviewList.scss';
import { List, ListItem, ListSubHeader } from 'react-toolbox/components/list';
import { fill, find } from 'lodash';
import sizeMe from 'react-sizeme';
import FontIcon from 'react-toolbox/components/font_icon';

@themr('ReviewList', defaultTheme)
class ReviewList extends Component {
  
    static propTypes = {
      theme: PropTypes.object.isRequired,
      reviews: PropTypes.array,
      size: PropTypes.object.isRequired
    }
    
    stars(rating){
      let f = Math.floor(rating);
      let r = Math.round(rating);
      let remain = f === r ? '' : f < r ? ' star_half' : ' star';
      return fill(Array(f), 'star').join(' ') + remain;
    }
    
    formatDate(date) {
      return [date.getMonth()+1, date.getDate(), date.getFullYear()]
        .map((sec) => { return (sec < 10) ? '0' + sec : sec; })
        .join('/');
    }
    
    renderResult(index, id, avatar, name, review, rating, timeCreated) {
      const { theme } = this.props;
      const { width } = this.props.size;
      
      if(width < 600){
        return (
          <ListItem
            key={`res_${index}`}
            avatar={avatar}
            caption={`${name} -${this.formatDate(new Date(timeCreated * 1000))}`}
            legend={<FontIcon ariaLabel={`, gave it a ${rating} star rating`} value={this.stars(rating)} className={theme.stars}/>}
            theme={theme}
          />
        );
      }
      
      return (
        <ListItem
          key={`res_${index}`}
          avatar={avatar}
          caption={`${name} -${this.formatDate(new Date(timeCreated * 1000))}`}
          legend={review}
          rightIcon={<FontIcon ariaLabel={`, gave it a ${rating} star rating`} value={this.stars(rating)} className={theme.stars}/>}
          theme={theme}
        />
      );
    }
  
    render() {
      const { reviews } = this.props;
      return (
        <List selectable ripple>
          <ListSubHeader caption="Reviews:" />
          {
            reviews.map((r, i) => this.renderResult(i, r.id, r.user.image_url, r.user.name, r.excerpt, r.rating, r.time_created))
          }
        </List>
      );
    }
}
export default sizeMe({})(ReviewList);
