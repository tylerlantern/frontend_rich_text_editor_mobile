
import EditorInfoResponse from "@/response/EditorInfoResponse";
import { APIClient } from "./APIClient";

const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL
const endpoint = function(path: string): string {
  return `${BASE_URL}/${path}`
}

export function getAPICLientLive(): APIClient {
  return {
    getEditorInfo: async function({ placeId, token }): Promise<EditorInfoResponse | null> {
      const url = endpoint(
        `/places/${placeId}/advancedEditor/uploadInfo`
      )
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Custom-Header': 'CustomHeaderValue'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data: EditorInfoResponse = await response.json();
      return data;
    }
  }
}
