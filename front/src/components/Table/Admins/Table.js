/* eslint react/prop-types: 0 */

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { toast } from "react-toastify";
import { Wrap } from "../globalStyle/global.js";

import TableCell from "@material-ui/core/TableCell";
// core components
import { Modal, Button, Image } from "react-bootstrap";
import { Suspense, useState } from "react";

import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
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
  const {
    tableHead,
    tableData,
    tableHeaderColor,

    setCurrentPage,

    setPagination,
    Pagination,
  } = props;

  const del = (id) => {
    try {
      fetch(`http://localhost:8000/api/Delete_Admin/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
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
            toast.info(json.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
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
            {tableData.map((prop, key) => {
              return (
                "Picture",
                "Name",
                "phone_number",
                "email",
                "Delete",
                prop.id && (
                  <TableRow key={key} className={classes.tableBodyRow}>
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

                    <TableCell className={classes.tableCell} key={prop.name}>
                      {prop.admin_name && prop.admin_name}{" "}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      key={prop.phone_number}
                    >
                      {prop.phone_number && prop.phone_number}{" "}
                    </TableCell>
                    <TableCell className={classes.tableCell} key={prop.email}>
                      {prop.email && prop.email}{" "}
                    </TableCell>

                    <TableCell className={classes.tableCell} key={key + "11"}>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleShowDelete(prop.id);
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
