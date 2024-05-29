import EditorInfoResponse from "@/response/EditorInfoResponse"

export type APIClient = {
  getEditorInfo: (query: { placeId: number, token: string }) => Promise<EditorInfoResponse | null>
}

class UnauthorizedError extends Error { }

export { UnauthorizedError };
