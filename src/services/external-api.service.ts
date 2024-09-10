import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "../models/api-response";
import { UserEvents } from "../models/user-events";
import { AppError } from "@/models/app-error";
import { UserEvent } from "@/models/user-event";


export const callExternalApi = async (options: {
  config: AxiosRequestConfig;
}): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios(options.config);
    const { data } = response;

    return {
      data,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      const { response } = axiosError;

      let message = "http request failed";

      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        message = axiosError.message;
      }

      if (response && response.data && (response.data as AppError).message) {
        message = (response.data as AppError).message;
      }

      return {
        data: null,
        error: {
          message,
        },
      };
    }

    return {
      data: null,
      error: {
        message: (error as Error).message,
      },
    };
  }
};



export const callGetUserEventsAPI = async (options: {
  config: AxiosRequestConfig;
}): Promise<UserEvents> => {
  try {
    const response: AxiosResponse = await axios(options.config);
    const { data } = response;

    // Assuming the data returned from the API is an array of UserEvents
    return {
      userEvents: data as UserEvent[],
      userEventError: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      const { response } = axiosError;

      let message = "http request failed";

      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        message = axiosError.message;
      }

      if (response && response.data && (response.data as AppError).message) {
        message = (response.data as AppError).message;
      }

      return {
        userEvents: null,
        userEventError: {
          message,
        },
      };
    }

    return {
      userEvents: null,
      userEventError: {
        message: (error as Error).message,
      },
    };
  }
};


