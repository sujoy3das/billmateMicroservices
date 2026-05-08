views_stock_journal_display = () => {
  var views_stock_journal_page_pretitle = "<p>View</p>";
  var views_stock_journal_page_title = "<p>Stock Journal</p>";
  var views_stock_journal_page_button = ` <div class="btn-list">
            <a href="javascript:;" class="btn btn-primary d-none d-sm-inline-block" onclick="create_new_stock_journal();">
              <i class="ti ti-plus"></i>
              Create new stock journal
            </a>
            <a href="javascript:;" class="btn btn-primary d-sm-none btn-icon" aria-label="Create new stock journal" onclick="create_new_stock_journal();">
              <i class="ti ti-plus"></i>
            </a>
          </div>`;
  var views_stock_journal_page_body = ` <div class="container-xl">
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
                            <h3 class="card-title">All Stock Journals</h3>
                        </div>
                        <div class="table-responsive p-1" style="min-height:500px">
                            <table class="table card-table text-nowrap " id="datatable_init">
                                <thead>
                                    <tr>
                                        <th class="w-2">SL.NO</th>
                                        <th>Stock Journal No</th>
                                        <th>Journal Date</th>
                                        <th>Stock Journal Type</th>
                                        <th>Source Amount</th>
                                        <th>Destination Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="stock_journal_display_table_body">
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
    .html(views_stock_journal_page_pretitle);
  $("#main-content .page-title").empty().html(views_stock_journal_page_title);
  $("#main-content .page-button").empty().html(views_stock_journal_page_button);
  $("#main-content .page-body").empty().html(views_stock_journal_page_body);

  // Refresh stock journal display--->.
  refreshStockJournalDisplay = () => {
    base_url = "/api/stock/journal/get-all-data";
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        html = "";
        if (data["status_type"] == "success") {
          html = "";
          for (
            i = 0;
            i < data["dbdata"]["stock_journal_details_id"].length;
            i++
          ) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + '<tr class="text-uppercase">';
            htmlTr = htmlTr + '<td class="text-muted">' + slno + "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-muted">' +
              data["dbdata"]["stock_journal_details_id"][i] +
              "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["stock_journal_date"][i] +
              "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["journal_type"][i] + "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["total_source_amount"][i] +
              "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["total_destination_amount"][i] +
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
                          <a class="dropdown-item" href="javascript:;" onclick="update_stock_journal(` +
              data["dbdata"]["stock_journal_details_id"][i] +
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
          $("#stock_journal_display_table_body").html(html);
          $("#datatable_init").DataTable({
            responsive: true,
          });
        } else {
          $("#stock_journal_display_table_body").html(html);
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
  refreshStockJournalDisplay();
};

