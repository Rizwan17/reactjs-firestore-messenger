import { auth, firestore } from 'firebase';
import { authConstanst } from './constants';
import { getRealtimeUsers } from './user.actions';

export const signup = (user) => {

    return async (dispatch) => {

        const db = firestore();

        dispatch({type: `${authConstanst.USER_LOGIN}_REQUEST`});

        auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(data => {
            console.log(data);
            const currentUser = auth().currentUser;
            const name = `${user.firstName} ${user.lastName}`;
            currentUser.updateProfile({
                displayName: name
            })
            .then(() => {
                //if you are here means it is updated successfully
                db.collection('users')
                .doc(data.user.uid)
                .set({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    uid: data.user.uid,
                    createdAt: new Date(),
                    isOnline: true
                })
                .then(() => {
                    //succeful
                    const loggedInUser = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        uid: data.user.uid,
                        email: user.email
                    }
                    localStorage.setItem('user', JSON.stringify(loggedInUser));
                    console.log('User logged in successfully...!');
                    dispatch({
                        type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                        payload: { user: loggedInUser }
                    })
                })
                .catch(error => {
                    console.log(error);
                    dispatch({ 
                        type: `${authConstanst.USER_LOGIN}_FAILURE`,
                        payload: { error }
                      });
                });
            });
        })
        .catch(error => {
            console.log(error);
        })


    }


}

export const signin = (user) => {
    return async dispatch => {

        dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
        auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            console.log(data);


            const db = firestore();
            db.collection('users')
            .doc(data.user.uid)
            .update({
                isOnline: true
            })
            .then(() => {
                const name = data.user.displayName.split(" ");
                const firstName = name[0];
                const lastName = name[1];

                const loggedInUser = {
                    firstName,
                    lastName,
                    uid: data.user.uid,
                    email: data.user.email
                }

                localStorage.setItem('user', JSON.stringify(loggedInUser));

                dispatch({
                    type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                    payload: { user: loggedInUser }
                });
            })
            .catch(error => {
                console.log(error)
            })

            



        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: `${authConstanst.USER_LOGIN}_FAILURE`,
                payload: { error }
            })
        })
        


    }
}

export const isLoggedInUser = () => {
    return async dispatch => {

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if(user){
            dispatch({
                type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                payload: { user }
            });
        }else{
            dispatch({
                type: `${authConstanst.USER_LOGIN}_FAILURE`,
                payload: { error: 'Login again please' }
            });
        }


    }
}

export const logout = (uid) => {
    return async dispatch => {
        dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` });
        //Now lets logout user

        const db = firestore();
        db.collection('users')
        .doc(uid)
        .update({
            isOnline: false
        })
        .then(() => {

            auth()
            .signOut()
            .then(() => {
                //successfully
                localStorage.clear();
                dispatch({type: `${authConstanst.USER_LOGOUT}_SUCCESS`});
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: `${authConstanst.USER_LOGOUT}_FAILURE`, payload: { error } })
            })

        })
        .catch(error => {
            console.log(error);
        })

        


    }
}

