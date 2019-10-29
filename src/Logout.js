// @flow
import React, { useEffect } from 'react'
import Button from './Button'

import AppScreen from './AppScreen'

const Logout = ({ logout }: { logout: Function }) => {
  useEffect(() => {
    logout()
  })

  return (
    <AppScreen>
      <p>You have logged out.</p>
      <Button to="/">Return home</Button>
    </AppScreen>
  )
}
export default Logout
