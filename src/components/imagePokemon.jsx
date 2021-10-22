import { useState } from "react";
import { Card, Button, Placeholder, Spinner } from "react-bootstrap";

const ImagePokemon = ({ callback, index, element }) => {
  const [status, setStatus] = useState({ card1: "block", card2: "none" });

  const changeSrc = () => {
    setStatus({ card1: "none", card2: "block" });
    console.log("loaded");
  };

  return (
    <>
      <Card style={{ width: "18rem", margin: 20, display: status.card1 }}>
        <Spinner
          animation="border"
          role="status"
          style={{
            width: "13rem",
            height: "13rem",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>

      <Card
        //data-aos="fade-right"

        style={{ width: "18rem", margin: 20, display: status.card2 }}
      >
        <Card.Img
          alt=""
          variant="top"
          onLoad={changeSrc}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`}
        />
        <Card.Body>
          <Card.Title>{element.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button onClick={() => callback(index + 1)} variant="primary">
            Caratteristiche
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
export default ImagePokemon;
