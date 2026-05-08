// This is a submit function
findReportData = (elem) => {
  var views_reports_page_pretitle = "<p>View</p>";
  var views_reports_page_title = `<p class="text-capitalize">${elem}</p>`;
  var views_reports_page_button = `<div class="btn-list">
        <a href="javascript:;" class="btn btn-github d-none d-sm-inline-block" onclick="tableToCSV('reportsTable')">
          <i class="ti ti-arrow-down"></i>
          Download CSV
        </a>
        <a href="javascript:;" class="btn btn-github d-sm-none btn-icon" aria-label="Download CSV" onclick="tableToCSV('reportsTable')">
          <i class="ti ti-arrow-down"></i>
        </a>
      </div>`;
  var views_reports_page_body = `<div class="container-xl">
  <div class="row g-2 align-items-center mb-3">
      <div class="col">
          <div class="input-group">
              <span class="input-group-text">
                  Start Date <i class="ti ti-calendar-search"></i>
              </span>
              <input type="date" class="form-control" placeholder="from" id="start_date" name="start_date" autocomplete="off">
          </div>
      </div>
      <div class="col-auto">—</div>
      <div class="col">
          <div class="input-group">
              <span class="input-group-text">
                  End Date <i class="ti ti-calendar-search"></i>
              </span>
              <input type="date" class="form-control" placeholder="to" id="end_date" name="end_date" autocomplete="off">
          </div>
      </div>
      <div class="col">
          <a href="javascript:;" class="btn btn-primary w-100" onclick="renderTableData('${elem}');">
              <i class="ti ti-search"></i>
              Search
          </a>
      </div>
  </div>
  <div class="row row-deck row-cards">
      <div class="col-12">
          <div class="card p-2">
              <div class="table-responsive p-1">
                  <table class="table card-table text-nowrap" id="reportsTable">
                      <thead>
                      </thead>
                      <tbody>
                      </tbody>
                      <tfoot>
                      </tfoot>
                  </table>
              </div>
          </div>
      </div>
  </div>
</div>`;
  $("#main-content .page-pretitle").empty().html(views_reports_page_pretitle);
  $("#main-content .page-title").empty().html(views_reports_page_title);
  $("#main-content .page-button").empty().html(views_reports_page_button);
  $("#main-content .page-body").empty().html(views_reports_page_body);
  // Check elem type and call header function accordingly
  updateTableHeaders(elem);
  // Call api to fetch data then create a dynamic tbody data and insert
  // renderTableData(elem);
};

// Update table header
updateTableHeaders = (reportType) => {
  const headers = getTableHeaders(reportType);
  const thead = document.querySelector("#reportsTable thead");
  thead.innerHTML = ""; // Clear existing headers

  const headerRow = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
};

// Get table header according to type
getTableHeaders = (reportType) => {
  switch (reportType) {
    case "taxInvoice":
      return [
        "Invoice No",
        "Invoice Date",
        "Customer Name",
        "Customer Address",
        "Customer Contact No",
        "Customer Email",
        "Customer GSTIN",
        "Ship to Party",
        "Ship to Party Address",
        "Ship to Party Contact No",
        "Mode of Purchase",
        "Transport Mode",
        "Vehicle No",
        "Date of Supply",
        "Place of Supply",
        "Subtotal",
        "IGST",
        "CGST",
        "SGST",
        "Reverse Charge",
        "Total",
      ];
    case "purchase":
      return [
        "SL.NO",
        "Purchase Date",
        "Dispatched Through",
        "Destination",
        "Bill of Landing/LR-RR No",
        "Bill of Landing/LR-RR Date",
        "Bill of Entry No",
        "Customer Name",
        "Customer Address",
        "Contact No",
        "Email",
        "GSTIN",
        "Total",
      ];
    case "creditnote":
      return [
        "SL.NO",
        "Return Date",
        "Customer Name",
        "Customer Address",
        "Contact No",
        "Email",
        "GSTIN",
        "Return Amount",
      ];
    case "debitnote":
      return [
        "SL.NO",
        "Return Date",
        "Customer Name",
        "Customer Address",
        "Contact No",
        "Email",
        "GSTIN",
        "Return Amount",
      ];
    case "receipt":
      return [
        "SL.NO",
        "Date",
        "Customer Name",
        "Customer Address",
        "Contact No",
        "Email",
        "GSTIN",
        "Payment Mode",
        "TDS(%)",
        "Invoice Amount",
        "Receipt Amount",
      ];
    case "payment":
      return [
        "SL.NO",
        "Date",
        "Customer Name",
        "Customer Address",
        "Contact No",
        "Email",
        "GSTIN",
        "Payment Mode",
        "Paymnet Amount",
      ];
    default:
      return [];
  }
};

