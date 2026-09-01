import { getStoredAccessToken } from './firebase';

export interface GoogleDriveItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  iconLink?: string;
  thumbnailLink?: string;
  webViewLink?: string;
  owners?: Array<{ displayName: string; emailAddress: string; photoLink?: string }>;
}

export interface GoogleDriveListResponse {
  files: GoogleDriveItem[];
  nextPageToken?: string;
}

// Search and list files in user's Google Drive
export async function listDriveFiles(
  query: string = '',
  pageSize: number = 20,
  pageToken?: string
): Promise<GoogleDriveListResponse> {
  const token = getStoredAccessToken();
  if (!token) {
    throw new Error('Google Drive access token missing. Please sign in with Google.');
  }

  let q = "trashed = false";
  if (query.trim()) {
    q += ` and name contains '${query.replace(/'/g, "\\'")}'`;
  }

  const fields = 'nextPageToken, files(id, name, mimeType, size, modifiedTime, iconLink, thumbnailLink, webViewLink, owners)';
  const url = `https://www.googleapis.com/drive/v3/files?pageSize=${pageSize}&fields=${encodeURIComponent(
    fields
  )}&q=${encodeURIComponent(q)}&orderBy=modifiedTime desc${pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ''}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Google Drive API error (${res.status})`);
  }

  return await res.json();
}

// Fetch content of a text/code file or export a Google Doc/Sheet to text
export async function fetchDriveFileContent(file: GoogleDriveItem): Promise<string> {
  const token = getStoredAccessToken();
  if (!token) {
    throw new Error('Google Drive access token missing. Please sign in with Google.');
  }

  // Google Docs
  if (file.mimeType === 'application/vnd.google-apps.document') {
    const exportUrl = `https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=text/plain`;
    const res = await fetch(exportUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to export Google Doc text');
    return await res.text();
  }

  // Google Sheets
  if (file.mimeType === 'application/vnd.google-apps.spreadsheet') {
    const exportUrl = `https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=text/csv`;
    const res = await fetch(exportUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to export Google Sheet CSV');
    return await res.text();
  }

  // Binary/Standard text file
  const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
  const res = await fetch(downloadUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('Failed to download Google Drive file content');
  }

  return await res.text();
}

// Create / Export a new file back to Google Drive (e.g. ArgOS Verification Report or Code Artifact)
export async function saveToGoogleDrive(
  fileName: string,
  content: string,
  mimeType: string = 'text/plain'
): Promise<GoogleDriveItem> {
  const token = getStoredAccessToken();
  if (!token) {
    throw new Error('Google Drive access token missing. Please sign in with Google.');
  }

  const metadata = {
    name: fileName,
    mimeType: mimeType,
    description: 'Generated and verified by ArgOS Apex Governed Agent Workspace',
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n` +
    content +
    closeDelimiter;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to save file to Google Drive');
  }

  return await res.json();
}
