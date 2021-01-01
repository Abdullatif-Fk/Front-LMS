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
