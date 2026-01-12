
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

passport.use(
    new LocalStrategy (
        {
            usernameField:"email",
            passwordField:"password",
        },
        async(email,password,done)=>{
            try{
                const user = await User.findOne({email});
                if(!user) return done(null,false,{message:"Invalid Credentials"});

                const isMatched = await bcrypt.compare(password,user.password);
                if(!isMatched) return done(null,false,{message : "Invalid Credentials"});

                return done(null,user);   // SUCCESS
            }catch(err){
                return done(err)
            }
        }
        
    )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});