import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
const validator = require('validator')
const axios = require('axios').default

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isEmailDirty, setIsEmailDirty] = useState(false)
  const [password, setPassword] = useState('')
  const [isPasswordDirty, setIsPasswordDirty] = useState(false)
  const [repeatPassword, setRepeatPassword] = useState('')
  const [isRepeatPasswordDirty, setIsRepeatPasswordDirty] = useState(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      setIsLoading(true)
      await axios.post('http://localhost:4000/register', {
        email,
        password,
      })
      navigate('/dashboard')
    } catch (e) {
      setIsAlertVisible(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <CAlert
                    color="primary"
                    dismissible
                    visible={isAlertVisible}
                    onClose={() => setIsAlertVisible(false)}
                  >
                    Oops! There was an error processing your request.
                  </CAlert>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setIsEmailDirty(true)
                      }}
                      required
                      invalid={isEmailDirty && !validator.isEmail(email)}
                    />
                    <CFormFeedback invalid>Please provide a valid email.</CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setIsPasswordDirty(true)
                      }}
                      required
                      invalid={isPasswordDirty && !validator.isStrongPassword(password)}
                    />
                    <CFormFeedback invalid>
                      Password should have a minumum of 8 characters, 1 lowercase character, 1
                      uppercase character, 1 number, and 1 symbol.
                    </CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={repeatPassword}
                      onChange={(e) => {
                        setRepeatPassword(e.target.value)
                        setIsRepeatPasswordDirty(true)
                      }}
                      required
                      invalid={isRepeatPasswordDirty && password !== repeatPassword}
                    />
                    <CFormFeedback invalid>Passwords must match.</CFormFeedback>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton
                      type="submit"
                      color="success"
                      onClick={() => handleClick()}
                      disabled={
                        isLoading ||
                        !validator.isEmail(email) ||
                        !validator.isStrongPassword(password) ||
                        repeatPassword !== password
                      }
                    >
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
