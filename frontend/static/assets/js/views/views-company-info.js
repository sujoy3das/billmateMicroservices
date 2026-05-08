views_company_info_display = () => {
  var views_company_info_page_pretitle = "<p>Add/Update</p>";
  var views_company_info_page_title = "<p>Company Info</p>";
  var views_company_info_page_body = `<div class="container-xl">
    <div class="row row-deck row-cards">
        <div class="col-12">
            <form class="card" id="company_info_form">
                <div class="card-body">
                    <h3 class="card-title">Update Company</h3>
                    <div class="row row-cards">

                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label required">Company Name</label>
                                <input type="text" class="form-control text-uppercase" placeholder="Company Name"
                                    id="company_name" name="company_name" required>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">Company Tag Line</label>
                                <input type="text" class="form-control text-uppercase" placeholder="Company Tag Line"
                                    id="company_tag_line" name="company_tag_line">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label required">Address Primary</label>
                                <textarea rows="2" class="form-control text-uppercase"
                                    placeholder="Address(City & State not here)" id="address1"
                                    name="address1" required></textarea>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">Address Secondary</label>
                                <textarea rows="2" class="form-control text-uppercase"
                                    placeholder="Address(City & Pincode & State here)" id="address2"
                                    name="address2"></textarea>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label required">City</label>
                                <input type="text" class="form-control text-capitalize" placeholder="City" id="city"
                                    name="city" required>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label required">Postal Code/Pin Code</label>
                                <input type="number" class="form-control rmvarrw" placeholder="ZIP Code"
                                    id="pincode" name="pincode" required>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">Country</label>
                                <select class="form-control form-select" id="country" name="country"
                                    onchange="changeState(this);">
                                    <option value="india">India</option>
                                    <option value="china">China</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">State/Province</label>
                                <select class="form-control form-select" id="state" name="state">
                                    <option value="1">Andaman And nicobar islands</option>

                                    <option value="2">Arunachal Pradesh</option>

                                    <option value="36">Andhra Pradesh</option>

                                    <option value="3">Assam</option>

                                    <option value="4">Bihar</option>

                                    <option value="5">Chandigarh</option>

                                    <option value="6">Chhattisgarh</option>

                                    <option value="7">Dadar and Nagar Haveli</option>

                                    <option value="8">Daman and Diu</option>

                                    <option value="9">Delhi</option>

                                    <option value="10">Lakshadweep</option>

                                    <option value="11">Puducherry</option>

                                    <option value="12">Goa</option>

                                    <option value="13">Gujarat</option>

                                    <option value="14">Haryana</option>

                                    <option value="15">Himachal Pradesh</option>

                                    <option value="16">Jammu and Kashmir</option>

                                    <option value="17">Jharkhand</option>

                                    <option value="18">Karnataka</option>

                                    <option value="19">Kerala</option>

                                    <option value="20">Madhya Pradesh</option>

                                    <option value="21">Maharashtra</option>

                                    <option value="22">Manipur</option>

                                    <option value="23">Meghalaya</option>

                                    <option value="24">Mizoram</option>

                                    <option value="25">Nagaland</option>

                                    <option value="26">Odisha</option>

                                    <option value="27">Punjab</option>

                                    <option value="28">Rajasthan</option>

                                    <option value="29">Sikkim</option>

                                    <option value="30">Tamil Nadu</option>

                                    <option value="31">Telangana</option>

                                    <option value="32">Tripura</option>

                                    <option value="33">Uttar Pradesh</option>

                                    <option value="34">Uttarakhand</option>

                                    <option value="35" selected="">West Bengal</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" placeholder="Email" id="email"
                                    name="email">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-control" maxlength="12"
                                    placeholder="Phone" id="phone" name="phone">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">GSTIN</label>
                                <input type="text" class="form-control text-uppercase" placeholder="GSTIN" maxlength="15" id="gstin"
                                    name="gstin" oninput="autoFillPan(this.value,'pan');">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">PAN</label>
                                <input type="text" class="form-control text-uppercase" placeholder="PAN" maxlength="10" id="pan"
                                    name="pan">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">TAN No</label>
                                <input type="text" class="form-control text-uppercase" placeholder="TAN NO" id="tan_no"
                                    name="tan_no">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">S.TAX No</label>
                                <input type="text" class="form-control text-uppercase" placeholder="S.TAX No" id="s_tax_no"
                                    name="s_tax_no">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">MSME No</label>
                                <input type="text" class="form-control text-uppercase" placeholder="MSME No" id="msme_no"
                                    name="msme_no">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="mb-0">
                                <label class="form-label">Registration No</label>
                                <input type="text" class="form-control text-uppercase" placeholder="Registration No" id="registration_no"
                                    name="registration_no">
                            </div>
                        </div>


                    </div>
                </div>
                <div class="card-footer d-flex align-items-center">
                    <a href="javascript:;" class="btn-secondary text-red me-auto"
                        onclick="views_company_info_display();">Close</a>
                    <button type="submit" class="btn btn-primary" id="update_comany_info">Update
                        Details</button>
                </div>

            </form>
        </div>
    </div>
    </div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(views_company_info_page_pretitle);
  $("#main-content .page-title").empty().html(views_company_info_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(views_company_info_page_body);

  // Fetch data and insert for update --->>
  fetch_url = "/api/company-info/get-single-data";
  showLoader();
  custom_ajax_gFunction(fetch_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        refresh_form("#company_info_form", data["dbdata"], [
          "company_id",
          "updated_by",
          "updated_on",
        ]); //Take main div id || data object || ignore cols
        setTimeout(() => {
          refreshForm("#company_info_form", data["dbdata"], [], ["state"]);
        }, 1000);
      } else {
        toaster(data.status, data.status_type);
      }
      hideLoader();
    })
    .catch((err) => {
      console.log(err);
      hideLoader();
    });
  // Update company-info-->>
  $("#update_comany_info").click(function (event) {
    event.preventDefault();
    showLoader();
    const company_info_formArray = $("#company_info_form").serializeArray();

    const validated = formValidate(company_info_formArray);
    if (validated) {
      const base_url = "/api/company_info/update";
      custom_ajax_iFunction(base_url, company_info_formArray)
        .then((data) => {
          if (data.status_type == "success") {
            toaster(data.status_type, data.status);
          } else {
            toaster(data.status_type, data.status);
          }
          hideLoader();
        })
        .catch((err) => {
          hideLoader();
          toaster("error", "Something went error.");
        });
    } else {
      hideLoader();
    }
  });
};
