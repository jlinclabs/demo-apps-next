import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'


import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import FormHelperText from '@mui/material/FormHelperText'

import useAction from '../lib/useAction'
import Layout from '../components/Layout'
import Link from '../components/Link'
import ErrorMessage from '../components/ErrorMessage'
import InspectObject from '../components/InspectObject'
import useView from '../lib/useView'
import { useCurrentUser } from '../lib/currentUser'

export default function Home() {
  const { currentUser } = useCurrentUser({
    // redirectIfNotFound: '/',
    redirectToIfFound: '/',
  })

  return <Layout>
    <Head>
      <title>Signup</title>
      <meta name="description" content="Signup" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Container maxWidth="sm" sx={{p: 2}}>
      <SignupForm />
      <InspectObject object={{ currentUser }}/>
    </Container>

  </Layout>
}

function SignupForm(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const signup = useAction('session.signup', {
    onSuccess(){

    },
    onFailure(){

    },
  })

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

    <InspectObject object={{...signup}}/>
  </Paper>
}
