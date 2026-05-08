views_creditnote_display = () => {
  var views_creditnote_page_pretitle = "<p>View</p>";
  var views_creditnote_page_title = "<p>Creditnote</p>";
  var views_creditnote_page_button = ` <div class="btn-list">
            <a href="javascript:;" class="btn btn-primary d-none d-sm-inline-block" onclick="create_new_creditnote();">
              <i class="ti ti-plus"></i>
              Create new creditnote
            </a>
            <a href="javascript:;" class="btn btn-primary d-sm-none btn-icon" aria-label="Create new creditnote" onclick="create_new_creditnote();">
              <i class="ti ti-plus"></i>
            </a>
          </div>`;
  var views_creditnote_page_body = ` <div class="container-xl">
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
                            <h3 class="card-title">All Creditnotes</h3>
                        </div>
                        <div class="table-responsive p-1" style="min-height:500px">
                            <table class="table card-table text-nowrap " id="datatable_init">
                                <thead>
                                    <tr>
                                        <th class="w-2">SL.NO</th>
                                        <th>Creditnote Id</th>
                                        <th>Return Date</th>
                                        <th>Customer Name</th>
                                        <th>Invoice Id</th>
                                        <th>Return Value</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="creditnote_display_table_body">
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
  $("#main-content .page-pretitle")
    .empty()
    .html(views_creditnote_page_pretitle);
  $("#main-content .page-title").empty().html(views_creditnote_page_title);
  $("#main-content .page-button").empty().html(views_creditnote_page_button);
  $("#main-content .page-body").empty().html(views_creditnote_page_body);

  // Refresh creditnote display--->.
  refreshCreditnoteDisplay = () => {
    base_url = "/api/creditnote/get-all-data";
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        html = "";
        if (data["status_type"] == "success") {
          html = "";
          for (i = 0; i < data["dbdata"]["creditnote_details_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + '<tr class="text-uppercase">';
            htmlTr = htmlTr + '<td class="text-muted">' + slno + "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-muted">' +
              data["dbdata"]["creditnote_details_id"][i] +
              "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["return_date"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["creditor_name"][i] + "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["invoice_details_id"][i] +
              "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-center">' +
              data["dbdata"]["total_return_amount"][i] +
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
                          <a class="dropdown-item" href="javascript:;" onclick="update_creditnote(` +
              data["dbdata"]["creditnote_details_id"][i] +
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
          $("#creditnote_display_table_body").html(html);
          $("#datatable_init").DataTable({
            responsive: true,
          });
        } else {
          $("#creditnote_display_table_body").html(html);
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
  refreshCreditnoteDisplay();
};

