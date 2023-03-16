import React, { useCallback, useEffect, useState } from 'react'
import styled from "styled-components";
import {Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import BlogDialog from './BlogDialog';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { Modal } from '@mui/material';



function Blogpart() {
  const initialValue = { title: "", description: '', author: '', category: '' };
  const [formData, setFormData] = useState(initialValue)
  const [gridApi, setGridApi] = useState(null)
  const [open, setOpen] = React.useState(false);
  const defaultColDef = {
    sortable: true,
    flex: 2, filter: true,
    floatingFilter: true
  }
  const TitleViewer = (pdata) => {

    return(
      <>
      <Link to={`/blogs/${pdata.data.id}`} >{pdata.value}</Link>
      
      </>
    )
  }

  const [rowData, setRowData] = useState()
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "ID", field: "id"  },
    { headerName: "Title", field: "title" , cellRenderer: TitleViewer},
    { headerName: "Description", field: "description"},
    { headerName: "Author", field: "author"},
    { headerName: "Category", field: "category" },
    {
      headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
        <Button variant='outlined' color='primary' onClick={() => handleUpdate(params.data)}>Update</Button>
        <Button variant='outlined' color='secondary' onClick={() => handleDelete(params.value)}>Delete</Button>
      </div>
    }
  ])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const onGridReady = (params) => {
    setGridApi(params)
  }

  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = () => {
    fetch("http://localhost:5000/Blogs")
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
    
  }

  const onChange = (e) => {
    const { value, id } = e.target

    setFormData({ ...formData, [id]: value })
  }

  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/Blogs/${id}`,
      { method: 'DELETE' })
      .then(resp => resp.json())
      .then(resp => getUsers())
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      fetch(`http://localhost:5000/Blogs/${formData.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(formData),
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }

    else {
      fetch("http://localhost:5000/Blogs",
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }



  return (
    <>
      <div style={{ margin: "10px" }}>
        <Box align="right">
          <Button variant='contained' color='primary' onClick={handleClickOpen}>Add Blog</Button>
        </Box>
        <BlogDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
      </div>
      <Wrapper>

        <div className="ag-theme-alpine" style={{ width: 1250, height: 500, margin: '0 auto' }}>
          <AgGridReact 
              rowData={rowData} 
              columnDefs={columnDefs} 
              animateRows={true} 
              defaultColDef={defaultColDef} 
              onGridReady={onGridReady}
              pagination={true}
              paginationAutoPageSize={true}
            > </AgGridReact>
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

