views_stock_group_display = () => {
  var views_stock_group_page_pretitle = "<p>View</p>";
  var views_stock_group_page_title = "<p>Stock Group</p>";
  var views_stock_group_page_button = ` <div class="btn-list">
      <a href="javascript:;" class="btn btn-outline-light d-none d-sm-inline-block" onclick="create_new_stock_group();" data-bs-toggle="modal" data-bs-target="#mediumModal">
        <i class="ti ti-plus"></i>
        Create new Stock Group
      </a>
      <a href="javascript:;" class="btn btn-primary d-sm-none btn-icon" aria-label="Create new group" onclick="create_new_stock_group();" data-bs-toggle="modal" data-bs-target="#mediumModal">
        <i class="ti ti-plus"></i>
      </a>
    </div>`;
  var views_stock_group_page_body = ` <div class="container-xl">
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
                      <h3 class="card-title">All Stock Groups</h3>
                  </div>
                  <div class="table-responsive p-1" style="min-height:500px">
                      <table class="table card-table text-nowrap" id="datatable_init">
                          <thead>
                              <tr>
                                  <th class="w-2">SL.NO</th>
                                  <th>Stock Group Name</th>
                                  <th>Parent Stock Group</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody id="stock_group_display_table_body" class="text-uppercase">
                          </tbody>
                      </table>
                  </div>
                 
              </div>
          </div>
      </div>
    </div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(views_stock_group_page_pretitle);
  $("#main-content .page-title").empty().html(views_stock_group_page_title);
  $("#main-content .page-button").empty().html(views_stock_group_page_button);
  $("#main-content .page-body").empty().html(views_stock_group_page_body);

  refresh_stock_group_display = () => {
    base_url = "/api/stock_group/fetch";
    // Insert data to datatable ----->>
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        console.log(data);
        if (data["status_type"] == "success") {
          html = "";

          for (i = 0; i < data["dbdata"]["stock_group_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + "<tr>";
            htmlTr =
              htmlTr + '<td class="text-muted">' + slno.toString() + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["stock_group_name"][i] + "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["parent_stock_group_name"][i] +
              "</td>";
            htmlTr =
              htmlTr +
              `<td>
               <div class="btn-list flex-nowrap">
               <a href="javascript:;" onclick="update_stock_group(` +
              data["dbdata"]["stock_group_id"][i] +
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
            $("#stock_group_display_table_body").html(html);
            $("#datatable_init").DataTable({
              responsive: true,
            });
          } else {
            $("#stock_group_display_table_body").html(html);
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
  refresh_stock_group_display(); //this function for call from any where to refresh table
};

