import React, { useState, useEffect, useLayoutEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../../css/transition.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons, fetchSelectedPokemon } from "../../../actions/fetchs";
import ImagePokemon from "../../../components/imagePokemon";

//import gandalf from "./../../../images/memory/gandalf.jpg";
import {
  // Card,
  Button,
  Modal,
  Table,
  OverlayTrigger,
  Popover,
  // Placeholder,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
// eslint-disable-next-line
import Aos from "aos";

//const { innerWidth: width, innerHeight: height } = window;
let height = 1000;
const Cube3 = () => {
  var body = document.body,
    html = document.documentElement;

  const updateHeightScroll = () => {
    height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  };

  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(10);
  //const pokemons = useSelector((state) => state.reducerPokemon);
  const pokemons = useSelector((state) => state.setPokemonsReducer);
  const selectedPokemon = useSelector(
    (state) => state.selectedPokemonSliceReducer
  );

  const dispatch = useDispatch();
  const [selectedAbilityPokemon, setSelectedAbilityPokemon] = useState("");

  // const fetchUsers = () => {
  //   dispatch(fetchUsersRequest());
  //   return function (dispatch) {
  //     axios
  //       .get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
  //       .then((response) => {
  //         response
  //       })
  //       .catch((error) => {
  //         error)
  //       });
  //   };
  // };

  // function getPokemonApi(index) {
  //   try {
  //     return new Promise((resolve) => {
  //       axios.get(url + "pokemon/" + index).then((res) => {
  //         resolve(res.data);
  //       });
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setShow(true);
    dispatch(fetchSelectedPokemon(index));
  };

  // eslint-disable-next-line
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function handleResize() {
    setWindowDimensions(getWindowDimensions().height);
    // updatePokemonsOnScroll();
    asyncCallgetPokemonByLimitApi(0);
  }
  console.log("action:", pokemons);

  useLayoutEffect(() => {
    // console.log("limit:", limit);

    window.addEventListener("scroll", handleResize);
    return () => window.removeEventListener("scroll", handleResize);
  });

  // function updatePokemonsOnScroll() {
  //   console.log(
  //     "height:",
  //     height - getWindowDimensions().height,
  //     "window:",
  //     window.pageYOffset,
  //     "limit:",
  //     limit
  //   );
  // }

  function getPokemonAbility(url) {
    try {
      return new Promise((resolve) => {
        axios.get(url).then((res) => {
          resolve(res.data.effect_entries[1].effect);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function asyncCallgetPokemonByLimitApi(start) {
    if (height - getWindowDimensions().height <= window.pageYOffset) {
      if (pokemons.length > limit) {
        setLimit(limit + 10);
        return;
      }
      setLimit(limit + 10);
      updateHeightScroll();
      // console.log("height", height);
      //console.log("wundow", window.pageYOffset);
      console.log("limit", limit);
    } else {
      if (start === 0) {
        return;
      }
      // console.log("inside2");
    }
    dispatch(fetchPokemons(limit));
    console.log("fetch");
  }

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    if (pokemons.length > limit) return;
    dispatch(fetchPokemons(limit));

    // eslint-disable-next-line
  }, []);

  async function changePopover(url) {
    setSelectedAbilityPokemon(
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

    const result = await getPokemonAbility(url);
    setSelectedAbilityPokemon(result);
  }
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{selectedPokemon.name}</Popover.Header>
      <Popover.Body>{selectedAbilityPokemon}</Popover.Body>
    </Popover>
  );

  return (
    <>
      <Link to="/pokemon">
        <Button style={{ marginRight: 10 }} variant="primary">
          Visione a carousel 3D
        </Button>
      </Link>
      <TransitionGroup
        style={{ display: "grid", gridTemplateColumns: "auto auto auto auto" }}
      >
        {pokemons.map((element, index) => {
          return (
            <CSSTransition
              key={index}
              //something unique to the element being transitioned
              classNames="transition"
              timeout={1000}
            >
              <ImagePokemon
                index={index}
                callback={handleShow}
                element={element}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="center"> {selectedPokemon.name}</h4>
          <p>
            <span style={{ fontWeight: "bold" }}>Altezza:</span>
            {selectedPokemon.height}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Larghezza:</span>
            {selectedPokemon.weight}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Esperienza di base: </span>
            {selectedPokemon.base_experience}
          </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Abilità</th>
                <th>Nascosta</th>
                <th>Slot</th>
              </tr>
            </thead>
            <tbody>
              {selectedPokemon.abilities.map((singleAbility) => {
                let hidden = singleAbility.is_hidden === true ? "Sì" : "No";
                return (
                  <tr>
                    <td>
                      <OverlayTrigger
                        trigger="click"
                        placement="right"
                        overlay={popover}
                      >
                        <Button
                          variant="success"
                          onClick={() =>
                            changePopover(singleAbility.ability.url)
                          }
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          {singleAbility.ability.name}
                        </Button>
                      </OverlayTrigger>
                    </td>
                    <td>{hidden}</td>
                    <td>{singleAbility.slot}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cube3;
