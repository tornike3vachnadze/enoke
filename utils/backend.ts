import {
  UserProfileServerType,
  UserServerType,
  UserSettingsServerType,
} from "server/routes/users";
import { BACKEND_URL } from "../config";
import { auth } from "../firebase";
import { useUserServer } from "../hooks/server/useUserServer";
import { useAuthStore, useProfileStore } from "../store";

export const pingServer = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/utility/ping`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      return true;
    }
    return false;
  } catch (error: any) {
    return false;
  }
};

export const checkIfUsernameExists = async (username: string) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/users/exists?username=${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-firebase-token": (await auth.currentUser?.getIdToken()) || "",
        } as any,
      }
    );
    const data = await res.json();
    if (data.success) {
      return data.exists;
    }
    return false;
  } catch (error: any) {
    return false;
  }
};

export const getMetadataFromURL = async (
  url: string
): Promise<{
  title?: string;
  description?: string;
  image?: string;
  url?: string;
} | null> => {
  return new Promise(async (resolve, reject) => {
    const { localUser, user } = useAuthStore.getState();
    try {
      const res = await fetch(`${BACKEND_URL}/utility/metadata?url=${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localUser?.token}`,
          "x-firebase-token": user?.token || "",
        } as any,
      });
      const data = await res.json();

      if (data.success) {
        resolve(data.data.metadata);
      }
      reject(null);
    } catch (error: any) {
      reject(error);
    }
  });
};

const userRoute = `${BACKEND_URL}/users`;
const followRoute = `${BACKEND_URL}/users/follow`;

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
    const { localUser, user } = useAuthStore.getState();
    try {
      const response = await fetch(
        `${userRoute}/base${id ? `?id=${id}` : ""}`,
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
    const { localUser, user } = useAuthStore.getState();
    try {
      const response = await fetch(
        `${userRoute}/profile${id ? `?id=${id}` : ""}`,
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
    const { localUser, user } = useAuthStore.getState();
    try {
      const response = await fetch(
        `${userRoute}/settings${id ? `?id=${id}` : ""}`,
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

const getFollowers = async (): Promise<{
  success: boolean;
  message: string;
  data?: {
    followers: (UserServerType & UserProfileServerType)[];
  };
}> => {
  return new Promise(async (resolve, reject) => {
    const { localUser, user } = useAuthStore.getState();
    try {
      const response = await fetch(`${followRoute}/get-followers`, {
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
    const { localUser, user } = useAuthStore.getState();
    try {
      const response = await fetch(`${followRoute}/get-following`, {
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

export const loadSelfProfileData = async () => {
  const { updateBase, updateProfile, updateFollowers, updateFollowing } =
    useProfileStore.getState();

  try {
    getProfileData()
      .then((res) => {
        updateProfile("bio", res.data?.user.bio || "");
        updateProfile("url", res.data?.user.url || "");
        updateProfile("birthday", res.data?.user.birthday || "");
        updateProfile(
          "interests",
          res.data?.user.interests ? JSON.parse(res.data?.user.interests) : []
        );
        updateProfile(
          "looking_for",
          res.data?.user.looking_for
            ? JSON.parse(res.data?.user.looking_for)
            : []
        );
        updateProfile(
          "location",
          res.data?.user.location ? JSON.parse(res.data?.user.location) : []
        );
        updateProfile(
          "languages",
          res.data?.user.languages ? JSON.parse(res.data?.user.languages) : []
        );
        updateProfile("zodiac", res.data?.user.zodiac || "");
        updateProfile("enneagram", res.data?.user.enneagram || "");
        updateProfile(
          "preferences",
          res.data?.user.preferences
            ? JSON.parse(res.data?.user.preferences)
            : []
        );
        updateProfile("emoji", res.data?.user.emoji || "");
      })
      .catch((e) => {
        console.log(e);
      });

    getBaseData()
      .then((res) => {
        updateBase("name", res.data?.user.name || "");
        updateBase("username", res.data?.user.username || "");
        updateBase("email", res.data?.user.email || "");
        updateBase("phone", res.data?.user.phone || "");
      })
      .catch((e) => {
        console.log(e);
      });

    getFollowers()
      .then((res) => {
        updateFollowers(res.data?.followers || []);
      })
      .catch((e) => {
        console.log(e);
      });

    getFollowing()
      .then((res) => {
        updateFollowing(res.data?.following || []);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
};
