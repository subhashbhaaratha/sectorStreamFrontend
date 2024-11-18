import React from "react";
import Card from "react-bootstrap/Card";
import { FaInfoCircle } from "react-icons/fa"; // Import an icon
import { CURRENT_API } from "../utils/utils";

const CustomCard = ({
  cardName,
  cardImage,
  solutionNumber,
  solutionName,
  clickable,
  onClick,
}) => {
  console.log("cardImage", cardImage);
  const imageUrl = `${CURRENT_API}${cardImage}`;

  return (
    <Card
      style={{
        width: "22rem",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: clickable && "pointer",
        position: "relative",
      }}
      onClick={clickable ? onClick : undefined}
    >
      <Card.Img
        variant="top"
        src={imageUrl}
        style={{ width: "70px", marginTop: "20px" }}
      />
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Title className="text-center">{cardName}</Card.Title>
        <Card.Text className="text-center">
          {solutionNumber}
          <span style={{ marginLeft: "5px" }}>{solutionName}</span>
        </Card.Text>
        {clickable && (
          <FaInfoCircle
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              fontSize: "1.5rem",
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
