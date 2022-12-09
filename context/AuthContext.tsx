import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    Auth,
    User,
    UserCredential,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import {
    useContext,
    useState,
    useEffect,
    createContext,
    ReactNode,
    useMemo,
} from 'react';
import { auth } from '../firebase/config';

export interface AuthProviderProps {
    children?: ReactNode;
}

export interface UserContextState {
    isAuthenticated: boolean;
    isLoading: boolean;
    id?: string;
}

export interface AuthContextModel {
    auth: Auth;
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    resetPassword?: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextModel>(
    {} as AuthContextModel,
);
export const useAuth = (): AuthContextModel => {
    return useContext(AuthContext);
};

export const UserStateContext = createContext<UserContextState>(
    {} as UserContextState,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setInitialLoading(false);
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(true);
                router.push('/login');
            }
        });

        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const signUp = async (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

    const signIn = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const resetPassword = (email: string) =>
        sendPasswordResetEmail(auth, email);

    const values = useMemo(
        () => ({
            auth,
            user,
            loading,
            signIn,
            signUp,
            logout,
            resetPassword,
        }),
        [user, loading],
    );

    return (
        <AuthContext.Provider value={values}>
            {!initialLoading && children}
        </AuthContext.Provider>
    );
};

export const useUserContext = (): UserContextState => {
    return useContext(UserStateContext);
};
