import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/styles'
import theme from './theme'
import * as Components from './demos'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import ComponentIcon from '@mui/icons-material/Category'

const Menu = () => {
  const [component, setComponent] = React.useState()
  const Component = Components[Object.keys(Components)[component]]
  return (
    <Box display="flex" p={2}>
      <Tabs
        style={{ height: '100vh' }}
        orientation="vertical"
        value={component}
        onChange={(_, i) => setComponent(i)}
        indicatorColor="secondary"
        textColor="primary"
        variant="scrollable"
      >
        {Object.keys(Components).map((name, i) => (
          <Tab key={name} label={name} />
        ))}
      </Tabs>
      <Container maxWidth="md">
        <Box
          display="flex"
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          {Component ? (
            <Component />
          ) : (
            <Typography variant="h5" color="textSecondary">
              <ComponentIcon
                fontSize="large"
                style={{ verticalAlign: 'bottom' }}
              />{' '}
              Select a component on the left
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  )
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Menu />
    {/*   {Object.keys(Components).map((name) => (
        <Wrapper name={name} Component={Components[name]} />
      ))} */}
  </ThemeProvider>,
  document.querySelector('#root')
)
