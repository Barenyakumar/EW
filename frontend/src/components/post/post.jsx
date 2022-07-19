// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export function PostCard() {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Card>
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             R
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title="Jouline"
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image="https://i.ytimg.com/vi/6oOB54-71_A/maxresdefault.jpg"
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           The Power Of Love Folge 1 Staffel 6
//           Verliebt in Jouline: Mit ihrer eindringlichen Stimme überzeugt sie
//           alle Coaches von sich - doch wer dreht sich für die 13-Jährige mit der
//           herzzerreißenden Stimme um?
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph>Method:</Typography>
//           <Typography paragraph>
//             Heat 1/2 cup of the broth in a pot until simmering, add saffron and
//             set aside for 10 minutes.
//           </Typography>
//           <Typography paragraph>
//             Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
//             over medium-high heat. Add chicken, shrimp and chorizo, and cook,
//             stirring occasionally until lightly browned, 6 to 8 minutes.
//             Transfer shrimp to a large plate and set aside, leaving chicken and
//             chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
//             onion, salt and pepper, and cook, stirring often until thickened and
//             fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
//             cups chicken broth; bring to a boil.
//           </Typography>
//           <Typography paragraph>
//             Add rice and stir very gently to distribute. Top with artichokes and
//             peppers, and cook without stirring, until most of the liquid is
//             absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
//             shrimp and mussels, tucking them down into the rice, and cook again
//             without stirring, until mussels have opened and rice is just tender,
//             5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
//           </Typography>
//           <Typography>
//             Set aside off of the heat to let rest for 10 minutes, and then
//             serve.
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   )
// }
import "./post.css"
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import { maxHeight } from "@mui/system";



export const Post = ({post}) => {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});

    const {user: currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async ()=>{
            const res = await axios.get(`/users?userId=${post.userId}`) 
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])

    const likeHandler = ()=>{ 
        try{
            axios.put('/posts/'+post._id+"/like", {userId:currentUser._id });
        }catch(error){
            console.log(error);
        }
        setLike(isLiked ? like-1: like+1)
        setIsLiked(!isLiked)
    }

    const deletePost = ()=>{
        try{
            axios.delete('/posts/'+post._id,{
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                withCredentials: true,
                userId:currentUser._id });
            console.log("This post has been deleted!!!")
        }catch(error){
            console.log(error);
        }
    }
    

    const publicFolder= process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className=" postContainer" id="postContainer">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`} style ={ {textDecoration: "none", color: "black"}} >
                        <img src={user.profilePicture ? publicFolder+ user.profilePicture: publicFolder + "/avatar.jpg"} alt="" className="postProfileImg" />
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                        </Link>
                    </div>
                    <div className="postTopRight" id="postTopRight" >
                        <DeleteIcon className="MoreBtn" onClick={deletePost} />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={publicFolder+post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBtnLeft">
                        <img src="/assets/like.png" alt="" onClick={likeHandler} className="likeIcon" />
                        <img src="/assets/heart.png" alt="" onClick={likeHandler} className="heartIcon" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBtnRight">
                        <span className="postCommentText">{post.comments} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
