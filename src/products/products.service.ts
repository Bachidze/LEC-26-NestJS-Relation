import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { faker } from '@faker-js/faker';
import { QueryDTO } from './dto/query.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(@InjectModel('product') private productModel: Model<Product>) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  // onModuleInit() {
  //   console.log("hello")
  //   const products = {
  //     name:faker.commerce.productName(),
  //     desc:faker.commerce.productDescription(),
  //     price:faker.commerce.price({min:50,max:2000}),
  //     imageUrl:faker.image.url(),
  //     quantity:faker.number.int({min:1,max:20})

  //   }
  //   console.log(products,"this is faker products")
  // }

  // insertMany()
  async onModuleInit() {
    const count = await this.productModel.countDocuments();
    if (count === 0) {
      const productList:any = [];
      for (let i = 0; i < 100_000; i++) {
        const products = {
          name: faker.commerce.productName(),
          desc: faker.commerce.productDescription(),
          price: faker.commerce.price({ min: 50, max: 2000 }),
          imageUrl: faker.image.url(),
          quantity: faker.number.int({ min: 1, max: 20 }),
        }
        productList.push(products)
      }
      console.log(productList)
      console.log(productList.length)
      await this.productModel.insertMany(productList)
      console.log("inserted")
    }
  }

  findAll({page,take}:QueryDTO) {
    return this.productModel.find().skip((page-1) * take).limit(take > 30 ? 30:take)
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  getProduct(){
    return this.productModel.find({price:19})
  }

  deleteAll():any{
    return this.productModel.deleteMany()
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
