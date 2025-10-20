import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = async (email, password, userInfo = {}) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created in Firebase:', result.user);
            if (userInfo.displayName || userInfo.photoURL) {
                console.log('Updating profile with:', userInfo);
                await updateProfile(result.user, {
                    displayName: userInfo.displayName,
                    photoURL: userInfo.photoURL
                });
                console.log('Profile updated successfully');
            }

            return result;
        } catch (error) {
            console.error('Error in createUser:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                const token = await currentUser.getIdToken();

                // First set basic user
                const firebaseUser = {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    accessToken: token
                };

                // Now fetch role AND premium status from backend
                try {
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users?email=${currentUser.email}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();

                        // Check if user is currently premium
                        const isPremium = data.premiumTaken && new Date(data.premiumTaken) > new Date();

                        setUser({
                            ...firebaseUser,
                            role: data.role,
                            premiumTaken: data.premiumTaken,
                            isPremium: isPremium
                        });
                    } else {
                        // If backend fails, set only Firebase data
                        setUser(firebaseUser);
                    }
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    setUser(firebaseUser);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        loading,
        setLoading,
        user,
        createUser,
        signInUser,
        signOutUser,
        googleSignIn,
        updateUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;