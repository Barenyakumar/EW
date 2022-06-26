import React from "react"
import './mui.css'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"


export default function MuiCard(props) {
  const date = new Date(props.date)
  console.log(date);
  const card = (
    <React.Fragment >
      <CardContent >
        <Typography variant="h5" color="white" gutterBottom>
          {props.element.category}
        </Typography>
        <Typography variant="h3"sx={{ fontSize: 15 }} color="white" gutterBottom>
          {props.element.date}
        </Typography>
        <Typography sx={{ fontSize: 18 }} component="div" color="white" >
          {props.element.startTime+"-"+props.element.endTime}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{props.element.description.substring(0,15)+"..."}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{props.element.description}</Typography>
            </AccordionDetails>
          </Accordion>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Reschedule this session</Button>
      </CardActions>
      <CardActions sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <Button variant="contained" size="small" color="error">
          Cancel
        </Button>
        <Button size="small" variant="contained" color="success">
          Approve
        </Button>
      </CardActions>
    </React.Fragment>
  )
  return (
    <div className="MuiCard">
      <Box>
        <Card variant="outlined" className="mui_card_container">{card}</Card>
      </Box>
    </div>
  )
}
