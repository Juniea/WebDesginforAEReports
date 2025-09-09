from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import json

# 设置静态文件夹路径
app = Flask(__name__, static_folder="dist", static_url_path="")
CORS(app)

# DATA_DIR = "/app/data/cases/FAERS_R1_Combined"
DATA_DIR = "C:/Users/Wenjuan.Zhang/OneDrive - FDA/Documents/FAERS_R1_Combined"

# 首页返回 index.html
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

#############
###########################

@app.route("/api/cases")
def list_cases():
    try:
        cases = [f.replace('.json', '') for f in os.listdir(DATA_DIR) if f.endswith('.json')]
        return jsonify(cases)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
##########################
####################################

# 🔁 捕获所有前端路由，如 /view/case/2-405-MENGJIE
@app.route("/view/case/<path:any_path>")
def render_frontend(any_path):
    return send_from_directory(app.static_folder, "index.html")

# ✅ 支持静态资源（如 /vite.svg, /assets/xxx.js）
@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

# 后端 API：用于前端请求标注数据
@app.route("/api/case/<case_id>")
def get_case(case_id):
    file_path = os.path.join(DATA_DIR, f"{case_id}.json")
    if not os.path.exists(file_path):
        return jsonify({"error": "Not found"}), 404

    source_filter = request.args.get("source", "").upper()

    with open(file_path, "r", encoding="utf-8") as f:
        raw = json.load(f)

    text = raw.get("pages", [""])[0]
    annotations = []
    for ann in raw.get("annotations", []):
        tc = ann.get("textContext", {})
        label = ann.get("label", "").upper()
        note = ann.get("note", "").upper()
        if source_filter and note != source_filter:
            continue
        annotations.append({
            "start": tc.get("start", 0),
            "end": tc.get("end", 0),
            "label": label,
            "type": label,
            "text": tc.get("text", ""),
            "note": note
        })

    return jsonify({
        "text": text,
        "annotations": annotations
    })

# 可选：保留一个老的接口（如果你在用 /api/view）
@app.route("/api/view/<case_id>")
def api_view_case(case_id):
    file_path = os.path.join(DATA_DIR, f"{case_id}.json")
    if not os.path.exists(file_path):
        return jsonify({"error": "Not found"}), 404

    source_filter = request.args.get("source", "").upper()

    with open(file_path, "r", encoding="utf-8") as f:
        raw = json.load(f)

    text = raw.get("pages", [""])[0]
    annotations = raw.get("annotations", [])
    if source_filter:
        annotations = [ann for ann in annotations if ann.get("note", "").upper() == source_filter]

    return jsonify({
        "text": text,
        "annotations": annotations
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
