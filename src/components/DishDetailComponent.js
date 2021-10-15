import React from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody} from 'reactstrap';
import {Media} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderComments(props){
    const comments = props.comments;
    return(
        comments.map((comment)=>{
            /*
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
            */

            return(
            <div key={comment.id} className="mt-3 mb-3">   
            <Media tag="li" className="unstyledlist">
                <Media heading>{comment.comment}</Media>
                <Media description>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</Media>
            </Media>    
            </div>
            );
        })
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
            <>
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>
                        {dish.name}
                    </CardTitle>
                    <CardText>
                        {dish.description} 
                    </CardText>
                </CardBody>
            </Card>    
          </>  
        );
    }
}


const DishDetail = (props)=>{
    const dish = props.dish;
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
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
            </div>
        </div>
        </div>
    );
}

export default DishDetail;