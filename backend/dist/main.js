"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: [
                'https://minty-frontend.vercel.app',
                'https://minty-admin.vercel.app',
                'http://localhost:5173',
                'http://localhost:5174',
            ]
        });
        const port = process.env.PORT ?? 3000;
        await app.listen(port);
        console.log(`✅ Server running on http://localhost:${port}`);
    }
    catch (error) {
        console.error('❌ Server startup failed:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map