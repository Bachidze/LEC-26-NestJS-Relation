import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './schema/post.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:"post",schema:postSchema}])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
