import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'ActivityLockPlugin';

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

    flex.Actions.replaceAction('SetActivity', (payload, original) => {
      const currentState = manager.store.getState();
      const {activityLocked} = currentState['activity-lock'].customTaskList;
      console.log('Locked?', activityLocked);
      if (!activityLocked) {
        return original(payload);
      }
    });

    this.registerReducers(manager);

    const options = { sortOrder: -1 };

    flex.AgentDesktopView
      .Panel1
      .Content
      .add(<CustomTaskListContainer
        manager={manager}
        flex={flex}
        key="demo-component"
      />, options);

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
