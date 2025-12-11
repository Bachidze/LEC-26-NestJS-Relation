import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel("post") private postModel:Model<any>,
    @InjectModel("user") private userModel:Model<User>,
    // private userService:UsersService
){}

async  create(userId:string,createPostDto: CreatePostDto) {
  // const user = await this.userService.findOne(userId)
  const user = await this.userModel.findById(userId)
   if(!user) throw new NotFoundException
    const newPost = await this.postModel.create({...createPostDto,user:user._id})
    // await this.userService.addPost(user._id,newPost._id)
    await this.userModel.findByIdAndUpdate(user._id,{$push:{posts:newPost._id}})
    return newPost
  }

  findAll() {
    return this.postModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
