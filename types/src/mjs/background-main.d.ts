export const sidebar: Map<any, any>;
export function setSidebarState(windowId?: number): Promise<void>;
export function removeSidebarState(windowId: number): Promise<boolean>;
export function toggleSidebar(): Promise<any>;
export function handleSaveSessionRequest(domString: string, windowId: number): Promise<boolean>;
export function handleMsg(msg?: object): Promise<any[]>;
export function portOnMessage(msg: object): Promise<any>;
export function handleDisconnectedPort(port?: object): Promise<void>;
export function portOnDisconnect(port: object): Promise<any>;
export function handleConnectedPort(port?: object): Promise<void>;
export function handleCmd(cmd: string): Promise<Promise<any> | null>;
export { ports };
import { ports } from "./port.js";