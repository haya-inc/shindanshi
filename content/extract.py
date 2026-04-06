import json
import os
import re

base_dir = "docs"
main_meta_path = os.path.join(base_dir, "meta.json")

with open(main_meta_path, 'r', encoding='utf-8') as f:
    main_meta = json.load(f)

title = "中小企業診断士 wiki" # from meta.json title
genre = "中小企業診断士試験（経済学・経済政策、財務・会計、企業経営理論、運営管理、経営法務、経営情報システム、中小企業経営・中小企業政策など）の資格取得に向けた学習用テキスト・参考書・過去問解説"

volumes = main_meta.get("pages", [])

chapters = []
order = 1

def process_directory(dir_path, volume_name=None):
    global order
    meta_path = os.path.join(dir_path, "meta.json")
    if not os.path.exists(meta_path):
        return
        
    with open(meta_path, 'r', encoding='utf-8') as f:
        meta = json.load(f)
        
    current_vol = volume_name if volume_name else meta.get("title", os.path.basename(dir_path))
    
    for page in meta.get("pages", []):
        if page == "index" or page.startswith("---"):
            continue
            
        # Exclude guides, mappings, and index files that are not actual study content
        if "exam-study-guide" in page or "exam-question-mapping" in page or page == "meta.json":
            continue
            
        # Exclude reference index etc if needed, but let's include if it's content.
        
        file_mdx = os.path.join(dir_path, f"{page}.mdx")
        file_md = os.path.join(dir_path, f"{page}.md")
        sub_dir = os.path.join(dir_path, page)
        
        if os.path.exists(file_mdx):
            add_chapter(file_mdx, current_vol)
        elif os.path.exists(file_md):
            add_chapter(file_md, current_vol)
        elif os.path.isdir(sub_dir):
            # Recurse into sub-directory
            # Some subdirectories like h30 might not have meta.json but just files, wait, let's check
            sub_meta = os.path.join(sub_dir, "meta.json")
            if os.path.exists(sub_meta):
                process_directory(sub_dir, current_vol)
            else:
                # Add all mdx/md in subdir
                for f in sorted(os.listdir(sub_dir)):
                    if f.endswith(".mdx") or f.endswith(".md"):
                        if f != "index.mdx" and f != "index.md":
                            add_chapter(os.path.join(sub_dir, f), current_vol)

def add_chapter(file_path, volume_name):
    global order
    chapter_title = os.path.basename(file_path)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r'^title:\s*(.*?)$', content, re.MULTILINE)
            if match:
                chapter_title = match.group(1).strip().strip("'\"")
            else:
                match = re.search(r'^#\s+(.*?)$', content, re.MULTILINE)
                if match:
                    chapter_title = match.group(1).strip()
    except Exception as e:
        pass
        
    chapters.append({
        "file": file_path,
        "chapter": chapter_title,
        "volume": volume_name,
        "order": order
    })
    order += 1

for vol_dir in volumes:
    if vol_dir == "index":
        continue
    process_directory(os.path.join(base_dir, vol_dir))

output = {
    "title": title,
    "genre": genre,
    "format": "markdown",
    "chapters": chapters
}

print(json.dumps(output, ensure_ascii=False, indent=2))
