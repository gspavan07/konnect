import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../fiebase.js";
import User from "../models/User.js";

const auth = getAuth(app);
export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  let user = await User.findOne({ username });

  if (user) {
    return res.status(401).json({
      success: false,
      errorCode: "USERNAME_EXISTS",
    });
  } else {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const userInfo = userCredential.user;
        User.create({
          username,
          email,
          lastLogin: userInfo.lastLoginAt,
        });
        res
          .status(201)
          .cookie("accessToken", userInfo.accessToken, {
            httpOnly: true,
            expires: userInfo.expirationTime,
          })
          .json({
            success: true,
            message: "User created successfully",
            data: userInfo,
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        res.status(401).json({
          success: false,
          message: errorMessage,
          errorCode: errorCode,
        });
      });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      res.status(201).json(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      res.status(401).json(errorMessage);
    });
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
};
