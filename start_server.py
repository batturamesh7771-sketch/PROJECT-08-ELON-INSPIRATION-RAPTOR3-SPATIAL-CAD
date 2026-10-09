#!/usr/bin/env python3
"""
Lightweight development HTTP server for Project 08:
SpaceX Starship Raptor 3 Spatial CAD & Gesture Engine.
Includes Cross-Origin Isolated headers for optimal WebGL and MediaPipe performance.
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080

class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow cross-origin resources for MediaPipe CDN models
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def main():
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    
    with socketserver.TCPServer(("", PORT), CustomHTTPHandler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print("=" * 70)
        print("🚀 PROJECT 08: SPACEX STARSHIP RAPTOR 3 SPATIAL CAD SERVER")
        print("=" * 70)
        print(f"📡 Running live at: {url}")
        print("💡 Press Ctrl+C to terminate the local server.\n")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server gracefully...")
            sys.exit(0)

if __name__ == '__main__':
    main()
