views_purchases_display = () => {
  var views_purchases_page_pretitle = "<p>View</p>";
  var views_purchases_page_title = "<p>Purchases</p>";
  var views_purchases_page_button = ` <div class="btn-list">
    <a href="javascript:;" class="btn btn-outline-light d-none d-sm-inline-block" onclick="create_new_purchases();">
      <i class="ti ti-plus"></i>
      Create new purchases
    </a>
    <a href="javascript:;" class="btn btn-outline-light d-sm-none btn-icon" aria-label="Create new purchase" onclick="create_new_purchases();">
      <i class="ti ti-plus"></i>
    </a>
  </div>`;
  var views_purchases_page_body = ` <div class="container-xl">
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
                    <h3 class="card-title">All Purchases</h3>
                </div>
                <div class="table-responsive p-1" style="min-height:500px">
                    <table class="table card-table text-nowrap " id="datatable_init">
                        <thead>
                            <tr>
                                <th class="w-2">SL.NO</th>
                                <th>Purchase Date</th>
                                <th>Creditor</th>
                                <th>City</th>
                                <th>GSTIN</th>
                                <th>Total Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="purchases_display_table_body">
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
  $("#main-content .page-pretitle").empty().html(views_purchases_page_pretitle);
  $("#main-content .page-title").empty().html(views_purchases_page_title);
  $("#main-content .page-button").empty().html(views_purchases_page_button);
  $("#main-content .page-body").empty().html(views_purchases_page_body);

  // Refresh customer display--->.
  refresh_purchases_display = () => {
    base_url = "/api/purchases/get-all-data";
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        html = "";
        if (data["status_type"] == "success") {
          html = "";
          for (i = 0; i < data["dbdata"]["purchase_details_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + '<tr class="text-uppercase">';
            htmlTr =
              htmlTr + '<td class="text-muted">' + slno.toString() + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["purchase_date"][i] + "</td>";

            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["creditor_name"][i] + "</td>";
            htmlTr = htmlTr + "<td>" + data["dbdata"]["city"][i] + "</td>";
            htmlTr = htmlTr + "<td>" + data["dbdata"]["gstin"][i] + "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-center">' +
              data["dbdata"]["total"][i] +
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
                  <a class="dropdown-item" href="javascript:;" onclick="update_purchases(` +
              data["dbdata"]["purchase_details_id"][i] +
              `);">
                  Edit
                </a>
                  <a class="dropdown-item" href="javascript:;">Downlaod</a></div></div></div></td>`;
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
          $("#purchases_display_table_body").html(html);
          $("#datatable_init").DataTable({
            responsive: true,
          });
        } else {
          $("#purchases_display_table_body").html(html);
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
  refresh_purchases_display();
};

