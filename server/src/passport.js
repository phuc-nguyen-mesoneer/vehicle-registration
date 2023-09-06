import { ExtractJwt, Strategy } from 'passport-jwt';
import db from './conn.js';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSecret,
};

export default passport => {
    passport.use(
        new Strategy(opts, async (jwt_payload, done) => {
            try {
                const user = await db.collection('popoUsers').findOne({email: jwt_payload.email});
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                console.error(err);
                return done(null, false);
            }
        })
    )
}