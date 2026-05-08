$(document).ready(function () {
  // SIGN UP
  const $password = $("#password");
  const $cpassword = $("#cpassword");
  const $signupForm = $("#registerForm");
  const $termsCondition = $("#terms_condition");
  const $loader = $("#loader"); // Assuming you have an element with id="loader"
  const $registerSubmit = $("#register_submit"); // Button for submitting the form
  const $loginSubmit = $("#login_submit"); // Button for submitting the form
  const $loginForm = $("#loginForm");
  const $rem_me = $("#rem_me");

  function checkPasswordStrength(password) {
    const strengthLevels = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[\W_]/.test(password),
    };
    return Object.values(strengthLevels).filter(Boolean).length;
  }

  function updatePasswordStrengthIndicator() {
    const strength = checkPasswordStrength($password.val());
    $password.data("strength", strength);
    // Update UI based on strength, if needed
  }

  function validateForm() {
    if ($password.val() !== $cpassword.val()) {
      toaster("warning", "Password and Confirm Password are not the same");
      return false;
    }
    if ($password.data("strength") < 4) {
      toaster("warning", "Password is not strong enough.");
      return false;
    }
    if (!$termsCondition.is(":checked")) {
      toaster("warning", "Please accept the terms and conditions.");
      return false;
    }
    return true;
  }

  function submitForm() {
    const formArray = $signupForm.serializeArray();
    console.log(formArray);
    if (!validateForm()) {
      $loader.hide();
      return;
    }

    // Convert form array to object
    var signupData = {};
    $(formArray).each(function (index, obj) {
      signupData[obj.name] = obj.value;
    });

    // Map fields to match backend schema
    signupData.full_name = signupData.name;
    signupData.username = signupData.email;

    // Remove fields not expected by backend
    delete signupData.cpassword;
    delete signupData.name;

    $loader.show();
    const baseUrl = "http://127.0.0.1:8001/auth/signup";

    $.ajax({
      url: baseUrl,
      type: "post",
      data: JSON.stringify(signupData),
      dataType: "json",
      contentType: "application/json",
      processData: false,
      success: function (data) {
        $loader.hide();
        if (data.message) {
          toaster("success", data.message);
          setTimeout(function () {
            window.location.href = "/frontend/auth-login.html";
          }, 1500);
        }
      },
      error: function (xhr) {
        $loader.hide();
        var msg = "An error occurred during registration.";
        if (xhr.responseJSON && xhr.responseJSON.detail) {
          msg = xhr.responseJSON.detail;
        }
        toaster("warning", msg);
      },
    });
  }

  $password.on("input", updatePasswordStrengthIndicator);
  $registerSubmit.click(function (event) {
    event.preventDefault();
    submitForm();
  });

  // Login form submit
  submitLogin = () => {
    const formArray = $loginForm.serializeArray();
    console.log(formArray);

    // Convert form array to object
    var loginData = {};
    $(formArray).each(function (index, obj) {
      if (obj.name === "email") {
        loginData["username"] = obj.value;
      } else {
        loginData[obj.name] = obj.value;
      }
    });

    $loader.show();
    const baseUrl = "http://127.0.0.1:8001/auth/login";

    $.ajax({
      url: baseUrl,
      type: "post",
      data: JSON.stringify(loginData),
      dataType: "json",
      contentType: "application/json",
      processData: false,
      success: function (data) {
        $loader.hide();
        console.log(data);
        if (data.access_token) {
          const secretKey = "BillMate_Cookie_Secret";
          document.cookie = `${getEncryptedCookieName("auth_key")}=${data.access_token}; path=/`;
          document.cookie = `${getEncryptedCookieName("username")}=${cryptoEncrypted(data.username, secretKey)}; path=/`;
          document.cookie = `${getEncryptedCookieName("email")}=${cryptoEncrypted(data.email, secretKey)}; path=/`;
          document.cookie = `${getEncryptedCookieName("full_name")}=${cryptoEncrypted(data.full_name, secretKey)}; path=/`;

          if ($rem_me.is(":checked")) { 
            // Add timestamp manually
            formArray.push({
              name: "time",
              value: new Date().getTime()
            });
            localStorage.setItem("credential", JSON.stringify(formArray));
          } else {
            // If unchecked and credential exists, remove it
            if (localStorage.getItem("credential")) {
              localStorage.removeItem("credential");
            }
          }

         


          // Determine if the environment is production
          // const isProduction = window.location.hostname !== "localhost";

          // Set the cookie with environment-specific settings
          // Cookies.set("auth_key", response.data.auth_key, {
          //   secure: isProduction, // true in production, false in development
          //   sameSite: "Strict",
          //   httpOnly: true, // Note: js-cookie does not support httpOnly because it's meant to be accessed by JavaScript
          //   expires: 2 / 24, // 2 hours, js-cookie uses days so convert hours to days
          //   path: "/",
          // });
          window.location.href = "/frontend/user_control_panel.html";
        } else {
          toaster("warning", "Login failed");
        }
      },
      error: function (xhr) {
        $loader.hide();
        var msg = "An error occurred during login.";
        if (xhr.responseJSON && xhr.responseJSON.detail) {
          msg = xhr.responseJSON.detail;
        }
        toaster("warning", msg);
      },
    });
  };
  // LOGIN
  $loginSubmit.click(function (event) {
    event.preventDefault();
    submitLogin();
  });

 
});

 // If rem_me is checked then add values to Fields
  addCredToLoginFields=()=>{
    const storedDataStr = localStorage.getItem("credential");
  if (storedDataStr) {
    const storedArray = JSON.parse(storedDataStr);

    const timeItem = storedArray.find(item => item.name === "time");
    const savedTime = timeItem ? parseInt(timeItem.value) : 0;

    const now = new Date().getTime();
    const eightHours = 8 * 60 * 60 * 1000;

    if (now - savedTime > eightHours) {
      localStorage.removeItem("credential");
    } else {
      // Get values by field name
      const getValueByName = (name) =>
        (storedArray.find(item => item.name === name) || {}).value || "";

      $("#email").val(getValueByName("email"));
      $("#password").val(getValueByName("password"));
      $("#rem_me").prop("checked", true);
    }
  }
  }

