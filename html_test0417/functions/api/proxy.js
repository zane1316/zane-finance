// Cloudflare Pages Function: proxy Eastmoney/3rd-party API requests
// This bypasses CORS and network-layer blocks by routing API calls through same-origin proxy

export async function onRequestGet(context) {
  const { request } = context
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get('url')

  if (!targetUrl) {
    return jsonResponse({ error: 'Missing url parameter' }, 400)
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Referer: 'https://quote.eastmoney.com/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })

    const body = await response.text()

    // Try to parse JSONP: callbackName(data);
    const trimmed = body.trim()
    const jsonpMatch = trimmed.match(/^([^(]+)\((.*)\)[;\s]*$/s)
    if (jsonpMatch) {
      try {
        const data = JSON.parse(jsonpMatch[2])
        return jsonResponse(data, 200)
      } catch (e) {
        // Not valid JSONP payload, return raw
      }
    }

    // Try to return as pure JSON
    try {
      const data = JSON.parse(trimmed)
      return jsonResponse(data, 200)
    } catch (e) {
      // Return raw text
      return new Response(trimmed, {
        status: response.status,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  } catch (err) {
    return jsonResponse({ error: err.message || 'Proxy request failed' }, 502)
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
