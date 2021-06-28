// registration section

const findUserByEmail = (email, users) => {
  for (let user of Object.keys(users)) {
    if (users[user].email === email) {
      return users[user];
    }
  }
  //if not match
  return undefined;
};


app.get("/register", (req, res) => {
  const templateVars = { user: users[req.session["user_id"]] };
  res.render("register", templateVars);
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = findUserByEmail(email, users);
  if (email === '' || password === '') {
    return res.send('Error: You need an Email and Password to Register', 400);
  }
  if (!user) {
    const userId = addNewUser(email, password);
    req.session["user_id"] = userId;
    //res.cookie('user_id', userId);
    res.redirect("/urls");
  } else {
    res.status(403).send('403: Bad Request. You have to use another combination"');
  }
});

const findUserByEmail = (email, users) => {
  for (let user of Object.keys(users)) {
    if (users[user].email === email) {
      return users[user];
    }
  }
  //if not match
  return undefined;
};
