import re
from pathlib import Path

ZERO_WIDTH = "\ufeff\u200b\u200c\u200d\u2060"
STRIP_CHARS = " \t\r\n\u3000" + ZERO_WIDTH  # 含全角空格与零宽字符

def file_sort_key(p: Path):
    nums = [int(n) for n in re.findall(r'\d+', p.stem)]
    a = nums[0] if len(nums) > 0 else 10**9
    b = nums[1] if len(nums) > 1 else 10**9
    return (a, b, p.name.lower())

def read_text_any(p: Path) -> str:
    try:
        return p.read_text(encoding='utf-8')
    except UnicodeDecodeError:
        return p.read_text(encoding='utf-8-sig')

# 检测是否在 frontmatter 中包含 draft: true
def has_draft_true(text: str) -> bool:
    # 只在开头的 frontmatter 中判断
    if not text.startswith('---'):
        return False
    lines = text.splitlines()
    # 找 frontmatter 结束行
    try:
        end = next(i for i in range(1, len(lines)) if lines[i].strip() == '---')
    except StopIteration:
        return False
    front = "\n".join(lines[1:end])
    # 宽松匹配 draft: true（忽略大小写与两边空格）
    return re.search(r'^\s*draft\s*:\s*true\s*$', front, re.IGNORECASE | re.MULTILINE) is not None

# 允许前缀为列表符号/数字编号，要求第一个“有效内容”是内联链接；排除图片行
LEADING_LINK_RE = re.compile(
    r'^\s*(?:[-*+]\s+|\d+\.\s+)?(?!\!)\[[^\]]+\]\([^)]+\)'
)
REF_LINK_RE = re.compile(r'^\s*\[[^\]]+\]:')  # 引用式链接定义

def extract_artist_lines(text: str):
    items = []
    in_code_block = False
    for raw in text.splitlines():
        s = raw.replace("\ufeff", "").replace("\u200b", "")
        s = s.strip(STRIP_CHARS)

        if s.startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue
        if not s:
            continue

        if s.startswith('---') or s.startswith('#'):
            continue
        if s.startswith('!['):
            continue
        if REF_LINK_RE.match(s):
            continue

        if LEADING_LINK_RE.match(s):
            items.append(s)
    return items

def collect_from_files(files):
    collected = []
    for f in files:
        text = read_text_any(f)
        if has_draft_true(text):
            continue
        collected.extend(extract_artist_lines(text))
    return collected

def collect_from_file(p: Path):
    if not p.exists():
        return []
    text = read_text_any(p)
    if has_draft_true(text):
        return []
    return extract_artist_lines(text)

def render_section(title: str, items):
    header = f"## {title}\n\n"
    if not items:
        return header
    body = "\n\n".join(f"{i}. {line}" for i, line in enumerate(items, start=1))
    return header + body + "\n\n"

def main():
    base = Path(r"C:\data\my-website\docs\loli\artist")
    out_path = base / "all.md"

    illust_files = sorted(
        [p for p in base.glob("*-*.md")
         if p.name.lower() not in {"all.md", "animator.md", "less.md"}],
        key=file_sort_key
    )
    illust_items = collect_from_files(illust_files)

    animator_items = collect_from_file(base / "animator.md")
    less_items = collect_from_file(base / "less.md")

    parts = []
    parts.append("---\nsidebar_position: 0\n---\n\n")
    parts.append("# 总览\n\n")
    parts.append(render_section("插画", illust_items))
    parts.append(render_section("动画", animator_items))
    parts.append(render_section("较少", less_items))

    out_text = "".join(parts).rstrip() + "\n"
    out_path.write_text(out_text, encoding='utf-8')

    print(
        f"Wrote 插画({len(illust_items)}), 动画({len(animator_items)}), "
        f"较少({len(less_items)}) items to {out_path}"
    )

if __name__ == "__main__":
    main()
