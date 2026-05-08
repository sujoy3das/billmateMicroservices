views_state_display = () => {
  var views_state_page_pretitle = "<p>View</p>";
  var views_state_page_title = "<p>States</p>";
  var views_state_page_button = ` <div class="btn-list">
      <a href="javascript:;" class="btn btn-primary d-none d-sm-inline-block" onclick="create_new_state();" data-bs-toggle="modal" data-bs-target="#mediumModal">
        <i class="ti ti-plus"></i>
        Create new State
      </a>
      <a href="javascript:;" class="btn btn-primary d-sm-none btn-icon" aria-label="Create new state" onclick="create_new_state();" data-bs-toggle="modal" data-bs-target="#mediumModal">
        <i class="ti ti-plus"></i>
      </a>
    </div>`;
  var views_state_page_body = ` <div class="container-xl">
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
                                          Active Groups
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
                                        New Groups
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
                      <h3 class="card-title">All States</h3>
                  </div>
                  <div class="table-responsive p-1" style="min-height:500px">
                      <table class="table card-table text-nowrap" id="datatable_init">
                          <thead>
                              <tr>
                                  <th class="w-2">SL.NO/ID</th>
                                  <th>State Name</th>
                                  <th>State Code</th>
                                  <th>State Code Id</th>
                                  <th>Country</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody id="state_display_table_body" class="text-uppercase">
                          </tbody>
                      </table>
                  </div>
                 
              </div>
          </div>
      </div>
    </div>`;
  $("#main-content .page-pretitle").empty().html(views_state_page_pretitle);
  $("#main-content .page-title").empty().html(views_state_page_title);
  $("#main-content .page-button").empty().html(views_state_page_button);
  $("#main-content .page-body").empty().html(views_state_page_body);

  refresh_state_display = () => {
    base_url = "/api/state/fetch";
    // Insert data to datatable ----->>
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        if (data["status_type"] == "success") {
          console.log(data, " dbbbbb");
          // console.log(data["dbdata"]["ledger_group_id"].length)
          // console.log(key.length,value);
          html = "";

          for (i = 0; i < data["dbdata"]["state_id"].length; i++) {
            htmlTr = "";
            htmlTr = htmlTr + '<tr class="text-uppercase">';
            htmlTr = htmlTr + '<td class="text-muted">' + data["dbdata"]["state_id"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["state_name"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["state_code"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["state_code_id"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["country"][i] + "</td>";
            htmlTr =
              htmlTr +
              `<td>
               <div class="btn-list flex-nowrap">
               <a href="javascript:;" onclick="update_state(` +
              data["dbdata"]["state_id"][i] +
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
            $("#state_display_table_body").html(html);
            $("#datatable_init").DataTable({
              responsive: true,
            });
          } else {
            $("#state_display_table_body").html(html);
            $("#datatable_init").DataTable({
              responsive: true,
            });
          }
        }
        hideLoader();
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
      }); //end custom_ajax_gFunction
  };
  refresh_state_display(); //this function for call from any where to refresh table
};

create_new_state = () => {
  var create_new_state_modal_title = `<h5 class="modal-title">Create New State</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  var create_new_state_modal_body = `<form id="new_state_form">
    <div class="row">
        <div class="col-12">
            <div class="mb-0">
                <label class="form-label">Country</label>
                <select class="form-control form-select" id="country" name="country">
                    <option value="india">India</option>
                    <option value="china">China</option>
                </select>
            </div>
        </div>
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">State Name</label>
            <input type="text" class="form-control text-capitalize" id="state_name"
                name="state_name" placeholder="State Name" required>
        </div>
    </div>
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">State Code</label>
            <input type="text" class="form-control text-capitalize" id="state_code"
                name="state_code" placeholder="State Code" required>
        </div>
    </div>
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">State Code Id</label>
            <input type="number" class="form-control text-capitalize rmvarrw" id="state_code_id"
                name="state_code_id" placeholder="State Code Id">
        </div>
    </div></div></form>`;
  var create_new_state_modal_footer = `<a href="javascript:;" class="btn btn-link link-secondary" data-bs-dismiss="modal">Cancel</a>
      <a href="javascript:;" class="btn btn-primary ms-auto"  id="new_state_submit">Save Details</a>`;
  $("#mediumModalTitle").empty().html(create_new_state_modal_title);
  $("#mediumModalBody").empty().html(create_new_state_modal_body);
  $("#mediumModalFooter").empty().html(create_new_state_modal_footer);

  //   Save details
  $("#new_state_submit").click(function (event) {
    event.preventDefault();
    showLoader();
    const customer_formArray = $("#new_state_form").serializeArray();
    console.log(customer_formArray);
    const validated = formValidate(customer_formArray);

    if (validated) {
      const base_url = "/api/state/add-new";

      custom_ajax_iFunction(base_url, customer_formArray)
        .then((data) => {
          if (data.status_type == "success") {
            refresh_state_display();
            hideLoader();
            toaster(data.status_type, data.status);
            $("#new_state_submit").attr("disabled", true);
          } else {
            hideLoader();
            toaster(data.status_type, data.status);
          }
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

update_state = (passdata_state_id) => {
  var update_state_modal_title = `<h5 class="modal-title">Edit Group</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  var update_state_modal_body = `<form id="state_update_form">
    <div class="row">
        <div class="col-12">
            <div class="mb-0">
                <label class="form-label">Country</label>
                <select class="form-control form-select" id="country" name="country">
                    <option value="india">India</option>
                    <option value="china">China</option>
                </select>
            </div>
        </div>
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">State Name</label>
            <input type="text" class="form-control text-capitalize" id="state_name"
                name="state_name" placeholder="State Name" required>
        </div>
    </div>
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">State Code</label>
            <input type="text" class="form-control text-capitalize" id="state_code"
                name="state_code" placeholder="State Code" required>
        </div>
    </div>
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">State Code Id</label>
            <input type="number" class="form-control text-capitalize rmvarrw" id="state_code_id"
                name="state_code_id" placeholder="State Code Id">
        </div>
    </div></div></form>`;
  var update_state_modal_footer = `<a href="javascript:;" class="btn btn-link link-secondary" data-bs-dismiss="modal">Cancel</a>
      <a href="javascript:;" class="btn btn-primary ms-auto"  id="state_update">Update Details</a>`;
  $("#mediumModalTitle").empty().html(update_state_modal_title);
  $("#mediumModalBody").empty().html(update_state_modal_body);
  $("#mediumModalFooter").empty().html(update_state_modal_footer);

  // Fetch data and insert for update --->>
  fetch_url = "/api/state/fetch/single";
  result = [{ name: "state_id", value: passdata_state_id }];
  showLoader();

  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      if (data["status_type"] == "success") {
        refresh_form("#state_update_form", data["dbdata"], ["state_id"]); //Take main div id || data object || ignore cols
      } else {
        toaster(data.status, data.status_type);
      }
      hideLoader();
    })
    .catch((err) => {
      console.log(err);
      hideLoader();
    });

  // Update data onclick-->>
  $("#state_update").click(function (event) {
    event.preventDefault();
    base_url = "/api/state/update";
    var formArray = $("#state_update_form").serializeArray();
    var res = formValidate(formArray);
    if (res == true) {
      showLoader();
      formArray.push({
        name: "state_id",
        value: passdata_state_id.toString(),
      });

      custom_ajax_iFunction(base_url, formArray)
        .then((data) => {
          if (data["status_type"] == "success") {
            refresh_state_display();
            toaster(data.status_type, data.status);
            $("#stateupdate").attr("disabled", true);
          } else {
            toaster(data.status_type, data.status);
          }
          hideLoader();
        })
        .catch((err) => {
          console.log(err);
          hideLoader();
        });
    } else {
      hideLoader();

      // toaster("warning","Field can not be blank.")
    }
  });
};
