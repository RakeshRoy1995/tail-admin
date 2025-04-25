import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function DataTable() {
  const allData = [
    {
      id: "INV001",
      customer: "John Doe",
      email: "john@example.com",
      amount: 1200,
      status: "Paid",
      date: "2024-03-12",
    },
    {
      id: "INV002",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: 850,
      status: "Pending",
      date: "2024-03-15",
    },
    {
      id: "INV003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: 980,
      status: "Overdue",
      date: "2024-03-20",
    },
    {
      id: "INV004",
      customer: "Alice Brown",
      email: "alice@example.com",
      amount: 750,
      status: "Paid",
      date: "2024-03-22",
    },
    {
      id: "INV005",
      customer: "Michael Green",
      email: "michael@example.com",
      amount: 1100,
      status: "Pending",
      date: "2024-03-25",
    },
    {
      id: "INV006",
      customer: "David Lee",
      email: "david@example.com",
      amount: 930,
      status: "Overdue",
      date: "2024-03-27",
    },
    {
      id: "INV007",
      customer: "Laura White",
      email: "laura@example.com",
      amount: 1400,
      status: "Paid",
      date: "2024-03-29",
    },
    {
      id: "INV008",
      customer: "Kevin Black",
      email: "kevin@example.com",
      amount: 670,
      status: "Pending",
      date: "2024-04-01",
    },
    {
      id: "INV009",
      customer: "Sophie Red",
      email: "sophie@example.com",
      amount: 1550,
      status: "Paid",
      date: "2024-04-03",
    },
    {
      id: "INV010",
      customer: "Tom Blue",
      email: "tom@example.com",
      amount: 820,
      status: "Overdue",
      date: "2024-04-05",
    },
    {
      id: "INV011",
      customer: "Emma Green",
      email: "emma@example.com",
      amount: 940,
      status: "Pending",
      date: "2024-04-07",
    },
    {
      id: "INV012",
      customer: "Liam Grey",
      email: "liam@example.com",
      amount: 1210,
      status: "Paid",
      date: "2024-04-10",
    },
    {
      id: "INV013",
      customer: "Mia Yellow",
      email: "mia@example.com",
      amount: 890,
      status: "Pending",
      date: "2024-04-12",
    },
    {
      id: "INV014",
      customer: "Noah Pink",
      email: "noah@example.com",
      amount: 1340,
      status: "Overdue",
      date: "2024-04-14",
    },
    {
      id: "INV015",
      customer: "Olivia Purple",
      email: "olivia@example.com",
      amount: 1020,
      status: "Paid",
      date: "2024-04-16",
    },
  ];

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    let className = "badge rounded-pill px-3 ";
    switch (status) {
      case "Paid":
        className += "bg-success-subtle text-success-emphasis";
        break;
      case "Pending":
        className += "bg-warning-subtle text-warning-emphasis";
        break;
      case "Overdue":
        className += "bg-danger-subtle text-danger-emphasis";
        break;
      default:
        className += "bg-secondary-subtle text-secondary-emphasis";
    }
    return <span className={className}>{status}</span>;
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
              <th role="button" onClick={() => handleSort("id")}>
                Invoice <ArrowUpDown size={14} className="ms-1" />
              </th>
              <th role="button" onClick={() => handleSort("customer")}>
                Customer <ArrowUpDown size={14} className="ms-1" />
              </th>
              <th role="button" onClick={() => handleSort("amount")}>
                Amount <ArrowUpDown size={14} className="ms-1" />
              </th>
              <th role="button" onClick={() => handleSort("status")}>
                Status <ArrowUpDown size={14} className="ms-1" />
              </th>
              <th role="button" onClick={() => handleSort("date")}>
                Date <ArrowUpDown size={14} className="ms-1" />
              </th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <div className="fw-semibold">{item.customer}</div>
                  <div className="text-muted small">{item.email}</div>
                </td>
                <td>{formatCurrency(item.amount)}</td>
                <td>
                  <StatusBadge status={item.status} />
                </td>
                <td className="text-muted">{formatDate(item.date)}</td>
                <td className="text-center">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-sm btn-light border"
                      data-bs-toggle="tooltip"
                      title="View"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-light border"
                      data-bs-toggle="tooltip"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-light border text-danger"
                      data-bs-toggle="tooltip"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
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
