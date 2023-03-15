import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AlertDialog from './Dialog';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { Modal } from '@mui/material';



function Blogpart() {
  const [rowData, setRowData] = useState()
  const [columnDefs, setColumnDefs] = useState([
    {headerName: "ID", field:"id"},
    {headerName: "Title", field:"title"},
    {headerName: "Description", field:"description"},
    {headerName: "Author", field:"author"},
    {headerName: "Category", field:"category"}
  ])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData]=useState({title:"",description:'',category:''})

  const defaultColDef = {
    sortable : true,
    flex: 2, filter: true,
    floatingFilter : true
  }

  useEffect(() => {
    fetch("http://localhost:5000/Blogs")
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, [])

  const onChange=(e)=>{
    const {value,id}=e.target

    setFormData({...formData,[id]:value})
  }
    return (
      <>
      <div style={{margin:"10px"}}>
      <Box align="right">
        <Button variant='contained' color='primary' onClick={handleClickOpen}>Add Blog</Button>
      </Box>
      <AlertDialog open={open} handleClose={handleClose} data={formData} onChange={onChange}/>
      </div>
      <Wrapper>
      
      <div className="ag-theme-alpine" style={{width: 1030, height: 500, margin:'0 auto'}}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} animateRows={true} defaultColDef={defaultColDef}> </AgGridReact>
      </div>
      </Wrapper>
      </>
    )
  }


  const Wrapper = styled.section`{
    .ag-theme-alpine {
      --ag-foreground-color: rgb(126, 46, 132);
      --ag-background-color: rgb(249, 245, 227);
      --ag-header-foreground-color: rgb(204, 245, 172);
      --ag-header-background-color: #44006b;
      --ag-odd-row-background-color: rgb(0, 0, 0, 0.03);
      --ag-header-column-resize-handle-color: #ad1fff;
  
      --ag-font-size: 17px;
      // --ag-font-family: monospace;
  }
  }`;
export default Blogpart;

