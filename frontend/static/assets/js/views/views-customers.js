// Pending implement pagination and while update check state, city, pin is correctly placed

views_customers_display = () => {
  var views_customers_page_pretitle = "<p>View</p>";
  var views_customers_page_title = "<p>Customers</p>";
  var views_customers_page_button = ` <div class="btn-list">
  <a href="javascript:;" class="btn btn-outline-light d-none d-sm-inline-block" onclick="create_new_customer();">
    <i class="ti ti-plus"></i>
    Create new customer
  </a>
  <a href="javascript:;" class="btn btn-outline-light d-sm-none btn-icon" aria-label="Create new customer" onclick="create_new_customer();">
    <i class="ti ti-plus"></i>
  </a>
</div>`;
  var views_customers_page_body = ` <div class="container-xl">
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
                                  <div class="text-muted" id="total_ledger">
                                      0
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
                                  <div class="text-muted" id="active_ledger">
                                      0
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
                                  <div class="text-muted" id="new_ledger">
                                      0
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
                                  <div class="text-muted" id="closing_balance">
                                      0
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
                  <h3 class="card-title">All Customers</h3>
              </div>
              <div class="table-responsive p-1" style="min-height:500px">
                  <table class="table card-table text-nowrap" id="datatable_init">
                      <thead>
                          <tr>
                              <th class="w-2">SL.NO</th>
                              <th>Customer Name</th>
                              <th>City[State]</th>
                              <th>Balance</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody id="customer_display_table_body">
                        
                      </tbody>
                  </table>
              </div>
             
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle").empty().html(views_customers_page_pretitle);
  $("#main-content .page-title").empty().html(views_customers_page_title);
  $("#main-content .page-button").empty().html(views_customers_page_button);
  $("#main-content .page-body").empty().html(views_customers_page_body);

  // Refresh customer display--->.
  //   refresh_customer_display = () => {
  //     base_url = "/api/ledger/get-all-data";
  //     formArray = [];
  //     formArray.push({ name: "ledger_from", value: "1" });
  //     showLoader();
  //     custom_ajax_iFunction(base_url, formArray)
  //       .then((data) => {
  //         html = "";
  //         console.log(data);
  //         if (data["status_type"] == "success") {
  //           html = "";
  //           for (i = 0; i < data["dbdata"]["ledger_id"].length; i++) {
  //             var slno = i + 1;
  //             htmlTr = "";
  //             htmlTr = htmlTr + '<tr class="text-uppercase">';
  //             htmlTr =
  //               htmlTr + '<td class="text-muted">' + slno.toString() + "</td>";
  //             htmlTr =
  //               htmlTr + "<td>" + data["dbdata"]["ledger_name"][i] + "</td>";

  //             htmlTr =
  //               htmlTr + "<td>" + data["dbdata"]["legal_name"][i] + "</td>";
  //             htmlTr = htmlTr + "<td>" + data["dbdata"]["gstin"][i] + "</td>";
  //             htmlTr =
  //               htmlTr +
  //               '<td class="text-center">' +
  //               data["dbdata"]["opening_balance"][i] +
  //               "</td>";
  //             htmlTr =
  //               htmlTr +
  // `<td class="py-0">
  //               <div class="btn-list flex-nowrap">
  //               <div class="dropdown">
  //                 <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown">
  //                   Actions
  //                 </button>
  //                 <div class="dropdown-menu dropdown-menu-end">
  //                 <a class="dropdown-item" href="javascript:;" onclick="update_customer(` +
  //   data["dbdata"]["ledger_id"][i] +
  //   `);">
  //                 Edit
  //               </a>
  //                 <a class="dropdown-item" href="javascript:;">Downlaod</a></div></div></div></td>`;
  //             htmlTr = htmlTr + "</tr>";

  //             html = html + htmlTr;
  //           } //end of for loop
  //         } else {
  //           html = `<tr><td class="text-muted text-center" colspan="6">No data found,Create one.</td></tr>`;
  //         }
  //         $("#datatable_init").DataTable();
  //         if ($.fn.DataTable.isDataTable("#datatable_init")) {
  //           $("#datatable_init").DataTable().clear().destroy();
  //           $("#customer_display_table_body").html(html);
  //           $("#datatable_init").DataTable({
  //             responsive: true,
  //           });
  //         } else {
  //           $("#customer_display_table_body").html(html);
  //           $("#datatable_init").DataTable({
  //             responsive: true,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toaster(
  //           "error",
  //           "An unexpected error occurred. Please try again later."
  //         );
  //       })
  //       .finally(() => {
  //         hideLoader();
  //       });
  //   };

  // New init with pagination

  let searchTimeout; // Store timeout reference globally

  refresh_customer_display = () => {
    showLoader();
    const table = $("#datatable_init").DataTable({
      serverSide: true,
      processing: true,
      destroy: true, // Ensures old DataTable instance is removed before re-initializing
      ajax: function (data, callback) {
        let page = Math.floor(data.start / data.length) + 1;
        let pageSize = data.length;
        let searchQuery = data.search.value || ""; // Get the search input value

        // Debounce mechanism
        clearTimeout(searchTimeout); // Clear any previous search timeout
        searchTimeout = setTimeout(() => {
          $.ajax({
            url: "/api/ledger/get-all-data/new",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
              page: page,
              pageSize: pageSize,
              search: searchQuery,
              ledger_from: "1",
            }),
            success: function (response) {
              console.log("response of ledger api :", response);

              const summary = response.summaryData || {};

              // Ensure summary.heading and summary.no exist and are arrays
              if (Array.isArray(summary.heading) && Array.isArray(summary.no)) {
                // Convert summaryData into a proper dictionary
                const summaryDict = summary.heading.reduce(
                  (acc, key, index) => {
                    acc[key] = summary.no[index] || "0"; // Ensure value is set properly
                    return acc;
                  },
                  {}
                );

                // Update Summary Data on DOM
                $("#total_ledger").text(summaryDict.no || 0);
                $("#active_ledger").text(summaryDict.active || 0);
                $("#newly_ledger").text(summaryDict.new || 0);
                $("#closing_balance").text(summaryDict.balance || 0);
              } else {
                console.error("Invalid summary data format:", summary);
              }

              // Ensure response.dbdata exists and has valid arrays
              const isValidArray = (arr) =>
                Array.isArray(arr) && arr.length > 0;

              const dbdataArray = isValidArray(response.dbdata?.ledger_id)
                ? response.dbdata.ledger_id.map((_, index) => ({
                    customer_name: (
                      response.dbdata.ledger_name?.[index] || "-"
                    ).toUpperCase(),
                    city_state: (
                      response.dbdata.city_state?.[index] || "-"
                    ).toUpperCase(),
                    balance: "-",
                    ledger_id: response.dbdata.ledger_id?.[index], // Needed for action buttons
                  }))
                : []; // Return an empty array if no data is found

              callback({
                draw: data.draw,
                recordsTotal: response.countData?.total || 0, // Ensure it's a number
                recordsFiltered: response.countData?.filteredTotal || 0, // Ensure it's a number
                data: dbdataArray.map((item, index) => ({
                  sl: index + 1, // Avoid null values
                  ...item,
                  actions: item.ledger_id
                    ? `<td class="py-0">
                    <div class="btn-list flex-nowrap">
                    <div class="dropdown">
                      <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown">
                        Actions
                      </button>
                      <div class="dropdown-menu dropdown-menu-end">
                      <a class="dropdown-item" href="javascript:;" onclick="update_customer(${item.ledger_id})">
                      Edit
                    </a></div></div></div></td>`
                    : "-", // No actions if no valid docket_id
                })),
              });
            },
            error: function (xhr, status, error) {
              console.error("Error fetching data:", error);
            },
          });
        }, 500); // Delay search request by 500ms
      },
      columns: [
        { data: "sl" },
        { data: "customer_name" },
        { data: "city_state" },
        { data: "balance" },
        { data: "actions", orderable: false, searchable: false },
      ],
      pageLength: 20,
      lengthMenu: [
        [10, 20, 50],
        [10, 20, 50],
      ],
      order: [[1, "desc"]],
    });

    // Attach debounced search event listener
    $("#datatable_init_filter input")
      .off("keyup")
      .on("keyup", function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          table.search(this.value).draw();
        }, 500); // Wait 500ms before sending search request
      });
    hideLoader();
  };

  refresh_customer_display();
};

