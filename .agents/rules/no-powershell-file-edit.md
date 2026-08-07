# SET 게임 프로젝트 — 에이전트 규칙

## 절대 금지: PowerShell로 한국어 파일 수정

### 금지 패턴 (한글 깨짐 발생)

```powershell
# 절대 사용 금지
(Get-Content file.html) -replace '...', '...' | Set-Content file.html
(Get-Content file.html -Raw) -replace '...', '...'  # -Raw도 CP949로 읽음
[System.IO.File]::WriteAllText(...)  # 위 Get-Content 조합시 인코딩 손상
Out-File, Set-Content 등 모든 파일 쓰기 cmdlet
```

### 올바른 방법: 항상 IDE 편집 도구 사용

- replace_file_content
- multi_replace_file_content
- write_to_file

버전 범프(mode-version 문자열 변경)도 반드시 위 도구를 사용하세요.

### 인코딩 깨짐 복구 방법

```powershell
# 1. 정상 커밋에서 복원 (git이 파일을 그대로 덮어씀)
git checkout <정상커밋해시> -- <파일경로>

# 2. IDE 편집 도구로 재수정
```