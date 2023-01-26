form.addEventListener('submit', ()=>{
  const loginData = {
    username: username.value,
    password: password.value,
  }

  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
  .then(data => {
    if (data.status === "error") {
      success.style.display = "none";
      error.style.display = "block";
      error.innerText = data.error;
    }else {
      error.style.display = "none";
      success.style.display = "block";
      success.innerText = data.success;
    }
  })
})