const { Session, User } = require('../db');

const authMiddleware = async(req, res, next) => {
   const { sid } = req.cookies;
   if (!sid) {
       console.log("No session associated with this user");
       req.session = null;
   } else {
       const session = await Session.findOne({
           where: {
               sid,
           },
           include: [User],
        });
        console.log(session)
        if (!session) {
            console.log('Invalid session ID - not located in database. Removing cookie.');
            res.clearCookie('sid');
            req.session = null;
        } else {
            console.log(`Session user identified with email: ${session.user.userEmail}`)
            req.session = session
            req.user = session.user
        }
   }
//    console.log('sid',sid)
//    console.log('cookies',req.cookies)
//    console.log('session',req.session)
   next();
}

module.exports = authMiddleware;
