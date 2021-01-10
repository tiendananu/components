import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import * as Components from 'components3'
import Container from '@material-ui/core/Container'
import Accordion from '@material-ui/core/ExpansionPanel'
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary'
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Wrapper = ({ Component, name }) => {
  const [value, setValue] = React.useState()
  return (
    <Accordion
      key={name}
      TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Component
          key={name}
          id={name}
          values={{ [name]: value }}
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => setValue(e.target.value)}
        >
          {name}
        </Component>
      </AccordionDetails>
    </Accordion>
  )
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md" style={{ padding: '60px 0' }}>
      {Object.keys(Components).map((name) => (
        <Wrapper name={name} Component={Components[name]} />
      ))}
    </Container>
  </ThemeProvider>,
  document.querySelector('#root')
)
