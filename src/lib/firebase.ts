import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';

// Read config from firebase-applet-config.json
let firebaseConfig: any = {
  projectId: "gen-lang-client-0643589669",
  appId: "1:1067573114218:web:4fea845d8a573dfb5d6113",
  apiKey: "AIzaSyDEYj6HMsRcNFMvtWa1C5HDad6sEHNVLQQ",
  authDomain: "gen-lang-client-0643589669.firebaseapp.com",
  storageBucket: "gen-lang-client-0643589669.firebasestorage.app",
  messagingSenderId: "1067573114218",
  oAuthClientId: "1067573114218-cfk6jq54mapaoncn50c8nm4msrmquf7q.apps.googleusercontent.com"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Google Auth Provider with Google Drive scopes
export const googleDriveProvider = new GoogleAuthProvider();
googleDriveProvider.addScope('https://www.googleapis.com/auth/drive.readonly');
googleDriveProvider.addScope('https://www.googleapis.com/auth/drive.file');
googleDriveProvider.addScope('https://www.googleapis.com/auth/drive.metadata.readonly');
googleDriveProvider.setCustomParameters({
  prompt: 'select_account'
});

// OAuth Access Token stored in memory (never localStorage per security rules)
let inMemoryAccessToken: string | null = null;

export const setStoredAccessToken = (token: string | null) => {
  inMemoryAccessToken = token;
};

export const getStoredAccessToken = (): string | null => {
  return inMemoryAccessToken;
};

export const signInWithGoogleDrive = async (): Promise<{ user: User; accessToken: string | null }> => {
  try {
    const result = await signInWithPopup(auth, googleDriveProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken || null;
    inMemoryAccessToken = accessToken;
    return { user: result.user, accessToken };
  } catch (error: any) {
    console.error('[Google Drive Auth Error]', error);
    throw error;
  }
};

export const signOutGoogleDrive = async (): Promise<void> => {
  inMemoryAccessToken = null;
  await signOut(auth);
};

export { onAuthStateChanged };
