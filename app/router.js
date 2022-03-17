'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.view.index);

  // user
  router.get('/weather-search/api/user/:id', controller.user.info);
  router.get('/weather-search/api/user/find/inUse', controller.user.inUse);
  router.get('/weather-search/api/user/find/pushUser', controller.user.pushUser);
  router.put('/weather-search/api/user/register', controller.user.register);

  // weather
  router.get('/weather-search/api/weather/find/provinces', controller.weather.provinces);
  router.get('/weather-search/api/weather/find/:province/citys', controller.weather.citys);
  router.get('/weather-search/api/weather/find/:city/districts', controller.weather.districts);
  router.get('/weather-search/api/weather/searchByRegionCode/:regionCode', controller.weather.searchByRegionCode);
};

