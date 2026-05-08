login = () => {
  var password = document.getElementById("password").value;

  if (password != "") {
    var login_cred = [{ name: "password", value: password }];
    var base_url = "/api/login"; //hit to server

    $.ajax({
      url: base_url,
      type: "post",
      data: JSON.stringify(login_cred),
      dataType: "json",
      contentType: "application/json",
      processData: false,
      success: function (data) {
        if (data["status_type"] == "success") {
          console.log(data["auth_key"], " from login");
          document.cookie = `${getEncryptedCookieName("auth_key")}=${data["auth_key"]}; path=/`;
          window.location.href = "/";
        } else {
          toaster(data.status_type, data.status);
        }
      },
    }); //end ajax
  } else {
    toaster("warning", "Please Provide Password.");
  }
}; //End login

// For theme change
!(function (e) {
  "function" == typeof define && define.amd ? define(e) : e();
})(function () {
  "use strict";
  var e,
    t = "tablerTheme",
    a = new Proxy(new URLSearchParams(window.location.search), {
      get: function (e, t) {
        return e.get(t);
      },
    });
  if (a.theme) localStorage.setItem(t, a.theme), (e = a.theme);
  else {
    var n = localStorage.getItem(t);
    e = n || "light";
  }
  "dark" === e
    ? document.body.setAttribute("data-bs-theme", e)
    : document.body.removeAttribute("data-bs-theme");
});

function toggleActivate(element) {
  // Remove active class from all nav-items
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));

  // Add active class to the clicked nav-item
  element.classList.add("active");
}

toggleSidebarActive = (elem) => {
  $(".sidebar-item").removeClass("active");
  $(".submenu-item").removeClass("active");
  $(elem).parent().addClass("active");
};

getEncryptedCookieName = (name) => {
  if (typeof CryptoJS !== 'undefined') {
    return CryptoJS.HmacSHA256(name, "BillMate_Cookie_Secret").toString();
  }
  return name;
};

