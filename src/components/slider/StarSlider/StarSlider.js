import React, { Component, PropTypes } from 'react';
import { themr } from 'react-css-themr';
import defaultTheme from './StarSlider.scss';
import { Slider } from 'react-toolbox/components';
import FontIcon from 'react-toolbox/components/font_icon';

@themr('StarSlider', defaultTheme)
class StarSlider extends Component {
  
    static propTypes = {
      theme: PropTypes.object.isRequired,
      value: PropTypes.number.isRequired,
      onChange: PropTypes.func.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired
    }
    
    static defaultProps = {
      min: 1,
      max: 5
    }
    
    starBin(theme, min, max, rating){
      let a = [];
      let i = 0;
      for(i=0;i<max;i++){
        a.push(rating >= (min + i) ? 'stars' : 'starsback');
      }
      return (
        a.map((e, i) => <FontIcon key={`star_${i}`} value="star" className={theme[e]}/>)
      );
    }
    
    render() {
      const { min, max, value, onChange, theme } = this.props;
      return (
        <div>
          <p id="starSlider" htmlFor="starSlider">Select your rating</p>
          <div className={theme.container}>
            <div className={theme.starsContainer} aria-hidden="true">
              {this.starBin(theme, min, max, value)}
            </div>
            <Slider ariaLabelledBy="starSlider" value={value} min={min} max={max} theme={theme} step={1}
              onChange={(v) => onChange(Math.round(v))} />
          </div>
        </div>
      );
    }
}
export default StarSlider;
