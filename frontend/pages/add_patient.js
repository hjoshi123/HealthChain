import React, { Component } from "react";
import { Menu, Icon, Row } from 'antd';
import config from '../config';
import Router from 'next/router';

import { Drawer, Button, Avatar, List, Col,  Input} from 'antd';

class AddPatient extends Component {
  state = {
    visible: false,
    fullName: 'Doctor Full',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    email: '',
    profileId: '',
    dateOfBirth: '',
    name: 'Doctor',
    patients: [],
    firstName: '',
    Age: '',
    gender: '',
    email: '',
  }

  /**
   * Do this later
   */
  postData = (url = ``, data = {}) => {
    // Default options are marked with *
      return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
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

  firstName = (e) => {
    this.setState({
        firstName: e.target.value,
    });
  }
  lastName = (e) => {
    this.setState({
        lastName: e.target.value,
    });
  }
  Age = (e) => {
    this.setState({
        Age: e.target.value,
    });
  }
  gender = (e) => {
    this.setState({
        gender: e.target.value,
    });
  }
  email = (e) => {
    this.setState({
        email: e.target.value,
    });
  }

  enterLoading = () => {
      console.log(this.state);
      fetch(`${config.apiurl}/api/Patient`)
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            console.log(response);
            const patientIDno = response.length+1;
            const patientID = 'EHR_Pat_'+patientIDno;

            const patientPOSTData = {
                "$class": "org.acme.biznet.Patient",
                "PatientId": patientID,
                "authorized": [localStorage.getItem('docid')],
                "gender":this.state.gender,
                "age": this.state.Age
              };

              const patientProfilePOSTData = {
                "$class": "org.acme.biznet.Patient_profile",
                "Patient": patientID,
                "profile_id":patientID,
                "firstName":this.state.firstName,
                "lastName": this.state.lastName,
                "EmailAddress": this.state.email,
                "Dob": 1997,
                "address": {
                    "$class": "org.acme.biznet.Address",
                    "number": "string",
                    "street": "string",
                    "city": "string",
                    "country": "string",
                    "PinCode": "string"
                  }
              };


              console.log(patientPOSTData);
              console.log(patientProfilePOSTData);

              this.postData(`${config.apiurl}/api/Patient`, patientPOSTData)
              .then(data => {
                  console.log(JSON.stringify(data));
                  //alert('Patient added');
                }) // JSON-string from `response.json()` call
              .catch(error => console.error(error));
            
            setTimeout(() => {
              this.postData(`${config.apiurl}/api/Patient_profile`, patientProfilePOSTData)
              .then(data => {
                console.log(JSON.stringify(data));
              }) // JSON-string from `response.json()` call
              .catch(error => console.error(error));
            }, 5000);
          });
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
          <Menu.Item key="logout">
            <a href="/" rel="noopener noreferrer">Logout</a>
          </Menu.Item>
        </Menu>
        <br />
        <br />
        <h1 align="center">Add Patient</h1>
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="Enter First Name" onChange={this.firstName} type="text" />
          </Col>
        </Row>

        <div className="spacer" style={{ height: 15 }} />
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="Last Name" onChange={this.lastName} type="text" />
          </Col>
        </Row>
        
        <div className="spacer" style={{ height: 15 }} />
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="Email" onChange={this.email} type="text" />
          </Col>
        </Row>

        <div className="spacer" style={{ height: 15 }} />
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="Age" onChange={this.Age} type="text" />
          </Col>
        </Row>

        <div className="spacer" style={{ height: 15 }} />
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="Gender" onChange={this.gender} type="text" />
          </Col>
        </Row>

        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <div className="spacer" style={{ height: 15 }} />
              <Button
                type="primary"
                onClick={this.enterLoading}
              >
                Add Patient
              </Button>
          </Col>
      </div>
    );
  }
}

export default AddPatient;
