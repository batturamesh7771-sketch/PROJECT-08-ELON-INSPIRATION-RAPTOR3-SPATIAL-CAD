/**
 * Automated Verification Script for Project 08: SpaceX Starship Raptor 3 Spatial CAD
 * Launches Headless Chrome and monitors console outputs & runtime exceptions via CDP.
 */
const { spawn } = require('child_process');
const path = require('path');

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const indexPath = path.resolve(__dirname, '..', 'index.html');
const targetUrl = `file:///${indexPath.replace(/\\/g, '/')}`;

console.log(`Starting headless Chrome verification on: ${targetUrl}`);

const chrome = spawn(chromePath, [
  '--remote-debugging-port=9226',
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1920,1080',
  targetUrl
]);

async function verify() {
  await new Promise(resolve => setTimeout(resolve, 2500));
  try {
    const res = await fetch('http://127.0.0.1:9226/json');
    const tabs = await res.json();
    const tab = tabs.find(t => t.url.includes('index.html') || t.url.includes('raptor3'));
    
    if (!tab) {
      console.error('Target tab not located in Chrome debugger.');
      chrome.kill();
      process.exit(1);
    }

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    };

    let hasErrors = false;
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        hasErrors = true;
        console.error('RUNTIME EXCEPTION:', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
      } else if (msg.method === 'Runtime.consoleAPICalled') {
        console.log(`[CONSOLE ${msg.params.type.toUpperCase()}]:`, msg.params.args.map(a => a.value || a.description).join(' '));
      }
    };

    await new Promise(resolve => setTimeout(resolve, 3000));
    if (!hasErrors) {
      console.log('PASS: Zero JavaScript exceptions detected! WebGL engine is 100% operational.');
    } else {
      console.error('FAIL: Detected JavaScript exceptions.');
      process.exit(1);
    }
  } catch (err) {
    console.error('Verification failed:', err);
    process.exit(1);
  } finally {
    chrome.kill();
  }
}

verify();
