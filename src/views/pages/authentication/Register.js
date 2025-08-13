// // ** React Imports
// import { useEffect, useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// // ** Custom Hooks
// import { useSkin } from '@hooks/useSkin'
// import useJwt from '@src/auth/jwt/useJwt'

// // ** Store & Actions
// import { useDispatch } from 'react-redux'
// import { handleLogin } from '@store/authentication'

// // ** Third Party Components
// import { useForm, Controller } from 'react-hook-form'
// import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

// import {
//   Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,
//   Form, FormGroup, Label, Input, Button, FormFeedback
// } from 'reactstrap'
// // import { useForm } from 'react-hook-form'

// // ** Context
// import { AbilityContext } from '@src/utility/context/Can'

// // ** Custom Components
// import InputPasswordToggle from '@components/input-password-toggle'

// // ** Reactstrap Imports
// // import { Row, Col, CardTitle, CardText, Label, Button, Form, Input, FormFeedback } from 'reactstrap'

// // ** Illustrations Imports
// // import illustrationsLight from '@src/assets/images/pages/register-v2.svg'
// // import illustrationsDark from '@src/assets/images/pages/register-v2-dark.svg'

// // ** Styles
// import '@styles/react/pages/page-authentication.scss'

// const defaultValues = {
//   username: "",
//   email: "",
//   phone: "",
//   class: "",
//   password: "",
//   confirmPassword: "",
//   accepted: false
// }

// const Register = ({ isOpen, toggle, openLogin }) => {
//   // ** Hooks
//   // const ability = useContext(AbilityContext)
//   // const { skin } = useSkin()
//   // const navigate = useNavigate()
//   // const dispatch = useDispatch()
//   // const {
//   //   control,
//   //   setError,
//   //   handleSubmit,
//   //   formState: { errors }
//   // } = useForm({ defaultValues })

//   // const source = skin === 'dark' ? illustrationsDark : illustrationsLight

//   // const onSubmit = data => {
//   //   const tempData = { ...data }
//   //   delete tempData.terms
//   //   if (Object.values(tempData).every(field => field.length > 0) && data.terms === true) {
//   //     const { username, email, password } = data
//   //     useJwt
//   //       .register({ username, email, password })
//   //       .then(res => {
//   //         if (res.data.error) {
//   //           for (const property in res.data.error) {
//   //             if (res.data.error[property] !== null) {
//   //               setError(property, {
//   //                 type: 'manual',
//   //                 message: res.data.error[property]
//   //               })
//   //             }
//   //           }
//   //         } else {
//   //           const data = { ...res.data.user, accessToken: res.data.accessToken }
//   //           ability.update(res.data.user.ability)
//   //           dispatch(handleLogin(data))
//   //           navigate('/')
//   //         }
//   //       })
//   //       .catch(err => console.log(err))
//   //   } else {
//   //     for (const key in data) {
//   //       if (data[key].length === 0) {
//   //         setError(key, {
//   //           type: 'manual',
//   //           message: `Please enter a valid ${key}`
//   //         })
//   //       }
//   //       if (key === 'terms' && data.terms === false) {
//   //         setError('terms', {
//   //           type: 'manual'
//   //         })
//   //       }
//   //     }
//   //   }
//   // }
//   const {
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitSuccessful },
//     control,
//     setError,
//     clearErrors,
//     reset
//   } = useForm({ defaultValues });

//   // const onSubmit = (data) => {
//   //   console.log('Form Data:', data)
//   //   toggle()
//   // }

//   const password = watch("password");
//   const confirmPassword = watch("confirmPassword");

//   useEffect(() => {
//     if (confirmPassword && confirmPassword !== password) {
//       setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
//     } else {
//       clearErrors("confirmPassword");
//     }
//   }, [confirmPassword, password, setError, clearErrors]);

//   const onSubmit = (data) => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const exists = users.find((u) => u.email === data.email);
//     if (exists) {
//       setError("email", { type: "manual", message: "Email already registered" });
//       return;
//     }

//     users.push(data);
//     localStorage.setItem("users", JSON.stringify(users));
//     alert("Registration successful!");
//     reset();
//   };

//   return (
//     <div className='auth-wrapper auth-cover'>

//       {/* new code starts here  */}

//       <Modal isOpen={isOpen} toggle={toggle} centered scrollable className="w-100" style={{ maxWidth: '900px', width: '95%', maxHeight: '90vh' }}>
//         <ModalHeader toggle={toggle} className='border-0 pb-0' />
//         <ModalBody style={{ padding: 0 }}>
//           <Row className="g-0 h-100">
//             <Col md="6" className="d-none d-md-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#f8f8f8' }}>
//               <div className="text-center">
//                 <h4 className="mt-2">Welcome to Student Book!</h4>
//                 <p className="text-muted">Start your journey with us</p>
//               </div>
//             </Col>

