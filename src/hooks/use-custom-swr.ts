import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { swrFetcher } from "@/lib/utils";

const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  revalidateIfStale: false,
};

export function useCustomSWR<T>(
  key: string[] | null,
  url: string | null,
  config?: SWRConfiguration
): SWRResponse<T, any> {
  return useSWR<T>(key, url ? () => swrFetcher(url) : null, {
    ...defaultConfig,
    ...config,
  });
}
