from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="project_v1/project/dist", static_url_path="")
CORS(app)

# 后端 API 示例
@app.route("/api/hello")
def hello():
    return jsonify({"message": "你好，前端！这是后端返回的。"})

# 将前端页面作为默认首页
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# 静态文件路径支持（比如 JS、CSS）
@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
