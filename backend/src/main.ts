import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const allowedOrigins = (process.env.FRONTEND_URLS ?? '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean);
    allowedOrigins.push('http://localhost:5173', 'http://localhost:5174');

    app.enableCors({
      origin: (origin, callback) => {
        // Allow non-browser callers (health checks, server-side requests).
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
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
}
bootstrap();
