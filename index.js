const server = require('cloudcms-server/server');
const jwksRsa = require('jwks-rsa');

/*
// set up any after callbacks here
server.after(function(app, callback) {
    callback();
});
*/

// register any routes here
server.routes(function(app, callback) {
  app.use('*', app.auth('aadw'));

  app.use('/articles', function(req, res, next) {
    console.log('Authenticated!');
    // get the Cloud CMS branch
    req.branch(function(err, branch) {
      // query for nodes
      branch
        .queryNodes({
          _type: 'my:article'
        })
        .then(function() {
          res.json(this);
        });
    });
  });
  // fire this when you're done setting up routes
  callback();
});

// report
server.report(function(callback) {
  console.log('');
  console.log(
    'Cloud CMS Application Server running on port: ' + process.env.PORT
  );
  console.log('');

  callback();
});

const config = {
  auth: {
    enabled: true,
    adapters: {
      aadwAdapter: {
        type: 'jwt',
        config: {
          header: 'Authorization',
          // secret: jwksRsa.expressJwtSecret({
          //   cache: true,
          //   rateLimit: true,
          //   jwksRequestsPerMinute: 5,
          //   jwksUri: process.env.DW_AD_JWKSURI
          // }),
          trusted: true,
          field: 'oid'
        }
      }
    },
    // providers: {
    //   aadwProvider: {
    //     enabled: true,
    //     ssoBaseURL: 'http://www.example.com/',
    //     serverBaseURL: 'http://localhost:3000',
    //     validateURL: '',
    //     successRedirect: '',
    //     failureRedirect: '',
    //     autoRegister: true,
    //     registrationRedirect: '',
    //     passTicket: true,
    //     passToken: true
    //   }
    // },
    filters: {
      aadw: {
        adapter: 'aadwAdapter'
        //provider: 'aadwProvider'
      }
    }
  }
};

server.start(config);
