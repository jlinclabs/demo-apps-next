import Head from 'next/head'
import Image from 'next/image'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import InspectObject from '../../components/InspectObject'

import useResource from '../../lib/useResource'

export default function Chat(props) {
  console.log('Chat render', { props })
  const chatChannels = useResource('chat/channels')

  return (
    <div>
      <Head>
        <title>Chat Demo</title>
        <meta name="description" content="chat demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container component="main" maxWidth="lg">
        <Typography variant="h3">
          CHAT DEMO
        </Typography>
        <InspectObject object={chatChannels}/>
      </Container>
    </div>
  )
}
