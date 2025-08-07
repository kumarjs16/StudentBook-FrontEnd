// ** React Imports
import { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogin } from '@store/authentication'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

import {
  Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Button, FormFeedback
} from 'reactstrap'
// import { useForm } from 'react-hook-form'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
// import { Row, Col, CardTitle, CardText, Label, Button, Form, Input, FormFeedback } from 'reactstrap'

// ** Illustrations Imports
// import illustrationsLight from '@src/assets/images/pages/register-v2.svg'
// import illustrationsDark from '@src/assets/images/pages/register-v2-dark.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const defaultValues = {
  username: "",
  email: "",
  phone: "",
  class: "",
  password: "",
  confirmPassword: "",
  accepted: false
}

const Register = ({ isOpen, toggle, openLogin }) => {
  // ** Hooks
  // const ability = useContext(AbilityContext)
  // const { skin } = useSkin()
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const {
  //   control,
  //   setError,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm({ defaultValues })

  // const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  // const onSubmit = data => {
  //   const tempData = { ...data }
  //   delete tempData.terms
  //   if (Object.values(tempData).every(field => field.length > 0) && data.terms === true) {
  //     const { username, email, password } = data
  //     useJwt
  //       .register({ username, email, password })
  //       .then(res => {
  //         if (res.data.error) {
  //           for (const property in res.data.error) {
  //             if (res.data.error[property] !== null) {
  //               setError(property, {
  //                 type: 'manual',
  //                 message: res.data.error[property]
  //               })
  //             }
  //           }
  //         } else {
  //           const data = { ...res.data.user, accessToken: res.data.accessToken }
  //           ability.update(res.data.user.ability)
  //           dispatch(handleLogin(data))
  //           navigate('/')
  //         }
  //       })
  //       .catch(err => console.log(err))
  //   } else {
  //     for (const key in data) {
  //       if (data[key].length === 0) {
  //         setError(key, {
  //           type: 'manual',
  //           message: `Please enter a valid ${key}`
  //         })
  //       }
  //       if (key === 'terms' && data.terms === false) {
  //         setError('terms', {
  //           type: 'manual'
  //         })
  //       }
  //     }
  //   }
  // }
  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful },
    control,
    setError,
    clearErrors,
    reset
  } = useForm({ defaultValues });

  // const onSubmit = (data) => {
  //   console.log('Form Data:', data)
  //   toggle()
  // }

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
    } else {
      clearErrors("confirmPassword");
    }
  }, [confirmPassword, password, setError, clearErrors]);

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === data.email);
    if (exists) {
      setError("email", { type: "manual", message: "Email already registered" });
      return;
    }

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    reset();
  };

  return (
    <div className='auth-wrapper auth-cover'>
      {/* <Row className='auth-inner m-0'> */}
      {/* <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <svg viewBox='0 0 139 95' version='1.1' height='28'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className='brand-text text-primary ms-1'>Student Book</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col> */}
      {/* <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Adventure starts here 🚀
            </CardTitle>
            <CardText className='mb-2'>Make your app management easy and fun!</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='register-username'>
                  Username
                </Label>
                <Controller
                  id='username'
                  name='username'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus placeholder='johndoe' invalid={errors.username && true} {...field} />
                  )}
                />
                {errors.username ? <FormFeedback>{errors.username.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Controller
                  id='email'
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input type='email' placeholder='john@example.com' invalid={errors.email && true} {...field} />
                  )}
                />
                {errors.email ? <FormFeedback>{errors.email.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Controller
                  name='terms'
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id='terms' type='checkbox' checked={field.value} invalid={errors.terms && true} />
                  )}
                />
                <Label className='form-check-label' for='terms'>
                  I agree to
                  <a className='ms-25' href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </a>
                </Label>
              </div>
              <Button type='submit' block color='primary'>
                Sign up
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col> */}
      {/* </Row> */}

      {/* new code starts here  */}

      <Modal isOpen={isOpen} toggle={toggle} centered scrollable className="w-100" style={{ maxWidth: '900px', width: '95%', maxHeight: '90vh' }}>
        <ModalHeader toggle={toggle} className='border-0 pb-0' />
        <ModalBody style={{ padding: 0 }}>
          <Row className="g-0 h-100">
            <Col md="6" className="d-none d-md-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#f8f8f8' }}>
              <div className="text-center">
                <h4 className="mt-2">Welcome to Student Book!</h4>
                <p className="text-muted">Start your journey with us</p>
              </div>
            </Col>

            <Col md="6" className="p-4" style={{
              maxHeight: '80vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
              transform: 'translateZ(0)'
            }}>
              <h4 className="mb-1">Create an Account</h4>
              <p className="text-muted mb-3">Let’s get you set up</p>

              <Form onSubmit={handleSubmit(onSubmit)}>
                {isSubmitSuccessful && <Alert color="success">Signup successful. Please log in.</Alert>}

                {/* Username */}
                <FormGroup>
                  <Label>Username</Label>
                  <Controller
                    name="username"
                    control={control}
                    rules={{ required: "Username is required" }}
                    render={({ field }) => (
                      <Input {...field} invalid={!!errors.username} />
                    )}
                  />
                  <FormFeedback>{errors.username?.message}</FormFeedback>
                </FormGroup>

                {/* Email */}
                <FormGroup>
                  <Label>Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email",
                      },
                    }}
                    render={({ field }) => (
                      <Input type="email" {...field} invalid={!!errors.email} />
                    )}
                  />
                  <FormFeedback>{errors.email?.message}</FormFeedback>
                </FormGroup>

                {/* Phone Number */}
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
                    render={({ field }) => (
                      <Input type="select" {...field}>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                      </Input>
                    )}
                  />
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
                        message:
                          "Password must be at least 6 characters, include upper, lower, digit & special char",
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

                {/* Terms Checkbox */}
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
                  <Label check className="ms-2">
                    I accept the Terms and Privacy Policy
                  </Label>
                  {errors.accepted && (
                    <div className="text-danger">{errors.accepted.message}</div>
                  )}
                </FormGroup>


                <Button color="primary" type="submit" block className="mt-1">
                  Register
                </Button>
              </Form>

              <p className="text-center mt-2">
                <span className="me-auto">
                  Don’t have an account?{' '}
                  <a href="#" onClick={(e) => {
                    e.preventDefault()
                    toggle()
                    openLogin()
                  }}>
                    LogIN Instead
                  </a>
                </span>
                {/* <Link to="/login"><span>Sign in instead</span></Link> */}
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
