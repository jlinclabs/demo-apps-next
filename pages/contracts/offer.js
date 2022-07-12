import { useState } from 'react'
import Head from 'next/head'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import Layout from '../../components/Layout'
import Link from '../../components/Link'
import ErrorMessage from '../../components/ErrorMessage'
import InspectObject from '../../components/InspectObject'

export default function OfferContractPage() {
  return <Layout title="Offer A Contract" requireLoggedIn>
    <Container maxwidth="lg">
      <Typography variant="h3">Offer A Contract</Typography>

    </Container>
  </Layout>
}

