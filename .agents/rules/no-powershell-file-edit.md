# SET 게임 프로젝트 — 에이전트 규칙

## 절대 금지: PowerShell로 한국어 파일 직접 수정

PowerShell의 `Set-Content`, `Out-File` 명령어는 한국어(UTF-8) 파일을
**UTF-16 또는 ANSI로 저장**하여 한글이 깨집니다.

### 금지 패턴

```powershell
# 절대 사용 금지
(Get-Content file.js) -replace '패턴', '교체값' | Set-Content file.js
Get-Content file.js | Out-File file.js -Encoding UTF8
```

### 올바른 방법

파일의 텍스트를 변경할 때는 반드시 IDE 파일 편집 도구를 사용하세요.

- replace_file_content
- multi_replace_file_content
- write_to_file

### 인코딩 깨짐 복구 방법

```powershell
# 1. git stash로 손상된 변경사항 제거
git stash

# 2. 정상 커밋에서 파일 복원
git checkout <정상-커밋-해시> -- <파일경로>

# 3. IDE 편집 도구로 다시 수정
```