//             <Col md="6" className="p-4" style={{
//               maxHeight: '80vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
//               transform: 'translateZ(0)'
//             }}>
//               <h4 className="mb-1">Create an Account</h4>
//               <p className="text-muted mb-3">Let’s get you set up</p>

//               <Form onSubmit={handleSubmit(onSubmit)}>
//                 {isSubmitSuccessful && <Alert color="success">Signup successful. Please log in.</Alert>}

//                 {/* Username */}
//                 <FormGroup>
//                   <Label>Username</Label>
//                   <Controller
//                     name="username"
//                     control={control}
//                     rules={{ required: "Username is required" }}
//                     render={({ field }) => (
//                       <Input {...field} invalid={!!errors.username} />
//                     )}
//                   />
//                   <FormFeedback>{errors.username?.message}</FormFeedback>
//                 </FormGroup>

//                 {/* Email */}
//                 <FormGroup>
//                   <Label>Email</Label>
//                   <Controller
//                     name="email"
//                     control={control}
//                     rules={{
//                       required: "Email is required",
//                       pattern: {
//                         value: /\S+@\S+\.\S+/,
//                         message: "Invalid email",
//                       },
//                     }}
//                     render={({ field }) => (
//                       <Input type="email" {...field} invalid={!!errors.email} />
//                     )}
//                   />
//                   <FormFeedback>{errors.email?.message}</FormFeedback>
//                 </FormGroup>

//                 {/* Phone Number */}
//                 <FormGroup>
//                   <Label>Phone Number</Label>
//                   <Controller
//                     name="phone"
//                     control={control}
//                     rules={{
//                       required: "Phone number is required",
//                       pattern: {
//                         value: /^[0|6-9]\d{9}$/,
//                         message: "Enter valid 10-digit phone number starting with 0 or 6-9"
//                       },
//                       validate: (val) =>
//                         /^(\d)\1{9}$/.test(val)
//                           ? "All digits cannot be the same"
//                           : true
//                     }}
//                     render={({ field }) => (
//                       <Input type="tel" {...field} invalid={!!errors.phone} />
//                     )}
//                   />
//                   <FormFeedback>{errors.phone?.message}</FormFeedback>
//                 </FormGroup>


//                 {/* Class */}
//                 <FormGroup>
//                   <Label>Class</Label>
//                   <Controller
//                     name="classLevel"
//                     control={control}
//                     render={({ field }) => (
//                       <Input type="select" {...field}>
//                         <option value="6">Class 6</option>
//                         <option value="7">Class 7</option>
//                         <option value="8">Class 8</option>
//                         <option value="9">Class 9</option>
//                         <option value="10">Class 10</option>
//                       </Input>
//                     )}
//                   />
//                 </FormGroup>

//                 {/* Password */}
//                 <FormGroup>
//                   <Label>Password</Label>
//                   <Controller
//                     name="password"
//                     control={control}
//                     rules={{
//                       required: "Password is required",
//                       pattern: {
//                         value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
//                         message:
//                           "Password must be at least 6 characters, include upper, lower, digit & special char",
//                       },
//                     }}
//                     render={({ field }) => (
//                       <Input type="password" {...field} invalid={!!errors.password} />
//                     )}
//                   />
//                   <FormFeedback>{errors.password?.message}</FormFeedback>
//                 </FormGroup>

//                 {/* Confirm Password */}
//                 <FormGroup>
//                   <Label>Confirm Password</Label>
//                   <Controller
//                     name="confirmPassword"
//                     control={control}
//                     rules={{
//                       required: "Confirm your password",
//                       validate: (val) =>
//                         val === password || "Passwords do not match",
//                     }}
//                     render={({ field }) => (
//                       <Input type="password" {...field} invalid={!!errors.confirmPassword} />
//                     )}
//                   />
//                   <FormFeedback>{errors.confirmPassword?.message}</FormFeedback>
//                 </FormGroup>

//                 {/* Terms Checkbox */}
//                 <FormGroup check className="mb-3">
//                   <Controller
//                     name="accepted"
//                     control={control}
//                     rules={{
//                       validate: (val) => val || "Accept terms to proceed",
//                     }}
//                     render={({ field }) => (
//                       <Input
//                         type="checkbox"
//                         {...field}
//                         checked={field.value}
//                         invalid={!!errors.accepted}
//                       />
//                     )}
//                   />
//                   <Label check className="ms-2">
//                     I accept the Terms and Privacy Policy
//                   </Label>
//                   {errors.accepted && (
//                     <div className="text-danger">{errors.accepted.message}</div>
//                   )}
//                 </FormGroup>


