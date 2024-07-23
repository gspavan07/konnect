import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../fiebase.js";

const auth = getAuth(app);
export const signup = async (req, res) => {
  const { email, password } = req.body;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      res.status(201).json(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      res.status(401).json(errorMessage);
    });
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
