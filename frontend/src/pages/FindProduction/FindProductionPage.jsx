import { React } from 'react';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/Navbar/NavBar';
import ProductionRow from '../../Components/ProductionRow/ProductionRow';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllProductions } from '../../service/production';

function FindProductionPage() {
  const [productions, setProductions] = useState();

  const onDateSelected = () => {
    const date = document.getElementById('date-time').value;
    getProductions(date);
  };

  const getProductions = (date) => {
    getAllProductions().then((res) => {
      setProductions(filterProductionsByDate(res.data, date));
    });
  };

  const filterProductionsByDate = (productions, date) => {
    const result = [];
    productions.forEach((p) => {
      p.dates.forEach((dateObj) => {
        if (dateObj.date === date) {
          result.push(p);
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
                  return (
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
