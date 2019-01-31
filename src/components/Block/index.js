import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import Comment from "../Comment";
import { Icon, Header, Grid } from "semantic-ui-react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding-right: 10px;
  box-shadow: 4px 6px 12px 0px rgba(131, 230, 151, 0.75);
  align-items: center;
`;

class Block extends Component {
  render() {
    return (
      <>
        {this.props.data.map((data, index) => (
          <Draggable key={data.id} draggableId={data.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  textAlign: "center"
                }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Wrapper>
                  <Grid
                    celled="internally"
                    textAlign="center"
                    verticalAlign="middle"
                  >
                    <Grid.Row>
                      <Grid.Column width={2}>
                        {!data.result || typeof data.result === "string" ? (
                          <Icon
                            fitted
                            name="times circle"
                            size="big"
                            color="red"
                          />
                        ) : (
                          <Icon
                            name="check circle outline"
                            size="big"
                            color="green"
                          />
                        )}
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Header as="h2">{data.title}</Header>
                        {data.type === "website" &&
                        typeof data.result === "string" ? (
                          <span>{data.result}</span>
                        ) : (
                          ""
                        )}
                      </Grid.Column>
                      <Grid.Column width={5}>
                        <Header as="h5">
                          Comment:{" "}
                          {data.comment.length === 0 ? "..." : data.comment}
                        </Header>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Comment id={data.id} title={data.title} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Wrapper>
              </div>
            )}
          </Draggable>
        ))}
      </>
    );
  }
}
export default Block;
