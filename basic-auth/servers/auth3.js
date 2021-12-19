function auth3 (req,res,next) {
  console.log(req.headers);

  if (!req.session.user) {
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
      req.session.user = 'admin';
      next(); // authorized
    } else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
  else {
    if (req.session.user === 'admin') {
      // yey a validated user
      console.log('req.session: ', req.session);
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
}

module.exports = auth3;