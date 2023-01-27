// form.addEventListener("submit", () => {
//   const registerData = {
//     username: username.value,
//     email: email.value,
//     password: password.value,
//   };

//   // console.log(registerData);

//   fetch("./api/register", {
//     method: "POST",
//     body: JSON.stringify(registerData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("data: " + data);
//       if (data.status === "error") {
//         success.style.display = "none";
//         error.style.display = "block";
//         error.innerText = data.error;
//       } else {
//         error.style.display = "none";
//         success.style.display = "block";
//         success.innerText = data.success;
//       }
//     });
// });
