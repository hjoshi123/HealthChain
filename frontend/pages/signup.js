import React, { Component } from "react";
import 'antd/dist/antd.css'; 
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import Link from "next/link";
import config from '../config.js';


const FormItem = Form.Item;

class Signup extends Component {
  state = {
    loading: false,
    iconLoading: false
  };

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

  handleSubmit = (e) => {
    let doctorID;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(config.apiurl);
        fetch(`${config.apiurl}/api/Doctor`)
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            const  no = response.length+1;
            doctorID = 'EHR_Doc_'+no;

            values['profile_id'] = doctorID;
            values['Qualifications'] = [values['Qualifications']];
            values['Doctor'] = doctorID;
            values['address'] = {
              "$class": "org.acme.biznet.Address",
              "number": "string",
              "street": "string",
              "city": "string",
              "country": "string",
              "PinCode": "string"
            };
            values['Dob'] = 19971120;
            values['ImageURL'] = 'https://previews.123rf.com/images/stefanamer/stefanamer1504/stefanamer150400164/39120433-doctor-showing-diagnoses-flat-design.jpg'

            delete values['password'];

            const doctorPOSTData = {
              "$class": "org.acme.biznet.Doctor",
              "DoctorId": doctorID
            };
            
            console.log('values are', values);

            this.postData(`${config.apiurl}/api/Doctor`, doctorPOSTData)
              .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
              .catch(error => console.error(error));

            this.postData(`${config.apiurl}/api/Doctor_profile`, values)
              .then(data => {
                console.log(JSON.stringify(data));
                localStorage.setItem('docid', doctorID);
              }) // JSON-string from `response.json()` call
              .catch(error => console.error(error));
            
          });
        
      }
    });
  }
 
  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form style={{paddingTop: 150}} onSubmit={this.handleSubmit} className="login-form">
        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
          <FormItem>
            {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Please input your first name!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First name" />
            )}
          </FormItem>
        </Col>
        
        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
          <FormItem>
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please input your last name!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last name" />
            )}
          </FormItem>
        </Col>
        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
        </Col>
        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
          <FormItem>
            {getFieldDecorator('Dob', {
              rules: [{ required: true, message: 'Please input your DOB!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="DOB" />
            )}
          </FormItem>
        </Col>
    
        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
          <FormItem>
            {getFieldDecorator('EmailAddress', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
        </Col>
        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
          <FormItem>
            {getFieldDecorator('Qualifications', {
              rules: [{ required: false, message: 'Please input your Qualification!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Qualification" />
            )}
          </FormItem>
        </Col>
        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
             Signup
            </Button>
          </FormItem>
        </Col>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Signup);

export default WrappedNormalLoginForm;
