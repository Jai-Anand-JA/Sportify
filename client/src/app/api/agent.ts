import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import basketService from "./basketService";
import { Dispatch } from "redux";
import { Product } from "../models/product";
import { Basket } from "../models/basket";

axios.defaults.baseURL = 'http://localhost:5000/api/';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
const responseBody = (response: AxiosResponse) => response.data;


axios.interceptors.response.use(async response => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return response;
}, (error: AxiosError) => {
  const { status } = error.response as AxiosResponse;
  switch (status) {
    case 401:
      toast.error("Unauthorized. Please sign in again.");
      break;
    case 404:
      toast.error("Resource not found");
      router.navigate('/not-found');
      break;
    case 500:
      toast.error("Internal server error occurred");
      router.navigate('/server-error');
      break;
    default:
      break;
  }
  return Promise.reject(error.message);
});


const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Store = {
  list: (page: number, size: number, brandId?: number, typeId?: number, sort: string = "name", order: string = "asc") => {
    let requestUrl = `products?page=${Math.max(0, page)}&size=${size}&sort=${sort}&order=${order}`;
    if (brandId && brandId !== 0) requestUrl += `&brandId=${brandId}`;
    if (typeId && typeId !== 0) requestUrl += `&typeId=${typeId}`;
    return requests.get(requestUrl);
  },
  details: (id: number) => requests.get(`products/${id}`),
  types: () => requests.get("products/types").then(types => [{ id: 0, name: "All" }, ...types]),
  brands: () => requests.get("products/brands").then(brands => [{ id: 0, name: "All" }, ...brands]),
  search: (keyword: string) => requests.get(`products?keyword=${keyword}`),
};

const Basket = {
  get: async () => {
    try {
      return await basketService.getBasket();
    } catch (error) {
      console.error("Failed to get Basket: ", error);
      throw error;
    }
  },
  addItem: async (product: Product, dispatch: Dispatch) => {
    try {
      return await basketService.addItemToBasket(product, 1, dispatch);
    } catch (error) {
      console.error("Failed to add item to basket:", error);
      throw error;
    }
  },
  removeItem: async (itemId: number, dispatch: Dispatch) => {
    try {
      await basketService.remove(itemId, dispatch);
    } catch (error) {
      console.error("Failed to remove item from basket:", error);
      throw error;
    }
  },
  incrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
    try {
      await basketService.incrementItemQuantity(itemId, quantity, dispatch);
    } catch (error) {
      console.error("Failed to increment item quantity:", error);
      throw error;
    }
  },
  decrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
    try {
      await basketService.decrementItemQuantity(itemId, quantity, dispatch);
    } catch (error) {
      console.error("Failed to decrement item quantity:", error);
      throw error;
    }
  },
  setBasket: async (basket: Basket, dispatch: Dispatch) => {
    try {
      await basketService.setBasket(basket, dispatch);
    } catch (error) {
      console.error("Failed to set basket:", error);
      throw error;
    }
  },
  deleteBasket: async (basketId: string) => {
    try {
      await basketService.deleteBasket(basketId);
    } catch (error) {
      console.error("Failed to delete basket:", error);
      throw error;
    }
  },
};

const Account = {
  login: async (values: any) => {
    const response = await requests.post("auth/login", values);
    localStorage.setItem("token", response.token); // Save token after login
    return response;
  }
};

const Orders = {
  list: () => requests.get("orders"),
  fetch: (id: number) => requests.get(`orders/${id}`),
  create: (values: any) => requests.post("orders", values),
};

const agent = {
  Store,
  Basket,
  Account,
  Orders,
};

export default agent;
