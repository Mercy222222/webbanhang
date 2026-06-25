import json, re
with open(r'C:\Users\trkie\.gemini\antigravity-ide\brain\49381a80-02dd-4c4c-b2b7-c8d90732a696\.system_generated\steps\287\content.md', encoding='utf-8') as f:
    html = f.read()

matches = re.findall(r'self\.__next_f\.push\(\[(?:\d+),"(.*?)"\]\)', html)
with open('scratch.txt', 'w', encoding='utf-8') as out:
    for m in matches:
        try:
            out.write(json.loads('"' + m + '"') + '\n')
        except:
            pass
