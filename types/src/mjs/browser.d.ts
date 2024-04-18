export function isPermissionGranted(perm: object): Promise<boolean>;
export function createBookmark(opt: object): Promise<object>;
export function getBookmarkTreeNode(id?: string | any[]): Promise<any[] | null>;
export function getCloseTabsByDoubleClickValue(): Promise<object>;
export function setContextMenuOnMouseup(): Promise<boolean>;
export function clearContextMenuOnMouseup(): Promise<boolean>;
export function getNewTabPositionValue(): Promise<object>;
export function isCommandCustomizable(): Promise<boolean>;
export function updateCommand(id: string, value?: string): Promise<void | null>;
export function getAllContextualIdentities(): Promise<any[] | null>;
export function getContextualId(cookieStoreId: string): Promise<object>;
export function getEnabledTheme(): Promise<any[] | null>;
export function getExtensionInfo(id: string): Promise<object>;
export function getExternalExtensions(): Promise<(any[] | boolean) | null>;
export function clearNotification(id: string): Promise<boolean | null>;
export function createNotification(id: string, opt: object): Promise<string | null>;
export function removePermission(perm: string | any[]): Promise<boolean>;
export function requestPermission(perm: string | any[]): Promise<boolean>;
export function getManifestIcons(): object | string;
export function getManifestVersion(): number;
export function getOs(): Promise<string>;
export function makeConnection(id?: number | string, info?: object | boolean): Promise<object>;
export function sendMessage(id: number | string, msg: any, opt: object): Promise<object>;
export function isScriptingAvailable(): Promise<boolean>;
export function executeScriptToTab(opt?: object): Promise<(any[] | boolean) | null>;
export function searchWithSearchEngine(query: string, opt?: object): Promise<void>;
export function getRecentlyClosedTab(windowId?: number): Promise<object>;
export function getSessionWindowValue(key: string, windowId?: number): Promise<string | null>;
export function restoreSession(sessionId: string): Promise<object>;
export function setSessionWindowValue(key: string, value: string | object, windowId?: number): Promise<void>;
export function clearStorage(area?: string): Promise<void>;
export function getAllStorage(area?: string): Promise<object>;
export function getStorage(key: any, area?: string): Promise<object>;
export function removeStorage(key: any, area?: string): Promise<void>;
export function setStorage(obj: object, area?: string): Promise<void>;
export function createTab(opt?: object): Promise<object>;
export function duplicateTab(tabId: number, opt: object): Promise<object>;
export function queryTabs(opt: object): Promise<any[] | null>;
export function execScriptToTab(tabId: number | object, opt?: object): Promise<(any[] | boolean) | null>;
export function execScriptToTabs(opt?: object): Promise<any[]>;
export function execScriptsToTabInOrder(tabId: number | any[], opts?: any[]): Promise<any>;
export function getActiveTab(windowId?: number): Promise<object>;
export function getActiveTabId(windowId?: number): Promise<number | null>;
export function getAllTabsInWindow(windowId?: number): Promise<any[] | null>;
export function getHighlightedTab(windowId?: number): Promise<any[] | null>;
export function getTab(tabId: number): Promise<object>;
export function highlightTab(index: number | any[], windowId?: number): Promise<object>;
export function moveTab(tabId: number | any[], opt?: object): Promise<any[] | null>;
export function reloadTab(tabId: number, opt: object): Promise<void>;
export function removeTab(arg: number | any[]): Promise<void>;
export function updateTab(tabId: number, opt: object): Promise<object>;
export function warmupTab(tabId: number): Promise<void>;
export function captureVisibleTab(windowId: number, opt: object): Promise<string | null>;
export function isTab(tabId: any): Promise<boolean>;
export function getCurrentTheme(windowId?: number): Promise<object>;
export function createNewWindow(opt: object): Promise<object>;
export function getAllNormalWindows(populate?: boolean): Promise<any[]>;
export function getCurrentWindow(opt: object): Promise<object>;
export function getWindow(windowId: number, opt: object): Promise<object>;
export function checkIncognitoWindowExists(): Promise<boolean>;
