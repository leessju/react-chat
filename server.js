const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server');

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:7195ecd4-8d2a-4681-80b3-e07c849a71cd',
  key:
    'cb697384-bdbb-4989-a81d-c48c317f81f6:BhcSDAJ0OsNwKYLoB8CAYupzkkj/LARsHjawYZBmGkU='
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body;

  chatkit
    .createUser({
      name: username,
      id: username
    })
    .then(() => {
      return res.sendStatus(201);
    })
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        return res.sendStatus(200);
      } else {
        res.status(err.status).json(err);
      }
    });

});

// app.post('auth', (req, res) => {
//   const { grant_type } = req.body;
//   res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id}));
// });

app.post('/auth', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });

  res.status(authData.status)
    .send(authData.body);
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`hi`);
    console.log(`Running on port ${PORT}`)
  }
})
