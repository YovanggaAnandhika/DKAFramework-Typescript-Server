import { EntryObject as WebpackEntryObject } from "webpack";
import { ConfigReactJS } from "../../../Interfaces/Config/ReactJS";
declare type entry = undefined | string | (() => string | WebpackEntryObject | string[] | Promise<string | WebpackEntryObject | string[]>) | WebpackEntryObject | string[];
export declare function Entry(config: ConfigReactJS): Promise<entry>;
export {};
//# sourceMappingURL=Entry.d.ts.map