// import { useForm, ErrorMessage } from 'react-hook-form'
// import registerService from 'services/register'
// import './Register.css'
// import { useState } from 'react'

// export default function Register() {
//   const [registered, setRegistered] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const { handleSubmit, register, errors } = useForm()

//   const formSubmit = (values) => {
//     setIsSubmitting(true)
//     console.log(values)
//     registerService(values).then(() => {
//       setRegistered(true)
//       setIsSubmitting(false)
//     })
//   }
//   if (registered) {
//     // you can even go to another page for a couple of seconds and then go to the actual page...TODO?
//     return <h4>Congratulations ✅! you've been succesfully Registerd</h4>
//   }

//   return (
//     <>
//       <h2>Register</h2>
//       <form className="form" onSubmit={handleSubmit(formSubmit)}>
//         <input
//           className={errors.username ? 'error' : ''}
//           name="username"
//           placeholder="enter username"
//           ref={register({ required: 'this is required' })}
//         />
//         <ErrorMessage errors={errors} name="username" as="span" />
//         <input
//           className={errors.password ? 'error' : ''}
//           name="password"
//           placeholder="enter password"
//           ref={register({ required: 'this is required' })}
//           type="password"
//         />
//         <ErrorMessage errors={errors} name="username" as="span" />
//         <button disabled={isSubmitting} className="btn-register">
//           Register
//         </button>
//       </form>
//     </>
//   )
// }
