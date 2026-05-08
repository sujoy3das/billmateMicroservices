views_receipt_display = () => {
  var views_receipt_page_pretitle = "<p>View</p>";
  var views_receipt_page_title = "<p>Receipts</p>";
  var views_receipt_page_button = ` <div class="btn-list">
        <a href="javascript:;" class="btn btn-primary d-none d-sm-inline-block" onclick="create_new_receipt();">
          <i class="ti ti-plus"></i>
          Create new receipt
        </a>
        <a href="javascript:;" class="btn btn-primary d-sm-none btn-icon" aria-label="Create new receipt" onclick="create_new_receipt();">
          <i class="ti ti-plus"></i>
        </a>
      </div>`;
  var views_receipt_page_body = ` <div class="container-xl">
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
                        <h3 class="card-title">All Receipts</h3>
                    </div>
                    <div class="table-responsive p-1" style="min-height:500px">
                        <table class="table card-table text-nowrap " id="datatable_init">
                            <thead>
                                <tr>
                                    <th class="w-2">SL.NO</th>
                                    <th>Receipt Id</th>
                                    <th>Receipt Date</th>
                                    <th>Creditor Name</th>
                                    <th>Mode</th>
                                    <th>Receipt Amount</th>
                                    <th>TDS</th>
                                    <th>Invoice Amount</th>
                                    <th>Received Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="receipts_display_table_body">
                            <tr>
                            <td class="text-muted text-center" >No data found,Create one.</td>
                            <td class="text-muted text-center" >No data found,Create one.</td>
                            <td class="text-muted text-center" >No data found,Create one.</td>
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
  $("#main-content .page-pretitle").empty().html(views_receipt_page_pretitle);
  $("#main-content .page-title").empty().html(views_receipt_page_title);
  $("#main-content .page-button").empty().html(views_receipt_page_button);
  $("#main-content .page-body").empty().html(views_receipt_page_body);

  // Refresh invoice display--->.
  refreshReceiptDisplay = () => {
    base_url = "/api/receipt/get-all-data";
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        html = "";
        if (data["status_type"] == "success") {
          html = "";
          for (i = 0; i < data["dbdata"]["receipt_details_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + '<tr class="text-uppercase">';
            htmlTr = htmlTr + '<td class="text-muted">' + slno + "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-muted">' +
              data["dbdata"]["receipt_details_id"][i] +
              "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["receipt_date"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["creditor_name"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["payment_mode"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["receipt_amount"][i] + "</td>";
            htmlTr = htmlTr + "<td>" + data["dbdata"]["tds"][i] + "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-center">' +
              data["dbdata"]["grand_invoice_amount"][i] +
              "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-center">' +
              data["dbdata"]["grand_amount_received"][i] +
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
                      <a class="dropdown-item" href="javascript:;" onclick="update_receipt(` +
              data["dbdata"]["receipt_details_id"][i] +
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
              <td class="text-muted text-center" >No data found,Create one.</td>
              <td class="text-muted text-center" >No data found,Create one.</td>
              <td class="text-muted text-center" >No data found,Create one.</td>
              </tr>`;
        }
        $("#datatable_init").DataTable();
        if ($.fn.DataTable.isDataTable("#datatable_init")) {
          $("#datatable_init").DataTable().clear().destroy();
          $("#receipts_display_table_body").html(html);
          $("#datatable_init").DataTable({
            responsive: true,
          });
        } else {
          $("#receipts_display_table_body").html(html);
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
  refreshReceiptDisplay();
};
create_new_receipt = () => {
  var create_new_receipt_page_pretitle = "<p>Add new</p>";
  var create_new_receipt_page_title = "<p>Receipt</p>";
  var create_new_receipt_page_body = `<div class="container-xl">
    <div class="row row-cards">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                        <li class="nav-item ">
                            <a href="#receipt_info_tab" class="nav-link active"
                                data-bs-toggle="tab">Receipt
                                Info</a>
                        </li>
                        <li class="nav-item">
                            <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Creditor
                                Info</a>
                        </li>
                        <li class="nav-item ms-auto">
                            <a href="#invoices_tab" class="nav-link" data-bs-toggle="tab">
                                <i class="ti ti-plus me-1"></i>
                                Invoices
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane fade active show" id="receipt_info_tab">
                            <h4>Receipt Info</h4>
                            <form id="receipt_details_form">
                                <div class="row row-cards">
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label">Receipt Id</label>
                                            <input type="number" class="form-control"
                                                placeholder="Receipt Id" id="receipt_details_id"
                                                name="receipt_details_id" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">Receipt Date</label>
                                            <input type="date" class="form-control"
                                                placeholder="Receipt Date" id="receipt_date"
                                                name="receipt_date" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">Bank Account</label>
                                            <select class="form-control form-select" id="bank_account"
                                                name="bank_account" required>
                                                <option value="HDFC BANK LIMITED">HDFC BANK LIMITED</option>
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
                                                id="adj_method" name="adj_method" onchange="changeAdjMethod('invoicesDetailsTableTbody','INVOICE NO');">
                                                <option value="on account">ON ACCOUNT</option>
                                                <option value="against ref">AGAINST REF</option>
                                                <option value="advance">ADVANCE</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">Receipt Amount</label>
                                            <input type="text" class="form-control text-uppercase"
                                                placeholder="Receipt Amount" id="receipt_amount"
                                                name="receipt_amount" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">TDS(%)</label>
                                            <input type="text" class="form-control text-uppercase"
                                                placeholder="TDS(%)" id="tds" value="0" name="tds" required>
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
                        <div class="tab-pane fade" id="invoices_tab">
                            <h4>Invoices</h4>
                            <div class="table-responsive mb-2" style="max-height: 262px;">
                                <table class="table table-vcenter card-table"
                                    id="invoices_details_table">
                                    <thead>
                                        <tr>
                                            <th class="w-1"></th>
                                            <th>S.NO</th>
                                            <th>Invoice No</th>
                                            <th>Invoice Date</th>
                                            <th>Net Amount</th>
                                            <th>Invoice Amount</th>
                                            <th>TDS Amount</th>
                                            <th>Settlement Type</th>
                                            <th>Total Settlement Amount</th>
                                            <th>Amount Received</th>
                                            <th>Discount</th>
                                            <th class="w-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="invoicesDetailsTableTbody">
                                        <tr>
                                            <td class="ps-3" onclick="addInvoicesRow();"><i
                                                    class="ti ti-plus"></i></td>
                                            <td class="text-muted">1</td>
                                            <td class="p-1">
                                                <input type="text" class=" fs-6 border-0 text-uppercase"
                                                    placeholder="INVOICE NO" list="invoiceNoDatalist1" >
                                                <datalist id="invoiceNoDatalist1"></datalist>
                                            </td>
                                            <td class="p-1">
                                                <input type="date" class="fs-6 border-0 rmvarrw"
                                                    placeholder="INVOICE DATE" readonly>
                                            </td>
                                            <td class="p-1">
                                                <input type="number" class="fs-6 border-0 rmvarrw"
                                                    placeholder="NET AMOUNT" readonly>
                                            </td>
                                            <td class="p-1"><input type="number"
                                                    class=" fs-6 border-0 rmvarrw"
                                                    placeholder="INVOICE AMOUNT" readonly>
                                            </td>
                                            <td class="p-1"><input type="text"
                                                    class=" fs-6 border-0 text-uppercase"
                                                    placeholder="TDS AMOUNT" readonly>
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
                                                    placeholder="TOTAL SETTLEMENT AMOUNT" readonly>
                                            </td>
                                            <td class="p-1"><input type="number"
                                                    class=" fs-6 border-0 rmvarrw"
                                                    placeholder="AMOUNT RECEIVED" onkeyup="discount_calc(this)">
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
                                                id="receiptTotalsTable">
                                                <tbody id="receiptTotalsTableTbody">
                                                    <tr class="border-top text-red">
                                                        <td>GRAND INVOICE AMOUNT</td>
                                                        <td class=" fw-bold text-end" id="total_invoice_amount"></td>
                                                    </tr>
                                                    <tr class="text-green">
                                                        <td>GRAND AMOUNT RECEIVED</td>
                                                        <td class=" fw-bold text-end" id="total_amount_received">
                                                        </td>
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
                        onclick="views_receipt_display();">Close</a>
                    <button type="submit" class="btn btn-primary" id="new_receipt_submit">Save
                        Details</button>
                </div>
            </div>
        </div>
    </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_receipt_page_pretitle);
  $("#main-content .page-title").empty().html(create_new_receipt_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(create_new_receipt_page_body);
  //Fetch all credit list from customer--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "sundry debtors",
    "1",
    "creditor_name",
    "creditor_details_form",
    () => {
      // Callback function for creditor_debtor_fetch
      miniFetchInvoices("invoiceNoDatalist1");
    }
  );

  //Set current date for invoice date
  multi_fn_currentDate("receipt_date");
  //Fetch bank account
  bankAccountFetch("bank_account");
  // For adj method checking
  changeAdjMethod("invoicesDetailsTableTbody", "INVOICE NO");

  //Calculate receipt tables tfoot and all totals
  $("#invoicesDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='AMOUNT RECEIVED']",
    function () {
      calculateReceiptTotal();
      calculateFooterTotals(
        "invoicesDetailsTableTbody",
        ["TOTAL SETTLEMENT AMOUNT", "AMOUNT RECEIVED"],
        [8, 9]
      );
    }
  );

  //  Submit function for insert data in DB
  $("#new_receipt_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const receiptDetailsFormArray = $("#receipt_details_form").serializeArray();
    const creditorDetailsFormArray = $(
      "#creditor_details_form"
    ).serializeArray();

    // Initialize an array to store the objects for invoice totals
    var receiptTotals = [];

    // Iterate over each <tr> element in the invoice totals table body
    $("#receiptTotalsTableTbody tr").each(function () {
      // Get the name and value from the <td> elements
      var name = $(this)
        .find("td:first-child")
        .text()
        .trim()
        .replace(/\s+/g, "_")
        .toLowerCase();
      var value = $(this).find("td:last-child").text().trim();

      // Push an object with name and value to the receiptTotals array
      receiptTotals.push({ name: name, value: value });
    });

    // Combine form arrays into a single array
    const groupFormArray = [
      ...receiptDetailsFormArray,
      ...creditorDetailsFormArray,
      ...receiptTotals,
    ];

    // Get table data
    const invoicesDetailsFormArray = getTableDataAsArray(
      "invoices_details_table",
      ["INVOICE NO"]
    );
    console.log("Invoices formarray", invoicesDetailsFormArray);

    // Validate form fields
    const allValidated = formValidate([
      ...receiptDetailsFormArray,
      ...creditorDetailsFormArray,
    ]);

    if (
      allValidated &&
      (($("#adj_method").val() === "against ref" &&
        parseFloat($("#receipt_amount").val()) ===
          parseFloat($("#total_amount_received").text())) ||
        $("#adj_method").val() !== "against ref")
    ) {
      const base_url = "/api/receipt/add-new";

      // Push table data into mainFormArray with condition
      const mainFormArray =
        $("#adj_method").val() !== "against ref"
          ? [{ name: "receipt_details_formArray", value: groupFormArray }]
          : [
              { name: "receipt_details_formArray", value: groupFormArray },
              {
                name: "invoices_details_formarray",
                value: invoicesDetailsFormArray,
              },
            ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshReceiptDisplay();
            toaster(data.status_type, data.status);
            $("#new_receipt_submit").attr("disabled", true);
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
        "All fields are not valid or Receipt Amount should be same as Grand Amount Received."
      );
    }
  });
};

