import React, { Component } from "react";
import { Input } from "antd";
import { Row, Col } from "antd";
import { Button } from "antd";
import Link from "next/link";
import config from '../config.js';
import Router from 'next/router';

class Index extends Component {
  state = {
    loading: false,
    iconLoading: false
  };

  onHandleChange = (e) => {
    const something = e.target.value;
    localStorage.setItem('docid', something);
    console.log(localStorage.getItem('docid'));
  }

  enterLoading = () => {
    this.setState({ loading: true });
    fetch(`${config.apiurl}/api/Doctor/${localStorage.getItem('docid')}`)
    .then((res) => {
      console.log(res);
      if(res.status === 200){
        //Next page
        Router.push(`/profile`)
      }
      else {
        //stay here
      }
    })

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
              <h1>HealthChain</h1>
            </center>
            <h2>Login</h2>
          </Col>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="Doctor ID" type="email" onChange={this.onHandleChange} />
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
              <Button
                type="primary"
                loading={this.state.loading}
                onClick={this.enterLoading}
              >
                Login
              </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Index;
