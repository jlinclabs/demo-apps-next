import Head from 'next/head'
import Image from 'next/image'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { useCurrentUser } from '../lib/currentUser'
import useView from '../lib/useView'
import Layout from '../components/Layout'
import Link from '../components/Link'
import InspectObject from '../components/InspectObject'

export default function Home() {
  const { currentUser } = useCurrentUser()
  return <Layout>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Container maxWidth="md">
      <Paper elevation={3} sx={{m: 2, p: 2}}>
        <Typography variant="h3">
          Welcome to {process.env.APP_NAME}
        </Typography>

        {currentUser
          ? <Typography variant="h4">
            Welcome back {currentUser.email}
          </Typography>
          : <Stack spacing={2} direction="column">
            <Button
              variant="contained"
              component={Link}
              href="/signup"
            >Signup</Button>
            <Button
              variant="outlined"
              component={Link}
              href="/login"
            >Login</Button>
          </Stack>
        }

        <InspectObject object={{ currentUser }}/>


        <footer>
          <a
            href="https://www.jlinc.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {`Powered by JLINC Labs`}
          </a>
        </footer>
      </Paper>
    </Container>
  </Layout>
}


