export function saveThemeManifest(dir: string, info: boolean): Promise<string>;
export function extractManifests(cmdOpts?: object): Promise<void>;
export function updateManifests(cmdOpts: object): Promise<any>;
export function saveLibraryPackage(lib: any[], info: boolean): Promise<string>;
export function extractLibraries(cmdOpts?: object): Promise<void>;
export function includeLibraries(cmdOpts: object): Promise<any>;
export function cleanDirectory(cmdOpts?: object): void;
export function parseCommand(args: any[]): void;
export { commander };
import { program as commander } from "commander";
