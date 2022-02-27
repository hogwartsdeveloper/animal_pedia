import { collection, doc, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { Dispatch } from "redux";
import { app, auth } from "../../../firebase";
import { UserAction, UserActionTypes } from "../../type/user";

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

export const sendNotification = (to: any, title: string, body: string, data: {}) => {
    if (to === null) {
        return;
    }

    let response = fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to,
            sound: 'default',
            title,
            body,
            data
        })
    })
}