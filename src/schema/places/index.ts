import {
  Arg,
  Ctx,
  Field,
  Float,
  ID,
  InputType,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql';
import { Min, Max } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Context } from '../context';

@InputType()
export class CoordinatesInput {
  @Min(-90)
  @Max(90)
  @Field(_type => Float)
  lat!: number;

  @Min(-180)
  @Max(180)
  @Field(_type => Float)
  lng!: number;
}

@InputType()
export class BoundsInput {
  @Field(_type => CoordinatesInput)
  ne!: CoordinatesInput;

  @Field(_type => CoordinatesInput)
  sw!: CoordinatesInput;
}

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
  async places(@Arg('bounds') bounds: BoundsInput, @Ctx() ctx: Context) {
    try {
      if (!ctx.collection) return [];

      const places = await ctx.collection
        .find({
          'coordinates.latitude': {
            $gte: bounds.sw.lat,
            $lte: bounds.ne.lat
          },
          'coordinates.longitude': {
            $gte: bounds.sw.lng,
            $lte: bounds.ne.lng
          }
        })
        .toArray();
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
