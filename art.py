import re
from pathlib import Path

def file_sort_key(p: Path):
    # 按文件名中的数字顺序排序，如 1-5.md, 6-10.md, 11-15.md
    nums = [int(n) for n in re.findall(r'\d+', p.stem)]
    a = nums[0] if len(nums) > 0 else 10**9
    b = nums[1] if len(nums) > 1 else 10**9
    return (a, b, p.name.lower())

def extract_artist_lines(text: str):
    items = []
    for raw in text.splitlines():
        s = raw.strip()
        if not s:
            continue
        # 排除图片、frontmatter、标题以及引用式链接定义
        if s.startswith('!['):
            continue
        if s.startswith('---') or s.startswith('#'):
            continue
        if re.match(r'^\[[^\]]+\]\([^)]+\)', s) and not re.match(r'^\[[^\]]+\]:', s):
            items.append(s)
    return items

def main():
    base = Path(r"C:\data\my-website\docs\loli\artist")
    out_path = base / "all.md"

    files = sorted(base.glob("*-*.md"), key=file_sort_key)

    collected = []
    for f in files:
        try:
            text = f.read_text(encoding='utf-8')
        except UnicodeDecodeError:
            # 兼容可能存在的 BOM
            text = f.read_text(encoding='utf-8-sig')
        collected.extend(extract_artist_lines(text))

    header = "---\nsidebar_position: 0\n---\n\n"
    body = "\n\n".join(f"{i}. {line}" for i, line in enumerate(collected, start=1))
    out_path.write_text(header + body + "\n", encoding='utf-8')
    print(f"Wrote {len(collected)} items to {out_path}")

if __name__ == "__main__":
    main()