// Render table tbody for multiple data
renderTableData = (reportType) => {
  const startDate = $("#start_date").val();
  const endDate = $("#end_date").val();
  if (startDate && endDate && (startDate <= endDate)) {
    const formarray = [];
    formarray.push({ name: "report_type", value: reportType });
    formarray.push({ name: "start_date", value: $("#start_date").val() });
    formarray.push({ name: "end_date", value: $("#end_date").val() });
    console.log(formarray);

    // Define the base URL for the AJAX request
    const base_url = "/api/report/get_report";

    // Function to handle the AJAX request
    custom_ajax_iFunction(base_url, formarray)
      .then((data) => {
        // Check if the response is successful
        if (data["status_type"] === "success") {
          console.log(data);
          const reportsTableBody = document.querySelector(
            "#reportsTable tbody"
          );

          // Clear the table body before adding new data
          reportsTableBody.innerHTML = "";

          // Check the report type
          if (reportType === "taxInvoice") {
            const recordsLength = data.dbdata.invoice_no.length;
            for (let i = 0; i < recordsLength; i++) {
              const row = document.createElement("tr");

              // Define the order and keys of the data to be added to each row
              const fields = [
                "invoice_no",
                "invoice_date",
                "customer_name",
                "address",
                "phone",
                "email",
                "gstin",
                "ship_to_party",
                "ship_to_party_address",
                "ship_to_party_phone",
                "mode_of_purchase",
                "transport_mode",
                "vehicle_no",
                "date_of_supply",
                "place_of_supply",
                "subtotal",
                "igst",
                "cgst",
                "sgst",
                "reverse_charge",
                "grand_total",
              ];

              // Loop through the fields and add data to each cell
              fields.forEach((field) => {
                const cell = document.createElement("td");
                cell.textContent = data.dbdata[field][i];
                cell.classList.add("text-uppercase");
                row.appendChild(cell);
              });

              // Append the row to the table body
              reportsTableBody.appendChild(row);
            }
          } else if (reportType === "purchase") {
            const recordsLength = data.dbdata.purchase_details_id.length;
            for (let i = 0; i < recordsLength; i++) {
              const row = document.createElement("tr");

              // Define the order and keys of the data to be added to each row
              const fields = [
                "sl_no",
                "purchase_date",
                "dispatched_through",
                "destination",
                "lr_rr_no",
                "lr_rr_date",
                "bill_of_entry_no",
                "customer_name",
                "address",
                "phone",
                "email",
                "gstin",
                "total",
              ];

              // Loop through the fields and add data to each cell
              fields.forEach((field) => {
                const cell = document.createElement("td");
                cell.textContent = data.dbdata[field][i];
                cell.classList.add("text-uppercase");
                row.appendChild(cell);
              });

              // Append the row to the table body
              reportsTableBody.appendChild(row);
            }
          } else if (reportType === "creditnote") {
            const recordsLength = data.dbdata.creditnote_details_id.length;
            for (let i = 0; i < recordsLength; i++) {
              const row = document.createElement("tr");

              // Define the order and keys of the data to be added to each row
              const fields = [
                "sl_no",
                "return_date",
                "customer_name",
                "address",
                "phone",
                "email",
                "gstin",
                "total_return_amount",
              ];

              // Loop through the fields and add data to each cell
              fields.forEach((field) => {
                const cell = document.createElement("td");
                cell.textContent = data.dbdata[field][i];
                cell.classList.add("text-uppercase");
                row.appendChild(cell);
              });

              // Append the row to the table body
              reportsTableBody.appendChild(row);
            }
          } else if (reportType === "debitnote") {
            const recordsLength = data.dbdata.debitnote_details_id.length;
            for (let i = 0; i < recordsLength; i++) {
              const row = document.createElement("tr");

              // Define the order and keys of the data to be added to each row
              const fields = [
                "sl_no",
                "return_date",
                "customer_name",
                "address",
                "phone",
                "email",
                "gstin",
                "total_amount",
              ];

              // Loop through the fields and add data to each cell
              fields.forEach((field) => {
                const cell = document.createElement("td");
                cell.textContent = data.dbdata[field][i];
                cell.classList.add("text-uppercase");
                row.appendChild(cell);
              });

              // Append the row to the table body
              reportsTableBody.appendChild(row);
            }
          } else if (reportType === "payment") {
            const recordsLength = data.dbdata.payment_details_id.length;
            for (let i = 0; i < recordsLength; i++) {
              const row = document.createElement("tr");

              // Define the order and keys of the data to be added to each row
              const fields = [
                "sl_no",
                "payment_date",
                "customer_name",
                "address",
                "phone",
                "email",
                "gstin",
                "payment_mode",
                "payment_amount",
              ];

              // Loop through the fields and add data to each cell
              fields.forEach((field) => {
                const cell = document.createElement("td");
                cell.textContent = data.dbdata[field][i];
                cell.classList.add("text-uppercase");
                row.appendChild(cell);
              });

              // Append the row to the table body
              reportsTableBody.appendChild(row);
            }
          } else if (reportType === "receipt") {
            const recordsLength = data.dbdata.receipt_details_id.length;
            for (let i = 0; i < recordsLength; i++) {
              const row = document.createElement("tr");

              // Define the order and keys of the data to be added to each row
              const fields = [
                "sl_no",
                "receipt_date",
                "customer_name",
                "address",
                "phone",
                "email",
                "gstin",
                "payment_mode",
                "grand_invoice_amount",
                "tds",
                "receipt_amount",
              ];

              // Loop through the fields and add data to each cell
              fields.forEach((field) => {
                const cell = document.createElement("td");
                cell.textContent = data.dbdata[field][i];
                cell.classList.add("text-uppercase");
                row.appendChild(cell);
              });

              // Append the row to the table body
              reportsTableBody.appendChild(row);
            }
          }
        } else {
          // Handle the case where no data is found or an error occurred
          const tbody = document.querySelector("#reportsTable tbody");
          tbody.innerHTML =
            "<tr><td colspan='100%' style='text-align:center;'>No data found</td></tr>";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    toaster("warning", "Start date cannot be greater than end date.");
  }
};
