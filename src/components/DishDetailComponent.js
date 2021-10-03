import React,{Component} from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody} from 'reactstrap';
import {Media} from 'reactstrap';

class DishDetail extends Component{

    constructor(props){
        super(props)

    }

    renderComments(comments){
        return(
            comments.map((comment)=>{
                const date = comment.date.slice(0,10);
                console.log(date);
                const year = date.slice(0,4);
                const month = date.slice(5,7);
                const dt = date.slice(9,11);

                const monthindex = parseInt(month);
                console.log(monthindex);
   
                let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

                const chmonth = months[monthindex-1];

                return(
                <div key={comment.id} className="mt-3 mb-3">   
                <Media tag="li" className="unstyledlist">
                    <Media heading>{comment.comment}</Media>
                    <Media description>--{comment.author}, {chmonth} {dt}, {year}</Media>
                </Media>    
                </div>
                );
            })
        );
    }   

    renderDish(dish){
        if(dish == null){
            return(
                <div></div>
            );
        }
        else{
            return(
            <div className="row">
                <div className="col-12 col-md-5">
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
                </div>   

                <div className="col-12 col-md-5">
                    <header className="m-4"><h4>Comments</h4></header>
                    <Media list>
                        {this.renderComments(dish.comments)}
                    </Media>
                </div>
            </div>     
            );
        }
    }

    render(){
        const dish = this.props.dish;
        return(
            this.renderDish(dish)
        );
    };
}

export default DishDetail;