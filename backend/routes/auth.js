import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import { userrules } from "../request/user.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { fetchUser } from "../middleware/fetchUser.js";
const router = express.Router();
router.get("/", (req, res) => {
  const obj = {
    a: "ome",
  };
  res.json(obj);
});
router.post("/", userrules, async (req, res) => {
  return res.status(400).json("page not found");
});
router.post("/create_user", userrules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const solt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, solt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    }).catch((err) => {
      console.log(err);
      res.json({ error: "Please enter a valid email" });
    });

    if (user) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jsonwebtoken.sign(data, process.env.JWT_SECRET);
      res.json({
        token: token,
      });
    } else {
      res.json({ error: "something went wrong" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post(
  "/login",
  [
    body("email").notEmpty().isEmail(),
    body("password")
      .notEmpty()
      .withMessage("password not empty")
      .isLength({
        min: 3,
      })
      .withMessage("Min 3 character needed"),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).json({ success, error: "Please provide valid creds" });
      }
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        if (user) {
          const data = {
            user: {
              id: user.id,
            },
          };
          const token = jsonwebtoken.sign(data, process.env.JWT_SECRET);
          success = true;
          return res.json({
            success,
            token: token,
          });
        }
      } else {
        res.status(401).json({ success, error: "Please provide valid creds" });
      }
    } catch (error) {
      res.status(500).json({ success, error: "internal server error" });
    }
  }
);

router.post("/user", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

export const userRouter = router;
