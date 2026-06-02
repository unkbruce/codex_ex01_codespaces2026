import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  company: "",
  year: "",
  price: "",
};

function App() {
  // React 상태 관리: 자동차 목록, 입력 폼, 수정 중인 자동차 id, 화면 메시지를 저장합니다.
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchCars() {
    try {
      setErrorMessage("");
      // fetch 요청: Vite 프록시가 /api/cars 요청을 Express 서버의 /cars로 전달합니다.
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

  useEffect(() => {
    fetchCars();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  // 추가/수정 함수: editingId가 있으면 PUT, 없으면 POST 요청을 보냅니다.
  async function handleSubmit(event) {
    event.preventDefault();

    const carData = {
      name: form.name,
      company: form.company,
      year: Number(form.year),
      price: Number(form.price),
    };

    const url = editingId ? `/api/cars/${editingId}` : "/api/cars";
    const method = editingId ? "PUT" : "POST";

    try {
      setErrorMessage("");
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error("자동차 정보를 저장하지 못했습니다.");
      }

      await fetchCars();
      resetForm();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // 수정 시작 함수: 선택한 자동차 정보를 폼에 채워 넣습니다.
  function handleEdit(car) {
    setEditingId(car._id);
    setForm({
      name: car.name,
      company: car.company,
      year: String(car.year),
      price: String(car.price),
    });
  }

  // 삭제 함수: 선택한 자동차 id로 DELETE 요청을 보냅니다.
  async function handleDelete(id) {
    try {
      setErrorMessage("");
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("자동차 정보를 삭제하지 못했습니다.");
      }

      await fetchCars();

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <main className="page">
      <section className="content">
        <header className="header">
          <h1>자동차 CRUD 실습</h1>
          <p>Express REST API와 React 화면을 연결해 자동차 정보를 관리합니다.</p>
        </header>

        <form className="car-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              자동차 이름
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="예: Sonata"
                required
              />
            </label>
            <label>
              제조사
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="예: Hyundai"
                required
              />
            </label>
            <label>
              연식
              <input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="예: 2024"
                required
              />
            </label>
            <label>
              가격
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="예: 33500000"
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit">{editingId ? "수정 저장" : "자동차 추가"}</button>
            {editingId && (
              <button className="secondary" type="button" onClick={resetForm}>
                수정 취소
              </button>
            )}
          </div>
        </form>

        {isLoading && <p className="status">자동차 목록을 불러오는 중입니다.</p>}
        {errorMessage && <p className="status error">{errorMessage}</p>}

        {!isLoading && (
          <div className="table-wrap">
            <table className="car-table">
              <thead>
                <tr>
                  <th>자동차 이름</th>
                  <th>제조사</th>
                  <th>연식</th>
                  <th>가격</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id}>
                    <td>{car.name}</td>
                    <td>{car.company}</td>
                    <td>{car.year}</td>
                    <td>{car.price.toLocaleString("ko-KR")}원</td>
                    <td>
                      <div className="row-actions">
                        <button type="button" onClick={() => handleEdit(car)}>
                          수정
                        </button>
                        <button
                          className="danger"
                          type="button"
                          onClick={() => handleDelete(car._id)}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {cars.length === 0 && (
                  <tr>
                    <td className="empty" colSpan="5">
                      등록된 자동차가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
