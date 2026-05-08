views_invoice_display = () => {
  var views_invoice_page_pretitle = "<p>View</p>";
  var views_invoice_page_title = "<p>Invoices</p>";
  var views_invoice_page_button = ` <div class="btn-list">
      <a href="javascript:;" class="btn btn-outline-light d-none d-sm-inline-block" onclick="create_new_invoice();">
        <i class="ti ti-plus"></i>
        Create new invoice
      </a>
      <a href="javascript:;" class="btn btn-outline-light d-sm-none btn-icon" aria-label="Create new customer" onclick="create_new_invoice();">
        <i class="ti ti-plus"></i>
      </a>
    </div>`;
  var views_invoice_page_body = ` <div class="container-xl">
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
                      <h3 class="card-title">All Invoices</h3>
                  </div>
                  <div class="table-responsive p-1" style="min-height:500px">
                      <table class="table card-table text-nowrap " id="datatable_init">
                          <thead>
                              <tr>
                                  <th class="w-2">SL.NO</th>
                                  <th>Invoice No</th>
                                  <th>Invoice Date</th>
                                  <th>Creditor Name(Bill To Party)</th>
                                  <th>Ship To Party Name</th>
                                  <th>Mode of Purchase</th>
                                  <th>Invoice Amount</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody id="invoices_display_table_body">
                          <tr>
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
  $("#main-content .page-pretitle").empty().html(views_invoice_page_pretitle);
  $("#main-content .page-title").empty().html(views_invoice_page_title);
  $("#main-content .page-button").empty().html(views_invoice_page_button);
  $("#main-content .page-body").empty().html(views_invoice_page_body);

  // Refresh invoice display--->.
  refreshInvoiceDisplay = () => {
    base_url = "/api/invoice/get-all-data";
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        html = "";
        if (data["status_type"] == "success") {
          html = "";
          for (i = 0; i < data["dbdata"]["invoice_details_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + '<tr class="text-uppercase">';
            htmlTr =
              htmlTr + '<td class="text-muted">' + slno.toString() + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["invoice_no"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["invoice_date"][i] + "</td>";

            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["creditor_name"][i] + "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["ship_to_party_name"][i] +
              "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["mode_of_purchase"][i] + "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-center">' +
              data["dbdata"]["grand_total"][i] +
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
                    <a class="dropdown-item" href="javascript:;" onclick="update_invoice(` +
              data["dbdata"]["invoice_details_id"][i] +
              `);">
                    Edit
                  </a>
                    <a class="dropdown-item" href="javascript:;" data-bs-toggle="modal" data-bs-target="#fullWidthModal" onclick="downloadInvoice(` +
              data["dbdata"]["invoice_details_id"][i] +
              `);">Downlaod</a></div></div></div></td>`;
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
            </tr>`;
        }
        $("#datatable_init").DataTable();
        if ($.fn.DataTable.isDataTable("#datatable_init")) {
          $("#datatable_init").DataTable().clear().destroy();
          $("#invoices_display_table_body").html(html);
          $("#datatable_init").DataTable({
            responsive: true,
          });
        } else {
          $("#invoices_display_table_body").html(html);
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
  refreshInvoiceDisplay();
};

create_new_invoice = () => {
  var create_new_invoice_page_pretitle = "<p>Add new</p>";
  var create_new_invoice_page_title = "<p>Invoice</p>";
  var create_new_invoice_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item ">
                          <a href="#invoice_info_tab" class="nav-link active" data-bs-toggle="tab">Invoice
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Creditor
                              Info/Bill to Party</a>
                      </li>
                      <li class="nav-item">
                          <a href="#ship_to_party_info_tab" class="nav-link "
                              data-bs-toggle="tab">Ship To Party</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#purchases_tab" class="nav-link" data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Items
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade  active show" id="invoice_info_tab">
                          <h4>Invoice Info</h4>
                          <form id="invoice_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Invoice Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Invoice Id" id="invoice_details_id"
                                              name="invoice_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Invoice Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Invoice Date" id="invoice_date"
                                              name="invoice_date" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Invoice No</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Invoice No" id="invoice_no"
                                              name="invoice_no" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Mode Of Purchase</label>
                                          <select class="form-control form-select"
                                              id="mode_of_purchase" name="mode_of_purchase" required>
                                              <option value="cash">Cash</option>
                                              <option value="credit">Credit</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Transport Mode</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Transport Mode" id="transport_mode"
                                              name="transport_mode">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Vehicle No</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Vehicle No" id="vehicle_no"
                                              name="vehicle_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Date of Supply</label>
                                          <input type="date" class="form-control"
                                              placeholder="Date of Supply" id="date_of_supply"
                                              name="date_of_supply">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Place of Supply</label>
                                          <input type="text" class="form-control"
                                              placeholder="Place of Supply" id="place_of_supply"
                                              name="place_of_supply">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-check mt-2">
                                              <input class="form-check-input" type="checkbox"
                                                  id="reverse_charge" name="reverse_charge" value="1"
                                                  onchange="calculateInvoiceMainTotal()">
                                              <span class="form-check-label">Reverse
                                                  Charge(Y/N)</span>
                                          </label>
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade" id="creditor_info_tab">
                          <h4>Creditor Info/Bill To Party</h4>
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
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-check mt-5">
                                              <input class="form-check-input" type="checkbox"
                                                  id="ship_to_party_checkbox"
                                                  name="ship_to_party_checkbox" value="1"
                                                  onchange="handleShipToParty();">
                                              <span class="form-check-label">Same as ship to
                                                  party</span>
                                          </label>
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade" id="ship_to_party_info_tab">
                          <h4>Ship To Party Info</h4>
                          <form id="ship_to_party_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-12">
                                      <div class="mb-0">
                                          <label class="form-label required">Party Name</label>
                                          <div class="input-icon mb-3">
                                              <input type="text" class="form-control text-uppercase"
                                                  placeholder="party Name" id="ship_to_party_name"
                                                  name="ship_to_party_name" required>
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
                                              placeholder="Address" id="ship_to_party_address"
                                              name="ship_to_party_address" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Email</label>
                                          <input type="email" class="form-control" placeholder="Email"
                                              id="ship_to_party_email" name="ship_to_party_email">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Contact No</label>
                                          <input type="tel" class="form-control"
                                              placeholder="Contact No" id="ship_to_party_phone"
                                              name="ship_to_party_phone">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">City</label>
                                          <input type="text" class="form-control" placeholder="City"
                                              id="ship_to_party_city" name="ship_to_party_city"
                                              required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Postal Code</label>
                                          <input type="text" class="form-control"
                                              placeholder="ZIP Code" id="ship_to_party_pincode"
                                              name="ship_to_party_pincode" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Country</label>
                                          <select class="form-control form-select"
                                              id="ship_to_party_country" name="ship_to_party_country"
                                              required onchange="changeState(this);">
                                              <option value="india">India</option>
                                              <option value="china">China</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">State</label>
                                          <input type="text" class="form-control" placeholder="STATE"
                                              id="ship_to_party_state" name="ship_to_party_state"
                                              required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">GSTIN</label>
                                          <input type="text" class="form-control" placeholder="GSTIN"
                                              id="ship_to_party_gstin" name="ship_to_party_gstin">
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade" id="purchases_tab">
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
                                          <td class="ps-3" onclick="addProductItemRow();"><i
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
                                          <table class="table table-sm table-borderless" id="invoiceTotalsTable">
                                              <tbody id="invoiceTotalsTableTbody">
                                                  <tr class="border-top">
                                                      <td>
                                                          Total Amount before Tax
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_amount_before_tax"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total IGST
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_igst"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total CGST
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_cgst"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total SGST
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_sgst"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total Tax Amount
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_tax_amount"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total Amount after Tax
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_amount_after_tax"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Round Off
                                                      </td>
                                                      <td class=" fw-bold text-end" id="roundoff"></td>
                                                  </tr>
                                                  <tr>
                                                      <td class="text-red border-top">
                                                          Grand Total
                                                      </td>
                                                      <td
                                                          class=" fw-bold text-end border-top text-red" id="grand_total">
                                                          </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="border-top">
                                                          GST on Reverse Charge
                                                      </td>
                                                      <td class=" fw-bold border-top text-end" id="gst_on_reverse_charge">
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
                  <a href="javascript:;"
                      class="btn-secondary text-red me-auto"
                      onclick="views_invoice_display();">Close</a>
                  <button type="submit" class="btn btn-primary"
                      id="new_invoice_submit">Save
                      Details</button>
              </div>
          </div>
      </div>
  </div>
    </div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_invoice_page_pretitle);
  $("#main-content .page-title").empty().html(create_new_invoice_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(create_new_invoice_page_body);
  //Fetch all credit list from customer--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "sundry debtors",
    "1",
    "creditor_name",
    "creditor_details_form"
  );
  //Set current date for invoice date
  multi_fn_currentDate("invoice_date");

  //Mini function for fetch product items
  miniFetchProducts("productNameDatalist1");

  //Calculate invoice item tables tfoot and all totals**
  $("#invoiceItemDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='AMOUNT'],input[placeholder='QTY'],input[placeholder='DISCOUNT'],input[placeholder='RATE'],input[placeholder='GST']",
    function () {
      calculateInvoiceTotal();
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
  $("#new_invoice_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const invoiceDetailsFormArray = $("#invoice_details_form").serializeArray();
    const creditorDetailsFormArray = $(
      "#creditor_details_form"
    ).serializeArray();
    const shipToPartyDetailsFormArray = $(
      "#ship_to_party_details_form"
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
      ...invoiceDetailsFormArray,
      ...creditorDetailsFormArray,
      ...shipToPartyDetailsFormArray,
      ...invoiceTotals,
    ];

    // Get table data
    const invoiceItemDetailsFormArray = getTableDataAsArray(
      "invoice_item_details_table"
    );

    // Validate form fields
    const allValidated = formValidate([
      ...invoiceDetailsFormArray,
      ...creditorDetailsFormArray,
      ...shipToPartyDetailsFormArray,
    ]);

    if (
      allValidated &&
      groupFormArray[0].product_name !== "" &&
      $("#grand_total").text() !== "" && parseFloat($("#grand_total").text()) !== 0
    ) {
      const base_url = "/api/invoice/add-new";

      // Push table data into mainFormArray
      const mainFormArray = [
        { name: "invoice_details_formArray", value: groupFormArray },
        {
          name: "invoice_item_details_formarray",
          value: invoiceItemDetailsFormArray,
        },
      ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshInvoiceDisplay();
            toaster(data.status_type, data.status);
            $("#new_invoice_submit").attr("disabled", true);
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

update_invoice = (passdata_invoice_details_id) => {
  var update_invoice_page_pretitle = "<p>Edit</p>";
  var update_invoice_page_title = "<p>Invoice</p>";
  var update_invoice_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item">
                          <a href="#invoice_info_tab" class="nav-link " data-bs-toggle="tab">Invoice
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Creditor
                              Info/Bill to Party</a>
                      </li>
                      <li class="nav-item">
                          <a href="#ship_to_party_info_tab" class="nav-link "
                              data-bs-toggle="tab">Ship To Party</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#purchases_tab" class="nav-link active" data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Items
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade " id="invoice_info_tab">
                          <h4>Invoice Info</h4>
                          <form id="invoice_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Invoice Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Invoice Id" id="invoice_details_id"
                                              name="invoice_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Invoice Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Invoice Date" id="invoice_date"
                                              name="invoice_date" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Invoice No</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Invoice No" id="invoice_no"
                                              name="invoice_no" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Mode Of Purchase</label>
                                          <select class="form-control form-select"
                                              id="mode_of_purchase" name="mode_of_purchase" required>
                                              <option value="cash">Cash</option>
                                              <option value="credit">Credit</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Transport Mode</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Transport Mode" id="transport_mode"
                                              name="transport_mode">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Vehicle No</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Vehicle No" id="vehicle_no"
                                              name="vehicle_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Date of Supply</label>
                                          <input type="date" class="form-control"
                                              placeholder="Date of Supply" id="date_of_supply"
                                              name="date_of_supply">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Place of Supply</label>
                                          <input type="text" class="form-control"
                                              placeholder="Place of Supply" id="place_of_supply"
                                              name="place_of_supply">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-check mt-2">
                                              <input class="form-check-input" type="checkbox"
                                                  id="reverse_charge" name="reverse_charge" value="1"
                                                  onchange="calculateInvoiceMainTotal()">
                                              <span class="form-check-label">Reverse
                                                  Charge(Y/N)</span>
                                          </label>
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade" id="creditor_info_tab">
                          <h4>Creditor Info/Bill To Party</h4>
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
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-check mt-5">
                                              <input class="form-check-input" type="checkbox"
                                                  id="ship_to_party_checkbox"
                                                  name="ship_to_party_checkbox" value="1"
                                                  onchange="handleShipToParty();">
                                              <span class="form-check-label">Same as ship to
                                                  party</span>
                                          </label>
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade" id="ship_to_party_info_tab">
                          <h4>Ship To Party Info</h4>
                          <form id="ship_to_party_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-12">
                                      <div class="mb-0">
                                          <label class="form-label required">Party Name</label>
                                          <div class="input-icon mb-3">
                                              <input type="text" class="form-control text-uppercase"
                                                  placeholder="party Name" id="ship_to_party_name"
                                                  name="ship_to_party_name" required>
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
                                              placeholder="Address" id="ship_to_party_address"
                                              name="ship_to_party_address" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Email</label>
                                          <input type="email" class="form-control" placeholder="Email"
                                              id="ship_to_party_email" name="ship_to_party_email">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Contact No</label>
                                          <input type="tel" class="form-control"
                                              placeholder="Contact No" id="ship_to_party_phone"
                                              name="ship_to_party_phone">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">City</label>
                                          <input type="text" class="form-control" placeholder="City"
                                              id="ship_to_party_city" name="ship_to_party_city"
                                              required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Postal Code</label>
                                          <input type="text" class="form-control"
                                              placeholder="ZIP Code" id="ship_to_party_pincode"
                                              name="ship_to_party_pincode" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Country</label>
                                          <select class="form-control form-select"
                                              id="ship_to_party_country" name="ship_to_party_country"
                                              required onchange="changeState(this);">
                                              <option value="india">India</option>
                                              <option value="china">China</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">State</label>
                                          <input type="text" class="form-control" placeholder="STATE"
                                              id="ship_to_party_state" name="ship_to_party_state"
                                              required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">GSTIN</label>
                                          <input type="text" class="form-control" placeholder="GSTIN"
                                              id="ship_to_party_gstin" name="ship_to_party_gstin">
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade active show" id="purchases_tab">
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
                                          <td class="ps-3" onclick="addProductItemRow();"><i
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
                                          <table class="table table-sm table-borderless" id="invoiceTotalsTable">
                                              <tbody id="invoiceTotalsTableTbody">
                                                  <tr class="border-top">
                                                      <td>
                                                          Total Amount before Tax
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_amount_before_tax"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total IGST
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_igst"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total CGST
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_cgst"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total SGST
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_sgst"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total Tax Amount
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_tax_amount"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Total Amount after Tax
                                                      </td>
                                                      <td class=" fw-bold text-end" id="total_amount_after_tax"></td>
                                                  </tr>
                                                  <tr>
                                                      <td>
                                                          Round Off
                                                      </td>
                                                      <td class=" fw-bold text-end" id="roundoff"></td>
                                                  </tr>
                                                  <tr>
                                                      <td class="text-red border-top">
                                                          Grand Total
                                                      </td>
                                                      <td
                                                          class=" fw-bold text-end border-top text-red" id="grand_total">
                                                          </td>
                                                  </tr>
                                                  <tr>
                                                      <td class="border-top">
                                                          GST on Reverse Charge
                                                      </td>
                                                      <td class=" fw-bold border-top text-end" id="gst_on_reverse_charge">
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
                  <a href="javascript:;"
                      class="btn-secondary text-red me-auto"
                      onclick="views_invoice_display();">Close</a>
                  <button type="submit" class="btn btn-primary"
                      id="update_invoice_submit">Update
                      Details</button>
              </div>
          </div>
      </div>
  </div>
    </div>`;
  $("#main-content .page-pretitle").empty().html(update_invoice_page_pretitle);
  $("#main-content .page-title").empty().html(update_invoice_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_invoice_page_body);
  //Fetch all credit list--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "sundry debtors",
    "1",
    "creditor_name",
    "creditor_details_form"
  );
  //Set current date for invoice date
  multi_fn_currentDate("invoice_date");

  //Mini function for fetch product items
  miniFetchProducts("productNameDatalist1");

  // Fetch single data for update***************>>
  fetch_url = "/api/invoice/get-single-data";
  result = [{ name: "invoice_details_id", value: passdata_invoice_details_id }];
  //   showLoader();
  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      if (data["status_type"] == "success") {
        refreshForm(
          "#creditor_details_form",
          data.invoice_details,
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
            "ship_to_party_checkbox",
          ]
        );
        refreshForm(
          "#invoice_details_form",
          data.invoice_details,
          [],
          [
            "invoice_details_id",
            "invoice_no",
            "invoice_date",
            "mode_of_purchase",
            "transport_mode",
            "vehicle_no",
            "date_of_supply",
            "place_of_supply",
            "reverse_charge",
          ]
        );

        setTimeout(() => {
          refreshForm(
            "#creditor_details_form",
            data.invoice_details,
            [],
            ["state"]
          );
        }, 1000);
        refreshForm(
          "#ship_to_party_details_form",
          data.invoice_details,
          [],
          [
            "ship_to_party_name",
            "ship_to_party_address",
            "ship_to_party_email",
            "ship_to_party_phone",
            "ship_to_party_city",
            "ship_to_party_pincode",
            "ship_to_party_country",
            "ship_to_party_state",
            "ship_to_party_gstin",
          ]
        );
        //Invoice item table data
        var len_of_invoice_item_details =
          data.invoice_item_details.invoice_item_details_id.length;

        populateLastRowWithDataInvoice(
          data,
          "invoiceItemDetailsTableTbody",
          len_of_invoice_item_details,
          0
        );
        // Calculate footer total and subtotal
        calculateInvoiceMainTotal();
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
      } else {
        toaster(data.status, data.status_type);
      }
      hideLoader();
    })
    .catch((err) => {
      console.log(err);
      hideLoader();
    }); //End fetch single data

  /* Calculate invoice item tables tfoot
     Calculate main total amount-
     only hit when any input field is change
    */

  //Calculate invoice item tables tfoot and all totals**
  $("#invoiceItemDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='AMOUNT'],input[placeholder='QTY'],input[placeholder='DISCOUNT'],input[placeholder='RATE'],input[placeholder='GST']",
    function () {
      calculateInvoiceTotal();
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
  $("#update_invoice_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const invoiceDetailsFormArray = $("#invoice_details_form").serializeArray();
    const creditorDetailsFormArray = $(
      "#creditor_details_form"
    ).serializeArray();
    // Checkboxes values when not checked
    const reverseChargeChecked = $("#reverse_charge").prop("checked")
      ? "1"
      : "0";
    const shipToPartyChecked = $("#ship_to_party_checkbox").prop("checked")
      ? "1"
      : "0";

    // Add checkboxes values to the form arrays
    creditorDetailsFormArray.push({
      name: "reverse_charge",
      value: reverseChargeChecked,
    });
    creditorDetailsFormArray.push({
      name: "ship_to_party_checkbox",
      value: shipToPartyChecked,
    });
    const shipToPartyDetailsFormArray = $(
      "#ship_to_party_details_form"
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
      ...invoiceDetailsFormArray,
      ...creditorDetailsFormArray,
      ...shipToPartyDetailsFormArray,
      ...invoiceTotals,
    ];

    // Get table data
    const invoiceItemDetailsFormArray = getTableDataAsArray(
      "invoice_item_details_table"
    );

    // Validate form fields
    const allValidated = formValidate([
      ...invoiceDetailsFormArray,
      ...creditorDetailsFormArray,
      ...shipToPartyDetailsFormArray,
    ]);

    if (
      allValidated &&
      groupFormArray[0].product_name !== "" &&
      $("#grand_total").text() !== "" && parseFloat($("#grand_total").text()) !== 0
    ) {
      const base_url = "/api/invoice/update";

      // Push table data into mainFormArray
      const mainFormArray = [
        { name: "invoice_details_formArray", value: groupFormArray },
        {
          name: "invoice_item_details_formarray",
          value: invoiceItemDetailsFormArray,
        },
      ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshInvoiceDisplay();
            toaster(data.status_type, data.status);
            $("#new_invoice_submit").attr("disabled", true);
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

// Small functions===========^^^^^^========>>
// Add change event listener to ship_to_party_checkbox
handleShipToParty = () => {
  const ship_to_party = $("#ship_to_party_checkbox").prop("checked");
  // Check if the checkbox is checked
  if (ship_to_party == true) {
    // Get values from creditor_details_form
    var creditorName = $("#creditor_name").val();
    var address = $("#address").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var city = $("#city").val();
    var pincode = $("#pincode").val();
    var country = $("#country").val();
    var state = $("#state option:selected").text();
    var gstin = $("#gstin").val();

    // Populate ship_to_party_details_form with values from creditor_details_form
    $("#ship_to_party_name").val(creditorName);
    $("#ship_to_party_address").val(address);
    $("#ship_to_party_email").val(email);
    $("#ship_to_party_phone").val(phone);
    $("#ship_to_party_city").val(city);
    $("#ship_to_party_pincode").val(pincode);
    $("#ship_to_party_country").val(country);
    $("#ship_to_party_state").val(state);
    $("#ship_to_party_gstin").val(gstin);
  } else {
    // If the checkbox is unchecked, clear the fields in ship_to_party_details_form
    $("#ship_to_party_name").val("");
    $("#ship_to_party_address").val("");
    $("#ship_to_party_email").val("");
    $("#ship_to_party_phone").val("");
    $("#ship_to_party_city").val("");
    $("#ship_to_party_pincode").val("");
    $("#ship_to_party_country").val("");
    $("#ship_to_party_state").val("");
    $("#ship_to_party_gstin").val("");
  }
};

// For add row in product item
addProductItemRow = () => {
  // Get the number of existing rows in the table
  const existingRowCount = $("#invoiceItemDetailsTableTbody tr").length;

  // Increment the serial number for the new row
  const newSerialNumber = existingRowCount + 1;

  const row = `<tr>
    <td class="ps-3" onclick="addProductItemRow();"><i
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
      );calculateInvoiceTotal();})"><i class="ti ti-minus tf" ></i></td>
</tr>`;
  $("#invoiceItemDetailsTableTbody").append(row);
  miniFetchProducts("productNameDatalist" + newSerialNumber);
};

// For every product row add all products list as datalist
miniFetchProducts = (datalistId) => {
  base_url = "/api/invoice/stock/stock-items/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      console.log(data);
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["stock_items_id"].length; i++) {
          const itemName = data["dbdata"]["stock_items_name"][i].toUpperCase();
          const hsn = data["dbdata"]["stock_hsn_code"][i]; // Get HSN code
          const qty =
            data["dbdata"]["qty"][i] == null ||
            data["dbdata"]["qty"][i] === "" ||
            data["dbdata"]["qty"][i] === 0
              ? 0
              : data["dbdata"]["qty"][i]; // Get QTY code
          htmlTr = "";
          htmlTr +=
            '<option value="' +
            itemName +
            '">QTY: ' +
            qty +
            ", HSN: " +
            hsn +
            "</option>";
          html = html + htmlTr;
        }
        $("#" + datalistId).html(html);

        // Attach event listener to stock name input field
        $('input[placeholder="PRODUCT NAME"]').on("change", function () {
          const selectedStockName = $(this).val();
          console.log(selectedStockName);
          console.log(data["dbdata"]["stock_items_name"]);
          //   const selectedIndex = data["dbdata"]["stock_items_name"].indexOf(selectedStockName);
          const selectedIndex = data["dbdata"]["stock_items_name"]
            .map((item) => item.toLowerCase()) // Convert all items to lowercase
            .indexOf(selectedStockName.toLowerCase()); // Convert search string to lowercase

          console.log(selectedIndex);
          if (selectedIndex !== -1) {
            const productId = data["dbdata"]["stock_items_id"][selectedIndex];
            const hsnCode = data["dbdata"]["stock_hsn_code"][selectedIndex];
            const gstRate = data["dbdata"]["gst_rate"][selectedIndex];
            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 1)
              .find('input[placeholder="STOCK ITEMS ID"]')
              .val(productId);
            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 2)
              .find('input[placeholder="CTH"]')
              .val(hsnCode);
            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 8)
              .find('input[placeholder="GST"]')
              .val(gstRate);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Calculte amount,subtotal,gst and total and call main function for all totals
calculateInvoiceTotal = () => {
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
  calculateInvoiceMainTotal();
};
calculateInvoiceMainTotal = () => {
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

  // Check if reverse charge is checked
  var reverseCharge = $("#reverse_charge").prop("checked");

  if (reverseCharge) {
    // If reverse charge is checked, set IGST, CGST, SGST, Tax Amount to 0
    totalIgst = 0;
    totalCgst = 0;
    totalSgst = 0;
    totalTaxAmount = 0;
    // Calculate total_amount_after_tax
    var totalAmountAfterTax = totalAmountBeforeTax;
    // Calculate Round Off
    var roundOff = Math.round(totalAmountAfterTax) - totalAmountAfterTax;
    // Calculate Grand Total
    var grandTotal = Math.round(totalAmountAfterTax);
    // Set GST on Reverse Charge to Grand Total
    $("#gst_on_reverse_charge").text(grandTotal.toFixed(2));
    // Set other fields to 0
    $("#total_igst").text("0.00");
    $("#total_cgst").text("0.00");
    $("#total_sgst").text("0.00");
    $("#total_tax_amount").text("0.00");
  } else {
    // Calculate Total IGST, CGST, SGST, and Tax Amount
    $("#invoiceItemDetailsTableTbody tr").each(function () {
      var igst =
        parseFloat($(this).find("input[placeholder='IGST']").val()) || 0;
      var cgst =
        parseFloat($(this).find("input[placeholder='CGST']").val()) || 0;
      var sgst =
        parseFloat($(this).find("input[placeholder='SGST']").val()) || 0;
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
  }

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

populateLastRowWithDataInvoice = (data, tableId, len, currentIndex) => {
  const lastRow = $("#invoiceItemDetailsTableTbody tr:last");
  const dataVal = data.invoice_item_details;

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
    addProductItemRow();
    populateLastRowWithDataInvoice(data, tableId, len, currentIndex);
  } else return;
};

/*
DOWNLOAD INVOICE ALSO A PDF
*/

downloadInvoice = (elem) => {
  // showLoader();
  base_url = "/api/invoice/download";
  formArray = [];
  formArray.push({ name: "invoice_details_id", value: elem });
  custom_ajax_iFunction(base_url, formArray)
    .then((data) => {
      console.log(data);
      if (data["status_type"] == "success") {
        var invoice_date = new Date(
          data["invoice"]["invoice_date"]
        ).toLocaleDateString("en-GB");
        var date_of_supply = new Date(
          data["invoice"]["date_of_supply"]
        ).toLocaleDateString("en-GB");
        var item_len = data["item"]["total"].length - 1;
        console.log(item_len);

        var invoice_download_HtmlTitle = `<h5 class="modal-title">Download Invoice</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
        var invoice_download_HtmlBody = `<div class="table-responsive w-50 text-center">
        <table class="table text-right">
          <tbody>
          <tr>
            <td>
            <div class="avatar-xl bg-cyan-lt" data-demo-color="" onclick="printPdf('invoice')">Print/Download Invoice</div>
          </td>
          </tr>
        </tbody></table>
        </div>
        <div id="main">
        <div class="card card-lg ">
            <div class="card-body p-3">
                <div class="row border-top border-bottom header__area">
                    <div class="col-4">
                        <img src="/static/logo.png" alt="logo" style="width: 100px;height: 100px;">
                    </div>
                    <div class="col-4 text-center w__40">
                        <h4 class="mb-1">${data["company"]["company_name"]}</h4>
                        <address class="fs-5 mb-1">
                        ${data["company"]["address1"]}, ${data["company"]["city"]}-${data["company"]["pincode"]}
                        </address>
                        <h5 class="mb-1">Tel: +91 ${data["company"]["phone"]}</h5>
                        <h5 class="mb-1">GSTIN: ${data["company"]["gstin"]}</h5>
                        <h5 class="mb-1">REGISTRATION: ${data["company"]["registration_no"]}</h5>

                    </div>
                    <div class="col-4">
                    </div>
                </div>
                <div class="row mb-0">
                    <div class="col-12 text-center h-1 border-bottom">

                    </div>
                    <div class="col-12 text-center border-bottom">
                        <h4 class="text-uppercase mb-0">tax invoice</h4>
                    </div>
                </div>
                <table
                    class="table table-transparent table-borderless border-bottom table-responsive invoice__details__table mb-0 fs__10">

                    <tr class="">
                        <td class="strong py-1">Invoice No: <span class="fw-bold">${data["invoice"]["invoice_no"]}</span>
                        </td>
                        <td class="text-start strong py-1">Transport Mode: <span
                                class="fw-bold">${data["invoice"]["invoice_date"]}</span></td>
                    </tr>
                    <tr>
                        <td class="strong py-1">Invoice Date: <span class="fw-bold">${invoice_date}</span>
                        </td>
                        <td class="text-start strong py-1">Vehicle Number: <span
                                class="fw-bold text-uppercase">${data["invoice"]["vehicle_no"]}</span></td>
                    </tr>
                    <tr>
                        <td class="strong py-1">Reverse Charge(Y/N): <span class="fw-bold"></span></td>
                        <td class="text-start strong py-1">Date of Supply: <span
                                class="fw-bold">${date_of_supply}</span></td>
                    </tr>
                    <tr>
                        <td class="strong py-1">State: <span class="fw-bold">WEST BENGAL(19)</span></td>
                        <td class="text-start strong py-1">Place of Supply: <span
                                class="fw-bold">${data["invoice"]["place_of_supply"]}</span></td>
                    </tr>

                </table>
                <div class="row mb-1 bill__ship__to__party">
                    <div class="col-12 text-center h-1 border-bottom">

                    </div>
                    <div class="col-6 text-center border-bottom">
                        <h5 class="text-capitalize mb-0">BILL TO PARTY</h5>
                    </div>
                    <div class="col-6 text-center border-bottom">
                        <h5 class="text-capitalize mb-0">SHIP TO PARTY</h5>
                    </div>
                    <div class="col-12 text-center border-bottom">
                        <div class="row">
                            <div class="col-6 left-table">
                                <table
                                    class="table table-transparent table-borderless border-bottom table-responsive mb-0 fs__10">

                                    <tr class="">
                                        <td class="strong py-1 text-start">Name: <span
                                                class="fw-bold text-uppercase">${data["invoice"]["creditor_name"]}</span></td>

                                    </tr>
                                    <tr>
                                        <td class="strong py-1 text-start">Address: <span
                                                class="fw-bold text-uppercase">${data["invoice"]["address"]}, ${data["invoice"]["city"]}, ${data["invoice"]["state_name"]}-${data["invoice"]["pincode"]}</span></td>

                                    </tr>
                                    <tr>
                                        <td class="strong py-1 text-start">GSTIN /PAN NO: <span
                                                class="fw-bold text-uppercase">${data["invoice"]["gstin"]}</span></td>

                                    </tr>
                                    <tr>
                                        <td class="strong py-1 text-start">State: <span
                                                class="fw-bold text-uppercase">${data["invoice"]["state_name"]}(${data["invoice"]["state_code_id"]})</span></td>
                                    </tr>

                                </table>
                            </div>
                            <div class="col-6 right-table">
                                <table
                                    class="table table-transparent table-borderless border-bottom table-responsive mb-0 fs__10">

                                    <tr class="">
                                        <td class="strong py-1 text-start">Name: <span
                                                class="fw-bold text-uppercase">${data["invoice"]["ship_to_party_name"]}</span></td>

                                    </tr>
                                    <tr>
                                        <td class="strong py-1 text-start">Address: <span
                                                class="fw-bold text-uppercase">${data["invoice"]["ship_to_party_address"]} ${data["invoice"]["ship_to_party_city"]} ${data["invoice"]["ship_to_party_state"]} ${data["invoice"]["ship_to_party_pincode"]}</span></td>

                                    </tr>
                                    <tr>
                                        <td class="strong py-1 text-start">GSTIN /PAN NO: <span
                                                class="fw-bold">${data["invoice"]["ship_to_party_gstin"]}</span></td>

                                    </tr>
                                    <tr>
                                        <td class="strong py-1 text-start">State: <span
                                                class="fw-bold">${data["invoice"]["ship_to_party_state"]}(${data["invoice"]["ship_to_party_state_code_id"]})</span></td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <table
                    class="table table-transparent table-borderless bg-none border-bottom table-responsive invoice__item__table mb-0 fs__10 fw-bold">
                    <thead>
                        <th>
                            S.No
                        </th>
                        <th>
                            PRODUCT DESC
                        </th>
                        <th>HSN CODE</th>
                        <th>QTY</th>
                        <th>UQC</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>discount</th>
                        <th>taxable value</th>
                        <th>gst(%)</th>
                        <th>igst</th>
                        <th>cgst</th>
                        <th>sgst</th>
                        <th>total</th>
                    </thead>
                    <tbody class="border-bottom">`;
        for (let i = 0; i < 21; i++) {
          console.log(data["item"]["invoice_item_details_id"][i]);
          if (
            typeof data["item"]["invoice_item_details_id"][i] !== "undefined" &&
            data["item"]["invoice_item_details_id"][i] !== "" &&
            data["item"]["invoice_item_details_id"][i] !== null
          ) {
            console.log(data["item"]["product_name"][i]);
            invoice_download_HtmlBody += `<tr class="text-center">
                                        <td class="py-1">${i + 1}</td>
                                        <td class="py-1 text-uppercase">${data["item"]["product_name"][i]}</td>
                                        <td class="py-1">${data["item"]["cth"][i]}</td>
                                        <td class="py-1">${data["item"]["qty"][i]}</td>
                                        <td class="py-1 text-uppercase">${data["item"]["uqc"][i]}</td>
                                        <td class="py-1">${data["item"]["rate"][i]}</td>
                                        <td class="py-1">${data["item"]["amount"][i]}</td>
                                        <td class="py-1">${data["item"]["discount"][i]}</td>
                                        <td class="py-1">${data["item"]["subtotal"][i]}</td>
                                        <td class="py-1">${data["item"]["gst"][i]}</td>
                                        <td class="py-1">${data["item"]["igst"][i]}</td>
                                        <td class="py-1">${data["item"]["cgst"][i]}</td>
                                        <td class="py-1">${data["item"]["sgst"][i]}</td>
                                        <td class="py-1">${data["item"]["total"][i]}</td>
                                    </tr>`;
          } else {
            invoice_download_HtmlBody += `<tr style="height:22px;">
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                        <td class="py-1"></td>
                                    </tr>`;
          }
        }

        invoice_download_HtmlBody += `
                    </tbody>
                    <tfoot>
                        <tr  class="text-center">
                        <td class="py-1"></td>
                        <td class="py-1"></td>
                        <td class="py-1"></td>
                        <td class="py-1">${data["item_sum"]["g_qty"][0]}</td>
                        <td class="py-1"></td>
                        <td class="py-1"></td>
                        <td class="py-1">${data["item_sum"]["g_amount"][0]}</td>
                        <td class="py-1"></td>
                        <td class="py-1">${data["item_sum"]["g_subtotal"][0]}</td>
                        <td class="py-1"></td>
                        <td class="py-1">${data["item_sum"]["g_igst"][0]}</td>
                        <td class="py-1">${data["item_sum"]["g_cgst"][0]}</td>
                        <td class="py-1">${data["item_sum"]["g_sgst"][0]}</td>
                        <td class="py-1">${data["item_sum"]["g_total"][0]}</td>
                        </tr>
                    </tfoot>



                </table>
                <div class="row mb-1 bank__and__totals">

                    <div class="col-12 text-center border-bottom fs__10">
                        <div class="row">
                            <div class="col-8 left-table">
                                <div class="card"></div>
                                <div class="card-body">
                                    <h5 class="text-green my-5 text-uppercase">${data["grand_total_word"]}</h5>
                                </div>
                                <table
                                    class="table table-transparent table-borderless border-bottom table-responsive mb-0">
                                    <tbody>
                                        <tr class=" border-bottom">
                                            <td class="strong py-1  text-start" colspan="2"></td>
                                        </tr>
                                        <tr class="">
                                            <td class="strong py-1  text-start">Bank Details: </td>
                                            <td class="fw-bold py-1 text-start">${data["bank"]["legal_name"]} (${data["bank"]["branch_name"]})</td>
                                        </tr>
                                        <tr class="">
                                            <td class="strong py-1  text-start">Bank A/C:
                                            </td>
                                            <td class="fw-bold py-1 text-start">${data["bank"]["ac_number"]}</td>

                                        </tr>
                                        <tr class="">
                                            <td class="strong py-1  text-start">Bank IFSC : </td>
                                            <td class="fw-bold py-1 text-start">${data["bank"]["ifsc_code"]}</td>


                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-4 right-table">
                                <table
                                    class="table table-transparent table-borderless border-bottom table-responsive mb-0">
                                    <tbody>

                                        <tr class="">
                                            <td class="strong py-1  text-end">Total Amount before Tax:
                                            </td>
                                            <td class="fw-bold py-1">${data["invoice"]["total_amount_before_tax"]}</td>

                                        </tr>
                                        <tr class="">
                                            <td class="strong py-1  text-end">TOTAL IGST: </td>
                                            <td class="fw-bold py-1">${data["invoice"]["total_igst"]}</td>
                                        </tr>
                                        <tr class="">
                                            <td class="strong py-1  text-end">TOTAL CGST: </td>
                                            <td class="fw-bold py-1">${data["invoice"]["total_cgst"]}</td>
                                        </tr>
                                        <tr class="">
                                            <td class="strong py-1  text-end">TOTAL SGST: </td>
                                            <td class="fw-bold py-1">${data["invoice"]["total_sgst"]}</td>
                                        </tr>

                                        <tr class="">
                                            <td class="strong py-1  text-end">Total Tax Amount: </td>
                                            <td class="fw-bold py-1">${data["invoice"]["total_tax_amount"]}</td>


                                        </tr>
                                        <tr class="">
                                            <td class="strong py-1  text-end">Total Amount after Tax:
                                            </td>
                                            <td class="fw-bold py-1">${data["invoice"]["total_amount_after_tax"]}</td>

                                        </tr>
                                        <tr class="">
                                            <td class="strong py-1  text-end">Round Off : </td>
                                            <td class="fw-bold py-1">${data["invoice"]["round_off"]}</td>


                                        </tr>
                                        <tr class="">
                                            <td class="strong py-1 text-red  text-end">Grand Total : </td>
                                            <td class="fw-bold text-red py-1">${data["invoice"]["grand_total"]}</td>


                                        </tr>
                                        <tr class="">
                                            <td class="strong py-1 text-end">GST on Reverse Charge :
                                            </td>
                                            <td class="fw-bold py-1">${data["invoice"]["gst_on_reverse_charge"]}</td>


                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row signature__area">
                    <div class="col-6 h-10">
                        <table class="table table-borderless fs__10 mb-0 fw-bold">
                            <tbody>
                                <tr>
                                    <td rowspan="3" class="text-center">Terms and Conditions</td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class="text-uppercase">All good are hypothecated to <span class="fw-bolder">HDFC BANK NETAJI NAGAR BRANCH</span>. PAYMENT MUST BE CLEARED WITH IN 20 DAYS FROM THE DATE OF INVOICE AS PER OUR BANK AGREEMENT .</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-6 h-10">
                        <table class="table table-borderless fs__10 mb-0 fw-bold">
                            <tbody>
                                <tr>
                                    <td rowspan="3" class="text-center">For ${data["company"]["company_name"]}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class="text-center">Authorised signatory</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        $("#fullWidthModalTitle").html(invoice_download_HtmlTitle);
        $("#fullWidthModalBody").html(invoice_download_HtmlBody);
      } else {
        $("#fullWidthModal").modal("toggle");
      }
      hideLoader();
    })
    .catch((err) => {
      console.log(err);
      hideLoader();
    });
};
