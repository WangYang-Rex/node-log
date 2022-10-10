// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportFile from '../../../app/service/File';
import ExportGithubrank from '../../../app/service/githubrank';
import ExportSlink from '../../../app/service/slink';
import ExportWxapi from '../../../app/service/wxapi';

declare module 'egg' {
  interface IService {
    file: AutoInstanceType<typeof ExportFile>;
    githubrank: AutoInstanceType<typeof ExportGithubrank>;
    slink: AutoInstanceType<typeof ExportSlink>;
    wxapi: AutoInstanceType<typeof ExportWxapi>;
  }
}
