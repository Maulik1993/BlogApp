var Reflux = require('reflux');
var Component = require('./Actions');

var store = Reflux.createStore({
    listenables: Component,
data2:{
    username : null,
    msg : null
},
bindData:{},
    onHandleRegistrationForm : function(value){
      console.log("hu");
      $.ajax({
             url: '/users/register',
             type:'post',
             data: value,
             success: function(data) {
               console.log("in side ajax");
                     console.log(data);
               this.data2.username = data.username;
               this.data2.msg='Successfully registration';
               console.log(this.data2.username);
               console.log(this.data2.msg);
              this.trigger(this.data2);
            }.bind(this)
           });
    },

    onHandleLoginAuth : function(value){
    $.ajax({
           url: '/users/login',
           type:'post',
           data: value,
           success: function(data1) {
             console.log(data1.token);
             this.data2.username = data1.user;
             this.data2.msg='Login registration';
             console.log(this.data2.username);
             console.log(this.data2.msg);
             this.trigger(this.data2);
           }.bind(this)
         });
       },
       onLogOut : function(){
         window.localStorage.clear();
         this.trigger();
       },

       onSearchAndDisplayMovie : function(value){
         console.log(value);
         $.ajax({
           url: '/displaymovies',
           data: value,
           type: 'post',
           success:function(data){
             console.log(data);
             this.bindData = data;
             console.log(this.bindData);
             this.trigger(this.bindData);
           }.bind(this)
         })
       },

       onSearchAndAddToDb : function(value){
         console.log(value);
         $.ajax({
             url:'/addToDB/addDB',
             data:"Name="+value,
             type:'post',
             dataType: 'json',
             cache: false,
             success: function(e) {
               console.log(e);
               this.data2.msg = e;
               this.trigger(this.data2.msg);
             }.bind(this)
             });
       },

       onDeleteSelectedMv : function(value){
         $.ajax({
           url: '/DeleteSelectedMovie',
           type: 'post',
           data : 'movieDeleteObj='+value,
           success:function(data)
           {
             console.log(data);
             
           }
          })
       },

       onFetchMovieCont : function(){
         $.ajax({
           url: '/addMovie',
           type: 'get',
           success:function(data){

             this.trigger(data);
           }.bind(this)
         });
       }

  });
module.exports =store;