getCookie = (name) => {
  const encryptedName = getEncryptedCookieName(name);
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${encryptedName}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Preloader animation start/stop
hideLoader = () => {
  $("#preloader").css("display", "none");
};
showLoader = () => {
  $("#preloader").css("display", "flex");
};
// Form validation
// formValidate = (formArray) => {
//   let isValid = true; // Assume the form is valid initially

//   for (let i = 0; i < formArray.length; i++) {
//     const formFieldName = formArray[i].name;
//     const fieldElement = $("#" + formFieldName);
//     const fieldValue = fieldElement.val();
//     const fieldLabel = $("label[for='" + formFieldName + "']");
//     const placeholderText = fieldElement.attr("placeholder");
//     const formFieldType = fieldElement.attr("type"); // Get the field type

//     if (fieldValue === "") {
//       if (fieldElement.prop("required")) {
//         if (!fieldElement.hasClass("is-invalid")) {
//           fieldElement.addClass("is-invalid");
//         }
//         // Add an error message next to the field
//         if (!fieldElement.next("p").hasClass("text-danger")) {
//           if (placeholderText) {
//             fieldElement.after(
//               "<p class='text-danger'>" + placeholderText + " is required</p>"
//             );
//           }
//         }

//         // Add the text-danger class to the label (if it exists)
//         if (fieldLabel.length > 0) {
//           fieldLabel.addClass("text-danger");
//         }

//         isValid = false;
//       }
//     } else {
//       if (fieldElement.hasClass("is-invalid")) {
//         fieldElement.removeClass("is-invalid");
//       }

//       // Remove any existing error message
//       fieldElement.next("p").remove();

//       // Remove the text-danger class from the label (if it exists)
//       fieldLabel.removeClass("text-danger");

//       // Add specific validation logic for email, phone, or date fields here
//       switch (formFieldType) {
//         case "email":
//           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//           if (!emailRegex.test(fieldValue)) {
//             fieldElement.addClass("is-invalid");
//             // Add an error message for invalid email
//             if (!fieldElement.next("p").hasClass("text-danger")) {
//               if (placeholderText) {
//                 fieldElement.after(
//                   "<p class='text-danger'>" +
//                     placeholderText +
//                     " is not a valid email</p>"
//                 );
//               }
//             }
//             isValid = false;
//           } else {
//             fieldElement.addClass("is-valid");
//             fieldElement.next("p").remove();
//           }
//           break;
//         case "text":
//           fieldElement.addClass("is-valid");
//           // Add your date validation logic here
//           // Example: const isValidDate = validateDate(fieldValue);
//           // Check if isValidDate is false, and if so, add an error message
//           break;
//         case "tel":
//           const isNumeric = /^[0-9]+$/.test(fieldValue);
//           if (!isNumeric || fieldValue.length < 10 || fieldValue.length > 12) {
//             fieldElement.addClass("is-invalid");
//             // Add an error message for an invalid phone number
//             if (!fieldElement.next("p").hasClass("text-danger")) {
//               if (placeholderText) {
//                 fieldElement.after(
//                   "<p class='text-danger'>" +
//                     placeholderText +
//                     " should be a valid numeric number with 10 to 12 digits</p>"
//                 );
//               }
//             }
//             isValid = false;
//           } else {
//             fieldElement.addClass("is-valid");
//             fieldElement.next("p").remove();
//           }
//           break;

//         case "date":
//           fieldElement.addClass("is-valid");
//           // Add your date validation logic here
//           // Example: const isValidDate = validateDate(fieldValue);
//           // Check if isValidDate is false, and if so, add an error message
//           break;
//         case "number":
//           const isInteger =/^-?\d*\.?\d+$/.test(fieldValue);
//           if (!isInteger) {
//             fieldElement.addClass("is-invalid");
//             // Add an error message for a non-integer value
//             // Check if an error message already exists before adding a new one
//             if (!fieldElement.next("p").hasClass("text-danger")) {
//               if (placeholderText) {
//                 fieldElement.after(
//                   "<p class='text-danger'>" +
//                     placeholderText +
//                     " should be a valid integer</p>"
//                 );
//               }
//             }
//             isValid = false;
//           } else {
//             fieldElement.addClass("is-valid");

//             // Remove any existing error message if the value is valid
//             fieldElement.next("p").remove();
//           }
//           break;
//         case "password":
//           // Check if the password contains at least 6 characters and has a combination of letters and numbers
//           const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
//           if (!passwordRegex.test(fieldValue)) {
//             fieldElement.addClass("is-invalid");
//             // Add an error message for an invalid password
//             if (!fieldElement.next("p").hasClass("text-danger")) {
//               if (placeholderText) {
//                 fieldElement.after(
//                   "<p class='text-danger'>" +
//                     "Password should contain at least 6 characters and include letters and numbers</p>"
//                 );
//               }
//             }
//             isValid = false; // Set isValid to false for invalid password
//           } else {
//             fieldElement.addClass("is-valid");

//             // Remove any existing error message if the value is valid
//             fieldElement.next("p").remove();
//           }
//           break;

//         default:
//           fieldElement.addClass("is-valid");

//           // Default validation for other field types
//           break;
//       }
//     }
//   }

//   // If all fields are valid, return true
//   return isValid;
// };
formValidate = (formArray) => {
  result = true;
  for (let i = 0; i < formArray.length; i++) {
    formFieldName = formArray[i]["name"];
    if (document.getElementById(formFieldName).value == "") {
      console.log(formFieldName);
      console.log($("#" + formFieldName).prop("required"));
      if ($("#" + formFieldName).prop("required")) {
        if ($("#" + formFieldName).hasClass("is-invalid")) {
          return false;
        } else {
          $("#" + formFieldName).addClass("is-invalid");
          return false;
        }
      } else {
        if (i == formArray.length - 1) {
          return true;
        } else {
          continue;
        }
      }
    } else {
      if ($("#" + formFieldName).hasClass("is-invalid")) {
        $("#" + formFieldName)
          .removeClass("is-invalid")
          .addClass("is-valid");
        if (i == formArray.length - 1) {
          return true;
        } else {
          continue;
        }
      } else {
        $("#" + formFieldName).addClass("is-valid");
        if (i == formArray.length - 1) {
          return true;
        } else {
          continue;
        }
      }
    }

    // if (document.getElementById(formFieldName).value == "") {
    //   if ($("#" + formFieldName).prop("required")) {
    //     if ($("#" + formFieldName).hasClass("is-invalid")) {
    //       return false;
    //     } else {
    //       $("#" + formFieldName).addClass("is-invalid");

    //       if (i == formArray.length - 1) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     }
    //   } else {
    //     if (i == formArray.length - 1) {
    //       return true;
    //     } else {
    //       continue;
    //     }
    //   }
    // } else {
    //   if ($("#" + formFieldName).hasClass("is-invalid")) {
    //     $("#" + formFieldName)
    //       .removeClass("is-invalid")
    //       .addClass("is-valid");
    //   } else {
    //     $("#" + formFieldName).addClass("is-valid");
    //   }

    //   if (i == formArray.length - 1) {
    //     return true;
    //   }
    // }
  } //loop end
}; //end validate
// Refresh form using object
refresh_form = (div, obj, ignore_cols) => {
  for (const [key, value] of Object.entries(obj)) {
    if (ignore_cols.includes(key)) {
      a = 1;
    } else {
      // console.log(key,value);
      $(div + " #" + key).val(value);
      if (key === "country") {
        $(div + " #" + key).change();
      }
    }
  }
}; //end refresh_form
refreshForm = (div, obj, ignore_cols, consider_cols) => {
  const columnsToConsider = consider_cols || Object.keys(obj); // If consider_cols not provided, consider all columns

  for (const key of columnsToConsider) {
    if (ignore_cols.includes(key)) {
      // Ignore columns specified in ignore_cols
      continue;
    }

    const value = obj[key];
    $(div + " #" + key).val(value);
    console.log("Key ", key, "value ", value);

    if (key === "country") {
      $(div + " #" + key).change();
    }
  }
}; // end refreshForm

// Auto fill PAN from GSTIN
autoFillPan = (gstin, pan) => {
  gstin.length == 15
    ? $("#" + pan).val(gstin.substring(2, gstin.length - 3))
    : "";
};
tableToarray = (arr, cols) => {
  fArray2 = [];
  for (var i = 0; i < arr.length / cols; i++) {
    fArray3 = [];
    for (var j = 0; j < cols; j++) {
      fArray3[j] = arr[i * cols + j];
    }

    fArray2[i] = fArray3;
  }
  return fArray2;
}; //end function

function getTableDataAsArray(tableId, requiredPlaceholders = []) {
  console.log(requiredPlaceholders);
  var data = [];

  // Get the column names from the table header
  var columnNames = [];
  $("#" + tableId + " thead th").each(function () {
    // Convert column names to lowercase and replace spaces with underscores
    var columnName = $(this).text().toLowerCase().replace(/\s+/g, "_");
    columnNames.push(columnName);
  });

  // Iterate over each table row
  $("#" + tableId + " tbody tr").each(function () {
    var rowData = [];

    // Extract values from input fields or select elements in the current row
    $(this)
      .find("td")
      .each(function (i, cell) {
        var input = $(cell).find("input");
        var select = $(cell).find("select");

        if (input.length > 0) {
          var placeholder = columnNames[i];
          var value = input.val();
        } else if (select.length > 0) {
          var placeholder = columnNames[i];
          var value = select.val();
        } else {
          return; // Skip if neither input nor select found
        }

        // Check if the placeholder is required and the value is not blank
        console.log(placeholder);
        if (requiredPlaceholders.includes(placeholder) && value === "") {
          // Handle error or skip this row
          console.log("Error: " + placeholder + " cannot be blank.");
          toaster("warning", placeholder.toUpperCase() + " cannot be blank");
          data = []; // Set data to blank array and return
          return false; // Exit the each loop
        }

        rowData.push({
          name: placeholder,
          value: value,
        });
      });

    // Add the row data to the array if it's not empty
    if (!$.isEmptyObject(rowData)) {
      data.push(rowData);
    }
  });

  return data;
}

// Toggle password icon
toggleViewPassword = (icon, inputId) => {
  var passwordInput = $("#" + inputId);

  if ($(icon).hasClass("bi-eye")) {
    $(icon).removeClass("bi-eye");
    $(icon).addClass("bi-eye-slash");
    passwordInput.attr("type", "text");
  } else {
    $(icon).removeClass("bi-eye-slash");
    $(icon).addClass("bi-eye");
    passwordInput.attr("type", "password");
  }
};

// Current date set ---->>
multi_fn_currentDate = (ids) => {
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + month + "-" + day;
  $("#" + ids).val(today);
};
manipulate__state__city__pin = (
  state,
  city,
  pincode,
  city_list,
  pincode_list,
  what
) => {
  console.log("Hit manipulation...state...");
  var base_url = "/api/dist/search";
  formArray = [];
  var state_ = $("#" + state).val(); //state value as no

  var state__ = ""; //state as a text

  var options = document.getElementById(state).options;
  for (var i = 0; i < options.length; i++) {
    if (options[i].value === state_) {
      state__ = options[i].textContent;
    }
  }
  var city__ = $("#" + city).val();

  formArray.push({ name: "state_id", value: state_ });
  formArray.push({ name: "state_name", value: state__ });
  formArray.push({ name: "district", value: city__ });
  formArray.push({ name: "what", value: what });
  if (what == "city") {
    custom_ajax_iFunction(base_url, formArray)
      .then((data) => {
        if (data["status_type"] == "success") {
          pList = "";
          for (i = 0; i < data["dbdata"]["state_id"].length; i++) {
            pList =
              pList +
              `<option value="` +
              data["dbdata"]["pincode"][i] +
              `"></option>`;
          }
          $("#" + pincode_list).empty();
          $("#" + pincode).val("");
          $("#" + pincode_list).html(pList);
        } else {
          toastme(data.status, "top", "center", "#ffc107");
        }
      })
      .catch((err) => {
        hideLoader();
      }); //end custom_ajax_iFunction
  } else {
    $("#" + city_list).empty();
    $("#" + pincode_list).empty();
    $("#" + city).val("");
    $("#" + pincode).val("");

    custom_ajax_iFunction(base_url, formArray)
      .then((data) => {
        if (data["status_type"] == "success") {
          dList = "";
          for (i = 0; i < data["dbdata"]["state_id"].length; i++) {
            dList =
              dList +
              `<option value="` +
              data["dbdata"]["district"][i] +
              `"></option>`;
          }
          // $("#" + city).val("");
          // $("#" + pincode).val("");
          $("#" + city_list).html(dList);
        } else {
          toastme(data.status, "top", "center", "#ffc107");
        }
      })
      .catch((err) => {
        hideLoader();
      }); //end custom_ajax_iFunction
  }
};

//On country change,change state
changeState = (elem, state) => {
  console.log("Change State call");
  var country = $("#" + elem).val();
  formarray = [];
  formarray.push({ name: "country", value: country });
  // Get all state according to country from state_details table ---->
  base_url = "/api/country/state/fetch";
  custom_ajax_iFunction(base_url, formarray)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["state_id"].length; i++) {
          htmlTr = "";
          htmlTr =
            htmlTr +
            '<option value="' +
            data["dbdata"]["state_id"][i] +
            '"' +
            (data["dbdata"]["state_id"][i] == 35
              ? ' selected="selected"'
              : "") +
            ">" +
            data["dbdata"]["state_name"][i] +
            "</option>";
          html = html + htmlTr;
        }
        $("#" + state).html(html);
        manipulate__state__city__pin(
          "state",
          "city",
          "pincode",
          "cityList",
          "pincodeList",
          "nop"
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Any one field can not be black
checkFields = (auth_password, auth_cpassword) => {
  var passwordField = document.getElementById(auth_password);
  var confirmPasswordField = document.getElementById(auth_cpassword);

  if (passwordField.value !== "" && confirmPasswordField.value === "") {
    passwordField.setAttribute("required", "required");
    confirmPasswordField.setAttribute("required", "required");
    passwordField.removeAttribute("required");
  } else if (confirmPasswordField.value !== "" && passwordField.value === "") {
    passwordField.setAttribute("required", "required");
    confirmPasswordField.setAttribute("required", "required");
  } else {
    passwordField.removeAttribute("required");
    confirmPasswordField.removeAttribute("required");
  }
};

// status change function
statusChange = (elem, elem_id, table_name, pk) => {
  const elem_val = $(elem).val();
  showLoader();
  const base_url = "/api/table/status/change";
  const formArray = [
    { name: "table_name", value: table_name },
    { name: "primary_key", value: elem_id.toString() },
    { name: "primary_key_name", value: pk },
    { name: "status", value: elem_val.toString() },
  ];
  custom_ajax_iFunction(base_url, formArray)
    .then((data) => {
      if (data.status_type == "success") {
        hideLoader();
        toastme(data.status, "top", "center", "#4fbe87");
      } else if (data.status_type == "access") {
        hideLoader();
        toastme(data.status, "top", "center", "#dc3545");
      } else {
        hideLoader();
        toastme(data.status, "top", "center", "#ffc107");
      }
    })
    .catch((err) => {
      hideLoader();
      if (err.responseJSON) {
        toastme(err.responseJSON.status, "top", "center", "#ffc107");
      } else {
        toastme(
          "An error occurred while processing the request.",
          "top",
          "center",
          "#ffc107"
        );
      }
    });
};

// Billmate multiuse functions==========>>
allLedgerGroupFetch = (datalistId, inputId) => {
  base_url = "/api/parent_ledger_group/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["ledger_group_id"].length; i++) {
          var ldger_name = data["dbdata"]["ledger_group_name"][i];
          htmlTr = "";
          htmlTr = htmlTr + '<option value="' + ldger_name + '"/>';
          html = html + htmlTr;
        }
        $("#" + datalistId).html(html);
        // $("#" + ids)
        $("#" + inputId).attr("placeholder", "Type to choose....");
      }
    })
    .catch((err) => {
      console.log(err);
      loader.style.display = "none";
    });
};

