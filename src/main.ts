import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
// import { ConfigService } from '@nestjs/config';
// import { cors } from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const sequelize = app.get<Sequelize>(Sequelize);
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
    // const configService = new ConfigService();
    await app.listen(3000);
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 20,
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    console.log('Application started');
    await sequelize.sync({});
  } catch (err) {
    console.log('Failed to connect to the database:', err);
    return;
  }
}
bootstrap();
