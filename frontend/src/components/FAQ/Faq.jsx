import * as React from "react"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function Faq() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How do we accept mentor's application?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul style={{ marginLeft: "10px" }}>
              <li>
                We have an application process that’s open to any individuals
                keen on forwarding this mission together, anywhere in the world.
                You can read more on criteria here.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>What's the approval criteria to be a mentor?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul style={{ marginLeft: "10px" }}>
              <li>
                A computer or mobile device that meets our minimum requirements.{" "}
              </li>
              <li>
                A reliable internet connection (upload speed of at least 3MBps)
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Is Eduwarts Free?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul style={{ marginLeft: "10px" }}>
              <li>
                It is totally free. Absolutely no charge. Volunteers from our
                community serve as mentors and pass on their knowledge. Please
                be mindful of our community's expectations, though.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Where can I get help?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul style={{ marginLeft: "10px" }}>
              <li>
                Please email us at :
                <a href="mailto:team@eduwarts.tech">team@eduwarts.tech</a>
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
