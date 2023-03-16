import * as React from 'react';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const BlogDetails = () => {
        
    const params = useParams()

    const resultData = (id) => {
        console.log(params.id);
        fetch("http://localhost:5000/Blogs"+ `/${id}`)
          .then(result => result.json())
        
        
      }
   console.log(resultData);
const card = (
  <React.Fragment>
    <CardContent sx={{ textAlign: "center"}}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day  {params.id}
      </Typography>
      <Typography variant="h5" component="div">
        benevolent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
  </React.Fragment>
);

  return (
    <>
    <div>
        {params.id}
    </div>
    <Box sx={{ maxWidth: 1000 , margin: "0 auto"}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  </>
  )
}

export default BlogDetails