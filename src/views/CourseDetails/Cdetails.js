import React from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Badge,
  Progress,
  ListGroup,
  ListGroupItem,
  Button,
  UncontrolledCollapse
} from "reactstrap";

const Cdetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const subject = location.state?.subject; // get the subject data passed from MySubjects

  if (!subject) {
    return <p className="text-center mt-5">No course data found.</p>;
  }

  const units = [
    { id: 1, name: "Unit 1", chapters: ["Chapter 1", "Chapter 2", "Chapter 3"] },
    { id: 2, name: "Unit 2", chapters: ["Chapter 4", "Chapter 5", "Chapter 6"] },
    { id: 3, name: "Unit 3", chapters: ["Chapter 7", "Chapter 8", "Chapter 9"] },
    { id: 4, name: "Unit 4", chapters: ["Chapter 10", "Chapter 11", "Chapter 12"] },
  ];

  return (
    <Container className="my-4">
      <Row>
        {/* Left Side */}
        <Col md="8">
          <video width="100%" height="400" controls>
            <source src={subject.videoUrl} type="video/mp4" />
          </video>
          <h2 className="mt-3">{subject.name}</h2>
          <p className="text-muted">
            {subject.category} - {subject.level}
          </p>
          <Badge color="danger" pill>
            {subject.category}
          </Badge>
          <p className="mt-3">{subject.description}</p>
        </Col>

        <Col md="4">
          <div className="border rounded p-3 shadow-sm">
            <h5>Course Content</h5>
            <Progress value={subject.progress} className="mb-2" />
            <small>{subject.progress}% completed</small>

            <ListGroup className="mt-3">
              {units.map((unit) => (
                <div key={unit.id} className="mb-2">
                  {/* Unit Toggle */}
                  <ListGroupItem
                    id={`toggle${unit.id}`}
                    action
                    tag="button"
                    className="text-start fw-bold"
                  >
                    {unit.name}
                  </ListGroupItem>

                  {/* Collapsible Chapters */}
                  <UncontrolledCollapse toggler={`#toggle${unit.id}`}>
                    <ListGroup flush>
                      {unit.chapters.map((chapter, idx) => (
                        <ListGroupItem key={idx} className="ps-4">
                          {chapter}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </UncontrolledCollapse>
                </div>
              ))}
            </ListGroup>

            {/* <Button color="primary" className="w-100 mt-3">
              Buy Now
            </Button> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cdetails;
