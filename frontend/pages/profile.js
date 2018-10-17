import React, { Component } from "react";
import { Menu, Icon, Row } from 'antd';
import config from '../config';
import Router from 'next/router';
import Link from 'next/link';
import QRCode from 'qrcode.react';

import { Drawer, Button, Avatar, List, Col} from 'antd';

class Profile extends Component {
  state = {
    visible: false,
    fullName: 'Doctor Full',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    email: '',
    profileId: '',
    dateOfBirth: '',
    name: 'Doctor',
    patients: [],
  }

  componentDidMount() {
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
    
    fetch(`${config.apiurl}/api/Patient`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        const pat = [];
        for (let i = 0; i < response.length; i += 1) {
          if (response[i].authorized.indexOf(localStorage.getItem('docid')) !== -1) {
            pat.push(response[i]);
          }
        }
        console.log(pat);
        this.setState({
          patients: pat,
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

  addPatient = () => {
    Router.push(`/add_patient`);
  }
  
  render() {
    const data = this.state.patients;
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
        <br />
        <QRCode value={localStorage.getItem('docid')} />
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
        <h1 align="center">Patients Details</h1>

        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 15, offset: 6 }}>
        <Button type="primary" shape="circle" icon="plus" onClick={this.addPatient} /> &nbsp; Add a new patient
        <br />
        <br />
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <Link href={{ pathname: 'medrecord', query: { name: item.PatientId }}}>
              <a>
                <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={'data:image/png;base64,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'} />}
                      title={item.PatientId}
                      description={`Age: ${item.age} Gender: ${item.gender}`}
                    />
                </List.Item>
              </a>
              </Link>
          )}
          />
        </Col>
      </div>
    );
  }
}

export default Profile;
