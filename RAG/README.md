# 환경 설정
## 1. 가상환경 설정 (순서대로 명령어 실행 - Git bash 기준)

```bash
uv venv --python 3.10

-- Git bash 기준
source .venv/Scripts/activate

-- 기본 라이브러리 설치

# 1) CUDA 12.4 빌드 PyTorch 설치
uv pip install --index-url https://download.pytorch.org/whl/cu124 torch torchvision torchaudio

# 2) 나머지 패키지 설치
uv pip install -r requirements.txt


```

## 2. Ollama 다운로드 및 GPT-oss 다운로드 (Windows)

- Ollama 다운로드

https://ollama.com/download

- Ollama 설치 후 git bash 명령어

```bash
ollama
```

- 아래와 같이 기본 사용법을 안내하는 문구가 표시되면 잘 설치된 것

```text
Usage:
  ollama [flags]
  ollama [command]

Available Commands:
  serve       Start ollama
  create      Create a model from a Modelfile
  show        Show information for a model
  run         Run a model
  pull        Pull a model from a registry
  push        Push a model to a registry
  list        List models
  cp          Copy a model
  rm          Remove a model
  help        Help about any command

Flags:
  -h, --help      help for ollama
  -v, --version   Show version information

Use "ollama [command] --help" for more information about a command.
```

- gpt-oss:20b 다운로드


```bash
ollama run gpt-oss:20b
```



