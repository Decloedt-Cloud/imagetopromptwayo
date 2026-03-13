import type { Ai } from "@cloudflare/workers-types";

export interface Env {
  AI: Ai;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function errorResponse(message: string, status: number = 400): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...CORS_HEADERS, "content-type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    try {
      if (request.method === "POST") {
        const contentType = request.headers.get("content-type") || "";
        let imageBuffer: ArrayBuffer | null = null;
        let prompt = "Generate a caption for this image";

        if (contentType.includes("multipart/form-data")) {
          const form = await request.formData();
          const file = form.get("image");
          const customPrompt = form.get("prompt");
          if (typeof customPrompt === "string" && customPrompt.trim().length > 0) {
            prompt = customPrompt.trim();
          }
          if (file instanceof File) {
            if (file.size > MAX_FILE_SIZE) {
              return errorResponse(`File too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB`);
            }
            imageBuffer = await file.arrayBuffer();
          }
        } else if (contentType.includes("application/json")) {
          try {
            const body = await request.json();
            if (typeof body?.prompt === "string" && body.prompt.trim().length > 0) {
              prompt = body.prompt.trim();
            }
            if (typeof body?.image_url === "string" && body.image_url.length > 0) {
              const res = await fetchWithTimeout(body.image_url, 10000);
              if (!res.ok) {
                return errorResponse("Failed to fetch image from URL", 502);
              }
              imageBuffer = await res.arrayBuffer();
              if (imageBuffer.byteLength > MAX_FILE_SIZE) {
                return errorResponse(`Image too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB`);
              }
            } else if (typeof body?.image === "string" && body.image.startsWith("data:")) {
              const data = body.image.split(",")[1] || "";
              const binary = Uint8Array.from(atob(data), c => c.charCodeAt(0));
              imageBuffer = binary.buffer;
              if (imageBuffer.byteLength > MAX_FILE_SIZE) {
                return errorResponse(`Image too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB`);
              }
            }
          } catch {
            return errorResponse("Invalid JSON body", 400);
          }
        }

        if (!imageBuffer) {
          const res = await fetchWithTimeout("https://cataas.com/cat", 10000);
          imageBuffer = await res.arrayBuffer();
        }

        const input = {
          image: [...new Uint8Array(imageBuffer)],
          prompt,
          max_tokens: 512,
        };

        const response = await env.AI.run("@cf/llava-hf/llava-1.5-7b-hf", input);
        return new Response(JSON.stringify(response), {
          headers: { ...CORS_HEADERS, "content-type": "application/json" },
        });
      }

      const res = await fetchWithTimeout("https://cataas.com/cat", 10000);
      const blob = await res.arrayBuffer();
      const input = {
        image: [...new Uint8Array(blob)],
        prompt: "Generate a caption for this image",
        max_tokens: 512,
      };
      const response = await env.AI.run("@cf/llava-hf/llava-1.5-7b-hf", input);
      return new Response(JSON.stringify(response), {
        headers: { ...CORS_HEADERS, "content-type": "application/json" },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Internal server error";
      return new Response(JSON.stringify({ error: "Server error", details: message }), {
        status: 500,
        headers: { ...CORS_HEADERS, "content-type": "application/json" },
      });
    }
  },
} satisfies ExportedHandler<Env>;
