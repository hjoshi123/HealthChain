import React, { Component } from "react";
import { Menu, Icon, Row } from 'antd';
import config from '../config';
import Router from 'next/router';
import cloudinary from 'cloudinary-core';
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
import { Upload, Drawer, Button, Avatar, List, Col,  Input, message} from 'antd';
const Dragger = Upload.Dragger;

class NewRecord extends Component {
  state = {
    visible: false,
    fullName: 'Doctor Full',
    imageUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:'',
    prescription: '',
    name: 'Doctor',
    patients: [],
    base64File: '',
  }


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
    
    fetch(`${config.apiurl}/api/Medical_Record`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        this.setState({
          patients: response,
        })
      });
      //document.getElementById("inp").addEventListener("change", readFile);
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
      description: e.target.value,
    });
  }
  lastName = (e) => {
    this.setState({
      prescription: e.target.value,
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
      fetch(`${config.apiurl}/api/Medical_Record`)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        let length = response.length;
        const id = length + 1;
        const values = {
          'record_id': id,
          'PatientId': localStorage.getItem('patientid'),
          'DoctorId': localStorage.getItem('docid'),
          'version': 0,
          'authorized': [localStorage.getItem('docid')],
          'description': this.state.description,
          'prescription': this.state.prescription,
          'encounter_time': '2018-10-12T03:47:01.314Z',
          'location': 'Bengaluru'
        };
        this.postData(`${config.apiurl}/api/Medical_Record`, values)
          .then(data => {
            console.log((data));
            message.success('Record Added');
            Router.push(`/medrecord`);
          }) // JSON-string from `response.json()` call
          .catch(error => console.error(error));
      });
  }

  // readFile = (e) =>   {
  //   var cl = new cloudinary.Cloudinary({cloud_name: "blockchainehr", secure: true});
  //   console.log('readfile works');
  //   console.log(e.target.files[0]);
  //   let reader = new FileReader();
  //   let file = e.target.files[0];
  //   cl.v2.uploader.upload(file, 
  //   function(error, result) {console.log(result, error); });
    

  //   // on reader load somthing...
  //   reader.onload = () => {

  //     // Make a fileInfo Object
  //     let fileInfo = {
  //       name: file.name,
  //       type: file.type,
  //       size: Math.round(file.size / 1000) + ' kB',
  //       base64: reader.result,
  //       file: file,
  //     };
  //     console.log(fileInfo);
  //     this.setState({
  //       base64File: fileInfo.base64,
  //     })
  //   }
  // };
  
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
        <h1 align="center">Create new Health Record</h1>
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="Enter description" onChange={this.firstName} type="text" />
          </Col>
        </Row>

        <div className="spacer" style={{ height: 15 }} />
        <Row>
          <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <Input placeholder="Prescription" onChange={this.lastName} type="text" />
          </Col>
        </Row>
        <br />
        <br />
        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            {/* <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger> */}

            <input id="inp" type='file' />
            <p id="b64"></p>
            <img id="img" height="150"/>
        </Col>

        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
            <div className="spacer" style={{ height: 15 }} />
              <Button
                type="primary"
                onClick={this.enterLoading}
              >
                Add Record
              </Button>
          </Col>
      </div>
    );
  }
}

export default NewRecord;
