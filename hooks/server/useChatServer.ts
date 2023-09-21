import { ChatServerType } from "server/routes/chat";
import { BACKEND_URL } from "../../config";
import { useAuth } from "../useAuth";

export type MessageType = {
  id: string;
  message: string;
  sender: string;
  date: number;
  reacts: {
    user_id: string;
    reaction: string;
  }[];
  type: "text";
};

export const useChatServer = () => {
  const route = `${BACKEND_URL}/chat`;
  const { localUser, user } = useAuth();

  const getAllChats = async (): Promise<{
    success: boolean;
    message: string;
    data?: { chats: ChatServerType[] };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const createChat = async (payload: {
    chat_members: string[];
    chat_name: string;
    chat_type?: string;
  }): Promise<{
    success: boolean;
    message: string;
    data?: { chat: ChatServerType };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateChat = async (payload: {
    chat_name: string;
    chat_type?: string;
    chat_members: string[];
    chat_id: string;
  }): Promise<{
    success: boolean;
    message: string;
    data?: { chat: ChatServerType };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/${payload.chat_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const sendMessage = async (payload: {
    message: string;
    chat_id: string;
    type?: string;
  }): Promise<{
    success: boolean;
    message: string;
    data?: { chat: ChatServerType };
  }> => {
    return new Promise(async (resolve, reject) => {
      const updatedPayload = {
        ...payload,
        type: payload.type || "text",
      };
      try {
        const response = await fetch(`${route}/${payload.chat_id}/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify(updatedPayload),
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getChat = async (
    chat_id: string,
    count?: number
  ): Promise<{
    success: boolean;
    message: string;
    data?: { chat: ChatServerType };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${route}/${chat_id}${count ? `?count=${count}` : ""}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localUser?.token}`,
              "x-firebase-token": user?.token || "",
            },
          }
        );
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteChat = async (
    chat_id: string
  ): Promise<{
    success: boolean;
    message: string;
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/${chat_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const reactToMessage = async (payload: {
    chat_id: string;
    message_id: string;
    reaction: string;
  }): Promise<{
    success: boolean;
    message: string;
    data?: { chat: ChatServerType };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${route}/${payload.chat_id}/message/${payload.message_id}/react`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localUser?.token}`,
              "x-firebase-token": user?.token || "",
            },
            body: JSON.stringify({
              reaction: payload.reaction,
            }),
          }
        );
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const checkIfAlreadyInConversation = (
    user_id_1: string,
    user_id_2: string
  ): Promise<{
    success: boolean;
    message: string;
    data?: { chat: ChatServerType };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/check-users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify({
            user_id_1,
            user_id_2,
          }),
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    getAllChats,
    createChat,
    updateChat,
    sendMessage,
    getChat,
    deleteChat,
    reactToMessage,
    checkIfAlreadyInConversation,
  };
};
