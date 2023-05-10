import { Field, Formik, Form, ErrorMessage } from 'formik'
import register from 'services/register'
import './Register.css'
import { useState } from 'react'

const initialValues = {
  username: '',
  password: '',
}

const validateFields = (values) => {
  const errors = {}
  if (!values.username) errors.username = 'Required username'

  if (!values.password) errors.password = 'Required password'
  else if (values.password.length < 3)
    errors.password = 'Lenght must be greater than 3 characters'

  return errors
}

// const hanldeSubmit = (values, { setFieldErrors }) => {
//   return register(values).catch(() =>
//     setFieldErrors('username', 'This username is not valid')
//   )
// }

export default function Register() {
  const [registered, setRegistered] = useState(false)

  if (registered) {
    // you can even go to another page for a couple of seconds and then go to the actual page...TODO?
    return <h4>Congratulations ✅! you've been succesfully Registerd</h4>
  }

  return (
    <>
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validate={validateFields}
        onSubmit={(values, { setFieldErrors }) => {
          return register(values)
            .then(() => {
              setRegistered(true)
            })
            .catch(() =>
              setFieldErrors('username', 'This username is not valid')
            )
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="form">
            <Field
              className={errors.username ? 'error' : ''}
              name="username"
              placeholder="enter username"
            />
            <ErrorMessage
              className="form-error"
              name="username"
              component="small"
            />
            <Field
              className={errors.password ? 'error' : ''}
              name="password"
              placeholder="enter password"
            />
            <ErrorMessage
              className="form-error"
              name="password"
              component="small"
            />
            <button disabled={isSubmitting} className="btn-register">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </>
  )

  // example with a lot of boilerplate and not using al the Formik features

  //   <>
  //   <h2>Register</h2>
  //   <Formik
  //     initialValues={{ username: '', password: '' }}
  //     validate={(values) => {
  //       const errors = {}
  //       if (!values.username) errors.username = 'Required username'

  //       if (!values.password) errors.password = 'Required password'
  //       else if (values.password.length < 3)
  //         errors.password = 'Lenght must be greater than 3 characters'

  //       return errors
  //     }}
  //     onSubmit={(values, { setFieldErrors }) => {
  //       return register(values).catch(() =>
  //         setFieldErrors('username', 'This username is not valid')
  //       )
  //     }}
  //   >
  //     {({ handleSubmit, handleChange, isSubmitting, errors }) => (
  //       <form className="form" onSubmit={handleSubmit}>
  //         <input
  //           className={errors.username ? 'error' : ''}
  //           name="username"
  //           placeholder="enter username"
  //           onChange={handleChange}
  //         ></input>
  //         {errors.username && (
  //           <small className="form-error">
  //             {/* {errors.username ? {errors.username} : ''} */}
  //             {errors.username}
  //           </small>
  //         )}
  //         <input
  //           className={errors.password ? 'error' : ''}
  //           name="password"
  //           placeholder="enter password"
  //           onChange={handleChange}
  //         ></input>
  //         {errors.password && (
  //           <small className="form-error">
  //             {/* {errors.password ? {errors.password}: ''} */}
  //             {errors.username}
  //           </small>
  //         )}
  //         <button disabled={isSubmitting} className="btn-register">
  //           Register
  //         </button>
  //       </form>
  //     )}
  //   </Formik>
  // </>
}
