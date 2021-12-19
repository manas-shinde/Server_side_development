function auth1 (req,res,next) {
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if (!authHeader) // then no authorization came in
  {
    var err = new Error('You are not authenticated.');
    err.status = 401; // authorization has failed
    next(err);
    return;
  }
  var auth = new Buffer.from(authHeader.split(' ')[1],
  'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];

  // now compare against hardcoded user and pass
  if (user == 'admin' && pass == 'password') // lol this example is dumb
  {
    next(); // authorized
  } else {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    next(err);
  }
};
module.exports = auth1; 



