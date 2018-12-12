/**
 * background.js
 */

import {
  throwErr,
} from "./common.js";
import {
  handlePort, setSidebarIsOpenState, setSidebarWindowId, toggleSidebar,
} from "./background-main.js";

/* api */
const {browserAction, runtime, windows} = browser;

/* listeners */
browserAction.onClicked.addListener(() =>
  toggleSidebar().then(setSidebarIsOpenState).catch(throwErr)
);
runtime.onConnect.addListener(port =>
  handlePort(port).then(setSidebarIsOpenState).catch(throwErr)
);
windows.onFocusChanged.addListener(windowId =>
  setSidebarWindowId(windowId).then(setSidebarIsOpenState).catch(throwErr)
);

/* startup */
setSidebarIsOpenState().catch(throwErr);