create_new_customer = () => {
  var create_new_customer_page_pretitle = "<p>Add new</p>";
  var create_new_customer_page_title = "<p>Customer</p>";
  var create_new_customer_page_body = ` <div class="container-xl">
  <div class="row row-deck row-cards">
      <div class="col-12">
          <form class="card" id="new_customer_form">
              <div class="card-body">
                  <div class="row row-cards">
                      <div class="col-md-6 left-form">
                          <div
                              style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                              <span
                                  style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                  Statutory Info
                              </span>
                          </div>
                          <div class="row row-cards">
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Customer Name</label>
                                      <input type="text" class="form-control text-uppercase"
                                          placeholder="Customer Name" id="ledger_name"
                                          name="ledger_name" required>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Legal Name</label>
                                      <input type="text" class="form-control text-uppercase" placeholder="Legal Name"
                                          id="legal_name" name="legal_name" required>
                                  </div>
                              </div>
                    
                              <div class="col-12">
                                <div class="mb-0">
                                  <label class="form-label">GSTIN</label>
                                  <input type="text" class="form-control text-uppercase" placeholder="GSTIN" maxlength="15"
                                      id="gstin" name="gstin" oninput="autoFillPan(this.value,'pan');">
                                </div>
                              </div>

                              <div class="form-group mb-2 col-12">
                              <label class="form-label">Registration Type</label>
                              <select name="registration_type" id="registration_type" class="form-select">
                                  <option value="0">Not Applicable</option>
                                  <option value="1">Registered</option>
                                  <option value="2">Unregistered</option>
                                  <option value="3">Unknown</option>
                              </select>
                            </div>

                            <div class="col-12 mb-2">
                                <div>
                                    <div class="form-label">Tax Applicability</div>
                                    <div>
                                        <label class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="gst_applicable" name="gst_applicable" value="1" />
                                            <span class="form-check-label">GST Applicable</span>
                                        </label>

                                        <label class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="tds_applicable" name="tds_applicable" value="1" />
                                            <span class="form-check-label">TDS Applicable</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="mb-0">
                                    <label class="form-label">PAN</label>
                                    <input type="text" class="form-control text-uppercase" placeholder="PAN"
                                        id="pan" name="pan" maxlength="10">
                                </div>
                            </div>
                            
                            <div class="form-group mb-2 col-6">
                                <label class="form-label">TAX Rate(%)</label>
                                <input type="number" class="rmvarrw form-control" value="0.00" name="tax_rate"
                                    id="tax_rate" placeholder="TAX Rate" disabled />
                            </div>
                            <div class="form-group mb-2 col-6">
                                <label class="form-label">TDS Rate(%)</label>
                                <input type="number" class="rmvarrw form-control" value="0.00" name="tds_rate"
                                    id="tds_rate" placeholder="TDS Rate" disabled />
                            </div>
                            
                              <div class="col-lg-6 col-md-12">
                                  <div class="mb-0">
                                      <label class="form-label">Opening Balance</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="00.00" id="opening_balance"
                                          name="opening_balance">
                                  </div>
                              </div>

                              <div class="col-lg-6 col-md-12">
                                  <div class="mb-0">
                                      <label class="form-label">Balance Type</label>
                                      <select class="form-control form-select" id="opening_balance_type"
                                          name="opening_balance_type">
                                          <option value="0" selected>Credit</option>
                                          <option value="1">Deibt</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="col-lg-6 col-md-12">
                                <label class="form-label required">Balance as on Date</label>
                                  <input type="date" class="form-control" name="balance_as_on_date"
                                  id="balance_as_on_date" placeholder="Balance as on Date" />
                            </div>
                          </div>
                      </div>
                      <div class="col-md-6 right-form">
                          <div
                              style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                              <span
                                  style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                  Address
                              </span>
                          </div>
                          <div class="row row-cards">
                              <div class="col-md-12">
                                  <div class="mb-0">
                                      <label class="form-label">Address</label>
                                      <textarea rows="2" class="form-control text-capitalize"
                                          placeholder="Address(City & State not here)"
                                          id="address" name="address"
                                          required></textarea>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">City</label>
                                      <input type="text" class="form-control text-uppercase" list="cityList"
                                          placeholder="City" id="city" name="city" onchange="manipulate__state__city__pin(
                                          'state',
                                          'city',
                                          'pincode',
                                          'cityList',
                                          'pincodeList',
                                          'city'
                                        );">
                                      <datalist id="cityList">
                                      </datalist>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Postal Code/Pin Code</label>
                                      <input type="text" class="form-control text-uppercase" list="pincodeList"
                                          placeholder="Zip Code" id="pincode" name="pincode">
                                      <datalist id="pincodeList">

                                      </datalist>
                                  </div>
                              </div>
                              <div class="col-12">
                                <div class="mb-0">
                                  <label class="form-label">Country</label>
                                  <select class="form-control form-select" id="country"
                                      name="country" onchange="changeState('country','state');">
                                      <option value="india">India</option>
                                      <option value="china">China</option>
                                    </select>
                                    </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">State/Province</label>
                                      <select class="form-control form-select" id="state"
                                          name="state" onchange="manipulate__state__city__pin(
                                            'state',
                                            'city',
                                            'pincode',
                                            'cityList',
                                            'pincodeList',
                                            'nop'
                                          );">
                                         
                                      </select>
                                  </div>
                              </div>
                              <div class="col-12">
                              <div class="mb-0">
                                  <label class="form-label">Email</label>
                                  <input type="email" class="form-control" placeholder="Email" id="email"
                                      name="email">
                              </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-0">
                                    <label class="form-label">Phone</label>
                                    <input type="tel" class="form-control" maxlength="12" placeholder="Phone"
                                        id="phone" name="phone">
                                </div>
                            </div>
                             
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center">
                <a href="javascript:;" class="btn-secondary text-red me-auto" onclick="views_customers_display();">Close</a>
                <button type="submit" class="btn btn-outline-dark" id="new_customer_submit">Save Details</button>
              </div>
          </form>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_customer_page_pretitle);
  $("#main-content .page-title").empty().html(create_new_customer_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(create_new_customer_page_body);

  changeState("country", "state");

  //   This is for gst_applicable and tds_applicable checking
  $('input[name="gst_applicable"]').change(function () {
    if ($(this).is(":checked")) {
      if ($("#gstin").val().trim() === "") {
        toaster(
          "warning",
          "Please enter GSTIN before marking GST as applicable."
        );
        $(this).prop("checked", false); // Uncheck the checkbox
      } else {
        $("#tax_rate").prop("disabled", false); // Enable the tax rate input
      }
    } else {
      $("#tax_rate").prop("disabled", true).val("0.00"); // Disable and reset the tax rate input
    }
  });

  $('input[name="tds_applicable"]').change(function () {
    if ($(this).is(":checked")) {
      // Check if PAN is provided
      if ($("#pan").val().trim() === "") {
        toaster(
          "warning",
          "Please enter PAN before marking TDS as applicable."
        );
        $(this).prop("checked", false); // Uncheck the checkbox
      } else {
        $("#tds_rate").prop("disabled", false); // Enable the TDS rate input
      }
    } else {
      $("#tds_rate").prop("disabled", true).val("0.00"); // Disable and reset the TDS rate input
    }
  });

  $("#new_customer_submit").click(function (event) {
    event.preventDefault();
    const customer_formArray = $("#new_customer_form").serializeArray();
    const validated = formValidate(customer_formArray);
    if (!validated) return;
    customer_formArray.push({ name: "ledger_from", value: "1" });
    customer_formArray.push({ name: "ledger_group_id", value: "customers" });
    console.log("Customer formarray :", customer_formArray);
    showLoader();
    const base_url = "/api/ledger/add-new";
    custom_ajax_iFunction(base_url, customer_formArray)
      .then((data) => {
        if (data.status_type == "success") {
          $("#new_customer_submit").attr("disabled", true);
          refresh_customer_display();
          toaster(data.status_type, data.status);
        } else {
          toaster(data.status_type, data.status);
        }
      })
      .catch((err) => {
        console.log(err);
        toaster(
          "error",
          "An unexpected error occurred. Please try again later."
        );
      })
      .finally(() => {
        hideLoader();
      });
  });
};

update_customer = (passdata_ledger_id) => {
  var update_customer_page_pretitle = "<p>Edit</p>";
  var update_customer_page_title = "<p>Customer</p>";
  var update_customer_page_body = ` <div class="container-xl">
  <div class="row row-deck row-cards">
      <div class="col-12">
          <form class="card" id="customer_update_form">
              <div class="card-body">
                  <div class="row row-cards">
                      <div class="col-md-6 left-form">
                          <div
                              style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                              <span
                                  style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                  Statutory Info
                              </span>
                          </div>
                          <div class="row row-cards">
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Customer Name</label>
                                      <input type="text" class="form-control text-uppercase"
                                          placeholder="Customer Name" id="ledger_name"
                                          name="ledger_name" required>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Legal Name</label>
                                      <input type="text" class="form-control text-uppercase" placeholder="Legal Name"
                                          id="legal_name" name="legal_name" required>
                                  </div>
                              </div>
                         
                              <div class="col-12">
                                <div class="mb-0">
                                    <label class="form-label">GSTIN</label>
                                    <input type="text" class="form-control text-uppercase" placeholder="GSTIN" maxlength="15"
                                        id="gstin" name="gstin" oninput="autoFillPan(this.value,'pan');">
                                </div>
                              </div>
                              <div class="form-group mb-2 col-12">
                              <label class="form-label">Registration Type</label>
                              <select name="registration_type" id="registration_type" class="form-select">
                                  <option value="0">Not Applicable</option>
                                  <option value="1">Registered</option>
                                  <option value="2">Unregistered</option>
                                  <option value="3">Unknown</option>
                              </select>
                            </div>
                            <div class="col-12 mb-2">
                                <div>
                                    <div class="form-label">Tax Applicability</div>
                                    <div>
                                        <label class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="gst_applicable" name="gst_applicable" value="1" />
                                            <span class="form-check-label">GST Applicable</span>
                                        </label>

                                        <label class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="tds_applicable" name="tds_applicable" value="1" />
                                            <span class="form-check-label">TDS Applicable</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-0">
                                    <label class="form-label">PAN</label>
                                    <input type="text" class="form-control text-uppercase" placeholder="PAN"
                                        id="pan" name="pan" maxlength="10">
                                </div>
                            </div>
                            <div class="form-group mb-2 col-6">
                                <label class="form-label">TAX Rate(%)</label>
                                <input type="number" class="rmvarrw form-control" value="0.00" name="tax_rate"
                                    id="tax_rate" placeholder="TAX Rate" disabled />
                            </div>
                            <div class="form-group mb-2 col-6">
                                <label class="form-label">TDS Rate(%)</label>
                                <input type="number" class="rmvarrw form-control" value="0.00" name="tds_rate"
                                    id="tds_rate" placeholder="TDS Rate" disabled />
                            </div>
                             
                              <div class="col-lg-6 col-md-12">
                                  <div class="mb-0">
                                      <label class="form-label">Opening Balance</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="00.00" id="opening_balance"
                                          name="opening_balance">
                                  </div>
                              </div>
                              <div class="col-lg-6 col-md-12">
                                  <div class="mb-0">
                                      <label class="form-label">Balance Type</label>
                                      <select class="form-control form-select" id="opening_balance_type"
                                          name="opening_balance_type">
                                          <option value="0" selected>Credit</option>
                                          <option value="1">Deibt</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="col-lg-6 col-md-12">
                                <label class="form-label required">Balance as on Date</label>
                                <input type="date" class="form-control" name="balance_as_on_date"
                                    id="balance_as_on_date" placeholder="Balance as on Date" />
                            </div>
                          </div>
                      </div>
                      <div class="col-md-6 right-form">
                          <div
                              style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                              <span
                                  style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                  Address
                              </span>
                          </div>
                          <div class="row row-cards">
                              <div class="col-md-12">
                                  <div class="mb-0">
                                      <label class="form-label">Address</label>
                                      <textarea rows="2" class="form-control text-capitalize"
                                          placeholder="Address(City & State not here)"
                                          id="address" name="address"
                                          required></textarea>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">City</label>
                                      <input type="text" class="form-control text-uppercase" list="cityList"
                                          placeholder="City" id="city" name="city" onchange="manipulate__state__city__pin(
                                          'state',
                                          'city',
                                          'pincode',
                                          'cityList',
                                          'pincodeList',
                                          'city'
                                        );">
                                      <datalist id="cityList">
                                      </datalist>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Postal Code/Pin Code</label>
                                      <input type="text" class="form-control text-uppercase" list="pincodeList"
                                          placeholder="Zip Code" id="pincode" name="pincode">
                                      <datalist id="pincodeList">

                                      </datalist>
                                  </div>
                              </div>
                              <div class="col-12">
                                <div class="mb-0">
                                  <label class="form-label">Country</label>
                                  <select class="form-control form-select" id="country"
                                      name="country" onchange="changeState('country','state');">
                                      <option value="india">India</option>
                                      <option value="china">China</option>
                                    </select>
                                    </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">State/Province</label>
                                      <select class="form-control form-select" id="state" name="state" onchange="manipulate__state__city__pin(
                                        'state',
                                        'city',
                                        'pincode',
                                        'cityList',
                                        'pincodeList',
                                        'nop'
                                      );" required>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-12">
                                <div class="mb-0">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" placeholder="Email" id="email"
                                        name="email">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Phone</label>
                                      <input type="tel" class="form-control" maxlength="12" placeholder="Phone"
                                          id="phone" name="phone">
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center">
                <a href="javascript:;" class="btn-secondary text-red me-auto" onclick="views_customers_display();">Close</a>
                <button type="submit" class="btn btn-outline-dark" id="customer_update_submit">Update Details</button>
              </div>
          </form>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle").empty().html(update_customer_page_pretitle);
  $("#main-content .page-title").empty().html(update_customer_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_customer_page_body);

  changeState("country", "state");

  //   This is for gst_applicable and tds_applicable checking
  $('input[name="gst_applicable"]').change(function () {
    if ($(this).is(":checked")) {
      if ($("#gstin").val().trim() === "") {
        toaster(
          "warning",
          "Please enter GSTIN before marking GST as applicable."
        );
        $(this).prop("checked", false); // Uncheck the checkbox
      } else {
        $("#tax_rate").prop("disabled", false); // Enable the tax rate input
      }
    } else {
      $("#tax_rate").prop("disabled", true).val("0.00"); // Disable and reset the tax rate input
    }
  });

  $('input[name="tds_applicable"]').change(function () {
    if ($(this).is(":checked")) {
      // Check if PAN is provided
      if ($("#pan").val().trim() === "") {
        toaster(
          "warning",
          "Please enter PAN before marking TDS as applicable."
        );
        $(this).prop("checked", false); // Uncheck the checkbox
      } else {
        $("#tds_rate").prop("disabled", false); // Enable the TDS rate input
      }
    } else {
      $("#tds_rate").prop("disabled", true).val("0.00"); // Disable and reset the TDS rate input
    }
  });

  // Fetch data and insert for update --->>
  fetch_url = "/api/ledger/get-single-data";
  result = [{ name: "ledger_id", value: passdata_ledger_id }];
  showLoader();
  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      // if (data["status_type"] == "success") {
      //   refresh_form("#customer_update_form", data["dbdata"], [
      //     "ledger_id",
      //     "ledger_group_id",
      //     "ledger_from",
      //     "beneficiary",
      //     "ac_number",
      //     "ifsc_code",
      //     "branch_name",
      //     "type",
      //     "created_by",
      //     "created_on",
      //     "updated_by",
      //     "updated_on",
      //   ]); //Take main div id || data object || ignore cols
      // } else {
      //   toaster(data.status, data.status_type);
      // }
      if (data["status_type"] === "success") {
        // Common fields to update
        const commonFields = [
          "ledger_name",
          "legal_name",
          "gstin",
          "registration_type",
          "pan",
          "tax_rate",
          "tds_rate",
          "opening_balance",
          "opening_balance_type",
          "balance_as_on_date",
          "address",
          "email",
          "phone",
        ];

        // Update common fields
        commonFields.forEach((field) => {
          $(`#${field}`).val(data.dbdata[field]);
        });

        // Checkbox handle
        if (data.dbdata.gst_applicable === "1") {
          $("#gst_applicable").prop("checked", true).change();
        }
        if (data.dbdata.tds_applicable === "1") {
          $("#tds_applicable").prop("checked", true).change();
        }

        // Update country and trigger change to update states
        $("#country").val(data.dbdata.country).trigger("change");

        // Ensure state is updated after country has been set
        setTimeout(() => {
          $("#state").val(data.dbdata.state).trigger("change");

          // Ensure city and pincode are updated after state has been set
          setTimeout(() => {
            $("#city").val(data.dbdata.city);
            $("#pincode").val(data.dbdata.pincode);
          }, 300); // Delay for city and pincode update
        }, 300); // Delay for state update
      }
    })
    .catch((err) => {
      console.log(err);
      toaster("error", "An unexpected error occurred. Please try again later.");
    })
    .finally(() => {
      hideLoader();
    });

  // Update ledger ------->>
  $("#customer_update_submit").click(function (event) {
    event.preventDefault();
    base_url = "/api/ledger/update";
    var formArray = $("#customer_update_form").serializeArray();
    var res = formValidate(formArray);
    if (!res) return;
    formArray.push({ name: "ledger_id", value: passdata_ledger_id });
    formArray.push({ name: "ledger_from", value: "1" });
    formArray.push({ name: "ledger_group_id", value: "customers" });
    showLoader();
    custom_ajax_iFunction(base_url, formArray)
      .then((data) => {
        if (data["status_type"] == "success") {
          $("#customer_update_submit").attr("disabled", true);
          refresh_customer_display();
          toaster(data.status_type, data.status);
        } else {
          toaster(data.status_type, data.status);
        }
      })
      .catch((err) => {
        console.log(err);
        toaster(
          "error",
          "An unexpected error occurred. Please try again later."
        );
      })
      .finally(() => {
        hideLoader();
      });
  }); //end onsubmit
};
