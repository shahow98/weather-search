'use strict';

const Subscription = require('egg').Subscription;

class PushTask extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 10 8,17 * * *',
      type: 'worker', // 指定所有的 worker 都需要执行
    };
  }

  async subscribe() {
    const { ctx } = this;
    const users = await ctx.service.user.findPushUser();
    users.forEach(async user => {
      const results = await ctx.service.weather.findResultByRegionCode(user.region_code);
      if (!results.length) {
        return;
      }
      results.forEach(res => {
        const weather = JSON.parse(res.weather_msg);
        if (weather.data.status === 0) {
          const content = ctx.service.email.wheatherContentBuild(weather);
          ctx.service.email.sender(`【Weather Maker】${weather.data.result.location.name}-${weather.data.result.now.text}-${weather.data.result.now.temp}℃-${weather.data.result.forecasts[0].week}`, content, `"${user.name}" <${user.email}>`);
        }
      });
    });
  }
}

module.exports = PushTask;
