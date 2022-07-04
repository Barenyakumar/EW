import * as React from "react"
import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { red } from "@mui/material/colors"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Link } from "react-router-dom"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function MuiCardComplex(props) {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Link to={`/session/${props.element._id}`}>
      <Card sx={{ maxWidth: 345, textDecoration:"none" }}>
        <CardMedia
          component="img"
          height="194"
          image={"./images/default-cover.jpg"}
          alt="Paella dish"
        />

        <CardContent sx={{textDecoration:"none"}}>

          {props.element.sessionName ? (
            <Typography variant="h5" color="text.secondary" style={{textDecoration:"none"}}>
              {props.element.sessionName}
            </Typography>
          ) : (
            ""
          )}
          {props.element.date ? (
            <Typography variant="h6" color="text.secondary">
              {props.element.date}
            </Typography>
          ) : (
            ""
          )}
          {props.element.startTime ? (
            <Typography variant="h6" color="text.secondary">
              {props.element.startTime + "-" + props.element.endTime}
            </Typography>
          ) : (
            ""
          )}
          {props.element.category ? (
            <Typography variant="body2" color="text.secondary">
              {props.element.category}
            </Typography>
          ) : (
            ""
          )}
        </CardContent>

        {props.element.conductor ? (
          <CardHeader
            avatar={
              <div className="avatar">
                <Avatar
                  alt="Remy Sharp"
                  sx={{ bgcolor: "#344CB7 " }}
                  src={"./images/" + props.element.conductorImg}
                />
              </div>
            }
            title={props.element.conductor}
            subheader={props.element.role}
          />
        ) : (
          ""
        )}

        {props.element.avatar ? (
          <CardHeader
            avatar={
              <AvatarGroup total={24}>
                {props.element.avatar.map((avatarelem) => (
                  <Avatar
                    alt={avatarelem.alt}
                    sx={{ bgcolor: "#344CB7 " }}
                    src={"./images/" + avatarelem.img1}
                  />
                ))}
              </AvatarGroup>
            }
          />
        ) : (
          ""
        )}
      </Card>
    </Link>
  )
}
