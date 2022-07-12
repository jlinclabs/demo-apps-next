import { useState } from 'react'
import Head from 'next/head'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Layout from '../components/Layout'
import Link from '../components/Link'
import ErrorMessage from '../components/ErrorMessage'
import InspectObject from '../components/InspectObject'
import { useRequireLoggedIn } from '../lib/session'

export default function Contracts() {
  const loggedIn = useRequireLoggedIn()

  return <Layout title="Contracts">
    Contracts!
  </Layout>
}

