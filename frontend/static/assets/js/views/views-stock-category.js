views_stock_category_display = () => {
  var views_stock_category_page_pretitle = "<p>View</p>";
  var views_stock_category_page_title = "<p>Stock Category</p>";
  var views_stock_category_page_button = ` <div class="btn-list">
        <a href="javascript:;" class="btn btn-primary d-none d-sm-inline-block" onclick="create_new_stock_category();" data-bs-toggle="modal" data-bs-target="#mediumModal">
          <i class="ti ti-plus"></i>
          Create new Category
        </a>
        <a href="javascript:;" class="btn btn-primary d-sm-none btn-icon" aria-label="Create new group" onclick="create_new_stock_category();" data-bs-toggle="modal" data-bs-target="#mediumModal">
          <i class="ti ti-plus"></i>
        </a>
      </div>`;
  var views_stock_category_page_body = ` <div class="container-xl">
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
                        <h3 class="card-title">All Stock Category</h3>
                    </div>
                    <div class="table-responsive p-1" style="min-height:500px">
                        <table class="table card-table text-nowrap" id="datatable_init">
                            <thead>
                                <tr>
                                    <th class="w-2">SL.NO</th>
                                    <th>Category Name</th>
                                    <th>Parent Category Group</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="stock_category_display_table_body" class="text-uppercase">
                            </tbody>
                        </table>
                    </div>
                   
                </div>
            </div>
        </div>
      </div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(views_stock_category_page_pretitle);
  $("#main-content .page-title").empty().html(views_stock_category_page_title);
  $("#main-content .page-button")
    .empty()
    .html(views_stock_category_page_button);
  $("#main-content .page-body").empty().html(views_stock_category_page_body);

  refresh_stock_category_display = () => {
    base_url = "/api/stock-category/fetch";
    // Insert data to datatable ----->>
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        console.log(data);
        if (data["status_type"] == "success") {
          html = "";

          for (i = 0; i < data["dbdata"]["stock_category_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + "<tr>";
            htmlTr =
              htmlTr + '<td class="text-muted">' + slno.toString() + "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["stock_category_name"][i] +
              "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["stock_category_parent_name"][i] +
              "</td>";
            htmlTr =
              htmlTr +
              `<td>
                 <div class="btn-list flex-nowrap">
                 <a href="javascript:;" onclick="update_stock_category(` +
              data["dbdata"]["stock_category_id"][i] +
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
            $("#stock_category_display_table_body").html(html);
            $("#datatable_init").DataTable({
              responsive: true,
            });
          } else {
            $("#stock_category_display_table_body").html(html);
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
  refresh_stock_category_display(); //this function for call from any where to refresh table
};

