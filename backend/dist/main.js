"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const allowedOrigins = (process.env.FRONTEND_URLS ?? '')
            .split(',')
            .map((origin) => origin.trim())
            .filter(Boolean);
        allowedOrigins.push('http://localhost:5173', 'http://localhost:5174');
        app.enableCors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                    return;
                }
                callback(new Error(`Origin ${origin} is not allowed by CORS`), false);
            },
        });
        const port = process.env.PORT ?? 3000;
        await app.listen(port, '0.0.0.0');
        console.log(`✅ Server running on http://localhost:${port}`);
    }
    catch (error) {
        console.error('❌ Server startup failed:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map