//Sundry creditor/debtor/all fetch
const creditor_debtor_fetch = async (
  datalistId,
  l_type,
  c_d_from,
  inputId,
  refForm,
  ...callbacks
) => {
  console.log("**  Creditor debtor call");

  const base_url = "/api/creditor_debtor/fetch";
  const formArray = [{ name: "ledger_type", value: l_type }];
  //In python if ledger_from change then query will change
  formArray.push({ name: "ledger_from", value: c_d_from });
  try {
    const data = await custom_ajax_iFunction(base_url, formArray);

    if (data["status_type"] === "success") {
      let html = "";
      data["dbdata"]["ledger_id"].forEach((_, i) => {
        html +=
          '<option value="' +
          data["dbdata"]["legal_name"][i] +
          '">' +
          data["dbdata"]["address"][i] +
          "</option>";
      });
      $("#" + datalistId).html(html);
      $("#" + inputId).attr("placeholder", "Type to choose....");
    } else {
      toaster("warning", "No creditor found, please add first.");
    }

    $("#" + inputId).on("change", function () {
      console.log("creditor_debtor_fetch creditor_name trigger");
      const selectedLegalName = $(this).val();
      const index = data.dbdata.legal_name.indexOf(selectedLegalName);
      if (index !== -1) {
        const selectedData = {
          //name: data.dbdata.legal_name[index],
          creditor_id: data.dbdata.ledger_id[index],
          country: data.dbdata.country[index],
          address: data.dbdata.address[index],
          email: data.dbdata.email[index],
          phone: data.dbdata.phone[index],
          pan: data.dbdata.pan[index],
          gstin: data.dbdata.gstin[index],
          city: data.dbdata.city[index],
          pincode: data.dbdata.pincode[index],
          state: data.dbdata.state[index],
        };
        const stateData = { state: data.dbdata.state[index] };
        refresh_form("#" + refForm, selectedData, []);
        setTimeout(() => {
          refresh_form("#" + refForm, stateData, []);
        }, 1500);
        // After execute selected creditor now you can call another functions
        if (callbacks.length > 0) {
          callbacks.forEach((callback) => {
            if (typeof callback === "function") {
              callback();
            }
          });
        }
      } else {
        toaster("warning", "Something went wrong, please try again.");
      }
    });
  } catch (err) {
    console.log(err);
    toaster("warning", "Something went wrong, please try again.");
  }
};

