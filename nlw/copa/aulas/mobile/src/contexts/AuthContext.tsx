import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '214466390590-c3juinlrmje14b6526465dfjt70beaqt.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })

    async function signIn(){
        console.log('Funfou');

        try {
            setIsUserLoading(true);
            await promptAsync();

        } catch (error) {
            console.log(error);
            throw error;

        } finally {
            setIsUserLoading(false);
        }
    }

   async function signInWithGoogle(acess_token: string) {
    console.log("TOKEN DE AUTENTICAÇÃO ===>", acess_token)
   }

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response]);

    return(
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user: {
                name: 'Davi Kalel',
                avatarUrl: 'https://github.com//dkat-davi.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    )

}