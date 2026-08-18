with open('app/(site)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("initial={{ opacity: 0, y: 12 }}", 'initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(4px)" }}')
content = content.replace("animate={{ opacity: 1, y: 0 }}", 'animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}')
content = content.replace("exit={{ opacity: 0, y: -12 }}", 'exit={{ opacity: 0, y: -20, scale: 0.96, filter: "blur(4px)" }}')
content = content.replace("transition={{ duration: 0.22, ease: 'easeInOut' }}", "transition={{ duration: 0.3, ease: 'easeOut' }}")

with open('app/(site)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
