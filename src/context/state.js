import { createContext, useReducer, useContext } from "react";
import foodReducer from "./reducer";
import {
  FETCH_FOOD_LOADING,
  FETCH_FOOD_SUCCESS,
  FETCH_FOOD_FAILED,
  IS_FETCH_MORE,
} from "./action";
import { data } from "../constants/constants";

export const FoodContext = createContext();

export const FoodState = (props) => {
  const initialState = {
    foodLoading: false,
    foods: [],
    foodPagination: {},
    isSearchFood: false,
    searchedFoodErrMsg: "",
    fetchFoodErrMsg: {},
    searchedFoods: [],
    food: {},
    isFetchMore: false,
    foodError: "",
    searchedFoodPagination: {},
    searchedValue: "",
  };
  const [state, dispatch] = useReducer(foodReducer, initialState);

  const shouldFetchMore = (pagination) => {
    if (6 * parseInt(pagination.currentPage) > pagination.total) {
      return false;
    } else {
      return true;
    }
  };

  // Simulate the axios call with setTimeout
  const simulateAxiosCall = (currentPage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { pagination, foods } = data;
        const pageSize = pagination.pageSize;
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedFoods = foods.slice(
          startIndex,
          currentPage * pageSize
        );

        resolve({
          pagination: { ...pagination, currentPage },
          foods: paginatedFoods,
        });
      }, 2000); // Simulate 1.5s delay
    });
  };

  // Fetch vehicles (TRACK AND TRACE)
  const fetchFoods = async () => {
    dispatch({
      type: FETCH_FOOD_LOADING,
      payload: true,
    });
    try {
      // Simulate fetching page 1 vehicles
      const res = await simulateAxiosCall(1);
      const { foods, pagination } = res;

      dispatch({
        type: FETCH_FOOD_SUCCESS,
        payload: { foods, pagination },
      });
    } catch (error) {
      dispatch({
        type: FETCH_FOOD_FAILED,
        payload: "couldn't fetch foods",
      });
    }
  };

  const fetchMoreFoods = async (pagination) => {
    // check if there are more vehicles in database

    if (!shouldFetchMore(pagination)) return;

    let currentPage = parseInt(pagination.currentPage) + 1;

    dispatch({
      type: IS_FETCH_MORE,
    });

    try {
      // Simulate fetching more vehicles
      const res = await simulateAxiosCall(currentPage);
      const { foods, pagination } = res;

      dispatch({
        type: FETCH_FOOD_SUCCESS,
        payload: { foods: [...state.foods, ...foods], pagination },
      });
    } catch (error) {
      dispatch({
        type: FETCH_FOOD_FAILED,
        payload: "couldn't fetch foods",
      });
    }
  };

  return (
    <FoodContext.Provider
      value={{
        fetchFoods,
        fetchMoreFoods,
        ...state,
      }}
    >
      {props.children}
    </FoodContext.Provider>
  );
};
