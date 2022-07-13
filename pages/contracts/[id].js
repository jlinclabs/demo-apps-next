import { useState } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

import { useContract, useAckContractSignature } from '../../lib/contractHooks'
import Layout from '../../components/Layout'
import ErrorMessage from '../../components/ErrorMessage'
import Timestamp from '../../components/Timestamp'
import Link from '../../components/Link'
import IdentifierProfile from '../../components/IdentifierProfile'

import InspectObject from '../../components/InspectObject'

export default function ContratsPage({ id }) {
  return <Layout title="Contracts" requireLoggedIn>
    <Container maxwidth="md">
      <Contract {...{ id }}/>
    </Container>
  </Layout>
}

function Contract({ id }){
  const [contract, { loading, error, reload: reloadContract }] = useContract(id)
  if (error) return <ErrorMessage {...{ error }}/>
  if (!contract) return <CircularProgress/>
  console.log({contract})
  return <Paper
    sx={{
      m: 4,
      p: 2,
    }}
    component="div"
  >
    <Typography variant="h4">Contract</Typography>
    <Typography paragraph>
      <Link href={contract.contractUrl} passHref>{contract.contractUrl}</Link><br/>
    </Typography>

    <Typography paragraph>Offered by</Typography>
    <Paper elevation={2}>
      <IdentifierProfile identifier={contract.offerer}/>
    </Paper>


    <Typography variant="body2">Offered at: <Timestamp at={contract.createdAt}/></Typography>

    <Typography variant="body2">ID: {id}</Typography>

    <Typography paragraph>
      <Link
        passHref
        href={`${contract.jlinxHost}/${contract.id}/stream`}
        target="_blank"
      >PUBLIC RECORD</Link>
    </Typography>

    {contract.state === 'offered' && <>
      <Typography variant="h6" sx={{mt: 2}}>
        Give this ID to the parties you want to sign this contract:
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
        <input type="text" readOnly value={id} onClick={e => { e.target.select() }}/>
      </Box>

      <AckContractSignatureForm {...{ contract, reloadContract }}/>
    </>}

    {contract.state === 'signed' && <>
      <Typography paragraph>Signed by</Typography>
      <Paper elevation={2}>
        <IdentifierProfile identifier={contract.signer}/>
      </Paper>
      <Typography paragraph>
        <Link
          passHref
          href={`${contract.jlinxHost}/${contract.signatureId}/stream`}
          target="_blank"
        >PUBLIC RECORD</Link>
      </Typography>
    </>}

  </Paper>
}




function AckContractSignatureForm({ contract, reloadContract }){
  const [signatureId, setSignatureId] = useState('')

  const ackContractSignature = useAckContractSignature({
    onSuccess(contract){
      // router.push(`/contracts/${contract.id}`)
      reloadContract()
    },
  })
  const disabled = ackContractSignature.pending
  return <Box {...{
    elevation: 3,
    component: 'form',
    sx: { mt: 2 },
    onSubmit(event){
      event.preventDefault()
      ackContractSignature({
        contractId: contract.id,
        signatureId,
      })
    }
  }}>
    <Typography variant="h6" mb={3}>
      Enter Their Contract Signature ID here
    </Typography>
    <TextField
      label="Contract Signature ID"
      disabled={disabled}
      margin="normal"
      required
      fullWidth
      value={signatureId}
      onChange={e => { setSignatureId(e.target.value) }}
    />
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button type="submit" variant="contained">{`Record Signature`}</Button>
    </Box>
  </Box>
}
