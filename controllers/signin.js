const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Incorrect form submission');
  }
  db.select('id', 'email', 'hash')
    .from('login')
    .where({ email: email })
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where({ id: data[0].id })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => {
            res.status(400).json(`Unable to get user {req.body.email}`);
          });
      } else {
        res.status(400).json('Invalid credentials');
      }
    })
    .catch((err) => {
      res.status(400).json('Invalid credentials');
    });
};

module.exports = { handleSignin };