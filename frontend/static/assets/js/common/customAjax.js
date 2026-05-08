// custom ajax function for post data --->>

async function custom_ajax_iFunction(url, formArray) {
  const auth_token = getCookie("auth_key");
  iFunction = (url, formArray) => {
    return $.ajax({
      url: url,
      type: "POST",
      data: JSON.stringify(formArray),
      dataType: "json",
      contentType: "application/json",
      headers: { Authorization: `Bearer ${auth_token}` },
      success: function (data) {
        return data;
      },
    });
  };
  ret = await iFunction(url, formArray);
  return ret;
} //end custom ajaxi

gFunction = (url) => {
  const auth_token = getCookie("auth_key");
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      dataType: "json",
      contentType: "application/json",
      headers: { Authorization: `Bearer ${auth_token}` },
      success: function (data) {
        resolve(data); // Resolve the promise with the fetched data
      },
      error: function (error) {
        reject(error); // Reject the promise if an error occurs
      },
    });
  });
};

async function custom_ajax_gFunction(url) {
  try {
    const ret = await gFunction(url);
    return ret;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

// convert file too base64 image string--->>
getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}; //end converter


checkForDuplicates = (array) => {
  let valuesAlreadySeen = [];

  for (let i = 0; i < array.length; i++) {
    let value = array[i];
    if (valuesAlreadySeen.indexOf(value) !== -1) {
      return true;
    }
    valuesAlreadySeen.push(value);
  }
  return false;
};

removeDuplicates = (arr) => {
  return [...new Set(arr)];
};
