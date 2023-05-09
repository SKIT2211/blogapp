import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "@mui/material/Button";
import axoisInstance from "../../services/axoisInstance";
import { useSelector, useDispatch } from 'react-redux'

function Userdata() {
  let accessToken = JSON.parse(localStorage.getItem("AccessToken"));

  const dispatch = useDispatch()
  const { users } = useSelector((state) => state?.users);

  const [role, setRole] = useState();
  const [details, setDetails] = useState(null);


  const defaultColDef = {
    sortable: true,
    flex: 2,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  const [rowData, setRowData] = useState();
  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Number", field: "number" },
    { headerName: "Role", field: "role" },
    {
      headerName: "Actions",
      field: "_id",
      cellRendererFramework: (params) => (
        <>
          <Button
            variant="outlined"
            color="success"
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
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
 
  const getUsers = () => {
    axoisInstance.get("http://localhost:9000/users/allusers", {
      headers:{
        "Authorization": "Bearer " + accessToken
      }
    })
    .then((response) => {
      setRowData(response.data)
    });
      
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
    axoisInstance.put(`http://localhost:9000/users/allusers/${details._id}`, payload,{
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + accessToken

      }
    })
      .then((res) => {
        setDetails(null)
       return getUsers()
      });
  };

  const handleDelete = (_id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this row",
      _id
    );
    if (confirm) {
      axoisInstance.delete(`http://localhost:9000/users/allusers/${_id}`,{
        headers: {
          "Authorization": "Bearer " + accessToken
        }
      })
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
            pagination={true}
            paginationAutoPageSize={true}
          >
            {" "}
          </AgGridReact>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Change Role
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <select
                  className="form-select form-select-lg mb-3"
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
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
    }
  }
`;
export default Userdata;
