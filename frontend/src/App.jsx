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

  // 수정 모드 처리: 선택한 자동차 정보를 폼에 채워 넣고 editingId를 저장합니다.
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
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <header className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-700">Car Admin</p>
            <h1 className="mt-1 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              자동차 관리
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-right">
            Express REST API와 React 화면을 연결해 자동차 정보를 조회, 추가, 수정, 삭제합니다.
          </p>
        </header>

        <form
          className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-5 flex flex-col gap-1 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                {editingId ? "자동차 정보 수정" : "자동차 추가"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {editingId
                  ? "선택한 자동차의 정보를 변경한 뒤 저장하세요."
                  : "새 자동차 정보를 입력한 뒤 목록에 추가하세요."}
              </p>
            </div>
            {editingId && (
              <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                수정 모드
              </span>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              자동차 이름
              <input
                className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="예: Sonata"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              제조사
              <input
                className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="예: Hyundai"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              연식
              <input
                className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="예: 2024"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              가격
              <input
                className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="예: 33500000"
                required
              />
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              className="min-h-11 rounded-md border border-blue-600 bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="submit"
            >
              {editingId ? "수정 저장" : "자동차 추가"}
            </button>
            {editingId && (
              <button
                className="min-h-11 rounded-md border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
                type="button"
                onClick={resetForm}
              >
                수정 취소
              </button>
            )}
          </div>
        </form>

        {isLoading && (
          <p className="mb-4 rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-slate-600 shadow-sm">
            자동차 목록을 불러오는 중입니다.
          </p>
        )}
        {errorMessage && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
            {errorMessage}
          </p>
        )}

        {!isLoading && (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-slate-950">자동차 목록</h2>
              <p className="text-sm text-slate-500">총 {cars.length}대</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="border-b border-slate-200 px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                      자동차 이름
                    </th>
                    <th className="border-b border-slate-200 px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                      제조사
                    </th>
                    <th className="border-b border-slate-200 px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                      연식
                    </th>
                    <th className="border-b border-slate-200 px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                      가격
                    </th>
                    <th className="border-b border-slate-200 px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {cars.map((car) => (
                    <tr className="transition hover:bg-slate-50" key={car._id}>
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-bold text-slate-950">
                        {car.name}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                        {car.company}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                        {car.year}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-800">
                        {car.price.toLocaleString("ko-KR")}원
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="min-h-9 rounded-md border border-emerald-600 bg-emerald-600 px-3 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            type="button"
                            onClick={() => handleEdit(car)}
                          >
                            수정
                          </button>
                          <button
                            className="min-h-9 rounded-md border border-red-600 bg-red-600 px-3 text-sm font-bold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
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
                      <td
                        className="px-5 py-10 text-center text-sm font-medium text-slate-500"
                        colSpan="5"
                      >
                        등록된 자동차가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
