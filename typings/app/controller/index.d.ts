// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportError from '../../../app/controller/error';
import ExportFile from '../../../app/controller/file';
import ExportHome from '../../../app/controller/home';
import ExportSlink from '../../../app/controller/slink';

declare module 'egg' {
  interface IController {
    error: ExportError;
    file: ExportFile;
    home: ExportHome;
    slink: ExportSlink;
  }
}
