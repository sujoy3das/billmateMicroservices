views_payment_display = () => {
  var views_payment_page_pretitle = "<p>View</p>";
  var views_payment_page_title = "<p>Payment</p>";
  var views_payment_page_button = ` <div class="btn-list">
          <a href="javascript:;" class="btn btn-primary d-none d-sm-inline-block" onclick="create_new_payment();">
            <i class="ti ti-plus"></i>
            Create new payment
          </a>
          <a href="javascript:;" class="btn btn-primary d-sm-none btn-icon" aria-label="Create new payment" onclick="create_new_payment();">
            <i class="ti ti-plus"></i>
          </a>
        </div>`;
  var views_payment_page_body = ` <div class="container-xl">
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
                          <h3 class="card-title">All Payments</h3>
                      </div>
                      <div class="table-responsive p-1" style="min-height:500px">
                          <table class="table card-table text-nowrap " id="datatable_init">
                              <thead>
                                  <tr>
                                      <th class="w-2">SL.NO</th>
                                      <th>Payment Id</th>
                                      <th>Payment Date</th>
                                      <th>Customer Name</th>
                                      <th>Payment Mode</th>
                                      <th>Payment Amount</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody id="payments_display_table_body">
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
  $("#main-content .page-pretitle").empty().html(views_payment_page_pretitle);
  $("#main-content .page-title").empty().html(views_payment_page_title);
  $("#main-content .page-button").empty().html(views_payment_page_button);
  $("#main-content .page-body").empty().html(views_payment_page_body);

  // Refresh invoice display--->.
  refreshPaymentDisplay = () => {
    base_url = "/api/payment/get-all-data";
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        html = "";
        if (data["status_type"] == "success") {
          html = "";
          for (i = 0; i < data["dbdata"]["payment_details_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + '<tr class="text-uppercase">';
            htmlTr = htmlTr + '<td class="text-muted">' + slno + "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-muted">' +
              data["dbdata"]["payment_details_id"][i] +
              "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["payment_date"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["creditor_name"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["payment_mode"][i] + "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-center">' +
              data["dbdata"]["total_paid_amount"][i] +
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
                        <a class="dropdown-item" href="javascript:;" onclick="update_payment(` +
              data["dbdata"]["payment_details_id"][i] +
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
          $("#payments_display_table_body").html(html);
          $("#datatable_init").DataTable({
            responsive: true,
          });
        } else {
          $("#payments_display_table_body").html(html);
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
  refreshPaymentDisplay();
};
create_new_payment = () => {
  var create_new_payment_page_pretitle = "<p>Add new</p>";
  var create_new_payment_page_title = "<p>Payment</p>";
  var create_new_payment_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item ">
                          <a href="#payment_info_tab" class="nav-link active"
                              data-bs-toggle="tab">Payment
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Customer
                              Info</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#purchase_bill_tab" class="nav-link" data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Purchase Bills
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade active show" id="payment_info_tab">
                          <h4>Payment Info</h4>
                          <form id="payment_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Payment Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Payment Id" id="payment_details_id"
                                              name="payment_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Payment Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Payment Date" id="payment_date"
                                              name="payment_date" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Bank Account</label>
                                          <select class="form-control form-select" id="bank_account"
                                              name="bank_account" required>
                                              <option value="HDFC BANK LIMITED">HDFC BANK LIMITED
                                              </option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Payment Mode</label>
                                          <select class="form-control form-select text-uppercase"
                                              id="payment_mode" name="payment_mode" required>
                                              <option value="cheque">cheque</option>
                                              <option value="net banking">net banking</option>
                                              <option value="neft">neft</option>
                                              <option value="rtgs">rtgs</option>
                                              <option value="other">other</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Refrence No</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Refrence No" id="refrence_no"
                                              name="refrence_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Adjustment Method</label>
                                          <select class="form-control form-select text-uppercase"
                                              id="adj_method" name="adj_method"
                                              onchange="changeAdjMethod('purchaseBillsTableTbody','PURCHASE ID');">
                                              <option value="on account">ON ACCOUNT</option>
                                              <option value="against ref">AGAINST REF</option>
                                              <option value="advance">ADVANCE</option>
                                          </select>
                                      </div>
                                  </div>

                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Payment Amount</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Payment Amount" id="payment_amount"
                                              name="payment_amount" required>
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
                      <div class="tab-pane fade" id="purchase_bill_tab">
                          <h4>Purchase Bills</h4>
                          <div class="table-responsive mb-2" style="max-height: 262px;">
                              <table class="table table-vcenter card-table"
                                  id="purchase_bills_table">
                                  <thead>
                                      <tr>
                                          <th class="w-1"></th>
                                          <th>S.NO</th>
                                          <th>Purchase Id</th>
                                          <th>Purchase Date</th>
                                          <th>Settlement Type</th>
                                          <th>Purchase Amount</th>
                                          <th>Paid Amount</th>
                                          <th>Discount</th>
                                          <th class="w-1"></th>
                                      </tr>
                                  </thead>
                                  <tbody id="purchaseBillsTableTbody">
                                      <tr>
                                          <td class="ps-3" onclick="addPurchaseBillRow();"><i
                                                  class="ti ti-plus"></i></td>
                                          <td class="text-muted">1</td>
                                          <td class="p-1">
                                              <input type="text" class=" fs-6 border-0 text-uppercase"
                                                  placeholder="PURCHASE ID" list="purchaseIdDatalist1">
                                              <datalist id="purchaseIdDatalist1"></datalist>
                                          </td>
                                          <td class="p-1">
                                              <input type="date" class="fs-6 border-0 rmvarrw"
                                                  placeholder="PURCHASE DATE" readonly>
                                          </td>
                                          <td class="p-1"><select
                                                  class="form-select p-0 fs-6 border-0"
                                                  placeholder="SETTLEMENT TYPE">
                                                  <option value="1" selected="">FULL</option>
                                                  <option value="2">PARTIAL</option>
                                              </select>
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw"
                                                  placeholder="PURCHASE AMOUNT" readonly>
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw"
                                                  placeholder="PAID AMOUNT" onkeyup="discount_cal(this)">
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw"
                                                  placeholder="DISCOUNT" readonly>
                                          </td>
                                          <td class="pe-3"></i></td>
                                      </tr>
                                  </tbody>
                                  <tfoot>
                                      <tr class="fs-6 calculate-total">
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
                                                id="paymentTotalsTable">
                                                <tbody id="paymentTotalsTableTbody">
                                                    <tr class="border-top text-red">
                                                        <td>TOTAL PAID AMOUNT</td>
                                                        <td class=" fw-bold text-end" id="total_paid_amount"></td>
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
                      onclick="views_payment_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="new_payment_submit">Save
                      Details</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_payment_page_pretitle);
  $("#main-content .page-title").empty().html(create_new_payment_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(create_new_payment_page_body);

  //Fetch all credit list from customer--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "customers",
    "0",
    "creditor_name",
    "creditor_details_form",
    () => {
      // Callback function for creditor_debtor_fetch
      miniFetchPurchases("purchaseIdDatalist1");
    }
  );

  //Set current date for payment date
  multi_fn_currentDate("payment_date");
  //Fetch bank account
  bankAccountFetch("bank_account");
  // For adj method checking
  changeAdjMethod("purchaseBillsTableTbody", "PURCHASE ID");

  //Calculate purchase tables tfoot and all totals
  $("#purchaseBillsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='PAID AMOUNT']",
    function () {
      calculatePaymentTotal();
      calculateFooterTotals(
        "purchaseBillsTableTbody",
        ["PURCHASE AMOUNT", "PAID AMOUNT"],
        [5, 6]
      );
    }
  );

  //  Submit function for insert data in DB
  $("#new_payment_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const paymentDetailsFormArray = $("#payment_details_form").serializeArray();
    const creditorDetailsFormArray = $(
      "#creditor_details_form"
    ).serializeArray();

    // Combine form arrays into a single array
    const groupFormArray = [
      ...paymentDetailsFormArray,
      ...creditorDetailsFormArray,
    ];

    // Get table data
    const purchaseBillsFormArray = getTableDataAsArray("purchase_bills_table", [
      "PURCHASE ID",
    ]);

    // Validate form fields
    const allValidated = formValidate(groupFormArray);

    if (
      allValidated &&
      (($("#adj_method").val() === "against ref" &&
        parseFloat($("#payment_amount").val()) ===
          parseFloat($("#total_paid_amount").text())) ||
        $("#adj_method").val() !== "against ref")
    ) {
      const base_url = "/api/payment/add-new";
      //  Add one extra field is Total paid amount
      groupFormArray.push({
        name: "total_paid_amount",
        value: $("#total_paid_amount").text(),
      });
      // Push table data into mainFormArray with condition
      const mainFormArray =
        $("#adj_method").val() !== "against ref"
          ? [{ name: "payment_details_formArray", value: groupFormArray }]
          : [
              { name: "payment_details_formArray", value: groupFormArray },
              {
                name: "purchase_bill_formarray",
                value: purchaseBillsFormArray,
              },
            ];

      // Perform AJAX request
      console.log(mainFormArray);
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshPaymentDisplay();
            toaster(data.status_type, data.status);
            $("#new_payment_submit").attr("disabled", true);
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
        "All fields are not valid or Payment Amount should be same as Total Amount Paid."
      );
    }
  });
};

