/* eslint react/prop-types: 0 */

import React, { Suspense, useEffect, useState, lazy } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

// import EditID from "../../store/actions/EditID";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col, Spinner } from "react-bootstrap";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Classes/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import "./SectionsStyle.scss";

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
let AddModal = () => <></>;
export default function Students() {
  async function toggleModalForm2(e) {
    console.log(e);
    AddModal = await lazy(() => import("./AddModal"));
    setOpenForm2(!OpenForm2);
  }

  const [OpenForm2, setOpenForm2] = useState(false);

  // const handleClose = () => setOpenForm(!OpenForm);
  const handleClose2 = () => setOpenForm2(!OpenForm2);

  //const [id, setId] = useState("falsee");
  const [arr, setArray2] = useState(0);
  const [loading, setLoading] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [classes, Setclasses] = useState([]);

  // const dispatch = useDispatch();

  const searchInput = useSelector((state) => {
    console.log(state);
    return state.Searching.search;
  });

  const [Pagination, setPagination] = useState({
    data: classes.map((value) => ({
      id: value.ID,
      name: value.name,
    })),
    offset: 0,
    numberPerPage: 2,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    try {
      fetch("http://localhost:8000/api/Classes", {
        method: "get",
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
                id: value.ID,
                name: value.name,
              })),
              offset: 0,
              numberPerPage: 2,
              pageCount: 0,
              currentData: [],
            });
            Setclasses(
              json.message.map((value) => ({
                id: value.ID,
                name: value.name,
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
    if (searchInput != "") {
      try {
        if (
          classes.filter((item) => {
            return String(item.name).includes(String(searchInput));
          }).length > 0
        ) {
          setPagination({
            data: classes
              .filter((item) => {
                return String(item.name).includes(String(searchInput));
                //||
                // String(item.description).includes(String(searchInput))
              })
              .map((value) => ({
                id: value.id,
                name: value.name,
              })),
            offset: 0,
            numberPerPage: 2,
            pageCount: 0,
            currentData: [Pagination.data],
          });
          setCurrentPage(0);
        } else {
          toast.info("Couldn't find any class", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setPagination({
            data: classes,
            offset: 0,
            numberPerPage: 2,
            pageCount: 0,
            currentData: [Pagination.data],
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [searchInput]);

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
    if (Pagination.data.length == 0)
      return (
        <Col>
          <Row>
            <Col className="left mb-2 text-center m-auto">
              <button
                className="btn btn-primary btn-circle btn-xl"
                onClick={toggleModalForm2}
              >
                Add New Class
              </button>
            </Col>
          </Row>
          <Row>
            <Col sm={5}></Col>
            <Col sm={2}>No Classes</Col>
            <Col sm={5}></Col>
          </Row>

          <Suspense fallback={null}>
            <AddModal
              show={OpenForm2}
              handleClose={handleClose2}
              arr={arr}
              setArray2={setArray2}
            />
          </Suspense>
        </Col>
      );
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
                <h4 className={classess.cardTitleWhite}>Students Table</h4>
                <p className={classess.cardCategoryWhite}>
                  Here is a subtitle for this table
                </p>
                <Row>
                  <Col className="left mb-2 text-center m-auto">
                    <button
                      className="btn btn-primary btn-circle btn-xl"
                      onClick={toggleModalForm2}
                    >
                      Add New Class
                    </button>
                  </Col>
                </Row>

                <Suspense fallback={null}>
                  <AddModal
                    show={OpenForm2}
                    handleClose={handleClose2}
                    arr={arr}
                    setArray2={setArray2}
                    setCurrentPage={setCurrentPage}
                  />
                </Suspense>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Name", "Edit", "Delete"]}
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