//                 <Button color="primary" type="submit" block className="mt-1">
//                   Register
//                 </Button>
//               </Form>

//               <p className="text-center mt-2">
//                 <span className="me-auto">
//                   Don’t have an account?{' '}
//                   <a href="#" onClick={(e) => {
//                     e.preventDefault()
//                     toggle()
//                     openLogin()
//                   }}>
//                     LogIN Instead
//                   </a>
//                 </span>
//                 {/* <Link to="/login"><span>Sign in instead</span></Link> */}
//               </p>

//               <div className="divider my-2">
//                 <div className="divider-text">or</div>
//               </div>

//               <div className="auth-footer-btn d-flex justify-content-center gap-1">
//                 <Button color="facebook"><Facebook size={14} /></Button>
//                 <Button color="twitter"><Twitter size={14} /></Button>
//                 <Button color="google"><Mail size={14} /></Button>
//                 <Button color="github"><GitHub size={14} /></Button>
//               </div>
//             </Col>
//           </Row>
//         </ModalBody>
//       </Modal>
//     </div>
//   )
// }

// export default Register

// ** React Imports
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

// ** Third Party Components
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import {
  Row, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, FormFeedback, Alert
} from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  zipCode: "",
  classLevel: "",
  password: "",
  confirmPassword: "",
  accepted: false
}

const Register = ({ isOpen, toggle, openLogin }) => {
  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState([]);
  const [classLoading, setClassLoading] = useState(true);
  const [classError, setClassError] = useState(null);

  const [otpMode, setOtpMode] = useState(false)
const [otp, setOtp] = useState("")
const [registeredEmail, setRegisteredEmail] = useState("")

  
  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
    control,
    setError,
    clearErrors,
    reset
  } = useForm({ defaultValues })

  const password = watch("password")
  const confirmPassword = watch("confirmPassword")

  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setError("confirmPassword", { type: "manual", message: "Passwords do not match" })
    } else {
      clearErrors("confirmPassword")
    }
  }, [confirmPassword, password, setError, clearErrors])

  // Fetch class data
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("http://192.168.0.13:8001/api/class/");
        setClasses(res.data); // [{ id, name, amount }]
      } catch (err) {
        console.error("Error fetching classes:", err);
        setClassError("Failed to load classes");
      } finally {
        setClassLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        address: data.address,
        zip_code: data.zipCode,
        user_type: "student",
        student_class: data.classLevel,
        is_active: false,
        password: data.password
      }
      console.log('Sending payload:', payload)
      const res = await axios.post("http://192.168.0.13:8001/api/student/register/", payload, {
        headers: { "Content-Type": "application/json" }
      })
      console.log('Response:', res)

   if (res.status === 201 || res.status === 200) {
  setRegisteredEmail(data.email)      // store email for OTP
  setOtpMode(true)                    // switch to OTP step
  alert("OTP sent to your email. Please check and enter it.")
}

    } catch (err) {
      if (err.response && err.response.data) {
        const { message, message_type } = err.response.data;

        // Backend says "Email already exists"
        if (message_type === "error" && message.toLowerCase().includes("email")) {
          setError("email", {
            type: "manual",
            message
          });
          return;
        }

        // If it's some other type of error, show it as a general form error
        setError("formError", {
          type: "manual",
          message
        });
      } else {
        // Fallback: network or unexpected error
        setError("formError", {
          type: "manual",
          message: "Something went wrong. Please try again."
        });
      }
    }


    finally {
      setLoading(false);
    }
  }

  const handleOtpSubmit = async (e) => {
  e.preventDefault()
  if (!otp) {
    alert("Please enter OTP")
    return
  }
  setLoading(true)
  try {
    const res = await axios.post("http://192.168.0.13:8001/api/student/activation/", {
      email: registeredEmail,
      otp: otp
    })
    if (res.status === 200) {
      alert("Account activated successfully! Please login.")
      reset()
      setOtp("")
      setOtpMode(false)
      toggle()
      openLogin()
    }
  } catch (err) {
    alert(err.response?.data?.message || "Invalid OTP. Please try again.")
  } finally {
    setLoading(false)
  }
}

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} centered scrollable className="w-100" style={{ maxWidth: '900px', width: '95%', maxHeight: '90vh' }}>
        <ModalHeader toggle={toggle} className='border-0 pb-0' />
        <ModalBody style={{ padding: 0 }}>
          <Row className="g-0 h-100">
            {/* Left Section */}
            <Col md="6" className="d-none d-md-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#f8f8f8' }}>
              <div className="text-center">
                <h4 className="mt-2">Welcome to Student Book!</h4>
                <p className="text-muted">Start your journey with us</p>
              </div>
            </Col>

            {/* Right Section */}
            <Col md="6" className="p-4" style={{
              maxHeight: '80vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
              transform: 'translateZ(0)'
            }}>
              <h4 className="mb-1">Create an Account</h4>
              <p className="text-muted mb-3">Let’s get you set up</p>
              