create_new_stock_journal = () => {
  var create_new_stock_journal_page_pretitle = "<p>Add new</p>";
  var create_new_stock_journal_page_title = "<p>Stock Journal</p>";
  var create_new_stock_journal_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item ">
                          <a href="#stock_journal_info_tab" class="nav-link "
                              data-bs-toggle="tab">Stock Journal
                              Info</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#details_tab" class="nav-link active" data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Particulars
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade " id="stock_journal_info_tab">
                          <h4>StockJournal Info</h4>
                          <form id="stock_journal_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Stock Journal Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Stock Journal Id"
                                              id="stock_journal_details_id"
                                              name="stock_journal_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Stock Journal
                                              Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Stock Journal Date" id="stock_journal_date"
                                              name="stock_journal_date" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Reference No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Reference No" id="reference_no"
                                              name="reference_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Journal Type</label>
                                          <select class="form-control form-select" id="journal_type"
                                              name="journal_type" onchange="triggerCPtoDESTcheckbox(this);">
                                              <option value="1">Transfer</option>
                                              <option value="2">
                                                  Manufacturing/Adjustment</option>
                                              <option value="3">Waste</option>
                                          </select>
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
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade active show" id="details_tab">
                          <div class="row">
                              <div class="col-md-6 col-sm-12">
                                  <h5>Source Particulars</h5>
                                  <div class="table-responsive mb-2" style="max-height: 500px;">
                                      <table class="table table-vcenter card-table"
                                          id="stock_journals_source_details_table">
                                          <thead>
                                              <tr>
                                                  <th class="w-1"></th>
                                                  <th>S.NO</th>
                                                  <th>Stock Item</th>
                                                  <th>Stock Item Id</th>
                                                  <th>Warehouse</th>
                                                  <th>QTY</th>
                                                  <th>Rate</th>
                                                  <th>Amount</th>
                                                  <th class="w-1"></th>
                                              </tr>
                                          </thead>
                                          <tbody id="stockJournalsSourceDetailsTableTbody">
                                              <tr>
                                                  <td class=" ps-3" onclick="addSourceRow();"><i
                                                          class="ti ti-plus"></i></td>
                                                  <td class=" text-muted">1</td>
                                                  <td class="p-1 w__250">
                                                      <input type="text"
                                                          class="w__100 fs-6 border-0 text-uppercase"
                                                          placeholder="STOCK ITEM"
                                                          list="sourceStockItemDatalist1">
                                                      <datalist
                                                          id="sourceStockItemDatalist1"></datalist>
                                                  </td>
                                                  <td class="p-1">
                                                      <input type="text" class="w__50 fs-6 border-0" placeholder="STOCK ITEM ID">
                                                  </td>
                                                  <td class="p-1">
                                                      <input type="text" class="w__100 fs-6 border-0"
                                                          placeholder="WAREHOUSE">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="w__100 fs-6 border-0 rmvarrw"
                                                          placeholder="QTY">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="w__100 fs-6 border-0 rmvarrw"
                                                          placeholder="RATE">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="fs-6 border-0 rmvarrw"
                                                          placeholder="AMOUNT">
                                                  </td>
                                                  <td class="pe-3"></td>
                                              </tr>
                                          </tbody>
                                          <tfoot>
                                              <tr>
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
                                              <tr>
                                                  <td colspan="4" class="p-1">
                                                      <input type="checkbox"
                                                          name="copy_to_destination"
                                                          id="copy_to_destination" class="me-2" value="1" onchange="copySourceToDestination();">
                                                      <label for="copy_to_destination">Copy to
                                                          destination</label>
                                                  </td>
                                                  <td colspan="3"
                                                      class="p-1 calculate-total text-end fw-bold">
                                                      Total Source Amount:
                                                  </td>
                                                  <td colspan="2" class="p-1 text-green fw-bold"
                                                      id="total_source_amount">00.00</td>
                                              </tr>

                                          </tfoot>
                                      </table>
                                  </div>
                              </div>
                              <div class="col-md-6 col-sm-12">
                                  <h5>Destination Particulars</h5>
                                  <div class="table-responsive mb-2" style="max-height: 500px;">
                                      <table class="table table-vcenter card-table"
                                          id="stock_journals_destination_details_table">
                                          <thead>
                                              <tr>
                                                  <th class="w-1"></th>
                                                  <th>S.NO</th>
                                                  <th>Stock Item</th>
                                                  <th>Stock Item Id</th>
                                                  <th>Warehouse</th>
                                                  <th>QTY</th>
                                                  <th>Rate</th>
                                                  <th>Amount</th>
                                                  <th class="w-1"></th>
                                              </tr>
                                          </thead>
                                          <tbody id="stockJournalsDestinationDetailsTableTbody">
                                              <tr>
                                                  <td class=" ps-3" onclick="addDestinationRow();"><i
                                                          class="ti ti-plus"></i></td>
                                                  <td class=" text-muted">1</td>
                                                  <td class="p-1 w__250">
                                                      <input type="text"
                                                          class="w__100 fs-6 border-0 text-uppercase"
                                                          placeholder="STOCK ITEM"
                                                          list="destinationStockItemDatalist1">
                                                      <datalist
                                                          id="destinationStockItemDatalist1"></datalist>
                                                         
                                                  </td>
                                                  <td class="p-1">
                                                      <input type="text" class="w__50 fs-6 border-0" placeholder="STOCK ITEM ID">
                                                  </td>
                                                  <td class="p-1">
                                                      <input type="text" class="w__100 fs-6 border-0"
                                                          placeholder="WAREHOUSE">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="w__100 fs-6 border-0 rmvarrw"
                                                          placeholder="QTY">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="w__100 fs-6 border-0 rmvarrw"
                                                          placeholder="RATE">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="fs-6 border-0 rmvarrw"
                                                          placeholder="AMOUNT">
                                                  </td>
                                                  <td class="pe-3"></td>
                                              </tr>
                                          </tbody>
                                          <tfoot>
                                              <tr>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                              </tr>
                                              <tr>
                                                  <td colspan="6"
                                                      class="p-1 w__75 calculate-total text-end fw-bold">
                                                      Total Destination Amount :</td>
                                                  <td colspan="2" class="p-1 w__25 text-red fw-bold"
                                                      id="total_destination_amount">00.00</td>
                                              </tr>
                                          </tfoot>
                                      </table>
                                  </div>

                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center py-2">
                  <a href="javascript:;" class="btn-secondary text-red me-auto"
                      onclick="views_stock_journal_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="new_stock_journal_submit">Save
                      Details</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_stock_journal_page_pretitle);
  $("#main-content .page-title")
    .empty()
    .html(create_new_stock_journal_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body")
    .empty()
    .html(create_new_stock_journal_page_body);

  //Set current date for invoice date
  multi_fn_currentDate("stock_journal_date");

  //Fetch all particulars
  miniFetchParticulars("sourceStockItemDatalist1", "source");
  miniFetchParticulars("destinationStockItemDatalist1", "dest");

  // Calculate debit and credit totals when either the amount input changes or the type select changes
  $("#stockJournalsSourceDetailsTableTbody").on(
    "input",
    "input[type='number'],input[placeholder='QTY'],input[placeholder='RATE']",
    function () {
      calculateProwTotals("source");
    }
  );
  $("#stockJournalsDestinationDetailsTableTbody").on(
    "input",
    "input[type='number'],input[placeholder='QTY'],input[placeholder='RATE']",
    function () {
      calculateProwTotals("dest");
    }
  );

  //  Submit function for insert data in DB
  $("#new_stock_journal_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const stockJournalDetailsFormArray = $(
      "#stock_journal_details_form"
    ).serializeArray();

    // Get table data
    const sourceParticularsFormArray = getTableDataAsArray(
      "stock_journals_source_details_table",
      ["STOCK NAME", "WAREHOUSE", "AMOUNT"]
    );
    const destinationParticularsFormArray = getTableDataAsArray(
      "stock_journals_destination_details_table",
      ["STOCK NAME", "WAREHOUSE", "AMOUNT"]
    );

    // Validate form fields
    const allValidated = formValidate([...stockJournalDetailsFormArray]);

    if (
      allValidated &&
      ($("#total_destination_amount").text() !== "00.00" || undefined) &&
      ($("#total_source_amount").text() !== "00.00" || undefined)
    ) {
      const base_url = "/api/stock/journal/add-new";
      // Retrieve the text values
      const totalSourceAmount = $("#total_source_amount").text();
      const totalDestinationAmount = $("#total_destination_amount").text();

      // Append these values to the stockJournalDetailsFormArray
      stockJournalDetailsFormArray.push({
        name: "total_source_amount",
        value: $("#copy_to_destination").val(),
      });
      stockJournalDetailsFormArray.push({
        name: "total_source_amount",
        value: totalSourceAmount,
      });
      stockJournalDetailsFormArray.push({
        name: "total_destination_amount",
        value: totalDestinationAmount,
      });
      // Push table data into mainFormArray with condition
      const mainFormArray = [
        {
          name: "stock_journal_details_formArray",
          value: stockJournalDetailsFormArray,
        },
        {
          name: "source_particulars_formarray",
          value: sourceParticularsFormArray,
        },
        {
          name: "destination_particulars_formarray",
          value: destinationParticularsFormArray,
        },
      ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshStockJournalDisplay();
            toaster(data.status_type, data.status);
            // $("#new_stock_journal_submit").attr("disabled", true);
          } else {
            toaster(data.status_type, data.status);
          }
          hideLoader();
        })
        .catch((err) => {
          hideLoader();
          toaster("error", "An error has occurred. Please try again later.");
        });
    } else {
      hideLoader();
      toaster(
        "error",
        "All fields are not valid and Total amouts can't be 00.00"
      );
    }
  });
};
update_stock_journal = (passdata_stock_journal_details_id) => {
  var update_stock_journal_page_pretitle = "<p>Edit</p>";
  var update_stock_journal_page_title = "<p>Stock Journal</p>";
  var update_stock_journal_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item ">
                          <a href="#stock_journal_info_tab" class="nav-link "
                              data-bs-toggle="tab">Stock Journal
                              Info</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#details_tab" class="nav-link active" data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Particulars
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade " id="stock_journal_info_tab">
                          <h4>StockJournal Info</h4>
                          <form id="stock_journal_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Stock Journal Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Stock Journal Id"
                                              id="stock_journal_details_id"
                                              name="stock_journal_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Stock Journal
                                              Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Stock Journal Date" id="stock_journal_date"
                                              name="stock_journal_date" required>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Reference No</label>
                                          <input type="text" class="form-control"
                                              placeholder="Reference No" id="reference_no"
                                              name="reference_no">
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Journal Type</label>
                                          <select class="form-control form-select" id="journal_type"
                                              name="journal_type" onchange="triggerCPtoDESTcheckbox(this);">
                                              <option value="1">Transfer</option>
                                              <option value="2">
                                                  Manufacturing/Adjustment</option>
                                              <option value="3">Waste</option>
                                          </select>
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
                              </div>
                          </form>
                      </div>
                      <div class="tab-pane fade active show" id="details_tab">
                          <div class="row">
                              <div class="col-md-6 col-sm-12">
                                  <h5>Source Particulars</h5>
                                  <div class="table-responsive mb-2" style="max-height: 500px;">
                                      <table class="table table-vcenter card-table"
                                          id="stock_journals_source_details_table">
                                          <thead>
                                              <tr>
                                                  <th class="w-1"></th>
                                                  <th>S.NO</th>
                                                  <th>Stock Item</th>
                                                  <th>Stock Item Id</th>
                                                  <th>Warehouse</th>
                                                  <th>QTY</th>
                                                  <th>Rate</th>
                                                  <th>Amount</th>
                                                  <th class="w-1"></th>
                                              </tr>
                                          </thead>
                                          <tbody id="stockJournalsSourceDetailsTableTbody">
                                              <tr>
                                                  <td class=" ps-3" onclick="addSourceRow();"><i
                                                          class="ti ti-plus"></i></td>
                                                  <td class=" text-muted">1</td>
                                                  <td class="p-1 w__250">
                                                      <input type="text"
                                                          class="w__100 fs-6 border-0 text-uppercase"
                                                          placeholder="STOCK ITEM"
                                                          list="sourceStockItemDatalist1">
                                                      <datalist
                                                          id="sourceStockItemDatalist1"></datalist>
                                                  </td>
                                                  <td class="p-1">
                                                      <input type="text" class="w__50 fs-6 border-0" placeholder="STOCK ITEM ID">
                                                  </td>
                                                  <td class="p-1">
                                                      <input type="text" class="w__100 fs-6 border-0"
                                                          placeholder="WAREHOUSE">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="w__100 fs-6 border-0 rmvarrw"
                                                          placeholder="QTY">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="w__100 fs-6 border-0 rmvarrw"
                                                          placeholder="RATE">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="fs-6 border-0 rmvarrw"
                                                          placeholder="AMOUNT">
                                                  </td>
                                                  <td class="pe-3"></td>
                                              </tr>
                                          </tbody>
                                          <tfoot>
                                              <tr>
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
                                              <tr>
                                                  <td colspan="4" class="p-1">
                                                      <input type="checkbox"
                                                          name="copy_to_destination"
                                                          id="copy_to_destination" class="me-2" value="1" onchange="copySourceToDestination();">
                                                      <label for="copy_to_destination">Copy to
                                                          destination</label>
                                                  </td>
                                                  <td colspan="3"
                                                      class="p-1 calculate-total text-end fw-bold">
                                                      Total Source Amount:
                                                  </td>
                                                  <td colspan="2" class="p-1 text-green fw-bold"
                                                      id="total_source_amount">00.00</td>
                                              </tr>

                                          </tfoot>
                                      </table>
                                  </div>
                              </div>
                              <div class="col-md-6 col-sm-12">
                                  <h5>Destination Particulars</h5>
                                  <div class="table-responsive mb-2" style="max-height: 500px;">
                                      <table class="table table-vcenter card-table"
                                          id="stock_journals_destination_details_table">
                                          <thead>
                                              <tr>
                                                  <th class="w-1"></th>
                                                  <th>S.NO</th>
                                                  <th>Stock Item</th>
                                                  <th>Stock Item Id</th>
                                                  <th>Warehouse</th>
                                                  <th>QTY</th>
                                                  <th>Rate</th>
                                                  <th>Amount</th>
                                                  <th class="w-1"></th>
                                              </tr>
                                          </thead>
                                          <tbody id="stockJournalsDestinationDetailsTableTbody">
                                              <tr>
                                                  <td class=" ps-3" onclick="addDestinationRow();"><i
                                                          class="ti ti-plus"></i></td>
                                                  <td class=" text-muted">1</td>
                                                  <td class="p-1 w__250">
                                                      <input type="text"
                                                          class="w__100 fs-6 border-0 text-uppercase"
                                                          placeholder="STOCK ITEM"
                                                          list="destinationStockItemDatalist1">
                                                      <datalist
                                                          id="destinationStockItemDatalist1"></datalist>
                                                         
                                                  </td>
                                                  <td class="p-1">
                                                      <input type="text" class="w__50 fs-6 border-0" placeholder="STOCK ITEM ID">
                                                  </td>
                                                  <td class="p-1">
                                                      <input type="text" class="w__100 fs-6 border-0"
                                                          placeholder="WAREHOUSE">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="w__100 fs-6 border-0 rmvarrw"
                                                          placeholder="QTY">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="w__100 fs-6 border-0 rmvarrw"
                                                          placeholder="RATE">
                                                  </td>
                                                  <td class=" p-1">
                                                      <input type="number"
                                                          class="fs-6 border-0 rmvarrw"
                                                          placeholder="AMOUNT">
                                                  </td>
                                                  <td class="pe-3"></td>
                                              </tr>
                                          </tbody>
                                          <tfoot>
                                              <tr>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                                  <td class="p-1"></td>
                                              </tr>
                                              <tr>
                                                  <td colspan="6"
                                                      class="p-1 w__75 calculate-total text-end fw-bold">
                                                      Total Destination Amount :</td>
                                                  <td colspan="2" class="p-1 w__25 text-red fw-bold"
                                                      id="total_destination_amount">00.00</td>
                                              </tr>
                                          </tfoot>
                                      </table>
                                  </div>

                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer d-flex align-items-center py-2">
                  <a href="javascript:;" class="btn-secondary text-red me-auto"
                      onclick="views_stock_journal_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="update_stock_journal_submit">Update
                      Details</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(update_stock_journal_page_pretitle);
  $("#main-content .page-title").empty().html(update_stock_journal_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_stock_journal_page_body);

  //Set current date for invoice date
  multi_fn_currentDate("stock_journal_date");

  //Fetch all particulars
  miniFetchParticulars("sourceStockItemDatalist1", "source");
  miniFetchParticulars("destinationStockItemDatalist1", "dest");

  // Fetch single data for update***************>>
  fetch_url = "/api/stock/journal/get-single-data";
  result = [
    {
      name: "stock_journal_details_id",
      value: passdata_stock_journal_details_id,
    },
  ];
  showLoader();
  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      console.log(data);
      // Work from here
      if (data["status_type"] == "success") {
        refreshForm(
          "#stock_journal_details_form",
          data.stock_journal_details,
          [],
          [
            "stock_journal_details_id",
            "stock_journal_date",
            "narration",
            "referecnce_no",
            "journal_type",
          ]
        );
        // Extra for copy_to_destinaiton
        console.log(data.stock_journal_details.copy_to_destination[0]);
        $("#copy_to_destination").prop(
          "checked",
          data.stock_journal_details.copy_to_destination[0] === "1"
        );
        //Particular table data Only call this function if you have data
        if (
          data.stock_journal_s_particulars.stock_journal_s_particulars_id
            .length >= 1
        ) {
          var len_of_stock_journal_s_particulars =
            data.stock_journal_s_particulars.stock_journal_s_particulars_id
              .length;
          populateLastRowWithDataStokJournal(
            data.stock_journal_s_particulars,
            "stockJournalsSourceDetailsTableTbody",
            len_of_stock_journal_s_particulars,
            0
          );

          //Calculate receipt tables tfoot and all totals
          calculateProwTotals("source");
        }
        //Particular table data Only call this function if you have data
        if (
          data.stock_journal_d_particulars.stock_journal_d_particulars_id
            .length >= 1
        ) {
          var len_of_stock_journal_d_particulars =
            data.stock_journal_d_particulars.stock_journal_d_particulars_id
              .length;
          populateLastRowWithDataStokJournal(
            data.stock_journal_d_particulars,
            "stockJournalsDestinationDetailsTableTbody",
            len_of_stock_journal_d_particulars,
            0
          );

          //Calculate receipt tables tfoot and all totals
          calculateProwTotals("dest");
        }
      } else {
        toaster(data.status, data.status_type);
      }
      hideLoader();
    })
    .catch((err) => {
      console.log(err);
      hideLoader();
    }); //End fetch single data

  // Calculate debit and credit totals when either the amount input changes or the type select changes
  $("#stockJournalsSourceDetailsTableTbody").on(
    "input change",
    "input[type='number'][placeholder='QTY'][placeholder='RATE']",
    function () {
      calculateProwTotals("source");
    }
  );
  $("#stockJournalsDestinationDetailsTableTbody").on(
    "input change",
    "input[type='number'][placeholder='QTY'][placeholder='RATE']",
    function () {
      calculateProwTotals("dest");
    }
  );

  //  Submit function for insert data in DB
  $("#update_stock_journal_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const stockJournalDetailsFormArray = $(
      "#stock_journal_details_form"
    ).serializeArray();

    // Get table data
    const sourceParticularsFormArray = getTableDataAsArray(
      "stock_journals_source_details_table",
      ["STOCK NAME", "WAREHOUSE", "AMOUNT"]
    );
    const destinationParticularsFormArray = getTableDataAsArray(
      "stock_journals_destination_details_table",
      ["STOCK NAME", "WAREHOUSE", "AMOUNT"]
    );

    // Validate form fields
    const allValidated = formValidate([...stockJournalDetailsFormArray]);

    if (
      allValidated &&
      ($("#total_destination_amount").text() !== "00.00" || undefined) &&
      ($("#total_source_amount").text() !== "00.00" || undefined)
    ) {
      const base_url = "/api/stock/journal/update";
      // Retrieve the text values
      const totalSourceAmount = $("#total_source_amount").text();
      const totalDestinationAmount = $("#total_destination_amount").text();

      // Append these values to the stockJournalDetailsFormArray
      stockJournalDetailsFormArray.push({
        name: "total_source_amount",
        value: $("#copy_to_destination").val(),
      });
      stockJournalDetailsFormArray.push({
        name: "total_source_amount",
        value: totalSourceAmount,
      });
      stockJournalDetailsFormArray.push({
        name: "total_destination_amount",
        value: totalDestinationAmount,
      });
      // Push table data into mainFormArray with condition
      const mainFormArray = [
        {
          name: "stock_journal_details_formArray",
          value: stockJournalDetailsFormArray,
        },
        {
          name: "source_particulars_formarray",
          value: sourceParticularsFormArray,
        },
        {
          name: "destination_particulars_formarray",
          value: destinationParticularsFormArray,
        },
      ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshStockJournalDisplay();
            toaster(data.status_type, data.status);
            // $("#update_stock_journal_submit").attr("disabled", true);
          } else {
            toaster(data.status_type, data.status);
          }
          hideLoader();
        })
        .catch((err) => {
          hideLoader();
          toaster("error", "An error has occurred. Please try again later.");
        });
    } else {
      hideLoader();
      toaster(
        "error",
        "All fields are not valid and Total amouts can't be 00.00"
      );
    }
  });
};

