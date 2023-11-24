const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: 5000,
});

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Please provide an email and password",
      });
    } else {
      db.query(
        "SELECT id, email, password FROM users WHERE email = ?",
        [email],
        async (error, results) => {
          console.log(results);
          if (
            !results ||
            results.length === 0 ||
            !(await bcrypt.compare(password, results[0].password))
          ) {
            res.status(401).render("login", {
              message: "Email or Password is incorrect",
            });
          } else {
            const user = {
              id: results[0].id,
              name: results[0].name,
              email: results[0].email,
            };
            console.log("user");
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });

            console.log("the token is :" + token);
            const cookieOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookieOptions);

            res.redirect(
              `/profile?id=${user.id}&name=${user.name}&email=${user.email}`
            );
          }
        }
      );
    }
  } catch (error) {
    console.log(req.body);
  }
};

exports.register = (req, res) => {
  console.log(req.body);
  const { name, email, password, passwordConfirm } = req.body;
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (!results || results.length === 0) {
        return res.render("register", {
          message: "This email is already taken!",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Passwords do not match",
        });
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);
      db.query(
        "INSERT INTO users SET ?",
        { name: name, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            return res.render("register", {
              message: "User registered",
            });
          }
        }
      );
    }
  );
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).redirect("/");
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const token = req.cookies.jwt;

      if (token) {
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );

        console.log(decoded);

        db.query(
          "select * from users where id=?",
          [decoded.id],
          async (error, results) => {
            if (error) {
              console.log(error);
              return next();
            }
            console.log(results);

            if (!results || results.length === 0) {
              return next();
            }

            req.user = results[0];
            console.log("user is");
            console.log(error);
            return next();
          }
        );
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
};
