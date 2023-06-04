import json
from pathlib import Path

_all = Path(__file__).parent.joinpath('all.json')

_res = [{
    "title": f"[{i.get('from')}] " + i.get('title'),
    "permalink": i.get('link'),
    "content": i.get('text'),
    "date": i.get('update-time')
} for i in json.loads(_all.read_text(encoding='utf8'))]

Path(__file__).parent.joinpath('index.json').write_text(json.dumps(_res, ensure_ascii=False), encoding='utf8')