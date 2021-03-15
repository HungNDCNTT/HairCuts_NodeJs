function validateForm() {
    let pass = document.forms["password"].value;
    if (pass == "") {
        return alert("Please input password");
    } else if (pass.length < 6) {
      return   alert("Password must be longer than 6");
    } else return true;
}
