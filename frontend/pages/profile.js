import React, { Component } from "react";
import { Menu, Icon, Row } from 'antd';
import config from '../config';
import Router from 'next/router';

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

  /**
   * Do this later
   */
  componentWillMount() {
    localStorage.setItem('docid', 'EHR_Doc_4');
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
      </Drawer>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="mail">
          <Icon type="menu-unfold" theme="outlined" /> {localStorage.getItem('docid')}
          </Menu.Item>
          {/* <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
            <MenuItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu> */}
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
              <a href='http://google.com'>
              <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={this.state.imageUrl} />}
                    title={item.PatientId}
                    description={`Age: ${item.age} Gender: ${item.gender}`}
                  />
              </List.Item>
              </a>
          )}
          />
        </Col>
      </div>
    );
  }
}

export default Profile;