update_receipt = (passdata_receipt_details_id) => {
  var update_receipt_page_pretitle = "<p>Edit</p>";
  var update_receipt_page_title = "<p>Receipt</p>";
  var update_receipt_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item ">
                          <a href="#receipt_info_tab" class="nav-link active"
                              data-bs-toggle="tab">Receipt
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Creditor
                              Info</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#invoices_tab" class="nav-link" data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Invoices
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade active show" id="receipt_info_tab">
                          <h4>Receipt Info</h4>
                          <form id="receipt_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Receipt Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Receipt Id" id="receipt_details_id"
                                              name="receipt_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Receipt Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Receipt Date" id="receipt_date"
                                              name="receipt_date" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Bank Account</label>
                                          <select class="form-control form-select" id="bank_account"
                                              name="bank_account" required>
                                              <option value="HDFC BANK LIMITED">HDFC BANK LIMITED</option>
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
                                              id="adj_method" name="adj_method" onchange="changeAdjMethod('invoicesDetailsTableTbody','INVOICE NO');">
                                              <option value="on account">ON ACCOUNT</option>
                                              <option value="against ref">AGAINST REF</option>
                                              <option value="advance">ADVANCE</option>
                                          </select>
                                      </div>
                                  </div>

                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Receipt Amount</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Receipt Amount" id="receipt_amount"
                                              name="receipt_amount" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">TDS(%)</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="TDS(%)" id="tds" value="0" name="tds" required>
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
                      <div class="tab-pane fade" id="invoices_tab">
                          <h4>Invoices</h4>
                          <div class="table-responsive mb-2" style="max-height: 262px;">
                              <table class="table table-vcenter card-table"
                                  id="invoices_details_table">
                                  <thead>
                                      <tr>
                                          <th class="w-1"></th>
                                          <th>S.NO</th>
                                          <th>Invoice No</th>
                                          <th>Invoice Date</th>
                                          <th>Net Amount</th>
                                          <th>Invoice Amount</th>
                                          <th>TDS Amount</th>
                                          <th>Settlement Type</th>
                                          <th>Total Settlement Amount</th>
                                          <th>Amount Received</th>
                                          <th>Discount</th>
                                          <th class="w-1"></th>
                                      </tr>
                                  </thead>
                                  <tbody id="invoicesDetailsTableTbody">
                                      <tr>
                                          <td class="ps-3" onclick="addInvoicesRow();"><i
                                                  class="ti ti-plus"></i></td>
                                          <td class="text-muted">1</td>
                                          <td class="p-1">
                                              <input type="text" class=" fs-6 border-0 text-uppercase"
                                                  placeholder="INVOICE NO" list="invoiceNoDatalist1" >
                                              <datalist id="invoiceNoDatalist1"></datalist>
                                          </td>
                                          <td class="p-1">
                                              <input type="date" class="fs-6 border-0 rmvarrw"
                                                  placeholder="INVOICE DATE" readonly>
                                          </td>
                                          <td class="p-1">
                                              <input type="number" class="fs-6 border-0 rmvarrw"
                                                  placeholder="NET AMOUNT" readonly>
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw"
                                                  placeholder="INVOICE AMOUNT" readonly>
                                          </td>
                                          <td class="p-1"><input type="text"
                                                  class=" fs-6 border-0 text-uppercase"
                                                  placeholder="TDS AMOUNT" readonly>
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
                                                  placeholder="TOTAL SETTLEMENT AMOUNT" readonly>
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw"
                                                  placeholder="AMOUNT RECEIVED" onkeyup="discount_calc(this)">
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
                                              id="receiptTotalsTable">
                                              <tbody id="receiptTotalsTableTbody">
                                                  <tr class="border-top text-red">
                                                      <td>GRAND INVOICE AMOUNT</td>
                                                      <td class=" fw-bold text-end" id="total_invoice_amount"></td>
                                                  </tr>
                                                  <tr class="text-green">
                                                      <td>GRAND AMOUNT RECEIVED</td>
                                                      <td class=" fw-bold text-end" id="total_amount_received">
                                                      </td>
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
                      onclick="views_receipt_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="receipt_update_submit">Update
                      Details</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle").empty().html(update_receipt_page_pretitle);
  $("#main-content .page-title").empty().html(update_receipt_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_receipt_page_body);
  //Fetch all credit list from customer--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "sundry debtors",
    "1",
    "creditor_name",
    "creditor_details_form",
    () => {
      // Callback function for creditor_debtor_fetch
      miniFetchInvoices("invoiceNoDatalist1");
    }
  );
  //Set current date for invoice date
  multi_fn_currentDate("receipt_date");
  //Fetch bank account
  bankAccountFetch("bank_account");
  // For adj method checking
  changeAdjMethod("invoicesDetailsTableTbody", "INVOICE NO");

  // Fetch single data for update***************>>
  fetch_url = "/api/receipt/get-single-data";
  result = [{ name: "receipt_details_id", value: passdata_receipt_details_id }];
  showLoader();
  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      console.log(data);
      if (data["status_type"] == "success") {
        refreshForm(
          "#receipt_details_form",
          data.receipt_details,
          [],
          [
            "receipt_details_id",
            "receipt_date",
            "bank_account",
            "payment_mode",
            "refrence_no",
            "adj_method",
            "receipt_amount",
            "tds",
          ]
        );
        refreshForm(
          "#creditor_details_form",
          data.receipt_details,
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
            data.receipt_details,
            [],
            ["state"]
          );
        }, 1000);
        //Invoice table data Only call this function if you have data
        console.log(data.receipt_invoice_details.receipt_details_id);
        if (data.receipt_invoice_details.receipt_details_id.length >= 1) {
          var len_of_receipt_invoice_details =
            data.receipt_invoice_details.receipt_details_id.length;
          populateLastRowWithDataReceipt(
            data,
            "invoicesDetailsTableTbody",
            len_of_receipt_invoice_details,
            0
          );

          //Calculate receipt tables tfoot and all totals
          calculateReceiptTotal();
          calculateFooterTotals(
            "invoicesDetailsTableTbody",
            ["TOTAL SETTLEMENT AMOUNT", "AMOUNT RECEIVED"],
            [8, 9]
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
  $("#invoicesDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='AMOUNT RECEIVED']",
    function () {
      calculateReceiptTotal();
      calculateFooterTotals(
        "invoicesDetailsTableTbody",
        ["TOTAL SETTLEMENT AMOUNT", "AMOUNT RECEIVED"],
        [8, 9]
      );
    }
  );

  //  Submit function for update data in DB
  $("#receipt_update_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const receiptDetailsFormArray = $("#receipt_details_form").serializeArray();
    const creditorDetailsFormArray = $(
      "#creditor_details_form"
    ).serializeArray();

    // Initialize an array to store the objects for invoice totals
    var receiptTotals = [];

    // Iterate over each <tr> element in the invoice totals table body
    $("#receiptTotalsTableTbody tr").each(function () {
      // Get the name and value from the <td> elements
      var name = $(this)
        .find("td:first-child")
        .text()
        .trim()
        .replace(/\s+/g, "_")
        .toLowerCase();
      var value = $(this).find("td:last-child").text().trim();

      // Push an object with name and value to the receiptTotals array
      receiptTotals.push({ name: name, value: value });
    });

    // Combine form arrays into a single array
    const groupFormArray = [
      ...receiptDetailsFormArray,
      ...creditorDetailsFormArray,
      ...receiptTotals,
    ];

    // Get table data
    const invoicesDetailsFormArray = getTableDataAsArray(
      "invoices_details_table",
      ["INVOICE NO"]
    );
    console.log("Invoices formarray", invoicesDetailsFormArray);

    // Validate form fields
    const allValidated = formValidate([
      ...receiptDetailsFormArray,
      ...creditorDetailsFormArray,
    ]);

    if (
      allValidated &&
      (($("#adj_method").val() === "against ref" &&
        parseFloat($("#receipt_amount").val()) ===
          parseFloat($("#total_amount_received").text())) ||
        $("#adj_method").val() !== "against ref")
    ) {
      const base_url = "/api/receipt/update";

      // Push table data into mainFormArray with condition
      const mainFormArray =
        $("#adj_method").val() !== "against ref"
          ? [{ name: "receipt_details_formArray", value: groupFormArray }]
          : [
              { name: "receipt_details_formArray", value: groupFormArray },
              {
                name: "invoices_details_formarray",
                value: invoicesDetailsFormArray,
              },
            ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshReceiptDisplay();
            toaster(data.status_type, data.status);
            $("#receipt_update_submit").attr("disabled", true);
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
      toaster("error", "All fields are not valid.");
    }
  });
};

// Mini functions=======================>>
addInvoicesRow = () => {
  // Get the number of existing rows in the table
  const existingRowCount = $("#invoicesDetailsTableTbody tr").length;

  // Increment the serial number for the new row
  const newSerialNumber = existingRowCount + 1;

  const row = `<tr>
  <td class="ps-3" onclick="addInvoicesRow();"><i
          class="ti ti-plus"></i></td>
  <td class="text-muted">${newSerialNumber}</td>
  <td class="p-1">
      <input type="text" class=" fs-6 border-0 text-uppercase"
          placeholder="INVOICE NO" list="invoiceNoDatalist${newSerialNumber}" >
      <datalist id="invoiceNoDatalist${newSerialNumber}"></datalist>
  </td>
  <td class="p-1">
      <input type="date" class="fs-6 border-0 rmvarrw"
          placeholder="INVOICE DATE" readonly>
  </td>
  <td class="p-1">
      <input type="number" class="fs-6 border-0 rmvarrw"
          placeholder="NET AMOUNT" readonly>
  </td>
  <td class="p-1"><input type="number"
          class=" fs-6 border-0 rmvarrw"
          placeholder="INVOICE AMOUNT" readonly>
  </td>
  <td class="p-1"><input type="text"
          class=" fs-6 border-0 text-uppercase"
          placeholder="TDS AMOUNT" readonly>
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
          placeholder="TOTAL SETTLEMENT AMOUNT" readonly>
  </td>
  <td class="p-1"><input type="number"
          class=" fs-6 border-0 rmvarrw"
          placeholder="AMOUNT RECEIVED" onkeyup="discount_calc(this)">
  </td>
  <td class="p-1"><input type="number"
          class=" fs-6 border-0 rmvarrw"
          placeholder="DISCOUNT" readonly>
  </td>

    <td class="pe-3" onclick="remove_row_from_table(this,()=>{ 
      calculateReceiptTotal();
      calculateFooterTotals(
        'invoicesDetailsTableTbody',
        ['TOTAL SETTLEMENT AMOUNT', 'AMOUNT RECEIVED'],
        [8, 9]);
    });
      "><i class="ti ti-minus tf"></i></td>

    </tr>`;

  $("#invoicesDetailsTableTbody").append(row);

  //  It will handle adj method checking
  changeAdjMethod("invoicesDetailsTableTbody", "INVOICE NO");

  //Mini function for invoice
  miniFetchInvoices("invoiceNoDatalist" + newSerialNumber);
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

// Fetch all invoices according to creditor then select also calc totals/footer
miniFetchInvoices = (datalistId) => {
  base_url = "/api/receipt/invoices/customer-invoice/fetch";
  formArray = [];
  var creditor_id = $("#creditor_id").val();
  if (creditor_id != "") {
    formArray.push({ name: "creditor_id", value: creditor_id });

    custom_ajax_iFunction(base_url, formArray)
      .then((data) => {
        if (data["status_type"] == "success") {
          html = "";
          for (i = 0; i < data["dbdata"]["invoice_details_id"].length; i++) {
            const invoice_details_id = data["dbdata"]["invoice_details_id"][i];
            const invoice_date = data["dbdata"]["invoice_date"][i];
            const net_amount = data["dbdata"]["net_amount"][i];
            const invoice_amount = data["dbdata"]["invoice_amount"][i];
            const invoice_balance = data["dbdata"]["invoice_balance"][i];
            const amount_received = data["dbdata"]["amount_received"][i];
            html += `
            <option value="${invoice_details_id}">
              Net: ${net_amount}, 
              Inv A: ${invoice_amount}, 
              Inv Blnc: ${invoice_balance},
              A Rec: ${amount_received}
            </option>
          `;
          }
          $("#" + datalistId).html(html);
          //   Work on here
          // Attach event listener to stock name input field
          $('input[placeholder="INVOICE NO"]').on("change", function () {
            const selectedStockName = $(this).val();
            //   const selectedIndex = data["dbdata"]["invoice_details_id"].indexOf(selectedStockName);
            const selectedIndex = data["dbdata"]["invoice_details_id"]
              .map((item) => Number(item)) // Convert elements to numbers
              .indexOf(Number(selectedStockName)); // Convert selectedStockName to number

            if (selectedIndex !== -1) {
              const invDate = data["dbdata"]["invoice_date"][selectedIndex];
              const netAmount =
                parseFloat(data["dbdata"]["net_amount"][selectedIndex]) || 0;
              const invAmount =
                parseFloat(data["dbdata"]["invoice_amount"][selectedIndex]) ||
                0;
              const tds = parseFloat($("#tds").val()) || 0;
              const tdsAmount = (tds * netAmount) / 100;
              const tSettleAmount = invAmount - tdsAmount;

              $(this)
                .closest("tr")
                .find("td")
                .eq($(this).parent().index() + 1)
                .find('input[placeholder="INVOICE DATE"]')
                .val(invDate);
              $(this)
                .closest("tr")
                .find("td")
                .eq($(this).parent().index() + 2)
                .find('input[placeholder="NET AMOUNT"]')
                .val(netAmount);
              $(this)
                .closest("tr")
                .find("td")
                .eq($(this).parent().index() + 3)
                .find('input[placeholder="INVOICE AMOUNT"]')
                .val(invAmount);
              $(this)
                .closest("tr")
                .find("td")
                .eq($(this).parent().index() + 4)
                .find('input[placeholder="TDS AMOUNT"]')
                .val(tdsAmount);
              $(this)
                .closest("tr")
                .find("td")
                .eq($(this).parent().index() + 6)
                .find('input[placeholder="TOTAL SETTLEMENT AMOUNT"]')
                .val(tSettleAmount);
              $(this)
                .closest("tr")
                .find("td")
                .eq($(this).parent().index() + 7)
                .find('input[placeholder="AMOUNT RECEIVED"]')
                .val(tSettleAmount);
              // After this you can calculate totals/footer
              calculateReceiptTotal();
              calculateFooterTotals(
                "invoicesDetailsTableTbody",
                ["TOTAL SETTLEMENT AMOUNT", "AMOUNT RECEIVED"],
                [8, 9]
              );
            }
          });
        } else {
          toaster(data.status_type, data.status);
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
discount_calc = (elem) => {
  calculateReceiptTotal();
  var amount_received = $(elem).val();
  var prevInput = $(elem).parent().prev().find("input");
  var prevValue = parseFloat($(prevInput).val());
  var nextInput = $(elem).parent().next().find("input");
  var discountPercentage = prevValue - amount_received;
  $(nextInput).val(discountPercentage.toFixed(2));
};

// For calculate all totals at the end
calculateReceiptTotal = () => {
  var totalInvoiceAmount = 0;
  var totalAmountReceived = 0;

  // Calculate Total Amount before Tax
  $("#invoicesDetailsTableTbody tr").each(function () {
    var totalInvoiceAmountRow =
      parseFloat(
        $(this).find("input[placeholder='TOTAL SETTLEMENT AMOUNT']").val()
      ) || 0;
    totalInvoiceAmount += totalInvoiceAmountRow;

    var totalAmountReceivedRow =
      parseFloat($(this).find("input[placeholder='AMOUNT RECEIVED']").val()) ||
      0;
    totalAmountReceived += totalAmountReceivedRow;
  });
  // Update the values in the corresponding td elements
  $("#total_invoice_amount").text(totalInvoiceAmount.toFixed(2));
  $("#total_amount_received").text(totalAmountReceived.toFixed(2));
};

populateLastRowWithDataReceipt = (data, tableId, len, currentIndex) => {
  console.log(data);
  const lastRow = $("#invoicesDetailsTableTbody tr:last");
  const dataVal = data.receipt_invoice_details;

  lastRow
    .find("input[placeholder='INVOICE NO']")
    .val(dataVal.invoice_details_id[currentIndex]);
  lastRow
    .find("input[placeholder='INVOICE DATE']")
    .val(dataVal.invoice_date[currentIndex]);
  lastRow
    .find("input[placeholder='NET AMOUNT']")
    .val(dataVal.net_amount[currentIndex]);
  lastRow
    .find("input[placeholder='INVOICE AMOUNT']")
    .val(dataVal.invoice_amount[currentIndex]);
  lastRow
    .find("input[placeholder='TDS AMOUNT']")
    .val(dataVal.tds_amount[currentIndex]);
  lastRow
    .find("select[placeholder='SETTLEMENT TYPE']")
    .val(dataVal.settlement_type[currentIndex]);
  lastRow
    .find("input[placeholder='TOTAL SETTLEMENT AMOUNT']")
    .val(dataVal.total_settlement_amount[currentIndex]);
  lastRow
    .find("input[placeholder='AMOUNT RECEIVED']")
    .val(dataVal.amount_received[currentIndex]);
  lastRow
    .find("input[placeholder='DISCOUNT']")
    .val(dataVal.discount[currentIndex]);

  currentIndex += 1;

  if (currentIndex < len) {
    addInvoicesRow();
    populateLastRowWithDataReceipt(data, tableId, len, currentIndex);
  } else return;
};
