import React, { Component } from "react";
import { Menu, Icon, Row, Card } from 'antd';
import config from '../config';
import Router from 'next/router';
import Link from 'next/link';

import { Drawer, Button, Avatar, List, Col} from 'antd';

class RecordDetails extends Component {
  state = {
    visible: false,
    fullName: 'Doctor Full',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    email: '',
    profileId: '',
    dateOfBirth: '',
    name: 'Doctor',
    desc: '',
    location: '',
    doc: '',
    medRecords: [],
  }

  componentDidMount() {
    const query = this.props.url.query.name;
    fetch(`${config.apiurl}/api/Doctor_profile/${localStorage.getItem('docid')}`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response.ImageURL);
        this.setState({
          name: response.firstName,
          imageUrl: `${response.ImageURL}`,
          fullName: `${response.firstName} ${response.lastName}`,
          email: response.EmailAddress,
          profileId: response.profile_id,
          dateOfBirth: `${response.Dob}`
        });
      });
    
    fetch(`${config.apiurl}/api/Medical_Record/${query}`)
      .then((res) => {
          return res.json();
      })
      .then((response) => {
        this.setState({
            desc: response.description,
            location: response.location,
            doc: response.DoctorId,
        });
      });
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
    
  };
  
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleClick = (e) => {
    if (e.key === 'mail') {
      this.setState({
        visible: true,
      });
    } else if (e.key === 'logout') {
      localStorage.setItem('docid', '');
    }
  }
  
  render() {
    const data = this.state.medRecords;
    return (
      <div>
        <Drawer
        title={this.state.fullName}
        placement="left"
        closable={true}
        onClose={this.onClose}
        visible={this.state.visible}
      >
        &nbsp; &nbsp; &nbsp;<Avatar size={150} src={this.state.imageUrl} icon="user" />
        <br />
        <br />
        <p><b>Email: </b> {this.state.email}</p>
        <p><b>Profile ID: </b> {this.state.profileId}</p>
        <p><b>Date of Birth: </b> {this.state.dateOfBirth}</p>
      </Drawer>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="mail">
          <Icon type="menu-unfold" theme="outlined" /> {localStorage.getItem('docid')}
          </Menu.Item>
          <Menu.Item key="logout">
            <a href="/" rel="noopener noreferrer">Logout</a>
          </Menu.Item>
        </Menu>
        <br />
        <br />
        <h1 align="center">Medical Details</h1>
        <Col xs={{ span: 15, offset: 6 }} lg={{ span: 15, offset: 8 }}>
        <Card
            title={this.state.desc}
            style={{ width: 300 }}
        >
            <p>{this.state.doc}</p>
            <p>{this.state.location}</p>
        </Card>
        </Col>
      </div>
    );
  }
}

export default RecordDetails;
