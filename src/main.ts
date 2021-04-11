import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InfinitePrompterService } from './infinite-prompter/infinite-prompter.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const infinitePrompterService = app.get(InfinitePrompterService);
  await infinitePrompterService.initiate();
}
bootstrap();
