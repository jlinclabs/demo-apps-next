import Head from 'next/head'
import Image from 'next/image'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { useCurrentUser } from '../lib/session'
import { useView } from '../lib/views'
import { useAction } from '../lib/actions'
import Layout from '../components/Layout'
import Link from '../components/Link'
import InspectObject from '../components/InspectObject'

export default function Home() {
  const { view: myCounters } = useView('counters.mine')
  const createCounter = useAction('counters.create')

  return <Layout>
    <Head>
      <title>Counters</title>
      <meta name="description" content="Counters" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Container maxWidth="md">
      <Paper elevation={3} sx={{m: 2, p: 2}}>
        <Typography variant="h3">
          Counters
        </Typography>
        <Button
          variant="contained"
          onClick={event => { createCounter.call() }}
          disabled={createCounter.pending}
        >➕</Button>
        <InspectObject object={{ createCounter, myCounters }}/>
      </Paper>
    </Container>
  </Layout>
}


function Counter(){
  const incAction = useAction('counters.inc')
  const decAction = useAction('counters.dec')

  return <Box>
    <Button
      variation="contained"
    >👇</Button>
    <Button
      variation="contained"
    >👆</Button>
  </Box>
}
