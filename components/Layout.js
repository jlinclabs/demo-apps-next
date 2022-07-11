import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

import Link from '../components/Link'

export default function Layout({ children }) {
  return (
    <Container
      disableGutters
      sx={{
        p: 0,
        // display: 'flex',
        // flexDirection: 'column',
        // height: '100vh',
        // width: '100vw',
        // overflow: 'hidden',
      }}
    >
      <TopNav />
      <main>{children}</main>
    </Container>
  )
}



function TopNav() {
  // const navigate = useNavigate()
  // const location = useLocation()

  let currentUser = null // TBD
  const [auth, setAuth] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Link href="/">{`${process.env.APP_NAME}`}</Link>
      </Typography>
      <Typography variant="h7" component="div" sx={{ color: 'orange' }}>
        {'BETA'}
      </Typography>
      {currentUser && <LoggedInThing /> }
    </Toolbar>
  </AppBar>
}


function LoggedInThing(){
  return <div>
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
    </Menu>
  </div>
}
