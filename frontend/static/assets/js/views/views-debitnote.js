views_debitnote_display = () => {
  var views_debitnote_page_pretitle = "<p>View</p>";
  var views_debitnote_page_title = "<p>Debit Note</p>";
  var views_debitnote_page_button = ` <div class="btn-list">
              <a href="javascript:;" class="btn btn-primary d-none d-sm-inline-block" onclick="create_new_debitnote();">
                <i class="ti ti-plus"></i>
                Create new debitnote
              </a>
              <a href="javascript:;" class="btn btn-primary d-sm-none btn-icon" aria-label="Create new debitnote" onclick="create_new_debitnote();">
                <i class="ti ti-plus"></i>
              </a>
            </div>`;
  var views_debitnote_page_body = ` <div class="container-xl">
              <div class="row row-deck row-cards">
                  <div class="col-12">
                      <div class="row row-cards">
                          <div class="col-sm-6 col-lg-3">
                              <div class="card card-sm">
                                  <div class="card-body">
                                      <div class="row align-items-center">
                                          <div class="col-auto">
                                              <span
                                                  class="bg-primary text-white avatar">
                                                  <i class="ti ti-users-group tf"></i>
                                              </span>
                                          </div>
                                          <div class="col">
                                              <div class="fw-bold">
                                                  Total Customer
                                              </div>
                                              <div class="text-muted">
                                                  1200
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-sm-6 col-lg-3">
                              <div class="card card-sm">
                                  <div class="card-body">
                                      <div class="row align-items-center">
                                          <div class="col-auto">
                                              <span
                                                  class="bg-green text-white avatar">
                                                  <i class="ti ti-user-bolt tf"></i>
                                              </span>
                                          </div>
                                          <div class="col">
                                              <div class="fw-bold">
                                                  Active Customer
                                              </div>
                                              <div class="text-muted">
                                                  32
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-sm-6 col-lg-3">
                              <div class="card card-sm">
                                  <div class="card-body">
                                      <div class="row align-items-center">
                                          <div class="col-auto">
                                              <span
                                                  class="bg-twitter text-white avatar"><i class="ti ti-user-plus tf"></i>
                                              </span>
                                          </div>
                                          <div class="col">
                                              <div class="fw-bold">
                                                New Customer
                                              </div>
                                              <div class="text-muted">
                                                  16
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-sm-6 col-lg-3">
                              <div class="card card-sm">
                                  <div class="card-body">
                                      <div class="row align-items-center">
                                          <div class="col-auto">
                                              <span class="bg-facebook text-white avatar"> <i class="ti ti-coins tf"></i>
                                              </span>
                                          </div>
                                          <div class="col">
                                              <div class="fw-bold">Closing Balance
            
                                              </div>
                                              <div class="text-muted">
                                                  21,000
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
            
            
                  <div class="col-12">
                      <div class="card">
                          <div class="card-header">
                              <h3 class="card-title">All Debitnotes</h3>
                          </div>
                          <div class="table-responsive p-1" style="min-height:500px">
                              <table class="table card-table text-nowrap " id="datatable_init">
                                  <thead>
                                      <tr>
                                          <th class="w-2">SL.NO</th>
                                          <th>Debitnote Id</th>
                                          <th>Return Date</th>
                                          <th>Client Name</th>
                                          <th>Purchase Id</th>
                                          <th>Return Value</th>
                                          <th></th>
                                      </tr>
                                  </thead>
                                  <tbody id="debitnote_display_table_body">
                                  <tr>
                                  <td class="text-muted text-center" >No data found,Create one.</td>
                                  <td class="text-muted text-center" >No data found,Create one.</td>
                                  <td class="text-muted text-center" >No data found,Create one.</td>
                                  <td class="text-muted text-center" >No data found,Create one.</td>
                                  <td class="text-muted text-center" >No data found,Create one.</td>
                                  <td class="text-muted text-center" >No data found,Create one.</td>
                                  <td class="text-muted text-center" >No data found,Create one.</td>
                                  </tr>
                                  </tbody>
                              </table>
                          </div>
                         
                      </div>
                  </div>
              </div>
            </div>`;
  $("#main-content .page-pretitle").empty().html(views_debitnote_page_pretitle);
  $("#main-content .page-title").empty().html(views_debitnote_page_title);
  $("#main-content .page-button").empty().html(views_debitnote_page_button);
  $("#main-content .page-body").empty().html(views_debitnote_page_body);

  // Refresh debitnote display--->.
  refreshDebitnoteDisplay = () => {
    base_url = "/api/debitnote/get-all-data";
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        html = "";
        if (data["status_type"] == "success") {
          html = "";
          for (i = 0; i < data["dbdata"]["debitnote_details_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + '<tr class="text-uppercase">';
            htmlTr = htmlTr + '<td class="text-muted">' + slno + "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-muted">' +
              data["dbdata"]["debitnote_details_id"][i] +
              "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["return_date"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["creditor_name"][i] + "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["purchase_details_id"][i] +
              "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-center">' +
              data["dbdata"]["total_amount"][i] +
              "</td>";
            htmlTr =
              htmlTr +
              `<td class="py-0">
                          <div class="btn-list flex-nowrap">
                          <div class="dropdown">
                            <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown">
                              Actions
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="javascript:;" onclick="update_debitnote(` +
              data["dbdata"]["debitnote_details_id"][i] +
              `);">
                            Edit
                          </a></div></div></div></td>`;
            htmlTr = htmlTr + "</tr>";

            html = html + htmlTr;
          } //end of for loop
        } else {
          html = `<tr>
                    <td class="text-muted text-center" >No data found,Create one.</td>
                    <td class="text-muted text-center" >No data found,Create one.</td>
                    <td class="text-muted text-center" >No data found,Create one.</td>
                    <td class="text-muted text-center" >No data found,Create one.</td>
                    <td class="text-muted text-center" >No data found,Create one.</td>
                    <td class="text-muted text-center" >No data found,Create one.</td>
                    <td class="text-muted text-center" >No data found,Create one.</td>
                    </tr>`;
        }
        $("#datatable_init").DataTable();
        if ($.fn.DataTable.isDataTable("#datatable_init")) {
          $("#datatable_init").DataTable().clear().destroy();
          $("#debitnote_display_table_body").html(html);
          $("#datatable_init").DataTable({
            responsive: true,
          });
        } else {
          $("#debitnote_display_table_body").html(html);
          $("#datatable_init").DataTable({
            responsive: true,
          });
        }
        hideLoader();
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
      });
  };
  refreshDebitnoteDisplay();
};

