// Work on Tax applicability , tax and tds rate disable, bank details place in another place so can address show, while single data fetch its updating data late fix it

views_ledger_display = () => {
  var views_ledger_page_pretitle = "<p>View</p>";
  var views_ledger_page_title = "<p>Ledgers</p>";
  var views_ledger_page_button = ` <div class="btn-list">
  <a href="javascript:;" class="btn btn-outline-light d-none d-sm-inline-block" onclick="create_new_ledger();">
    <i class="ti ti-plus"></i>
    Create new ledger
  </a>
  <a href="javascript:;" class="btn btn-outline-light d-sm-none btn-icon" aria-label="Create new ledger" onclick="create_new_ledger();">
    <i class="ti ti-plus"></i>
  </a>
</div>`;
  var views_ledger_page_body = ` <div class="container-xl">
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
                                      Total Ledgers
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
                                      Active Ledgers
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
                                    New Ledgers
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
                                      0.00
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
                  <h3 class="card-title">All Ledgers</h3>
              </div>
              <div class="table-responsive p-1" style="min-height:500px">
                  <table class="table card-table text-nowrap" id="datatable_init">
                      <thead>
                          <tr>
                              <th class="w-2">SL.NO</th>
                              <th>Ledger Name</th>
                              <th>Ledger Group</th>
                              <th>Closing Balance</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody id="ledger_display_table_body" class="text-uppercase">
                         
                      </tbody>
                  </table>
              </div>
             
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle").empty().html(views_ledger_page_pretitle);
  $("#main-content .page-title").empty().html(views_ledger_page_title);
  $("#main-content .page-button").empty().html(views_ledger_page_button);
  $("#main-content .page-body").empty().html(views_ledger_page_body);

  // Refresh ledger display--->.
  // refresh_ledger_display = () => {
  //   base_url = "/api/ledger/get-all-data";
  //   formArray = [];
  //   formArray.push({ name: "ledger_from", value: "0" });
  //   showLoader();
  //   custom_ajax_iFunction(base_url, formArray)
  //     .then((data) => {
  //       console.log(data);
  //       html = "";
  //       if (data["status_type"] == "success") {
  //         for (i = 0; i < data["dbdata"]["ledger_id"].length; i++) {
  //           var slno = i + 1;
  //           htmlTr = "";
  //           htmlTr = htmlTr + "<tr>";
  //           htmlTr =
  //             htmlTr + '<td class="text-muted">' + slno.toString() + "</td>";
  //           htmlTr =
  //             htmlTr + "<td>" + data["dbdata"]["ledger_name"][i] + "</td>";
  //           htmlTr =
  //             htmlTr + "<td>" + data["dbdata"]["legal_name"][i] + "</td>";
  //           htmlTr =
  //             htmlTr +
  //             "<td>" +
  //             data["dbdata"]["ledger_group_name"][i] +
  //             "</td>";
  //           htmlTr = htmlTr + "<td>" + data["dbdata"]["gstin"][i] + "</td>";
  //           htmlTr =
  //             htmlTr +
  //             `<td><div class="btn-list flex-nowrap">
  //                <a href="javascript:;" onclick="update_ledger(` +
  //             data["dbdata"]["ledger_id"][i] +
  //             `)"  class="btn">
  //                  Edit
  //                </a>
  //                </div>
  //            </td>`;
  //           htmlTr = htmlTr + "</tr>";
  //           html = html + htmlTr;
  //         } //end of for loop
  //       } else {
  //         html = `<tr><td class="text-muted text-center" colspan="6">No data found,Create one.</td></tr>`;
  //       } //else end

  //       $("#ledger_display_table_body").html(html);

  //       if (data["status_type"] == "success") {
  //         $("#datatable_init").DataTable({
  //           responsive: true,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toaster(
  //         "error",
  //         "An unexpected error occurred. Please try again later."
  //       );
  //     })
  //     .finally(() => {
  //       hideLoader();
  //     });
  // };

  let searchTimeout; // Store timeout reference globally

  refresh_ledger_display = () => {
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
              ledger_from: "0",
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
                    ledger_name: (
                      response.dbdata.ledger_name?.[index] || "-"
                    ).toUpperCase(),
                    ledger_group: (
                      response.dbdata.ledger_group_name?.[index] || "-"
                    ).toUpperCase(),
                    balance: response.dbdata.balance?.[index] || "-",
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
                    ? `<td><div class="btn-list flex-nowrap">
                    <a href="javascript:;" onclick="update_ledger(${item.ledger_id})"  class="btn">
                      Edit
                    </a>
                    </div>
                </td> `
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
        { data: "ledger_name" },
        { data: "ledger_group" },
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
  refresh_ledger_display();
};

create_new_ledger = () => {
  var create_new_ledger_page_pretitle = "<p>Add new</p>";
  var create_new_ledger_page_title = "<p>Ledger</p>";
  var create_new_ledger_page_body = `<div class="container-xl">
  <div class="row row-deck row-cards">
      <div class="col-12">
          <form class="card" id="new_ledger_form">
              <div class="card-body">
                  <div class="row">
                      <div class="form-group mb-2 col-sm-12 col-md-6 col-lg-6">
                          <label class="form-label required">Ledger Name</label>
                          <input type="text" class="form-control text-uppercase" placeholder="Ledger Name"
                              id="ledger_name" name="ledger_name" required>
                      </div>
                      <div class="form-group mb-2 col-sm-12 col-md-6 col-lg-6">
                          <label class="form-label required">Legal Name</label>
                          <input type="text" class="form-control text-uppercase" placeholder="Legal Name"
                              id="legal_name" name="legal_name" required>
                      </div>
                  </div>

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
                                      <label class="form-label required">Ledger Group</label>
                                      <input type="text" class="form-control text-uppercase"
                                          list="datalistLedgerGroup" placeholder="Ledger Group" id="ledger_group_id"
                                          name="ledger_group_id" required
                                          onchange="bankInfoFields(this,'new_ledger_form');">
                                      <datalist id="datalistLedgerGroup">

                                      </datalist>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">GSTIN</label>
                                      <input type="text" class="form-control text-uppercase" placeholder="GSTIN"
                                          maxlength="15" id="gstin" name="gstin"
                                          oninput="autoFillPan(this.value,'pan');">
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
                              <div
                                  style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                                  <span
                                      style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                      Account Info
                                  </span>
                              </div>
                              <div class="col-lg-6 col-md-12">
                                  <div class="mb-0">
                                      <label class="form-label">Opening Balance</label>
                                      <input type="number" class="form-control rmvarrw" placeholder="00.00"
                                          id="opening_balance" name="opening_balance">
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
                                          placeholder="Address(City & State not here)" id="address"
                                          name="address"></textarea>
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
                                      <select class="form-control form-select" id="country" name="country"
                                          onchange="changeState('country','state');">
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

                          <div id="bankDetailsWrapper" style="display:none;">

                              <div
                                  style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                                  <span
                                      style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                      Bank Details
                                  </span>
                              </div>

                              <div class="row row-cards">
                                  <div class="col-12">
                                      <div class="mb-0">
                                          <label class="form-label required">Beneficiary(A/c Holder's name)</label>
                                          <input type="text" class="form-control text-uppercase" name="beneficiary"
                                              id="beneficiary" required placeholder="Beneficiary">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="mb-0">
                                          <label class="form-label required">A/c no</label>
                                          <input type="number" onKeyPress="if(this.value.length==18) return false;" class="rmvarrw form-control text-capitalize" name="ac_number"
                                              id="ac_number" required placeholder="Account Number">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="mb-0">
                                          <label class="form-label">IFSC Code</label>
                                          <input type="text" class="form-control text-uppercase" name="ifsc_code"
                                              id="ifsc_code" required placeholder="IFSC Code">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="mb-0">
                                          <label class="form-label">Branch Name</label>
                                          <input type="text" class="form-control text-capitalize" name="branch_name"
                                              id="branch_name" required placeholder="Branch Name">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="mb-0">
                                          <label class="form-label">Type</label>
                                          <select type="text" class="form-select" placeholder="Select Bank Type"
                                              id="type" name="type">
                                              <option value="Primary">Primary</option>
                                              <option value="Secondary">Secondary</option>
                                              <option value="Others">Others</option>
                                          </select>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center">
                  <a href="javascript:;" class="btn-secondary text-red me-auto"
                      onclick="views_ledger_display();">Close</a>
                  <button type="submit" class="btn btn-outline-dark" id="new_ledger_submit">Save Details</button>
              </div>
          </form>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_ledger_page_pretitle);
  $("#main-content .page-title").empty().html(create_new_ledger_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(create_new_ledger_page_body);
  // Fetch all ledger group-->>
  allLedgerGroupFetch("datalistLedgerGroup", "ledger_group_id");
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

  $("#new_ledger_submit").click(function (event) {
    event.preventDefault();
    const ledger_formArray = $("#new_ledger_form").serializeArray();
    const ledger_gp_id = $("#ledger_group_id").val();
    let filteredFormData = ledger_formArray;
    //We've modified the condition for groups without addresses so they can be added.
    if (ledger_gp_id.toLowerCase() === "customers") {
      toaster("warning", "Customer can not be created from here.");
      return;
    } else if (ledger_gp_id.toLowerCase() !== "bank accounts") {
      const namesToRemove = [
        "beneficiary",
        "ac_number",
        "ifsc_code",
        "branch_name",
        "type",
      ];

      filteredFormData = ledger_formArray.reduce((acc, item) => {
        if (!namesToRemove.includes(item.name)) {
          acc.push(item);
        }
        return acc;
      }, []);
    }
    const validated = formValidate(filteredFormData);

    if (!validated) {
      toaster("warning", "Please fill all the required fields.");
      return;
    }
    showLoader();
    //Add ledger_from 0=ledger || 1=customer
    filteredFormData.push({ name: "ledger_from", value: "0" });
    const base_url = "/api/ledger/add-new";

    custom_ajax_iFunction(base_url, filteredFormData)
      .then((data) => {
        if (data.status_type == "success") {
          refresh_ledger_display();
          toaster(data.status_type, data.status);
          $("#new_ledger_submit").attr("disabled", true);
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

update_ledger = (passdata_ledger_id) => {
  var update_ledger_page_pretitle = "<p>Edit</p>";
  var update_ledger_page_title = "<p>Ledger</p>";
  var update_ledger_page_body = `<div class="container-xl">
     <div class="row row-deck row-cards">
      <div class="col-12">
          <form class="card" id="ledger_update_form">
              <div class="card-body">
                  <div class="row">
                      <div class="form-group mb-2 col-sm-12 col-md-6 col-lg-6">
                          <label class="form-label required">Ledger Name</label>
                          <input type="text" class="form-control text-uppercase" placeholder="Ledger Name"
                              id="ledger_name" name="ledger_name" required>
                      </div>
                      <div class="form-group mb-2 col-sm-12 col-md-6 col-lg-6">
                          <label class="form-label required">Legal Name</label>
                          <input type="text" class="form-control text-uppercase" placeholder="Legal Name"
                              id="legal_name" name="legal_name" required>
                      </div>
                  </div>

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
                                      <label class="form-label required">Ledger Group</label>
                                      <input type="text" class="form-control text-uppercase"
                                          list="datalistLedgerGroup" placeholder="Ledger Group" id="ledger_group_id"
                                          name="ledger_group_id" required
                                          onchange="bankInfoFields(this,'new_ledger_form');">
                                      <datalist id="datalistLedgerGroup">

                                      </datalist>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">GSTIN</label>
                                      <input type="text" class="form-control text-uppercase" placeholder="GSTIN"
                                          maxlength="15" id="gstin" name="gstin"
                                          oninput="autoFillPan(this.value,'pan');">
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
                              <div
                                  style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                                  <span
                                      style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                      Account Info
                                  </span>
                              </div>
                              <div class="col-lg-6 col-md-12">
                                  <div class="mb-0">
                                      <label class="form-label">Opening Balance</label>
                                      <input type="number" class="form-control rmvarrw" placeholder="00.00"
                                          id="opening_balance" name="opening_balance">
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
                                          placeholder="Address(City & State not here)" id="address"
                                          name="address"></textarea>
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
                                      <select class="form-control form-select" id="country" name="country"
                                          onchange="changeState('country','state');">
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

                          <div id="bankDetailsWrapper" style="display:none;">

                              <div
                                  style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                                  <span
                                      style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                      Bank Details
                                  </span>
                              </div>

                              <div class="row row-cards">
                                  <div class="col-12">
                                      <div class="mb-0">
                                          <label class="form-label required">Beneficiary(A/c Holder's name)</label>
                                          <input type="text" class="form-control text-uppercase" name="beneficiary"
                                              id="beneficiary" required placeholder="Beneficiary">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="mb-0">
                                          <label class="form-label required">A/c no</label>
                                          <input type="number" onKeyPress="if(this.value.length==18) return false;"  class="rmvarrw form-control text-capitalize" name="ac_number"
                                              id="ac_number" required placeholder="Account Number">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="mb-0">
                                          <label class="form-label">IFSC Code</label>
                                          <input type="text" class="form-control text-uppercase" name="ifsc_code"
                                              id="ifsc_code" required placeholder="IFSC Code">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="mb-0">
                                          <label class="form-label">Branch Name</label>
                                          <input type="text" class="form-control text-capitalize" name="branch_name"
                                              id="branch_name" required placeholder="Branch Name">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="mb-0">
                                          <label class="form-label">Type</label>
                                          <select type="text" class="form-select" placeholder="Select Bank Type"
                                              id="type" name="type">
                                              <option value="Primary">Primary</option>
                                              <option value="Secondary">Secondary</option>
                                              <option value="Others">Others</option>
                                          </select>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center">
                  <a href="javascript:;" class="btn-secondary text-red me-auto"
                      onclick="views_ledger_display();">Close</a>
                  <button type="submit" class="btn btn-outline-dark" id="ledger_update">Update Details</button>
              </div>
          </form>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle").empty().html(update_ledger_page_pretitle);
  $("#main-content .page-title").empty().html(update_ledger_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_ledger_page_body);

  //   This is for gst_applicable and tds_applicable checking
  $('input[name="gst_applicable"]').change(function () {
    if ($(this).is(":checked")) {
      // Check if GSTIN is provided
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

  // Fetch all ledger group-->>
  allLedgerGroupFetch("datalistLedgerGroup", "ledger_group_id");
  changeState("country", "state");

  // Fetch data and insert for update --->>
  fetch_url = "/api/ledger/get-single-data";
  result = [{ name: "ledger_id", value: passdata_ledger_id }];
  showLoader();
  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      if (data["status_type"] === "success") {
        $("#ledger_group_id")
          .val(data.dbdata.ledger_group_name)
          .trigger("change");

        // Check if the ledger group is a bank account
        const isBankAccount =
          data.dbdata.ledger_group_name.toLowerCase() === "bank accounts";

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

            // If it's a bank account, update bank-specific fields
            if (isBankAccount) {
              $("#beneficiary").val(data.dbdata.beneficiary);
              $("#ac_number").val(data.dbdata.ac_number);
              $("#ifsc_code").val(data.dbdata.ifsc_code);
              $("#branch_name").val(data.dbdata.branch_name);
              $("#type").val(data.dbdata.type);
            }
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
  $("#ledger_update").click(function (event) {
    event.preventDefault();
    base_url = "/api/ledger/update";
    var ledger_formArray = $("#ledger_update_form").serializeArray();
    const ledger_gp_id = $("#ledger_group_id").val();
    let filteredFormData = ledger_formArray;
    //We've modified the condition for groups without addresses so they can be added.
    if (ledger_gp_id.toLowerCase() === "customers") {
      toaster("warning", "Customer can not be created from here.");
      return;
    } else if (ledger_gp_id.toLowerCase() !== "bank accounts") {
      const namesToRemove = [
        "beneficiary",
        "ac_number",
        "ifsc_code",
        "branch_name",
        "type",
      ];

      filteredFormData = ledger_formArray.reduce((acc, item) => {
        if (!namesToRemove.includes(item.name)) {
          acc.push(item);
        }
        return acc;
      }, []);
    }
    const validated = formValidate(filteredFormData);

    if (!validated) {
      toaster("warning", "Please fill all the required fields.");
      return;
    }
    showLoader();
    //Add ledger_from 0=ledger || 1=customer
    filteredFormData.push({ name: "ledger_id", value: passdata_ledger_id });
    filteredFormData.push({ name: "ledger_from", value: "0" });
    custom_ajax_iFunction(base_url, filteredFormData)
      .then((data) => {
        if (data["status_type"] == "success") {
          $("#ledger_update").attr("disabled", true);
          refresh_ledger_display();
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

// Small functions==========>>

bankInfoFields = (elem, table) => {
  //   New logic
  var ledger_group = $(elem).val().toLowerCase();
  console.log(ledger_group);
  if (ledger_group === "bank accounts") {
    var displayProperty = $("#bankDetailsWrapper").css("display");
    console.log(displayProperty);
    if (displayProperty === "none") {
      $("#bankDetailsWrapper").css("display", "");
    }
  } else $("#bankDetailsWrapper").css("display", "none");
};
