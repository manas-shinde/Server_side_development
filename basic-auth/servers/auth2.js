function auth2 (req,res,next) {
  console.log(req.headers);
  if (!req.signedCookies.user) {
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
      // set up signed cookie
      res.cookie('user', 'admin', {signed: true});
      next(); // authorized
    } else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
  else {
    if (req.signedCookies.user === 'admin') {
      // yey a validated user
      console.log(req.signedCookies);
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
}

module.exports = auth2;