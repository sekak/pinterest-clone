import { vi } from "vitest";

export const mockErrorServer = () => {
  vi.mock("@/components/handleErr/ErrorServer", async () => ({
    default: ()=>{
      return <h1>Oops, something went wrong!</h1>
    }
  }));
};
