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
    
    # 【修改点】：使用 .glob("*.md") 只获取当前文件夹的md文件，忽略子文件夹
    for filepath in docs_dir.glob("*.md"):
        # 确保它是一个文件而不是同名的文件夹
        if not filepath.is_file():
            continue
            
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 解析内容
            match = frontmatter_pattern.match(content)
            if match:
                frontmatter = match.group(1)
                body = match.group(2)  # 这里就是去除了前面注释的正文
                
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
    
    # 输出到目标文件
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(merged_content)
        
    print(f"成功合并 {len(documents)} 个文件并输出到: {output_file}")

if __name__ == "__main__":
    process_markdown_files()