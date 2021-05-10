import { ChangeEvent, memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGoogleMap } from 'src/context/MapContext';
import Link from 'next/link';
import SearchBox from 'src/components/SearchBox';
import { Coordinates } from 'src/interfaces';

interface Props {
  place?: any;
  // onSubmit: (data: any) => void
}

interface FormData {
  address: string;
  coordinates: Coordinates;
  image: string;
  visitDate: string;
}

type onSelectAddress = (address: string, lat: number, lng: number) => void;

const PlaceForm: React.FC<Props> = ({ place }) => {
  const { isLoaded } = useGoogleMap();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // @Field(_type => String)
  // address!: string;

  // @Field(_type => Coordinates)
  // coordinates!: Coordinates;

  // @Field(_type => String)
  // image!: string;

  // @Field(_type => String)
  // userId!: string;

  // // время когда был там
  // @Field(_type => VisitDate)
  // visitDate!: VisitDate;

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: place
      ? {
          address: place.address,
          coordinates: place.coordinates,
          image: place.image,
          visitDate: place.visitDate
        }
      : {}
  });
  const address = watch('address');

  const imageInputRef = register('image', {
    // @ts-ignore
    validate: (fileList: FileList): boolean | string => {
      return fileList.length === 1 ? true : 'Please upload one image';
    }
  });

  useEffect(() => {
    register('address', { required: 'Please enter your address' });
    register('coordinates.lat', { required: true, min: -90, max: 90 });
    register('coordinates.lng', { required: true, min: -180, max: 180 });

    return () => {
      // cleanup
    };
  }, [register]);

  const onSelectAddess: onSelectAddress = (
    address: string,
    lat: number,
    lng: number
  ) => {
    setValue('address', address);
    setValue('coordinates.lat', lat);
    setValue('coordinates.lng', lng);
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const updatePlace = () => {
    console.log('updatePlace');
  };
  const createPlace = () => {
    console.log('createPlace');
  };
  const onSubmit = (data: FormData) => {
    console.log({ data });

    place ? updatePlace() : createPlace();
  };

  return isLoaded ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4">
        <label htmlFor="search" className="form-label">
          Search your location
        </label>
        <SearchBox onSelectAddress={onSelectAddess} defaultValue="" />
        {/* {errors.address ? (
          <p className="text-red-500">{errors.address.message}</p>
        ) : null} */}
      </div>
      {address ? (
        <>
          <div className="mt-4">
            <label
              htmlFor="image"
              className="form-label"
              style={{
                border: '4px dashed #888888',
                cursor: 'pointer',
                display: 'block',
                margin: 0,
                padding: '1rem',
                width: '100%'
              }}
            >
              Please upload image (16:9)
            </label>
            <input
              className="form-control"
              id="image"
              type="file"
              accept="image/*"
              hidden
              {...imageInputRef}
              onChange={onChangeImage}
            />
            {/* <label
              htmlFor="image"
              className="p-4 border-dashed border-4 border-gray-600 block cursor-pointer"
            >
              Click to add image (16:9)
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              hidden
              ref={imageInputRef as any}
              onChange={onChangeImage}
            /> */}
            {previewImage ? (
              <img
                src={previewImage}
                className="mt-4 object-cover"
                height={(9 / 16) * 576}
                width="576"
                style={{
                  height: `${(9 / 16) * 576}px`,
                  width: '576px'
                }}
              />
            ) : null}
            {/*
            //   house ? (
            //   <Image
            //     className="mt-4"
            //     cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            //     publicId={house.imagePublicId}
            //     alt={house.address}
            //     secure
            //     dpr="auto"
            //     quality="auto"
            //     width={576}
            //     height={Math.floor((9 / 16) * 576)}
            //     crop="fill"
            //     gravity="auto"
            //   />
            // ) : null}
            // {errors.image ? (
            //   <p className="text-red-500 mt-2">{errors.image.message}</p>
            // ) : null} */}
          </div>
          <div className="mt-4">
            {/* <label htmlFor="bedrooms" className="block mb-2">
              Visit date
            </label> */}
            {/* <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              className="p-2"
              ref={register({
                required: 'Please enter the number of bedrooms',
                max: { value: 10, message: '10 beds is maximum' },
                min: { value: 1, message: '1 bed is minimum' }
              })}
            /> */}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              Save
            </button>
            <Link href={place ? `/place/${place._id}` : '/'}>
              <a className="inline-block ml-4 text-white">Cancel</a>
            </Link>
          </div>
        </>
      ) : null}
    </form>
  ) : (
    <p>Loading...</p>
  );
};

export default memo(PlaceForm);
