import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from './graphql/mutations';
import './RegistrationForm.css';


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER);

  const onSubmit = async (formData) => {
    const { name, email, password } = formData;
    try {
      const { data } = await registerUser({
        variables: { name, email, password }
      });
      console.log('Registration successful', data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input {...register('name')} placeholder="Name" className="input-field" />
        <p className="error-message">{errors.name?.message}</p>
  
        <input {...register('email')} placeholder="Email" className="input-field" />
        <p className="error-message">{errors.email?.message}</p>
  
        <input {...register('password')} type="password" placeholder="Password" className="input-field" />
        <p className="error-message">{errors.password?.message}</p>
  
        <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" className="input-field" />
        <p className="error-message">{errors.confirmPassword?.message}</p>
  
        <button type="submit" disabled={loading} className="button">
          Register
        </button>
        {loading && <p className="loading">Registering...</p>}
        {error && <p className="error-message">Error: {error.message}</p>}
        {data && <p className="loading">Registered Successfully!</p>}
      </form>
    </div>
  );
}

export default RegistrationForm;
