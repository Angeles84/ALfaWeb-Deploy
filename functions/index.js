const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors');

const router = express();
// Automatically allow cross-origin requests
router.use(cors({ origin: true }));

router.get('/curso/:id', async(req, res) => {
  const curso = await
  admin.firestore().collection('cursos').doc(req.params.id).get();
  res.send(curso);
});

router.get('/cursos', async(req, res) => {
  const cursos = await admin.firestore().collection('cursos').get();
  var lista = [];
  cursos.docs.forEach(doc => {
  lista.push({ id: doc.id, data: doc.data() });
  });
  res.send(lista);
});

router.post('/curso', async(req, res) => {
  const curso = await admin.firestore().collection('cursos')
  .add(req.body);
  res.send(curso);
});

router.put('/curso/:id', async(req, res) => {
  const curso = await
  admin.firestore().collection('cursos').doc(req.params.id)
  .update(req.body);
  res.send(curso);
});

router.delete('/curso/:id', async(req, res) => {
  const curso = await
  admin.firestore().collection('cursos').doc(req.params.id).delete();
  res.send(curso);
});

// Expose Express API as a single Cloud Function:
//URL https://us-central1-prueba-deploy-ecc27.cloudfunctions.net/test
//https://console.firebase.google.com/project/prueba-deploy-ecc27/overview
exports.test = functions.https.onRequest(router);