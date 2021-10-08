// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportError from '../../../app/service/Error';
import ExportFile from '../../../app/service/File';
import ExportSlink from '../../../app/service/slink';

declare module 'egg' {
  interface IService {
    error: AutoInstanceType<typeof ExportError>;
    file: AutoInstanceType<typeof ExportFile>;
    slink: AutoInstanceType<typeof ExportSlink>;
  }
}
