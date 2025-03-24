import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Admin() {
  const parentAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const childHoverAnimation = {
    whileHover: { scale: 1.1, transition: { duration: 0.3 } },
  };
  return (
    <motion.div
      className="col-lg-9 col-md-9 right-panel-wrap"
      variants={parentAnimation}
      initial="hidden"
      animate="visible"
    >
      <div className="row ">
        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <a href="#">
              <img src="asset/assets/img/img1.png" alt="" />
              <p>Knowledge Base</p>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <a href="#">
              <img src="asset/assets/img/img2.png" alt="" />
              <p>CASE LIBRARY</p>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <Link to="/phase-overview">
              <img src="asset/assets/img/img3.png" alt="" />
              <p>PHASE OVERVIEW</p>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <a href="#">
              <img src="asset/assets/img/img4.png" alt="" />
              <p>PROMPT LIBRARY</p>
            </a>
          </div>
        </motion.div>
      </div>
      <div className="row ">
        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <Link to="/phase-output">
              <img src="asset/assets/img/img5.png" alt="" />
              <p>PHASE OUTPUTS</p>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <Link to="/block-output">
              <img src="asset/assets/img/img6.png" alt="" />
              <p>BLOCK OUTPUTS</p>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <a href="#">
              <img src="asset/assets/img/img7.png" alt="" />
              <p>TASK PROGRESS</p>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <a href="#">
              <img src="asset/assets/img/img8.png" alt="" />
              <p>AI MODEL MGMT</p>
            </a>
          </div>
        </motion.div>
      </div>
      <div className="row ">
        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <a href="#">
              <img src="asset/assets/img/img9.png" alt="" />
              <p>DISCONNECT PHASE / BLOCKS</p>
            </a>
          </div>
        </motion.div>
        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <a href="#">
              <img src="asset/assets/img/img10.png" alt="" />
              <p>SUMMARY OUTPUT</p>
            </a>
          </div>
        </motion.div>
        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <a href="#">
              <img src="asset/assets/img/img11.png" alt="" />
              <p>SECTORAL TAGS</p>
            </a>
          </div>
        </motion.div>
        <motion.div
          className="col-md-3 col-sm-3 col-6"
          {...childHoverAnimation}
        >
          <div className="icon-box">
            <a href="#">
              <img src="asset/assets/img/img12.png" alt="" />
              <p>RUN PROJECT</p>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
