import { useForm } from 'react-hook-form';

interface FormInput {
  email: string;
  password: string;
}

interface Props {
  buttonText: 'Login' | 'Register';
  onSubmit: (data: FormInput) => Promise<void>;
}

// TODO Form Validation

const FirebaseForm: React.FC<Props> = ({ buttonText, onSubmit }) => {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="text"
          className="form-control"
          id="email"
          {...register('email', {
            required: true,
            validate: (v: string) => {
              return true;
            }
          })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          {...register('password', {
            required: true
          })}
        />
        {/* {<small></small>} */}
      </div>
      <button type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  );
};

export default FirebaseForm;
