import { collection, doc, getFirestore, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Dispatch } from "redux";
import { app, auth } from "../../../firebase";
import { UserAction, UserActionTypes } from "../../type/user";
import { UsersAction, UsersActionTypes } from "../../type/users";


export function clearData() {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.CLEAR_DATA })
    }
}

export function fetchUsersUid() {
    return (dispatch: Dispatch<UsersAction>) => {
        const db = getFirestore(app);
        const collRef = collection(db, 'users');
        onSnapshot(collRef, (snapshot) => {
            let uids = snapshot.docs.map(doc => {
                return doc.id;
            });
            dispatch({ type: UsersActionTypes.FETCH_USERS_UID, payload: uids })
        })
    }
}

export function fetchUser() {
    return (async (dispatch: Dispatch<UserAction>) => {
        const db = getFirestore(app);
        if (auth.currentUser?.uid) {
            const docRef = doc(db, 'users', auth.currentUser.uid);
            onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists()) {
                    dispatch({ type: UserActionTypes.USER_STATE_CHANGE, payload: snapshot.data()})
                } else {
                    console.log('User is not exists');
                }
            })
        }
    })
}


export function fetchUserPosts() {
    return (async (dispatch: Dispatch<UserAction>) => {
        const db = getFirestore(app);
        if (auth.currentUser?.uid) {
            const docRef = doc(db, 'posts', auth.currentUser?.uid);
            const colRef = collection(docRef, "userPosts");
            const q = query(colRef, orderBy("creation", "desc"));
            onSnapshot(q, (snapshot) => {
                const posts: any[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    posts.push({id, ...data});
                })
                dispatch({ type: UserActionTypes.USER_POSTS_STATE_CHANGE, payload: posts})
            })
        }
        
    })
};

export function fetchUserFollowing() {
    return (async (dispatch: Dispatch<UserAction>) => {
        const db = getFirestore(app);
        if (auth.currentUser?.uid) {
            const docRef = doc(db, 'following', auth.currentUser.uid);
            const colRef = collection(docRef, "userFollowing")
            onSnapshot(colRef, (snapshot) => {
                let following = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return id
                });
                dispatch({ type: UserActionTypes.USER_FOLLOWING_STATE_CHANGE, payload: following});
            })
        }
    })
};

export function queryUsersByUsername(username: string) {
    return new Promise((resolve, reject) => {
        if (username.length === 0) {
            resolve([])
        };
        const db = getFirestore(app);
        const collRef = collection(db, 'users');
        const q = query(collRef, where('userName', '>=', username));
        onSnapshot(q, (snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data};
            });
            resolve(users);
        })
    })
}
