import { useState } from 'react'
import Head from 'next/head'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { useContract, useSignContract } from '../../lib/contractHooks'
import { useMyIdentifiers } from '../../lib/identifierHooks'
import Layout from '../../components/Layout'
import Link from '../../components/Link'
import ErrorMessage from '../../components/ErrorMessage'
import ActionForm from '../../components/ActionForm'
import IdentifierProfile from '../../components/IdentifierProfile'
import InspectObject from '../../components/InspectObject'

export default function SignContractPage({ router }) {
  const { id: contractId } = router.query
  return <Layout title="Sign A Contract" requireLoggedIn>
    <Container maxwidth="lg">
      {contractId
        ? <SignContractOfferingForm {...{ router, contractId }}/>
        : <LookupContractOfferingForm {...{ router }}/>
      }
    </Container>
  </Layout>
}

function LookupContractOfferingForm({ router }){
  const [ contractId, setContractId ] = useState('')
  return <Paper {...{
    elevation: 3,
    component: 'form',
    sx: { p: 2, mt: 2 },
    onSubmit(event){
      event.preventDefault()
      router.push(`/contracts/sign?id=${encodeURIComponent(contractId)}`)
    }
  }}>
    <Typography component="h1" variant="h3">
      Sign a Contract
    </Typography>
    <TextField
      label="Contract Id"
      margin="normal"
      required
      fullWidth
      name="contractUrl"
      placeholder="lGavv2LbRjEPqiLUX1af_DvOz5Qy03PbuWw1I1kcFGs"
      value={contractId}
      onChange={e => { setContractId(e.target.value) }}
    />
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button type="submit" variant="contained">{`Lookup Contract Offering`}</Button>
    </Box>
  </Paper>
}


function SignContractOfferingForm({ router, contractId }){
  const [identifiers = []] = useMyIdentifiers()
  const [identifierDid, setIdentifierDid] = useState('')
  const [signatureId, setSignatureId] = useState('')
  const [contract, { loading }] = useContract(contractId)
  const signContract = useSignContract({
    onSuccess({ signatureId }){
      console.log({ signatureId })
      setSignatureId(signatureId)
    }
  })
  if (loading) return <span>Loading…</span>
  const disabled = signContract.pending

  if (signatureId){

  }
  return <Paper {...{
    elevation: 3,
    component: 'form',
    sx: { p: 2, mt: 2 },
    onSubmit(event){
      event.preventDefault()
      signContract({
        contractId,
        identifierDid,
      })
    }
  }}>
    <Typography component="h1" variant="h3" mb={3}>
      Sign Contract Offering
    </Typography>

    <Typography paragraph>
      {`The contract`}<br/>
      <Link href={contract.contractUrl} passHref>{contract.contractUrl}</Link><br/>
      {`is being offered to you by:`}<br/>
    </Typography>
    <Paper elevation={1}>
      <IdentifierProfile identifier={contract.offerer}/>
    </Paper>

    <Typography paragraph>
      <Link
        passHref
        href={`${contract.jlinxHost}/${contract.id}/stream`}
        target="_blank"
      >PUBLIC RECORD</Link>
    </Typography>

    {signatureId
      ? <>
        <Typography variant="h2" sx={{mt: 2}}>Signed!</Typography>
        <Typography variant="h5">Just one more step:</Typography>
        <Typography variant="h6">
          Give this Signature ID to the contract offerer:
        </Typography>
        <Box sx={{
          '> input': {
            outline: 'none',
            width: '27em',
            fontFamily: 'monospace',
            fontSize: '20px',
            p: 1,
          }
        }}>
          <input type="text" readOnly value={signatureId} onClick={e => { e.target.select() }}/>
        </Box>
      </>
      : <>
        <Typography variant="body1" sx={{my: 2}}>
          Which identifier do you want to sign this contract as?
        </Typography>
        <FormControl fullWidth sx={{mb:3}}>
          <InputLabel id="identifierDidLabel">Identifier</InputLabel>
          <Select
            name="identifierDid"
            labelId="identifierDidLabel"
            disabled={disabled}
            autoFocus
            value={identifierDid}
            onChange={e => { setIdentifierDid(e.target.value) }}
          >
            {identifiers.map(identifier =>
              <MenuItem
                key={identifier.did}
                value={identifier.did}
              >{identifier.did}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button type="submit" variant="contained">{`Sign Contract`}</Button>
        </Box>
      </>
    }

    <hr/>
    <InspectObject object={contract}/>

  </Paper>
}
