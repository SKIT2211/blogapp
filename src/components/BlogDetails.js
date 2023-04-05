import * as React from 'react';
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';


const BlogDetails = () => {
        
    const params = useParams()
    const handleCloseHome = () =>{
      navigate('/')
    }
    const handleCloseAllBlog = () =>{
      navigate('/blogpart')
    }

    const [post , setPost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      fetch(`http://localhost:5000/Blogs/${params.id}`)
      .then(response => response.json())
      .then(json =>setPost(json))
      
    }, []);

const card = (
  <React.Fragment>
    <CardContent sx={{ textAlign: "center", margin:"10px"}}>
    <Button sx={{ marginRight:"900px"}}
                color="info"
                onClick={() => handleCloseAllBlog()}
              >
               <img src='https://img.icons8.com/office/1x/u-turn-to-left.png'></img>  All Blogs
              </Button>
    <Button sx={{ marginLeft:"900px"}}
                color="primary"
                onClick={() => handleCloseHome()}
              >
               <img src='https://img.icons8.com/office/1x/close-window--v1.png' alt='close' ></img>
              </Button>
      <Typography variant="h3" sx={{ mb: 1.5  }} component="div">
      {post.title}
      </Typography>
      <Typography sx={{ fontSize: 20 ,mb: 1.5 }} color="text.secondary">
      {post.description}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 20 }}>
      Author : {post.author}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 20 }}>
      Category : {post.category}
      </Typography>
    </CardContent>
  </React.Fragment>
);

  return (
    <>
    <Wrapper>
    <div className="theme">
    <Box  sx={{ maxWidth: 1100 , height:"100vh" , margin: "0 auto"}}>
      <Card variant="outlined">{card}</Card>
    </Box>
    </div>
    </Wrapper>
  </>
  )
}


const Wrapper = styled.section`{
  .theme {
    
    background-color: hsl(218, 41%, 15%);
    background-image: radial-gradient(
        650px circle at 0% 0%,
        hsl(218, 41%, 35%) 15%,
        hsl(218, 41%, 30%) 35%,
        hsl(218, 41%, 20%) 75%,
        hsl(218, 41%, 19%) 80%,
        transparent 100%
      ),
      radial-gradient(
        1250px circle at 100% 100%,
        hsl(218, 41%, 45%) 15%,
        hsl(218, 41%, 30%) 35%,
        hsl(218, 41%, 20%) 75%,
        hsl(218, 41%, 19%) 80%,
        transparent 100%
      );
  
}
}`;
export default BlogDetails