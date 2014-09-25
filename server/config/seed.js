/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/idea/idea.model');
var User = require('../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create({
    title : 'Development Tools',
    description : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.',
    originator: {email: 'pradiphudekar@gmail.com', name: 'Pradip Hudekar'},
    team:{
      name: 'Team 3',
      members: [

      ]
    }
  }, {
    title : 'Server and Client integration',
    description : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.',
    originator: {email: 'dvaz@equalexperts.com.com', name: 'Douglas Vaz'},
    team:{
      name: 'Team 2',
      members: [
        {email: 'kjain@equalexperts.com.com', name: 'Komal Jain'}
      ]
    }
  } 
  // ,{
  //   name : 'Smart Build System',
  //   info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  // },  {
  //   name : 'Modular Structure',
  //   info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  // },  {
  //   name : 'Optimized Build',
  //   info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  // },{
  //   name : 'Deployment Ready',
  //   info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  // }
  );
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});