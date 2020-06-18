import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
const increment = app.firestore.FieldValue.increment(1);
// Initialize Firebase
class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig); 
        this.auth = app.auth();       
        this.db = app.firestore();
    }

    doCreateUserWithEmailAndPassword = (email, password) => (
        this.auth.createUserWithEmailAndPassword(email, password)
    );

    doSignInWithEmailAndPassword = (email, password) => (
        this.auth.signInWithEmailAndPassword(email, password)
    );
    
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    user = uid => this.db.collection('users').doc(uid);

    getUser = () => this.user(this.auth.currentUser.uid);

    users = () => this.db.collection('users');

    createNewGroup = (groupName, groupDesc) => (this.db.collection('groups').add({
        name: groupName,
        description: groupDesc,
        user: this.auth.currentUser.uid,
        nameCount: 0
    }));

    groups = () => (this.db.collection('groups').where("user","==",this.auth.currentUser.uid));

    names = (groupID) => this.db.collection('names').where("user","==",this.auth.currentUser.uid).where("groupID", "==", groupID);

    allNames = () => this.db.collection('names').where("user","==",this.auth.currentUser.uid);

    createNewName = (fullName, meetingPlace, description, socials, creationDate, profileIcon, groupID, gColor) => (this.db.collection('names').add({
        fullName,
        meetingPlace,
        description,
        socials,
        creationDate,
        profileIcon,
        groupID,
        gColor,
        user: this.auth.currentUser.uid
    }));
    
    incrementNameCount = (groupID) => (
        this.db.collection('groups').doc(groupID).update({nameCount: increment})
    );

    updateName = (data, id) => (
        this.db.collection('names').doc(id).set({
            ...data
        }, { merge: true })
    );
    
    updateGroup = (data, id) => (
        this.db.collection('groups').doc(id).set({
            ...data
        }, { merge: true })
    );
}

export default Firebase;