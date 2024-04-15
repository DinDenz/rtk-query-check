import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes: ["Products"], // конкретизируем с какими сущностями работаем в рамках этого апи
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (build) => ({
    getGoods: build.query({
      //query: () => `/goods`
      query: (limit = "") => `/goods?${limit && `_limit=${limit}`}`,
      //providesTags тут лучше в документацию и видос Михаила Непомнящего, нужно для автообновления страницы после обновления базы данных 
      providesTags: (
        result,
        error,
        arg 
      ) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" }
            ]
          : [{ type: "Products", id: "LIST" }]
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: "goods",
        method: "POST",
        body
      }),
      invalidatesTags:  [{ type: "Products", id: "LIST" }]
    })
  })
});

export const { useGetGoodsQuery, useAddProductMutation } = goodsApi;

//здесь создается хук useGetGoodsQuery
/*он состоит из use + getGoods + Query,
при его вызове происходит запрос getGoods на получение данных по goods
запрос происходит по адресу baseUrl + `/goods` */

//благодаря этой библиотеке нам не нужно писать fetch своими руками и тем более юзать axios и тд

//limit добавил для лимитирования количества запрашиваемых товаров, в него прилетает count из app

//useAddProductMutation по той же логике создается хук для мутации
