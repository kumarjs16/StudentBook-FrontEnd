import { useForm, Controller } from 'react-hook-form'
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

import InputPasswordToggle from '@components/input-password-toggle'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

const LoginBasic = ({ isOpen, toggle, openRegister }) => {
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

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || []

    const matchedUser = users.find(
      (user) => user.email === data.loginEmail && user.password === data.password
    )

    if (matchedUser) {
      alert("Login successful!")
      localStorage.setItem("currentUser", JSON.stringify(matchedUser)) 
      toggle()
    } else {
      const isEmailRegistered = users.some((user) => user.email === data.loginEmail)

      if (!isEmailRegistered) {
        setError("loginEmail", {
          type: "manual",
          message: "Please register to login."
        })
      } else {
        setError("password", {
          type: "manual",
          message: "Incorrect password."
        })
      }
    }
  }

  return (
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

          {/* Password */}
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
            <a href="#" className="text-primary small" onClick={(e) => e.preventDefault()}>
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
  )
}

export default LoginBasic
