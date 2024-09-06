import { AxiosRequestConfig } from "axios";

import { ApiResponse } from "@/models/api-response";
import { callExternalApi } from "./external-api.service";
import { REACT_APP_API_SERVER_URL } from "@/config";

REACT_APP_API_SERVER_URL;

export const getPublicResource = async (): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${REACT_APP_API_SERVER_URL}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};




export const getProtectedResource = async (
  accessToken: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${REACT_APP_API_SERVER_URL}/api/messages/protected`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;
  

  return {
    data,
    error,
  };
};

export const getAdminResource = async (
  accessToken: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${REACT_APP_API_SERVER_URL}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};
