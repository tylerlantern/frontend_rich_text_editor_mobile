
import EditorInfoResponse from "@/response/EditorInfoResponse";
import { APIClient, UnauthorizedError } from "./APIClient";

const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL
const endpoint = function(path: string): string {
  return `${BASE_URL}/${path}`
}

export function getAPICLientLive(): APIClient {
  return {
    getEditorInfo: async function({ placeId, token, log }): Promise<EditorInfoResponse | null> {
      const url = endpoint(
        `v1/places/${placeId}/advancedEditor/uploadInfo`
      )
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new UnauthorizedError();
        }
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data: EditorInfoResponse = await response.json();
      return data;
    }
  }
}
