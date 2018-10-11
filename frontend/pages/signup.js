import React, { Component } from "react";
import { Input } from "antd";
import { Row, Col } from "antd";
import { Button } from "antd";
import Link from "next/link";

class Signup extends Component {
  state = {
    loading: false,
    iconLoading: false
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };
  render() {
    return (
      <div style={{ paddingTop: 280 }}>
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <h1>SignUp</h1>
          </Col>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="enter you name" type="text" />
            <div className="spacer" style={{ height: 15 }} />
          </Col>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="enter email" type="email" />
          </Col>
        </Row>
        <div className="spacer" style={{ height: 15 }} />
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="enter password" type="password" />
          </Col>
        </Row>
        <div className="spacer" style={{ height: 15 }} />
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="Confirm password" type="password" />
          </Col>
        </Row>
        <Row>
          <br />
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Link href="/">
              <a> Already have an Account?</a>
            </Link>
          </Col>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <div className="spacer" style={{ height: 15 }} />
            <Button
              type="primary"
              loading={this.state.loading}
              onClick={this.enterLoading}
            >
              Sign Up
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Signup;
