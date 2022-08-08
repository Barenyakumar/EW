import React, { useState, useRef, useEffect } from "react"
import "./signup.css"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import axios from "axios"
import Popup from "../../components/popup-box/Popup"
import Preloader from "../../components/PreLoader/Preloader"
import { Link } from "react-router-dom"
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  Stack,
  Alert,
} from "@mui/material"
import AvatarSelect from "../../components/Auth/AvatarSelect"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default function Signup(props) {
  const [val, setVal] = useState(1)
  const [otpMatched, setOtpMatched] = useState(false)
  const [userDataFlag, setUserDataFlag] = useState(false)
  const [pswFlag, setPswFlag] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [err, setErr] = useState("")
  const [userCredentials, setUserCredentials] = useState({})

  useEffect(() => {
    props.loginCallback(true)
  }, [props])

  // console.log(userCredentials)

  function renderSwitch(param) {
    switch (param) {
      case 1:
        return (
          <>
            <h2 style={{ width: "100%", textAlign: "center" }}>
              Verify your Email
            </h2>
            <EmailVerify
              otpMatched={otpMatched}
              setOtpMatched={setOtpMatched}
              err={err}
              setErr={setErr}
              errMessage={errMessage}
              setErrMessage={setErrMessage}
              setUserCredentials={setUserCredentials}
              setVal={setVal}
            />
          </>
        )
      case 2:
        return (
          <UserDetails
            err={err}
            setErr={setErr}
            errMessage={errMessage}
            setErrMessage={setErrMessage}
            setUserCredentials={setUserCredentials}
            setVal={setVal}
            setUserDataFlag={setUserDataFlag}
          />
        )
      case 3:
        return (
          <ConfirmPassword
            err={err}
            setErr={setErr}
            errMessage={errMessage}
            setErrMessage={setErrMessage}
            setUserCredentials={setUserCredentials}
            setVal={setVal}
            setPswFlag={setPswFlag}
          />
        )
      case 4:
        return (
          <AvatarSelect
            gender={userCredentials.gender}
            userCredentials={userCredentials}
            setUserCredentials={setUserCredentials}
            setVal={setVal}
          />
        )
      default:
        return <h1>Default sign up page</h1>
    }
  }
  return (
    <div className="signupWrapper">
      <div className="signupPageWrapper">
        <div
          className="signupPageCount"
          style={val === 1 ? { background: "green" } : {}}
        >
          01
        </div>
        <div
          className="signupPageCount"
          style={val === 2 ? { background: "green" } : {}}
        >
          02
        </div>
        <div
          className="signupPageCount"
          style={val === 3 ? { background: "green" } : {}}
        >
          03
        </div>
        <div
          className="signupPageCount"
          style={val === 4 ? { background: "green" } : {}}
        >
          04
        </div>
      </div>
      <div className="signupContentWrapper">
        <div className="signupContentBox">{renderSwitch(val)}</div>
        {/* <div className="controlBtnWrapper">
                    <IconButton aria-label="delete" size="small" onClick={prevVal}>
                        <ArrowBackIcon fontSize="inherit" />
                        Prev
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={nextVal}>
                        {
                            val == 4 ? "Submit" : <ArrowForwardIcon fontSize="inherit" />
                        }
                    </IconButton>
                </div> */}
      </div>
    </div>
  )
}