// Mini Funtion============>>

addSourceRow = () => {
  // Get the number of existing rows in the table
  const existingRowCount = $("#stockJournalsSourceDetailsTableTbody tr").length;

  // Increment the serial number for the new row
  const newSerialNumber = existingRowCount + 1;

  const row = `<tr>
  <td class=" ps-3" onclick="addSourceRow();"><i
          class="ti ti-plus"></i></td>
  <td class=" text-muted">${newSerialNumber}</td>
  <td class="p-1 w__250">
      <input type="text"
          class="w__100 fs-6 border-0 text-uppercase"
          placeholder="STOCK ITEM"
          list="sourceStockItemDatalist${newSerialNumber}">
      <datalist id="sourceStockItemDatalist${newSerialNumber}"></datalist>
     
    </td>
    <td class="p-1">
        <input type="text" class="w__50 fs-6 border-0" placeholder="STOCK ITEM ID">
    </td>
  <td class="p-1">
      <input type="text" class="w__100 fs-6 border-0"
          placeholder="WAREHOUSE">
  </td>
  <td class=" p-1">
      <input type="number"
          class="w__100 fs-6 border-0 rmvarrw"
          placeholder="QTY">
  </td>
  <td class=" p-1">
      <input type="number"
          class="w__100 fs-6 border-0 rmvarrw"
          placeholder="RATE">
  </td>
  <td class=" p-1">
      <input type="number"
          class="fs-6 border-0 rmvarrw"
          placeholder="AMOUNT">
  </td>
      <td class="pe-3" onclick="remove_row_from_table(this,()=>{ 
        calculateProwTotals();})"><i class="ti ti-minus tf"></i></td>
        </tr>`;

  $("#stockJournalsSourceDetailsTableTbody").append(row);

  //Mini function for source
  miniFetchParticulars("sourceStockItemDatalist" + newSerialNumber, "source");
};
addDestinationRow = () => {
  // Get the number of existing rows in the table
  const existingRowCount = $(
    "#stockJournalsDestinationDetailsTableTbody tr"
  ).length;

  // Increment the serial number for the new row
  const newSerialNumber = existingRowCount + 1;

  const row = `<tr>
  <td class=" ps-3" onclick="addDestinationRow();"><i
          class="ti ti-plus"></i></td>
  <td class=" text-muted">${newSerialNumber}</td>
  <td class="p-1 w__250">
      <input type="text"
          class="w__100 fs-6 border-0 text-uppercase"
          placeholder="STOCK ITEM"
          list="destinationStockItemDatalist${newSerialNumber}">
      <datalist id="destinationStockItemDatalist${newSerialNumber}"></datalist>
  
    </td>
    <td class="p-1">
        <input type="text" class="w__50 fs-6 border-0" placeholder="STOCK ITEM ID">
    </td>
  <td class="p-1">
      <input type="text" class="w__100 fs-6 border-0"
          placeholder="WAREHOUSE">
  </td>
  <td class=" p-1">
      <input type="number"
          class="w__100 fs-6 border-0 rmvarrw"
          placeholder="QTY">
  </td>
  <td class=" p-1">
      <input type="number"
          class="w__100 fs-6 border-0 rmvarrw"
          placeholder="RATE">
  </td>
  <td class=" p-1">
      <input type="number"
          class="fs-6 border-0 rmvarrw"
          placeholder="AMOUNT">
  </td>
      <td class="pe-3" onclick="remove_row_from_table(this,()=>{ 
        calculateProwTotals();})"><i class="ti ti-minus tf"></i></td>
        </tr>`;

  $("#stockJournalsDestinationDetailsTableTbody").append(row);

  //Mini function for destination
  miniFetchParticulars(
    "destinationStockItemDatalist" + newSerialNumber,
    "dest"
  );
};

