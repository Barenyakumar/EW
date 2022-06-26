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
    </div>
  )
}
