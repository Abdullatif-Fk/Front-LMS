/* eslint react/prop-types: 0 */

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { toast } from "react-toastify";
import EditID from "../../../store/actions/EditID";
import { useDispatch } from "react-redux";
import { Wrap } from "../globalStyle/global.js";

import TableCell from "@material-ui/core/TableCell";
// core components
import { Image, Modal, Button, Spinner } from "react-bootstrap";
import { Suspense, lazy, useState } from "react";

import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);
let ModalEdit = () => <></>;

export default function CustomTable(props) {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [showDelete, setShowDelete] = useState(false);
  const [idDelete, setidDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    Promise.resolve()
      .then(() => {
        setidDelete(id);
      })
      .then(() => {
        console.log(idDelete);
        setShowDelete(true);
      });
  };
  const [OpenForm, setOpenForm] = useState(false);

  const handleClose = () => setOpenForm(!OpenForm);
  const {
    tableHead,
    tableData,
    tableHeaderColor,

    ID,
    arr,
    setArray2,
    setCurrentPage,

    setPagination,
    Pagination,
  } = props;
  const del = (id) => {
    try {
      fetch(`http://localhost:8000/api/Delete_Student/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          toast.info(json.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if (json.status == 400) {
            toast.error(json.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            const newList = Pagination.data.filter((item) => item.id !== id);

            setPagination({
              data: newList,
              offset: 0,
              numberPerPage: 2,
              pageCount: 0,
              currentData: [],
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  async function toggleModalForm() {
    ModalEdit = await lazy(() => import("./ModalEdit"));

    setOpenForm(!OpenForm);
    console.log(OpenForm);
  }

  return (
    <Wrap className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                    style={{ fontSize: "large" }}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}

        {tableData && (
          <TableBody>
            {console.log(tableData)}
            {tableData.map((prop, key) => {
              return (
                prop.id && (
                  <TableRow key={key} className={classes.tableBodyRow}>
                    {prop.id ? (
                      <TableCell className={classes.tableCell} key={prop.id}>
                        {prop.picture ? (
                          <Image
                            width={100}
                            height={100}
                            src={"http://localhost:8000/" + prop.picture}
                            rounded
                          />
                        ) : (
                          ""
                        )}
                      </TableCell>
                    ) : (
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    )}

                    <TableCell
                      className={classes.tableCell}
                      key={prop.student_name}
                    >
                      {prop.student_name && prop.student_name}{" "}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      key={prop.class_name + prop.id}
                    >
                      {prop.class_name + "(" + prop.class_id + ")"}{" "}
                    </TableCell>

                    <TableCell
                      className={classes.tableCell}
                      key={prop.section_name + prop.id}
                    >
                      {prop.section_name + "(" + prop.section_id + ")"}{" "}
                    </TableCell>

                    <TableCell className={classes.tableCell} key={key + "555"}>
                      <button
                        className="btn btn-info mr-3"
                        onClick={() => {
                          dispatch(EditID(prop.id));
                          toggleModalForm();
                        }}

                        // onClick={async () => {
                        //    handleShow(item.id);
                        //    setId(item.id);
                        // }}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell className={classes.tableCell} key={key + "222"}>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleShowDelete(prop.id);
                          // del(prop.id);
                          // setCurrentPage(0);
                        }}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                )
              );
            })}
          </TableBody>
        )}
      </Table>
      <Suspense fallback={null}>
        <ModalEdit
          show={OpenForm}
          handleClose={handleClose}
          id={ID}
          arr={arr}
          setArray2={setArray2}
          setCurrentPage={setCurrentPage}
        />

        <Modal show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                console.log(idDelete);
                handleCloseDelete();
                del(idDelete);
                setCurrentPage(0);
              }}
            >
              Delete
            </Button>

            <Button variant="primary" onClick={handleCloseDelete}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Suspense>
    </Wrap>
  );
}
