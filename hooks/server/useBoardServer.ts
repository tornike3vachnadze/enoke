import { BoardServerType } from "server/routes/board";
import { BACKEND_URL } from "../../config";
import { useAuth } from "../useAuth";

export const useBoardServer = () => {
  const route = `${BACKEND_URL}/board`;
  const { localUser, user } = useAuth();

  const getUserBoards = async (): Promise<{
    success: boolean;
    message: string;
    data?: { board?: BoardServerType; boards?: BoardServerType[] };
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

  const getUsersHomeBoard = async (
    username: string
  ): Promise<{
    success: boolean;
    message: string;
    data?: { board?: BoardServerType; boards?: BoardServerType[] };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/home/${username}`, {
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

  const getUsersProfileBoard = async (
    username: string
  ): Promise<{
    success: boolean;
    message: string;
    data?: { board?: BoardServerType; boards?: BoardServerType[] };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/profile/${username}`, {
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

  const createBoard = async (
    board: BoardServerType
  ): Promise<{
    success: boolean;
    message: string;
    data?: { board?: BoardServerType; boards?: BoardServerType[] };
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
          body: JSON.stringify(board),
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getBoard = async (
    board_id: string
  ): Promise<{
    success: boolean;
    message: string;
    data?: { board?: BoardServerType; boards?: BoardServerType[] };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/${board_id}`, {
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

  const updateBoard = async (
    board_id: string,
    board: any
  ): Promise<{
    success: boolean;
    message: string;
    data?: { board?: BoardServerType; boards?: BoardServerType[] };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/${board_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify({
            id: board_id,
            data: board,
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
    getUserBoards,
    getUsersHomeBoard,
    getUsersProfileBoard,
    createBoard,
    getBoard,
    updateBoard,
  };
};
