const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('id')
      .then((id) => {
        return trx('users')
          .returning('*')
          .insert({
            id: id[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch((err) => {
        console.log(err);
        trx.rollback;
      });
  }).catch((err) => {
    console.log(err);
    res.status(400).json('Unabale to register user');
  });
};

module.exports = { handleRegister };
