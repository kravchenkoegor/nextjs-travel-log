import PlaceForm from 'src/components/shared/PlaceForm';

const AddPlace: React.FC = () => {
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="text-xl">Add a new place</h1>
        </div>
        <div className="col-12 col-xl-6 offset-xl-3">
          <PlaceForm />
        </div>
      </div>
    </div>
  );
};

export default AddPlace;
