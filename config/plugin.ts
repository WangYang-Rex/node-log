import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  alinode: {
    enable: true,
    package: 'egg-alinode',
  },
};

export default plugin;
