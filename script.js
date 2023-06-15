const signIn = document.getElementById("signIn");

signIn.addEventListener("click",(event)=> {
      event.preventDefault();

      const email = document.getElementById("emailInput").value;
      const password = document.getElementById("passwordInput").value;

      signIn.innerText ="Loading...";
      signIn.classList.add("pulse");

      if (email === "" || password === "") {
           swal.fire({
            icon: "info",
            text: "All fields are required",
            confirmButtonText:"ok",
           });
           signIn.innerText="Sign In";
           signIn.classList.remove("pulse");
      } else{
            const loginform = new FormData ();
            loginform.append("emailInput",email);
            loginform.append("passwordInput");

            const signReq ={
                  method: "post",
                  body: loginform
            }

            const url ="http://pluralcodesandbox.com/yorubalearning/api/admin_login";

            fetch(url, signReq)
            .then(response => response.json())
            .then(result => {
                  console.log(result)
                  localStorage.setItem("adminObj", JSON.stringify(result));
                  const getAdminObj = localStorage.getAdminObj("adminObj");
                  const adminObj = JSON.parse(getAdminObj);

                  if (adminObj.hasOwnProperty("email")) {
                        location.href="dashboard.html"
                  } else {
                        swal.fire({
                              icon:"warning",
                              text: "Longin Unsuccessful",
                              confirmButtonText:"Ok"
                        })
                  }

            }).catch((error)=> console.log('error',error))
      }

})