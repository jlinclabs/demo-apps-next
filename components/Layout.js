import Head from 'next/head'

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
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'

import { useCurrentUser } from '../lib/session'
import Link from '../components/Link'
import InspectObject from '../components/InspectObject'

export default function Layout(props) {
  const {
    children,
    title = 'JLINX Demo',
    description = 'JLINX Demo',
    favicon = '/favicon.ico',
    requireNotLoggedIn = false,
    requireLoggedIn = false,
  } = props
  const { currentUser, loading } = useCurrentUser({
    redirectToIfFound: requireNotLoggedIn ? '/' : undefined,
    redirectToIfNotFound: requireLoggedIn ? '/login' : undefined,
  })
  console.log(`currentUser => ${JSON.stringify(currentUser)}`)

  return (
    <Box
      sx={{
        p: 0,
        // display: 'flex',
        // flexDirection: 'column',
        // height: '100vh',
        // width: '100vw',
        // overflow: 'hidden',
      }}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={favicon} />
      </Head>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        minWidth: '100vw',
      }}>
        <SideNav {...{ loading, currentUser }}/>
        <Box sx={{
          flex: '1 1'
        }}>{
          loading
            ? <span>loading…</span>
            : children
        }</Box>
      </Box>
    </Box>
  )
}


function SideNav({ loading, currentUser }) {
  const navButtons =
    loading ? [] :
    currentUser ? [
      {
        icon: <AccountBoxOutlinedIcon/>,
        text: 'Identifiers',
        href: '/identifiers',
      },
      {
        icon: <ArticleOutlinedIcon/>,
        text: 'Contracts',
        href: '/contracts',
      },
      {
        icon: <LogoutOutlinedIcon/>,
        text: 'Logout',
        href: '/logout',
      }
    ] :
    [
      {
        icon: <LoginOutlinedIcon/>,
        text: 'Login',
        href: '/login',
      },
      {
        icon: <ArticleOutlinedIcon/>,
        text: 'Signup',
        href: '/signup',
      },
    ]

  return <Box sx={{
    // backgroundColor: 'success.main',
    backgroundColor: 'primary.dark',
    minWidth: `min(10vw, 200px)`,
    maxWidth: `max(20vw, 400px)`,
    overflowX: 'auto',
  }}>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
      <Link href="/">{`${process.env.APP_NAME}`}</Link>
    </Typography>
    <Typography variant="h7" component="div" sx={{ color: 'orange' }}>
      {'BETA'}
    </Typography>
    <List>
      {navButtons.map(({ icon, text, href }) =>
        <ListItem key={text} disablePadding>
          <ListItemButton component={Link} href={href}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  </Box>
}


// function LoggedInThing(){
//   return <div>
//     <IconButton
//       size="large"
//       aria-label="account of current user"
//       aria-controls="menu-appbar"
//       aria-haspopup="true"
//       onClick={handleMenu}
//       color="inherit"
//     >
//       <AccountCircle />
//     </IconButton>
//     <Menu
//       id="menu-appbar"
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={Boolean(anchorEl)}
//       onClose={handleClose}
//     >
//       <MenuItem onClick={handleClose}>Profile</MenuItem>
//       <MenuItem onClick={handleClose}>My account</MenuItem>
//     </Menu>
//   </div>
// }