update_payment = (passdata_payment_details_id) => {
  var update_payment_page_pretitle = "<p>Edit</p>";
  var update_payment_page_title = "<p>Payment</p>";
  var update_payment_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item ">
                          <a href="#payment_info_tab" class="nav-link active"
                              data-bs-toggle="tab">Payment
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Customer
                              Info</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#purchase_bill_tab" class="nav-link" data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Purchase Bills
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade active show" id="payment_info_tab">
                          <h4>Payment Info</h4>
                          <form id="payment_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Payment Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Payment Id" id="payment_details_id"
                                              name="payment_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Payment Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Payment Date" id="payment_date"
                                              name="payment_date" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Bank Account</label>
                                          <select class="form-control form-select" id="bank_account"
                                              name="bank_account" required>
                                              <option value="HDFC BANK LIMITED">HDFC BANK LIMITED
                                              </option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Payment Mode</label>
                                          <select class="form-control form-select text-uppercase"
                                              id="payment_mode" name="payment_mode" required>
                                              <option value="cheque">cheque</option>
                                              <option value="net banking">net banking</option>
                                              <option value="neft">neft</option>
                                              <option value="rtgs">rtgs</option>
                                              <option value="other">other</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Refrence No</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Refrence No" id="refrence_no"
                                              name="refrence_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Adjustment Method</label>
                                          <select class="form-control form-select text-uppercase"
                                              id="adj_method" name="adj_method"
                                              onchange="changeAdjMethod('purchaseBillsTableTbody','PURCHASE ID');">
                                              <option value="on account">ON ACCOUNT</option>
                                              <option value="against ref">AGAINST REF</option>
                                              <option value="advance">ADVANCE</option>
                                          </select>
                                      </div>
                                  </div>

                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Payment Amount</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Payment Amount" id="payment_amount"
                                              name="payment_amount" required>
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
                      <div class="tab-pane fade" id="purchase_bill_tab">
                          <h4>Purchase Bills</h4>
                          <div class="table-responsive mb-2" style="max-height: 262px;">
                              <table class="table table-vcenter card-table"
                                  id="purchase_bills_table">
                                  <thead>
                                      <tr>
                                          <th class="w-1"></th>
                                          <th>S.NO</th>
                                          <th>Purchase Id</th>
                                          <th>Purchase Date</th>
                                          <th>Settlement Type</th>
                                          <th>Purchase Amount</th>
                                          <th>Paid Amount</th>
                                          <th>Discount</th>
                                          <th class="w-1"></th>
                                      </tr>
                                  </thead>
                                  <tbody id="purchaseBillsTableTbody">
                                      <tr>
                                          <td class="ps-3" onclick="addPurchaseBillRow();"><i
                                                  class="ti ti-plus"></i></td>
                                          <td class="text-muted">1</td>
                                          <td class="p-1">
                                              <input type="text" class=" fs-6 border-0 text-uppercase"
                                                  placeholder="PURCHASE ID" list="purchaseIdDatalist1">
                                              <datalist id="purchaseIdDatalist1"></datalist>
                                          </td>
                                          <td class="p-1">
                                              <input type="date" class="fs-6 border-0 rmvarrw"
                                                  placeholder="PURCHASE DATE" readonly>
                                          </td>
                                          <td class="p-1"><select
                                                  class="form-select p-0 fs-6 border-0"
                                                  placeholder="SETTLEMENT TYPE">
                                                  <option value="1" selected="">FULL</option>
                                                  <option value="2">PARTIAL</option>
                                              </select>
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw"
                                                  placeholder="PURCHASE AMOUNT" readonly>
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw"
                                                  placeholder="PAID AMOUNT" onkeyup="discount_cal(this)">
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw"
                                                  placeholder="DISCOUNT" readonly>
                                          </td>
                                          <td class="pe-3"></i></td>
                                      </tr>
                                  </tbody>
                                  <tfoot>
                                      <tr class="fs-6 calculate-total">
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
                                                id="paymentTotalsTable">
                                                <tbody id="paymentTotalsTableTbody">
                                                    <tr class="border-top text-red">
                                                        <td>TOTAL PAID AMOUNT</td>
                                                        <td class=" fw-bold text-end" id="total_paid_amount"></td>
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
                      onclick="views_payment_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="payment_update_submit">Update
                      Details</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle").empty().html(update_payment_page_pretitle);
  $("#main-content .page-title").empty().html(update_payment_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_payment_page_body);
  //Fetch all credit list from customer--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "customers",
    "0",
    "creditor_name",
    "creditor_details_form",
    () => {
      // Callback function for creditor_debtor_fetch
      miniFetchPurchases("purchaseIdDatalist1");
    }
  );
  //Set current date for payment date
  multi_fn_currentDate("payment_date");
  //Fetch bank account
  bankAccountFetch("bank_account");
  // For adj method checking
  changeAdjMethod("purchaseBillsTableTbody", "PURCHASE ID");

  // Fetch single data for update***************>>
  fetch_url = "/api/payment/get-single-data";
  result = [{ name: "payment_details_id", value: passdata_payment_details_id }];
  showLoader();
  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      console.log(data);
      if (data["status_type"] == "success") {
        refreshForm(
          "#payment_details_form",
          data.payment_details,
          [],
          [
            "payment_details_id",
            "payment_date",
            "bank_account",
            "payment_mode",
            "refrence_no",
            "adj_method",
            "payment_amount",
          ]
        );
        refreshForm(
          "#creditor_details_form",
          data.payment_details,
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
        setTimeout(() => {
          refreshForm(
            "#creditor_details_form",
            data.payment_details,
            [],
            ["state"]
          );
        }, 1000);
        //Invoice table data Only call this function if you have data
        if (data.payment_purchase_details.payment_details_id.length >= 1) {
          var len_of_payment_purchase_details =
            data.payment_purchase_details.payment_details_id.length;
          populateLastRowWithDataPayment(
            data,
            "purchaseBillsTableTbody",
            len_of_payment_purchase_details,
            0
          );

          //Calculate purchase tables tfoot and all totals
          calculatePaymentTotal();
          calculateFooterTotals(
            "purchaseBillsTableTbody",
            ["PURCHASE AMOUNT", "PAID AMOUNT"],
            [5, 6]
          );
        }
      } else {
        toaster(data.status, data.status_type);
      }
      hideLoader();
    })
    .catch((err) => {
      console.log(err);
      hideLoader();
    }); //End fetch single data

  /*  Calculate receipt item tables tfoot
     Calculate main total amount-
     only hit when any input field is change
    */
  $("#purchaseBillsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='PAID AMOUNT']",
    function () {
      calculatePaymentTotal();
      calculateFooterTotals(
        "purchaseBillsTableTbody",
        ["PURCHASE AMOUNT", "PAID AMOUNT"],
        [5, 6]
      );
    }
  );

  //  Submit function for update data in DB
  $("#payment_update_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const paymentDetailsFormArray = $("#payment_details_form").serializeArray();
    const creditorDetailsFormArray = $(
      "#creditor_details_form"
    ).serializeArray();

    // Combine form arrays into a single array
    const groupFormArray = [
      ...paymentDetailsFormArray,
      ...creditorDetailsFormArray,
    ];

    // Get table data
    const purchaseBillsFormArray = getTableDataAsArray("purchase_bills_table", [
      "PURCHASE ID",
    ]);

    // Validate form fields
    const allValidated = formValidate(groupFormArray);

    if (
      allValidated &&
      (($("#adj_method").val() === "against ref" &&
        parseFloat($("#payment_amount").val()) ===
          parseFloat($("#total_paid_amount").text())) ||
        $("#adj_method").val() !== "against ref")
    ) {
      const base_url = "/api/payment/update";
      //  Add one extra field is Total paid amount
      groupFormArray.push({
        name: "total_paid_amount",
        value: $("#total_paid_amount").text(),
      });
      // Push table data into mainFormArray with condition
      const mainFormArray =
        $("#adj_method").val() !== "against ref"
          ? [{ name: "payment_details_formArray", value: groupFormArray }]
          : [
              { name: "payment_details_formArray", value: groupFormArray },
              {
                name: "purchase_bill_formarray",
                value: purchaseBillsFormArray,
              },
            ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshPaymentDisplay();
            toaster(data.status_type, data.status);
            $("#payment_update_submit").attr("disabled", true);
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
        "All fields are not valid or Payment Amount should be same as Total Amount Paid."
      );
    }
  });
};

