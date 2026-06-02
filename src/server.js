const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 실습용 자동차 데이터입니다. 데이터베이스 대신 메모리 배열 carList에 저장합니다.
const carList = [
  {
    _id: 1,
    name: "Sonata",
    company: "Hyundai",
    year: 2023,
    price: 32000000,
  },
  {
    _id: 2,
    name: "K5",
    company: "Kia",
    year: 2024,
    price: 33500000,
  },
  {
    _id: 3,
    name: "Model 3",
    company: "Tesla",
    year: 2024,
    price: 59990000,
  },
  {
    _id: 4,
    name: "E-Class",
    company: "Mercedes-Benz",
    year: 2022,
    price: 73900000,
  },
];

let nextId = carList.length + 1;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 자동차 목록 조회: carList 배열 전체를 JSON으로 응답합니다.
app.get("/cars", (req, res) => {
  res.json(carList);
});

// 특정 자동차 조회: URL의 id와 같은 _id를 가진 자동차를 찾습니다.
app.get("/cars/:id", (req, res) => {
  const id = Number(req.params.id);
  const car = carList.find((item) => item._id === id);

  if (!car) {
    return res.status(404).json({ message: "자동차를 찾을 수 없습니다." });
  }

  res.json(car);
});

// 자동차 추가: 요청 본문에서 자동차 정보를 받아 carList에 추가합니다.
app.post("/cars", (req, res) => {
  const { name, company, year, price } = req.body;

  if (!name || !company || !year || !price) {
    return res.status(400).json({ message: "모든 자동차 정보를 입력하세요." });
  }

  const newCar = {
    _id: nextId,
    name,
    company,
    year: Number(year),
    price: Number(price),
  };

  carList.push(newCar);
  nextId += 1;

  res.status(201).json(newCar);
});

// 자동차 수정: id로 자동차를 찾은 뒤 요청 본문의 값으로 교체합니다.
app.put("/cars/:id", (req, res) => {
  const id = Number(req.params.id);
  const carIndex = carList.findIndex((item) => item._id === id);

  if (carIndex === -1) {
    return res.status(404).json({ message: "자동차를 찾을 수 없습니다." });
  }

  const { name, company, year, price } = req.body;

  if (!name || !company || !year || !price) {
    return res.status(400).json({ message: "모든 자동차 정보를 입력하세요." });
  }

  const updatedCar = {
    _id: id,
    name,
    company,
    year: Number(year),
    price: Number(price),
  };

  carList[carIndex] = updatedCar;
  res.json(updatedCar);
});

// 자동차 삭제: id로 찾은 자동차를 carList 배열에서 제거합니다.
app.delete("/cars/:id", (req, res) => {
  const id = Number(req.params.id);
  const carIndex = carList.findIndex((item) => item._id === id);

  if (carIndex === -1) {
    return res.status(404).json({ message: "자동차를 찾을 수 없습니다." });
  }

  carList.splice(carIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
