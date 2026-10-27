"""Verify a public M7 Pages deployment through the configured HTTPS proxy.

Usage: python3 scripts/verify-public-deployment.py <expected-full-commit>
The SHA must come from the successful deployment record, not an assumed main tip.
"""
import hashlib
import json
import re
import sys
import subprocess
import time
import urllib.parse
import urllib.request
from html.parser import HTMLParser

BASE = 'https://fnfmobilitymy-boop.github.io/KENNY/'
EXPECTED = sys.argv[1] if len(sys.argv) == 2 else ''
if not re.fullmatch(r'[0-9a-f]{40}', EXPECTED):
    raise SystemExit('Provide the full expected deployment commit SHA.')

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = set()
        self.sections = set()
        self.text = []
        self.links = set()
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'a' and a.get('href'):
            self.links.add(a['href'])
        if 'id' in a:
            self.sections.add(a['id'])
        source = a.get('src') if tag == 'script' else a.get('href') if tag == 'link' else None
        if source and '/_next/' in source:
            self.assets.add(source)
    def handle_data(self, text):
        self.text.append(text)


def get(path='', fresh=False):
    url = urllib.parse.urljoin(BASE, path)
    if fresh:
        parts = urllib.parse.urlsplit(url)
        url = urllib.parse.urlunsplit(parts._replace(query=urllib.parse.urlencode({'verify': EXPECTED, 't': time.time_ns()})))
    req = urllib.request.Request(url, headers={'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'User-Agent': 'Kenny-M7-deployment-verification'})
    with urllib.request.urlopen(req, timeout=30) as response:
        if response.status != 200:
            raise AssertionError(f'{path}: expected HTTP 200, received {response.status}')
        headers = {key: response.headers.get(key) for key in ('cache-control', 'etag', 'age', 'last-modified', 'content-type')}
        return response.read(), headers


metadata, metadata_headers = get('deployment.json', fresh=True)
metadata = json.loads(metadata)
assert metadata['commit'] == EXPECTED, 'Public deployment metadata does not match the expected SHA.'
assert metadata['milestone'] == 'M7'
assert re.fullmatch(r'[0-9a-f]{40}', metadata['sourceTree']), 'Missing application source-tree fingerprint.'
expected_tree = subprocess.check_output(['git', 'rev-parse', f'{EXPECTED}:src'], text=True).strip()
assert metadata['sourceTree'] == expected_tree, 'Public source fingerprint differs from the expected local commit.'
normal, normal_headers = get()
fresh, fresh_headers = get(fresh=True)
for label, body in [('normal', normal), ('cache-busted', fresh)]:
    page = Page()
    page.feed(body.decode())
    text = ' '.join(page.text)
    assert 'Big ideas.' in text and 'business studio.' in text, f'{label}: M3 hero missing'
    assert 'LANDING PAGE COMING IN M3' not in text.upper(), f'{label}: obsolete M2 text still served'
    assert {'product-preview','modules','how-it-works','use-cases','pricing','faq'} <= page.sections, f'{label}: M3 sections missing'
    assert 'AI Website Builder' in text and 'AI Video Studio' in text and 'Pricing to be announced' in text
    assert any(link.rstrip('/') == '/KENNY/app' for link in page.links), f'{label}: dashboard entry link missing'
page = Page()
page.feed(fresh.decode())
all_assets = set(page.assets)
new_routes = {'login/':'Back to your orbit.', 'signup/':'Make room for your ideas.', 'forgot-password/':'Find your way back.', 'verify-email/':'Check your next step.', 'onboarding/':'A space for your next chapter.', 'terms/':'Not a final legal document', 'privacy/':'Not a final legal document'}
for route, expected_text in new_routes.items():
    content, _ = get(route, fresh=True)
    assert expected_text in content.decode(), f'{route}: expected M4 content missing'
    route_page = Page()
    route_page.feed(content.decode())
    all_assets.update(route_page.assets)
module_routes = ['website-builder','image-studio','video-studio','marketing','seo-ads','sales','crm','documents','booking','ecommerce','automations','analytics','billing','settings']
dashboard, dashboard_headers = get('app/', fresh=True)
assert 'A little clarity.' in dashboard.decode() and 'No AI agents are running.' in dashboard.decode(), 'M5 dashboard missing'
assert 'Kenny Studio' in dashboard.decode() and 'Sample tasks' in dashboard.decode()
app_page = Page()
app_page.feed(dashboard.decode())
all_assets.update(app_page.assets)
workspace_normal, _ = get('app/workspace/')
workspace, workspace_headers = get('app/workspace/', fresh=True)
assert workspace_normal == workspace, 'Normal and cache-busted workspace responses differ.'
workspace_page = Page()
workspace_page.feed(workspace.decode())
workspace_text = ' '.join(workspace_page.text)
assert all(label in workspace_text for label in ('AI Workspace', 'DEMO MODE', 'Preview simulator')), 'M6 workspace prototype missing'
assert 'Frontend shell' not in workspace_text, 'Workspace still serves its old shell'
all_assets.update(workspace_page.assets)
module_signatures = {
 'website-builder':'Website concept preview', 'image-studio':'Sample asset library',
 'video-studio':'Storyboard, not playback', 'documents':'Live local document preview',
 'marketing':'Post draft editor', 'seo-ads':'Keyword research samples',
 'sales':'Sample conversation inbox', 'crm':'Relationship directory',
 'booking':'Sample appointment calendar', 'ecommerce':'Sample product editor',
 'automations':'Workflow canvas', 'analytics':'Fictional trend example',
 'billing':'Current plan preview', 'settings':'Profile draft'
}
for slug in module_routes:
    normal_module, _ = get(f'app/{slug}/')
    content, _ = get(f'app/{slug}/', fresh=True)
    assert normal_module == content, f'{slug}: normal/fresh HTML mismatch'
    route_page = Page()
    route_page.feed(content.decode())
    module_text = ' '.join(route_page.text)
    assert 'DEMO' in module_text and 'Frontend prototype' in module_text, f'{slug}: M7 prototype missing'
    assert module_signatures[slug] in module_text, f'{slug}: purpose-built content missing'
    assert 'Coming soon · Frontend shell' not in module_text, f'{slug}: obsolete shell still served'
    all_assets.update(route_page.assets)
showcase, _ = get('design-system/', fresh=True)
assert 'with intention.' in showcase.decode(), 'Design-system route unavailable'
showcase_page = Page()
showcase_page.feed(showcase.decode())
all_assets.update(showcase_page.assets)
for source in all_assets:
    assert source.startswith('/KENNY/_next/'), f'Incorrect asset base path: {source}'
    get(source)
print(json.dumps({'expected_commit': EXPECTED, 'metadata': metadata, 'url': BASE, 'root_http': 200, 'normal_html_sha256': hashlib.sha256(normal).hexdigest(), 'fresh_html_sha256': hashlib.sha256(fresh).hexdigest(), 'normal_equals_fresh': normal == fresh, 'asset_count': len(all_assets), 'all_assets_http_200': True, 'all_asset_paths_under_KENNY': True, 'design_system_http': 200, 'm4_routes_checked': list(new_routes), 'm5_dashboard_http': 200, 'm7_module_prototypes_checked': module_routes, 'm7_normal_equals_fresh': True, 'm6_workspace_http': 200, 'workspace_normal_equals_fresh': workspace_normal == workspace, 'workspace_headers': workspace_headers, 'dashboard_headers': dashboard_headers, 'normal_headers': normal_headers, 'fresh_headers': fresh_headers, 'metadata_headers': metadata_headers}, indent=2))
