import React, { Component } from "react";
import axios from "axios";
import { Icon, Header, Button, Modal, Form, TextArea } from "semantic-ui-react";

const URL = "https://novaweb.studio/dashboard/_api/projects/";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      modalOpen: false,
      id: ""
    };
  }
  valueComment = event => {
    this.setState({ comment: event.target.value, id: event.target.name });
  };

  submitComment = event => {
    axios
      .patch(`${URL}${this.state.id}`, {
        comment: this.state.comment
      })
      .catch(error => {
        console.log(error);
      });
    this.handleClose();
    this.setState({ comment: "" });
  };

  disabledButton = () => {
    if (this.state.comment.length === 0) {
      return <Button disabled>Disabled</Button>;
    } else {
      return (
        <Button color="green" onClick={this.submitComment}>
          <Icon name="checkmark" /> Submit
        </Button>
      );
    }
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <>
        <Modal
          trigger={
            <Button size="small" color="green" onClick={this.handleOpen}>
              Comment
            </Button>
          }
          onClose={this.handleClose}
          open={this.state.modalOpen}
          closeIcon
        >
          <Header>Add Comment to {this.props.title}</Header>
          <Modal.Actions>
            <Form>
              <TextArea
                name={this.props.id}
                onChange={this.valueComment}
                placeholder="Comment..."
                style={{ minHeight: 100 }}
              />
            </Form>
            {this.disabledButton()}
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}
export default Comment;
