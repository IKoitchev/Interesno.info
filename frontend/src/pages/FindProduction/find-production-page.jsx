import { React } from 'react';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/Navbar/NavBar';
import ProductionRow from '../../Components/ProductionRow/production-row';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../util/BaseApi';
import Table from 'react-bootstrap/Table';

function FindProductionPage() {
  const [productions, setProductions] = useState();

  const onDateSelected = () => {
    const date = document.getElementById('date-time').value;
    getProductions(date);
  };

  const getProductions = (date) => {
    axios.get(`${BASE_URL}/productions`).then((res) => {
      console.log(res.data);
      setProductions(filterProductionsByDate(res.data, date));
    });
  };
  const getTicketsLink = (production) => {
    return production.dates.find(
      (d) => d.date === document.getElementById('date-time').value
    ).tickets;
  };
  const filterProductionsByDate = (productions, date) => {
    const result = [];
    productions.forEach((p) => {
      p.dates.forEach((dateObj) => {
        if (dateObj.date === date) {
          result.push(p);
          console.log(date);
        }
      });
    });
    return result;
  };
  return (
    <>
      <Header />
      <NavBar />
      <div className="">
        <div className="row">
          <div className="col-md-3">
            <Form.Group>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                id="date-time"
                placeholder="Date of Birth"
                onChange={onDateSelected}
              />
            </Form.Group>
          </div>
        </div>
        {!productions ? (
          <>No productions found</>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Place</th>
                  <th>Tickets</th>
                </tr>
              </thead>
              <tbody>
                {productions.map((p, i) => {
                  // TO-DO: maybe create a seperate component for productions
                  return (
                    // <>
                    //   <tr key={i}>
                    //     <td>{i}</td>
                    //     <td>
                    //       <a href={p.link} target="_blank">
                    //         {p.title}
                    //       </a>
                    //     </td>
                    //     <td>{p.place}</td>
                    //     <td>
                    //       <a href={getTicketsLink(p)} target="_blank">
                    //         {getTicketsLink(p)}
                    //       </a>
                    //     </td>
                    //   </tr>
                    // </>
                    <ProductionRow production={p} key={i} listNr={i + 1} />
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </>
  );
}

export default FindProductionPage;
