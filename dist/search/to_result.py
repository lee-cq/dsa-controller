import json
from pathlib import Path

_all = Path(__file__).parent.joinpath('all.json')

_res = [{
    "title": i.get(),
    "permalink": i.get(),
    "content": i.get(),
    "date": i.get()
} for i in json.loads(_all.read_text(encoding='utf8'))]

Path(__file__).parent.joinpath('index.json').write_text(json.dumps(_res), encoding='utf8')