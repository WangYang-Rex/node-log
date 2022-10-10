// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFile from '../../../app/controller/file';
import ExportGithubrank from '../../../app/controller/githubrank';
import ExportHome from '../../../app/controller/home';
import ExportSlink from '../../../app/controller/slink';
import ExportWxapi from '../../../app/controller/wxapi';

declare module 'egg' {
  interface IController {
    file: ExportFile;
    githubrank: ExportGithubrank;
    home: ExportHome;
    slink: ExportSlink;
    wxapi: ExportWxapi;
  }
}
