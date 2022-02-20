

![Logo](https://ik.imagekit.io/s3ixzlcmo8v/Bookshelf_tFEiIrF6S.png?ik-sdk-version=javascript-1.4.3&updatedAt=1645179561310)


**BOOK SELLING PLATFORM**  -- `Users Can Create Account / Post Ad's / Delete Ad's / Buy Books`

 # **Built Using**  


 * **Javascript :** Plain Javascript in frontend 
 * **CSS :** Styling Markdown 
 * **EJS :** Templating Engine 
 * **Node JS :** Backend Server which works on V8 engine of Javascript
 * **Express JS :** Backend Framework 
 * **Mongo DB :** Database 
 * **Firebase :** Used for authentication of users







## Run Locally

Clone the project

```bash
  git clone https://github.com/Mr-Internetix/book-shelf.git
```

Go to the project directory

```bash
  cd book-shelf
```

Install dependencies

```bash
  npm install
```


Start the server

```bash
  npm start 
```






## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`MONGO_URL = your mongo-db atlas api key` 










## Setting up firebase 

` Its simple just add the json file Downloaded from the firabase platform with  file-name ` **bookshelf.json** `in your root folder of the project i.e next to - index.js file `



## Change configuration in `/public/js/login.js`

```
var firebaseConfig = {
       // add your firebase configuration
    };

```
## Configuring ImageKit Api in `/routes/bookUpload.js`

```
var imagekit = new ImageKit({
  publicKey: "add-your-key-here",
  privateKey: "add-your-key-here",
  urlEndpoint: "add-your-kye-here" 
}) 

```


## Database configs

`Just add the Database url in .env file ( I expect that mongo will create the collections automatically if not
create manually by creating three collections ) i.e 
` 
* books
* users


# License
MIT License.


[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

You can use this project for free without notifying me by forking this project under the following conditions:

* Add a link to my Repository or [my-profile](https://www.github.com/mr-internetix)
* Star the repository 





[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://paypal.me/mrinternetix)
