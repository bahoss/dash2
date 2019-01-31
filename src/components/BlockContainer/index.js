import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Block from "../Block";
import { Loader } from "semantic-ui-react";

const URL = "https://novaweb.studio/dashboard/_api/projects/";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 2px solid #c3cbcc;
  border-radius: 10px;
  box-shadow: 4px 6px 12px 0px rgba(131, 230, 151, 0.75);
`;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const checkPosition = response => {
  const positionFromLocalStorage = JSON.parse(localStorage.getItem("position"));
  if (positionFromLocalStorage === null) {
    return response;
  } else if (positionFromLocalStorage.length === response.length) {
    return positionFromLocalStorage.map(position =>
      response.find(i => i.id === position)
    );
  } else if (positionFromLocalStorage.length !== response.length) {
    const getId = response.map(a => a.id);
    const checkId = (arr1, arr2) => {
      var arr = [];
      for (var i in arr1) {
        if (arr2.indexOf(arr1[i]) === -1) arr.push(arr1[i]);
      }

      return arr;
    };
    const newId = checkId(getId, positionFromLocalStorage);
    const newPosition = positionFromLocalStorage.concat(newId);
    localStorage.setItem("position", JSON.stringify(newPosition));
    return newPosition.map(position => response.find(i => i.id === position));
  } else {
    return response;
  }
};

class BlockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.getAttachment();
    setInterval(this.autoReload, 2000);
  }

  autoReload = () => {
    if (this.props.autoReload) {
      return this.getAttachment();
    } else return null;
  };

  getAttachment = () => {
    axios
      .get(URL)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      checkPosition(this.state.data),
      result.source.index,
      result.destination.index
    );
    this.setState({ data: items });
    localStorage.setItem("position", JSON.stringify(items.map(a => a.id)));
  };
  render() {
    const reorderedList = checkPosition(this.state.data);

    return (
      <Wrapper>
        {this.state.data.length === 0 ? (
          <Loader active inline="centered">
            Loading...
          </Loader>
        ) : (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable-1" type="PERSON">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "#dee4ed"
                      : "white",
                    width: "100%"
                  }}
                  {...provided.droppableProps}
                >
                  <Block data={reorderedList} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            ;
          </DragDropContext>
        )}
      </Wrapper>
    );
  }
}

export default BlockList;
