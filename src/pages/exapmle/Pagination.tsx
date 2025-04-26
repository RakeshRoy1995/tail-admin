import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function DataTable({ allData, col, view }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedData = [...allData].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  console.log(`currentItems`, currentItems);

  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const StatusBadge = ({ status }: { status: any }) => {
    let className = "badge rounded-pill px-3 ";
    switch (status) {
      case "1":
        className += "bg-success-subtle text-success-emphasis";
        break;
      case "0":
        className += "bg-warning-subtle text-warning-emphasis";
        break;
      case "Overdue":
        className += "bg-danger-subtle text-danger-emphasis";
        break;
      default:
        className += "bg-secondary-subtle text-secondary-emphasis";
    }
    return (
      <span className={className}>{status == 1 ? "active" : "inactive"}</span>
    );
  };

  return (
    <div className="card shadow-sm border-0 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Invoices</h2>
        <div>
          <label className="me-2 small fw-semibold">Show:</label>
          <select
            className="form-select form-select-sm w-auto d-inline"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 15, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle rounded overflow-hidden">
          <thead className="table-light">
            <tr className="text-uppercase small text-muted">
              {col.map((item: any, index) => (
                <>
                  {item.name !== "id" && (
                    <th
                      role="button"
                      onClick={() => handleSort(item.name)}
                      key={index}
                    >
                      {item.label} <ArrowUpDown size={14} className="ms-1" />
                    </th>
                  )}
                </>
              ))}
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                {col.map((colItem: any, index) => (
                  <>
                    {colItem.name !== "id" && (
                      <td key={index}>
                        {colItem.name !== "status" && item[colItem.name]}

                        {colItem.name == "status" && (
                          <StatusBadge status={item[colItem.name]} />
                        )}
                      </td>
                    )}

                    {index == col.length -1 && (
                      <td className="text-center">
                        <div className="btn-group" role="group">
                          <button
                            type="button"
                            onClick={(e) => view(item)}
                            className="btn btn-sm btn-light border"
                            data-bs-toggle="tooltip"
                            title="View"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => view(item , "update")}
                            className="btn btn-sm btn-light border"
                            data-bs-toggle="tooltip"
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => view(item , "delete")}
                            className="btn btn-sm btn-light border text-danger"
                            data-bs-toggle="tooltip"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    )}
                  </>
                ))}
                {/* <td>{item.id}</td>
                <td>
                  <div className="fw-semibold">{item.customer}</div>
                  <div className="text-muted small">{item.email}</div>
                </td>
                <td>{formatCurrency(item.amount)}</td>
                <td>
                  <StatusBadge status={item.status} />
                </td> */}
                {/* <td className="text-muted">{formatDate(item.date)}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted small">
          Showing <strong>{indexOfFirstItem + 1}</strong> to{" "}
          <strong>{Math.min(indexOfLastItem, allData.length)}</strong> of{" "}
          <strong>{allData.length}</strong> results
        </div>
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
              >
                <ChevronLeft size={16} />
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${currentPage === number ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
