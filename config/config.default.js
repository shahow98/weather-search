/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614928000114_529';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'HOST',
        // host: 'localhost',
        // 端口号
        port: 'PORT',
        // 用户名
        user: 'USER',
        // 密码
        password: 'PASSWORD',
        // password: 'root',
        // 数据库名
        database: 'weather_search',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.html': 'nunjucks',
      },
    },
    security: {
      csrf: {
        headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      },
    },
    logger: {
      dir: '/projects/weather-search/logs',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
