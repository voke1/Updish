import {
  FETCH_FOOD_LOADING,
  FETCH_FOOD_SUCCESS,
  FETCH_FOOD_FAILED,
  IS_FETCH_MORE,
} from "./action";

const FoodReducer = (state, action) => {
  switch (action.type) {
    case FETCH_FOOD_LOADING:
      return {
        ...state,
        foodLoading: true,
        searchedfoodErrMsg: "",
        isSearchFood: false,
      };
    case FETCH_FOOD_SUCCESS:
      return {
        ...state,
        foodLoading: false,
        foods: action.payload.foods,
        fetchFoodErrMsg: {},
        foodPagination: action.payload.pagination,
        searchedFoods: [],
        searchedfoodErrMsg: "",
        isFetchMore: false,
      };

    case FETCH_FOOD_FAILED:
      return {
        ...state,
        foodLoading: false,
        fetchFoodErrMsg: { msg: action.payload, type: "bad" },
        isFetchMore: false,
        foods: [],
        foodPagination: {},
      };

    case IS_FETCH_MORE:
      return {
        ...state,
        isFetchMore: true,
      };

    default:
      return state;
  }
};

export default FoodReducer;
