import { connect } from 'react-redux';
import Landing from './Landing';
import { onChange, onFilterUpdate, search } from './LandingModule';

const mapStateToProps = (state) => {
  let { term, loc, popular, good, closed, results } = state.landing;
  return { term, loc, popular, good, closed, results };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (prop, value) => dispatch(onChange({[prop]: value})),
    onFilterUpdate: () => dispatch(onFilterUpdate()),
    search: () => dispatch(search())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
