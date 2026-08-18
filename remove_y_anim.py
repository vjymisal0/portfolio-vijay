import re

def remove_y_animation(filepath, var_name):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace hidden: { opacity: 0, y: 16 } -> hidden: { opacity: 0 }
    content = re.sub(r'hidden:\s*\{\s*opacity:\s*0,\s*y:\s*\d+\s*\}', 'hidden: { opacity: 0 }', content)
    # Replace visible: { opacity: 1, y: 0 ... } -> visible: { opacity: 1 ... }
    content = re.sub(r'visible:\s*\{\s*opacity:\s*1,\s*y:\s*0,\s*', 'visible: { opacity: 1, ', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

remove_y_animation('components/open-source.tsx', 'cardVariants')
remove_y_animation('components/projects.tsx', 'cardVariants')
remove_y_animation('components/education.tsx', 'itemVariants')

print("done")