function cryptoEncrypted(obj, secretKey) {
  const jsonString = JSON.stringify(obj);
  const encryptedData = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  return encryptedData;
}

function cryptoDecrypted(encryptedData, secretKey) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}

// log out function
auth_logout = () => {
  showLoader();
  const baseUrl = "http://127.0.0.1:8001/auth/logout";
  $.ajax({
    url: baseUrl,
    type: "post",
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      console.log(data);
      if (data.status_type === "success") {
        hideLoader();
        toaster(data.status_type, data.status); // Display success message

        // Explicitly remove the cookie from the client side
        document.cookie = "chocoChipCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure;";
        document.cookie = `${getEncryptedCookieName("auth_key")}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${getEncryptedCookieName("username")}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${getEncryptedCookieName("email")}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${getEncryptedCookieName("full_name")}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        // Notify other tabs about logout
        localStorage.setItem("logout-event", Date.now());

        // Redirect to the login page after a short delay
        setTimeout(() => {
          window.location.href = "/frontend/auth-login.html";
        }, 1000);
      } else {
        hideLoader();
        toaster(data.status_type, data.status); // Display error message
      }
    },
    error: function (xhr, status, error) {
      // Handle AJAX errors (e.g., server not reachable)
      hideLoader();
      console.error("Logout request failed:", status, error);
      toaster("error", "An error occurred during logout. Please try again.");
    },
  });
};

// Listen for storage changes to sync logout across tabs
window.addEventListener('storage', function(event) {
  if (event.key === 'logout-event') {
      document.cookie = `${getEncryptedCookieName("auth_key")}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${getEncryptedCookieName("username")}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${getEncryptedCookieName("email")}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${getEncryptedCookieName("full_name")}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      if (!window.location.href.includes("auth-login.html")) {
          window.location.href = "/frontend/auth-login.html";
      }
  }
});
