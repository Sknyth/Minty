import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`✅ Server running on http://localhost:${port}`);
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
}
bootstrap();
