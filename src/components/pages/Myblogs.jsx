import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { REACT_FRONT_BASE_URL } from "../../constants/constant";
import { APIS } from "../../constants/constant";

function Myblogs() {
  let user = JSON.parse(localStorage.getItem("Loggedinuser"));
  user = user?.data;
  const userIdBlogViewer = async (_id) => {
    let result = await axios.get(`${APIS.BLOGS_API}/myblogs/${user._id}`);
    let userData = result.data;

    setRowData(userData);
  };

  const TitleViewer = (pdata) => {
    if (user) {
      return (
        <>
          <Link to={`${REACT_FRONT_BASE_URL}/blogs/${pdata?.data?._id}`}>
            {pdata.value}
          </Link>
        </>
      );
    } else {
      return <Link to={`/login`}>{pdata.value}</Link>;
    }
  };

  const defaultColDef = {
    sortable: true,
    flex: 2,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  const [rowData, setRowData] = useState();
  const columnDefs = [
    { headerName: "Title", field: "title", cellRenderer: TitleViewer },
    { headerName: "Description", field: "description" },
    { headerName: "Author", field: "author" },
    { headerName: "Category", field: "category" },
  ];

  useEffect(() => {
    userIdBlogViewer();
  }, []);

  return (
    <>
      <Wrapper>
        <div className="all-background">
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
      .all-background {
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
export default Myblogs;
