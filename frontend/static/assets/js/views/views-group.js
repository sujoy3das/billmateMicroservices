views_group_display = () => {
  var views_group_page_pretitle = "<p>View</p>";
  var views_group_page_title = "<p>Group</p>";
  var views_group_page_button = ` <div class="btn-list">
    <a href="javascript:;" class="btn  btn-outline-light d-none d-sm-inline-block" onclick="create_new_group();" data-bs-toggle="modal" data-bs-target="#mediumModal">
      <i class="ti ti-plus"></i>
      Create new Group
    </a>
    <a href="javascript:;" class="btn btn-outline-light d-sm-none btn-icon" aria-label="Create new group" onclick="create_new_group();" data-bs-toggle="modal" data-bs-target="#mediumModal">
      <i class="ti ti-plus"></i>
    </a>
  </div>`;
  var views_group_page_body = ` <div class="container-xl">
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
                                        Total Groups
                                    </div>
                                    <div class="text-muted" id="total_groups">
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
                                        Active Groups
                                    </div>
                                    <div class="text-muted" id="active_groups">
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
                                      New Groups
                                    </div>
                                    <div class="text-muted" id="new_groups">
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
                                    <div class="text-muted" id="balance">
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
                    <h3 class="card-title">All Groups</h3>
                </div>
                <div class="table-responsive p-1" style="min-height:500px">
                    <table class="table card-table text-nowrap" id="datatable_init">
                        <thead>
                            <tr>
                                <th class="w-2">SL.NO</th>
                                <th>Group Name</th>
                                <th>Parent Group</th>
                                <th>Group Balance</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="ledgergroup_display_table_body" class="text-uppercase">
                        </tbody>
                    </table>
                </div>
               
            </div>
        </div>
    </div>
  </div>`;
  $("#main-content .page-pretitle").empty().html(views_group_page_pretitle);
  $("#main-content .page-title").empty().html(views_group_page_title);
  $("#main-content .page-button").empty().html(views_group_page_button);
  $("#main-content .page-body").empty().html(views_group_page_body);

  refresh_ledger_group_display = () => {
    base_url = "/api/ledger_group/fetch";
    // Insert data to datatable ----->>
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        if (data["status_type"] == "success") {
          // Set summay dashboard
          let formattedSummary = {};
          data.summaryData.heading.forEach((key, index) => {
            formattedSummary[key] = parseInt(data.summaryData.count[index], 10); // Convert to int
          });
          $("#total_groups").text(formattedSummary.total_groups || 0);
          $("#active_groups").text(formattedSummary.active_groups || 0);
          $("#new_groups").text(formattedSummary.new_groups || 0);
          $("#balance").text(formattedSummary.balance || 0);
          // Set tableData
          html = "";

          for (i = 0; i < data["dbdata"]["ledger_group_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + "<tr>";
            htmlTr =
              htmlTr + '<td class="text-muted">' + slno.toString() + "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["ledger_group_name"][i] +
              "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["parent_group_name"][i] +
              "</td>";
            htmlTr = htmlTr + "<td>" + data["dbdata"]["balance"][i] + "</td>";
            htmlTr =
              htmlTr +
              `<td>
             <div class="btn-list flex-nowrap">
             <a href="javascript:;" onclick="update_group(` +
              data["dbdata"]["ledger_group_id"][i] +
              `)"  data-bs-toggle="modal" data-bs-target="#mediumModal" class="btn">
               Edit
             </a>
             
             </div>
         </td>`;
            htmlTr = htmlTr + "</tr>";

            html = html + htmlTr;
          } //end of for loop

          $("#datatable_init").DataTable();
          if ($.fn.DataTable.isDataTable("#datatable_init")) {
            $("#datatable_init").DataTable().clear().destroy();
            $("#ledgergroup_display_table_body").html(html);
            $("#datatable_init").DataTable({
              responsive: true,
            });
          } else {
            $("#ledgergroup_display_table_body").html(html);
            $("#datatable_init").DataTable({
              responsive: true,
            });
          }
        }
      })
      .catch((err) => {
        toaster(
          "error",
          "An unexpected error occurred. Please try again later."
        );
      })
      .finally(() => {
        hideLoader();
      });
  };
  refresh_ledger_group_display(); //this function for call from any where to refresh table
};