create_new_debitnote = () => {
  var create_new_debitnote_page_pretitle = "<p>Add new</p>";
  var create_new_debitnote_page_title = "<p>Debitnote</p>";
  var create_new_debitnote_page_body = ` <div class="container-xl">
    <div class="row row-cards">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                        <li class="nav-item ">
                            <a href="#debitnote_info_tab" class="nav-link active"
                                data-bs-toggle="tab">Debitnote
                                Info</a>
                        </li>
                        <li class="nav-item">
                            <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Client
                                Info</a>
                        </li>
                        <li class="nav-item ms-auto">
                            <a href="#purchases_tab" class="nav-link" data-bs-toggle="tab">
                                <i class="ti ti-plus me-1"></i>
                                Purchases
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane fade active show" id="debitnote_info_tab">
                            <h4>Debitnote Info</h4>
                            <form id="debitnote_details_form">
                                <div class="row row-cards">
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label">Debitnote Id</label>
                                            <input type="number" class="form-control"
                                                placeholder="Debitnote Id" id="debitnote_details_id"
                                                name="debitnote_details_id" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">Return Date</label>
                                            <input type="date" class="form-control"
                                                placeholder="Return Date" id="return_date"
                                                name="return_date" required>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-0">
                                            <label class="form-label">Narration</label>
                                            <textarea rows="2" class="form-control text-uppercase"
                                                placeholder="Narration" id="narration"
                                                name="narration"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">Purchase IDs</label>
                                            <input type="text"
                                                class="form-control text-uppercase"
                                                placeholder="Purchase IDs" id="purchase_ids" name="purchase_ids" list="purchaseIdsDatalist"
                                                required>
                                            <datalist id="purchaseIdsDatalist"></datalist>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="tab-pane fade" id="creditor_info_tab">
                            <h4>Creditor Info</h4>
                            <form id="creditor_details_form">
                                <div class="row row-cards">
                                    <div class="col-md-12">
                                        <div class="mb-0">
                                            <label class="form-label required">Creditor Name</label>
                                            <div class="input-icon mb-3">
                                                <input type="text" class="form-control text-uppercase"
                                                    list="creditorDatalist" placeholder="Creditor Name"
                                                    id="creditor_name" name="creditor_name" required>
                                                <datalist id="creditorDatalist"></datalist>
                                                <input type="hidden" id="creditor_id"
                                                    name="creditor_id">
                                                <span class="input-icon-addon">
                                                    <i class="ti ti-search tf"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-0">
                                            <label class="form-label required">Address</label>
                                            <input type="text" class="form-control"
                                                placeholder="Address" id="address" name="address"
                                                required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control" placeholder="Email"
                                                id="email" name="email">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label">Contact No</label>
                                            <input type="tel" class="form-control"
                                                placeholder="Contact No" id="phone" name="phone">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">City</label>
                                            <input type="text" class="form-control" placeholder="City"
                                                id="city" name="city" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">Postal Code</label>
                                            <input type="text" class="form-control"
                                                placeholder="ZIP Code" id="pincode" name="pincode"
                                                required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">Country</label>
                                            <select class="form-control form-select" id="country"
                                                name="country" required onchange="changeState(this);">
                                                <option value="india">India</option>
                                                <option value="china">China</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">State</label>
                                            <select class="form-control form-select" id="state"
                                                name="state" required>
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
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label">GSTIN</label>
                                            <input type="text" class="form-control" placeholder="GSTIN"
                                                id="gstin" name="gstin">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="tab-pane fade" id="purchases_tab">
                            <h4>Item Details</h4>
                            <div class="table-responsive mb-2" style="max-height: 262px;">
                            <table class="table table-vcenter card-table"
                            id="purchase_item_details_table">
                            <thead>
                                <tr>
                                    <th class="w-1"></th>
                                    <th>S.NO</th>
                                    <th>STOCK NAME</th>
                                    <th>STOCK ITEMS ID</th>
                                    <th>CTH</th>
                                    <th>QTY</th>
                                    <th>UQC</th>
                                    <th>PRICE</th>
                                    <th>AMOUNT</th>
                                    <th>GST RATE</th>
                                    <th>GST AMOUNT</th>
                                    <th>TOTAL PRICE</th>
                                    <th class="w-1"></th>
                                </tr>
                            </thead>
                            <tbody id="purchaseDetailsTableTbody">
                                <tr>
                                    <td class="ps-3" onclick="addPurchaseItemRow();"><i
                                            class="ti ti-plus"></i></td>
                                    <td class="text-muted">1</td>
                                    <td class="p-1">
                                        <input type="text" class=" fs-6 border-0 text-uppercase"
                                            placeholder="STOCK NAME" list="stockNameDatalist1">
                                        <datalist id="stockNameDatalist1">

                                        </datalist>

                                    </td>
                                    <td class="p-1">
                                        <input type="number" class="fs-6 border-0 rmvarrw"
                                            placeholder="STOCK ITEMS ID" readonly>
                                    </td>
                                    <td class="p-1">
                                        <input type="number" class="fs-6 border-0 rmvarrw"
                                            placeholder="CTH">
                                    </td>
                                    <td class="p-1"><input type="number"
                                            class=" fs-6 border-0 rmvarrw" placeholder="QTY">
                                    </td>
                                    <td class="p-1"><input type="text"
                                            class=" fs-6 border-0 text-uppercase"
                                            placeholder="UQC">
                                    </td>
                                    <td class="p-1"><input type="number"
                                            class=" fs-6 border-0 rmvarrw" placeholder="PRICE">
                                    </td>
                                    <td class="p-1"><input type="number"
                                            class=" fs-6 border-0 rmvarrw" placeholder="AMOUNT">
                                    </td>
                                    <td class="p-1"><input type="number"
                                            class="form-control fs-6 border-0 rmvarrw"
                                            placeholder="GST RATE">
                                    </td>
                                    <td class="p-1"><input type="number"
                                            class=" fs-6 border-0 rmvarrw"
                                            placeholder="GST AMOUNT">
                                    </td>
                                    <td class="p-1"><input type="number"
                                            class=" fs-6 border-0 rmvarrw"
                                            placeholder="TOTAL PRICE" readonly>
                                    </td>

                                    <td class="pe-3"></i></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="fs-6">
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                    <td class="p-1"></td>
                                </tr>
                            </tfoot>
                        </table>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-12 ms-auto">
                                    <div class="card">
                                        <div class="card-body">
                                            <h3 class="card-title">Totals</h3>
                                            <table class="table table-sm table-borderless"
                                                id="invoiceTotalsTable">
                                                <tbody id="invoiceTotalsTableTbody">
                                                    <tr class="border-top">
                                                        <td>
                                                            Total Amount
                                                        </td>
                                                        <td class=" fw-bold text-end" id="total_amount"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex align-items-center py-2">
                    <a href="javascript:;" class="btn-secondary text-red me-auto"
                        onclick="views_debitnote_display();">Close</a>
                    <button type="submit" class="btn btn-primary" id="new_debitnote_submit">Save
                        Details</button>
                </div>
            </div>
        </div>
    </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_debitnote_page_pretitle);
  $("#main-content .page-title").empty().html(create_new_debitnote_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(create_new_debitnote_page_body);

  //Fetch all debit list from customer--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "customers",
    "0",
    "creditor_name",
    "creditor_details_form",
    () => {
      // Callback function according to this customer call all purchase ids for this customer
      miniFetchPurchasess("purchaseIdsDatalist");
    }
  );

  //Set current date for payment date
  multi_fn_currentDate("return_date");

  //Calculate purchase item tables tfoot
  $("#purchaseDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='AMOUNT'],input[placeholder='QTY'],input[placeholder='PRICE'],input[placeholder='GST RATE']",
    function () {
      calculateDebitnotePurchaseTotal();
      calculateFooterTotals(
        "purchaseDetailsTableTbody",
        ["QTY", "AMOUNT", "GST AMOUNT", "TOTAL PRICE"],
        [5, 8, 10, 11]
      );
    }
  );

  //  Submit function for insert data in DB
  $("#new_debitnote_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const debitnoteDetailsFormArray = $(
      "#debitnote_details_form"
    ).serializeArray();
    const creditorDetailsFormArray = $(
      "#creditor_details_form"
    ).serializeArray();

    // Combine form arrays into a single array
    const groupFormArray = [
      ...debitnoteDetailsFormArray,
      ...creditorDetailsFormArray,
    ];

    // Get table data
    const purchaseItemDetailsFormArray = getTableDataAsArray(
      "purchase_item_details_table",
      ["stock_name", "total_price"]
    );

    // Validate form fields
    const allValidated = formValidate([
      ...debitnoteDetailsFormArray,
      ...creditorDetailsFormArray,
    ]);

    if (
      allValidated &&
      $("#total_amount").text() !== "" &&
      parseFloat($("#total_amount").text()) !== 0
    ) {
      const base_url = "/api/debitnote/add-new";
      //  Add one extra field is Total amount
      groupFormArray.push({
        name: "total_amount",
        value: $("#total_amount").text(),
      });

      // Push table data into mainFormArray with condition
      const mainFormArray = [
        { name: "debitnote_details_formArray", value: groupFormArray },
        {
          name: "purchase_item_details_formarray",
          value: purchaseItemDetailsFormArray,
        },
      ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshDebitnoteDisplay();
            toaster(data.status_type, data.status);
            // $("#new_debitnote_submit").attr("disabled", true);
          } else {
            toaster(data.status_type, data.status);
          }
          hideLoader();
        })
        .catch((err) => {
          hideLoader();
          toaster("error", "Something went wrong.");
        });
    } else {
      hideLoader();
      toaster(
        "error",
        "All fields are not valid or Total amount can not be blank."
      );
    }
  });
};

update_debitnote = (passdata_debitnote_details_id) => {
  var update_debitnote_page_pretitle = "<p>Edit</p>";
  var update_debitnote_page_title = "<p>Debitnote</p>";
  var update_debitnote_page_body = ` <div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item ">
                          <a href="#debitnote_info_tab" class="nav-link active"
                              data-bs-toggle="tab">Debitnote
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Client
                              Info</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#purchases_tab" class="nav-link" data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Purchases
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade active show" id="debitnote_info_tab">
                          <h4>Debitnote Info</h4>
                          <form id="debitnote_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Debitnote Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Debitnote Id" id="debitnote_details_id"
                                              name="debitnote_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Return Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Return Date" id="return_date"
                                              name="return_date" required>
                                      </div>
                                  </div>
                                  <div class="col-md-12">
                                      <div class="mb-0">
                                          <label class="form-label">Narration</label>
                                          <textarea rows="2" class="form-control text-uppercase"
                                              placeholder="Narration" id="narration"
                                              name="narration"></textarea>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Purchase IDs</label>
                                          <input type="text"
                                              class="form-control text-uppercase"
                                              placeholder="Purchase IDs" id="purchase_ids" name="purchase_ids" list="purchaseIdsDatalist"
                                              required>
                                          <datalist id="purchaseIdsDatalist"></datalist>
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade" id="creditor_info_tab">
                          <h4>Creditor Info</h4>
                          <form id="creditor_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-12">
                                      <div class="mb-0">
                                          <label class="form-label required">Creditor Name</label>
                                          <div class="input-icon mb-3">
                                              <input type="text" class="form-control text-uppercase"
                                                  list="creditorDatalist" placeholder="Creditor Name"
                                                  id="creditor_name" name="creditor_name" required>
                                              <datalist id="creditorDatalist"></datalist>
                                              <input type="hidden" id="creditor_id"
                                                  name="creditor_id">
                                              <span class="input-icon-addon">
                                                  <i class="ti ti-search tf"></i>
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col-md-12">
                                      <div class="mb-0">
                                          <label class="form-label required">Address</label>
                                          <input type="text" class="form-control"
                                              placeholder="Address" id="address" name="address"
                                              required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Email</label>
                                          <input type="email" class="form-control" placeholder="Email"
                                              id="email" name="email">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Contact No</label>
                                          <input type="tel" class="form-control"
                                              placeholder="Contact No" id="phone" name="phone">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">City</label>
                                          <input type="text" class="form-control" placeholder="City"
                                              id="city" name="city" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Postal Code</label>
                                          <input type="text" class="form-control"
                                              placeholder="ZIP Code" id="pincode" name="pincode"
                                              required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Country</label>
                                          <select class="form-control form-select" id="country"
                                              name="country" required onchange="changeState(this);">
                                              <option value="india">India</option>
                                              <option value="china">China</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">State</label>
                                          <select class="form-control form-select" id="state"
                                              name="state" required>
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
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">GSTIN</label>
                                          <input type="text" class="form-control" placeholder="GSTIN"
                                              id="gstin" name="gstin">
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade" id="purchases_tab">
                          <h4>Item Details</h4>
                          <div class="table-responsive mb-2" style="max-height: 262px;">
                          <table class="table table-vcenter card-table"
                          id="purchase_item_details_table">
                          <thead>
                              <tr>
                                  <th class="w-1"></th>
                                  <th>S.NO</th>
                                  <th>STOCK NAME</th>
                                  <th>STOCK ITEMS ID</th>
                                  <th>CTH</th>
                                  <th>QTY</th>
                                  <th>UQC</th>
                                  <th>PRICE</th>
                                  <th>AMOUNT</th>
                                  <th>GST RATE</th>
                                  <th>GST AMOUNT</th>
                                  <th>TOTAL PRICE</th>
                                  <th class="w-1"></th>
                              </tr>
                          </thead>
                          <tbody id="purchaseDetailsTableTbody">
                              <tr>
                                  <td class="ps-3" onclick="addPurchaseItemRow();"><i
                                          class="ti ti-plus"></i></td>
                                  <td class="text-muted">1</td>
                                  <td class="p-1">
                                      <input type="text" class=" fs-6 border-0 text-uppercase"
                                          placeholder="STOCK NAME" list="stockNameDatalist1">
                                      <datalist id="stockNameDatalist1">

                                      </datalist>

                                  </td>
                                  <td class="p-1">
                                      <input type="number" class="fs-6 border-0 rmvarrw"
                                          placeholder="STOCK ITEMS ID" readonly>
                                  </td>
                                  <td class="p-1">
                                      <input type="number" class="fs-6 border-0 rmvarrw"
                                          placeholder="CTH">
                                  </td>
                                  <td class="p-1"><input type="number"
                                          class=" fs-6 border-0 rmvarrw" placeholder="QTY">
                                  </td>
                                  <td class="p-1"><input type="text"
                                          class=" fs-6 border-0 text-uppercase"
                                          placeholder="UQC">
                                  </td>
                                  <td class="p-1"><input type="number"
                                          class=" fs-6 border-0 rmvarrw" placeholder="PRICE">
                                  </td>
                                  <td class="p-1"><input type="number"
                                          class=" fs-6 border-0 rmvarrw" placeholder="AMOUNT">
                                  </td>
                                  <td class="p-1"><input type="number"
                                          class="form-control fs-6 border-0 rmvarrw"
                                          placeholder="GST RATE">
                                  </td>
                                  <td class="p-1"><input type="number"
                                          class=" fs-6 border-0 rmvarrw"
                                          placeholder="GST AMOUNT">
                                  </td>
                                  <td class="p-1"><input type="number"
                                          class=" fs-6 border-0 rmvarrw"
                                          placeholder="TOTAL PRICE" readonly>
                                  </td>

                                  <td class="pe-3"></i></td>
                              </tr>
                          </tbody>
                          <tfoot>
                              <tr class="fs-6">
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                                  <td class="p-1"></td>
                              </tr>
                          </tfoot>
                      </table>
                          </div>
                          <div class="row">
                              <div class="col-lg-6 col-md-12 ms-auto">
                                  <div class="card">
                                      <div class="card-body">
                                          <h3 class="card-title">Totals</h3>
                                          <table class="table table-sm table-borderless"
                                              id="invoiceTotalsTable">
                                              <tbody id="invoiceTotalsTableTbody">
                                                  <tr class="border-top">
                                                      <td>
                                                          Total Amount
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_amount"></td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center py-2">
                  <a href="javascript:;" class="btn-secondary text-red me-auto"
                      onclick="views_debitnote_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="debitnote_upddate_submit">Update
                      Details</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(update_debitnote_page_pretitle);
  $("#main-content .page-title").empty().html(update_debitnote_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_debitnote_page_body);
  //Fetch all debit list from customer--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "customers",
    "0",
    "creditor_name",
    "creditor_details_form",
    () => {
      // Callback function according to this customer call all purchase ids for this customer
      miniFetchPurchasess("purchaseIdsDatalist");
    }
  );
  //Set current date for payment date
  multi_fn_currentDate("return_date");
  //   miniFetchInvoicess("invoiceIdsDatalist");

  // Fetch single data for update***************>>
  fetch_url = "/api/debitnote/get-single-data";
  result = [
    { name: "debitnote_details_id", value: passdata_debitnote_details_id },
  ];
  //   showLoader();
  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      if (data["status_type"] == "success") {
        refreshForm(
          "#creditor_details_form",
          data.debitnote_details,
          [],
          [
            "creditor_name",
            "creditor_id",
            "address",
            "email",
            "phone",
            "city",
            "pincode",
            "country",
            "gstin",
          ]
        );
        // Trigger change creditor name for call miniFetchInvoicess
        $("#creditor_name").change();
        refreshForm(
          "#debitnote_details_form",
          data.debitnote_details,
          [],
          [
            "debitnote_details_id",
            "return_date",
            "narration",
            "purchase_details_id",
          ]
        );

        setTimeout(() => {
          refreshForm(
            "#creditor_details_form",
            data.debitnote_details,
            [],
            ["state"]
          );
        }, 1000);

        $("#purchaseDetailsTableTbody").empty();
        addProductItemRowDebitnote();
        dbLen = data["dbdata"]["debitnote_details_id"].length;
        populateLastRowWithDataPurchasess(
          data,
          "purchase_item_details_table",
          dbLen,
          0
        );
        //   After populate data now calculte totals
        calculateDebitnotePurchaseTotal();
        calculateFooterTotals(
          "purchaseDetailsTableTbody",
          ["QTY", "AMOUNT", "GST AMOUNT", "TOTAL PRICE"],
          [5, 8, 10, 11]
        );
        setTimeout(() => {
          $("#purchase_ids").val(
            data["debitnote_details"]["purchase_details_id"][0]
          );
        }, 1000);
      } else {
        toaster(data.status, data.status_type);
      }
      hideLoader();
    })
    .catch((err) => {
      console.log(err);
      hideLoader();
    }); //End fetch single data

  /* Calculate tables tfoot
       Calculate main total amount-
       only hit when any input field is change
      */

  //Calculate invoice item tables tfoot and all totals**
  $("#purchaseDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='AMOUNT'],input[placeholder='QTY'],input[placeholder='DISCOUNT'],input[placeholder='RATE'],input[placeholder='GST']",
    function () {
      calculateDebitnotePurchaseTotal();
      calculateFooterTotals(
        "purchaseDetailsTableTbody",
        ["QTY", "AMOUNT", "GST AMOUNT", "TOTAL PRICE"],
        [5, 8, 10, 11]
      );
    }
  );

  //  Submit function for update data in DB
  $("#debitnote_upddate_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const debitnoteDetailsFormArray = $(
      "#debitnote_details_form"
    ).serializeArray();
    const creditorDetailsFormArray = $(
      "#creditor_details_form"
    ).serializeArray();

    // Combine form arrays into a single array
    const groupFormArray = [
      ...debitnoteDetailsFormArray,
      ...creditorDetailsFormArray,
    ];

    // Get table data
    const purchaseItemDetailsFormArray = getTableDataAsArray(
      "purchase_item_details_table",
      ["stock_name", "total_price"]
    );

    // Validate form fields
    const allValidated = formValidate([
      ...debitnoteDetailsFormArray,
      ...creditorDetailsFormArray,
    ]);

    if (
      allValidated &&
      $("#total_amount").text() !== "" &&
      parseFloat($("#total_amount").text()) !== 0
    ) {
      const base_url = "/api/debitnote/update";
      //  Add one extra field is Total amount
      groupFormArray.push({
        name: "total_amount",
        value: $("#total_amount").text(),
      });

      // Push table data into mainFormArray with condition
      const mainFormArray = [
        { name: "debitnote_details_formArray", value: groupFormArray },
        {
          name: "purchase_item_details_formarray",
          value: purchaseItemDetailsFormArray,
        },
      ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshDebitnoteDisplay();
            toaster(data.status_type, data.status);
            // $("#debitnote_upddate_submit").attr("disabled", true);
          } else {
            toaster(data.status_type, data.status);
          }
          hideLoader();
        })
        .catch((err) => {
          hideLoader();
          toaster("error", "Something went wrong.");
        });
    } else {
      hideLoader();
      toaster(
        "error",
        "All fields are not valid or Total amount can not be blank."
      );
    }
  });
};

