import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class Product {
    @Prop({type:String})
    name:string

    @Prop({type:String})
    desc:string

    @Prop({type:Number})
    price:number

    @Prop({type:String})
    imageUrl:string

    @Prop({type:Number})
    quantity:number
}

export const productSchema = SchemaFactory.createForClass(Product)


