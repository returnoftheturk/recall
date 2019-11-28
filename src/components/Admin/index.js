import React from 'react';
import { FirebaseContext } from '../Firebase';

const Admin = () => (
    <FirebaseContext.Consumer>
        {firebase => {
            return (
                <div>
                    <h1>Firebase returned</h1>
                    
                    {/* <h1></h1> */}
                </div>
            )
        }}
    </FirebaseContext.Consumer>
    
);

export default Admin;