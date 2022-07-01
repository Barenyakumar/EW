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
import axios from "axios"
import { useContext } from 'react'
import {AuthContext} from "../../context/AuthContext"
import { Link } from 'react-router-dom';


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
    const [userMail, setUserMail] = useState([])
    const {user: currentUser} = useContext(AuthContext)
    const ImageCallback = data => setSelectedImage(data);


    const handleGroupSession = async () => {
        const token = await axios.get("/session/token");

        const room = await axios.post("/session/createroom", {
        name: Date.now().toString(),
        description: sessionDesc,
        template: "eduwarts_videoconf_2ac98bb4-8d23-4344-8d84-07b278e2d979",
        token:token.data
        });

        console.log(dateTime);

        const groupSession = await axios.post(`/session/${currentUser._id}`,{
            mentor:currentUser._id,
            sessionName:sessionName,
            sessionType:"Group",
            category:category,
            description:sessionDesc,
            sessionLink:`/${room.data.id}`,
            duration:duration,
            startTime:dateTime.toString().substring(15,55),
            date:dateTime.toString().substring(0,15),

        })

        console.log(groupSession.data);

        const usersMail = await axios.get("/users/all");
        setUserMail(usersMail.data);
        console.log(usersMail.data);

        for(let i=0; i<userMail.length; i++){
            const email = await axios.post("/email/mail",{
                reciever:usersMail.data[i].email,
                subject:`${sessionName} is being published by your mentor ${currentUser.name}`,
                message:`Dear ${usersMail.data[i].Name}, \n <b>${currentUser.name}</b> has created a group session,\n 
                ${sessionName},\n
                Group Session\n
                Description: ${sessionDesc}\n
                Date: ${dateTime}\n
                Duration:${duration} mins\n


                you can visit the link to know more about the session.
                http://localhost:3000/session/${groupSession.data._id}\n\n\n\n\n\n


                This is an automated mail. Please do not reply to this mail.\n\n\n
                Team Eduwarts.
                `
            })
            console.log(email.data);
        }


        window.location.replace(`/session/${groupSession.data._id}`)


    }



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
                            onChange={e => setCategory(e.target.value)}
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
                        <TextField fullWidth required label="Session name" id="fullWidth" onChange={e => setSessionName(e.target.value)} />
                    </div>
                    <div className="desc_Group" style={{ width: "100%", marginBottom: "1rem", minWidth: "300px" }}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Multiline"
                            multiline
                            maxRows={4}
                            onChange={e => setSessionDesc(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <PreviewImg ImageCallback={ImageCallback} />
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
                            onChange={e => setDuration(e.target.value)}
                        />
                    </div>


                    <div className="buttons_group" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <Button variant='contained' component={Link} to={"/groupsession"}>go back</Button>
                        <Button type='submit' variant='contained' onClick={handleGroupSession}>Publish</Button>
                    </div>
                </FormControl>
            </Box>

        </div>

    )
}
