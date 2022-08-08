// import React from 'react'
// import './sidebar.css'
// import Avatar from '@mui/material/Avatar';
// import { Button } from '@mui/material';
// import { Link } from 'react-router-dom';

// export const Sidebar = () => {
//     return (
//         <div className="sidebarContainer">
//             <div className="mentors">
//                 <div className="mentorHeading">Top Mentors</div>
//                 <div className="mentor">
//                     <Avatar sx={{ height: "50", width: "50" }}>P</Avatar>
//                     <div className="mentorDetails">
//                         <span className='mentorName'>Pratik Kumar</span>
//                         <span className="mentorRole">Full Stack</span>
//                     </div>
//                 </div>
//                 <div className="mentor">
//                     <Avatar sx={{ height: "50", width: "50" }}>P</Avatar>
//                     <div className="mentorDetails">
//                         <span className='mentorName'>Pratik Kumar</span>
//                         <span className="mentorRole">Full Stack</span>
//                     </div>
//                 </div>
//                 <div className="mentor">
//                     <Avatar sx={{ height: "50", width: "50" }}>P</Avatar>
//                     <div className="mentorDetails">
//                         <span className='mentorName'>Pratik Kumar</span>
//                         <span className="mentorRole">Full Stack</span>
//                     </div>
//                 </div>
//                 <div className="mentor">
//                     <Avatar sx={{ height: "50", width: "50" }}>P</Avatar>
//                     <div className="mentorDetails">
//                         <span className='mentorName'>Pratik Kumar</span>
//                         <span className="mentorRole">Full Stack</span>
//                     </div>
//                 </div>
//                 <div className="mentor">
//                     <Avatar sx={{ height: "50", width: "50" }}>P</Avatar>
//                     <div className="mentorDetails">
//                         <span className='mentorName'>Pratik Kumar</span>
//                         <span className="mentorRole">Full Stack</span>
//                     </div>
//                 </div>
//                 <div className="mentor">
//                     <Avatar sx={{ height: "50", width: "50" }}>P</Avatar>
//                     <div className="mentorDetails">
//                         <span className='mentorName'>Pratik Kumar</span>
//                         <span className="mentorRole">Full Stack</span>
//                     </div>
//                 </div>
//                 <div className="mentor">
//                     <Avatar sx={{ height: "50", width: "50" }}>P</Avatar>
//                     <div className="mentorDetails">
//                         <span className='mentorName'>Pratik Kumar</span>
//                         <span className="mentorRole">Full Stack</span>
//                     </div>
//                 </div>
//                 <div className="link"><Link to="/mentor" style={{textDecoration:"none", color:"black", width:"90%", height:"100%"}}><Button variant='contained' sx={{ width: "100%", height: "70%", margin: ".5rem 0px" }}>View more</Button></Link></div>
                
                
//             </div>
//             <div className="challanges mentors">
//                 <div className=" challangeHeader mentorHeading">Challanges</div>
//                 <div className="challange">
//                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-N0DjgncQ7FPoGd84KyLWZa4nqwvJYKlzA&usqp=CAU" alt="" />
//                     <div className="challangeDesc">
//                         <span className="challangeName">Divine Shoot</span>
//                         <span className="challangeGenre">Photography</span>
//                         <span className="registered">50+ registered...</span>
//                     </div>
//                 </div>
//                 <div className="challange">
//                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-N0DjgncQ7FPoGd84KyLWZa4nqwvJYKlzA&usqp=CAU" alt="" />
//                     <div className="challangeDesc">
//                         <span className="challangeName">Divine Shoot</span>
//                         <span className="challangeGenre">Photography</span>
//                         <span className="registered">50+ registered...</span>
//                     </div>
//                 </div>
//                 <div className="challange">
//                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-N0DjgncQ7FPoGd84KyLWZa4nqwvJYKlzA&usqp=CAU" alt="" />
//                     <div className="challangeDesc">
//                         <span className="challangeName">Divine Shoot</span>
//                         <span className="challangeGenre">Photography</span>
//                         <span className="registered">50+ registered...</span>
//                     </div>
//                 </div>
//                 <div className="challange">
//                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-N0DjgncQ7FPoGd84KyLWZa4nqwvJYKlzA&usqp=CAU" alt="" />
//                     <div className="challangeDesc">
//                         <span className="challangeName">Divine Shoot</span>
//                         <span className="challangeGenre">Photography</span>
//                         <span className="registered">50+ registered...</span>
//                     </div>
//                 </div>

//                 <div className="link"><Link to="/challanges" style={{textDecoration:"none", color:"black", width:"90%", height:"100%"}}><Button variant='contained' sx={{ width: "100%", height: "70%", margin: ".5rem 0px" }}>View more</Button></Link></div>
//             </div>
//             <div className="groupSessions mentors">
//                 <div className="groupHeading mentorHeading">Group Session</div>
//                 <div className="challange mentorSession">
//                     <img src="https://thumbs.dreamstime.com/b/colourful-various-herbs-spices-cooking-dark-background-herbs-spices-cooking-dark-background-113655482.jpg" alt="" />
//                     <div className="sessionDesc challangeDesc">
//                         <span className="challangeName">Cooking</span>
//                         <span className="sessionMentor challangeGenre"> by Pratik Kumar</span>
//                         <span className="registered">50+ registered...</span>
//                     </div>
//                 </div>
//                 <div className="challange mentorSession">
//                     <img src="https://thumbs.dreamstime.com/b/colourful-various-herbs-spices-cooking-dark-background-herbs-spices-cooking-dark-background-113655482.jpg" alt="" />
//                     <div className="sessionDesc challangeDesc">
//                         <span className="challangeName">Cooking</span>
//                         <span className="sessionMentor challangeGenre"> by Pratik Kumar</span>
//                         <span className="registered">50+ registered...</span>
//                     </div>
//                 </div>
//                 <div className="challange mentorSession">
//                     <img src="https://thumbs.dreamstime.com/b/colourful-various-herbs-spices-cooking-dark-background-herbs-spices-cooking-dark-background-113655482.jpg" alt="" />
//                     <div className="sessionDesc challangeDesc">
//                         <span className="challangeName">Cooking</span>
//                         <span className="sessionMentor challangeGenre"> by Pratik Kumar</span>
//                         <span className="registered">50+ registered...</span>
//                     </div>
//                 </div>
//                 <div className="challange mentorSession">
//                     <img src="https://thumbs.dreamstime.com/b/colourful-various-herbs-spices-cooking-dark-background-herbs-spices-cooking-dark-background-113655482.jpg" alt="" />
//                     <div className="sessionDesc challangeDesc">
//                         <span className="challangeName">Cooking</span>
//                         <span className="sessionMentor challangeGenre"> by Pratik Kumar</span>
//                         <span className="registered">50+ registered...</span>
//                     </div>
//                 </div>
//                 <div className="challange mentorSession">
//                     <img src="https://thumbs.dreamstime.com/b/colourful-various-herbs-spices-cooking-dark-background-herbs-spices-cooking-dark-background-113655482.jpg" alt="" />
//                     <div className="sessionDesc challangeDesc">
//                         <span className="challangeName">Cooking</span>
//                         <span className="sessionMentor challangeGenre"> by Pratik Kumar</span>
//                         <span className="registered">50+ registered...</span>
//                     </div>
//                 </div>

//                 <div className="link"><Link to="/groupsession" style={{textDecoration:"none", color:"black", width:"90%", height:"100%"}}><Button variant='contained' sx={{ width: "100%", height: "70%", margin: ".5rem 0px" }}>View more</Button></Link></div>
//             </div>
//         </div>
//     )
// }
