// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExtendIHelper = require('../../../app/extend/helper');
type ExtendIHelperType = typeof ExtendIHelper;
declare module 'egg' {
  interface IHelper extends ExtendIHelperType { }
}