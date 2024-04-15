import "./App.css";
import {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation
} from "./redux";
import { useState } from "react";

function App() {
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const { data = [], isLoading } = useGetGoodsQuery(count); //isLoading идет из-под коробки
  const [addProduct, { isError }] = useAddProductMutation(); // объект с параметрами для демонстрации, тут не используем,
  //возвращает массив -- в хуке выше происходит выполнение функции, а тут в useAddProductMutation мы принимаем функцию, а выполнять будем по необходимости

  const [deleteProduct] = useDeleteProductMutation(); //так же возвр массив, где есть функция, которую мы вызовем по необходимости

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap(); //unwrap - обязательно. для корректной работы других пропов из хука
      setNewProduct("");
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap();
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button onClick={handleAddProduct}>add product</button>
      </div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      {data.map((item) => (
        <li key={item.id}>
          {item.name}
          <span onClick={() => handleDeleteProduct(item.id)}>X</span>
        </li>
      ))}
    </div>
  );
}

export default App;

/*история с кэшированием - выбираем новый count, он прилетает в хук, происходит запрос и нужное
кол-во данный выводится. При этом при повторном аналогичном запросе(например был 1 товаб потом 2, потом опять 1)
не будет проиходить новый запросб так как данные от запроса закэшированы на некоторое время
это доступно из-под коробки*/
