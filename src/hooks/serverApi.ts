"use server"

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions<B> {
  body?: B;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export default async function serverApi(baseUrl: string) {
  async function request<T, B = unknown>(
    method: Method,
    route: string,
    options?: ApiOptions<B>
  ): Promise<ApiResponse<T>> {
    const url = `${baseUrl}${route}`;
    const isFormData = options?.body instanceof FormData;

    const headers: Record<string, string> = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options?.headers ?? {}),
    };

    try {
      const body = isFormData? (options?.body as BodyInit): options?.body? JSON.stringify(options.body)
        : undefined;

      const res = await fetch(url, {method, headers, body, cache: "no-store"});

      const contentType = res.headers.get("content-type") || "";
      let data: unknown;

            switch (true) {
              case contentType.includes("application/json"):
                data = await res.json();
                break;

              case contentType.includes("text/"):
                data = await res.text();
                break;

              case contentType.includes("application/octet-stream"):
                data = await res.blob();
                break;

              case contentType.includes("multipart/form-data"):
                data = await res.formData();
                break;

              default:
                data = await res.text();
                break;
            }

      //switch case

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      return { data: data as T, error: null, status: res.status };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      return { data: null, error: message, status: 500 };
    }
  }


  return {
    get: <T>(route: string, headers?: Record<string, string>) =>
      request<T>("GET", route, { headers }),

    post: <T, B>(route: string, body: B, headers?: Record<string, string>) =>
      request<T, B>("POST", route, { body, headers }),

    put: <T, B>(route: string, body: B, headers?: Record<string, string>) =>
      request<T, B>("PUT", route, { body, headers }),

    del: <T>(route: string, headers?: Record<string, string>) =>
      request<T>("DELETE", route, { headers }),
  };
}
