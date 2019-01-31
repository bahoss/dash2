import React, { Component } from "react";
import HeaderDash from "../Header";
import BlockList from "../BlockContainer";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 15px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoReload: false
    };
  }
  toggle = () =>
    this.setState(prevState => ({ autoReload: !prevState.autoReload }));
  render() {
    return (
      <Wrapper>
        <Grid columns={2} centered>
          <Grid.Row>
            <Grid.Column>
              <HeaderDash
                toggle={this.toggle}
                autoReload={this.state.autoReload}
              />
              <BlockList autoReload={this.state.autoReload} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    );
  }
}

export default App;
