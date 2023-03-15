import React, {useEffect, useState} from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


function Userdata() {
  const [rowData, setRowData] = useState()
  const [columnDefs, setColumnDefs] = useState([
    {headerName: "ID", field:"id", sortable: true, filter: true},
    {headerName: "Name", field:"name", sortable: true, filter: true},
    {headerName: "Email", field:"email", sortable: true, filter: true},
    {headerName: "Number", field:"number", sortable: true, filter: true},
    {headerName: "Password", field:"password", sortable: true, filter: true}
  ])
  
  useEffect(() => {
    fetch("http://localhost:5000/userDetails")
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, [])

    return (
      
   
      <div className="ag-theme-alpine" style={{width: 1030, height: 500, margin:'0 auto'}}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} animateRows={true}> </AgGridReact>
      </div>
        
    )
  }
export default Userdata;


