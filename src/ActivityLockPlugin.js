import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'ActivityLockPlugin';

const ActivityButton = ({handler, manager, flex}) => (<div>
  <button
    onClick={() => {
      handler('Offline', manager);
    }}
  >Change to Offline</button>
  <button
    onClick={() => {
      handler('Available');
    }}
  >Change to Available</button></div>);
export default class ActivityLockPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    /**
     ** payload: { activityAvailable?: boolean,
     *  activityName?: string,
     *  activitySid?: string,
     *  rejectPendingReservations?: boolean
     *  }
     */
    flex.Actions.replaceAction('SetActivity', (payload, original) => {
      const currentState = manager.store.getState();
      const {activityLocked} = currentState['activity-lock'];
      if (!activityLocked) {
        return original(payload);
      }
    });

    flex.SideNav.Content.add(<ActivityButton
      key="activitybutton"
      manager={manager}
      flex={flex}
      handler={this.activityButtonHandler}
    />);

    this.registerReducers(manager);

    const options = { sortOrder: -1 };

    flex.AgentDesktopView
      .Panel1
      .Content
      .add(<CustomTaskListContainer key="demo-component" />, options);

  }

  activityButtonHandler(activityName, manager, flex){
    const activities = manager.store.getState().flex.worker.activities;
    const activity = activities.value;
    console.log(activity);
    for (let i = 0; i < activities.size; i++) {
      if ( activity.value.friendlyName === activityName) break;
       activity.next();
    }
    flex.Actions.invokeAction(
      'SetActivity',
      {activities, activity, offlineAllowed: true}
      );
  }
  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
