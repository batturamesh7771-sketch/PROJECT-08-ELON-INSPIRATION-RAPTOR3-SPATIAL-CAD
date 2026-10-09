/**
 * Automated Snapshot / Demo Capture Script
 * Connects to Headless Chrome via CDP and exports high-res WebGL screenshot
 */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const indexPath = path.resolve(__dirname, '..', 'index.html');
const targetUrl = `file:///${indexPath.replace(/\\/g, '/')}`;
const outputPath = path.resolve(__dirname, '..', 'assets', 'images', 'demo_capture.png');

const chrome = spawn(chromePath, [
  '--remote-debugging-port=9227',
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1920,1080',
  targetUrl
]);

async function capture() {
  await new Promise(r => setTimeout(r, 3000));
  try {
    const res = await fetch('http://127.0.0.1:9227/json');
    const tabs = await res.json();
    const tab = tabs.find(t => t.url.includes('index.html') || t.url.includes('raptor3'));
    if (!tab) {
      console.log('Tab not found');
      chrome.kill();
      return;
    }
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Page.captureScreenshot', params: { format: 'png' } }));
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.id === 1 && data.result && data.result.data) {
        fs.writeFileSync(outputPath, Buffer.from(data.result.data, 'base64'));
        console.log(`SUCCESS: Demo screenshot exported to: ${outputPath}`);
        chrome.kill();
      }
    };
  } catch (err) {
    console.error('Capture error:', err);
    chrome.kill();
  }
}

capture();
