require('dotenv').config();
const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Adapterの作成（Botへの窓口）
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Webサーバーの起動
const server = restify.createServer();
server.listen(3978, () => {
    console.log(`✅ Bot is running at http://localhost:3978`);
});

// エンドポイントにメッセージが来たら処理
server.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === 'message') {
            const text = context.activity.text;
            await context.sendActivity(`🗨️ あなたは「${text}」と言いましたね！`);
        }
    });
});

