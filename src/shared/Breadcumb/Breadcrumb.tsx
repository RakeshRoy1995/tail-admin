import { Link as RouterLink, useNavigate } from "react-router-dom";

const Breadcrumb = ({ name1, name2, date }: any) => {

  const navigate = useNavigate();
  return (
    <div className="row row-top-bar">
      <div className="col-lg-6 col-md-6 col-6">
        <p>
          <span onClick={(e:any)=> navigate("/admin") } style={{cursor:"pointer"}}>{name1}</span>
          <span className="divider">
            <img src="asset/assets/img/divider.png" alt="" />
          </span>
          <span>{name2.replace("-" , " ").replace("/", "").toUpperCase()}</span>
        </p>
      </div>
      <div className="col-lg-6  col-md-6 col-6">
        <div className="date-wrap">
          <p>
            <span>Today: </span>
            <span className="date"> {date}</span>
          </p>
          <a href="#">
            <img src="asset/assets/img/File-icon.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
