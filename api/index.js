export default async function handler(req, res) {
  const target = "https://gcli.ggchan.dev" + req.url;

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: {
        ...req.headers,
        "x-forwarded-for": "1.1.1.1",   // 隐藏来源
        "user-agent": "Mozilla/5.0",    // 模拟浏览器
      },
      body: req.method !== "GET" ? req.body : undefined,
      redirect: "follow"
    });

    const data = await response.text();

    res.status(response.status);

    response.headers.forEach((v, k) => {
      if (k.toLowerCase() !== "content-security-policy") {
        res.setHeader(k, v);
      }
    });

    res.send(data);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
}
