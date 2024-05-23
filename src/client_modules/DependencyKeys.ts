import { APIClient } from "./APIClient"
import { getAPICLientLive } from "./APIClient.live";

export type DependencyKeys = {
  apiClient: APIClient;
}

export const dependencyKeys: DependencyKeys = {
  apiClient: getAPICLientLive()
}
