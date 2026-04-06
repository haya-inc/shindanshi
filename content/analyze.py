import json
import os
import re

def get_title(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r'^title:\s*(.*?)$', content, re.MULTILINE)
            if match:
                return match.group(1).strip().strip("'\"")
            match = re.search(r'^#\s+(.*?)$', content, re.MULTILINE)
            if match:
                return match.group(1).strip()
    except Exception:
        pass
    return os.path.basename(file_path)

def main():
    base_dir = "docs"
    main_meta_path = os.path.join(base_dir, "meta.json")
    
    with open(main_meta_path, 'r', encoding='utf-8') as f:
        main_meta = json.load(f)

    book_title = "中小企業診断士 wiki"
    index_mdx_path = os.path.join(base_dir, "index.mdx")
    if os.path.exists(index_mdx_path):
        book_title = get_title(index_mdx_path)

    genre = "中小企業診断士試験（経済学・経済政策、財務・会計、企業経営理論、運営管理、経営法務、経営情報システム、中小企業経営・中小企業政策など）の資格取得に向けた学習用テキスト・参考書・過去問解説"

    volumes = main_meta.get("pages", [])

    chapters = []
    order = 1

    def process_dir(dir_path, vol_name):
        nonlocal order
        meta_path = os.path.join(dir_path, "meta.json")
        if not os.path.exists(meta_path):
            # If no meta.json, just read files? Actually, rely on meta.json for order
            return
            
        with open(meta_path, 'r', encoding='utf-8') as f:
            meta = json.load(f)
            
        current_vol = meta.get("title", os.path.basename(dir_path))
        
        for page in meta.get("pages", []):
            if page == "index" or page.startswith("---") or page == "meta.json":
                continue
                
            # Exclude specific files
            if "exam-study-guide" in page or "exam-question-mapping" in page:
                continue
                
            file_mdx = os.path.join(dir_path, f"{page}.mdx")
            file_md = os.path.join(dir_path, f"{page}.md")
            sub_dir = os.path.join(dir_path, page)
            
            target_file = None
            if os.path.exists(file_mdx):
                target_file = file_mdx
            elif os.path.exists(file_md):
                target_file = file_md
                
            if target_file:
                chapters.append({
                    "file": target_file.replace("\\", "/"),
                    "chapter": get_title(target_file),
                    "volume": current_vol,
                    "order": order
                })
                order += 1
            elif os.path.isdir(sub_dir):
                process_dir(sub_dir, current_vol)

    for vol_dir in volumes:
        if vol_dir == "index":
            continue
        process_dir(os.path.join(base_dir, vol_dir), None)

    output = {
        "title": book_title,
        "genre": genre,
        "format": "markdown",
        "chapters": chapters
    }

    print(json.dumps(output, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
