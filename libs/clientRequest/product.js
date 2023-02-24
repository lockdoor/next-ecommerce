import axios from "axios";

export const create = async (payload) => {
  const { data } = await axios.post("/api/product/create", payload);
  return data;
};

export const list = async () => {
  const { data } = await axios.get("/api/product/list");
  return data;
};

export const listFilter = async (categories, from, to) => {
  const { data } = await axios.get(
    `/api/product/listFilter?categories=${categories}&from=${from}&to=${to}`
  );
  return data;
};

export const update = async (payload) => {
  const { data } = await axios.put(
    `/api/product/${payload._id}`,
    payload.productData
  );
  return data;
};

export const remove = async (slug) => {
  const { data } = await axios.delete(`/api/product/${slug}`);
  return data;
};

export const searchCount = async (keyword) => {
  const {data} = await axios.get(`/api/product/searchCount?keyword=${keyword}`)
  return data
}

export const search = async (keyword) => {
  const {data} = await axios.get(`/api/product/search?keyword=${keyword}`)
  return data
}

export const read = async (slug) => {
  const {data} = await axios.get(`/api/product/${slug}`)
  return data
}

export const total = async() => {
  const {data} = await axios.get(`/api/product/total`)
  return data
}

export const listpage = async(page, perPage, sort) => {
  const {data} = await axios.get(`/api/product/page?page=${page}&perPage=${perPage}&sort=${sort}`)
  return data
}

export const listByCategory = async (slug) => {
  const {data} = await axios.get(`/api/product/category?slug=${slug}`)
  return data
}

