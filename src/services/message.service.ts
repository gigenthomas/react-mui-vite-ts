import { AxiosRequestConfig } from "axios";

import { ApiResponse } from "@/models/api-response";
import { callGetUserEventsAPI } from "./external-api.service";
import { callExternalApi } from "./external-api.service";
import { REACT_APP_API_SERVER_URL } from "@/config";
import { UserEvents } from "@/models/user-events";
import { UserEvent } from "@/models/user-event";

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



export const getUserEvents = async (
  accessToken: string | null,
  userID: string | undefined
): Promise<UserEvents> => {
  const config: AxiosRequestConfig = {
    url: `${REACT_APP_API_SERVER_URL}/api/user/events/`+userID,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };  

  const { userEvents, userEventError } = (await callGetUserEventsAPI({ config })) as UserEvents;

  return {
    userEvents,
    userEventError,
  };
};

export const createUserEvent = async (
  accessToken: string | null,
  event: UserEvent | undefined
): Promise<string> => {
  const config: AxiosRequestConfig = {
    url: `${REACT_APP_API_SERVER_URL}/api/user/events`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: JSON.stringify(event),
  };

  const { data, error } = await callExternalApi({ config });

  if (error) {
    throw new Error(`Error creating user event: ${error}`);
  }

  return typeof data === "string" ? data : JSON.stringify(data);
};


export const updateUserEvent = async (
  accessToken: string | null,
  event: UserEvent | undefined,
  eventID: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${REACT_APP_API_SERVER_URL}/api/user/events/`+eventID,
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: JSON.stringify(event)
  };
  
  event;

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};


export const deleteEvent = async (
  accessToken: string | null,
  eventID: string | undefined
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${REACT_APP_API_SERVER_URL}/api/user/events/`+eventID,
    method: "DELETE",
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
  accessToken: string | null
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
