import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';

import { useContract } from '../../lib/contractHooks'
import Layout from '../../components/Layout'
import ErrorMessage from '../../components/ErrorMessage'
import Timestamp from '../../components/Timestamp'
import InspectObject from '../../components/InspectObject'

export default function ContratsPage({ id }) {
  return <Layout title="Contracts" requireLoggedIn>
    <Container maxwidth="md">
      <Contract {...{ id }}/>
    </Container>
  </Layout>
}

function Contract({ id }){
  const [contract, { loading, error }] = useContract(id)
  if (error) return <ErrorMessage {...{ error }}/>
  if (!contract) return <CircularProgress/>
  return <Paper
    sx={{
      m: 4,
      p: 2,
    }}
    component="div"
  >
    <Typography variant="h4">Contract</Typography>
    <Typography variant="h5">{id}</Typography>
    <Typography variant="body2">Created at: <Timestamp at={contract.createdAt}/></Typography>
    <InspectObject object={contract}/>
  </Paper>
}



