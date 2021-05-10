import FirebaseForm from 'src/components/shared/FirebaseForm';
import { useAuth } from 'src/context/AuthContext';
import { FormInput } from 'src/interfaces';

// TODO Snackbar with error messages

const RegisterPage: React.FC = () => {
  const { register } = useAuth();

  const onSubmit = async (data: FormInput): Promise<void> => {
    try {
      await register(data);
    } catch (error) {
      console.log('onSubmitError', error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 col-xl-6 offset-xl-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sign up</h5>
              <FirebaseForm onSubmit={onSubmit} buttonText="Register" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
