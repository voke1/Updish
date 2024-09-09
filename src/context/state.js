import { createContext, useReducer, useContext } from "react";
import vehicleReducer from "./reducer";
import {
  FETCH_VEHICLE_LOADING,
  FETCH_VEHICLE_SUCCESS,
  FETCH_VEHICLE_FAILED,
  SELECT_VEHICLE,
  IS_FETCH_MORE,
} from "./action";
import axios from "axios";
import { expeditorBaseUrl } from "../../../utils/baseUrl";
import { shouldFetchMore } from "../../hooks/shouldFetchMore";

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

  // Fetch vehicles (TRACK AND TRACE)
  const fetchVehicles = async () => {
    dispatch({
      type: FETCH_VEHICLE_LOADING,
    });
    try {
      const res = await axios.get(
        `${expeditorBaseUrl}temp/trucks?country=${user.country}`
      );

      const { trucks, pagination } = res.data;

      //add properties selected
      let vehs = trucks.map((obj) => ({
        ...obj,
        selected: false,
      }));
      dispatch({
        type: FETCH_VEHICLE_SUCCESS,
        payload: { vehicles: vehs, pagination },
      });
    } catch (error) {
      const { data, status } = error.response;
      if (error.message === "Network Error")
        dispatch({
          type: FETCH_VEHICLE_FAILED,
          payload: "couldn't fetch vehicles",
        });

      if (data)
        dispatch({
          type: FETCH_VEHICLE_FAILED,
          payload: status === 503 ? "server error" : data.error,
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
      const res = await axios.get(
        `${expeditorBaseUrl}temp/trucks?country=${user.country}`,
        {
          params: {
            currentPage,
          },
        }
      );

      const { trucks, pagination } = res.data;
      //add properties selected
      let vehs = trucks.map((obj) => ({
        ...obj,
        selected: false,
      }));
      dispatch({
        type: FETCH_VEHICLE_SUCCESS,
        payload: { vehicles: [...state.vehicles, ...vehs], pagination },
      });
    } catch (error) {
      const { data, status } = error.response;
      if (error.message === "Network Error")
        dispatch({
          type: FETCH_VEHICLE_FAILED,
          payload: "couldn't fetch vehicles",
        });

      if (data)
        dispatch({
          type: FETCH_VEHICLE_FAILED,
          payload: status === 503 ? "server error" : data.error,
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
        autoFillVehicleDetails,
        selectVehicle,
        fetchMoreVehicles,
        ...state,
      }}
    >
      {props.children}
    </VehicleContext.Provider>
  );
};
