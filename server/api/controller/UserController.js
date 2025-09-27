import User from "../model/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPW = await bcrypt.hash(password, salt);

    const existUser = await User.findOne({ username });

    if (existUser) {
      res.status(500).json({ message: "User Already Exist" });
    }

    const userData = new User({ username, password: hashPW });

    // generate token
    const token = jwt.sign(
      { id: userData._id, username: userData.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    await userData.save();

    // store cookie
    res.cookie("token", token, {
      httpOnly: true, // client JS cannot access this cookie
      secure: true, // set true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // expire 1 day
    });

    res.status(200).json({
      data: userData,
      token: token,
      message: "User Register Successfully",
      status: 200,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // store cookie
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ message: "Log In Successful", status: 200, token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logOut = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  // if (token) {
  //   // get cookie
  //   res.cookie("token", token, {
  //     httpOnly: true,
  //     secure: true,
  //     maxAge: 24 * 60 * 60 * 1000,
  //   });

  //   // clear cookie
  //   res.clearCookie("token", {
  //     path: "/login",
  //     httpOnly: false,
  //     secure: false,
  //   });
  //   res.json({ message: "Logged out" });
  // }
};
