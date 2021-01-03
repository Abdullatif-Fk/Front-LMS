import styled from "styled-components";
import { Col } from "react-bootstrap";
export const WrapApp = styled.div`
  a {
    color: white;
  }
`;

export const ForSide = styled(Col)`
  @media only screen and (max-width: 700px) {
    #sidebarCollapse {
      position: ${(props) =>
        props.SideBarClass == "active" ? "absolute" : "relative"};
      right: 5px;
    }
  }
`;
