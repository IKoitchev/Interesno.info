import Header from '../../Components/Header/Header';
import NavBar from '../../Components/Navbar/NavBar';
import ProductionRow from '../../Components/ProductionRow/ProductionRow';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axiosClient from '../../service/apiClient';
import { ProductionDto } from '../../types';
import './index.css';

function FindProductionPage() {
  const [productions, setProductions] = useState<ProductionDto[]>([]);

  const onDateSelected = () => {
    const date = (document.getElementById('date-time') as HTMLInputElement).value;

    getProductions(date !== '' ? new Date(date) : undefined);
  };

  function getProductions(date?: Date) {
    console.log(date);
    axiosClient
      .get<ProductionDto[]>(`/productions${date ? `?date=${date.toLocaleDateString('sv')}` : ''}`)
      .then((res) => {
        console.log(res.data);
        setProductions(res.data);
      });
  }

  useEffect(() => {
    getProductions();
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      <div className="">
        <div className="row">
          <div className="col-md-3">
            <Form.Group>
              <Form.Label className="m-2">Select Date</Form.Label>
              <Form.Control
                type="date"
                className="m-2"
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
                  return <ProductionRow production={p} key={i} listNr={i + 1} />;
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
