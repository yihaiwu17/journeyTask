import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "antd";
import "antd/dist/antd.css";

import LawnmowerRepository from "./do-not-refactor/LawnmowerRepository";
import PhoneCaseRepository from "./do-not-refactor/LawnmowerRepository";
import TShirtRepository from "./do-not-refactor/LawnmowerRepository";

function ProductDataConsolidator(currency) {
  var l = LawnmowerRepository();
  var p = PhoneCaseRepository();
  var t = TShirtRepository();

  const arr_names = [
    [l, "lawnmower"],
    [p, "Phone Case"],
    [t, "T-Shirt"],
  ];
  var products = [];
  console.log(products);
  let multiplier =
    currency === "euro" ? 0.67 : currency === "dollar" ? 0.76 : 1;

  for (let [arr, name] of arr_names) {
    for (var i = 0; i < arr.length; i++) {
      products.push({
        id: arr[i].id,
        name: arr[i].name,
        price: (arr[i].price * multiplier).toFixed(2),
        type: name,
      });
    }
  }

  return products;
}

export default function ProductTable() {
  const [currencyDisplay, setCurrencyDisplay] = useState("nzd");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        {
          text: "Lawnmower",
          value: "lawnmower",
        },
        {
          text: "Phone Case",
          value: "Phone Case",
        },
        {
          text: "T-Shirt",
          value: "T-Shirt",
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
  ];

  return (
    <Row justify="center">
      <Col xs={8} sm={10} md={12} lg={14} xl={16}>
        <Button onClick={() => setCurrencyDisplay("nzd")} type="primary">
          NZD
        </Button>
        <Button onClick={() => setCurrencyDisplay("dollar")}>USD</Button>
        <Button onClick={() => setCurrencyDisplay("euro")}>EUR</Button>

        <Table
          columns={columns}
          dataSource={ProductDataConsolidator(currencyDisplay)}
        />
      </Col>
    </Row>
  );
}