create_new_stock_category = () => {
  var create_new_stock_category_modal_title = `<h5 class="modal-title">Create New Stock Category</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  var create_new_stock_category_modal_body = `<form id="new_stock_category_form">
      <div class="row">
      <div class="col-12">
          <div class="mb-1">
              <label class="form-label required">Category name</label>
              <input type="text" class="form-control text-capitalize" id="stock_category_name"
                  name="stock_category_name" placeholder="Category Name" required>
          </div>
      </div>
      <div class="col-12">
          <div class="mb-1">
              <label class="form-label required">Parent Category Name</label>
              <input type="text" class="form-control text-capitalize" list="stock_category_parent_name_datalist" id="stock_category_parent_id" name="stock_category_parent_id" placeholder="Type to search..." required>
              <datalist id="stock_category_parent_name_datalist">
    
              </datalist>
          </div>
      </div>
      </div></form>`;
  var create_new_stock_category_modal_footer = `<a href="javascript:;" class="btn btn-link link-secondary" data-bs-dismiss="modal">Cancel</a>
        <a href="javascript:;" class="btn btn-primary ms-auto"  id="new_stock_category_submit">Save Details</a>`;
  $("#mediumModalTitle").empty().html(create_new_stock_category_modal_title);
  $("#mediumModalBody").empty().html(create_new_stock_category_modal_body);
  $("#mediumModalFooter").empty().html(create_new_stock_category_modal_footer);

  // Get all parent category and put in a datalist ---->
  base_url = "/api/stock-catgory-parent/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["stock_category_name"].length; i++) {
          htmlTr = "";
          htmlTr =
            htmlTr +
            '<option value="' +
            data["dbdata"]["stock_category_name"][i] +
            '"/>';
          html = html + htmlTr;
        }
        $("#stock_category_parent_name_datalist").html(html);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //   Save details
  $("#new_stock_category_submit").click(function (event) {
    event.preventDefault();
    showLoader();
    const stock_category_formArray = $(
      "#new_stock_category_form"
    ).serializeArray();
    console.log(stock_category_formArray);
    const validated = formValidate(stock_category_formArray);

    if (validated) {
      const base_url = "/api/stock-category/add-new";

      custom_ajax_iFunction(base_url, stock_category_formArray)
        .then((data) => {
          if (data.status_type == "success") {
            refresh_stock_category_display();
            hideLoader();
            toaster(data.status_type, data.status);
            $("#new_stock_category_submit").attr("disabled", true);
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

update_stock_category = (passdata_stock_category_id) => {
  var update_group_modal_title = `<h5 class="modal-title">Edit Stock Category</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
  var update_group_modal_body = `<form id="stock_category_update_form">
    <div class="row">
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">Category name</label>
            <input type="text" class="form-control text-capitalize" id="stock_category_name"
                name="stock_category_name" placeholder="Category Name" required>
        </div>
    </div>
    <div class="col-12">
        <div class="mb-1">
            <label class="form-label required">Stock Category Group</label>
            <input type="text" class="form-control text-capitalize" list="stock_category_parent_name_datalist" id="stock_category_parent_id" name="stock_category_parent_id" placeholder="Type to search..." required>
            <datalist id="stock_category_parent_name_datalist">
  
            </datalist>
        </div>
    </div>
    </div></form>`;
  var update_group_modal_footer = `<a href="javascript:;" class="btn btn-link link-secondary" data-bs-dismiss="modal">Cancel</a>
        <a href="javascript:;" class="btn btn-primary ms-auto"  id="stock_category_update">Update Details</a>`;
  $("#mediumModalTitle").empty().html(update_group_modal_title);
  $("#mediumModalBody").empty().html(update_group_modal_body);
  $("#mediumModalFooter").empty().html(update_group_modal_footer);

  // Get all parent category and put in a datalist ---->
  base_url = "/api/stock-catgory-parent/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["stock_category_name"].length; i++) {
          htmlTr = "";
          htmlTr =
            htmlTr +
            '<option value="' +
            data["dbdata"]["stock_category_name"][i] +
            '"/>';
          html = html + htmlTr;
        }
        $("#stock_category_parent_name_datalist").html(html);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // Fetch data and insert for update --->>
  fetch_url = "/api/stock-category/fetch/single";
  result = [{ name: "stock_category_id", value: passdata_stock_category_id }];
  showLoader();

  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      console.log(data);
      if (data["status_type"] == "success") {
        refresh_form("#stock_category_update_form", data["dbdata"], []); //Take main div id || data object || ignore cols
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
  $("#stock_category_update").click(function (event) {
    event.preventDefault();
    base_url = "/api/stock-category/update";
    var formArray = $("#stock_category_update_form").serializeArray();
    var res = formValidate(formArray);
    if (res == true) {
      showLoader();
      formArray.push({
        name: "stock_category_id",
        value: passdata_stock_category_id.toString(),
      });

      custom_ajax_iFunction(base_url, formArray)
        .then((data) => {
          if (data["status_type"] == "success") {
            refresh_stock_category_display();
            toaster(data.status_type, data.status);
            $("#stock_category_update").attr("disabled", true);
          } else {
            toaster(
              "warning",
              "Can not update..!! This stock category has dependency to other stock category."
            );
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
