import Head from 'next/head'
import Image from 'next/image'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { useCurrentUser } from '../lib/session'
import Layout from '../components/Layout'
import Link from '../components/Link'
import InspectObject from '../components/InspectObject'

export default function Home() {
  const { currentUser } = useCurrentUser()
  return <Layout>
    <Container maxWidth="md">
      <Paper elevation={3} sx={{m: 2, p: 2}}>
        <Typography variant="h3">
          {currentUser
            ? `Welcome back ${currentUser.email}`
            : `Welcome to ${process.env.APP_NAME}`
          }
        </Typography>
      </Paper>
    </Container>
  </Layout>
}