<Form onSubmit={otpMode ? handleOtpSubmit : handleSubmit(onSubmit)}>
  {!otpMode ? (
    <>
      {isSubmitSuccessful && <Alert color="success">Signup successful. Please log in.</Alert>}

      {/* First Name */}
      <FormGroup>
        <Label>First Name</Label>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "First name is required" }}
          render={({ field }) => (
            <Input {...field} invalid={!!errors.firstName} />
          )}
        />
        <FormFeedback>{errors.firstName?.message}</FormFeedback>
      </FormGroup>

      {/* Last Name */}
      <FormGroup>
        <Label>Last Name</Label>
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Last name is required" }}
          render={({ field }) => (
            <Input {...field} invalid={!!errors.lastName} />
          )}
        />
        <FormFeedback>{errors.lastName?.message}</FormFeedback>
      </FormGroup>

      {/* Email */}
      <FormGroup>
        <Label>Email</Label>
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <Input
              {...field}
              invalid={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <FormFeedback>{errors.email.message}</FormFeedback>
        )}
      </FormGroup>

      {/* Phone */}
      <FormGroup>
        <Label>Phone Number</Label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0|6-9]\d{9}$/,
              message: "Enter valid 10-digit phone number starting with 0 or 6-9"
            },
            validate: (val) =>
              /^(\d)\1{9}$/.test(val)
                ? "All digits cannot be the same"
                : true
          }}
          render={({ field }) => (
            <Input type="tel" {...field} invalid={!!errors.phone} />
          )}
        />
        <FormFeedback>{errors.phone?.message}</FormFeedback>
      </FormGroup>

      {/* Class */}
      <FormGroup>
        <Label>Class</Label>
        <Controller
          name="classLevel"
          control={control}
          rules={{ required: "Please select your class" }}
          render={({ field }) => (
            <Input type="select" {...field} invalid={!!errors.classLevel}>
              <option value="">Select Class</option>
              {classLoading && <option disabled>Loading classes...</option>}
              {classError && <option disabled>{classError}</option>}
              {!classLoading && !classError &&
                classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))
              }
            </Input>
          )}
        />
        <FormFeedback>{errors.classLevel?.message}</FormFeedback>
      </FormGroup>

      {/* Password */}
      <FormGroup>
        <Label>Password</Label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
              message: "Password must be at least 6 characters, include upper, lower, digit & special char",
            },
          }}
          render={({ field }) => (
            <Input type="password" {...field} invalid={!!errors.password} />
          )}
        />
        <FormFeedback>{errors.password?.message}</FormFeedback>
      </FormGroup>

      {/* Confirm Password */}
      <FormGroup>
        <Label>Confirm Password</Label>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirm your password",
            validate: (val) =>
              val === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <Input type="password" {...field} invalid={!!errors.confirmPassword} />
          )}
        />
        <FormFeedback>{errors.confirmPassword?.message}</FormFeedback>
      </FormGroup>

      {/* Terms */}
      <FormGroup check className="mb-3">
        <Controller
          name="accepted"
          control={control}
          rules={{
            validate: (val) => val || "Accept terms to proceed",
          }}
          render={({ field }) => (
            <Input
              type="checkbox"
              {...field}
              checked={field.value}
              invalid={!!errors.accepted}
            />
          )}
        />
        <Label check className="ms-2">I accept the Terms and Privacy Policy</Label>
        {errors.accepted && (
          <div className="text-danger">{errors.accepted.message}</div>
        )}
      </FormGroup>

      <Button color="primary" type="submit" block className="mt-1" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
    </>
  ) : (
    <>
      <h4 className="mb-1">Verify Your Account</h4>
      <p className="text-muted mb-3">Enter the OTP sent to {registeredEmail}</p>
      <FormGroup>
        <Label>OTP</Label>
        <Input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
      </FormGroup>
      <Button color="primary" type="submit" block disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
    </>
  )}
</Form>


              <p className="text-center mt-2">
                <span>
                  Already have an account?{' '}
                  <a href="#" onClick={(e) => {
                    e.preventDefault()
                    toggle()
                    openLogin()
                  }}>
                    Login Instead
                  </a>
                </span>
              </p>

              <div className="divider my-2">
                <div className="divider-text">or</div>
              </div>

              <div className="auth-footer-btn d-flex justify-content-center gap-1">
                <Button color="facebook"><Facebook size={14} /></Button>
                <Button color="twitter"><Twitter size={14} /></Button>
                <Button color="google"><Mail size={14} /></Button>
                <Button color="github"><GitHub size={14} /></Button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Register

