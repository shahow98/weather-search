'use strict';

const Subscription = require('egg').Subscription;

class SearchTask extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 0 8,17 * * *',
      type: 'worker', // 指定所有的 worker 都需要执行
    };
  }

  async subscribe() {
    const { ctx } = this;
    const regionCodes = await ctx.service.user.findRegionCodes();
    regionCodes.forEach(async code => {
      const district = await ctx.service.weather.findByDistrictCode(code);
      if (!district.length) {
        return;
      }
      const weather = await ctx.service.weather.searchByRegionCode(code);
      await ctx.service.weather.addResult(code, 'T', JSON.stringify(weather));
    });
  }
}

module.exports = SearchTask;
