import { ImageKitClient } from "./ImageKitClient";
const IMAGE_KIT: string | undefined = process.env.NEXT_PUBLIC_IMAGE_KIT

export function getImageKitClientLive(): ImageKitClient {
  return {
    generatePath: function(name: string): string {
      return `${IMAGE_KIT}/${name}?tr=w-1000,c-at_max,f-jpg,q-50`
    }
  }
}
