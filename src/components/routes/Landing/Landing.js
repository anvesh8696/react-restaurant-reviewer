import React, { Component, PropTypes } from 'react';
import { Panel} from 'react-toolbox/components/index.js';
import { themr } from 'react-css-themr';
import defaultTheme from './Landing.scss';
import Input from 'react-toolbox/components/input';
import Navigation from 'react-toolbox/components/navigation';
import Checkbox from 'react-toolbox/components/checkbox';
import { List, ListItem, ListSubHeader } from 'react-toolbox/components/list';
import { debounce } from 'lodash';

@themr('Landing', defaultTheme)
class Landing extends Component {
  
    static propTypes = {
      theme: PropTypes.object.isRequired,
      router: PropTypes.shape({
        push: PropTypes.func.isRequired
      }).isRequired,
      loc: PropTypes.string,
      term: PropTypes.string,
      popular: PropTypes.bool,
      good: PropTypes.bool,
      closed: PropTypes.bool,
      results: PropTypes.array,
      onChange: PropTypes.func,
      onFilterUpdate: PropTypes.func,
      search: PropTypes.func
    }
    
    state = {
      loggingIn: false
    }
    
    debounceSearch = null;

    handleChange = (name, value) => {
      const { onChange, onFilterUpdate } = this.props;
      onChange(name, value);
      
      if(name === 'popular' || name === 'good' || name === 'closed'){
        onFilterUpdate();
      }
    }
    
    renderResult(index, avatar, caption, rating) {
      return (
        <ListItem
          key={`res_${index}`}
          avatar={avatar}
          caption={caption}
          legend={`${rating} / 5`}
          rightIcon="star"
        />
      );
    }
    
    inputChanged = (prop, value) => {
      let { term } = this.props;
      if(prop === 'term'){
        term = value;
      }
      this.handleChange(prop, value);
      
      if(this.debounceSearch === null){
        this.debounceSearch = debounce(() => this.props.search(), 500);
      }
      
      if(term === ''){
        this.debounceSearch.cancel();
      } else {
        this.debounceSearch();
      }
    }
    
    updateSearch = () => {
      this.props.search();
    }
    
    componentDidMount() {
      setTimeout(this.updateSearch, 0);
    }
  
    render() {
      const { theme, results, term, loc, popular, good, closed } = this.props;
      return (
        <Panel>
          <article className={theme.page}>
            <header>
              <Input theme={theme} type="text" hint="Search" name="search"
                value={term} onChange={(value) => this.inputChanged('term', value)} />
              <Input theme={theme} type="text" hint="Location" name="location"
                value={loc} onChange={(value) => this.inputChanged('loc', value)} />
            </header>
            <section>
              <Navigation type="horizontal" theme={theme}>
                <Checkbox
                  checked={popular}
                  label="Popular"
                  onChange={(value) => this.handleChange('popular', value)}
                />
                <Checkbox
                  checked={good}
                  label="4+ Stars"
                  onChange={(value) => this.handleChange('good', value)}
                />
                <Checkbox
                  checked={closed}
                  label="(permanently) closed"
                  onChange={(value) => this.handleChange('closed', value)}
                />
              </Navigation>
              <section>
                <List selectable ripple>
                  <ListSubHeader caption="Search Results:" />
                  {
                    results ? 
                    results.map((r, i) => this.renderResult(i, r.thumb, r.name, r.rating)) :
                    <span></span>
                  }
                </List>
              </section>
              <footer>
                <small>Created By: </small> Joshua Bence
              </footer>
            </section>
          </article>
        </Panel>
      );
    }
}
export default Landing;
