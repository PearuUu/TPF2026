import {
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup,
    type User,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

interface MockUserEntry {
    email: string;
    password: string;
    displayName: string;
    uid: string;
    photoURL: string | null;
}

const MOCK_USERS: MockUserEntry[] = [
    {
        uid: "mock-uid-alex-001",
        email: "test@mail.com",
        password: "password123",
        displayName: "Alex Johnson",
        photoURL: null,
    },
    {
        uid: "mock-uid-jane-002",
        email: "jane@concierge.home",
        password: "letmein456",
        displayName: "Jane Smith",
        photoURL: null,
    },
    {
        uid: "mock-uid-dev-003",
        email: "dev@concierge.home",
        password: "dev1234",
        displayName: "Dev User",
        photoURL: null,
    },
];

function makeMockFirebaseUser(entry: MockUserEntry): User {
    return {
        uid: entry.uid,
        email: entry.email,
        displayName: entry.displayName,
        photoURL: entry.photoURL,
        emailVerified: true,
        isAnonymous: false,
        providerData: [],
        providerId: "mock",
        refreshToken: "",
        tenantId: null,
        metadata: {} as User["metadata"],
        getIdToken: async () => `mock-token-${entry.uid}`,
        getIdTokenResult: async () => ({ token: `mock-token-${entry.uid}` } as unknown as Awaited<ReturnType<User["getIdTokenResult"]>>),
        reload: async () => {},
        toJSON: () => ({ uid: entry.uid, email: entry.email }),
        delete: async () => {},
    } as unknown as User;
}

export interface AuthResult {
    user: User;
    isMockUser: boolean;
}

export async function signIn(
    email: string,
    password: string
): Promise<AuthResult> {
    const normalized = email.trim().toLowerCase();

    const mockEntry = MOCK_USERS.find(
        (u) => u.email === normalized && u.password === password
    );
    if (mockEntry) {
        return { user: makeMockFirebaseUser(mockEntry), isMockUser: true };
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);
    return { user: credential.user, isMockUser: false };
}

export async function signInWithGoogle(): Promise<AuthResult> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    return { user: credential.user, isMockUser: false };
}

export async function signOut(): Promise<void> {
    try {
        await firebaseSignOut(auth);
    } catch {
        // Pass for mock suers
    }
}

export function getMockUsers() {
    return MOCK_USERS.map(({ email, displayName }) => ({ email, displayName }));
}
