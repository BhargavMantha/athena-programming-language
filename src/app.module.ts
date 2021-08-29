import { Module } from '@nestjs/common';
import { InfinitePrompterModule } from './infinite-prompter/infinite-prompter.module';
import { AthenaErrorService } from './athena-error/athena-error.service';

@Module({
  imports: [InfinitePrompterModule],
  providers: [AthenaErrorService]
})
export class AppModule {}
