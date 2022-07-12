import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import useAction from '../lib/useAction'
import Layout from '../components/Layout'
import Link from '../components/Link'
import ErrorMessage from '../components/ErrorMessage'
import InspectObject from '../components/InspectObject'
import useView from '../lib/useView'
import { useCurrentUser } from '../lib/currentUser'

export default function Login() {
  const { currentUser, mutate: reloadCurrentUser } = useCurrentUser({
    redirectToIfFound: '/',
  })

  return <Layout>
    <Head>
      <title>Signup</title>
      <meta name="description" content="Signup" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Container maxWidth="sm" sx={{p: 2}}>
      <LoginForm {...{ reloadCurrentUser }} />
      <InspectObject object={{ currentUser }}/>
    </Container>

  </Layout>
}

function LoginForm({ reloadCurrentUser }){
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = useAction('session.login', {
    onSuccess(){
      reloadCurrentUser
      debugger
      // router.push('/')
    },
    onFailure(){

    },
  })

  const onSubmit = event => {
    event.preventDefault()
    login({ email, password })
  }
  const disabled = !!login.pending
  return <Paper {...{
    component: 'form',
    onSubmit,
    sx: { m: 2, p: 2 }
  }}>
    <Typography variant="h4">Login</Typography>
    <ErrorMessage error={login.error}/>
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
    <Stack spacing={2} direction="row-reverse" justifyContent="flex-end">
      <Button type="submit" variant="contained" >Submit</Button>
      <Button variant="text" component={Link} href="/signup">signup</Button>
      <Button variant="text" component={Link} href="/reset-password" color="secondary">reset password</Button>
    </Stack>

    <InspectObject object={{...login}}/>
  </Paper>
}
