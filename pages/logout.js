import { useEffect } from 'react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Layout from '../components/Layout'
import ErrorMessage from '../components/ErrorMessage'
import InspectObject from '../components/InspectObject'
import { useCurrentUser, useLogout } from '../lib/session'

export default function Home() {
  useCurrentUser({ redirectToIfNotFound: '/' })
  const logout = useLogout()
  useEffect(() => { logout() }, [])

  return <Layout>
    <Head>
      <title>Logout</title>
      <meta name="description" content="Logout" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Container maxWidth="sm" sx={{p: 2}}>
      <span>Logging out…</span>
      <ErrorMessage error={logout.error}/>
    </Container>
  </Layout>
}
