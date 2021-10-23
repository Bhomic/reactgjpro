import React,{Component} from 'react';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Col, Input, Button, Label, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


class Contact extends Component{

    constructor(props){
        super(props);

        this.state= {
            firstname:'',
            lastname:'',
            agree:false,
            telnum:'',
            contactType:'',
            message:'',
            email:'',
            touched:{
                firstname:false,
                lastname:false,
                telnum:false,
                email:false
            }    
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate(firstname, lastname, telnum, email){
        const errors = {
            firstname:'',
            lastname:'',
            telnum:'',
            email:''
        };

        if(this.state.touched.firstname && firstname.length < 3){
            errors.firstname = "Firstname must be >= 3 characters";
        }else
        if(this.state.touched.firstname && firstname.length > 10){
            errors.firstname = "Firstname must be <= 10 characters";
        }

        if(this.state.touched.lastname && lastname.length < 3){
            errors.lastname = "Lastname must be >= 3 characters";
        }else
        if(this.state.touched.lastname && lastname.length > 10){
            errors.lastname = "Lastname must be <= 10 characters";
        }
        
        let onlydigits = /^\d+$/;

        if(this.state.touched.telnum && !onlydigits.test(telnum)){
            errors.telnum = "Tel. Number must only contain digits";
        }

        if(this.state.touched.email && email.split('').filter((x)=> x === '@').length !== 1){
            errors.email = "Email must contain 1 @ character";
        }

        return errors;
    }


    handleInputChange(event){
        let target = event.target;
        let value  = target ==='checkbox'?target.checked:target.value;
        let name = target.name;

        this.setState({
            [name]:value
        });

        console.log(this.state);
    }

    handleSubmit(event){
        alert(JSON.stringify(this.state));
        event.preventDefault();
        console.log("submitted");
        
        console.log(this.state);
    }

    handleBlur = (field) => (evt) =>{
        this.setState({
            touched:{...this.state.touched, [field]:true}
        });
    }  

    render(){
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
        return(
            
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send Us Your Feedback</h3>
                    </div>

                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row className="m-2">                      
                                <Label md={2} htmlFor="firstname">First Name</Label>
                                <Col md={10}>
                                <Input type="text" 
                                placeHolder="firstname"
                                id="firstname"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleInputChange}
                                valid = {errors.firstname === ''}
                                invalid = {errors.firstname !== ''}
                                onBlur = {this.handleBlur('firstname')}
                                />
                                <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                        
                            <FormGroup row className="m-2">                      
                                <Label md={2} htmlFor="lastname">Last Name</Label>
                                <Col md={10}>
                                <Input type="text" 
                                placeHolder="lastname"
                                id="lastname"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleInputChange}
                                valid = {errors.lastname === ''}
                                invalid = {errors.lastname !== ''}
                                onBlur = {this.handleBlur('lastname')}
                                />
                                <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                        
                            <FormGroup row className="m-2">                      
                                <Label md={2} htmlFor="telnum">Contact Tel.</Label>
                                <Col md={10}>
                                <Input type="tel" 
                                placeHolder="Tel. number"
                                id="telnum"
                                name="telnum"
                                value={this.state.telnum}
                                onChange={this.handleInputChange}
                                valid = {errors.telnum === ''}
                                invalid = {errors.telnum !== ''}
                                onBlur = {this.handleBlur('telnum')}
                                />
                                <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                        
                            <FormGroup row className="m-2">                      
                                <Label md={2} htmlFor="email">Email</Label>
                                <Col md={10}>
                                <Input type="text" 
                                placeHolder="Email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                valid = {errors.email === ''}
                                invalid = {errors.email !== ''}
                                onBlur = {this.handleBlur('email')}
                                />
                                <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                        
                            <FormGroup row className="m-2">

                                <Col md={{size:6, offste:2}}>

                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                            name="agree"
                                            checked={this.state.agree} 
                                            onChange={this.handleInputChange}
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>

                                <Col md={{size:3, offset:1}}>
                                    <Input type="select" name="contactType"
                                    value={this.state.contactType}
                                    onChange={this.handleInputChange}
                                    >
                                    <option>Tel.</option>
                                    <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        

                            <FormGroup row className="m-2">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message"
                                    rows="12"
                                    value={this.state.message}
                                    onChange={this.handleInputChange}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row className="m-2">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
        }
}

export default Contact;