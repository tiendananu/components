import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import * as Components from './demos'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Box from '@material-ui/core/Box'
import ComponentIcon from '@material-ui/icons/Category'

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
      <Container maxWidth="sm">
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
