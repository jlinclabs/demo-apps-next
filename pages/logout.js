import { useEffect } from 'react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import useAction from '../lib/useAction'
import Layout from '../components/Layout'
import ErrorMessage from '../components/ErrorMessage'
import InspectObject from '../components/InspectObject'
import { useCurrentUser } from '../lib/currentUser'

export default function Home() {
  const { currentUser } = useCurrentUser({
    redirectToIfNotFound: '/',
  })

  const logout = useAction('session.logout')
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
      <InspectObject object={{ currentUser }}/>
    </Container>

  </Layout>
}
