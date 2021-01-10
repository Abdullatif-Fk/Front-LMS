/* eslint react/prop-types: 0 */

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Spinner } from "react-bootstrap";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Admins/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import "./AdminsStyle.scss";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);
export default function Admins() {
  //const [id, setId] = useState("falsee");
  const [arr, setArray2] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [Pagination, setPagination] = useState({
    data: admins.map((value) => ({
      id: value.id,
      admin_name: value.admin_name,
      phone_number: value.phone_number,
      email: value.email,
      picture: value.picture,
    })),
    offset: 0,
    numberPerPage: 2,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    try {
      fetch("http://localhost:8000/api/Fetch_Admins", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status != 400) {
            console.log(json.message);
            setPagination({
              data: json.message.map((value) => ({
                id: value.id,
                admin_name: value.admin_name,
                phone_number: value.phone_number,
                email: value.email,
                picture: value.picture,
              })),
              offset: 0,
              numberPerPage: 2,
              pageCount: 0,
              currentData: [],
            });
            setAdmins(
              json.message.map((value) => ({
                id: value.id,
                admin_name: value.admin_name,
                phone_number: value.phone_number,
                email: value.email,
                picture: value.picture,
              }))
            );
          } else
            toast.error(json.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

          setLoading(1);
        });
    } catch (err) {
      console.log(err);
    }
  }, [arr]);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(
        Pagination.offset,
        Pagination.offset + Pagination.numberPerPage
      ),
    }));
  }, [Pagination.numberPerPage, Pagination.offset, Pagination.data]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * Pagination.numberPerPage;
    setCurrentPage(selected);
    setPagination({ ...Pagination, offset });
  };

  const classess = useStyles();
  if (loading == 0) {
    return (
      <div style={{ position: "absolute", left: "50%" }}>
        <div
          style={{
            position: "relative",
            left: "-50%",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  } else {
    if (Pagination.data.length == 0) return <Col>No admins</Col>;
    else
      return (
        <GridContainer>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classess.cardTitleWhite}>Admins Table</h4>
                <p className={classess.cardCategoryWhite}>
                  Here is a subtitle for this table
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Picture",
                    "Name",
                    "phone_number",
                    "email",
                    "Delete",
                  ]}
                  tableData={Pagination.currentData && Pagination.currentData}
                  arr={arr}
                  setArray2={setArray2}
                  setCurrentPage={setCurrentPage}
                  setPagination={setPagination}
                  Pagination={Pagination}
                />
              </CardBody>
            </Card>
          </GridItem>
          <ReactPaginate
            previousLabel={" ← Previous"}
            nextLabel={"Next → "}
            pageCount={Pagination.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            forcePage={currentPage}
          />
        </GridContainer>
      );
  }
}