//Do not change placeholder it's have dependency
create_new_purchases = () => {
  var create_new_purchases_page_pretitle = "<p>Add new</p>";
  var create_new_purchases_page_title = "<p>Purchase</p>";
  var create_new_purchases_page_body = ` <div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item">
                          <a href="#purchase_info_tab" class="nav-link active"
                              data-bs-toggle="tab">Purchase
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Creditor
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#consignment_info_tab" class="nav-link "
                              data-bs-toggle="tab">Consignment
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#additional_info_tab" class="nav-link" data-bs-toggle="tab">Others
                              Info</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#purchase_item_details_tab" class="nav-link " data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Purchase Item Details
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade active show" id="purchase_info_tab">
                          <h4>Purchase Info</h4>
                          <form id="purchase_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Purchase Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Purchase Id" id="purchase_details_id"
                                              name="purchase_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Purchase Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Purchase Date" id="purchase_date"
                                              name="purchase_date" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Purchase Account</label>
                                          <input type="text" class="form-control text-uppercase"
                                              list="datalistPurchaseAccount"
                                              placeholder="Purchase Account" id="purchase_account"
                                              name="purchase_account">
                                          <datalist id="datalistPurchaseAccount">
                                          </datalist>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-check mt-5">
                                              <input class="form-check-input" type="checkbox"
                                                  id="gst_applicable" name="gst_applicable" value="1"
                                                  onchange="handleGstApplicable()">
                                              <span class="form-check-label">GSTIN Applicable</span>
                                          </label>
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
                                          <label class="form-label ">Email</label>
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
                                          <label class="form-label">Supplier Invoice No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Supplier Invoice No"
                                              id="supplier_invoice_no" name="supplier_invoice_no">
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade " id="consignment_info_tab">
                          <h4>Consignment Info</h4>
                          <form id="receipt_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-12">
                                      <div class="mb-0">
                                          <label class="form-label">Receipt Note No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Receipt Note No" id="receipt_note_no"
                                              name="receipt_note_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Receipt Doc No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Receipt Doc No" id="receipt_doc_no"
                                              name="receipt_doc_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Receipt Doc Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Receipt Doc Date" id="receipt_date"
                                              name="receipt_date">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Dispatched Through</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Dispatched Through" id="dispatched_through"
                                              name="dispatched_through">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Destination</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Destination" id="destination"
                                              name="destination">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Carrier/Agent Name</label>
                                          <input type="text" class="form-control text-capitalize"
                                              placeholder="Carrier/Agent Name" id="carrier_name"
                                              name="carrier_name">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Motor Vehicle No</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Motor Vehicle No" id="vehicle_no"
                                              name="vehicle_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Bill of Landing/LR-RR No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Bill of Landing/LR-RR No" id="lr_rr_no"
                                              name="lr_rr_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Bill of Landing/LR-RR Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Bill of Landing/LR-RR Date" id="lr_rr_date"
                                              name="lr_rr_date">
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade" id="additional_info_tab">
                          <h4>Additional</h4>
                          <form id="additional_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Bill of Entry No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Bill of Entry No" id="bill_of_entry_no"
                                              name="bill_of_entry_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Bill of Entry Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Bill of Entry Date" id="bill_of_entry_date"
                                              name="bill_of_entry_date">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Port Code</label>
                                          <input type="text" class="form-control"
                                              placeholder="Port Code" id="port_code" name="port_code">
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade " id="purchase_item_details_tab">
                          <h4>Purchase Item Details</h4>
                          <div class="table-responsive mb-2" style="max-height: 260px;">
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
                                      <div class="card-header p-2">
                                          <h3 class="card-title">SUBTOTAL</h3>
                                          <input type="number" class="border-0 rmvarrw ms-auto"
                                              readonly id="subtotal" name="subtotal">
                                      </div>

                                      <div class="card-body p-0">
                                          <div class="table-responsive">
                                              <table class="table card-table table-bordered"
                                                  id="other_charges_details_table">
                                                  <thead>
                                                      <tr class="text-center">
                                                          <th class="w-1"></th>
                                                          <th>Ledger Name</th>
                                                          <th>Amount</th>
                                                          <th class="w-1"></th>
                                                      </tr>
                                                  </thead>
                                                  <tbody id="otherChargesDetailsTableTbody">
                                                      <tr>
                                                          <td class="ps-3"
                                                              onclick="addOtherChargesRow();"><i
                                                                  class="ti ti-plus tf"></i></td>
                                                          <td class="text-center"> <input type="text"
                                                                  class="border-0 text-capitalize"
                                                                  list="otherChargesDatalist1"
                                                                  id="other_charges_ledger_id"
                                                                  placeholder="Ledger Name" required>
                                                              <datalist id="otherChargesDatalist1">
                                                              </datalist>
                                                          </td>
                                                          <td class="text-end"><input type="number"
                                                                  class="border-0 rmvarrw"
                                                                  placeholder="Amount" required></td>
                                                          <td class="pe-3"></td>
                                                      </tr>
                                                  </tbody>
                                                  <tfoot class="fw-bolder">
                                                      <tr>
                                                          <td class="text-center" colspan="2">ROUNDOFF
                                                          </td>
                                                          <td class="text-end" colspan="2">
                                                              <input type="number"
                                                                  class="border-0 rmvarrw" readonly
                                                                  id="roundoff" name="roundoff">
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td class="text-center" colspan="2">TOTAL
                                                          </td>
                                                          <td class="text-end" colspan="2">
                                                              <input type="number"
                                                                  class="border-0 rmvarrw" readonly
                                                                  id="total" name="total">
                                                          </td>
                                                      </tr>
                                                  </tfoot>
                                              </table>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center py-2">
                  <a href="javascript:;" class="btn-secondary text-red me-auto"
                      onclick="views_purchases_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="new_purchase_submit">Save
                      Details</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_purchases_page_pretitle);
  $("#main-content .page-title").empty().html(create_new_purchases_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(create_new_purchases_page_body);
  //Fetch all credit list from ledger--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "customers",
    "0",
    "creditor_name",
    "creditor_details_form"
  );
  //Set current date for purchase date
  multi_fn_currentDate("purchase_date");
  //Mini function for fetch purchase account
  miniFetchPurchaseAccount("datalistPurchaseAccount");
  //Handle gst applicable checking
  handleGstApplicable();
  //Mini function for fetch stock items
  miniFetchStockItems("stockNameDatalist1");
  //Fetch other charges
  miniFetchOtherCharges("otherChargesDatalist1");

  //Calculate purchase item tables tfoot
  $("#purchaseDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='AMOUNT'],input[placeholder='QTY'],input[placeholder='PRICE'],input[placeholder='GST RATE']",
    function () {
      calculatePurchaseTotal();
      calculateFooterTotals(
        "purchaseDetailsTableTbody",
        ["QTY", "AMOUNT", "GST AMOUNT", "TOTAL PRICE"],
        [5, 8, 10, 11]
      );
    }
  );
  //Calculate purchase item tables tbody and other charges amount
  $("#otherChargesDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='Amount']",
    function () {
      calculatePurchaseTotal();
    }
  );

  //Make subtotal and total
  // Submit for add in database
  /*
    ##############CHECKING HERE IF OTHER CHARGES ARE VALID THEN GO TO DATABASE#####################
  
  */
  //  Submit function for insert data in DB
  $("#new_purchase_submit").click(function (event) {
    event.preventDefault();
    showLoader();
    // Serialize form data
    const creditor_formArray = $("#creditor_details_form").serializeArray();
    const purchase_formArray = $("#purchase_details_form").serializeArray();
    const receipt_formArray = $("#receipt_details_form").serializeArray();
    const additional_formArray = $("#additional_details_form").serializeArray();

    // Get table data
    const purchase_item_details_formarray = getTableDataAsArray(
      "purchase_item_details_table"
    );
    // Add extra data as roundoff
    var roundoffArr = [
      { name: "ledger_name", value: "roundoff" },
      { name: "amount", value: $("#roundoff").val() },
    ];
    const other_charges_formarray = [
      ...getTableDataAsArray("other_charges_details_table"),
      roundoffArr,
    ];

    // Combine form arrays into mainFormDataArray
    const mainFormDataArray = [
      ...creditor_formArray,
      ...purchase_formArray,
      ...receipt_formArray,
      ...additional_formArray,
    ];
    var allValidated = formValidate(mainFormDataArray);

    if (allValidated && purchase_item_details_formarray[0].stock_name != "") {
      const base_url = "/api/purchase/add-new";

      // Add subtotal, total, and roundoff directly into mainFormDataArray
      mainFormDataArray.push({ name: "subtotal", value: $("#subtotal").val() });
      mainFormDataArray.push({ name: "total", value: $("#total").val() });
      // Push table data into mainFormarray
      const mainFormarray = [
        { name: "main_form_data", value: mainFormDataArray },
        {
          name: "purchase_item_details_formarray",
          value: purchase_item_details_formarray,
        },
        { name: "other_charges_formarray", value: other_charges_formarray },
      ];

      custom_ajax_iFunction(base_url, mainFormarray)
        .then((data) => {
          if (data.status_type == "success") {
            refresh_purchases_display();
            toaster(data.status_type, data.status);
            $("#new_purchase_submit").attr("disabled", true);
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

update_purchases = (passdata_purchase_details_id) => {
  var update_purchases_page_pretitle = "<p>Edit</p>";
  var update_purchases_page_title = "<p>Purchase</p>";
  var update_purchases_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item">
                          <a href="#purchase_info_tab" class="nav-link active"
                              data-bs-toggle="tab">Purchase
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#creditor_info_tab" class="nav-link" data-bs-toggle="tab">Creditor
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#consignment_info_tab" class="nav-link "
                              data-bs-toggle="tab">Consignment
                              Info</a>
                      </li>
                      <li class="nav-item">
                          <a href="#additional_info_tab" class="nav-link" data-bs-toggle="tab">Others
                              Info</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#purchase_item_details_tab" class="nav-link " data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Purchase Item Details
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade active show" id="purchase_info_tab">
                          <h4>Purchase Info</h4>
                          <form id="purchase_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Purchase Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Purchase Id" id="purchase_details_id"
                                              name="purchase_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Purchase Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Purchase Date" id="purchase_date"
                                              name="purchase_date" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Purchase Account</label>
                                          <input type="text" class="form-control text-uppercase"
                                              list="datalistPurchaseAccount"
                                              placeholder="Purchase Account" id="purchase_account"
                                              name="purchase_account">
                                          <datalist id="datalistPurchaseAccount">
                                          </datalist>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-check mt-5">
                                              <input class="form-check-input" type="checkbox"
                                                  id="gst_applicable" name="gst_applicable" value="1"
                                                  onchange="handleGstApplicable()">
                                              <span class="form-check-label">GSTIN Applicable</span>
                                          </label>
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
                                                  id="creditor_name" name="creditor_name" required
                                                  readonly>
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
                                              required readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Email</label>
                                          <input type="email" class="form-control" placeholder="Email"
                                              id="email" name="email" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Contact No</label>
                                          <input type="tel" class="form-control"
                                              placeholder="Contact No" id="phone" name="phone"
                                              readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">City</label>
                                          <input type="text" class="form-control" placeholder="City"
                                              id="city" name="city" required readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Postal Code</label>
                                          <input type="text" class="form-control"
                                              placeholder="ZIP Code" id="pincode" name="pincode"
                                              required readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Country</label>
                                          <select class="form-control form-select" id="country"
                                              name="country" required onchange="changeState(this);"
                                              style="pointer-events: none;" onclick="return false;"
                                              onkeydown="return false;">
                                              <option value="india">India</option>
                                              <option value="china">China</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">State</label>
                                          <select class="form-control form-select" id="state"
                                              name="state" required style="pointer-events: none;"
                                              onclick="return false;" onkeydown="return false;">
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
                                              id="gstin" name="gstin" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Supplier Invoice No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Supplier Invoice No"
                                              id="supplier_invoice_no" name="supplier_invoice_no">
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade " id="consignment_info_tab">
                          <h4>Consignment Info</h4>
                          <form id="receipt_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-12">
                                      <div class="mb-0">
                                          <label class="form-label">Receipt Note No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Receipt Note No" id="receipt_note_no"
                                              name="receipt_note_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Receipt Doc No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Receipt Doc No" id="receipt_doc_no"
                                              name="receipt_doc_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Receipt Doc Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Receipt Doc Date" id="receipt_date"
                                              name="receipt_date">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Dispatched Through</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Dispatched Through" id="dispatched_through"
                                              name="dispatched_through">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Destination</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Destination" id="destination"
                                              name="destination">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Carrier/Agent Name</label>
                                          <input type="text" class="form-control text-capitalize"
                                              placeholder="Carrier/Agent Name" id="carrier_name"
                                              name="carrier_name">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Motor Vehicle No</label>
                                          <input type="text" class="form-control text-uppercase"
                                              placeholder="Motor Vehicle No" id="vehicle_no"
                                              name="vehicle_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Bill of Landing/LR-RR No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Bill of Landing/LR-RR No" id="lr_rr_no"
                                              name="lr_rr_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Bill of Landing/LR-RR Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Bill of Landing/LR-RR Date" id="lr_rr_date"
                                              name="lr_rr_date">
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade" id="additional_info_tab">
                          <h4>Additional</h4>
                          <form id="additional_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Bill of Entry No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Bill of Entry No" id="bill_of_entry_no"
                                              name="bill_of_entry_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Bill of Entry Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Bill of Entry Date" id="bill_of_entry_date"
                                              name="bill_of_entry_date">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Port Code</label>
                                          <input type="text" class="form-control"
                                              placeholder="Port Code" id="port_code" name="port_code">
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade " id="purchase_item_details_tab">
                          <h4>Purchase Item Details</h4>
                          <div class="table-responsive mb-2" style="max-height: 260px;">
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
                                      <div class="card-header p-2">
                                          <h3 class="card-title">SUBTOTAL</h3>
                                          <input type="number" class="border-0 rmvarrw ms-auto"
                                              readonly id="subtotal" name="subtotal">
                                      </div>

                                      <div class="card-body p-0">
                                          <div class="table-responsive">
                                              <table class="table card-table table-bordered"
                                                  id="other_charges_details_table">
                                                  <thead>
                                                      <tr class="text-center">
                                                          <th class="w-1"></th>
                                                          <th>Ledger Name</th>
                                                          <th>Amount</th>
                                                          <th class="w-1"></th>
                                                      </tr>
                                                  </thead>
                                                  <tbody id="otherChargesDetailsTableTbody">
                                                      <tr>
                                                          <td class="ps-3"
                                                              onclick="addOtherChargesRow();"><i
                                                                  class="ti ti-plus tf"></i></td>
                                                          <td class="text-center"> <input type="text"
                                                                  class="border-0 text-capitalize"
                                                                  list="otherChargesDatalist1"
                                                                  id="other_charges_ledger_id"
                                                                  placeholder="Ledger Name" required>
                                                              <datalist id="otherChargesDatalist1">
                                                              </datalist>
                                                          </td>
                                                          <td class="text-end"><input type="number"
                                                                  class="border-0 rmvarrw"
                                                                  placeholder="Amount" required></td>
                                                          <td class="pe-3"></td>
                                                      </tr>
                                                  </tbody>
                                                  <tfoot class="fw-bolder">
                                                      <tr>
                                                          <td class="text-center" colspan="2">ROUNDOFF
                                                          </td>
                                                          <td class="text-end" colspan="2">
                                                              <input type="number"
                                                                  class="border-0 rmvarrw" readonly
                                                                  id="roundoff" name="roundoff">
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td class="text-center" colspan="2">TOTAL
                                                          </td>
                                                          <td class="text-end" colspan="2">
                                                              <input type="number"
                                                                  class="border-0 rmvarrw" readonly
                                                                  id="total" name="total">
                                                          </td>
                                                      </tr>
                                                  </tfoot>
                                              </table>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center py-2">
                  <a href="javascript:;" class="btn-secondary text-red me-auto"
                      onclick="views_purchases_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="update_purchase_submit">Update
                      Details</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(update_purchases_page_pretitle);
  $("#main-content .page-title").empty().html(update_purchases_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_purchases_page_body);
  //Fetch all credit list--->>
  creditor_debtor_fetch(
    "creditorDatalist",
    "customers",
    "0",
    "creditor_name",
    "creditor_details_form"
  );
  //Set current date for purchase date
  multi_fn_currentDate("purchase_date");
  //Mini function for fetch purchase account
  miniFetchPurchaseAccount("datalistPurchaseAccount");
  //Handle gst applicable checking
  handleGstApplicable();
  //Mini function for fetch stock items
  miniFetchStockItems("stockNameDatalist1");
  //Fetch other charges
  miniFetchOtherCharges("otherChargesDatalist1");

  // Fetch single data for update***************>>
  fetch_url = "/api/purchases/get-single-data";
  result = [
    { name: "purchase_details_id", value: passdata_purchase_details_id },
  ];
  showLoader();
  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      if (data["status_type"] == "success") {
        refreshForm(
          "#creditor_details_form",
          data.purchase_details,
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
            "supplier_invoice_no",
            "purchase_details_id",
            "purchase_date",
            "purchase_account",
            "gst_applicable",
            "receipt_note_no",
            "receipt_doc_no",
            "receipt_date",
            "dispatched_through",
            "destination",
            "carrier_name",
            "vehicle_no",
            "lr_rr_no",
            "lr_rr_date",
            "bill_of_entry_no",
            "bill_of_entry_date",
            "port_code",
          ]
        );
        refreshForm(
          "#purchase_details_form",
          data.purchase_details,
          [],
          [
            "purchase_details_id",
            "purchase_date",
            "purchase_account",
            "gst_applicable",
          ]
        );
        refreshForm(
          "#receipt_details_form",
          data.purchase_details,
          [],
          [
            "receipt_note_no",
            "receipt_doc_no",
            "receipt_date",
            "dispatched_through",
            "destination",
            "carrier_name",
            "vehicle_no",
            "lr_rr_no",
            "lr_rr_date",
          ]
        );
        refreshForm(
          "#additional_details_form",
          data.purchase_details,
          [],
          ["bill_of_entry_no", "bill_of_entry_date", "port_code"]
        );
        setTimeout(() => {
          refreshForm(
            "#creditor_details_form",
            data.purchase_details,
            [],
            ["state"]
          );
        }, 1000);
        //Purchase table data
        var len_of_purchase_item_details =
          data.purchase_item_details.purchase_details_id.length;
        populateLastRowWithDataPurchase(
          data,
          "purchaseDetailsTableTbody",
          len_of_purchase_item_details,
          0
        );

        //Other charges table data
        var len_of_other_charges =
          data.purchase_item_other_charges.purchase_item_other_charges_id
            .length;
        populateLastRowWithDataPurchase(
          data,
          "otherChargesDetailsTableTbody",
          len_of_other_charges - 1,
          0
        );
        // Calculate footer total and subtotal
        // calculatePurchaseTotal();
        calculateMainTotal();
        calculateFooterTotals(
          "purchaseDetailsTableTbody",
          ["QTY", "AMOUNT", "GST AMOUNT", "TOTAL PRICE"],
          [5, 8, 10, 11]
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

  /*  Calculate purchase item tables tfoot
   Calculate main total amount-
   only hit when any input field is change
  */
  $("#purchaseDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='AMOUNT'],input[placeholder='QTY'],input[placeholder='PRICE'],input[placeholder='GST RATE']",
    function () {
      calculatePurchaseTotal();
      calculateFooterTotals(
        "purchaseDetailsTableTbody",
        ["QTY", "AMOUNT", "GST AMOUNT", "TOTAL PRICE"],
        [5, 8, 10, 11]
      );
    }
  );
  //Calculate purchase item tables tbody and other charges amount
  $("#otherChargesDetailsTableTbody").on(
    "input",
    "input[type='number'], input[placeholder='Amount']",
    function () {
      calculatePurchaseTotal();
    }
  );
  // Submit function for update data in DB------>>>
  $("#update_purchase_submit").click(function (event) {
    event.preventDefault();
    showLoader();
    // Serialize form data
    const creditor_formArray = $("#creditor_details_form").serializeArray();
    const purchase_formArray = $("#purchase_details_form").serializeArray();
    const receipt_formArray = $("#receipt_details_form").serializeArray();
    const additional_formArray = $("#additional_details_form").serializeArray();

    // Get table data
    const purchase_item_details_formarray = getTableDataAsArray(
      "purchase_item_details_table"
    );
    // Add extra data as roundoff
    var roundoffArr = [
      { name: "ledger_name", value: "roundoff" },
      { name: "amount", value: $("#roundoff").val() },
    ];
    const other_charges_formarray = [
      ...getTableDataAsArray("other_charges_details_table"),
      roundoffArr,
    ];

    // Combine form arrays into mainFormDataArray
    const mainFormDataArray = [
      ...creditor_formArray,
      ...purchase_formArray,
      ...receipt_formArray,
      ...additional_formArray,
    ];
    // Manually add the checkbox value if it's not included
    const gstApplicableChecked = $("#gst_applicable").prop("checked")
      ? "1"
      : "0";
    mainFormDataArray.push({
      name: "gst_applicable",
      value: gstApplicableChecked,
    });

    // Validate form data
    var allValidated = formValidate(mainFormDataArray);

    if (allValidated && purchase_item_details_formarray[0].stock_name != "") {
      const base_url = "/api/purchase/update";

      // Add subtotal, total, and roundoff directly into mainFormDataArray
      mainFormDataArray.push({ name: "subtotal", value: $("#subtotal").val() });
      mainFormDataArray.push({ name: "total", value: $("#total").val() });
      // Push table data into mainFormarray
      const mainFormarray = [
        { name: "main_form_data", value: mainFormDataArray },
        {
          name: "purchase_item_details_formarray",
          value: purchase_item_details_formarray,
        },
        { name: "other_charges_formarray", value: other_charges_formarray },
      ];

      custom_ajax_iFunction(base_url, mainFormarray)
        .then((data) => {
          if (data.status_type == "success") {
            refresh_purchases_display();
            toaster(data.status_type, data.status);
            $("#update_purchase_submit").attr("disabled", true);
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

// Some short functions----->>

/*---------------------------
addPurchaseItemRow,miniFetchPurchaseAccount,miniFetchStockItems
are connected
---------------------------*/
// Onclick + click add purchase item row
addPurchaseItemRow = () => {
  // Get the number of existing rows in the table
  const existingRowCount = $("#purchaseDetailsTableTbody tr").length;

  // Increment the serial number for the new row
  const newSerialNumber = existingRowCount + 1;

  const row = `<tr>
    <td class="ps-3" onclick="addPurchaseItemRow();"><i
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

    <td class="pe-3" onclick="remove_row_from_table(this, () => {
        calculateFooterTotals('purchaseDetailsTableTbody', ['QTY', 'AMOUNT', 'GST AMOUNT', 'TOTAL PRICE'], [5, 8, 10, 11]);
        calculatePurchaseTotal();
      });
      "><i class="ti ti-minus tf" ></i></td>

    </tr>`;

  $("#purchaseDetailsTableTbody").append(row);

  //  It will handle gst applicable  checking
  handleGstApplicable();

  //Mini function for fetch stock items
  miniFetchStockItems("stockNameDatalist" + newSerialNumber);
};

//This will handle gst rate,amount also its call from
//form load & checkbox change
handleGstApplicable = () => {
  //   Gst applicable checking -----start---->>
  const gstApplicable = $("#gst_applicable").prop("checked");

  // Find all rows in the purchase details table body
  $("#purchaseDetailsTableTbody tr").each(function () {
    // Find the GST rate and GST amount inputs within this row
    const gstRateInput = $(this).find('input[placeholder="GST RATE"]');
    const gstAmountInput = $(this).find('input[placeholder="GST AMOUNT"]');

    // Set readonly and clear values based on GST Applicable checkbox
    if (gstApplicable == true) {
      gstRateInput.prop("readonly", false);
      gstAmountInput.prop("readonly", false);
    } else {
      gstRateInput.prop("readonly", true).val("");
      gstAmountInput.prop("readonly", true).val("");
    }
  });
  //   Gst applicable checking -----start---->>
};

//For fetch purchase account
miniFetchPurchaseAccount = (datalistId) => {
  base_url = "/api/purchase/purchase_account/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["ledger_id"].length; i++) {
          const itemName = data["dbdata"]["ledger_name"][i].toUpperCase();
          htmlTr = "";
          htmlTr = htmlTr + '<option value="' + itemName + '"></option>';
          html = html + htmlTr;
        }
        $("#" + datalistId).html(html);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
//For fetch stock items

miniFetchStockItems = (datalistId) => {
  base_url = "/api/purchase/stock/stock-items/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["stock_items_id"].length; i++) {
          const itemName = data["dbdata"]["stock_items_name"][i].toUpperCase();
          const hsn = data["dbdata"]["stock_hsn_code"][i]; // Get HSN code
          htmlTr = "";
          htmlTr += '<option value="' + itemName + '">' + hsn + "</option>";
          html = html + htmlTr;
        }
        $("#" + datalistId).html(html);

        // Attach event listener to stock name input field
        $('input[placeholder="STOCK NAME"]').on("change", function () {
          const selectedStockName = $(this).val();
         
          const selectedIndex = data["dbdata"]["stock_items_name"]
            .map((item) => item.toLowerCase()) // Convert all items to lowercase
            .indexOf(selectedStockName.toLowerCase()); // Convert search string to lowercase

          if (selectedIndex !== -1) {
            const stkItmsId = data["dbdata"]["stock_items_id"][selectedIndex];
            const hsnCode = data["dbdata"]["stock_hsn_code"][selectedIndex];
            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 1)
              .find('input[placeholder="STOCK ITEMS ID"]')
              .val(stkItmsId);
            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 2)
              .find('input[placeholder="CTH"]')
              .val(hsnCode);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/*---------------------------
addOtherChargesRow,miniFetchOtherCharges
are connected
---------------------------*/
// Onclick + click add other charges row
addOtherChargesRow = () => {
  // Get the number of existing rows in the table
  const existingRowCount = $("#otherChargesDetailsTableTbody tr").length;

  // Increment the serial number for the new row
  const newSerialNumber = existingRowCount + 1;
  const row = `<tr>
    <td class="ps-3" onclick="addOtherChargesRow();"><i
            class="ti ti-plus tf"></i></td>
    <td class="text-center"> <input type="text"
            class="border-0 text-capitalize"
            list="otherChargesDatalist${newSerialNumber}"
            id="other_charges_ledger_id"
            name="other_charges_ledger_id"
            placeholder="Ledger Name"
            required>
        <datalist id="otherChargesDatalist${newSerialNumber}">
           
        </datalist>
    </td>
    <td class="text-end"><input type="number"
            class="border-0 rmvarrw"
            placeholder="Amount" required></td>
    <td class="pe-3" onclick="remove_row_from_table(this,calculateMainTotal)"><i class="ti ti-minus tf"></i></td>
  </tr>`;
  $("#otherChargesDetailsTableTbody").append(row);
  miniFetchOtherCharges("otherChargesDatalist" + newSerialNumber);
};

//For fetch other charges
miniFetchOtherCharges = (datalistId) => {
  base_url = "/api/purchase/other-charges/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["ledger_id"].length; i++) {
          const itemName = data["dbdata"]["ledger_name"][i].toUpperCase();
          htmlTr = "";
          htmlTr = htmlTr + '<option value="' + itemName + '"></option>';
          html = html + htmlTr;
        }
        $("#" + datalistId).html(html);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/*------------------------------------------
This function helps to add data in tables row 
also can add row according to data length
--------------------------------------------*/
populateLastRowWithDataPurchase = (data, tableId, len, currentIndex) => {
  if (tableId == "purchaseDetailsTableTbody") {
    const lastRow = $("#purchaseDetailsTableTbody tr:last");
    const dataVal = data.purchase_item_details;

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
    lastRow
      .find("input[placeholder='AMOUNT']")
      .val(dataVal.amount[currentIndex]);
    lastRow
      .find("input[placeholder='GST RATE']")
      .val(dataVal.gst_rate[currentIndex]);
    lastRow
      .find("input[placeholder='GST AMOUNT']")
      .val(dataVal.gst_amount[currentIndex]);
    lastRow
      .find("input[placeholder='TOTAL PRICE']")
      .val(dataVal.total_price[currentIndex]);
  } else {
    const lastRow = $("#otherChargesDetailsTableTbody tr:last");
    const dataVal = data.purchase_item_other_charges;
    const ledgerName = dataVal.ledger_name[currentIndex];
    const amount = dataVal.amount[currentIndex];

    if (ledgerName !== "roundoff") {
      lastRow.find("input[placeholder='Ledger Name']").val(ledgerName);
      lastRow.find("input[placeholder='Amount']").val(amount);
    } else {
      $("#roundoff").val(amount);
    }
  }
  currentIndex += 1;

  if (currentIndex < len) {
    if (tableId == "purchaseDetailsTableTbody") {
      addPurchaseItemRow();
    } else {
      addOtherChargesRow();
    }
    populateLastRowWithDataPurchase(data, tableId, len, currentIndex);
  } else return;
};

/*-------------CALCULATIONS--------------
This function call for when a number field is change then 
it calculate sum and place value in tables footer
---------------------------*/

// It only calculate amount,gst amount,total price and subtotal

/******If this function call calculateMainTotal() function will call auto**********/
calculatePurchaseTotal = () => {
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
  calculateMainTotal();
};

// It calculate sum(other charges), roundoff and grand total
calculateMainTotal = () => {
  var otherChargesTotal = 0;

  // Iterate through each row in the other charges table body
  $("#otherChargesDetailsTableTbody tr").each(function () {
    var amount =
      parseFloat($(this).find("input[placeholder='Amount']").val()) || 0;
    otherChargesTotal += isNaN(amount) ? 0 : amount;
  });

  // Update the round-off and total fields
  var subtotal = parseFloat($("#subtotal").val()) || 0;
  var roundoff =
    Math.round(subtotal + otherChargesTotal) - (subtotal + otherChargesTotal);
  var total = Math.round(subtotal + otherChargesTotal);
  // Update the round-off and total fields in the footer
  $("#roundoff").val(roundoff.toFixed(6));
  $("#total").val(total.toFixed(6));
};
