#!/usr/bin/env python3
"""
Deploy unified distribution artifact (dist/) to Netlify via Netlify REST API.
Loads credentials securely from .env (NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID).
"""

import os
import sys
import io
import json
import zipfile
import urllib.request
import urllib.error
from dotenv import dotenv_values

def deploy():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(script_dir, '..'))
    env_file = os.path.join(root_dir, '.env')

    if not os.path.exists(env_file):
        print(f"Error: .env file not found at {env_file}", file=sys.stderr)
        sys.exit(1)

    env = dotenv_values(env_file)
    token = env.get('NETLIFY_AUTH_TOKEN', '').strip()
    site_id = env.get('NETLIFY_SITE_ID', '').strip()

    if not token or token.startswith('your_'):
        print("Error: Valid NETLIFY_AUTH_TOKEN missing in .env", file=sys.stderr)
        sys.exit(1)

    if not site_id or site_id.startswith('your_'):
        print("Error: Valid NETLIFY_SITE_ID missing in .env", file=sys.stderr)
        sys.exit(1)

    dist_dir = os.path.join(root_dir, 'dist')
    if not os.path.exists(dist_dir):
        print(f"Error: dist directory not found at {dist_dir}. Run 'npm run build:all' first.", file=sys.stderr)
        sys.exit(1)

    # 1. Package dist directory into memory buffer
    print("📦 Packaging distribution artifacts...")
    zip_buffer = io.BytesIO()
    file_count = 0
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(dist_dir):
            for f in files:
                abs_path = os.path.join(root, f)
                rel_path = os.path.relpath(abs_path, dist_dir)
                zf.write(abs_path, rel_path)
                file_count += 1

    zip_bytes = zip_buffer.getvalue()
    print(f"   Packed {file_count} files ({len(zip_bytes) / 1024:.1f} KB)")

    # 2. Upload zip to Netlify deploys API
    print("🚀 Uploading to Netlify edge network...")
    deploy_url = f"https://api.netlify.com/api/v1/sites/{site_id}/deploys"
    req = urllib.request.Request(
        deploy_url,
        data=zip_bytes,
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/zip',
            'User-Agent': 'PortfolioNetlifyDeploy/1.0'
        },
        method='POST'
    )

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        print(f"Deployment failed (HTTP {e.code}): {e.read().decode()}", file=sys.stderr)
        sys.exit(1)

    deploy_id = data.get('id')
    print(f"✅ Deployment uploaded successfully! (Deploy ID: {deploy_id})")

    # 3. Check deploy completion
    check_req = urllib.request.Request(
        f"https://api.netlify.com/api/v1/deploys/{deploy_id}",
        headers={'Authorization': f'Bearer {token}'}
    )
    with urllib.request.urlopen(check_req) as resp:
        check_data = json.loads(resp.read().decode())

    live_url = check_data.get('ssl_url') or data.get('ssl_url') or f"https://{data.get('name')}.netlify.app"
    preview_url = check_data.get('deploy_ssl_url') or data.get('deploy_ssl_url')

    print("\n🌐 Live Deployment URLs:")
    print(f"   Production: {live_url}")
    print(f"   Tools Lab:  {live_url}/tools/")
    print(f"   Deploy Log: {preview_url}")

if __name__ == '__main__':
    deploy()
