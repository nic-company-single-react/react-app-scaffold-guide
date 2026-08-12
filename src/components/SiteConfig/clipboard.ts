/**
 * 폐쇄망 http 환경에서는 navigator.clipboard 를 쓸 수 없어(보안 컨텍스트 아님)
 * 구식 execCommand 로 폴백합니다.
 */
export function copyToClipboard(text: string): void {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => undefined);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } catch {
    // 복사를 지원하지 않는 환경이면 조용히 무시합니다.
  }
  document.body.removeChild(textarea);
}

/** 문자열을 파일로 내려받습니다. */
export function downloadTextFile(filename: string, text: string): void {
  const blob = new Blob([text], {type: 'application/json;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
