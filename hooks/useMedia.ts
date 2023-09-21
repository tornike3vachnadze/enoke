import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Constants from "expo-constants";
import { useState } from "react";
import { Platform } from "react-native";
import { BACKEND_URL } from "../config";
import { useAuth } from "./useAuth";

export const useMedia = () => {
  const route = `${BACKEND_URL}/media`;
  const { localUser, user } = useAuth();

  const pickImage = async () => {
    try {
      let permission = false;
      if (Constants.platform?.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraRollStatus.status === "granted") {
          permission = true;
        } else {
          !cameraRollStatus.canAskAgain &&
            alert(
              "Sorry, Enok requires camera roll permissions to select photos! Please go to your settings and enable camera roll permissions."
            );
        }
      } else {
        permission = true;
      }

      if (permission) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          //   allowsEditing: true,
        });

        if (!result.canceled) {
          return result.assets[0].uri;
        }
      }

      return null;
    } catch (error) {
      console.log("pickImage", error);
      return null;
    }
  };

  const takePhoto = async () => {
    try {
      let permission = false;
      if (Constants.platform?.ios) {
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

        if (cameraStatus.status === "granted") {
          permission = true;
        } else {
          !cameraStatus.canAskAgain &&
            alert(
              "Sorry, Enok requires camera permissions to take photos! Please go to your settings and enable camera permissions."
            );
        }
      } else {
        permission = true;
      }

      if (permission) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          //   allowsEditing: true,
        });

        if (!result.canceled) {
          return result.assets[0].uri;
        }
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      //   allowsEditing: true,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }

    return null;
  };

  const takeVideo = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      //   allowsEditing: true,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }

    return null;
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["*/*"],
      copyToCacheDirectory: false,
    }).then((response) => {
      console.log("aaaa", response);
      console.log("bbbbb", response.type);
      if (response.assets[0].mimeType) {
        let { name, size, uri } = response?.assets[0];
        console.log(name, size, uri);
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        const fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: fileType,
        };
        console.log(fileToUpload, "...............file");
        return fileToUpload;
      }
    });
    return result;
  };

  const uploadFile = async (
    buffer: Buffer,
    filename: string,
    type: string
  ): Promise<{
    success: boolean;
    message: string;
    data?: {
      url: string;
    };
  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${route}/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localUser?.token}`,
            "x-firebase-token": user?.token || "",
          },
          body: JSON.stringify({
            buffer: buffer.toString("base64"),
            filename,
            type,
          }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error: ${errorText}`);
        }

        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    pickImage,
    takePhoto,
    pickVideo,
    takeVideo,
    pickDocument,
    uploadFile,
  };
};
