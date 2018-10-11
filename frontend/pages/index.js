import React, { Component } from "react";
import { Input } from "antd";
import { Row, Col } from "antd";
import { Button } from "antd";
import Link from "next/link";

class Index extends Component {
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
      <div style={{ paddingTop: 150 }}>
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <center>
              <h1>Something</h1>
            </center>
            <h2>Login</h2>
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
        <Row>
          <br />
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Link href="/signup">
              <a> Don't have an Account?</a>
            </Link>
          </Col>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <div className="spacer" style={{ height: 15 }} />
            <Link href="/chat">
              <Button
                type="primary"
                loading={this.state.loading}
                onClick={this.enterLoading}
              >
                Login
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Index;
