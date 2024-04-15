import "./App.css";
import { useGetGoodsQuery } from "./redux";
import { useState } from "react";

function App() {
  const [count, setCount] = useState("");
  const { data = [], isLoading } = useGetGoodsQuery(count); //isLoading идет из-под коробки
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </div>
  );
}

export default App;

/*история с кэшированием - выбираем новый count, он прилетает в хук, происходит запрос и нужное
кол-во данный выводится. При этом при повторном аналогичном запросе(например был 1 товаб потом 2, потом опять 1)
не будет проиходить новый запросб так как данные от запроса закэшированы на некоторое время
это доступно из-под коробки*/
