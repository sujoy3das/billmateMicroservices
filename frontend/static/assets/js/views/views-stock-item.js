views_stock_item_display = () => {
  var views_stock_item_page_pretitle = "<p>View</p>";
  var views_stock_item_page_title = "<p>Stock Item</p>";
  var views_stock_item_page_button = ` <div class="btn-list">
          <a href="javascript:;" class="btn btn-primary d-none d-sm-inline-block" onclick="create_new_stock_item();">
            <i class="ti ti-plus"></i>
            Create new Item
          </a>
          <a href="javascript:;" class="btn btn-primary d-sm-none btn-icon" aria-label="Create new group" onclick="create_new_stock_item();">
            <i class="ti ti-plus"></i>
          </a>
        </div>`;
  var views_stock_item_page_body = ` <div class="container-xl">
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
                          <h3 class="card-title">All Stock Item</h3>
                      </div>
                      <div class="table-responsive p-1" style="min-height:500px">
                          <table class="table card-table text-nowrap" id="datatable_init">
                              <thead>
                                  <tr>
                                      <th class="w-2">SL.NO</th>
                                      <th>Stock Name</th>
                                      <th>Stock Group</th>
                                      <th>Stock Category</th>
                                      <th>HSN Code</th>
                                      <th>GST Rate</th>
                                      <th>Type of Supply</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody id="stock_items_display_table_body" class="text-uppercase">
                              </tbody>
                          </table>
                      </div>
                     
                  </div>
              </div>
          </div>
        </div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(views_stock_item_page_pretitle);
  $("#main-content .page-title").empty().html(views_stock_item_page_title);
  $("#main-content .page-button").empty().html(views_stock_item_page_button);
  $("#main-content .page-body").empty().html(views_stock_item_page_body);

  refresh_stock_items_display = () => {
    base_url = "/api/stock-items/get-all-data";
    // Insert data to datatable ----->>
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        if (data["status_type"] == "success") {
          html = "";

          for (i = 0; i < data["dbdata"]["stock_items_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + "<tr>";
            htmlTr =
              htmlTr + '<td class="text-muted">' + slno.toString() + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["stock_items_name"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["stock_group_name"][i] + "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["stock_category_name"][i] +
              "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["stock_hsn_code"][i] + "</td>";
            htmlTr = htmlTr + "<td>" + data["dbdata"]["gst_rate"][i] + "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["stock_supply"][i] + "</td>";
            htmlTr =
              htmlTr +
              `<td>
             <div class="btn-list flex-nowrap">
             <a href="javascript:;" onclick="update_stock_item(` +
              data["dbdata"]["stock_items_id"][i] +
              `)" class="btn">
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
            $("#stock_items_display_table_body").html(html);
            $("#datatable_init").DataTable({
              responsive: true,
            });
          } else {
            $("#stock_items_display_table_body").html(html);
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
  refresh_stock_items_display();
};

create_new_stock_item = () => {
  var create_new_stock_item_page_pretitle = "<p>Add new</p>";
  var create_new_stock_item_page_title = "<p>Stock Item</p>";
  var create_new_stock_item_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <form class="card" id="new_stock_item_form">
              <div class="card-body">
                  <div class="row row-cards">
                      <div class="col-md-6 left-form">
                          <div
                              style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                              <span
                                  style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                  Item Info
                              </span>
                          </div>
                          <div class="row row-cards">
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Stock Name</label>
                                      <input type="text" class="form-control text-uppercase"
                                          placeholder="Stock Name" id="stock_items_name"
                                          name="stock_items_name" required>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Stock Group</label>
                                      <input type="text" class="form-control text-capitalize"
                                          list="stock_group_datalist" placeholder="Type to search..."
                                          id="stock_group_id" name="stock_group_id">
                                      <datalist id="stock_group_datalist">
                                      </datalist>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Stock Category</label>
                                      <input type="text" class="form-control text-capitalize"
                                          list="stock_category_datalist"
                                          placeholder="Type to search..." id="stock_category_id"
                                          name="stock_category_id">
                                      <datalist id="stock_category_datalist">
                                      </datalist>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Unit</label>
                                      <select class="form-control form-select text-uppercase"
                                          placeholder="Unit" id="stock_unit" name="stock_unit"
                                          required>
                                          <option value="BAG">BAGS</option>
                                          <option value="BAL">BALE</option>
                                          <option value="BDL">BUNDLES</option>
                                          <option value="BKL">BUCKLES</option>
                                          <option value="BOU">BILLIONS OF UNITS</option>
                                          <option value="BOX">BOX</option>
                                          <option value="BTL">BOTTLES</option>
                                          <option value="BUN">BUNCHES</option>
                                          <option value="CAN">CANS</option>
                                          <option value="CBM">CUBIC METER</option>
                                          <option value="CCM">CUBIC CENTIMETER</option>
                                          <option value="CMS">CENTIMETER</option>
                                          <option value="CTN">CARTONS</option>
                                          <option value="DOZ">DOZEN</option>
                                          <option value="DRM">DRUM</option>
                                          <option value="GGR">GREAT GROSS</option>
                                          <option value="GMS">GRAMS</option>
                                          <option value="GRS">GROSS</option>
                                          <option value="GYD">GROSS YARDS</option>
                                          <option value="KGS">KILOGRAMS</option>
                                          <option value="KLR">KILOLITER</option>
                                          <option value="KME">KILOMETRE</option>
                                          <option value="MLT">MILLILITRE</option>
                                          <option value="MTR">METERS</option>
                                          <option value="MTS">METRIC TONS</option>
                                          <option value="NOS">NUMBERS</option>
                                          <option value="PAC">PACKS</option>
                                          <option value="PCS">PIECES</option>
                                          <option value="PRS">PAIRS</option>
                                          <option value="QTL">QUINTAL</option>
                                          <option value="ROL">ROLLS</option>
                                          <option value="SET">SETS</option>
                                          <option value="SQF">SQUARE FEET</option>
                                          <option value="SQM">SQUARE METERS</option>
                                          <option value="SQY">SQUARE YARDS</option>
                                          <option value="TBS">TABLETS</option>
                                          <option value="TGM">TEN GROSS</option>
                                          <option value="THD">THOUSANDS</option>
                                          <option value="TON">TONNES</option>
                                          <option value="TUB">TUBES</option>
                                          <option value="UGS">US GALLONS</option>
                                          <option value="UNT">UNITS</option>
                                          <option value="YDS">YARDS</option>
                                          <option value="OTH">OTHERS</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Opening Stock(Item QTY)</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="Opening Stock" id="opening_stock"
                                          name="opening_stock">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Opening Stock Date</label>
                                      <input type="date" class="form-control"
                                          placeholder="Opening Stock Date" id="opening_stock_date"
                                          name="opening_stock_date">
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-6 right-form">
                          <div
                              style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                              <span
                                  style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                  HSN/SSC/CTH Details
                              </span>
                          </div>
                          <div class="row row-cards">
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Description</label>
                                      <input type="text" class="form-control"
                                          placeholder="Description" id="stock_description"
                                          name="stock_description">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">HSN Code</label>
                                      <input type="number" class="rmvarrw form-control"
                                          placeholder="HSN Code" id="stock_hsn_code"
                                          name="stock_hsn_code" required>
                                  </div>
                              </div>
                          </div>
                          <div
                              style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                              <span
                                  style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                  TAX Details
                              </span>
                          </div>
                          <div class="row row-cards">
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">GST Rate</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="GST Rate" id="gst_rate" name="gst_rate">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Type of Supply</label>
                                      <select class="form-control form-select" id="stock_supply"
                                          name="stock_supply">
                                          <option value="goods">Goods</option>
                                          <option value="service">Service</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                          <div class="row row-cards">
                              <div class="col-12">
                                  <div class="mb-0 mt-2">
                                      <label class="form-label">Opening Balance</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="Opening Balance" id="opening_balance"
                                          name="opening_balance">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Opening Balance Date</label>
                                      <input type="date" class="form-control"
                                          placeholder="Opening Balance Date" id="opening_balance_date"
                                          name="opening_balance_date">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Rate</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="Rate" id="rate" name="rate">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Price</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="Price" id="price" name="price">
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center">
                  <a href="javascript:;" class="btn-secondary text-red me-auto"
                      onclick="views_stock_item_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="new_stock_item_submit">Save
                      Details</button>
              </div>
          </form>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_stock_item_page_pretitle);
  $("#main-content .page-title").empty().html(create_new_stock_item_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(create_new_stock_item_page_body);

  //Fetch stock group and stock category
  base_url = "/api/stock-group-and-category/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      console.log(data);
      if (data["status_type"] == "success") {
        const stockGroupData = data["dbdata"]["stock_group_name"];
        const stockCategoryData = data["dbdata"]["stock_category_name"];
        const stockGroupDatalist = $("#stock_group_datalist");
        const stockCategoryDatalist = $("#stock_category_datalist");

        // Insert options into stock group datalist
        insertOptionsIntoDatalist(stockGroupData, stockGroupDatalist);

        // Insert options into stock category datalist
        insertOptionsIntoDatalist(stockCategoryData, stockCategoryDatalist);
        // html = "";
        // for (i = 0; i < data["dbdata"]["stock_group_name"].length; i++) {
        //   htmlTr = "";
        //   htmlTr =
        //     htmlTr +
        //     '<option value="' +
        //     data["dbdata"]["stock_group_name"][i] +
        //     '"/>';
        //   html = html + htmlTr;
        // }
        // $("#stock_group_datalist").html(html);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  $("#new_stock_item_submit").click(function (event) {
    event.preventDefault();
    showLoader();
    const stock_item_formArray = $("#new_stock_item_form").serializeArray();
    const validated = formValidate(stock_item_formArray);

    if (validated) {
      const base_url = "/api/stock-item/add-new";
      custom_ajax_iFunction(base_url, stock_item_formArray)
        .then((data) => {
          if (data.status_type == "success") {
            refresh_stock_items_display();
            toaster(data.status_type, data.status);
            $("#new_stock_item_submit").attr("disabled", true);
          } else {
            toaster(data.status_type, data.status);
          }
          hideLoader();
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
update_stock_item = (passdata_stock_items_id) => {
  var update_stock_item_page_pretitle = "<p>Edit</p>";
  var update_stock_item_page_title = "<p>Stock Item</p>";
  var update_stock_item_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <form class="card" id="update_stock_item_form">
              <div class="card-body">
                  <div class="row row-cards">
                      <div class="col-md-6 left-form">
                          <div
                              style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                              <span
                                  style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                  Item Info
                              </span>
                          </div>
                          <div class="row row-cards">
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Stock Name</label>
                                      <input type="text" class="form-control text-uppercase"
                                          placeholder="Stock Name" id="stock_items_name"
                                          name="stock_items_name" required>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Stock Group</label>
                                      <input type="text" class="form-control text-capitalize"
                                          list="stock_group_datalist" placeholder="Type to search..."
                                          id="stock_group_id" name="stock_group_id">
                                      <datalist id="stock_group_datalist">
                                      </datalist>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Stock Category</label>
                                      <input type="text" class="form-control text-capitalize"
                                          list="stock_category_datalist"
                                          placeholder="Type to search..." id="stock_category_id"
                                          name="stock_category_id">
                                      <datalist id="stock_category_datalist">
                                      </datalist>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label required">Unit</label>
                                      <select class="form-control form-select text-uppercase"
                                          placeholder="Unit" id="stock_unit" name="stock_unit"
                                          required>
                                          <option value="BAG">BAGS</option>
                                          <option value="BAL">BALE</option>
                                          <option value="BDL">BUNDLES</option>
                                          <option value="BKL">BUCKLES</option>
                                          <option value="BOU">BILLIONS OF UNITS</option>
                                          <option value="BOX">BOX</option>
                                          <option value="BTL">BOTTLES</option>
                                          <option value="BUN">BUNCHES</option>
                                          <option value="CAN">CANS</option>
                                          <option value="CBM">CUBIC METER</option>
                                          <option value="CCM">CUBIC CENTIMETER</option>
                                          <option value="CMS">CENTIMETER</option>
                                          <option value="CTN">CARTONS</option>
                                          <option value="DOZ">DOZEN</option>
                                          <option value="DRM">DRUM</option>
                                          <option value="GGR">GREAT GROSS</option>
                                          <option value="GMS">GRAMS</option>
                                          <option value="GRS">GROSS</option>
                                          <option value="GYD">GROSS YARDS</option>
                                          <option value="KGS">KILOGRAMS</option>
                                          <option value="KLR">KILOLITER</option>
                                          <option value="KME">KILOMETRE</option>
                                          <option value="MLT">MILLILITRE</option>
                                          <option value="MTR">METERS</option>
                                          <option value="MTS">METRIC TONS</option>
                                          <option value="NOS">NUMBERS</option>
                                          <option value="PAC">PACKS</option>
                                          <option value="PCS">PIECES</option>
                                          <option value="PRS">PAIRS</option>
                                          <option value="QTL">QUINTAL</option>
                                          <option value="ROL">ROLLS</option>
                                          <option value="SET">SETS</option>
                                          <option value="SQF">SQUARE FEET</option>
                                          <option value="SQM">SQUARE METERS</option>
                                          <option value="SQY">SQUARE YARDS</option>
                                          <option value="TBS">TABLETS</option>
                                          <option value="TGM">TEN GROSS</option>
                                          <option value="THD">THOUSANDS</option>
                                          <option value="TON">TONNES</option>
                                          <option value="TUB">TUBES</option>
                                          <option value="UGS">US GALLONS</option>
                                          <option value="UNT">UNITS</option>
                                          <option value="YDS">YARDS</option>
                                          <option value="OTH">OTHERS</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Opening Stock(Item QTY)</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="Opening Stock" id="opening_stock"
                                          name="opening_stock">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Opening Stock Date</label>
                                      <input type="date" class="form-control"
                                          placeholder="Opening Stock Date" id="opening_stock_date"
                                          name="opening_stock_date">
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-6 right-form">
                          <div
                              style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                              <span
                                  style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                  HSN/SSC/CTH Details
                              </span>
                          </div>
                          <div class="row row-cards">
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Description</label>
                                      <input type="text" class="form-control"
                                          placeholder="Description" id="stock_description"
                                          name="stock_description">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">HSN Code</label>
                                      <input type="number" class="rmvarrw form-control"
                                          placeholder="HSN Code" id="stock_hsn_code"
                                          name="stock_hsn_code" required>
                                  </div>
                              </div>
                          </div>
                          <div
                              style="width: 100%; height: 15px; border-bottom: 1px solid #dad7cd; text-align: center;margin-bottom: 10px;">
                              <span
                                  style="font-size: 16px; background-color: #f8fafc;color:#206bc4; padding: 0 10px;margin-left:20px;">
                                  TAX Details
                              </span>
                          </div>
                          <div class="row row-cards">
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">GST Rate</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="GST Rate" id="gst_rate" name="gst_rate">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Type of Supply</label>
                                      <select class="form-control form-select" id="stock_supply"
                                          name="stock_supply">
                                          <option value="goods">Goods</option>
                                          <option value="service">Service</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                          <div class="row row-cards">
                              <div class="col-12">
                                  <div class="mb-0 mt-2">
                                      <label class="form-label">Opening Balance</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="Opening Balance" id="opening_balance"
                                          name="opening_balance">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Opening Balance Date</label>
                                      <input type="date" class="form-control"
                                          placeholder="Opening Balance Date" id="opening_balance_date"
                                          name="opening_balance_date">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Rate</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="Rate" id="rate" name="rate">
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="mb-0">
                                      <label class="form-label">Price</label>
                                      <input type="number" class="form-control rmvarrw"
                                          placeholder="Price" id="price" name="price">
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center">
                  <a href="javascript:;" class="btn-secondary text-red me-auto"
                      onclick="views_stock_item_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="stock_item_update">Update
                      Details</button>
              </div>
          </form>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(update_stock_item_page_pretitle);
  $("#main-content .page-title").empty().html(update_stock_item_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_stock_item_page_body);

  //Fetch stock group and stock category
  base_url = "/api/stock-group-and-category/fetch";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      console.log(data);
      if (data["status_type"] == "success") {
        const stockGroupData = data["dbdata"]["stock_group_name"];
        const stockCategoryData = data["dbdata"]["stock_category_name"];
        const stockGroupDatalist = $("#stock_group_datalist");
        const stockCategoryDatalist = $("#stock_category_datalist");

        // Insert options into stock group datalist
        insertOptionsIntoDatalist(stockGroupData, stockGroupDatalist);

        // Insert options into stock category datalist
        insertOptionsIntoDatalist(stockCategoryData, stockCategoryDatalist);
        // html = "";
        // for (i = 0; i < data["dbdata"]["stock_group_name"].length; i++) {
        //   htmlTr = "";
        //   htmlTr =
        //     htmlTr +
        //     '<option value="' +
        //     data["dbdata"]["stock_group_name"][i] +
        //     '"/>';
        //   html = html + htmlTr;
        // }
        // $("#stock_group_datalist").html(html);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // Fetch data and insert for update --->>
  fetch_url = "/api/stock-items/get-single-data";
  result = [{ name: "stock_items_id", value: passdata_stock_items_id }];
  showLoader();

  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      if (data["status_type"] == "success") {
        refresh_form("#update_stock_item_form", data["dbdata"], []); //Take main div id || data object || ignore cols
      } else {
        toaster(data.status, data.status_type);
      }
      hideLoader();
    })
    .catch((err) => {
      console.log(err);
      hideLoader();
    });

  $("#stock_item_update").click(function (event) {
    event.preventDefault();
    showLoader();
    const stock_item_formArray = $("#update_stock_item_form").serializeArray();
    const validated = formValidate(stock_item_formArray);

    if (validated) {
      stock_item_formArray.push({
        name: "stock_items_id",
        value: passdata_stock_items_id.toString(),
      });
      const base_url = "/api/stock-item/update";
      custom_ajax_iFunction(base_url, stock_item_formArray)
        .then((data) => {
          if (data.status_type == "success") {
            refresh_stock_items_display();
            toaster(data.status_type, data.status);
            $("#stock_item_update").attr("disabled", true);
          } else {
            toaster(data.status_type, data.status);
          }
          hideLoader();
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

// Get all parent ledger group and put in a datalist ---->
insertOptionsIntoDatalist = (data, datalist) => {
  let html = "";
  let addedOption = false;
  for (let i = 0; i < data.length; i++) {
    const optionValue = data[i];
    if (optionValue !== "") {
      html += '<option value="' + optionValue + '"/>';
      addedOption = true;
    }
  }
  if (!addedOption) {
    html +=
      '<option value="not added ' +
      (datalist.attr("id").includes("group") ? "group" : "category") +
      '"/>';
  }
  datalist.html(html);
};
