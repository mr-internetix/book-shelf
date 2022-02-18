function setInputError(message) {
  document.getElementById("error").textContent = message;
}

function clearInputError() {
  document.getElementById("error").textContent = "";
}

// email check
function ValidateEmail() {
  const email = document.getElementById("email").value;
  const ext = email.slice(-13);
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      document.getElementById("email").value
    ) &&
    ext == "bookshelf.com"
  ) {
    clearInputError();
    return true;
  } else {
    setInputError("email : example@bookshelf.com");
  }

  return false;
}

var check_password = function () {
  if (
    document.getElementById("signup_password").value ==
    document.getElementById("confirm_password").value
  ) {
    clearInputError();
  } else {
    setInputError("password do not match");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const login_container = document.querySelector(".login_container");
  const signup_conatiner = document.querySelector(".signup_container");

  document
    .getElementById("linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      login_container.classList.add("container_hidden");
      signup_conatiner.classList.remove("container_hidden");
    });

  // validation
  document.querySelectorAll(".input_field").forEach((inputElement) => {
    inputElement.addEventListener("change", (e) => {
      if (
        e.target.id === "name" &&
        e.target.value.length > 0 &&
        e.target.value.length < 4
      ) {
        setInputError("Username must be at least 5 characters in length");
      } else {
        clearInputError();
      }
      if (e.target.id === "email") {
        ValidateEmail();
      } else {
        clearInputError();
      }
    });
  });

  // Notification
  var notyf = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
  });

  // auth

  const firebaseConfig = {

    // add your configs for firebase here 
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

  // sign in code

  document.getElementById("login").addEventListener("submit", (e) => {
    document.getElementById("login-btn").disabled = true;
    notyf.success("please wait");

    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    var uid = [];
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(({ user }) => {
        uid[0] = user.uid;
        console.log(uid[0]);

        return user.getIdToken().then((idToken) => {
          return fetch("/sessionLogin", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({
              idToken,
            }),
          });
        });
      })
      .catch((err) => {
        notyf.error(err);
        document.getElementById("login-btn").disabled = false;
      })
      .then(() => {
        return firebase.auth().signOut();
      })
      .then(() => {
        if (uid.length === 1) {
          window.location.assign(`/sell/${uid[0]}`);
        }
      });
    return false;
  });

  // signup code

  document.getElementById("signup").addEventListener("submit", (e) => {
    e.preventDefault();

    // notyf('please wait')
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.signup_password.value.trim();
    const confirm_password = e.target.confirm_password.value.trim();
    const full_name = e.target.name.value.toLowerCase();
    const phone = parseInt(e.target.phone.value.trim());

    const emailcheck = email.slice(-13);
    console.log(emailcheck);
    console.log(email);
    var problem = false;

    console.log(password, confirm_password);
    if (isNaN(phone)) {
      notyf.error("phone number must be number");
    } else {
      if (emailcheck === "bookshelf.com") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(({ user }) => {
            

            var problem = false;
            let uid = user.uid;
            let name = full_name;
            let email = user.email;
            let imageUrl = `https://avatars.dicebear.com/api/avataaars/${uid}.svg`;

            fetch("/createaccount", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": Cookies.get("XSRF-TOKEN"),
              },
              body: JSON.stringify({
                uid,
                name,
                email,
                imageUrl,
                phone,
              }),
            })
              .catch(err => {
                problem = true;
                notyf.error(err);
               ;
              })
              .then(() => {
                return firebase.auth().signOut();
              })
              .then(() => {
                if (problem !== true) {
                  login_container.classList.remove("container_hidden");
                  signup_conatiner.classList.add("container_hidden");
                  notyf.success('account_created_successfully')
                }
              });
            return false;
          }).catch(err=>{
            notyf.error(err)
          })

      } else {
        notyf.error("email should have consist (bookshelf.com) as extension", {
          autoHideDelay: 20000,
        });
      }
    }
  });
});
