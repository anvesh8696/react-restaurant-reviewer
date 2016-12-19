import React, { Component, PropTypes } from 'react';
import { Panel} from 'react-toolbox/components/index.js';
import { themr } from 'react-css-themr';
import defaultTheme from './Landing.scss';
import Input from 'react-toolbox/components/input';
import Navigation from 'react-toolbox/components/navigation';
import Checkbox from 'react-toolbox/components/checkbox';
import { debounce, find } from 'lodash';
import BusinessDialog from 'components/dialog/BusinessDialog';
import BusinessList from 'components/list/BusinessList';

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
      asc: PropTypes.bool,
      results: PropTypes.array,
      onChange: PropTypes.func,
      onFilterUpdate: PropTypes.func,
      search: PropTypes.func
    }
    
    state = {
      loggingIn: false,
      dialogOpen: false
    }
    
    debounceSearch = null;

    handleChange = (name, value) => {
      const { onChange, onFilterUpdate } = this.props;
      onChange(name, value);
      
      if(name === 'popular' || name === 'good' || name === 'asc'){
        onFilterUpdate();
      }
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
    
    handleClickBusiness = (businessID) => {
      const business = find(this.props.results, {id: businessID});
      if(business){
        this.setState({...this.state, business: business, dialogOpen:true});
      }
    }
    
    updateState = (prop, value) => {
      this.setState({...this.state, [prop]: value});
    }
  
    render() {
      const { theme, results, term, loc, popular, good, asc } = this.props;
      const { dialogOpen, business } = this.state;
      return (
        <Panel>
          <BusinessDialog open={dialogOpen} business={business} onDone={() => this.updateState('dialogOpen', false)}/>
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
                  label="Top 10"
                  onChange={(value) => this.handleChange('popular', value)}
                />
                <Checkbox
                  checked={good}
                  label="4+ Stars"
                  onChange={(value) => this.handleChange('good', value)}
                />
                <Checkbox
                  checked={asc}
                  label="ABC↓"
                  onChange={(value) => this.handleChange('asc', value)}
                />
              </Navigation>
              <section>
                <BusinessList businesses={results} onChange={this.handleClickBusiness} />
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
