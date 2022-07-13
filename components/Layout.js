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
import Skeleton from '@mui/material/Skeleton'
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
    <Container maxWidth={false} disableGutters>
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
    </Container>
  )
}


function SideNav({ loading, currentUser }) {
  const navButtons = (
    loading ? (
      Array(3).fill().map((_, i) =>
        <Skeleton key={i} animation="wave" height="100px" />
      )
    ) :
    currentUser ? <>
      <NavButton {...{
        icon: <AccountBoxOutlinedIcon/>,
        text: 'Identifiers',
        href: '/identifiers',
      }}/>
      <NavButton {...{
        icon: <ArticleOutlinedIcon/>,
        text: 'Contracts',
        href: '/contracts',
      }}/>
      <Box sx={{ flex: '1 1'}}/>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton component={Link} href="/profile">
          <ListItemText {...{

            primary: currentUser.email,
            primaryTypographyProps: {
              sx: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }
            }
          }}/>
        </ListItemButton>
      </ListItem>
      <NavButton {...{
        icon: <LogoutOutlinedIcon/>,
        text: 'Logout',
        href: '/logout',
      }}/>
    </> :
    <>
      <NavButton {...{
        icon: <LoginOutlinedIcon/>,
        text: 'Login',
        href: '/login',
      }}/>
      <NavButton {...{
        icon: <ArticleOutlinedIcon/>,
        text: 'Signup',
        href: '/signup',
      }}/>
    </>
  )
  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'primary.dark',
    minWidth: `max(10vw, 175px)`,
    maxWidth: `max(20vw, 400px)`,
    overflowX: 'auto',
  }}>
    <Typography
      variant="h7"
      component="div"
      sx={{
        position: 'absolute',
        top: '10px',
        left:  '0px',
        color: 'orange',
        textShadow: '0 0 4px black',
        transform: 'rotate(320deg)',
      }}
    >
      {'ALPHA'}
    </Typography>

    <Link
      underline="none"
      variant="h6"
      href="/"
      sx={{
        mt: 3,
        mb: 1,
        textAlign: 'center',
        // color: 'primary.light',
        color: 'inherit',
        // textShadow: '0 0 4px black',
        // color: 'black',
      }}
    >
      {`${process.env.APP_NAME}`}
    </Link>

    <List sx={{
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1',
      padding: '0',
    }}>{navButtons}</List>
  </Box>
}

function NavButton({ text, href, icon }){
  return <ListItem key={text} disablePadding>
    <ListItemButton component={Link} href={href}>
      <ListItemIcon sx={{minWidth: '30px'}}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
}
