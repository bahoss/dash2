import React, { Component } from "react";
import { Icon, Radio } from "semantic-ui-react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 2px solid #939b9c;
  border-radius: 10px;
  box-shadow: 4px 6px 12px 0px rgba(131, 230, 151, 0.75);
`;
const Autoreload = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const Span = styled.span`
  display: inline-block;
  padding: 10px;
`;

class HeaderDash extends Component {
  render() {
    return (
      <Wrapper>
        <Logo>
          <Icon name="server" size="huge" color="green" />
          <Span>
            <h2>Dashboard</h2>
          </Span>
        </Logo>
        <Autoreload>
          <Span>AutoReload</Span>
          <Radio
            toggle
            onChange={this.props.toggle}
            checked={this.props.autoReload}
          />
        </Autoreload>
      </Wrapper>
    );
  }
}

export default HeaderDash;
