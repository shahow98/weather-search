'use strict';

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async provinces() {
    const { ctx } = this;
    const provinces = await ctx.service.weather.findProvinces();
    ctx.body = provinces;
  }

  async citys() {
    const { ctx } = this;
    const province = ctx.params.province;
    const citys = await ctx.service.weather.findCitys(province);
    ctx.body = citys;
  }

  async districts() {
    const { ctx } = this;
    const city = ctx.params.city;
    const districts = await ctx.service.weather.findDistricts(city);
    ctx.body = districts;
  }

  async searchByRegionCode() {
    const { ctx } = this;
    const regionCode = ctx.params.regionCode;
    const weather = await ctx.service.weather.searchByRegionCode(regionCode);
    ctx.body = weather;
  }
}

module.exports = WeatherController;
