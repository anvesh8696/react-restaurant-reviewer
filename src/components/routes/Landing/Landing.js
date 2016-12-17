import React, { Component, PropTypes } from 'react';
import { Panel} from 'react-toolbox/components/index.js';
import { themr } from 'react-css-themr';
import defaultTheme from './Landing.scss';
import Input from 'react-toolbox/components/input';
import Navigation from 'react-toolbox/components/navigation';
import Checkbox from 'react-toolbox/components/checkbox';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/components/list';

@themr('Landing', defaultTheme)
class Landing extends Component {
  
    static propTypes = {
      theme: PropTypes.object.isRequired,
      router: PropTypes.shape({
        push: PropTypes.func.isRequired
      }).isRequired,
      loc: PropTypes.string,
      search: PropTypes.string,
      open: PropTypes.bool,
      group: PropTypes.bool,
      outdoor: PropTypes.bool,
      results: PropTypes.array,
      onChange: PropTypes.func
    }
    
    state = {
      loggingIn: false
    }

    handleChange = (name, value) => {
      const { onChange } = this.props;
      onChange(name, value);
    }
    
    renderResult(index, avatar, caption, legend) {
      return (
        <ListItem
          key={`res_${index}`}
          avatar={avatar}
          caption={caption}
          legend={legend}
          rightIcon="star"
        />
      );
    }
  
    render() {
      const { theme, results, search, loc, open, group, outdoor } = this.props;
      console.log(this.props)
      return (
        <Panel>
          <article className={theme.page}>
            <header>
              <Input theme={theme} type="text" hint="Search" name="search"
                value={search} onChange={this.handleChange.bind(this, 'search')} />
              <Input theme={theme} type="text" hint="Location" name="location"
                value={loc} onChange={this.handleChange.bind(this, 'loc')} />
            </header>
            <section>
              <Navigation type="horizontal" theme={theme}>
                <Checkbox
                  checked={open}
                  label="Open Now"
                  onChange={this.handleChange.bind(this, 'open')}
                />
                <Checkbox
                  checked={group}
                  label="Good for Groups"
                  onChange={this.handleChange.bind(this, 'group')}
                />
                <Checkbox
                  checked={outdoor}
                  label="Outdoor Seating"
                  onChange={this.handleChange.bind(this, 'outdoor')}
                />
              </Navigation>
              <section>
                <List selectable ripple>
                  <ListSubHeader caption="Search Results:" />
                  {
                    results ? 
                    results.map((r, i) => this.renderResult(i, r.avatar, r.caption, r.legend)) :
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
