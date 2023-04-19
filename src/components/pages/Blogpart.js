import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BlogDialog from "../dialog/BlogDialog";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import axios from "axios";

function Blogpart() {
  let user = JSON.parse(localStorage.getItem("Loggedinuser"));
  user = user?.data ;

  const initialValue = { title: "", description: "", author: "", category: "", picture:"", userId: user?._id};
  const [formData, setFormData] = useState(initialValue);
  const [open, setOpen] = React.useState(false);
  const defaultColDef = {
    sortable: true,
    flex: 2,
    filter: true,
    floatingFilter: true,
    resizable: true
  };

  const TitleViewer = (pdata) => {
      return (
        <>
          <Link to={`http://localhost:3000/blogs/${pdata?.data?._id}`} >
            {pdata.value}
          </Link>
        </>
      )
  };

  const [rowData, setRowData] = useState();
  const columnDefs = [
    { headerName: "Title", field: "title",minWidth:300, cellRenderer: TitleViewer },
    { headerName: "Description", field: "description" ,minWidth:300},
    { headerName: "Author", field: "author",minWidth:40 },
    { headerName: "Category", field: "category",minWidth:40 },

    {
      headerName: "Actions",
      field: "_id",
      minWidth:250,
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

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    axios.get("http://localhost:9000/blogs/allblogs")
      .then((response) => setRowData(response.data));
  };

  const onChange = (e) => {
    const { value, id} = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  const handleDelete = (_id) => {
    const confirm = window.confirm(`Are you sure you want to delete this blog with id : ${_id}`)
    if (confirm) {
      axios.delete(`http://localhost:9000/blogs/allblogs/${_id}`)
        .then((resp) => getUsers());
    }
  };


  const handleFormSubmit = () => {
    const data = new FormData() 
    data.append('file', formData.picture)
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('author', formData.author)
    data.append('category', formData.category)
    data.append('userId', formData.userId)
    
    if (formData._id) {
      axios.put(`http://localhost:9000/blogs/allblogs/${formData._id}`, data)
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
        });
    } else {
      axios.post("http://localhost:9000/blogs/addblog", data)
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
          <div >
            <Box align="right">
              {user?.role === "Admin" ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px" }}
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
              setFormData={setFormData}
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
      --ag-background-color: rgb(35, 25, 65);
      --ag-header-foreground-color: rgb(204, 245, 172);
      --ag-header-background-color: #44006b;
      --ag-odd-row-background-color: rgb(0, 0, 0, 0.03);
      --ag-header-column-resize-handle-color: #ad1fff;
      --ag-font-size: 17px;
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
