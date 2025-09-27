// import React, { useEffect, useState } from 'react';
// import { AuthContext } from './AuthContext';
// import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
// import { auth } from '../../Firebase/firebase.init';

// const AuthProvider = ({ children }) => {
//     const [loading, setLoading] = useState(true);
//     const [user, setUser] = useState(null)
//     const createUser = (email, password) => {
//         setLoading(true)
//         return createUserWithEmailAndPassword(auth, email, password)
//     }
//     const signInUser = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password
//         )
//     }
//     const signOutUser = () => {
//         setLoading(true)
//         return signOut(auth)
//     }
//     const googleProvider = new GoogleAuthProvider()
//     const googleSignIn = () => {
//         setLoading(true)
//         return signInWithPopup(auth, googleProvider)
//     }
//     const updateUser = (userInfo) => {
//         return updateProfile(auth.currentUser, userInfo);
//     };
//     // useEffect(() => {
//     //     const unSubscribe = onAuthStateChanged(auth, currentUser => {
//     //         setUser(currentUser)
//     //         setLoading(false)
//     //         console.log(currentUser);
//     //     })
//     //     return () => {
//     //         unSubscribe();
//     //     }
//     // }, []);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             console.log(currentUser);

//             if (currentUser) {
//                 const token = await currentUser.getIdToken(); // Firebase token
//                 setUser({
//                     ...currentUser,
//                     accessToken: token  // Save token here
//                 });
//             } else {
//                 setUser(null);
//             }
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, []);



//     const authInfo = {
//         loading,
//         user,
//         createUser,
//         signInUser,
//         signOutUser,
//         googleSignIn,
//         updateUser,

//     }
//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;
// AuthProvider.jsx
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
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
            console.log('Firebase Current User:', currentUser);

            if (currentUser) {
                try {
                    // Firebase token নিন
                    const token = await currentUser.getIdToken();

                    // User object properly set করুন
                    const userData = {
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        accessToken: token
                    };

                    setUser(userData);
                    console.log('User set in context:', userData);
                } catch (error) {
                    console.error('Error getting user token:', error);
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        accessToken: null
                    });
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