create_new_stock_group = () => {
  var create_new_stock_group_modal_title = `<h5 class="modal-title">Create New Stock Group</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  var create_new_stock_group_modal_body = `<form id="new_stock_group_form">
    <div class="row">
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">Group name</label>
            <input type="text" class="form-control text-capitalize" id="stock_group_name"
                name="stock_group_name" placeholder="Group Name" required>
        </div>
    </div>
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">Parent Stock Group</label>
            <input type="text" class="form-control text-capitalize" list="stock_group_datalist" id="parent_stock_group_id" name="parent_stock_group_id" placeholder="Type to search..." required>
            <datalist id="stock_group_datalist">
  
            </datalist>
        </div>
    </div>
    </div></form>`;
  var create_new_stock_group_modal_footer = `<a href="javascript:;" class="btn btn-link link-secondary" data-bs-dismiss="modal">Cancel</a>
      <a href="javascript:;" class="btn btn-primary ms-auto"  id="new_stock_group_submit">Save Details</a>`;
  $("#mediumModalTitle").empty().html(create_new_stock_group_modal_title);
  $("#mediumModalBody").empty().html(create_new_stock_group_modal_body);
  $("#mediumModalFooter").empty().html(create_new_stock_group_modal_footer);

  // Get all parent ledger group and put in a datalist ---->
  base_url = "/api/parent-stock-group/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["stock_group_name"].length; i++) {
          htmlTr = "";
          htmlTr =
            htmlTr +
            '<option value="' +
            data["dbdata"]["stock_group_name"][i] +
            '"/>';
          html = html + htmlTr;
        }
        $("#stock_group_datalist").html(html);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //   Save details
  $("#new_stock_group_submit").click(function (event) {
    event.preventDefault();
    showLoader();
    const stock_group_formArray = $("#new_stock_group_form").serializeArray();
    console.log(stock_group_formArray);
    const validated = formValidate(stock_group_formArray);

    if (validated) {
      const base_url = "/api/stock-group/add-new";

      custom_ajax_iFunction(base_url, stock_group_formArray)
        .then((data) => {
          if (data.status_type == "success") {
            refresh_stock_group_display();
            hideLoader();
            toaster(data.status_type, data.status);
            $("#new_stock_group_submit").attr("disabled", true);
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

update_stock_group = (passdata_stock_group_id) => {
  var update_group_modal_title = `<h5 class="modal-title">Edit Group</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  var update_group_modal_body = `<form id="stock_group_update_form">
    <div class="row">
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">Group name</label>
            <input type="text" class="form-control text-capitalize" id="stock_group_name"
                name="stock_group_name" placeholder="Group Name" required>
        </div>
    </div>
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">Parent Group</label>
            <input type="text" class="form-control text-capitalize" list="stock_group_datalist" id="parent_stock_group_id" name="parent_stock_group_id" placeholder="Type to search..." required>
            <datalist id="stock_group_datalist">
  
            </datalist>
        </div>
    </div>
    </div></form>`;
  var update_group_modal_footer = `<a href="javascript:;" class="btn btn-link link-secondary" data-bs-dismiss="modal">Cancel</a>
      <a href="javascript:;" class="btn btn-primary ms-auto"  id="stock_group_update">Update Details</a>`;
  $("#mediumModalTitle").empty().html(update_group_modal_title);
  $("#mediumModalBody").empty().html(update_group_modal_body);
  $("#mediumModalFooter").empty().html(update_group_modal_footer);

  // Get all parent group and put in a datalist ---->
  base_url = "/api/parent-stock-group/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["stock_group_name"].length; i++) {
          htmlTr = "";
          htmlTr =
            htmlTr +
            '<option value="' +
            data["dbdata"]["stock_group_name"][i] +
            '"/>';
          html = html + htmlTr;
        }
        $("#stock_group_datalist").html(html);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // Fetch data and insert for update --->>
  fetch_url = "/api/stock-group/fetch/single";
  result = [{ name: "stock_group_id", value: passdata_stock_group_id }];
  showLoader();

  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      if (data["status_type"] == "success") {
        console.log(data);
        refresh_form("#stock_group_update_form", data["dbdata"], []); //Take main div id || data object || ignore cols
      } else {
        toaster(data.status, data.status_type);
      }
    })
    .catch((err) => {
      console.log(err);
      toaster("error", "An unexpected error occurred. Please try again later.");
    })
    .finally(() => {
      hideLoader();
    });

  // Update data onclick-->>
  $("#stock_group_update").click(function (event) {
    event.preventDefault();
    base_url = "/api/stock-group/update";
    var formArray = $("#stock_group_update_form").serializeArray();
    if (formValidate(formArray) == false) {
      return;
    }
    formArray.push({
      name: "stock_group_id",
      value: passdata_stock_group_id.toString(),
    });

    showLoader();
    custom_ajax_iFunction(base_url, formArray)
      .then((data) => {
        if (data["status_type"] == "success") {
          refresh_stock_group_display();
          toaster(data.status_type, data.status);
          $("#stock_group_update").attr("disabled", true);
        } else {
          toaster(data.status_type, data.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hideLoader();
      });
  });
};
