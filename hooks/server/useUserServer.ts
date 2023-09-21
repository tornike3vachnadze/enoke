import {
  UserActivityServerType,
  UserDataServerType,
  UserProfileServerType,
  UserServerType,
  UserSettingsServerType,
} from "server/routes/users";
import { BACKEND_URL } from "../../config";
import { useAuth } from "../useAuth";

export const useUserServer = () => {
  const route = `${BACKEND_URL}/users`;
  const { localUser, user } = useAuth();

  const updateBaseData = async (data: {
    email?: string;
    // username?: string;
    name?: string;
    phone?: string;
    password?: string;
  }): Promise<{
    success: boolean;
    message: string;
    data?: {
      user: UserServerType;
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify({
            email: data.email,
            // username: data.username,
            name: data.name,
            phone: data.phone,
            password: data.password,
          }),
        });
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateProfileData = async (data: {
    bio?: string;
    url?: string;
    birthday?: string;
    intersets?: string[];
    looking_for?: string[];
    location?: string[];
    languages?: string[];
    zodiac?: string;
    enneagram?: string;
    preferences?: string[];
    emoji?: string;
  }): Promise<{
    success: boolean;
    message: string;
    data?: {
      user: UserProfileServerType;
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/update/profile`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify({
            bio: data.bio,
            url: data.url,
            birthday: data.birthday,
            intersets: JSON.stringify(data.intersets),
            looking_for: JSON.stringify(data.looking_for),
            location: JSON.stringify(data.location),
            languages: JSON.stringify(data.languages),
            zodiac: data.zodiac,
            enneagram: data.enneagram,
            preferences: JSON.stringify(data.preferences),
            emoji: data.emoji,
          }),
        });
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateSettingsData = async (data: {
    notifications?: boolean;
    mfa?: boolean;
    mfa_type?: string;
    blocked_users?: string[];
    private_profile?: boolean;
  }): Promise<{
    success: boolean;
    message: string;
    data?: {
      user: UserSettingsServerType;
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/update/settings`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify(data),
        });
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getBaseData = async (
    id?: string
  ): Promise<{
    success: boolean;
    message: string;
    data?: {
      user: UserServerType;
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/base${id ? `?id=${id}` : ""}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
        });
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getProfileData = async (
    id?: string
  ): Promise<{
    success: boolean;
    message: string;
    data?: {
      user: UserProfileServerType;
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${route}/profile${id ? `?id=${id}` : ""}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localUser?.token}`,
              "x-firebase-token": user?.token || "",
            },
          }
        );
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getSettingsData = async (
    id?: string
  ): Promise<{
    success: boolean;
    message: string;
    data?: {
      user: UserSettingsServerType;
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${route}/settings${id ? `?id=${id}` : ""}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localUser?.token}`,
              "x-firebase-token": user?.token || "",
            },
          }
        );
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUserByUserName = async (
    username: string
  ): Promise<{
    success: boolean;
    message: string;
    data?: {
      user: UserServerType & UserProfileServerType & UserDataServerType;
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/username/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
        });
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }
    });
  };

  // const updateUserActivity = async (data: {
  //   last_seen?: string;
  //   likes?: string[];
  //   dislikes?: string[];
  //   comments?: string[];
  //   posts?: string[];
  //   boards?: string[];
  // }): Promise<{
  //   success: boolean;
  //   message: string;
  //   data?: UserActivityServerType;
  // }> => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const response = await fetch(`${route}/update/data/activity`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       const json = await response.json();
  //       resolve(json);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // };

  return {
    updateBaseData,
    updateProfileData,
    updateSettingsData,
    getBaseData,
    getProfileData,
    getSettingsData,
    getUserByUserName,
  };
};
