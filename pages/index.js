import Head from 'next/head'
import Image from 'next/image'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { withSessionSsr } from 'lib/withSession'
import Layout from 'components/Layout'
import Link from 'components/Link'

export default function Home() {
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

        <Stack spacing={2} direction="column">
          <Link href="/signup">Signup</Link>
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>

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


