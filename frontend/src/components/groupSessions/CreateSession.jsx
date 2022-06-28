import React, { useState } from 'react'
import PreviewImg from '../Preview/Preview'
import { Box, TextField, OutlinedInput, Button, } from "@mui/material"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import * as startOfDay from "date-fns";



// import DatePickers from '../DatePicker/DatePicker'

const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
]
export default function Createsession() {
    const [category, setCategory] = useState("")
    const [sessionName, setSessionName] = useState("")
    const [sessionDesc, setSessionDesc] = useState("")
    const [dateTime, setDateTime] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState()
    const [duration, setDuration] = useState(60)

    console.log(dateTime)
    

    const ImageCallback = data => setSelectedImage(data);


    return (
        <div>
            <h2>Let’s publish this session to the community.</h2>
            <Box sx={{ width: "100%", border: "1px solid black", borderRadius: ".5rem", padding: "1rem" }}>
                <FormControl fullWidth style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <div className="category_group" style={{ width: "45%", minWidth: "300px", marginBottom: "1rem" }}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={e=> setCategory(e.target.value)}
                            style={{ width: "100%" }}
                        >
                            {names.map((element) => (
                                <MenuItem
                                    key={element}
                                    value={element}
                                >
                                    {element}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="sessionName_Group " style={{ width: "45%", minWidth: "300px", marginBottom: "1rem" }}>
                        <TextField fullWidth required label="Session name" id="fullWidth" onChange={e=> setSessionName(e.target.value)} />
                    </div>
                    <div className="desc_Group" style={{ width: "100%", marginBottom: "1rem", minWidth: "300px" }}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Multiline"
                            multiline
                            maxRows={4}
                            onChange={e=> setSessionDesc(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <PreviewImg ImageCallback = {ImageCallback} />
                    <div className="date_group" style={{ width: "45%", minWidth: "300px", marginBottom: "1rem" }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DateTimePicker
                                renderInput={(params) => <TextField {...params} />}
                                label="Session date and time"
                                value={dateTime}
                                onChange={(newValue) => {
                                    setDateTime(newValue);
                                }}
                                minDateTime={new Date()}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="duration_group" style={{ width: "45%", minWidth: "300px", marginBottom: "1rem" }}>
                        <TextField
                            id="standard-number"
                            label="Duration in mins"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={e=> setDuration(e.target.value)}
                        />
                    </div>


                    <div className="buttons_group" style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%"}}>
                        <Button variant='contained'>go back</Button>
                        <Button type='submit' variant='contained'>Publish</Button>
                    </div>
                </FormControl>
            </Box>

        </div>

    )
}
