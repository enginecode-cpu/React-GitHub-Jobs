import React, { useState } from "react";
import { Card, Badge, Button, Collapse } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

function Job({ job }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} -{" "}
              <span className="text-muted font-weight-light">
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-1">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="secondary" className="type mr-2">
              {job.type}
            </Badge>
            <Badge variant="secondary" className="location">
              {job.location}
            </Badge>
            <div
              style={{
                wordBreak: "break-all",
                fontSize: "40%",
              }}
            >
              <ReactMarkdown source={job.how_to_apply} />
            </div>
          </div>
          <img
            className="d-none d-md-block"
            height="50"
            src={job.company_logo}
            alt={job.company}
          />
        </div>
        <Card.Text>
          <Button variant="primary" onClick={handleClick}>
            {!open ? "View Detail" : "Hide Detail"}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="detail-content mt-4">
            <ReactMarkdown source={job.description} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}

export default Job;
