import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { AbilityContext } from '@src/utility/context/Can'
import { useForm, Controller } from 'react-hook-form'
import InputPasswordToggle from '@components/input-password-toggle'
import { handleLogin } from '@store/authentication'

// import useJwt from '@src/auth/jwt/useJwt'


import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
  Form,
  FormFeedback
} from 'reactstrap'

const LoginBasic = ({ isOpen, toggle, openRegister }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)

  const {
  control,
  handleSubmit,
  formState: { errors },
  setError
} = useForm({
  defaultValues: {
    loginEmail: '',
    password: ''
  }
})


const onSubmit = data => {
  // Dummy users 
  const dummyUsers = [
    { email: 'sunny@gmail.com', password: '123456', fullName: 'Sunny Kumar', role: 'admin' },
    { email: 'test@gmail.com', password: 'password', fullName: 'Test User', role: 'student' }
  ]

  const matchedUser = dummyUsers.find(
    user => user.email === data.loginEmail && user.password === data.password
  )

  if (matchedUser) {
    localStorage.setItem('currentUser', JSON.stringify(matchedUser))

    dispatch(handleLogin({
      ...matchedUser,
      accessToken: 'dummyAccessToken',
      refreshToken: 'dummyRefreshToken'
    }))

    ability.update([{ action: 'manage', subject: 'all' }])

    toggle() 
    navigate('/dashboard/analytics') // Redirect
  } else {
    setError('loginEmail', {
      type: 'manual',
      message: 'Email or Password is Invalid'
    })
  }
}

    return (
    <div>
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Login</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-2">
            <Label for="loginEmail">Email</Label>
            <Controller
              name="loginEmail"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format'
                }
              }}
              render={({ field }) => (
                <Input
                  id="loginEmail"
                  type="email"
                  placeholder="Enter email"
                  invalid={!!errors.loginEmail}
                  {...field}
                />
              )}
            />
            {errors.loginEmail && <FormFeedback>{errors.loginEmail.message}</FormFeedback>}
          </div>

          <div className="mb-2">
            <Label for="loginPassword">Password</Label>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <InputPasswordToggle
                  id="loginPassword"
                  className="input-group-merge"
                  placeholder="Enter password"
                  invalid={!!errors.password}
                  {...field}
                />
              )}
            />
            {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
          </div>

         
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <Input type="checkbox" id="rememberMe" className="form-check-input" />
              <Label className="form-check-label" for="rememberMe">
                Remember me
              </Label>
            </div>
           <a href="#" className="text-primary small" onClick={(e) => {
          e.preventDefault()
          toggleForgotModal()
        }}>
          Forgot password?
        </a>
    
          </div>

          <Button color="primary" block type="submit">
            Log In
          </Button>
        </Form>
      </ModalBody>

      <ModalFooter>
        <span className="me-auto">
          Don’t have an account?{' '}
          <a href="#" onClick={(e) => {
            e.preventDefault()
            toggle()
            openRegister()
          }}>
            Sign Up
          </a>
        </span>
      </ModalFooter>
      
    </Modal>
      {/* <ForgotPassword isOpen={forgotModalOpen} toggle={toggleForgotModal}/> */}
      </div>
  )
}
export default LoginBasic