// Make total for a table in footer
calculateFooterTotals = (tableName, columnNames, footerColumnIndexes) => {
  console.log("Call calculateFooterTotals");
  var totals = new Array(columnNames.length).fill(0);

  // Iterate through each row in the table body
  $("#" + tableName + " tr").each(function () {
    columnNames.forEach((colName, index) => {
      var value =
        parseFloat(
          $(this)
            .find("input[placeholder='" + colName + "']")
            .val()
        ) || 0;
      totals[index] += isNaN(value) ? 0 : value;
    });
  });

  // Update the totals in the footer
  footerColumnIndexes.forEach((footerIndex, index) => {
    $("tfoot tr").find("td").eq(footerIndex).text(totals[index].toFixed(6));
  });
};

/*---------------------------
remove_row_from_table its connected to all tables
callback=it can call any *function after remove tables row
---------------------------*/

remove_row_from_table = (elem, ...callbacks) => {
  // Find the parent tbody element of the row
  const tbody = $(elem).closest("tbody");

  // Remove the parent row
  $(elem).parent().remove();

  // Update the serial numbers of the remaining rows in the tbody
  tbody.find("tr").each(function (index, row) {
    // Get the current serial number from the second column
    const serialNumberCell = $(row).find("td:nth-child(2)");
    const currentSerialNumber = index + 1;

    // Update the serial number in the second column
    serialNumberCell.text(currentSerialNumber);
  });

  // Check if any callback functions are provided and call them
  if (callbacks.length > 0) {
    callbacks.forEach((callback) => {
      if (typeof callback === "function") {
        callback();
      }
    });
  }
};

// Change adjusment method for receipt and payment
changeAdjMethod = (tbodyId, placeholder) => {
  var adjMethodSelect = document.getElementById("adj_method");
  var invoiceInputs = document.querySelectorAll(
    `#${tbodyId} input[type='text'][placeholder='${placeholder}']`
  );

  if (adjMethodSelect.value !== "against ref") {
    invoiceInputs.forEach(function (input) {
      input.readOnly = true;
    });
  } else {
    invoiceInputs.forEach(function (input) {
      input.readOnly = false;
    });
  }
};