// Mini functions=======================>>
addPurchaseBillRow = () => {
  // Get the number of existing rows in the table
  const existingRowCount = $("#purchaseBillsTableTbody tr").length;

  // Increment the serial number for the new row
  const newSerialNumber = existingRowCount + 1;

  const row = ` <tr>
      <td class="ps-3" onclick="addPurchaseBillRow();"><i
              class="ti ti-plus"></i></td>
      <td class="text-muted">${newSerialNumber}</td>
      <td class="p-1">
          <input type="text" class=" fs-6 border-0 text-uppercase"
              placeholder="PURCHASE ID" list="purchaseIdDatalist${newSerialNumber}">
          <datalist id="purchaseIdDatalist${newSerialNumber}"></datalist>
      </td>
      <td class="p-1">
          <input type="date" class="fs-6 border-0 rmvarrw"
              placeholder="PURCHASE DATE" readonly>
      </td>
      <td class="p-1"><select
              class="form-select p-0 fs-6 border-0"
              placeholder="SETTLEMENT TYPE">
              <option value="1" selected="">FULL</option>
              <option value="2">PARTIAL</option>
          </select>
      </td>
      <td class="p-1"><input type="number"
              class=" fs-6 border-0 rmvarrw"
              placeholder="PURCHASE AMOUNT" readonly>
      </td>
      <td class="p-1"><input type="number"
              class=" fs-6 border-0 rmvarrw"
              placeholder="PAID AMOUNT" onkeyup="discount_cal(this)">
      </td>
      <td class="p-1"><input type="number"
              class=" fs-6 border-0 rmvarrw"
              placeholder="DISCOUNT" readonly>
      </td>
      <td class="pe-3" onclick="remove_row_from_table(this,()=>{ 
        calculatePaymentTotal();
        calculateFooterTotals(
          'purchaseBillsTableTbody',
          ['PURCHASE AMOUNT', 'PAID AMOUNT'],
          [5, 6]
        );
      });
        "><i class="ti ti-minus tf"></i></td>
  
      </tr>`;

  $("#purchaseBillsTableTbody").append(row);

  //  It will handle adj method checking
  changeAdjMethod("purchaseBillsTableTbody", "PURCHASE ID");

  //Mini function for invoice
  miniFetchPurchases("purchaseIdDatalist" + newSerialNumber);
};