let sourceSelectedItems = [];
let destSelectedItems = [];

const miniFetchParticulars = (datalistId, particularsType) => {
  base_url = "/api/stock/journal/stock_item/get-all-data";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        let html = "";
        for (let i = 0; i < data["dbdata"]["stock_items_id"].length; i++) {
          const itemName = data["dbdata"]["stock_items_name"][i].toUpperCase();
          const hsn = data["dbdata"]["stock_hsn_code"][i];
          const qty = data["dbdata"]["qty"][i] || 0;

          // Only filter items if journal_type is 2
          if (
            $("#journal_type").val() != "2" ||
            (particularsType === "source" &&
              !destSelectedItems.includes(itemName)) ||
            (particularsType === "dest" &&
              !sourceSelectedItems.includes(itemName))
          ) {
            html += `<option value="${itemName}">QTY: ${qty}, HSN: ${hsn}</option>`;
          }
        }
        $(`#${datalistId}`).html(html);

        // Attach event listener to stock name input field
        $(
          `#${particularsType === "source" ? "stockJournalsSourceDetailsTableTbody" : "stockJournalsDestinationDetailsTableTbody"}`
        ).on("change", 'input[placeholder="STOCK ITEM"]', function () {
          const selectedStockName = $(this).val().toUpperCase();
          const selectedIndex = data["dbdata"]["stock_items_name"]
            .map((item) => item.toUpperCase())
            .indexOf(selectedStockName);

          if (selectedIndex !== -1) {
            const productId = data["dbdata"]["stock_items_id"][selectedIndex];
            const qty = data["dbdata"]["qty"][selectedIndex];
            const rate = data["dbdata"]["rate"][selectedIndex];

            $(this)
              .closest("tr")
              .find('input[placeholder="STOCK ITEM ID"]')
              .val(productId);
            $(this).closest("tr").find('input[placeholder="QTY"]').val(qty);
            $(this).closest("tr").find('input[placeholder="RATE"]').val(rate);

            // Only update selected items if journal_type is 2
            if ($("#journal_type").val() == "2") {
              if (particularsType === "source") {
                sourceSelectedItems.push(selectedStockName);
              } else {
                destSelectedItems.push(selectedStockName);
              }

              // Update the other table's datalist
              updateOtherDatalist(
                particularsType === "source" ? "dest" : "source"
              );
            }

            calculateProwTotals(particularsType);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateOtherDatalist = (particularsType) => {
  // Only update if journal_type is 2
  if ($("#journal_type").val() == "2") {
    const datalistId =
      particularsType === "source"
        ? "sourceStockItemDatalist1"
        : "destinationStockItemDatalist1";
    miniFetchParticulars(datalistId, particularsType);
  }
};

// Add event listener for journal_type changes
$("#journal_type").on("change", function () {
  // Reset selected items arrays
  sourceSelectedItems = [];
  destSelectedItems = [];

  // Refresh both datalists
  miniFetchParticulars("sourceStockItemDatalist1", "source");
  miniFetchParticulars("destinationStockItemDatalist1", "dest");
});

triggerCPtoDESTcheckbox = (elem) => {
  var selectedType = $(elem).val();
  if (selectedType === "2") {
    // Disable the checkbox
    refreshSourceDestinationTables();
    $("#copy_to_destination").prop("disabled", true);
    $("#copy_to_destination").prop("checked", false);
  } else {
    // Enable the checkbox if other options are selected
    $("#copy_to_destination").prop("disabled", false);
  }
};

copySourceToDestination = () => {
  // Check if the 'Copy to destination' checkbox is checked
  if ($("#copy_to_destination").is(":checked")) {
    // Clear existing rows in the destination table
    $("#stockJournalsDestinationDetailsTableTbody").empty();

    // Clone each row from the source table and append to the destination table
    $("#stockJournalsSourceDetailsTableTbody tr").each(function () {
      var clonedRow = $(this).clone();

      // Update the 'onclick' attribute for the first cell (add row)
      clonedRow.find("td").eq(0).attr("onclick", "addDestinationRow();");

      // Update the 'datalist' ID and associated input list attribute
      var rowCount =
        $("#stockJournalsDestinationDetailsTableTbody tr").length + 1;
      clonedRow.find("input[list]").each(function () {
        var oldListId = $(this).attr("list");
        var newListId = oldListId.replace("source", "destination") + rowCount;
        $(this).attr("list", newListId);
        $(this).next("datalist").attr("id", newListId);
      });

      // Update the 'onclick' attribute for the last cell (remove row)
      clonedRow
        .find("td")
        .last()
        .attr(
          "onclick",
          'remove_row_from_table(this, () => { calculateProwTotals("dest"); });'
        );

      // Append the modified row to the destination table
      $("#stockJournalsDestinationDetailsTableTbody").append(clonedRow);
    });

    // Optionally, recalculate totals for the destination table
    calculateProwTotals("dest");
  } else {
    // If unchecked, you might want to clear the destination table
    $("#stockJournalsDestinationDetailsTableTbody").empty();
  }
};

// Calculate particulars row total
calculateProwTotals = (particularsType) => {
  const selector =
    particularsType === "source"
      ? "#stockJournalsSourceDetailsTableTbody"
      : "#stockJournalsDestinationDetailsTableTbody";
  $(selector + " tr").each(function () {
    // Get the input fields in the current row
    var qty = parseFloat($(this).find("input[placeholder='QTY']").val()) || 0;
    var rate = parseFloat($(this).find("input[placeholder='RATE']").val()) || 0;

    // Calculate the amount for the current row
    var amount = qty * rate;
    $(this).find("input[placeholder='AMOUNT']").val(amount.toFixed(2));
  });

  calculateSDtotal(); // Assuming this function needs to be called after updating totals
  //calculate source destination total
};

calculateSDtotal = () => {
  // Calculate total for source table
  let totalSourceAmount = 0;
  $("#stockJournalsSourceDetailsTableTbody tr").each(function () {
    let amount =
      parseFloat($(this).find("input[placeholder='AMOUNT']").val()) || 0;
    totalSourceAmount += amount;
  });
  // Update the total source amount display
  $("#total_source_amount").text(totalSourceAmount.toFixed(2));

  // Calculate total for destination table
  let totalDestinationAmount = 0;
  $("#stockJournalsDestinationDetailsTableTbody tr").each(function () {
    let amount =
      parseFloat($(this).find("input[placeholder='AMOUNT']").val()) || 0;
    totalDestinationAmount += amount;
  });
  // Update the total destination amount display
  $("#total_destination_amount").text(totalDestinationAmount.toFixed(2));
};

populateLastRowWithDataStokJournal = (data, tableId, len, currentIndex) => {
  console.log(data, tableId, currentIndex, len);
  const lastRow = $("#" + tableId + " tr:last");
  console.log(lastRow);
  const dataVal = data;
  console.log(dataVal.stock_item[currentIndex]);
  lastRow
    .find("input[placeholder='STOCK ITEM']")
    .val(dataVal.stock_item[currentIndex]);
  lastRow
    .find("input[placeholder='STOCK ITEM ID']")
    .val(dataVal.stock_item_id[currentIndex]);
  lastRow
    .find("input[placeholder='WAREHOUSE']")
    .val(dataVal.warehouse[currentIndex]);
  lastRow.find("input[placeholder='QTY']").val(dataVal.qty[currentIndex]);
  lastRow.find("input[placeholder='RATE']").val(dataVal.rate[currentIndex]);
  lastRow.find("input[placeholder='AMOUNT']").val(dataVal.amount[currentIndex]);

  currentIndex += 1;
  calculateSDtotal();
  if (currentIndex < len) {
    if (tableId == "stockJournalsSourceDetailsTableTbody") {
      addSourceRow();
    } else {
      addDestinationRow();
    }
    populateLastRowWithDataStokJournal(data, tableId, len, currentIndex);
  } else return;
};

refreshSourceDestinationTables = () => {
  var src = `<tr>
  <td class=" ps-3" onclick="addSourceRow();"><i
          class="ti ti-plus"></i></td>
  <td class=" text-muted">1</td>
  <td class="p-1 w__250">
      <input type="text"
          class="w__100 fs-6 border-0 text-uppercase"
          placeholder="STOCK ITEM"
          list="sourceStockItemDatalist1">
      <datalist
          id="sourceStockItemDatalist1"></datalist>
  </td>
  <td class="p-1">
      <input type="text" class="w__50 fs-6 border-0" placeholder="STOCK ITEM ID">
  </td>
  <td class="p-1">
      <input type="text" class="w__100 fs-6 border-0"
          placeholder="WAREHOUSE">
  </td>
  <td class=" p-1">
      <input type="number"
          class="w__100 fs-6 border-0 rmvarrw"
          placeholder="QTY">
  </td>
  <td class=" p-1">
      <input type="number"
          class="w__100 fs-6 border-0 rmvarrw"
          placeholder="RATE">
  </td>
  <td class=" p-1">
      <input type="number"
          class="fs-6 border-0 rmvarrw"
          placeholder="AMOUNT">
  </td>
  <td class="pe-3"></td>
</tr>`;
  $("#stockJournalsSourceDetailsTableTbody").html(src);
  var dest = ` <tr>
  <td class=" ps-3" onclick="addDestinationRow();"><i
          class="ti ti-plus"></i></td>
  <td class=" text-muted">1</td>
  <td class="p-1 w__250">
      <input type="text"
          class="w__100 fs-6 border-0 text-uppercase"
          placeholder="STOCK ITEM"
          list="destinationStockItemDatalist1">
      <datalist
          id="destinationStockItemDatalist1"></datalist>
         
  </td>
  <td class="p-1">
      <input type="text" class="w__50 fs-6 border-0" placeholder="STOCK ITEM ID">
  </td>
  <td class="p-1">
      <input type="text" class="w__100 fs-6 border-0"
          placeholder="WAREHOUSE">
  </td>
  <td class=" p-1">
      <input type="number"
          class="w__100 fs-6 border-0 rmvarrw"
          placeholder="QTY">
  </td>
  <td class=" p-1">
      <input type="number"
          class="w__100 fs-6 border-0 rmvarrw"
          placeholder="RATE">
  </td>
  <td class=" p-1">
      <input type="number"
          class="fs-6 border-0 rmvarrw"
          placeholder="AMOUNT">
  </td>
  <td class="pe-3"></td>
</tr>`;
  $("#stockJournalsDestinationDetailsTableTbody").html(dest);
  miniFetchParticulars("sourceStockItemDatalist1", "source");
  miniFetchParticulars("destinationStockItemDatalist1", "dest");
};
