/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { useEffect } from "react";
// react plugin used to create charts
import { Line, Pie, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";

const Dashboard = () => {
  const [info, setInfo] = useState({});
  const [General, setGeneral] = useState({});
  const [comparativaCircular, setComparativaCircular] = useState({});
  const [comparativaLineal, setComparativaLineal] = useState({});

  const obtenerDatos = async () => {
    let fecha = new Date();
    let actual = [fecha.getFullYear(), fecha.getMonth() + 1, fecha.getDate()];
    console.log(actual);

    let URI = `https://api.covid19tracking.narrativa.com/api/${actual[0]}-${actual[1]}-${actual[2]}/country/spain`;
    try {
      let resultados = await fetch(URI);
      let json = await resultados.json();
      let body = json;
      setGeneral(body);

      let estadistica = [];
      estadistica = [
        json.total.today_open_cases,
        json.total.today_confirmed,
        json.total.yesterday_open_cases,
        json.total.yesterday_confirmed,
      ];

      setInfo({
        labels: [
          "total today cases",
          "total today confirmed",
          "total yesterday cases",
          "total yesterday confirmed",
        ],
        datasets: [
          {
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            data: estadistica,
          },
        ],
      });

      let comparativo = [];
      comparativo = [json.total.today_open_cases, json.total.today_recovered];

      setComparativaCircular({
        labels: [1, 2, 3],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
            borderWidth: 0,
            data: comparativo,
          },
        ],
      });

      let ultimosdias = [
        String(fecha.getDate() - 4),
        String(fecha.getDate() - 3),
        String(fecha.getDate() - 2),
        String(fecha.getDate() - 1),
        String(fecha.getDate()),
      ];

      let cifras = [];

      let dinamic1 = `https://api.covid19tracking.narrativa.com/api/${actual[0]}-${actual[1]}-${ultimosdias[0]}/country/spain`;
      let dinamic2 = `https://api.covid19tracking.narrativa.com/api/${actual[0]}-${actual[1]}-${ultimosdias[1]}/country/spain`;
      let dinamic3 = `https://api.covid19tracking.narrativa.com/api/${actual[0]}-${actual[1]}-${ultimosdias[2]}/country/spain`;
      let dinamic4 = `https://api.covid19tracking.narrativa.com/api/${actual[0]}-${actual[1]}-${ultimosdias[3]}/country/spain`;
      let dinamic5 = `https://api.covid19tracking.narrativa.com/api/${actual[0]}-${actual[1]}-${ultimosdias[4]}/country/spain`;

      let datoDia1 = await fetch(dinamic1);
      let jsondatoDia1 = await datoDia1.json();
      cifras.push(jsondatoDia1.total.today_new_open_cases * -1);

      let datoDia2 = await fetch(dinamic2);
      let jsondatoDia2 = await datoDia2.json();
      cifras.push(jsondatoDia2.total.today_new_open_cases);

      let datoDia3 = await fetch(dinamic3);
      let jsondatoDia3 = await datoDia3.json();
      cifras.push(jsondatoDia3.total.today_new_open_cases);

      let datoDia4 = await fetch(dinamic4);
      let jsondatoDia4 = await datoDia4.json();
      cifras.push(jsondatoDia4.total.today_new_open_cases);

      let datoDia5 = await fetch(dinamic5);
      let jsondatoDia5 = await datoDia5.json();
      cifras.push(jsondatoDia5.total.today_new_open_cases);

      console.log(cifras);

      setComparativaLineal({
        labels: ultimosdias,
        datasets: [
          {
            data: cifras,
            fill: false,
            borderColor: "#fbc658",
            backgroundColor: "transparent",
            pointBorderColor: "#fbc658",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0.4,
          },
        ],
      });

      setGeneral(body.total);
    } catch (error) {
      alert("war wrong some thing");
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-copy-04 text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">New confirmed</p>
                      <CardTitle tag="p">
                        {!General.today_new_confirmed
                          ? "Cargando"
                          : General.today_new_confirmed}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-danger">
                      <i className="nc-icon nc-ambulance text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">today new Deads</p>
                      <CardTitle tag="p">
                        {!General.today_new_deaths
                          ? "Cargando"
                          : General.today_new_deaths}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> In the month
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-zoom-split text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category"> Open cases</p>
                      <CardTitle tag="p">
                        {!General.today_new_open_cases
                          ? "Cargando"
                          : General.today_new_open_cases}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> current
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">New open cases</p>
                      <CardTitle tag="p">
                        {!General.today_open_cases
                          ? "Cargando"
                          : General.today_open_cases}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">TODAY</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Bar
                  data={info}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Balance</CardTitle>
                <p className="card-category">Current dates</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={comparativaCircular}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Today open Cases{" "}
                  <i className="fa fa-circle text-warning" /> Today recovered
                  cases{" "}
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> cases vs recovered
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NEW CASES IN THE LAST 5 DAYS</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={comparativaLineal}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> averange{" "}
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
