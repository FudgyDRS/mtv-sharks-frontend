import { SharkObject } from "../models/MTV Sharks/SharkObject";
import { Card, } from "react-bootstrap";
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import { OwnerOf, } from "../abi/mtvSharks";
import { useEthers } from "../modules/usedapp2/hooks";

import StatusCircle from "./StatusCircle";
// import market functions

import NftModal from "./NftModal";
import "@fontsource/inter";


interface Props { sharkObject?: SharkObject; }
function GenerateCard({sharkObject}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { account } = useEthers();
  let ownerOf;
  ownerOf = account ? OwnerOf(String(sharkObject!["custom_fields"].edition-1)) : undefined;
  ownerOf = ownerOf ? ownerOf.slice(0, 6) + "..." + ownerOf.slice(ownerOf.length - 4, ownerOf.length) : "";
  return sharkObject ? (
    <>
      <Button onClick={onOpen}>
        <Card className="generic-card" style={{ width: '200px' }}>
        {/* <NftModal isOpen={isOpen} onClose={onClose} sharkObject={sharkObject} /> */}
          <Card.Text className="card-status"><StatusCircle input={1}/></Card.Text>
          <Card.Img variant="top" src={require("../assets/compressed/" + sharkObject["custom_fields"].edition + ".png").default} />
          <Card.Body>
            <Card.Title>{sharkObject.name}</Card.Title>
            <Card.Text color="black" >Owner:<br/>{ownerOf}</Card.Text>
          </Card.Body>
        </Card>
      </Button>
      <NftModal isOpen={isOpen} onClose={onClose} sharkObject={sharkObject}/>
      </>
  ) : (
    <Box>
      {`${console.log("GenerateCard failed: ", sharkObject)}`}
    </Box>
  );
}

export default GenerateCard;