bankAccountFetch = (elem) => {
  base_url = "/api/receipt/bank_details/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["ledger_id"].length; i++) {
          htmlTr = "";
          htmlTr =
            htmlTr +
            '<option value="' +
            data["dbdata"]["ledger_name"][i] +
            '">' +
            data["dbdata"]["ledger_name"][i] +
            "</option>";
          html = html + htmlTr;
        }
        $("#" + elem).html(html);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Fetch all purchase bills according to creditor then select also calc totals/footer
miniFetchPurchases = (datalistId) => {
  base_url = "/api/payment/purchase-bills/fetch";
  formArray = [];
  var creditor_id = $("#creditor_id").val();
  if (creditor_id != "") {
    formArray.push({ name: "creditor_id", value: creditor_id });

    custom_ajax_iFunction(base_url, formArray)
      .then((data) => {
        console.log(data);
        if (data["status_type"] == "success") {
          html = "";
          for (i = 0; i < data["dbdata"]["purchase_details_id"].length; i++) {
            const purchase_details_id =
              data["dbdata"]["purchase_details_id"][i];
            const purchase_date = data["dbdata"]["purchase_date"][i];
            const purchase_amount = data["dbdata"]["total"][i];
            html += `
              <option value="${purchase_details_id}">
                Date: ${purchase_date}, 
                Purchase Amount: ${purchase_amount}
              </option>
            `;
          }
          $("#" + datalistId).html(html);
          //   Work on here
          // Attach event listener to PURCHASE ID input field
          $('input[placeholder="PURCHASE ID"]').on("change", function () {
            const selectedStockName = $(this).val();
            //   const selectedIndex = data["dbdata"]["invoice_details_id"].indexOf(selectedStockName);
            const selectedIndex = data["dbdata"]["purchase_details_id"]
              .map((item) => Number(item)) // Convert elements to numbers
              .indexOf(Number(selectedStockName)); // Convert selectedStockName to number

            if (selectedIndex !== -1) {
              const pDate = data["dbdata"]["purchase_date"][selectedIndex];
              const pAmount = parseFloat(
                data["dbdata"]["total"][selectedIndex]
              );

              $(this)
                .closest("tr")
                .find("td")
                .eq($(this).parent().index() + 1)
                .find('input[placeholder="PURCHASE DATE"]')
                .val(pDate);
              $(this)
                .closest("tr")
                .find("td")
                .eq($(this).parent().index() + 3)
                .find('input[placeholder="PURCHASE AMOUNT"]')
                .val(pAmount);
              // After this you can calculate totals/footer
              calculateFooterTotals(
                "purchaseBillsTableTbody",
                ["PURCHASE AMOUNT", "PAID AMOUNT"],
                [5, 6]
              );
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    toaster("warning", "Please select first creditor/customer.");
  }
};

// Discount calculatiom
discount_cal = (elem) => {
  var amount_received = $(elem).val();
  var prevInput = $(elem).parent().prev().find("input");
  var prevValue = parseFloat($(prevInput).val());
  var nextInput = $(elem).parent().next().find("input");
  var discountPercentage = prevValue - amount_received;
  $(nextInput).val(discountPercentage.toFixed(2));
};

// For calculate all totals at the end
calculatePaymentTotal = () => {
  var totalPaidAmount = 0;

  // Calculate Total Amount before Tax
  $("#purchaseBillsTableTbody tr").each(function () {
    var totalPaidAmountRow =
      parseFloat($(this).find("input[placeholder='PAID AMOUNT']").val()) || 0;
    totalPaidAmount += totalPaidAmountRow;
  });
  // Update the values in the corresponding td elements
  $("#total_paid_amount").text(totalPaidAmount.toFixed(2));
};

populateLastRowWithDataPayment = (data, tableId, len, currentIndex) => {
  console.log(data);
  const lastRow = $("#purchaseBillsTableTbody tr:last");
  const dataVal = data.payment_purchase_details;

  lastRow
    .find("input[placeholder='PURCHASE ID']")
    .val(dataVal.purchase_details_id[currentIndex]);
  lastRow
    .find("input[placeholder='PURCHASE DATE']")
    .val(dataVal.purchase_date[currentIndex]);
  lastRow
    .find("select[placeholder='SETTLEMENT TYPE']")
    .val(dataVal.settlement_type[currentIndex]);
  lastRow
    .find("input[placeholder='PURCHASE AMOUNT']")
    .val(dataVal.purchase_amount[currentIndex]);
  lastRow
    .find("input[placeholder='PAID AMOUNT']")
    .val(dataVal.paid_amount[currentIndex]);
  lastRow
    .find("input[placeholder='DISCOUNT']")
    .val(dataVal.discount[currentIndex]);

  currentIndex += 1;

  if (currentIndex < len) {
    addPurchaseBillRow();
    populateLastRowWithDataPayment(data, tableId, len, currentIndex);
  } else return;
};
