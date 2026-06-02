const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// 실습용 자동차 데이터입니다. 실제 프로젝트에서는 데이터베이스에서 조회할 수 있습니다.
const cars = [
  {
    id: 1,
    name: "Sonata",
    manufacturer: "Hyundai",
    year: 2023,
    price: 32000000,
  },
  {
    id: 2,
    name: "K5",
    manufacturer: "Kia",
    year: 2024,
    price: 33500000,
  },
  {
    id: 3,
    name: "Model 3",
    manufacturer: "Tesla",
    year: 2024,
    price: 59990000,
  },
  {
    id: 4,
    name: "E-Class",
    manufacturer: "Mercedes-Benz",
    year: 2022,
    price: 73900000,
  },
];

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 자동차 목록을 JSON 배열로 응답하는 REST API입니다.
app.get("/cars", (req, res) => {
  res.json(cars);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
