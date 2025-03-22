import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const ShowOutput = ({ setoutPutQues, output, outPutQues }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-10 mt-5">
      <div className="row ">
        <div className="col-4 card text-left">
          {output?.map((out_data: any) => (
            <div
              className="card-header"
              style={{ textAlign: "left" }}
              id="headingOne"
              onClick={(e) => setoutPutQues(out_data)}
            >
              <h5 className="mb-0">{out_data[0].block_name}</h5>
            </div>
          ))}
        </div>
        <div className="col-8">
          <div>
            {outPutQues.map((d: any, k: number) => (
              <>
                {k == 0 ? (
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <Typography component="span">{d.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        className="card-body"
                        style={{ textAlign: "left" }}
                        dangerouslySetInnerHTML={{
                          __html: d?.aiReply,
                        }}
                      ></div>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <Typography component="span">{d.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div
                        className="card-body"
                        dangerouslySetInnerHTML={{
                          __html: d?.aiReply,
                        }}
                      ></div>
                    </AccordionDetails>
                  </Accordion>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOutput;
