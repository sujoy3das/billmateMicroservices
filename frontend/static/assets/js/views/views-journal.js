views_journal_display = () => {
  var views_journal_page_pretitle = "<p>View</p>";
  var views_journal_page_title = "<p>Journals</p>";
  var views_journal_page_button = ` <div class="btn-list">
          <a href="javascript:;" class="btn btn-primary d-none d-sm-inline-block" onclick="create_new_journal();">
            <i class="ti ti-plus"></i>
            Create new journal
          </a>
          <a href="javascript:;" class="btn btn-primary d-sm-none btn-icon" aria-label="Create new journal" onclick="create_new_journal();">
            <i class="ti ti-plus"></i>
          </a>
        </div>`;
  var views_journal_page_body = ` <div class="container-xl">
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
                          <h3 class="card-title">All Journals</h3>
                      </div>
                      <div class="table-responsive p-1" style="min-height:500px">
                          <table class="table card-table text-nowrap " id="datatable_init">
                              <thead>
                                  <tr>
                                      <th class="w-2">SL.NO</th>
                                      <th>Journal No</th>
                                      <th>Journal Date</th>
                                      <th>Amount</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody id="journal_display_table_body">
                              <tr>
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
  $("#main-content .page-pretitle").empty().html(views_journal_page_pretitle);
  $("#main-content .page-title").empty().html(views_journal_page_title);
  $("#main-content .page-button").empty().html(views_journal_page_button);
  $("#main-content .page-body").empty().html(views_journal_page_body);

  // Refresh invoice display--->.
  refreshJournalDisplay = () => {
    base_url = "/api/journal/get-all-data";
    showLoader();
    custom_ajax_gFunction(base_url)
      .then((data) => {
        html = "";
        if (data["status_type"] == "success") {
          html = "";
          for (i = 0; i < data["dbdata"]["journal_details_id"].length; i++) {
            var slno = i + 1;
            htmlTr = "";
            htmlTr = htmlTr + '<tr class="text-uppercase">';
            htmlTr = htmlTr + '<td class="text-muted">' + slno + "</td>";
            htmlTr =
              htmlTr +
              '<td class="text-muted">' +
              data["dbdata"]["journal_details_id"][i] +
              "</td>";
            htmlTr =
              htmlTr + "<td>" + data["dbdata"]["journal_date"][i] + "</td>";
            htmlTr =
              htmlTr +
              "<td>" +
              data["dbdata"]["total_credit_amount"][i] +
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
                        <a class="dropdown-item" href="javascript:;" onclick="update_journal(` +
              data["dbdata"]["journal_details_id"][i] +
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
                </tr>`;
        }
        $("#datatable_init").DataTable();
        if ($.fn.DataTable.isDataTable("#datatable_init")) {
          $("#datatable_init").DataTable().clear().destroy();
          $("#journal_display_table_body").html(html);
          $("#datatable_init").DataTable({
            responsive: true,
          });
        } else {
          $("#journal_display_table_body").html(html);
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
  refreshJournalDisplay();
};

create_new_journal = () => {
  var create_new_journal_page_pretitle = "<p>Add new</p>";
  var create_new_journal_page_title = "<p>Journal</p>";
  var create_new_journal_page_body = `<div class="container-xl">
  <div class="row row-cards">
      <div class="col-12">
          <div class="card">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item ">
                          <a href="#journal_info_tab" class="nav-link active"
                              data-bs-toggle="tab">Journal
                              Info</a>
                      </li>
                      <li class="nav-item ms-auto">
                          <a href="#details_tab" class="nav-link" data-bs-toggle="tab">
                              <i class="ti ti-plus me-1"></i>
                              Particulars
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="card-body">
                  <div class="tab-content">
                      <div class="tab-pane fade active show" id="journal_info_tab">
                          <h4>Journal Info</h4>
                          <form id="journal_details_form">
                              <div class="row row-cards">
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label">Journal Id</label>
                                          <input type="number" class="form-control"
                                              placeholder="Journal Id" id="journal_details_id"
                                              name="journal_details_id" readonly>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="mb-0">
                                          <label class="form-label required">Journal Date</label>
                                          <input type="date" class="form-control"
                                              placeholder="Journal Date" id="journal_date"
                                              name="journal_date" required>
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
                      <div class="tab-pane fade" id="details_tab">
                          <h4>Particulars</h4>
                          <div class="table-responsive mb-2" style="max-height: 262px;">
                              <table class="table table-vcenter card-table"
                                  id="journals_details_table">
                                  <thead>
                                      <tr>
                                          <th class="w-1"></th>
                                          <th>S.NO</th>
                                          <th>DB/CR</th>
                                          <th>Ledger Name</th>
                                          <th>Amount</th>
                                          <th class="w-1"></th>
                                      </tr>
                                  </thead>
                                  <tbody id="journalsDetailsTableTbody">
                                      <tr>
                                          <td class="ps-3" onclick="addJournalRow();"><i
                                                  class="ti ti-plus"></i></td>
                                          <td class="text-muted">1</td>
                                          <td class="p-1"><select
                                                  class="form-select p-0 fs-6 border-0"
                                                  placeholder="TYPE">
                                                  <option value="0" selected="">DB</option>
                                                  <option value="1">CR</option>
                                              </select></td>
                                          <td class="p-1 w__50">
                                              <input type="text" class="w__100 fs-6 border-0 text-uppercase"
                                                  placeholder="LEDGER NAME"
                                                  list="ledgerNameDatalist1">
                                              <datalist id="ledgerNameDatalist1"></datalist>
                                          </td>
                                          <td class="p-1">
                                              <input type="number" class="w__100 fs-6 border-0 rmvarrw"
                                                  placeholder="AMOUNT">
                                          </td>
                                          <td class="pe-3"></td>
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
                                      </tr>

                                  </tfoot>
                              </table>
                          </div>
                          <div class="row">
                              <div class="col-lg-6 col-md-12 ms-auto">
                                  <div class="card">
                                      <div class="card-body">
                                          <h3 class="card-title">Totals</h3>
                                          <table class="table table-sm table-borderless"
                                              id="journalTotalsTable">
                                              <tbody id="journalTotalsTableTbody">
                                                  <tr class="border-top text-red">
                                                      <td>TOTAL DEBIT AMOUNT</td>
                                                      <td class=" fw-bold text-end"
                                                          id="total_debit_amount"></td>
                                                  </tr>
                                                  <tr class="text-green">
                                                      <td>TOTAL CREDIT AMOUNT</td>
                                                      <td class=" fw-bold text-end"
                                                          id="total_credit_amount">
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
                  <a href="javascript:;" class="btn-secondary text-red me-auto"
                      onclick="views_journal_display();">Close</a>
                  <button type="submit" class="btn btn-primary" id="new_journal_submit">Save
                      Details</button>
              </div>
          </div>
      </div>
  </div>
    </div>`;
  $("#main-content .page-pretitle")
    .empty()
    .html(create_new_journal_page_pretitle);
  $("#main-content .page-title").empty().html(create_new_journal_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(create_new_journal_page_body);

  //Set current date for invoice date
  multi_fn_currentDate("journal_date");

  //Fetch all ledgers
  miniFetchJournals("ledgerNameDatalist1");

  // Calculate debit and credit totals when either the amount input changes or the type select changes
  $("#journalsDetailsTableTbody").on(
    "input change",
    "input[type='number'][placeholder='AMOUNT'], select[placeholder='TYPE']",
    function () {
      calculateDBCRtotal();
    }
  );

  //  Submit function for insert data in DB
  $("#new_journal_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const journalDetailsFormArray = $("#journal_details_form").serializeArray();

    // Get table data
    const particularsFormArray = getTableDataAsArray("journals_details_table", [
      "LEDGER NAME",
      "AMOUNT",
    ]);

    // Validate form fields
    const allValidated = formValidate([...journalDetailsFormArray]);

    if (
      allValidated &&
      ($("#total_debit_amount").text() !== "0.00" || undefined) &&
      parseFloat($("#total_debit_amount").text()) ===
        parseFloat($("#total_credit_amount").text())
    ) {
      const base_url = "/api/journal/add-new";
      // Retrieve the text values of total_debit_amount and total_credit_amount
      const totalDebitAmount = $("#total_debit_amount").text();
      const totalCreditAmount = $("#total_credit_amount").text();

      // Append these values to the journalDetailsFormArray
      journalDetailsFormArray.push({
        name: "total_debit_amount",
        value: totalDebitAmount,
      });
      journalDetailsFormArray.push({
        name: "total_credit_amount",
        value: totalCreditAmount,
      });
      // Push table data into mainFormArray with condition
      const mainFormArray = [
        { name: "journal_details_formArray", value: journalDetailsFormArray },
        {
          name: "particulars_formarray",
          value: particularsFormArray,
        },
      ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshJournalDisplay();
            toaster(data.status_type, data.status);
            $("#new_journal_submit").attr("disabled", true);
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
      toaster(
        "error",
        "All fields are not valid or Debit and Credit Amount should be same."
      );
    }
  });
};

update_journal = (passdata_journal_details_id) => {
  var update_journal_page_pretitle = "<p>Edit</p>";
  var update_journal_page_title = "<p>Journal</p>";
  var update_journal_page_body = `<div class="container-xl">
    <div class="row row-cards">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                        <li class="nav-item ">
                            <a href="#journal_info_tab" class="nav-link active"
                                data-bs-toggle="tab">Journal
                                Info</a>
                        </li>
                        <li class="nav-item ms-auto">
                            <a href="#details_tab" class="nav-link" data-bs-toggle="tab">
                                <i class="ti ti-plus me-1"></i>
                                Particulars
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane fade active show" id="journal_info_tab">
                            <h4>Journal Info</h4>
                            <form id="journal_details_form">
                                <div class="row row-cards">
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label">Journal Id</label>
                                            <input type="number" class="form-control"
                                                placeholder="Journal Id" id="journal_details_id"
                                                name="journal_details_id" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-0">
                                            <label class="form-label required">Journal Date</label>
                                            <input type="date" class="form-control"
                                                placeholder="Journal Date" id="journal_date"
                                                name="journal_date" required>
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
                        <div class="tab-pane fade" id="details_tab">
                            <h4>Particulars</h4>
                            <div class="table-responsive mb-2" style="max-height: 262px;">
                                <table class="table table-vcenter card-table"
                                    id="journals_details_table">
                                    <thead>
                                        <tr>
                                            <th class="w-1"></th>
                                            <th>S.NO</th>
                                            <th>DB/CR</th>
                                            <th>Ledger Name</th>
                                            <th>Amount</th>
                                            <th class="w-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="journalsDetailsTableTbody">
                                        <tr>
                                            <td class="ps-3" onclick="addJournalRow();"><i
                                                    class="ti ti-plus"></i></td>
                                            <td class="text-muted">1</td>
                                            <td class="p-1"><select
                                                    class="form-select p-0 fs-6 border-0"
                                                    placeholder="TYPE">
                                                    <option value="0" selected="">DB</option>
                                                    <option value="1">CR</option>
                                                </select></td>
                                            <td class="p-1 w__50">
                                                <input type="text" class="w__100 fs-6 border-0 text-uppercase"
                                                    placeholder="LEDGER NAME"
                                                    list="ledgerNameDatalist1">
                                                <datalist id="ledgerNameDatalist1"></datalist>
                                            </td>
                                            <td class="p-1">
                                                <input type="number" class="w__100 fs-6 border-0 rmvarrw"
                                                    placeholder="AMOUNT">
                                            </td>
                                            <td class="pe-3"></td>
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
                                        </tr>
  
                                    </tfoot>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-12 ms-auto">
                                    <div class="card">
                                        <div class="card-body">
                                            <h3 class="card-title">Totals</h3>
                                            <table class="table table-sm table-borderless"
                                                id="journalTotalsTable">
                                                <tbody id="journalTotalsTableTbody">
                                                    <tr class="border-top text-red">
                                                        <td>TOTAL DEBIT AMOUNT</td>
                                                        <td class=" fw-bold text-end"
                                                            id="total_debit_amount"></td>
                                                    </tr>
                                                    <tr class="text-green">
                                                        <td>TOTAL CREDIT AMOUNT</td>
                                                        <td class=" fw-bold text-end"
                                                            id="total_credit_amount">
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
                    <a href="javascript:;" class="btn-secondary text-red me-auto"
                        onclick="views_journal_display();">Close</a>
                    <button type="submit" class="btn btn-primary" id="journal_update_submit">Update
                        Details</button>
                </div>
            </div>
        </div>
    </div>
      </div>`;
  $("#main-content .page-pretitle").empty().html(update_journal_page_pretitle);
  $("#main-content .page-title").empty().html(update_journal_page_title);
  $("#main-content .page-button").empty();
  $("#main-content .page-body").empty().html(update_journal_page_body);

  //Fetch all ledgers
  miniFetchJournals("ledgerNameDatalist1");

  // Fetch single data for update***************>>
  fetch_url = "/api/journal/get-single-data";
  result = [{ name: "journal_details_id", value: passdata_journal_details_id }];
  showLoader();
  custom_ajax_iFunction(fetch_url, result)
    .then((data) => {
      console.log(data);
      if (data["status_type"] == "success") {
        refreshForm(
          "#journal_details_form",
          data.journal_details,
          [],
          ["journal_details_id", "journal_date", "narration"]
        );
        //Particular table data Only call this function if you have data
        if (data.journal_particulars.journal_details_id.length >= 1) {
          var len_of_journal_particulars =
            data.journal_particulars.journal_details_id.length;
          populateLastRowWithDataJournal(
            data,
            "journalsDetailsTableTbody",
            len_of_journal_particulars,
            0
          );

          //Calculate receipt tables tfoot and all totals
          calculateJournalTotal();
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
  $("#journalsDetailsTableTbody").on(
    "input change",
    "input[type='number'][placeholder='AMOUNT'], select[placeholder='TYPE']",
    function () {
      calculateDBCRtotal();
    }
  );

  //  Submit function for update data in DB
  $("#journal_update_submit").click(function (event) {
    event.preventDefault();
    // Serialize form data
    const journalDetailsFormArray = $("#journal_details_form").serializeArray();

    // Get table data
    const particularsFormArray = getTableDataAsArray("journals_details_table", [
      "LEDGER NAME",
      "AMOUNT",
    ]);

    // Validate form fields
    const allValidated = formValidate([...journalDetailsFormArray]);

    if (
      allValidated &&
      ($("#total_debit_amount").text() !== "0.00" || undefined) &&
      parseFloat($("#total_debit_amount").text()) ===
        parseFloat($("#total_credit_amount").text())
    ) {
      const base_url = "/api/journal/update";
      // Retrieve the text values of total_debit_amount and total_credit_amount
      const totalDebitAmount = $("#total_debit_amount").text();
      const totalCreditAmount = $("#total_credit_amount").text();

      // Append these values to the journalDetailsFormArray
      journalDetailsFormArray.push({
        name: "total_debit_amount",
        value: totalDebitAmount,
      });
      journalDetailsFormArray.push({
        name: "total_credit_amount",
        value: totalCreditAmount,
      });
      // Push table data into mainFormArray with condition
      const mainFormArray = [
        { name: "journal_details_formArray", value: journalDetailsFormArray },
        {
          name: "particulars_formarray",
          value: particularsFormArray,
        },
      ];

      // Perform AJAX request
      custom_ajax_iFunction(base_url, mainFormArray)
        .then((data) => {
          if (data.status_type === "success") {
            refreshJournalDisplay();
            toaster(data.status_type, data.status);
            $("#journal_update_submit").attr("disabled", true);
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
// Mini functions=======================>>
addJournalRow = () => {
  // Get the number of existing rows in the table
  const existingRowCount = $("#journalsDetailsTableTbody tr").length;

  // Increment the serial number for the new row
  const newSerialNumber = existingRowCount + 1;

  const row = `<tr>
    <td class="ps-3" onclick="addJournalRow();"><i
            class="ti ti-plus"></i></td>
    <td class="text-muted">${newSerialNumber}</td>
    <td class="p-1"><select
            class="form-select p-0 fs-6 border-0"
            placeholder="TYPE">
            <option value="0" selected="">DB</option>
            <option value="1">CR</option>
        </select></td>
    <td class="p-1 w__50">
        <input type="text" class="w__100 fs-6 border-0 text-uppercase"
            placeholder="LEDGER NAME"
            list="ledgerNameDatalist${newSerialNumber}">
        <datalist id="ledgerNameDatalist${newSerialNumber}"></datalist>
    </td>
    <td class="p-1">
        <input type="number" class="w__100 fs-6 border-0 rmvarrw"
            placeholder="AMOUNT">
    </td>
    <td class="pe-3" onclick="remove_row_from_table(this,()=>{ 
    calculateDBCRtotal();})"><i class="ti ti-minus tf"></i></td>
      </tr>`;

  $("#journalsDetailsTableTbody").append(row);

  //Mini function for invoice
  miniFetchJournals("ledgerNameDatalist" + newSerialNumber);
};

// Fetch all invoices according to creditor then select also calc totals/footer
miniFetchJournals = (datalistId) => {
  base_url = "/api/journal/ledger/get-all-data";
  custom_ajax_gFunction(base_url)
    .then((data) => {
      if (data["status_type"] == "success") {
        html = "";
        for (i = 0; i < data["dbdata"]["ledger_id"].length; i++) {
          const ledger_id = data["dbdata"]["ledger_id"][i];
          const ledger_name = data["dbdata"]["ledger_name"][i];
          html += `
            <option value="${ledger_name}"/>`;
        }
        $("#" + datalistId).html(html);
        //   Work on here
        // Attach event listener to stock name input field
        $('input[placeholder="INVOICE NO"]').on("change", function () {
          const selectedStockName = $(this).val();
          //   const selectedIndex = data["dbdata"]["invoice_details_id"].indexOf(selectedStockName);
          const selectedIndex = data["dbdata"]["invoice_details_id"]
            .map((item) => Number(item)) // Convert elements to numbers
            .indexOf(Number(selectedStockName)); // Convert selectedStockName to number

          if (selectedIndex !== -1) {
            const invDate = data["dbdata"]["invoice_date"][selectedIndex];
            const netAmount =
              parseFloat(data["dbdata"]["net_amount"][selectedIndex]) || 0;
            const invAmount =
              parseFloat(data["dbdata"]["invoice_amount"][selectedIndex]) || 0;
            const tds = parseFloat($("#tds").val()) || 0;
            const tdsAmount = (tds * netAmount) / 100;
            const tSettleAmount = invAmount - tdsAmount;

            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 1)
              .find('input[placeholder="INVOICE DATE"]')
              .val(invDate);
            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 2)
              .find('input[placeholder="NET AMOUNT"]')
              .val(netAmount);
            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 3)
              .find('input[placeholder="INVOICE AMOUNT"]')
              .val(invAmount);
            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 4)
              .find('input[placeholder="TDS AMOUNT"]')
              .val(tdsAmount);
            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 6)
              .find('input[placeholder="TOTAL SETTLEMENT AMOUNT"]')
              .val(tSettleAmount);
            $(this)
              .closest("tr")
              .find("td")
              .eq($(this).parent().index() + 7)
              .find('input[placeholder="AMOUNT RECEIVED"]')
              .val(tSettleAmount);
            // After this you can calculate totals/footer
            calculateReceiptTotal();
            calculateFooterTotals(
              "invoicesDetailsTableTbody",
              ["TOTAL SETTLEMENT AMOUNT", "AMOUNT RECEIVED"],
              [8, 9]
            );
          }
        });
      } else {
        toaster(data.status_type, data.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

calculateDBCRtotal = () => {
  var totalDBamount = 0;
  var totalCRamount = 0;

  // Calculate Total Amount for Debit and Credit
  $("#journalsDetailsTableTbody tr").each(function () {
    var amount =
      parseFloat($(this).find("input[placeholder='AMOUNT']").val()) || 0;
    var dbOrCr = $(this).find("select").val(); // Assuming there is a select element to choose between DB and CR

    if (dbOrCr === "0") {
      totalDBamount += amount;
    } else if (dbOrCr === "1") {
      totalCRamount += amount;
    }
  });
  console.log(totalCRamount, totalCRamount);
  // Update the values in the corresponding td elements
  $("#total_debit_amount").text(totalDBamount.toFixed(2));
  $("#total_credit_amount").text(totalCRamount.toFixed(2));
};

populateLastRowWithDataJournal = (data, tableId, len, currentIndex) => {
  console.log(data);
  const lastRow = $("#journalsDetailsTableTbody tr:last");
  const dataVal = data.journal_particulars;

  lastRow.find("select[placeholder='TYPE']").val(dataVal.db_cr[currentIndex]);
  lastRow
    .find("input[placeholder='LEDGER NAME']")
    .val(dataVal.ledger_name[currentIndex]);
  lastRow.find("input[placeholder='AMOUNT']").val(dataVal.amount[currentIndex]);

  currentIndex += 1;
  calculateDBCRtotal();
  if (currentIndex < len) {
    addJournalRow();
    populateLastRowWithDataJournal(data, tableId, len, currentIndex);
  } else return;
};