create_new_creditnote = () => {
  var create_new_creditnote_page_pretitle = "<p>Add new</p>";
  var create_new_creditnote_page_title = "<p>Creditnote</p>";
  var create_new_creditnote_page_body = ` <div class="container-xl">
    <div class="row row-cards">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                        <li class="nav-item ">
                            <a href="#creditnote_info_tab" class="nav-link active"
                                data-bs-toggle="tab">Creditnote
                                Info</a>
                        </li>
                        <li class="nav-item">
                            <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Customer
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
                        <div class="tab-pane fade active show" id="creditnote_info_tab">
                            <h4>Creditnote Info</h4>
                            <form id="creditnote_details_form">
                                <div class="row row-cards">
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label">Creditnote Id</label>
                                            <input type="number" class="form-control"
                                                placeholder="Creditnote Id" id="creditnote_details_id"
                                                name="creditnote_details_id" readonly>
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
                                            <label class="form-label required">Invoice IDs</label>
                                            <input type="text"
                                                class="form-control border-0 text-uppercase"
                                                placeholder="Invoice IDs" id="invoice_ids" name="invoice_ids" list="invoiceIdsDatalist"
                                                required>
                                            <datalist id="invoiceIdsDatalist"></datalist>
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
                            <h4>Item Details</h4>
                            <div class="table-responsive mb-2" style="max-height: 262px;">
                                <table class="table table-vcenter card-table"
                                    id="invoice_item_details_table">
                                    <thead>
                                        <tr>
                                            <th class="w-1"></th>
                                            <th>S.NO</th>
                                            <th>Product Name</th>
                                            <th>Stock Items Id</th>
                                            <th>CTH</th>
                                            <th>QTY</th>
                                            <th>UQC</th>
                                            <th>RATE</th>
                                            <th>AMOUNT</th>
                                            <th>DISCOUNT</th>
                                            <th>SUBTOTAL</th>
                                            <th>GST(%)</th>
                                            <th>IGST</th>
                                            <th>CGST</th>
                                            <th>SGST</th>
                                            <th>TOTAL</th>
                                            <th class="w-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="invoiceItemDetailsTableTbody">
                                        <tr>
                                            <td class="ps-3" onclick="addProductItemRowCreditnote();addInvoiceRowFromInvoice();"><i
                                                    class="ti ti-plus"></i></td>
                                            <td class="text-muted">1</td>
                                            <td class="p-1">
                                                <input type="text" class=" fs-6 border-0 text-uppercase"
                                                    placeholder="PRODUCT NAME"
                                                    list="productNameDatalist1">
                                                <datalist id="productNameDatalist1"></datalist>
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
                                                    class=" fs-6 border-0 rmvarrw" placeholder="RATE">
                                            </td>
                                            <td class="p-1"><input type="number"
                                                    class=" fs-6 border-0 rmvarrw" placeholder="AMOUNT">
                                            </td>
                                            <td class="p-1"><input type="number"
                                                    class=" fs-6 border-0 rmvarrw"
                                                    placeholder="DISCOUNT">
                                            </td>
                                            <td class="p-1"><input type="number"
                                                    class=" fs-6 border-0 rmvarrw"
                                                    placeholder="SUBTOTAL" readonly>
                                            </td>
                                            <td class="p-1"><input type="number"
                                                    class="form-control fs-6 border-0 rmvarrw"
                                                    placeholder="GST">
                                            </td>
                                            <td class="p-1"><input type="number"
                                                    class="form-control fs-6 border-0 rmvarrw"
                                                    placeholder="IGST" readonly>
                                            </td>
                                            <td class="p-1"><input type="number"
                                                    class="form-control fs-6 border-0 rmvarrw"
                                                    placeholder="CGST" readonly>
                                            </td>
                                            <td class="p-1"><input type="number"
                                                    class="form-control fs-6 border-0 rmvarrw"
                                                    placeholder="SGST" readonly>
                                            </td>
                                            <td class="p-1"><input type="number"
                                                    class=" fs-6 border-0 rmvarrw" placeholder="TOTAL"
                                                    readonly>
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
                                                            Total Amount before Tax
                                                        </td>
                                                        <td class=" fw-bold text-end"
                                                            id="total_amount_before_tax"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Total IGST
                                                        </td>
                                                        <td class=" fw-bold text-end" id="total_igst">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Total CGST
                                                        </td>
                                                        <td class=" fw-bold text-end" id="total_cgst">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Total SGST
                                                        </td>
                                                        <td class=" fw-bold text-end" id="total_sgst">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Total Tax Amount
                                                        </td>
                                                        <td class=" fw-bold text-end"
                                                            id="total_tax_amount"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Total Amount after Tax
                                                        </td>
                                                        <td class=" fw-bold text-end"
                                                            id="total_amount_after_tax"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Round Off
                                                        </td>
                                                        <td class=" fw-bold text-end" id="roundoff">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-red border-top">
                                                            Total return Amount
                                                        </td>
                                                        <td class=" fw-bold text-end border-top text-red"
                                                            id="grand_total">
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
                        onclick="views_creditnote_display();">Close</a>
                    <button type="submit" class="btn btn-primary" id="new_creditnote_submit">Save
                        Details</button>
                </div>
            </div>
        </div>
    </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_creditnote_page_pretitle);
  $("#main-content .page-title").empty().html(create_new_creditnote_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(create_new_creditnote_page_body);

  //Fetch all credit list from customer--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "sundry debtors",
    "1",
    "creditor_name",
    "creditor_details_form",
    () => {
      // Callback function according to this customer call all invoices for this customer
      miniFetchInvoicess("invoiceIdsDatalist");
    }
  );

  //Set current date for payment date
  multi_fn_currentDate("return_date");

  //Calculate invoice item tables tfoot and all totals**
  $("#invoiceItemDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='AMOUNT'],input[placeholder='QTY'],input[placeholder='DISCOUNT'],input[placeholder='RATE'],input[placeholder='GST']",
    function () {
      calculateInvoicesTotal();
      calculateFooterTotals(
        "invoiceItemDetailsTableTbody",
        [
          "QTY",
          "RATE",
          "AMOUNT",
          "DISCOUNT",
          "SUBTOTAL",
          "IGST",
          "CGST",
          "SGST",
          "TOTAL",
        ],
        [5, 7, 8, 9, 10, 12, 13, 14, 15]
      );
    }
  );

  //  Submit function for insert data in DB
  $("#new_creditnote_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const creditnoteDetailsFormArray = $(
      "#creditnote_details_form"
    ).serializeArray();
    const creditorDetailsFormArray = $(
      "#creditor_details_form"
    ).serializeArray();
    // Initialize an array to store the objects for invoice totals
    var invoiceTotals = [];

    // Iterate over each <tr> element in the invoice totals table body
    $("#invoiceTotalsTableTbody tr").each(function () {
      // Get the name and value from the <td> elements
      var name = $(this)
        .find("td:first-child")
        .text()
        .trim()
        .replace(/\s+/g, "_")
        .toLowerCase();
      var value = $(this).find("td:last-child").text().trim();

      // Push an object with name and value to the invoiceTotals array
      invoiceTotals.push({ name: name, value: value });
    });

    // Combine form arrays into a single array
    const groupFormArray = [
      ...creditnoteDetailsFormArray,
      ...creditorDetailsFormArray,
      ...invoiceTotals,
    ];

    // Get table data
    const invoiceItemDetailsFormArray = getTableDataAsArray(
      "invoice_item_details_table",
      ["product_name", "total"]
    );

    // Validate form fields
    const allValidated = formValidate([
      ...creditnoteDetailsFormArray,
      ...creditorDetailsFormArray,
    ]);

    if (allValidated && $("#grand_total").text() !== "" && parseFloat($("#grand_total").text()) !== 0) {
      const base_url = "/api/creditnote/add-new";
      //  Add one extra field is Total paid amount

      // Push table data into mainFormArray with condition
      const mainFormArray = [
        { name: "creditnote_details_formArray", value: groupFormArray },
        {
          name: "invoice_item_details_formarray",
          value: invoiceItemDetailsFormArray,
        },
      ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshCreditnoteDisplay();
            toaster(data.status_type, data.status);
            $("#new_creditnote_submit").attr("disabled", true);
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
        "All fields are not valid or Return amount can not be blank."
      );
    }
  });
};

update_creditnote = (passdata_creditnote_details_id) => {
  var update_creditnote_page_pretitle = "<p>Edit</p>";
  var update_creditnote_page_title = "<p>Creditnote</p>";
  var update_creditnote_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item ">
                          <a href="#creditnote_info_tab" class="nav-link active"
                              data-bs-toggle="tab">Creditnote
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Customer
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
                      <div class="tab-pane fade active show" id="creditnote_info_tab">
                          <h4>Creditnote Info</h4>
                          <form id="creditnote_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Creditnote Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Creditnote Id" id="creditnote_details_id"
                                              name="creditnote_details_id" readonly>
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
                                          <label class="form-label required">Invoice IDs</label>
                                          <input type="text"
                                              class="form-control border-0 text-uppercase"
                                              placeholder="Invoice IDs" id="invoice_ids" name="invoice_ids" list="invoiceIdsDatalist"
                                              required>
                                          <datalist id="invoiceIdsDatalist"></datalist>
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
                          <h4>Item Details</h4>
                          <div class="table-responsive mb-2" style="max-height: 262px;">
                              <table class="table table-vcenter card-table"
                                  id="invoice_item_details_table">
                                  <thead>
                                      <tr>
                                          <th class="w-1"></th>
                                          <th>S.NO</th>
                                          <th>Product Name</th>
                                          <th>Stock Items Id</th>
                                          <th>CTH</th>
                                          <th>QTY</th>
                                          <th>UQC</th>
                                          <th>RATE</th>
                                          <th>AMOUNT</th>
                                          <th>DISCOUNT</th>
                                          <th>SUBTOTAL</th>
                                          <th>GST(%)</th>
                                          <th>IGST</th>
                                          <th>CGST</th>
                                          <th>SGST</th>
                                          <th>TOTAL</th>
                                          <th class="w-1"></th>
                                      </tr>
                                  </thead>
                                  <tbody id="invoiceItemDetailsTableTbody">
                                      <tr>
                                          <td class="ps-3" onclick="addProductItemRowCreditnote();addInvoiceRowFromInvoice();"><i
                                                  class="ti ti-plus"></i></td>
                                          <td class="text-muted">1</td>
                                          <td class="p-1">
                                              <input type="text" class=" fs-6 border-0 text-uppercase"
                                                  placeholder="PRODUCT NAME"
                                                  list="productNameDatalist1">
                                              <datalist id="productNameDatalist1"></datalist>
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
                                                  class=" fs-6 border-0 rmvarrw" placeholder="RATE">
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw" placeholder="AMOUNT">
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw"
                                                  placeholder="DISCOUNT">
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw"
                                                  placeholder="SUBTOTAL" readonly>
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class="form-control fs-6 border-0 rmvarrw"
                                                  placeholder="GST">
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class="form-control fs-6 border-0 rmvarrw"
                                                  placeholder="IGST" readonly>
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class="form-control fs-6 border-0 rmvarrw"
                                                  placeholder="CGST" readonly>
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class="form-control fs-6 border-0 rmvarrw"
                                                  placeholder="SGST" readonly>
                                          </td>
                                          <td class="p-1"><input type="number"
                                                  class=" fs-6 border-0 rmvarrw" placeholder="TOTAL"
                                                  readonly>
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
                                                          Total Amount before Tax
                                                      </td>
                                                      <td class=" fw-bold text-end"
                                                          id="total_amount_before_tax"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total IGST
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_igst">
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total CGST
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_cgst">
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total SGST
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_sgst">
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total Tax Amount
                                                      </td>
                                                      <td class=" fw-bold text-end"
                                                          id="total_tax_amount"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total Amount after Tax
                                                      </td>
                                                      <td class=" fw-bold text-end"
                                                          id="total_amount_after_tax"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Round Off
                                                      </td>
                                                      <td class=" fw-bold text-end" id="roundoff">
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="text-red border-top">
                                                          Total return Amount
                                                      </td>
                                                      <td class=" fw-bold text-end border-top text-red"
                                                          id="grand_total">
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
                      onclick="views_creditnote_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="update_creditnote_submit">Update
                      Details</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(update_creditnote_page_pretitle);
  $("#main-content .page-title").empty().html(update_creditnote_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_creditnote_page_body);
  //Fetch all credit list from customer--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "sundry debtors",
    "1",
    "creditor_name",
    "creditor_details_form",
    () => {
      // Callback function according to this customer call all invoices for this customer
      miniFetchInvoicess("invoiceIdsDatalist");
    }
  );
  //Set current date for payment date
  multi_fn_currentDate("return_date");
  //   miniFetchInvoicess("invoiceIdsDatalist");

  // Fetch single data for update***************>>
  fetch_url = "/api/creditnote/get-single-data";
  result = [
    { name: "creditnote_details_id", value: passdata_creditnote_details_id },
  ];
  //   showLoader();
  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {

      if (data["status_type"] == "success") {
        refreshForm(
          "#creditor_details_form",
          data.creditnote_details,
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
          "#creditnote_details_form",
          data.creditnote_details,
          [],
          [
            "creditnote_details_id",
            "return_date",
            "narration",
            "invoice_details_id",
          ]
        );

        setTimeout(() => {
          refreshForm(
            "#creditor_details_form",
            data.creditnote_details,
            [],
            ["state"]
          );
        }, 1000);

        $("#invoiceItemDetailsTableTbody").empty();
        addProductItemRowCreditnote();
        dbLen = data["dbdata"]["creditnote_details_id"].length;
        populateLastRowWithDataInvoicess(
          data,
          "invoice_item_details_table",
          dbLen,
          0
        );
        //   After populate data now calculte totals
        calculateInvoicesTotal();
        calculateFooterTotals(
          "invoiceItemDetailsTableTbody",
          [
            "QTY",
            "RATE",
            "AMOUNT",
            "DISCOUNT",
            "SUBTOTAL",
            "IGST",
            "CGST",
            "SGST",
            "TOTAL",
          ],
          [5, 7, 8, 9, 10, 12, 13, 14, 15]
        );
        setTimeout(() => {
          $("#invoice_ids").val(
            data["creditnote_details"]["invoice_details_id"][0]
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
  $("#invoiceItemDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='AMOUNT'],input[placeholder='QTY'],input[placeholder='DISCOUNT'],input[placeholder='RATE'],input[placeholder='GST']",
    function () {
      calculateInvoicesTotal();
      calculateFooterTotals(
        "invoiceItemDetailsTableTbody",
        [
          "QTY",
          "RATE",
          "AMOUNT",
          "DISCOUNT",
          "SUBTOTAL",
          "IGST",
          "CGST",
          "SGST",
          "TOTAL",
        ],
        [5, 7, 8, 9, 10, 12, 13, 14, 15]
      );
    }
  );

  // Submit function for update data in DB------>>>
  $("#update_creditnote_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const creditnoteDetailsFormArray = $(
      "#creditnote_details_form"
    ).serializeArray();
    const creditorDetailsFormArray = $(
      "#creditor_details_form"
    ).serializeArray();
    // Initialize an array to store the objects for invoice totals
    var invoiceTotals = [];

    // Iterate over each <tr> element in the invoice totals table body
    $("#invoiceTotalsTableTbody tr").each(function () {
      // Get the name and value from the <td> elements
      var name = $(this)
        .find("td:first-child")
        .text()
        .trim()
        .replace(/\s+/g, "_")
        .toLowerCase();
      var value = $(this).find("td:last-child").text().trim();

      // Push an object with name and value to the invoiceTotals array
      invoiceTotals.push({ name: name, value: value });
    });

    // Combine form arrays into a single array
    const groupFormArray = [
      ...creditnoteDetailsFormArray,
      ...creditorDetailsFormArray,
      ...invoiceTotals,
    ];

    // Get table data
    const invoiceItemDetailsFormArray = getTableDataAsArray(
      "invoice_item_details_table",
      ["product_name", "total"]
    );

    // Validate form fields
    const allValidated = formValidate([
      ...creditnoteDetailsFormArray,
      ...creditorDetailsFormArray,
    ]);

    if (allValidated && $("#grand_total").text() !== "" && parseFloat($("#grand_total").text()) !== 0) {
      const base_url = "/api/creditnote/update";
      //  Add one extra field is Total paid amount

      // Push table data into mainFormArray with condition
      const mainFormArray = [
        { name: "creditnote_details_formArray", value: groupFormArray },
        {
          name: "invoice_item_details_formarray",
          value: invoiceItemDetailsFormArray,
        },
      ];

      // Perform AJAX request

      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshCreditnoteDisplay();
            toaster(data.status_type, data.status);
            // $("#update_creditnote_submit").attr("disabled", true);
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
        "All fields are not valid or Return amount can not be blank."
      );
    }
  });
};

// Small functions===========^^^^^^========>>

// For add row in product item
addProductItemRowCreditnote = () => {
  // Get the number of existing rows in the table
  const existingRowCount = $("#invoiceItemDetailsTableTbody tr").length;

  // Increment the serial number for the new row
  const newSerialNumber = existingRowCount + 1;

  const row = `<tr>
      <td class="ps-3" onclick="addProductItemRowCreditnote();addInvoiceRowFromInvoice();"><i
              class="ti ti-plus"></i></td>
      <td class="text-muted">${newSerialNumber}</td>
      <td class="p-1">
          <input type="text" class=" fs-6 border-0 text-uppercase"
          placeholder="PRODUCT NAME" list="productNameDatalist${newSerialNumber}">
          <datalist id="productNameDatalist${newSerialNumber}"></datalist>
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
              class=" fs-6 border-0 rmvarrw" placeholder="RATE">
      </td>
      <td class="p-1"><input type="number"
              class=" fs-6 border-0 rmvarrw" placeholder="AMOUNT">
      </td>
      <td class="p-1"><input type="number"
              class=" fs-6 border-0 rmvarrw" placeholder="DISCOUNT">
      </td>
      <td class="p-1"><input type="number"
              class=" fs-6 border-0 rmvarrw" placeholder="SUBTOTAL" readonly>
      </td>
      <td class="p-1"><input type="number"
              class="form-control fs-6 border-0 rmvarrw"
              placeholder="GST">
      </td>
      <td class="p-1"><input type="number"
              class="form-control fs-6 border-0 rmvarrw"
              placeholder="IGST" readonly>
      </td>
      <td class="p-1"><input type="number"
              class="form-control fs-6 border-0 rmvarrw"
              placeholder="CGST" readonly>
      </td>
      <td class="p-1"><input type="number"
              class="form-control fs-6 border-0 rmvarrw"
              placeholder="SGST" readonly>
      </td>
      <td class="p-1"><input type="number"
              class=" fs-6 border-0 rmvarrw"
              placeholder="TOTAL" readonly>
      </td>
  
      <td class="pe-3" onclick="remove_row_from_table(this,()=>{calculateFooterTotals(
          'invoiceItemDetailsTableTbody',
          [
            'QTY',
            'RATE',
            'AMOUNT',
            'DISCOUNT',
            'SUBTOTAL',
            'IGST',
            'CGST',
            'SGST',
            'TOTAL',
          ],
          [5, 7, 8, 9, 10, 12, 13, 14, 15]
        );calculateInvoicesTotal();})"><i class="ti ti-minus tf" ></i></td>
  </tr>`;
  $("#invoiceItemDetailsTableTbody").append(row);
};

miniFetchInvoicess = (datalistId) => {
  base_url = "/api/creditnote/invoices/fetch";
  formArray = [{ name: "creditor_id", value: $("#creditor_id").val() }];
  custom_ajax_iFunction(base_url, formArray)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["singledata"]["invoice_details_id"].length; i++) {
          const idI = data["singledata"]["invoice_details_id"][i];
          const invNo = data["singledata"]["invoice_no"][i];
          const invDate = data["singledata"]["invoice_date"][i];
          const invGrandTotal = data["singledata"]["grand_total"][i];
          htmlTr = "";
          htmlTr +=
            '<option value="' +
            idI +
            '">Invoice No: ' +
            invNo +
            ", Date: " +
            invDate +
            ", Total: " +
            invGrandTotal +
            "</option>";
          html = html + htmlTr;
        }
        $("#" + datalistId).html(html);
        // **** call a populatedatawithRow function****//
        // Attach event listener to stock name input field
        $('input[placeholder="Invoice IDs"]').on("change", function () {
          // So id invoice id chnage then first clear prev data then add tr
          $("#invoiceItemDetailsTableTbody").empty();
          addProductItemRowCreditnote();
          dbLen = data["dbdata"]["invoice_details_id"].length;
          populateLastRowWithDataInvoicess(
            data,
            "invoice_item_details_table",
            dbLen,
            0
          );
          //   After populate data now calculte totals
          calculateInvoicesTotal();
          calculateFooterTotals(
            "invoiceItemDetailsTableTbody",
            [
              "QTY",
              "RATE",
              "AMOUNT",
              "DISCOUNT",
              "SUBTOTAL",
              "IGST",
              "CGST",
              "SGST",
              "TOTAL",
            ],
            [5, 7, 8, 9, 10, 12, 13, 14, 15]
          );
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

populateLastRowWithDataInvoicess = (data, tableId, len, currentIndex) => {
  const lastRow = $("#invoiceItemDetailsTableTbody tr:last");
  const dataVal = data.dbdata;

  lastRow
    .find("input[placeholder='PRODUCT NAME']")
    .val(dataVal.product_name[currentIndex]);
  lastRow
    .find("input[placeholder='STOCK ITEMS ID']")
    .val(dataVal.stock_items_id[currentIndex]);
  lastRow.find("input[placeholder='CTH']").val(dataVal.cth[currentIndex]);
  lastRow.find("input[placeholder='QTY']").val(dataVal.qty[currentIndex]);
  lastRow.find("input[placeholder='UQC']").val(dataVal.uqc[currentIndex]);
  lastRow.find("input[placeholder='RATE']").val(dataVal.rate[currentIndex]);
  lastRow.find("input[placeholder='AMOUNT']").val(dataVal.amount[currentIndex]);
  lastRow
    .find("input[placeholder='DISCOUNT']")
    .val(dataVal.discount[currentIndex]);
  lastRow
    .find("input[placeholder='SUBTOTAL']")
    .val(dataVal.subtotal[currentIndex]);
  lastRow.find("input[placeholder='GST']").val(dataVal.gst[currentIndex]);
  lastRow.find("input[placeholder='IGST']").val(dataVal.igst[currentIndex]);
  lastRow.find("input[placeholder='CGST']").val(dataVal.cgst[currentIndex]);
  lastRow.find("input[placeholder='SGST']").val(dataVal.sgst[currentIndex]);
  lastRow.find("input[placeholder='TOTAL']").val(dataVal.total[currentIndex]);

  currentIndex += 1;

  if (currentIndex < len) {
    addProductItemRowCreditnote();
    populateLastRowWithDataInvoicess(data, tableId, len, currentIndex);
  } else return;
};

calculateInvoicesTotal = () => {

  // Iterate through all rows in the table
  $("#invoiceItemDetailsTableTbody tr").each(function () {
    var subtotalRow = 0;
    var cgst = 0;
    var sgst = 0;
    var igst = 0;

    // Get the input fields in the current row
    var qty = parseFloat($(this).find("input[placeholder='QTY']").val());
    var rate = parseFloat($(this).find("input[placeholder='RATE']").val());
    var discount =
      parseFloat($(this).find("input[placeholder='DISCOUNT']").val()) || 0;
    var gst = parseFloat($(this).find("input[placeholder='GST']").val()) || 0;
    var state = parseInt($("#state").val());

    // Calculate the amount for the current row
    var amount = qty * rate;
    $(this).find("input[placeholder='AMOUNT']").val(amount.toFixed(2));

    // Calculate the subtotal for the current row
    subtotalRow = amount - discount;
    $(this).find("input[placeholder='SUBTOTAL']").val(subtotalRow.toFixed(2));

    // Calculate GST and update CGST, SGST, and IGST for the current row
    if (gst !== 0) {
      if (state !== 35) {
        igst = subtotalRow * (gst / 100);
      } else {
        cgst = subtotalRow * (gst / 200);
        sgst = cgst;
      }
    }

    // Update CGST, SGST, and IGST for the current row
    $(this).find("input[placeholder='CGST']").val(cgst.toFixed(2));
    $(this).find("input[placeholder='SGST']").val(sgst.toFixed(2));
    $(this).find("input[placeholder='IGST']").val(igst.toFixed(2));

    // Calculate the row total including GST
    var rowTotal = subtotalRow + (state === 35 ? cgst + sgst : igst);
    $(this).find("input[placeholder='TOTAL']").val(rowTotal.toFixed(2));
  });
  calculateCreditnoteInvoiceMainTotal();
};

calculateCreditnoteInvoiceMainTotal = () => {
  var totalAmountBeforeTax = 0;
  var totalIgst = 0;
  var totalCgst = 0;
  var totalSgst = 0;
  var totalTaxAmount = 0;

  // Calculate Total Amount before Tax
  $("#invoiceItemDetailsTableTbody tr").each(function () {
    var subtotalRow =
      parseFloat($(this).find("input[placeholder='SUBTOTAL']").val()) || 0;
    totalAmountBeforeTax += subtotalRow;
  });

  // Calculate Total IGST, CGST, SGST, and Tax Amount
  $("#invoiceItemDetailsTableTbody tr").each(function () {
    var igst = parseFloat($(this).find("input[placeholder='IGST']").val()) || 0;
    var cgst = parseFloat($(this).find("input[placeholder='CGST']").val()) || 0;
    var sgst = parseFloat($(this).find("input[placeholder='SGST']").val()) || 0;
    totalIgst += igst;
    totalCgst += cgst;
    totalSgst += sgst;
    totalTaxAmount += igst + cgst + sgst;
  });

  // Calculate Total Amount after Tax
  var totalAmountAfterTax = totalAmountBeforeTax + totalTaxAmount;

  // Calculate Round Off
  var roundOff = Math.round(totalAmountAfterTax) - totalAmountAfterTax;

  // Calculate Grand Total
  var grandTotal = Math.round(totalAmountAfterTax);

  // Set GST on Reverse Charge to 0
  $("#gst_on_reverse_charge").text("0.00");

  // Update the values in the corresponding td elements
  $("#total_amount_before_tax").text(totalAmountBeforeTax.toFixed(2));
  $("#total_igst").text(totalIgst.toFixed(2));
  $("#total_cgst").text(totalCgst.toFixed(2));
  $("#total_sgst").text(totalSgst.toFixed(2));
  $("#total_tax_amount").text(totalTaxAmount.toFixed(2));
  $("#total_amount_after_tax").text(totalAmountAfterTax.toFixed(2));
  $("#round_off").text(roundOff.toFixed(2));
  $("#grand_total").text(grandTotal.toFixed(2));
};

// This function fetch data from invoice_item_details tables so that after remove from creditnote they can add

addInvoiceRowFromInvoice = () => {
  base_url = "/api/creditnote/invoices/add";
  formArray = [{ name: "invoice_details_id", value: $("#invoice_ids").val() }];
  custom_ajax_iFunction(base_url, formArray)
    .then((data) => {
      if (data["status_type"] == "success") {
        // Collect stock item IDs from the table
        const stockItemIds = [];
        $("#invoiceItemDetailsTableTbody tr").each(function () {
          stockItemIds.push(
            $(this).find('input[placeholder="STOCK ITEMS ID"]').val()
          );
        });
        let html = "";
        for (i = 0; i < data["dbdata"]["invoice_details_id"].length; i++) {
          // As we're fetching using invoice id so we'll get all invoices so
          // Here we've to filter it is that which ids are already have
          const productName = data["dbdata"]["product_name"][i];
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
        const lastRow = $("#invoiceItemDetailsTableTbody tr:last");
        $("#productNameDatalist" + (lastRow.length + 1)).html(html);
        /// Function to handle change event on the "PRODUCT NAME" input field
        // Function to handle change event on the "PRODUCT NAME" input field
        $('input[placeholder="PRODUCT NAME"]').on("change", function () {
          const prd_name = $(this).val(); // Get the selected option text
          for (const key in data.dbdata) {
            if (data.dbdata.hasOwnProperty(key) && key === "product_name") {
              // Filter data based on the entered product name
              const filteredData = data.dbdata[key].filter(
                (name, index) => name === prd_name
              );
              // If filteredData is not empty, you can further process it as needed
              if (filteredData.length > 0) {
                const index = data.dbdata["product_name"].indexOf(prd_name);
                // Check if the index is valid
                if (index !== -1) {
                  // Retrieve other properties based on the index
                  const rowData = {
                    product_name: data.dbdata.product_name[index],
                    stock_items_id: data.dbdata.stock_items_id[index],
                    cth: data.dbdata.cth[index],
                    qty: data.dbdata.qty[index],
                    uqc: data.dbdata.uqc[index],
                    rate: data.dbdata.rate[index],
                    amount: data.dbdata.amount[index],
                    discount: data.dbdata.discount[index],
                    subtotal: data.dbdata.subtotal[index],
                    gst: data.dbdata.gst[index],
                    igst: data.dbdata.igst[index],
                    cgst: data.dbdata.cgst[index],
                    sgst: data.dbdata.sgst[index],
                    total: data.dbdata.total[index],
                  };

                  const row = $(this).closest("tr");
                  row
                    .find('input[placeholder="PRODUCT NAME"]')
                    .val(rowData.product_name);
                  row
                    .find('input[placeholder="STOCK ITEMS ID"]')
                    .val(rowData.stock_items_id);
                  row.find('input[placeholder="CTH"]').val(rowData.cth);
                  row.find('input[placeholder="QTY"]').val(rowData.qty);
                  row.find('input[placeholder="UQC"]').val(rowData.uqc);
                  row.find('input[placeholder="RATE"]').val(rowData.rate);
                  row.find('input[placeholder="AMOUNT"]').val(rowData.amount);
                  row
                    .find('input[placeholder="DISCOUNT"]')
                    .val(rowData.discount);
                  row
                    .find('input[placeholder="SUBTOTAL"]')
                    .val(rowData.subtotal);
                  row.find('input[placeholder="GST"]').val(rowData.gst);
                  row.find('input[placeholder="IGST"]').val(rowData.igst);
                  row.find('input[placeholder="CGST"]').val(rowData.cgst);
                  row.find('input[placeholder="SGST"]').val(rowData.sgst);
                  row.find('input[placeholder="TOTAL"]').val(rowData.total);
                  calculateFooterTotals(
                    "invoiceItemDetailsTableTbody",
                    [
                      "QTY",
                      "RATE",
                      "AMOUNT",
                      "DISCOUNT",
                      "SUBTOTAL",
                      "IGST",
                      "CGST",
                      "SGST",
                      "TOTAL",
                    ],
                    [5, 7, 8, 9, 10, 12, 13, 14, 15]
                  );
                  calculateCreditnoteInvoiceMainTotal();
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
