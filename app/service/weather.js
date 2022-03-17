// app/service/weather.js
'use strict';
const Service = require('egg').Service;
const DISTRICT = 't_district';
const SEARCH_RESULT = 't_search_result';

class WeatherService extends Service {

  async findProvinces() {
    const findSql = `select distinct province from ${DISTRICT}`;
    const provinces = await this.app.mysql.query(findSql, []);
    return provinces;
  }

  async findCitys(province) {
    const findSql = `select distinct city from ${DISTRICT} where province = ?`;
    const provinces = await this.app.mysql.query(findSql, [ province ]);
    return provinces;
  }

  async findDistricts(city) {
    const citys = await this.app.mysql.select(DISTRICT, {
      where: { city },
      columns: [ 'districtcode', 'district' ],
    });
    return citys;
  }

  async findByDistrictCode(districtCode) {
    const district = await this.app.mysql.select(DISTRICT, {
      where: { districtcode: districtCode },
    });
    return district;
  }

  async findResultByRegionCode(regionCode) {
    const result = await this.app.mysql.select(SEARCH_RESULT, {
      where: { region_code: regionCode },
    });
    return result;
  }

  async findResultsByRefreshT() {
    const results = await this.app.mysql.select(SEARCH_RESULT, {
      where: { refresh_flag: 'T' },
    });
    return results;
  }

  async addResult(regionCode, refreshFlag, weatherMsg) {
    const result = await this.findResultByRegionCode(regionCode);
    if (result.length) {
      this.updateResult(regionCode, refreshFlag, weatherMsg);
    } else {
      this.insertResult(regionCode, refreshFlag, weatherMsg);
    }
  }

  async updateResultFlag(regionCode, refreshFlag) {
    const result = await this.app.mysql.update(SEARCH_RESULT, {
      refresh_flag: refreshFlag,
    }, {
      where: {
        region_code: regionCode,
      },
    });
    const isSuccess = result.affectedRows === 1 ? '成功' : '失败';
    this.ctx.logger.info(`更新${regionCode}区域状态: ${isSuccess}`);
  }

  async updateResult(regionCode, refreshFlag, weatherMsg) {
    const result = await this.app.mysql.update(SEARCH_RESULT, {
      refresh_flag: refreshFlag,
      weather_msg: weatherMsg,
    }, {
      where: {
        region_code: regionCode,
      },
    });
    const isSuccess = result.affectedRows === 1 ? '成功' : '失败';
    this.ctx.logger.info(`更新${regionCode}区域: ${isSuccess}`);
  }

  async insertResult(regionCode, refreshFlag, weatherMsg) {
    const result = await this.app.mysql.insert(SEARCH_RESULT, {
      region_code: regionCode,
      refresh_flag: refreshFlag,
      weather_msg: weatherMsg,
    });
    const isSuccess = result.affectedRows === 1 ? '成功' : '失败';
    this.ctx.logger.info(`添加${regionCode}区域: ${isSuccess}`);
  }

  async searchByRegionCode(regionCode) {
    const ak = 'YOUER_AK';
    const weather = await this.app.curl(`http://api.map.baidu.com/weather/v1/?district_id=${regionCode}&data_type=all&ak=${ak}`, {
      dataType: 'json',
    });
    return weather;
  }
}

module.exports = WeatherService;
