import { createContext, useReducer, useContext } from "react";
import vehicleReducer from "./reducer";
import {
  FETCH_VEHICLE_LOADING,
  FETCH_VEHICLE_SUCCESS,
  FETCH_VEHICLE_FAILED,
  SELECT_VEHICLE,
  IS_FETCH_MORE,
} from "./action";
import { data } from "../constants/constants";

export const VehicleContext = createContext();

export const VehicleState = (props) => {
  const initialState = {
    vehicleLoading: false,
    vehicles: [],
    vehiclePagination: {},
    isSearchVehicle: false,
    searchedVehicleErrMsg: "",
    fetchVehicleErrMsg: {},
    searchedVehicles: [],
    vehicle: { number: "", transporter: "", KMReading: "" },
    isFetchMore: false,
    vehicleError: "",
    searchedVehiclePagination: {},
    searchedValue: "",
    isAutoFilling: false,
  };
  const [state, dispatch] = useReducer(vehicleReducer, initialState);

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
        const { pagination, vehicles } = data;
        const pageSize = pagination.pageSize;
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedVehicles = vehicles.slice(startIndex, currentPage * pageSize);

        resolve({
          pagination: { ...pagination, currentPage },
          vehicles: paginatedVehicles,
        });
      }, 2000); // Simulate 1.5s delay
    });
  };

  // Fetch vehicles (TRACK AND TRACE)
  const fetchVehicles = async () => {
    dispatch({
      type: FETCH_VEHICLE_LOADING,
      payload: true
    });
    try {
      // Simulate fetching page 1 vehicles
      const res = await simulateAxiosCall(1);
      const { vehicles, pagination } = res;

   
      dispatch({
        type: FETCH_VEHICLE_SUCCESS,
        payload: { vehicles, pagination },
      });
    } catch (error) {
        dispatch({
          type: FETCH_VEHICLE_FAILED,
          payload: "couldn't fetch vehicles",
        });
    }
  };

  const fetchMoreVehicles = async (pagination) => {
    // check if there are more vehicles in database

    if (!shouldFetchMore(pagination)) return;


    let currentPage = parseInt(pagination.currentPage) + 1;

    dispatch({
      type: IS_FETCH_MORE,
    });

    try {
      // Simulate fetching more vehicles
      const res = await simulateAxiosCall(currentPage);
      const { vehicles, pagination } = res;

    
      dispatch({
        type: FETCH_VEHICLE_SUCCESS,
        payload: { vehicles: [...state.vehicles, ...vehicles], pagination },
      });
    } catch (error) {
      dispatch({
        type: FETCH_VEHICLE_FAILED,
        payload: "couldn't fetch vehicles",
      });
    }
  };

  const selectVehicle = (value) => {
    dispatch({
      type: SELECT_VEHICLE,
      payload: value,
    });
  };

  return (
    <VehicleContext.Provider
      value={{
        fetchVehicles,
        selectVehicle,
        fetchMoreVehicles,
        ...state,
      }}
    >
      {props.children}
    </VehicleContext.Provider>
  );
};
