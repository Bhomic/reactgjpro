import React,{Component} from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,  Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import {connect} from 'react-redux';

//import { addComment } from '../redux/ActionCreators';

//import { addComment, fetchDishes } from '../redux/ActionCreators';

import { actions } from 'react-redux-form';

import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';


const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())
  });



const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),

    fetchDishes: () => { dispatch(fetchDishes())},

    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
  
});

class Main  extends Component{

    constructor(props)
    {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
      }
      

    /*onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
        console.log("dish selected : "+dishId);
    }*/

    render()
    {

        const HomePage = () => {
            return(
                <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />            
            );
          }

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                commentsErrMess={this.props.comments.errMess}
                addComment={this.props.addComment}
                />
            );
          };
       

        return (
        <div>
            <Header/>
            <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes} />}/>
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route exact path='/aboutus' component={() =><About leaders={this.props.leaders}/>} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Redirect to="/home"/>
            </Switch>
            <Footer/>
        </div>
        );

    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));