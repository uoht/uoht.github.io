import os
import re
from pathlib import Path

def process_markdown_files():
    # 定义输入和输出路径
    docs_dir = Path(r"C:\data\my-website\docs")
    output_file = Path(r"C:\data\my-website\2.md")
    
    documents = []
    
    # 正则：匹配 --- 包裹的注释区 和 下方的正文区
    frontmatter_pattern = re.compile(r'^---\s*\n(.*?)\n---\s*\n(.*)', re.DOTALL)
    # 正则：匹配 sidebar_position 的值
    position_pattern = re.compile(r'^sidebar_position:\s*(\d+)', re.MULTILINE)
    
    # 使用 .glob("*.md") 只获取当前文件夹的md文件（不管子文件夹）
    for filepath in docs_dir.glob("*.md"):
        if not filepath.is_file():
            continue
            
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 解析内容
            match = frontmatter_pattern.match(content)
            if match:
                frontmatter = match.group(1)
                body = match.group(2)  # 正文
                
                # 提取数字
                pos_match = position_pattern.search(frontmatter)
                if pos_match:
                    position = int(pos_match.group(1))
                    
                    # 筛选 4 到 8 之间的文档
                    if 4 <= position <= 8:
                        documents.append((position, body))
        except Exception as e:
            print(f"处理文件 {filepath} 时出错: {e}")
            
    if not documents:
        print("当前文件夹中没有找到 sidebar_position 在 4 到 8 之间的文件。")
        return
        
    # 按 sidebar_position 的顺序排序 (4, 5, 6, 7, 8)
    documents.sort(key=lambda x: x[0])
    
    # 拼合正文，中间用两个换行符隔开
    merged_content = "\n\n".join([doc[1].strip() for doc in documents])
    
    # 【新增功能 1】：将所有标题层数加深（增加一个 #）
    # 正则解释：匹配每一行开头的连续 #，且要求 # 后面必须跟一个空格 (?=\s)，避免误伤代码注释
    heading_pattern = re.compile(r'^(#+)(?=\s)', re.MULTILINE)
    # 把匹配到的连续 # 替换为 # + 原来的 #
    merged_content = heading_pattern.sub(r'#\1', merged_content)
    
    # 【新增功能 2】：在末尾附加指定的一段话
    append_text = (
        "刚刚看到<https://www.kungal.com/topic/3287> b站有很多假资源UP，我非常感同身受，"
        "我是个萌新时也经常为找不到资源苦恼。我之前在开源网站[lolidoc.com](https://lolidoc.com/)上"
        "整理了二次元资源的导航，现在差不多完善了，在这里也发一份，欢迎补充"
        "![Sticker](https://sticker.kungal.com/stickers/KUNgal1/17.webp \"Sticker\")"
    )
    # 将附加文本加在最后（前面空两行）
    merged_content += f"\n\n{append_text}\n"
    
    # 输出到目标文件
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(merged_content)
        
    print(f"成功合并 {len(documents)} 个文件并输出到: {output_file}")

if __name__ == "__main__":
    process_markdown_files()