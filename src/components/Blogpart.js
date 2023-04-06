import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BlogDialog from "./BlogDialog";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

function Blogpart() {
  let user = JSON.parse(localStorage.getItem("Loggedinuser"));

  const initialValue = { title: "", description: "", author: "", category: "", userId: user?._id };
  const [formData, setFormData] = useState(initialValue);
  const [gridApi, setGridApi] = useState(null);
  const [open, setOpen] = React.useState(false);
  const defaultColDef = {
    sortable: true,
    flex: 2,
    filter: true,
    floatingFilter: true,
    resizable: true
  };

  const TitleViewer = (pdata) => {

    if (user) {
      return (
        <>
          <Link to={`http://localhost:3000/blogs/${pdata?.data?._id}`} >
            {pdata.value}
          </Link>
        </>
      );

    }
    else {
      return <Link to={`/login`} >
        {pdata.value}
      </Link>
    }
  };

  const [rowData, setRowData] = useState();
  const columnDefs = [
    { headerName: "ID", field: "_id" },
    { headerName: "Title", field: "title", cellRenderer: TitleViewer },
    { headerName: "Description", field: "description" },
    { headerName: "Author", field: "author" },
    { headerName: "Category", field: "category" },

    {
      headerName: "Actions",
      field: "_id",
      cellRendererFramework: (params) => {
        if (user?.role === "Admin") {
          return (
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleUpdate(params.data)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(params.value)}
              >
                Delete
              </Button>
            </div>
          );
        } else {
          return <div></div>;
        }
      },
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    fetch("http://localhost:9000/blogs/allblogs")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  };

  const onChange = (e) => {
    const { value, id } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  const handleDelete = (_id) => {
    const confirm = window.confirm("Are you sure you want to delete this row", _id)
    if (confirm) {
      fetch(`http://localhost:9000/blogs/allblogs/${_id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getUsers());
    }
  };


  const handleFormSubmit = () => {
    if (formData._id) {
      fetch(`http://localhost:9000/blogs/allblogs/${formData._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
        });
    } else {
      fetch("http://localhost:9000/blogs/addblog", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
        });
    }
  };

  return (
    <>
      <Wrapper>
        <div className="all-background">
          <div style={{ margin: "10px" }}>
            <Box align="right">
              {user?.role === "Admin" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Add Blog
                </Button>
              ) : (
                <div></div>
              )}
            </Box>
            <BlogDialog
              open={open}
              handleClose={handleClose}
              data={formData}
              onChange={onChange}
              handleFormSubmit={handleFormSubmit}
            />
          </div>

          <div
            className="ag-theme-alpine"
            style={{ width: 1300, height: 500, margin: "0 auto" }}
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
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
   {
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

    {
      .all-background{
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
    }
  }
`;
export default Blogpart;
