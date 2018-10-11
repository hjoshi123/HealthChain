import React, { Component } from "react";
import { Avatar } from "antd";
import { Row, Col } from "antd";
import { Checkbox } from "antd";
import { Slider, InputNumber } from "antd";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      BountySetter: false,
      inputValue: 1
    };
  }
  onChange = (e, value) => {
    this.setState({ BountySetter: e.target.checked });
    this.setState({ inputValue: value });
  };
  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <Row>
          <Col
            xs={{ span: 12, offset: 6 }}
            lg={{ span: 22, offset: 10 }}
            style={{ paddingTop: "20px" }}
          >
            <Avatar size={64} icon="user" />
          </Col>
          <Col
            xs={{ span: 12, offset: 6 }}
            lg={{ span: 21, offset: 0 }}
            style={{ paddingTop: "20px" }}
          >
            <h1 style={{ textAlign: "center" }}>Aditya Gupta</h1>
            <h2 style={{ textAlign: "center" }}>Bounty setter?</h2>
            <Col
            xs={6}
            lg={6}
            style={{ paddingTop: "20px" }}>
            <Checkbox onChange={this.onChange}>Checkbox</Checkbox>
            </Col>
            {this.state.BountySetter && (
              <Col
            xs={6}
            lg={6}
            style={{ paddingTop: "20px" }}
          >
                <Slider
                  min={1}
                  max={20}
                  onChange={this.onChange}
                  value={typeof inputValue === "number" ? inputValue : 0}
                />
              </Col>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Profile;
