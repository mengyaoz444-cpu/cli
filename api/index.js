export default async function handler(req, res) {
  const targetUrl = "https://gcli.ggchan.dev" + req.url.replace("/api", "");

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" ? req.body : undefined,
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).send("Proxy error: " + error.message);
  }
}
