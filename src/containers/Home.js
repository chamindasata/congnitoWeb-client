import React, { Component } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      testApiCall: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const testApiCall = await this.testApiCall();
      this.setState({ testApiCall });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  testApiCall() {
    return API.get("testApiCall", "/todos");
  }

  renderTestAPI(testApiCall) {
    console.log(testApiCall);
    return testApiCall.message;
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Test web app</h1>
        <p>A simple react test app</p>
      </div>
    );
  }

  renderTest() {
    this.renderTestAPI(this.state.testApiCall);
    return (
      <div className="test">
        <h2>ToDos</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Text</th>
              <th>createdAt</th>
              <th>updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {this.state.testApiCall.map(todos => {
              return (
                <tr key={todos.id}>
                  <td>{todos.text}</td>
                  <td>{todos.createdAt}</td>
                  <td>{todos.updatedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderTest() : this.renderLander()}
      </div>
    );
  }
}