function EmailVerify(props) {
  const otp = useRef()
  const email = useRef()

  const [otpSent, setotpSent] = useState(false)
  const [Otp, setOtp] = useState("")
  const [preloader, setPreloader] = useState(false)

  const errCallback = () => props.setErr("")

  const nextVal = () => {
    if (props.otpMatched) props.setVal((prev) => prev + 1)
    else {
      props.setErr("Wrong email!!!")
      props.setErrMessage("Verify your Email first to go to next step...")
    }
  }

  async function sendOTPHandler(e) {
    setPreloader(true)
    e.preventDefault()
    try {
      if (email !== "") {
        const res = await axios.post("/email/otp", {
          reciever: email.current.value,
        })
        setPreloader(false)
        setotpSent(true)
        setOtp(res.data)
        // console.log(res.data)
      } else {
        setPreloader(false)
        props.setErr("Wrong email!!!")
        props.setErrMessage("Please enter a valid email id")
      }
    } catch (error) {
      setPreloader(false)
      console.log(error)
      props.setErr("Wrong email!!!")
      props.setErrMessage(
        "Something went wrong while sending otp. Please try again..."
      )
    }
  }

  function matchOTP() {
    if (otp.current.value === Otp.otp && email.current.value === Otp.email) {
      props.setOtpMatched(true)
      setotpSent(false)
      props.setUserCredentials((prev) => ({
        ...prev,
        email: email.current.value,
      }))
    }
  }

  return (
    <div className="emailWrapper">
      <img src="/images/email.jpg" alt="" />
      <div className="email_div">
        <input
          type="email"
          ref={email}
          placeholder="Email"
          name="email"
          required={true}
          style={
            props.otpMatched
              ? { boxShadow: "0px 0px 7px green", border: "none" }
              : { boxShadow: "0px 0px 7px red", border: "none" }
          }
          disabled={props.otpMatched}
        />
        <a
          onClick={sendOTPHandler}
          disabled={true}
          style={{
            fontSize: "1rem",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {!props.otpMatched ? (otpSent ? "Resend" : "Verify") : ""}
        </a>
        {otpSent ? (
          <div className="otp_div">
            <input type="text" ref={otp} placeholder="Enter OTP" required />
            <button onClick={matchOTP}>Submit</button>
          </div>
        ) : (
          ""
        )}
        <div className="controlBtnWrapper">
          <Link to="/login" className="redirectLink">
            Alredy registered!{" "}
          </Link>
          <IconButton aria-label="delete" size="small" onClick={nextVal}>
            Next
            <ArrowForwardIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      {props.err ? (
        <Popup
          flag={true}
          message={props.errMessage}
          errCallback={errCallback}
        />
      ) : (
        ""
      )}
      {preloader ? <Preloader /> : ""}
    </div>
  )
}

// user Details

function UserDetails(props) {
  const menteeName = useRef()
  const username = useRef()
  const gender = useRef()
  const [interests, setinterests] = useState([])
  const [language, setLanguage] = useState([])
  const [alert, setAlert] = useState({
    severity: "",
    msg: null,
  })

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setinterests(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }
  const handleLanguageChange = (event) => {
    const {
      target: { value },
    } = event
    setLanguage(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const handleSaveData = (e) => {
    e.preventDefault()
    if (language.length < 4 && interests.length < 4) {
      props.setUserCredentials((prev) => ({
        ...prev,
        interests: interests,
        name: menteeName.current.value,
        username: username.current.value,
        gender: gender.current.value,
        language: language,
      }))

      props.setVal((prev) => prev + 1)
      props.setUserDataFlag(true)
    }
  }

  return (
    <>
      {language.length > 3 && (
        <Alert variant="filled" severity="error">
          Max 3 languages
        </Alert>
      )}
      {interests.length > 3 && (
        <Alert variant="filled" severity="error">
          Max 3 Interest
        </Alert>
      )}
      <div className="userDetailsWrapper emailWrapper">
        <img src="/images/userDetails.jpg" alt="" />
        <div className="userDetailsDiv">
          <form className="loginForm" onSubmit={handleSaveData}>
            <input
              type="text"
              ref={menteeName}
              placeholder="Name"
              name="name"
              required={true}
              autoComplete="off"
            />
            <input
              type="text"
              ref={username}
              placeholder="Username"
              name="username"
              minLength={4}
              maxLength={10}
              required={true}
              autoComplete="none"
            />
            <label htmlFor="gender">
              {" "}
              Gender:
              <select ref={gender} name="gender" id="gender">
                <option value="Male" selected>
                  Male
                </option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <FormControl sx={{ width: "290px", margin: ".7rem 0px" }}>
              <InputLabel id="demo-multiple-chip-label">Interests</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                name="interests"
                value={interests}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Interest" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                required
              >
                {INTERESTS.map((i) => (
                  <MenuItem
                    key={i}
                    value={i}
                    //style={getStyles(l, personl, theme)}
                  >
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "290px", margin: ".7rem 0px" }}>
              <InputLabel id="demo-multiple-chip-label">Language</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                name="language"
                value={language}
                onChange={handleLanguageChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Language" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                required
              >
                {LANGUAGES.map((l) => (
                  <MenuItem
                    key={l}
                    value={l}
                    //style={getStyles(l, personl, theme)}
                  >
                    {l}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="controlBtnWrapper">
              <IconButton
                aria-label="delete"
                size="small"
                component={Link}
                to={"/login"}
              >
                <ArrowBackIcon fontSize="inherit" />
                LogIn
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                type="submit"
                style={{ margin: "2rem 0px" }}
              >
                Next
                <ArrowForwardIcon fontSize="inherit" />
              </IconButton>
            </div>
            {props.err ? <Popup flag={true} message={props.errMessage} /> : ""}
          </form>
        </div>
      </div>
    </>
  )
}

function ConfirmPassword(props) {
  const password = useRef()
  const rePassword = useRef()
  const errCallback = () => props.setErr("")

  const handleCheckPassword = (e) => {
    e.preventDefault()
    if (
      password.current.value !== "" &&
      password.current.value === rePassword.current.value
    ) {
      props.setUserCredentials((prev) => ({
        ...prev,
        password: password.current.value,
      }))
      props.setVal((prev) => prev + 1)
      props.setPswFlag(true)
    } else {
      props.setErr("Wrong password!!!")
      props.setErrMessage("Password does not match. Please try agin...")
    }
  }
  return (
    <div className="emailWrapper">
      <img src="/images/password.jpg" alt="" />
      <div className="password_div">
        <form className="loginForm" onSubmit={handleCheckPassword}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            ref={password}
            placeholder="Password"
            name="passoword"
            minLength={6}
            required={true}
          />
          <label htmlFor="repassword">Confirm Password</label>
          <input
            id="repassword"
            type="password"
            ref={rePassword}
            placeholder="Confirm password"
            name="passoword"
            minLength={6}
            required={true}
          />
          <div className="controlBtnWrapper">
            <IconButton
              aria-label="delete"
              size="small"
              component={Link}
              to={"/login"}
            >
              <ArrowBackIcon fontSize="inherit" />
              LogIn
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              type="submit"
              style={{ margin: "2rem 0px" }}
            >
              Next
              <ArrowForwardIcon fontSize="inherit" />
            </IconButton>
          </div>
        </form>
      </div>
      {props.err ? (
        <Popup
          flag={true}
          message={props.errMessage}
          errCallback={errCallback}
        />
      ) : (
        ""
      )}
    </div>
  )
}

const INTERESTS = [
  "Art & Graphic Design",
  "Dance",
  "Music",
  "Photography & Film making",
  "Blockchain",
  "UI/UX",
  "Data Science",
  "Web Development",
  "Buisness Analytics",
  "Content Writing & SEO",
  "Digital Marketing",
  "Information Security",
  "Product Management",
  "Event Management",
  "Competitive Coding",
  "Software Engineering",
  "Interview Preparation",
  "DevOps",
  "Others",
]

const LANGUAGES = [
  "Hindi",
  "English",
  "Chinese",
  "Japanese",
  "Russian",
  "French",
]
