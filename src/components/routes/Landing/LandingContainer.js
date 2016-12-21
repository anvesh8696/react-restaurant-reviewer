import { connect } from 'react-redux';
import Landing from './Landing';
import { onChange, onFilterUpdate, onReviewSubmit, search } from './LandingModule';

const mapStateToProps = (state) => {
  let { term, loc, popular, good, asc, results } = state.landing;
  return { term, loc, popular, good, asc, results };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (prop, value) => dispatch(onChange({[prop]: value})),
    onFilterUpdate: () => dispatch(onFilterUpdate()),
    onReviewSubmit: (businessID, review, rating) => dispatch(onReviewSubmit({businessID, review, rating})),
    search: () => dispatch(search())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
