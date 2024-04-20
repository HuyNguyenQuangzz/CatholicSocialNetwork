//validate password & retype-password are similar or not
function checkPass() {
  var password = document.getElementById("password").value;
  var retype = document.getElementById("confirm").value;
  var error = document.getElementById("retype_error");
  if (retype != password) {
    error.innerHTML = "Confirm password does not match. Please Check again !";
    return false; //prevent form submission
  } else {
    error.innerHTML = ""; //clear previous error
    console.log(error.innerHTML);
    return true; //allow form submission
  }
}
