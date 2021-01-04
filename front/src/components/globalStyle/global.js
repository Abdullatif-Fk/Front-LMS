import styled from "styled-components";
import { ListGroup } from "react-bootstrap";

export const Wrap = styled(ListGroup)`
  display: grid;
  grid-template-columns: auto;
  li {
    color: grey;
  }
  .active,
  .previous,
  .next {
    color: black;
  }
  .pagination {
    justify-self: center;
  }
  .pagination > li {
    font-size: 0.9rem;
    margin: 0.5rem;

    cursor: pointer;
  }
  .row:nth-child(even) {
    background: #dcdcdc;
  }
  .row div {
    padding: 10px;
  }
`;
export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background: #e8e8e8;
  }

  tr td button {
    margin-bottom: 5px;
  }
  img {
    width: 50px;
    height: 50px;
  }
`;
