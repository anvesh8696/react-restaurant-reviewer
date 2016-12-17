import { connect } from 'react-redux';
import Landing from './Landing';
import { onChange } from './LandingModule';

const mapStateToProps = (state) => {
  return {
    search: state.landing.search,
    loc: state.landing.loc,
    open: state.landing.open,
    group: state.landing.group,
    outdoor: state.landing.outdoor,
    results: state.landing.results
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (prop, value) => dispatch(onChange({[prop]: value}))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
