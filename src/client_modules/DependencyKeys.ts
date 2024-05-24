import { getAPICLientLive } from "./APIClient.live";
import { getImageKitClientLive } from "./ImageKitClient.live";

export const apiClient = getAPICLientLive()
export const imageKitClient = getImageKitClientLive()
