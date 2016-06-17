var React=require('react');
var ReactDOM=require('react-dom');
var actions=require("./Actions.js");
var store=require("./store");
var Navi = require('react-router').Navigation;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute=require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var Reflux=require('reflux');

const app = document.getElementById('app');

var MainComp = React.createClass ({

  render(){
    return(
      <div>
      <Navbar/>
      {this.props.children}
      </div>
    )
  }
});

var Navbar =React.createClass({
  componentDidMount : function(){
    $('#temp').hide();
  },
  render(){
    return(
      <nav className="navbar navbar-default">
      <div className="container-fluid">
      <div className="navbar-header">
         <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
           <span className="sr-only">Toggle navigation</span>
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
         </button>
          <a className="navbar-brand"><Link to={"/home"}>For You</Link></a>
        </div>
      			<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                {
                  window.localStorage.getItem('username')==null?
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to={"/login"}>Sign in</Link></li>
      							<li><Link to={"/register"}>Register</Link></li>
                  </ul>
                  :
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to={"/CreateBlog"}>Write a Blog</Link></li>
                    <li><Link to={"/logout"}>Logout</Link></li>
                  </ul>
                }
      				</div>
      			</div>
      </nav>
      );
  }
});

var Home = React.createClass({
  render : function(){
    return(
      <div>
      <h2>
      Blogss are on the wayyyyyyyy-------------------
      </h2>
      </div>
    );
  }
});

var CreateBlog = React.createClass({
  render : function(){
    return(
      <div>
        <p>Create Your Blogs</p>
        <div className="container">
        <form>
                <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" name="name"/>
                 </div>
                 <div className="form-group">
                 <input type="text" className="form-control" placeholder="Username" name="username"/>
                  </div>
                  <div className="form-group">
                  <input type="email" className="form-control" placeholder="Email" name="email"/>
                   </div>
                   <div className="form-group">
                   <input type="password" className="form-control" placeholder="Password" name="password"/>
                    </div>
                 <div className="form-group">
                 <input type="password" className="form-control" placeholder="Password" name="password2"/>
                  </div>
                  <button type="button"  onClick={this.handleRegistrationForm}  className="btn btn-primary btn-block">Submit</button>
                  </form>
                </div>
      </div>
    );
  }
});

var Logout = React.createClass({
  mixins :[
    Reflux.listenTo(store,"onStore")
  ],
  onStore : function(){
    browserHistory.push('/');
  },
componentDidMount : function(){
  this.logOut();
},

logOut : function(){
  actions.logOut();
},
  render : function(){
    return(
      <div>LogOut Successfully</div>
    )
  }
});

var Register = React.createClass({

  mixins : [  Reflux.listenTo(store,"onStore")],
  componentDidMount : function(){
    $('#temp').hide();
  },
  getInitialState: function(){
    return {
      username: null,
      msg : null
    }
  },
onStore : function(data){
  this.setState({
    username :data.username,
    msg:data.msg

  });
},
  handleRegistrationForm : function(){
    console.log("in die");
    var value = $('#registrationDetail').serialize();
    console.log(value);
    actions.handleRegistrationForm(value);
  },

  render : function(){
    return(<div>
      {this.state.username==null?
      <div className="container">
      <form id="registrationDetail">
              <div className="form-group">
              <input type="text" className="form-control" placeholder="Name" name="name"/>
               </div>
               <div className="form-group">
               <input type="text" className="form-control" placeholder="Username" name="username"/>
                </div>
                <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" name="email"/>
                 </div>
                 <div className="form-group">
                 <input type="password" className="form-control" placeholder="Password" name="password"/>
                  </div>
               <div className="form-group">
               <input type="password" className="form-control" placeholder="Password" name="password2"/>
                </div>
                <button type="button"  onClick={this.handleRegistrationForm}  className="btn btn-primary btn-block">Submit</button>
                </form>
              </div>:<div>Registration Successful..!</div>}</div>
    )
  }
});

var Login = React.createClass({
  mixins :[
    Reflux.listenTo(store,"onStore")
  ],

  onStore : function(data){
    this.setState({
    loginData:data.username,
    msg : data.msg
  });

  window.localStorage.setItem("username", data.username);
  this.loginSuccess();
},

loginSuccess : function(){
  browserHistory.push('/');
},

  getInitialState: function(){
    return {
      loginData: null,
      msg : null
    }
  },

handleLoginAuth : function(){
  var value = $('#loginData').serialize();
  console.log(value);
  actions.handleLoginAuth(value);
},

  render : function(){
    return(
      <div className="container">
      <form id="loginData">
              <div className="form-group">
                <input className="form-control" name="username" placeholder="Enter a User Name..." type="text" />
               </div>
               <div className="form-group">
                  <input className="form-control" name="password" placeholder="Enter a Password..." type="password" />
                </div>
                <input className="btn btn-primary btn-block" onClick={this.handleLoginAuth} type="button" value="Login" />
                </form>
              </div>
    );
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
      <Route path="/" component={MainComp}>
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/CreateBlog" component={CreateBlog} />
        <Route path="/login" component={Login} />
        <Route path="/Navbar" component={Navbar} />
        <Route path="/logout" component={Logout} />
    </Route>
  </Router>
), app)
