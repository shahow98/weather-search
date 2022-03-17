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
    myAppName: 'weather-search',
    mysql: {
      client: {
        host: 'HOST',
        port: 'PORT',
        user: 'USER',
        password: 'PASSWORD',
        database: 'weather_search',
      },
      app: true,
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
        headerName: 'x-csrf-token',
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
