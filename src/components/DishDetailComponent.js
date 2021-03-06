import React,{Component} from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody} from 'reactstrap';
import {Media} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem, ModalHeader, Modal, ModalBody, Button, Col, Label, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';

import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state ={
            contactFormOpen:false
        }

        this.toggleContactForm = this.toggleContactForm.bind(this);
        this.handleContactFormSubmit = this.handleContactFormSubmit.bind(this);
    }
    
    toggleContactForm(){
        this.setState({
            contactFormOpen:!this.state.contactFormOpen
        });
    }

    handleContactFormSubmit(values){
        console.log("Current Contact Form State : "+JSON.stringify(values));
        alert("Current Contact Form State : "+JSON.stringify(values));

        //this.props.addComment(this.props.dishId, values.rating, values.yourname, values.comment);

        this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment);

        this.toggleContactForm();
    }

    render(){
        return(<div>
            <Button outline onClick={this.toggleContactForm}><span className="fa fa-pencil fa-lg"> Submit Comment</span></Button>
            <Modal isOpen={this.state.contactFormOpen} toggle={this.toggleContactForm}>
                <ModalHeader toggle={this.toggleContactForm}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleContactFormSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-conrtol">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />    
                                </Col>
                            </Row>
                                             
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>   
                    </ModalBody>            
                </Modal>
        </div>);
    }
}



function RenderComments({comments, postComment, dishId}) {
    /*const commentspopulated = comments.map((comment)=>{
   
        My implementation of date formatting...
        const date = comment.date.slice(0,10);
        console.log(date);
        const year = date.slice(0,4);
        const month = date.slice(5,7);
        const dt = date.slice(9,11);

        const monthindex = parseInt(month);
        console.log(monthindex);

        let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        const chmonth = months[monthindex-1];
 

         <Media tag="li" className="unstyledlist">
                    <Media heading>{comment.comment}</Media>
                    
                    <Media description>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</Media>
                </Media>

        return(
            <div key={comment.id} className="mt-3 mb-3">   

                <div className="row">
                    <div className="col-md-12">
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                </div>

            </div>
        );
        });*/

    return(
        <div className="col-12 col-md-5 m-1">
                    
                <ul className="list-unstyled">    
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>        
                <CommentForm dishId={dishId} postComment={postComment} />
        </div>
        );
}

function RenderDish(props){
    const dish = props.dish;
    const comments = props.comments;
    if(dish == null){
        return(
            <div></div>
        );
    }
    else{
        return(

            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description} 
                        </CardText>
                    </CardBody>
                </Card>    
            </FadeTransform>
        );
    }
}


const DishDetail = (props)=>{
    const dish = props.dish;

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <RenderComments comments={props.comments}
                postComment={props.postComment}
                dishId={props.dish.id}
            />  
        </div>
        </div>
    );
    }
}

export default DishDetail;