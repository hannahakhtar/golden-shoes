import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import Header from '../components/Header'

export default function ContactUs() {

  const [messageRecieved, setMessageRecieved] = useState(false)
  const { handleSubmit, formState: { errors }, register } = useForm()

  async function onSubmit(submssion) {

    const formdata = {
      'email': submssion.email,
      'reason': submssion.reason,
      'first_name': submssion.first_name,
      'last_name': submssion.last_name,
      'phone_number': submssion.phone_number
    }
    try {
      const { data } = await axios.post('/api/contact-us', formdata,)
      if (data.error) {
        console.log(data.error)
      } else {
        setMessageRecieved(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <Navbar />
    <Header header="Contact Us" />
    <div className="mainBody">
      <div className="preFormText">
        <p>Our Customer Care team are available between 9am and 5pm on Monday - Friday (excluding Bank Holidays).</p>
        <p>During these hours, please call us on: <b>01234 567 890</b>.</p>
        <p>Alternatively, lease fill in all of the fields below and one of our customer care team will be in touch within two working days.</p>
      </div>
      <p>*: required field</p>
      {messageRecieved &&
        <div>
          Thanks for your message - one of the team will be in touch soon!
        </div>
      }
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">* First Name:</label>
          <input
            {...register('first_name', { required: true })}
            name='first_name'
            placeholder='First Name'
            type='text'
            defaultValue=''
            className={`input ${errors.first_name && 'is-danger'}`}
          />
          {errors.first_name?.type === 'required' && 'First name is required'}
          <label className="label">* Last Name:</label>
          <input
            {...register('last_name', { required: true })}
            name='last_name'
            placeholder='Last Name'
            type='text'
            defaultValue=''
            className={`input ${errors.last_name && 'is-danger'}`}
          />
          {errors.last_name?.type === 'required' && 'Last name is required'}
          <label className="label">* Email Address:</label>
          <input
            {...register('email', { required: true })}
            name='email'
            placeholder='Email Address'
            type='text'
            defaultValue=''
            className={`input ${errors.email && 'is-danger'}`}
          />
          {errors.email?.type === 'required' && 'An email address is required'}
          <label className="label">* Phone Number:</label>
          <input
            {...register('phone_number', { required: true })}
            name='phone_number'
            placeholder='Phone Number'
            type='text'
            defaultValue=''
            className={`input ${errors.phone_number && 'is-danger'}`}
          />
          {errors.phone_number?.type === 'required' && 'A phone number is required'}
          <label className="label">* How can we help you?:</label>
          <input
            {...register('reason', { required: true })}
            name='reason'
            placeholder='Tell us how we can help?'
            type='text'
            defaultValue=''
            className={`input ${errors.reason && 'is-danger'}`}
          />
          {errors.reason?.type === 'required' && 'Please provide as much information as possible so our team can help you.'}
          <div className="submitButton">
            <input className="button is-warning" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </>
}