const { Session, User } = require('../db');

const authMiddleware = async(req, res, next) => {
   const { sid } = req.cookies;
   if (!sid) {
       //If there is no cookie/session yet
       console.log("No session associated with this user");
       req.session = null;
   }
   else {
        //If there is a cookie
        const session = await Session.findOne({
            where: {
                sid,
            },
            include: [User],
        });
        if (session){
            const user = await User.findOne({
                where: {
                    id: session.user.id
                },
                include: {all: true}
            })
            console.log(`Session user identified with email: ${session.user.userEmail}`)
            req.session = session
            req.user = user
        }
        if (!session) {
            console.log('Invalid session ID - not located in database. Removing cookie.');
            res.clearCookie('sid');
            req.session = null;
        }
    }
//    console.log('sid',sid)
//    console.log('cookies',req.cookies)
//    console.log('session',req.session)
   next();
}

module.exports = authMiddleware;
