import { collection, doc, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { Dispatch } from "redux";
import { app, auth } from "../../../firebase";
import { IUser2, UserAction, UserActionTypes } from "../../type/user";
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
            dispatch({ type: UsersActionTypes.FETCH_USERS_UID, payload: uids });
        })
    }
}

export function fetchUserPosts() {
    return (async (dispatch: Dispatch<UserAction>) => {
        const db = getFirestore(app);
        const postsColl = collection(db, 'posts');

        onSnapshot(postsColl, (snapshot) => {
            const posts = snapshot.docs.map((post) => {
                const id = post.id;
                const data = post.data();
                let user: IUser2 = {
                    description: '',
                    email: '',
                    image: '',
                    name: '',
                    role: '',
                    userName: ''
                }
                if (post.data()) {
                    const userRef = doc(db, 'users', post.data().uid)
                    onSnapshot(userRef, (snap) => {
                        if (snap.exists()) {
                            const userFetch = snap.data()
                            user.description = userFetch.description
                            user.image = userFetch.image;
                            user.name = userFetch.name;
                            user.role = userFetch.role;
                            user.userName = userFetch.userName;
                            user.email = userFetch.email;
                            
                        } else {
                            console.log('User is not exists');
                        }
                    })
                }
                
                return {id, ...data, user};      
            });
        
            dispatch({ type: UserActionTypes.USER_POSTS_STATE_CHANGE, payload: posts})
        })
    })
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
};

export function fetchUsers(uids: string[]) {
    return (async (dispatch: Dispatch<UsersAction>) => {
        const db = getFirestore(app);
        const users: any[] = [];
        uids.map((uid) => {
            const docRef = doc(db, 'users', uid);
            onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists()) {
                    users.push(snapshot.data())
                }
            })
        })
        dispatch({ type: UsersActionTypes.FETCH_USERS_DATA, payload: users});
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
