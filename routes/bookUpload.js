const router = require('express').Router();
const book = require('../Db_models/books')
const multer = require('multer');
const path = require('path')
const base64Image = require('@guntur/base64-image');

const ImageKit = require('imagekit');

var imagekit = new ImageKit({
  publicKey: "",
  privateKey: "",
  urlEndpoint: ""


})

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'book'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  // limits: { fileSize: 100000 * 100 },
}).single('uploaded_file');



router.post('', function (req, res) {


  upload(req, res, async (err) => {

    var filepath = [];
    base64Image.encoder(path.resolve(req.file.path)).then(base64String => {

      imagekit.upload({
        file: base64String, //required
        fileName: "database.jpg",   //required
      }).then(response => {
        filepath = response.url;
        // console.log(`yeh abhi aaya : ${filepath}`)
        return filepath
      }).catch(error => {
        console.log(error);
      });

    })

    const data = req.body.data;
    const obj = JSON.parse(data)
    const uid = await book.findOne({ uid: obj.uid });


    if (uid) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const file_path = filepath
      const response = await book.findOneAndUpdate({ uid: obj.uid }, { $push: { bookName: obj.bookName.trim(), authorName: obj.authorName, language: obj.language, type: obj.type, purchaseYear: obj.purchaseYear, price: obj.condition, description: obj.description, phoneNo: obj.phoneNo, path: file_path } })
      res.json({ 'message': "file uploaded" })
    }
    else {

      await new Promise(resolve => setTimeout(resolve, 3000));

      const file_path = filepath;
      const books = new book({
        bookName: obj.bookName.trim(),
        authorName: obj.authorName,
        language: obj.language,
        type: obj.type,
        purchaseYear: obj.purchaseYear,
        price: obj.condition,
        description: obj.description,
        phoneNo: obj.phoneNo,
        path: file_path,
        uid: obj.uid,

      });


      // console.log(books)
      const response = await books.save();
      res.json({ "message": "file uploaded" })

    }

    if (err) {
      return res.end("Error uploading file.");
      // console.log('file not uploaded  ')
    }






  })

















})














module.exports = router;
