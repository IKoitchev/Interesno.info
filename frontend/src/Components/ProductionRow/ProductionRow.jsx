import React from 'react';

function ProductionRow({ production, listNr }) {
  const getTicketsLink = (production) => {
    return production.dates.find(
      (d) => d.date === document.getElementById('date-time').value
    ).tickets;
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
