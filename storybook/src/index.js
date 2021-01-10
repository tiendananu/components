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

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md" style={{ padding: '60px 0' }}>
      {Object.keys(Components).map((name) => {
        const Component = Components[name]
        return (
          <Accordion
            key={name}
            TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Component key={name} />
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Container>
  </ThemeProvider>,
  document.querySelector('#root')
)
