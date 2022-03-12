import { Box, Text, Circle } from "@chakra-ui/react";

type Props = { input: any };
export default function StatusCircl({input}: Props) {
   switch(input) {
      case 0: { return(<Box className="status-box"><Text color="blue">Idle </Text><div className="status-circle0"><Circle bg="blue"size="10px"/></div></Box>) }
      case 1: { return(<Box className="status-box"><Text color="green" as='cite'>For Sale </Text><div className="status-circle1"><Circle  bg="green"size="10px"/></div></Box>) }
      case 2: { return(<Box className="status-box"><Text color="yellow">In Auction </Text><div className="status-circle2"><Circle  bg="yellow"size="10px"/></div></Box>) }
      case 3: { return(<Box className="status-box"><Text color="red">Closed </Text><div className="status-circle3"><Circle bg="red"size="10px"/></div></Box>) }
      case 4: { return(<Box className="status-box"><Text color="red">Owner </Text><div className="status-circle3"><Circle bg="purple"size="10px"/></div></Box>) }
      default: { return(<Box className="status-box"><Text color="gray">loading... </Text><div className="status-circle-load"><Circle  bg="gray"size="10px"/></div></Box>) }
   } 
}

// gray     - loading
// blue     - idle
// green    - for sale
// yellow   - in auction
// red      - claim waiting / reject all offers
// purple   - owner
