import { useState } from 'react'
import Head from 'next/head'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Layout from '../components/Layout'
import Link from '../components/Link'
import ErrorMessage from '../components/ErrorMessage'
import { useCurrentUser, useSignup } from '../lib/session'

export default function Signup() {
  useCurrentUser({
    redirectToIfFound: '/',
  })

  return <Layout title="Signup">
    <Container maxWidth="sm">
      <SignupForm />
    </Container>
  </Layout>
}

function SignupForm(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const signup = useSignup()

  const onSubmit = event => {
    event.preventDefault()
    signup({ email, password })
  }
  const disabled = !!signup.pending
  return <Paper {...{
    component: 'form',
    onSubmit,
    sx: { m: 2, p: 2 }
  }}>
    <Typography variant="h4">Signup</Typography>
    <ErrorMessage error={signup.error}/>
    <TextField
      autoFocus
      label="Email"
      autoComplete="username"
      disabled={disabled}
      margin="normal"
      required
      fullWidth
      name="email"
      type="email"
      placeholder="alice@example.com"
      value={email}
      onChange={e => { setEmail(e.target.value) }}
    />
    <TextField
      label="Password"
      autoComplete="new-password"
      disabled={disabled}
      margin="normal"
      required
      fullWidth
      name="password"
      type="password"
      value={password}
      onChange={e => { setPassword(e.target.value) }}
    />
    <TextField
      label="Password Confirmation"
      autoComplete="new-password"
      disabled={disabled}
      margin="normal"
      required
      fullWidth
      name="password"
      type="password"
      value={passwordConfirmation}
      onChange={e => { setPasswordConfirmation(e.target.value) }}
      error={!!(passwordConfirmation && passwordConfirmation !== password)}
    />
    <Stack spacing={2} direction="row-reverse" justifyContent="flex-end">
      <Button type="submit" variant="contained" >Submit</Button>
      <Button variant="text" component={Link} href="/login">login</Button>
      <Button variant="text" component={Link} href="/reset-password" color="secondary">reset password</Button>
    </Stack>
  </Paper>
}
