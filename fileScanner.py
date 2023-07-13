import os

def list_files(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            file_path = file_path.replace("\\", "/")  # Ersetze "\" durch "/"
            file_list.append(f'"{file_path}"')  # Pfade als Strings speichern
    return file_list

def replace_files_in_backgroundjs(backgroundjs_file, file_list):
    with open(backgroundjs_file, 'r') as f:
        content = f.read()

    start_marker = 'chrome.scripting.executeScript({\n    target: { tabId: tab.id },\n    files: ['
    end_marker = '],\n  });\n});'

    start_index = content.find(start_marker)
    end_index = content.find(end_marker) + len(end_marker)

    if start_index != -1 and end_index != -1:
        replaced_content = content[:start_index] + start_marker + ', '.join(file_list) + end_marker + content[end_index:]
        with open(backgroundjs_file, 'w') as f:
            f.write(replaced_content)

directory = 'scripts'  # Verzeichnis, das durchsucht werden soll
backgroundjs_file = 'background.js'  # Pfad zur background.js-Datei

file_list = list_files(directory)

replace_files_in_backgroundjs(backgroundjs_file, file_list)

print(f"Inhalt in {backgroundjs_file} wurde aktualisiert.")
