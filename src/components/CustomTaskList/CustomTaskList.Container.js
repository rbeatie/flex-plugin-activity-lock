import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../states/CustomTaskListState';
import CustomTaskList from './CustomTaskList';

const mapStateToProps = (state, ownProps) => {
  console.log(state['activity-lock'].customTaskList.flex || ownProps.flex);
  console.log(state['activity-lock'].customTaskList.flex || ownProps.flex);

  return ({
    manager: state['activity-lock'].customTaskList.manager || ownProps.manager,
    flex: state['activity-lock'].customTaskList.flex || ownProps.flex,
    isOpen: state['activity-lock'].customTaskList.isOpen,
  });
};

const mapDispatchToProps = (dispatch) => ({
  dismissBar: bindActionCreators(Actions.dismissBar, dispatch),
  toggleActivityLock: bindActionCreators(Actions.toggleActivityLock, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomTaskList);
