import { useEffect, useState } from "react";

function App() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchCars() {
      try {
        // Vite 프록시 설정 덕분에 /api/cars 요청은 Express 서버의 /cars로 전달됩니다.
        const response = await fetch("/api/cars");

        if (!response.ok) {
          throw new Error("자동차 목록을 불러오지 못했습니다.");
        }

        const data = await response.json();
        setCars(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <main className="page">
      <section className="content">
        <header className="header">
          <h1>자동차 목록</h1>
          <p>Express REST API에서 조회한 자동차 데이터를 React 화면에 표시합니다.</p>
        </header>

        {isLoading && <p className="status">자동차 목록을 불러오는 중입니다.</p>}
        {errorMessage && <p className="status error">{errorMessage}</p>}

        {!isLoading && !errorMessage && (
          <table className="car-table">
            <thead>
              <tr>
                <th>자동차 이름</th>
                <th>제조사</th>
                <th>연식</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.name}</td>
                  <td>{car.manufacturer}</td>
                  <td>{car.year}</td>
                  <td>{car.price.toLocaleString("ko-KR")}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

export default App;
