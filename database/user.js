import connectDB from "./connectDB";
import User from "@/models/user";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import Email from "@/models/email";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENGRID_KEY);

export const changeName = async (req, res) => {
  try {
    const { userId, name } = req.body;
    await connectDB();
    const user = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ error: "changeName has error in catch" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    await connectDB();
    const user = await User.findById(userId);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.json({ error: "old password wrong" });
    if (
      !newPassword ||
      !validator.isStrongPassword(newPassword, {
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      return res.json({ error: "password is required" });
    }
    const passwordHass = await bcrypt.hash(newPassword, 8);
    user.password = passwordHass;
    await user.save();
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ error: "changePassword has error in catch" });
  }
};

export const register = async (req, res) => {
  // validate
  const { name, email, password } = req.body;
  try {
    if (!name || validator.isEmpty(name)) {
      return res.json({ error: "name is required" });
    }
    if (!email || !validator.isEmail(email)) {
      return res.json({ error: "email is required" });
    }
    if (
      !password ||
      !validator.isStrongPassword(password, {
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      return res.json({ error: "password is required" });
    }

    // check if exist user
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "email is existed" });
    }

    // check if exist email and remove
    await Email.findOneAndDelete({ email });

    // create email for pre register
    const otp = nanoid();
    const preRegister = await Email.create({ email, otp, type: "Register" });

    const token = jwt.sign(
      {
        email: preRegister.email,
        password: password,
        name: name,
        otp: preRegister.otp,
      },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: "1h" }
    );

    const URL = `${process.env.NEXTAUTH_URL}/auth/confirmRegister/${token}`;

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: preRegister.email,
      // to: 'lockdoor@gmail.com',
      subject: "Register comfirmation from next-ecommerce",
      html: `
    <h2>Dear next-ecommerce customer</h2>
    <p>We have receive a request to authorize this email address. If you requested this varification, please clik this Verify button or follow URL</p>
    <button style="display: block; margin: auto; width: 200px; height: 50px; cursor: pointer">
      <a href="${URL}" style="text-decoration: none; font-size: 24px">Verify</a>
    </button>
    <p><a href="${URL}">${URL}</a></p>
    <p>If you did NOT request to verify this email address, do not action on this email</p>
    <p>Sincerely</p>
    <p>The next-ecommerce Services Team</p>
    `,
    };

    await sgMail.send(emailData);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ error: "error on register" });
  }
};

export const verifyRegister = async (req, res) => {
  try {
    const { token } = req.query;
    const { email, password, otp, name } = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET
    );
    console.log({ email, password, otp, name });
    const matchEmail = await Email.findOne({ email: email, otp: otp });
    if (matchEmail) {
      const passwordHass = await bcrypt.hash(password, 10);
      await User.create({
        name: name,
        email: matchEmail.email,
        password: passwordHass,

      });
      await Email.findOneAndDelete({ email: email });
      res.json({ ok: true });
    } else {
      res.json({
        error: "you token is expired please wait last email confirmation",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "has error by verifyRegister, please register again" });
  }
};

export const recovery = async (req, res) => {
  try {
    const { email } = req.body;
    console.log({email})
    await connectDB();
    const user = await User.findOne({ email: email }).select("email");
    if (!user) {
      return res.json({ error: "This email not found, please register again" });
    } else {
      const otp = nanoid();
      const recoveryEmail = await Email.create({
        email: email,
        otp: otp,
        type: "Forget",
      });
      const token = jwt.sign(
        { email: recoveryEmail.email, otp: recoveryEmail.otp },
        process.env.NEXTAUTH_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const url = `${process.env.NEXTAUTH_URL}/auth/confirmRecovery/${token}`;

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Recovery password from next-ecommerce",
        html: 
          `
            <h2>Dear Ugly shop customer</h2>
            <p>We have receive a request to authorize this email address. If you requested this recovery, please clik this Recovery button or follow URL</p>
            <button style="display: block; margin: auto; width: 200px; height: 50px; cursor: pointer">
              <a href="${url}" style="text-decoration: none; font-size: 24px">Recovery</a>
            </button>
            <p><a href="${url}">${url}</a></p>
            <p>If you did NOT request to verify this email address, do not action on this email</p>
            <p>Sincerely</p>
            <p>The Ugly shop Services Team</p>
          `
      };
      await sgMail.send(emailData);
      res.json({ ok: true });
    }
    // res.json({ok: true});

  } catch (error) {
    console.log(error);
    res.json({ error: "has error by recovery, please register again" });
  }
};

export const verifyRecovery = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (
      !password ||
      !validator.isStrongPassword(password, {
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      return res.json({
        error: "password is required or week please input again",
      });
    }
    const { email, otp } = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    const matchEmail = await Email.findOne({ email: email, otp: otp });
    if (matchEmail) {
      const passwordHass = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        {
          email: matchEmail.email,
        },
        { password: passwordHass }
      );
      await Email.findOneAndDelete({ email: email });
      res.json({ ok: true });
    } else {
      res.json({
        error: "you token is expired please wait last email confirmation",
      });
    }
    // res.json({ok: true})
  } catch (error) {
    console.log(error);
    res.json({ error: "has error by verifyRecovery, please register again" });
  }
};