create_new_group = () => {
  var create_new_group_modal_title = `<h5 class="modal-title">Create New Group</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  var create_new_group_modal_body = `<form id="new_ledger_group_form">
  <div class="row">
  <div class="col-12">
      <div class="mb-1">
          <label class="form-label required">Group name</label>
          <input type="text" class="form-control text-capitalize" id="ledger_group_name"
              name="ledger_group_name" placeholder="Group Name" required>
      </div>
  </div>
  <div class="col-12">
      <div class="mb-1">
          <label class="form-label required">Parent Group</label>
          <input type="text" class="form-control text-capitalize" onchange="dynamicNatureGroup(this);" list="ledger_group_datalist" id="parent_ledger_group_id" name="parent_ledger_group_id" placeholder="Type to search..." required>
          <datalist id="ledger_group_datalist">

          </datalist>
      </div>
  </div>
  <div class="col-12">
      <div class="mb-1">
        <label class="form-label">Nature Group</label>
        <select class="form-select" placeholder="Select customer type" id="ledger_group_type_id" name="ledger_group_type_id">
          <option value="0" selected>Not Applicable</option>
        </select>
      </div>
    </div>
    </div></form>`;
  var create_new_group_modal_footer = `<a href="javascript:;" class="btn btn-link link-secondary" data-bs-dismiss="modal">Cancel</a>
  <button type="button" class="btn btn-outline-dark ms-auto" id="new_ledger_group_submit">Save Details</button>`;
  $("#mediumModalTitle").empty().html(create_new_group_modal_title);
  $("#mediumModalBody").empty().html(create_new_group_modal_body);
  $("#mediumModalFooter").empty().html(create_new_group_modal_footer);

  // Get all parent ledger group and put in a datalist ---->
  base_url = "/api/parent_ledger_group/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["ledger_group_name"].length; i++) {
          htmlTr = "";
          htmlTr =
            htmlTr +
            '<option value="' +
            data["dbdata"]["ledger_group_name"][i] +
            '"/>';
          html = html + htmlTr;
        }
        $("#ledger_group_datalist").html(html);
      }
    })
    .catch((err) => {
      toaster("error", "An unexpected error occurred. Please try again later.");
    });

  //   Save details
  $("#new_ledger_group_submit").click(function (event) {
    event.preventDefault();
    showLoader();
    const customer_formArray = $("#new_ledger_group_form").serializeArray();
    const validated = formValidate(customer_formArray);

    if (!validated) {
      return;
    }
    const base_url = "/api/ledger_group/add-new";
    custom_ajax_iFunction(base_url, customer_formArray)
      .then((data) => {
        if (data.status_type == "success") {
          refresh_ledger_group_display();
          toaster(data.status_type, data.status);
          $("#new_ledger_group_submit").attr("disabled", true);
        } else {
          toaster(data.status_type, data.status);
        }
      })
      .catch((err) => {
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

update_group = (passdata_ledger_group_id) => {
  var update_group_modal_title = `<h5 class="modal-title">Edit Group</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  var update_group_modal_body = `<form id="ledger_group_update_form">
  <div class="row">
  <div class="col-12">
      <div class="mb-1">
          <label class="form-label required">Group name</label>
          <input type="text" class="form-control text-capitalize" id="ledger_group_name"
              name="ledger_group_name" placeholder="Group Name" required>
      </div>
  </div>
  <div class="col-12">
      <div class="mb-1">
          <label class="form-label required">Parent Group</label>
          <input type="text" class="form-control text-capitalize" onchange="dynamicNatureGroup(this);" list="ledger_group_datalist" id="parent_ledger_group_id" name="parent_ledger_group_id" placeholder="Type to search..." required>
          <datalist id="ledger_group_datalist">

          </datalist>
      </div>
  </div>
  <div class="col-12">
      <div class="mb-1">
        <label class="form-label">Nature Group</label>
        <select class="form-select" placeholder="Select customer type" id="ledger_group_type_id" name="ledger_group_type_id">
          <option value="0" selected>Not Applicable</option>
        </select>
      </div>
    </div>
    </div></form>`;
  var update_group_modal_footer = `<a href="javascript:;" class="btn btn-link link-secondary" data-bs-dismiss="modal">Cancel</a>
    <button type="button" class="btn btn-outline-dark ms-auto" id="ledger_group_update">Update Details</button>`;
  $("#mediumModalTitle").empty().html(update_group_modal_title);
  $("#mediumModalBody").empty().html(update_group_modal_body);
  $("#mediumModalFooter").empty().html(update_group_modal_footer);

  // Get all parent group and put in a datalist ---->
  base_url = "/api/parent_ledger_group/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["ledger_group_name"].length; i++) {
          htmlTr = "";
          htmlTr =
            htmlTr +
            '<option value="' +
            data["dbdata"]["ledger_group_name"][i] +
            '"/>';
          html = html + htmlTr;
        }
        $("#ledger_group_datalist").html(html);
      }
    })
    .catch((err) => {
      toaster("error", "An unexpected error occurred. Please try again later.");
    });

  // Fetch data and insert for update --->>
  fetch_url = "/api/ledger_group/fetch/single";
  result = [{ name: "ledger_group_id", value: passdata_ledger_group_id }];
  showLoader();

  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      if (data["status_type"] == "success") {
        if (
          data["dbdata"]["parent_ledger_group_id"].toLowerCase() === "primary"
        ) {
          html = ` <option value="1">Assets</option>
                  <option value="2">Expenses</option>
                  <option value="3">Income</option>
                  <option value="4">Liabilities</option>`;
          $("#ledger_group_type_id").html(html);
        }
        refresh_form("#ledger_group_update_form", data["dbdata"], []); //Take main div id || data object || ignore cols
      } else {
        toaster(data.status, data.status_type);
      }
    })
    .catch((err) => {
      toaster("An unexpected error occurred. Please try again later.", "error");
    })
    .finally(() => {
      hideLoader();
    });

  // Update data onclick-->>
  $("#ledger_group_update").click(function (event) {
    event.preventDefault();
    const base_url = "/api/ledger_group/update";
    const formArray = $("#ledger_group_update_form").serializeArray();
    const res = formValidate(formArray);

    if (!res) {
      // If validation fails, exit the function early
      hideLoader();
      return;
    }

    showLoader();
    formArray.push({
      name: "ledger_group_id",
      value: passdata_ledger_group_id.toString(),
    });

    custom_ajax_iFunction(base_url, formArray)
      .then((data) => {
        if (data["status_type"] === "success") {
          refresh_ledger_group_display();
          toaster(data.status_type, data.status);
          $("#ledger_group_update").attr("disabled", true);
        } else {
          toaster(data.status_type, data.status);
        }
      })
      .catch((err) => {
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

// Dynamic change of nature group ------->>
dynamicNatureGroup = (el) => {
  var group = el.value.toLowerCase();
  if (group == "primary") {
    html = ` <option value="1" selected>Assets</option>
    <option value="2">Expenses</option>
    <option value="3">Income</option>
    <option value="4">Liabilities</option>`;
    $("#ledger_group_type_id").html(html);
  } else {
    html = ` <option value="0" selected>Not Applicable</option>`;
    $("#ledger_group_type_id").html(html);
  }
}; // oncange function dynamicNatureGroup
