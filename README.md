# oura-ring-line-notify

Oura API から睡眠データを取得し、昼寝の時間を LINE Notify で通知します。

## Install 

```bash
npm ci
```

## Token

https://notify-bot.line.me/my/

https://cloud.ouraring.com/personal-access-tokens

## Run

```bash
LINE_NOTIFY_TOKEN=<LINE Notify Token> OURA_API_TOKEN=<Oura API Token> node index.js
```
