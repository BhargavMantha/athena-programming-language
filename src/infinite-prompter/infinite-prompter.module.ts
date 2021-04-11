import { Module } from '@nestjs/common';
import { InfinitePrompterService } from './infinite-prompter.service';

@Module({
  providers: [InfinitePrompterService]
})
export class InfinitePrompterModule {}