// Small functions===========^^^^^^========>>

// For add row in product item
addProductItemRowDebitnote = () => {
  // Get the number of existing rows in the table
  const existingRowCount = $("#purchaseDetailsTableTbody tr").length;

  // Increment the serial number for the new row
  const newSerialNumber = existingRowCount + 1;

  const row = `<tr>
        <td class="ps-3" onclick="addProductItemRowDebitnote();addPurchaseRowFromPurchase();"><i
                class="ti ti-plus"></i></td>
                <td class="text-muted">${newSerialNumber}</td>
                <td class="p-1">
                    <input type="text" class=" fs-6 border-0 text-uppercase"
                        placeholder="STOCK NAME" list="stockNameDatalist${newSerialNumber}">
                    <datalist id="stockNameDatalist${newSerialNumber}">

                    </datalist>

                </td>
                <td class="p-1">
                    <input type="number" class="fs-6 border-0 rmvarrw"
                        placeholder="STOCK ITEMS ID" readonly>
                </td>
                <td class="p-1">
                    <input type="number" class="fs-6 border-0 rmvarrw"
                        placeholder="CTH" readonly>
                </td>
                <td class="p-1"><input type="number"
                        class=" fs-6 border-0 rmvarrw" placeholder="QTY">
                </td>
                <td class="p-1"><input type="text"
                        class=" fs-6 border-0 text-uppercase"
                        placeholder="UQC" readonly>
                </td>
                <td class="p-1"><input type="number"
                        class=" fs-6 border-0 rmvarrw" placeholder="PRICE" readonly>
                </td>
                <td class="p-1"><input type="number"
                        class=" fs-6 border-0 rmvarrw" placeholder="AMOUNT" readonly>
                </td>
                <td class="p-1"><input type="number"
                        class="form-control fs-6 border-0 rmvarrw"
                        placeholder="GST RATE" readonly>
                </td>
                <td class="p-1"><input type="number"
                        class=" fs-6 border-0 rmvarrw"
                        placeholder="GST AMOUNT" readonly>
                </td>
                <td class="p-1"><input type="number"
                        class=" fs-6 border-0 rmvarrw"
                        placeholder="TOTAL PRICE" readonly>
                </td>
    
        <td class="pe-3" onclick="remove_row_from_table(this,()=>{calculateFooterTotals(
            'purchaseDetailsTableTbody',
            ['QTY', 'AMOUNT', 'GST AMOUNT', 'TOTAL PRICE'],
            [5, 8, 10, 11]
          );calculateDebitnotePurchaseTotal();})"><i class="ti ti-minus tf" ></i></td>
    </tr>`;
  $("#purchaseDetailsTableTbody").append(row);
};

