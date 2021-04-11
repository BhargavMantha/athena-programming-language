import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfinitePrompterModule } from './infinite-prompter/infinite-prompter.module';
import { AthenaErrorService } from './athena-error/athena-error.service';

@Module({
  imports: [InfinitePrompterModule],
  controllers: [AppController],
  providers: [AppService, AthenaErrorService]
})
export class AppModule {}
