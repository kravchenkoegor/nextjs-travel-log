import {
  Arg,
  Ctx,
  Field,
  Float,
  ID,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql';
import { ObjectId } from 'mongodb';
import { Context } from '../context';

@ObjectType()
export class Coordinates {
  @Field(_type => Float)
  latitude!: number;

  @Field(_type => Float)
  longitude!: number;
}

@ObjectType()
export class VisitDate {
  @Field(_type => String)
  start!: string;

  @Field(_type => String)
  end!: string;
}

@ObjectType()
export class Place {
  @Field(_type => ID)
  _id!: ObjectId;

  @Field(_type => String)
  address!: string;

  @Field(_type => Coordinates)
  coordinates!: Coordinates;

  @Field(_type => String)
  image!: string;

  @Field(_type => String)
  userId!: string;

  // время когда был там
  @Field(_type => VisitDate)
  visitDate!: VisitDate;
}

@Resolver()
export class PlacesResolver {
  @Query(_returns => [Place])
  async places(@Ctx() ctx: Context) {
    try {
      const places = await ctx.collection.find({}).toArray();
      return places;
    } catch (error) {
      console.log('error', error);
    }
  }

  @Query(_returns => Place)
  async place(@Arg('id') id: string, @Ctx() ctx: Context) {
    try {
      if (id === '') {
        return null;
      }

      const result = await ctx.collection.findOne({
        _id: new ObjectId(id)
      });
      return result;
    } catch (error) {
      console.log('error', error);
    }
  }
}
