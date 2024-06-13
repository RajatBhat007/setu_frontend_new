import React from 'react';

function UserInitials({ fullName }) {
    const getInitials = (name) => {
        const nameArray = name.trim().split(' ');

        if (nameArray.length === 1) {
            // Single word: return the first two letters of the word
            return nameArray[0].slice(0, 2).toUpperCase();
        } else {
            // More than one word: return the first letter of the first and last names
            const firstNameInitial = nameArray[0].charAt(0).toUpperCase();
            const lastNameInitial = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
            return firstNameInitial + lastNameInitial;
        }
    };

    const initials = getInitials(fullName);

    return (
        <div>
            <p>{initials}</p>
        </div>
    );
}

export default UserInitials;