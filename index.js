const LineNotify = require('line-notify-nodejs');
const Oura = require('oura-api-v2-client');
const format = require('date-fns/format');
const add = require('date-fns/add');
const utcToZonedTime = require('date-fns-tz/utcToZonedTime');

if (!process.env.LINE_NOTIFY_TOKEN) throw new Error('LINE Notify token is required.');
if (!process.env.OURA_API_TOKEN) throw new Error('Oura API token token is required.');

const lineNotify = LineNotify(process.env.LINE_NOTIFY_TOKEN);
const oura = new Oura(process.env.OURA_API_TOKEN);

const main = async () => {
  // 最新の睡眠データを取得する
  const sleep = await oura.sleep_v1();
  const latestBedEnd = sleep.sleep.slice(-1)[0].bedtime_end;
  console.log(latestBedEnd);

  // 眠くなる時間を計算する
  const latestBedEndDate = utcToZonedTime(new Date(latestBedEnd), 'Asia/Tokyo');
  const sleepyTimeDate = add(latestBedEndDate, { hours: 8 });
  const napTimeDate = add(latestBedEndDate, { hours: 6 });

  // LINE Notifyで通知する
  await lineNotify.notify({
    message: `今日は ${format(latestBedEndDate, 'H:mm')} に起きましたね。\n${format(sleepyTimeDate, 'H:mm')} 頃に眠くなりそうです。\n\n${format(napTimeDate, 'H')}時頃にお昼寝しましょう。\n10分ほど目をつぶるだけでも効果があります。`,
  });
};

main();
