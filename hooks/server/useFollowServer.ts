import { UserProfileServerType, UserServerType } from "server/routes/users";
import { BACKEND_URL } from "../../config";
import { useAuth } from "../useAuth";

export const useFollowServer = () => {
  const route = `${BACKEND_URL}/users/follow`;
  const { localUser, user, auth } = useAuth();

  const followUser = async (
    username: string
  ): Promise<{ success: boolean; message: string }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/follow-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify({
            username,
          }),
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const unfollowUser = async (
    username: string
  ): Promise<{ success: boolean; message: string }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/unfollow-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify({
            username,
          }),
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getFollowers = async (): Promise<{
    success: boolean;
    message: string;
    data?: {
      followers: (UserServerType & UserProfileServerType)[];
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/get-followers`, {
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

  const getFollowing = async (): Promise<{
    success: boolean;
    message: string;
    data?: {
      following: (UserServerType & UserProfileServerType)[];
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/get-following`, {
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

  const getIncomingFollowRequests = async (): Promise<{
    success: boolean;
    message: string;
    data?: {
      incomingFollowRequests: {
        targetUser: string;
        type: string;
        category: string;
      }[];
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/get-incoming-follow-requests`, {
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

  const getOutgoingFollowRequests = async (): Promise<{
    success: boolean;
    message: string;
    data?: {
      outgoingFollowRequests: {
        targetUser: string;
        type: string;
        category: string;
      }[];
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/get-outgoing-follow-requests`, {
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

  const acceptFollowRequest = async (
    username: string
  ): Promise<{ success: boolean; message: string }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/accept-follow-request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify({
            username,
          }),
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const declineFollowRequest = async (
    username: string
  ): Promise<{ success: boolean; message: string }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/decline-follow-request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify({
            username,
          }),
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getSuggestions = async (): Promise<{
    success: boolean;
    message: string;
    data?: {
      users: (UserServerType & UserProfileServerType)[];
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/get-suggested-users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": (await auth.currentUser?.getIdToken()) || "",
          },
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    getIncomingFollowRequests,
    getOutgoingFollowRequests,
    acceptFollowRequest,
    declineFollowRequest,
    getSuggestions,
  };
};
