import React from 'react';

import { CustomTaskListComponentStyles } from './CustomTaskList.Styles';
import {ACTION_TOGGLE_ACTIVITY} from "../../states/CustomTaskListState";

const ActivityButton = ({handler, manager}) => (<div>
  <button
    onClick={() => {
      handler(manager);
    }}
  >LOCK</button>
  <div>{manager.store.getState()['activity-lock'].activityLocked
    ? 'Actions are locked'
    : 'Actions are Unlocked'}</div>
  <button
    onClick={() => {
      handler(manager);
    }}
  >UNLOCK</button></div>);

function activityButtonHandler(manager) {
  manager.store.dispatch({ type: ACTION_TOGGLE_ACTIVITY});
}

// It is recommended to keep components stateless and use redux for managing states
const CustomTaskList = (props) => {
  const {manager, flex} = props;
  if (!props.isOpen) {
    return null;
  }
  console.log('custrom', props);
  return (
    <CustomTaskListComponentStyles>
      This is a dismissible demo component
      <ActivityButton
        key="activity-button"
        manager={manager}
        flex={flex}
        handler={activityButtonHandler}
      />
      <i className="accented" onClick={props.dismissBar}>
        close
      </i>
    </CustomTaskListComponentStyles>
  );
};

export default CustomTaskList;
