const TARGET_ORIGIN = 'https://drive.google.com';
const TARGET_PATH = '/uc';

function appendQueryParams(url, query = {}) {
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, String(v)));
      return;
    }
    if (value != null) {
      url.searchParams.set(key, String(value));
    }
  });
}

export default async function handler(req, res) {
  try {
    const upstreamUrl = new URL(`${TARGET_ORIGIN}${TARGET_PATH}`);
    appendQueryParams(upstreamUrl, req.query);

    const upstreamRes = await fetch(upstreamUrl.toString(), {
      method: 'GET',
      headers: {
        accept: 'text/csv,text/plain,*/*',
      },
    });

    const body = await upstreamRes.text();
    const contentType = upstreamRes.headers.get('content-type') ?? 'text/plain; charset=utf-8';

    res.status(upstreamRes.status);
    res.setHeader('content-type', contentType);
    res.setHeader('cache-control', 'no-store');
    res.send(body);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upstream fetch failed';
    res.status(502).json({ error: message });
  }
}