miniFetchPurchasess = (datalistId) => {
  base_url = "/api/debitnote/purchases/fetch";
  formArray = [{ name: "creditor_id", value: $("#creditor_id").val() }];
  custom_ajax_iFunction(base_url, formArray)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["singledata"]["purchase_details_id"].length; i++) {
          const pid = data["singledata"]["purchase_details_id"][i];
          const pDate = data["singledata"]["purchase_date"][i];
          const total = data["singledata"]["total"][i];
          htmlTr = "";
          htmlTr +=
            '<option value="' +
            pid +
            '">Purchase ID: ' +
            pid +
            ", Date: " +
            pDate +
            ", Total: " +
            total +
            "</option>";
          html = html + htmlTr;
        }
        $("#" + datalistId).html(html);
        // **** call a populatedatawithRow function****//
        // Attach event listener to stock name input field
        $('input[placeholder="Purchase IDs"]').on("change", function () {
          // So id invoice id chnage then first clear prev data then add tr
          $("#purchaseDetailsTableTbody").empty();
          addProductItemRowDebitnote();
          dbLen = data["dbdata"]["purchase_details_id"].length;
          populateLastRowWithDataPurchasess(
            data,
            "purchase_item_details_table",
            dbLen,
            0
          );
          //   After populate data now calculte totals
          calculateDebitnotePurchaseTotal();
          calculateFooterTotals(
            "purchaseDetailsTableTbody",
            ["QTY", "AMOUNT", "GST AMOUNT", "TOTAL PRICE"],
            [5, 8, 10, 11]
          );
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

populateLastRowWithDataPurchasess = (data, tableId, len, currentIndex) => {
  const lastRow = $("#purchaseDetailsTableTbody tr:last");
  const dataVal = data.dbdata;

  lastRow
    .find("input[placeholder='STOCK NAME']")
    .val(dataVal.stock_name[currentIndex]);
  lastRow
    .find("input[placeholder='STOCK ITEMS ID']")
    .val(dataVal.stock_items_id[currentIndex]);
  lastRow.find("input[placeholder='CTH']").val(dataVal.cth[currentIndex]);
  lastRow.find("input[placeholder='QTY']").val(dataVal.qty[currentIndex]);
  lastRow.find("input[placeholder='UQC']").val(dataVal.uqc[currentIndex]);
  lastRow.find("input[placeholder='PRICE']").val(dataVal.price[currentIndex]);
  lastRow.find("input[placeholder='AMOUNT']").val(dataVal.amount[currentIndex]);
  lastRow
    .find("input[placeholder='GST RATE']")
    .val(dataVal.gst_rate[currentIndex]);
  lastRow
    .find("input[placeholder='GST AMOUNT']")
    .val(dataVal.gst_amount[currentIndex]);
  lastRow
    .find("input[placeholder='TOTAL PRICE']")
    .val(dataVal.total_price[currentIndex]);

  currentIndex += 1;

  if (currentIndex < len) {
    addProductItemRowDebitnote();
    populateLastRowWithDataPurchasess(data, tableId, len, currentIndex);
  } else return;
};

calculateDebitnotePurchaseTotal = () => {
  var subtotal = 0;
  // Iterate through all rows in the table
  $("#purchaseDetailsTableTbody tr").each(function () {
    // Get the input fields in the current row
    var qty = parseFloat($(this).find("input[placeholder='QTY']").val());
    var price = parseFloat($(this).find("input[placeholder='PRICE']").val());
    var gstRate = parseFloat(
      $(this).find("input[placeholder='GST RATE']").val()
    );

    // Check if quantity and price are valid numbers
    if (!isNaN(qty) && !isNaN(price)) {
      // Calculate the amount for the current row
      var amount = qty * price;

      // Update the amount field in the current row
      $(this).find("input[placeholder='AMOUNT']").val(amount.toFixed(2));

      // Check if GST rate is given
      if (!isNaN(gstRate)) {
        // Calculate GST amount for the current row
        var gstAmount = (amount * gstRate) / 100;

        // Update the GST amount field in the current row
        $(this)
          .find("input[placeholder='GST AMOUNT']")
          .val(gstAmount.toFixed(2));

        // Calculate total price including GST
        var totalPrice = amount + gstAmount;
        $(this)
          .find("input[placeholder='TOTAL PRICE']")
          .val(totalPrice.toFixed(2));
      } else {
        // If GST rate is not given, leave GST amount blank and set total price equal to amount
        $(this).find("input[placeholder='GST AMOUNT']").val("");
        $(this).find("input[placeholder='TOTAL PRICE']").val(amount.toFixed(2));
      }
      // Add total price to subtotal
      subtotal += parseFloat(
        $(this).find("input[placeholder='TOTAL PRICE']").val()
      );
    } else {
      // If quantity or price is not a valid number, reset amount, GST amount, and total price fields
      $(this).find("input[placeholder='AMOUNT']").val("");
      $(this).find("input[placeholder='GST AMOUNT']").val("");
      $(this).find("input[placeholder='TOTAL PRICE']").val("");
    }
  });
  // Update the subtotal
  $("#subtotal").val(subtotal.toFixed(2));
  //   Calculte grand total= sum(other charges amount) + subtotal
  calculateDebitnoteMainTotal();
};

calculateDebitnoteMainTotal = () => {
  var totalPriceTotal = 0;

  // Iterate through each row in the other charges table body
  $("#purchaseDetailsTableTbody tr").each(function () {
    var amount =
      parseFloat($(this).find("input[placeholder='TOTAL PRICE']").val()) || 0;
    totalPriceTotal += isNaN(amount) ? 0 : amount;
  });

  $("#total_amount").text(totalPriceTotal.toFixed(6));
};

addPurchaseRowFromPurchase = () => {
  base_url = "/api/debitnote/purchases/add";
  formArray = [
    { name: "purchase_details_id", value: $("#purchase_ids").val() },
  ];
  custom_ajax_iFunction(base_url, formArray)
    .then((data) => {
      if (data["status_type"] == "success") {
        // Collect stock item IDs from the table
        const stockItemIds = [];
        $("#purchaseDetailsTableTbody tr").each(function () {
          stockItemIds.push(
            $(this).find('input[placeholder="STOCK ITEMS ID"]').val()
          );
        });
        let html = "";
        for (i = 0; i < data["dbdata"]["purchase_details_id"].length; i++) {
          // As we're fetching using purchase id so we'll get all purchases so
          // Here we've to filter it is that which ids are already have
          const productName = data["dbdata"]["stock_name"][i];
          const cth = data["dbdata"]["cth"][i];
          const qty = data["dbdata"]["qty"][i];
          const stockItmid = data["dbdata"]["stock_items_id"][i];
          // Check if the stock item ID already exists in the table
          if (!stockItemIds.includes(stockItmid.toString())) {
            html +=
              '<option value="' +
              productName +
              '">Id : ' +
              stockItmid +
              ", CTH: " +
              cth +
              ", QTY: " +
              qty +
              "</option>";
          }
        }
        const lastRow = $("#purchaseDetailsTableTbody tr:last");
        $("#stockNameDatalist" + (lastRow.length + 1)).html(html);
        // Function to handle change event on the "STOCK NAME" input field
        $('input[placeholder="STOCK NAME"]').on("change", function () {
          const prd_name = $(this).val(); // Get the selected option text
          for (const key in data.dbdata) {
            if (data.dbdata.hasOwnProperty(key) && key === "stock_name") {
              // Filter data based on the entered product name
              const filteredData = data.dbdata[key].filter(
                (name, index) => name === prd_name
              );
              // If filteredData is not empty, you can further process it as needed
              if (filteredData.length > 0) {
                const index = data.dbdata["stock_name"].indexOf(prd_name);
                // Check if the index is valid
                if (index !== -1) {
                  // Retrieve other properties based on the index
                  const rowData = {
                    stock_name: data.dbdata.stock_name[index],
                    stock_items_id: data.dbdata.stock_items_id[index],
                    cth: data.dbdata.cth[index],
                    qty: data.dbdata.qty[index],
                    uqc: data.dbdata.uqc[index],
                    price: data.dbdata.price[index],
                    amount: data.dbdata.amount[index],
                    gst_rate: data.dbdata.gst_rate[index],
                    gst_amount: data.dbdata.gst_amount[index],
                    total_price: data.dbdata.total_price[index],
                  };

                  const row = $(this).closest("tr");
                  // row
                  //   .find('input[placeholder="STOCK NAME"]')
                  //   .val(rowData.stock_name);
                  row
                    .find('input[placeholder="STOCK ITEMS ID"]')
                    .val(rowData.stock_items_id);
                  row.find('input[placeholder="CTH"]').val(rowData.cth);
                  row.find('input[placeholder="QTY"]').val(rowData.qty);
                  row.find('input[placeholder="UQC"]').val(rowData.uqc);
                  row.find('input[placeholder="PRICE"]').val(rowData.price);
                  row.find('input[placeholder="AMOUNT"]').val(rowData.amount);
                  row
                    .find('input[placeholder="GST RATE"]')
                    .val(rowData.gst_rate);
                  row
                    .find('input[placeholder="GST AMOUNT"]')
                    .val(rowData.gst_amount);
                  row
                    .find('input[placeholder="TOTAL PRICE"]')
                    .val(rowData.total_price);
                  calculateFooterTotals(
                    "purchaseDetailsTableTbody",
                    ["QTY", "AMOUNT", "GST AMOUNT", "TOTAL PRICE"],
                    [5, 8, 10, 11]
                  );
                  calculateDebitnoteMainTotal();
                }
              } else {
                console.log("No matching product name found.");
              }

              break; // Exit the loop after processing product_name property
            }
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
