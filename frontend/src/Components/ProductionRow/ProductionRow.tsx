import React from 'react';
import { ProductionDto } from '../../types';

interface ProductionRowProps {
  production: ProductionDto;
  listNr: number;
}

function ProductionRow({ production, listNr }: ProductionRowProps) {
  const getTicketsLink = (production: ProductionDto) => {
    return production.dates.find(
      (d) => String(d.date) === (document.getElementById('date-time') as HTMLInputElement).value
    )?.tickets;
  };

  return (
    <>
      <tr>
        <td>{listNr}</td>
        <td>
          <a href={production.link} target="_blank">
            {production.title}
          </a>
        </td>
        <td>{production.place}</td>
        <td>
          <a href={getTicketsLink(production)} target="_blank">
            {getTicketsLink(production)}
          </a>
        </td>
      </tr>
    </>
  );
}

export default ProductionRow;
