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
      onReviewSubmit: PropTypes.func,
      search: PropTypes.func
    }
    
    state = {
      loggingIn: false,
      dialogOpen: false,
      businessID: 0
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
      
      // alpha numeric or space
      value = value.replace(/[^a-z0-9\d ]/gi,'');
      
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
    
    handleClickBusiness = (businessID) => {
      this.setState({...this.state, businessID: businessID, dialogOpen: true});
    }
    
    updateState = (prop, value) => {
      this.setState({...this.state, [prop]: value});
    }
    
    updateSearch = () => {
      this.props.search();
    }
    
    componentWillReceiveProps(nextProps) {
      // console.log(nextProps)
      // if(nextProps.results){
      //   let { business } = this.state;
      //   let nextBusiness = find(nextProps.results, {id: business.id});
        
      //   console.log('nextBusiness', business, nextBusiness);
      //   // should update the local business state
      //   if(business && nextBusiness){
      //     if(nextBusiness.reviews.length != business.reviews.length){
      //       this.setState({...this.state, business:nextBusiness});
      //     }
      //   }
      // }
    }
  
    render() {
      const { theme, results, term, loc, popular, good, asc, onReviewSubmit } = this.props;
      const { dialogOpen, businessID } = this.state;
      const business = find(results, {id: businessID});
      return (
        <Panel>
          <BusinessDialog open={dialogOpen} business={business}
            onDone={() => this.updateState('dialogOpen', false)}
            onReviewSubmit={onReviewSubmit}
          />
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
