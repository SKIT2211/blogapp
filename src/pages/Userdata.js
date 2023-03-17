import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';


function Userdata() {

  const [gridApi, setGridApi] = useState(null)
  
  const defaultColDef = {
    sortable: true,
    flex: 2, filter: true,
    floatingFilter: true
  }
  const [rowData, setRowData] = useState()
  const [columnDefs, setColumnDefs] = useState([
    {headerName: "ID", field:"id"},
    {headerName: "Name", field:"name"},
    {headerName: "Email", field:"email"},
    {headerName: "Number", field:"number"},
    {headerName: "Role", field:"role"},
    {
      headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
        {/* <Button variant='outlined' color='primary'  > Role</Button> */}
        <Button variant='outlined' color='secondary' onClick={()=> handleDelete(params.value)}>Delete</Button>
      </div>
    }
  ])
  
  

  const onGridReady = (params) => {
    setGridApi(params)
  }

  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = () => {
    fetch("http://localhost:5000/UserDetails")
      .then(result => result.json())
      .then(rowData => setRowData(rowData))

  }
  // const changeRole = (id) => {


  //   let payload = {
  //     role:"Admin"
  //   }
  //   fetch("http://localhost:5000/UserDetails" + `/${id}`,
  //     { 
  //       method: 'PUT',
  //       body: JSON.stringify(role),
  //       headers: {
  //         'content-type': 'application/json'
  //       }
  //    })
  //     .then(resp => resp.json())
  //     .then(resp => getUsers())
  // }

  const handleDelete = (id) => {
    fetch("http://localhost:5000/UserDetails" + `/${id}`,
      { method: 'DELETE' })
      .then(resp => resp.json())
      .then(resp => getUsers())
  }
    return (
      <>
      <Wrapper>

      <div className="ag-theme-alpine" style={{ width: 1250, height: 500, margin: '0 auto' }}>
        <AgGridReact 
          rowData={rowData}
          columnDefs={columnDefs}  
          animateRows={true} 
          defaultColDef={defaultColDef} 
          onGridReady={onGridReady}
          pagination={true}
          paginationAutoPageSize={true}> </AgGridReact>
      </div>
    </Wrapper>
  </>
    )
  }

  const Wrapper = styled.section`{
    .ag-theme-alpine {
      --ag-foreground-color: rgb(20, 14, 132);
      --ag-background-color: rgb(249, 245, 227);
      --ag-header-foreground-color: rgb(204, 24, 172);
      --ag-header-background-color: #44006b;
      --ag-odd-row-background-color: rgb(0, 0, 0, 0.03);
      --ag-header-column-resize-handle-color: #ad1fff;
  
      --ag-font-size: 17px;
      // --ag-font-family: monospace;
  }
  }`;
export default Userdata;


