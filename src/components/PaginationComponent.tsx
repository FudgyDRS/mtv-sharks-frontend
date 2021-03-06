import { useEffect, useState } from "react";
import { SimpleGrid, Button } from '@chakra-ui/react';

import { SharkObject } from "../models/MTV Sharks/SharkObject";
import GenerateCard from "./GenerateCard";
import "../styles/pagination.scss";

const renderData = (data: SharkObject[]) => {
  return (
    <SimpleGrid columns={5} spacing={10}>{data.map((todo: any, index: any) => {
      return <li key={index} className="item"><GenerateCard sharkObject = {data[index]} /></li>;
    })}</SimpleGrid>
  );
};

///@Dev - Only create a grid of paginated card objects given inputted data of type SharkObject[]
interface Props { sharkObjects: SharkObject[]; }
function PaginationComponent({ sharkObjects }: Props) {
  const [data, setData] = useState<SharkObject[]>([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) { pages.push(i); }

  const indexOfLastItem = currentPage*itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  useEffect(() => { setData(sharkObjects); }, []);
  const handleClick = (event: any) => { setcurrentPage(Number(event.target.id)); };
  
  const renderPageNumbers = pages.map((number: any) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (<li key={number} id={number} onClick={handleClick} className={currentPage == number ? "active" : undefined} > {number} </li>);
    } else { return undefined; }
  });
  
    const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  
  let pageIncrementBtn = null;
  let pageDecrementBtn = null;
  if (pages.length > maxPageNumberLimit) { pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>; }
  if (minPageNumberLimit >= 1)           { pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>; }

  return (
    <>
      {renderData(currentItems)}

      <ul className="pageNumbers">
        <li><Button onClick={handlePrevbtn} disabled={currentPage == pages[0] ? true : false} > Prev </Button></li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li><Button onClick={handleNextbtn} disabled={currentPage == pages[pages.length - 1] ? true : false} > Next </Button></li>
      </ul>
   
    </>
  );
}

export default PaginationComponent;
