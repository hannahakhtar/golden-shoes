import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Register({ history }) {
  const [passwordsDoNotMatch, setpasswordsDoNotMatch] = useState(false)
  const [emailRegistered, setemailRegistered] = useState(false)

  const { handleSubmit, formState: { errors }, register } = useForm()

  async function onSubmit(data) {
    setemailRegistered(false)
    checkUniqueEmail(data.emailAddress)
    setpasswordsDoNotMatch(false)
    const formdata = {
      'email': data.emailAddress,
      'password': data.password,
      'first_name': data.firstName,
      'last_name': data.lastName
    }
    if (data.password !== data.retypePassword) {
      setpasswordsDoNotMatch(true)
    } else {
      try {
        const { data } = await axios.post('/api/signup', formdata,)
        if (data.id) {
          history.push('/login/success')
        } else {
          console.log('Unable to register user. Email address must be unique and password and password confirmation must match.')
        }
      } catch (err) {
        console.log(err.response.data)
      }
    }
  }

  async function checkUniqueEmail(emailAddress) {
    const { data } = await axios.get('/api/users')
    const emailAddresses = []
    data.map((data) => {
      emailAddresses.push(data.email)
    })
    emailAddresses.map((email) => {
      if (email === emailAddress) {
        setemailRegistered(true)
      }
    })
  }

  return <>
    <Navbar />
    <Header header="Register" />
    <div className="mainBody">
      <p>*: required field</p>
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">* Email Address:</label>
          <input
            {...register('emailAddress', { required: true })}
            name='emailAddress'
            placeholder='Email Address'
            type='text'
            defaultValue=''
            className={`input ${errors.emailAddress && 'is-danger'}`}
          />
          {errors.emailAddress?.type === 'required' && 'An email address is required'}
          {emailRegistered &&
            <div>
              <p>There is already an account associated with this email address. Either <Link to='/login'>login</Link> or retry.</p>
            </div>
          }
          <label className="label">* First Name:</label>
          <input
            {...register('firstName', { required: true })}
            name='firstName'
            placeholder='First Name'
            type='text'
            defaultValue=''
            className={`input ${errors.firstName && 'is-danger'}`}
          />
          {errors.firstName?.type === 'required' && 'First name is required'}
          <label className="label">* Last Name:</label>
          <input
            {...register('lastName', { required: true })}
            name='lastName'
            placeholder='Last Name'
            type='text'
            defaultValue=''
            className={`input ${errors.lastName && 'is-danger'}`}
          />
          {errors.lastName?.type === 'required' && 'Last name is required'}
          <label className="label">* Password: (minimum of 6 characters)</label>
          <input
            {...register('password', { required: true, minLength: 6 })}
            name='password'
            placeholder='Password'
            type='password'
            defaultValue=''
            className={`input ${errors.password && 'is-danger'}`}
          />
          {errors.password?.type === 'required' && 'A password is required'}
          <label className="label">* Confirm password: (Must match the password above!</label>
          <input
            {...register('retypePassword', { required: true, minLength: 6 })}
            name='retypePassword'
            placeholder='Retype password'
            type='password'
            defaultValue=''
            className={`input ${errors.retypePassword && 'is-danger'}`}
          />
          {errors.retypePassword?.type === 'required' && 'Please confirm your password.'}
          {passwordsDoNotMatch &&
            <div>
              <p>Passwords do not match, please try again.</p>
            </div>
          }
          <div className="submitButton">
            <input className="button is-warning" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
    <Footer />

  </>
}
