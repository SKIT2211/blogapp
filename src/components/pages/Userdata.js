import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "@mui/material/Button";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

let user = JSON.parse(localStorage.getItem("Loggedinuser"));

function Userdata() {
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [role, setRole] = useState();
  const [details, setDetails] = useState(null);

  const [gridApi, setGridApi] = useState(null);

  const defaultColDef = {
    sortable: true,
    flex: 2,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  const [rowData, setRowData] = useState();
  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Number", field: "number" },
    { headerName: "Role", field: "role" },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => changeRole(params.data)}
          >
            <div data-bs-toggle="modal" data-bs-target="#exampleModal">
              Role
            </div>
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(params.value)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch("http://localhost:5000/UserDetails")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  };
  const changeRole = (data) => {
    setRole(data?.role);
    setDetails(data);
  };

  const roleChangeHandler = () => {
    let payload = {
      name: details.name,
      email: details.email,
      number: details.number,
      password: details.password,
      role: role,
    };
    fetch(`http://localhost:5000/UserDetails/${details.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((resp) => {
        setDetails(null)
       return getUsers()
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this row",
      id
    );
    if (confirm) {
      fetch(`http://localhost:5000/UserDetails/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getUsers());
    }
  };
  return (
    <>
      <Wrapper>
        <div
          className="ag-theme-alpine"
          style={{ width: 1250, height: 500, margin: "0 auto" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            paginationAutoPageSize={true}
          >
            {" "}
          </AgGridReact>
        </div>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Change Role
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => roleChangeHandler()}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
   {
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
  }
`;
export default Userdata;