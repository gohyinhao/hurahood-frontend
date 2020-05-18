import React from 'react';
import { Link } from 'react-router-dom';

const Icon = (props) => {
    return (
        <Link to={props.link} className={props.linkClassName}>
            <img src={props.icon} className={props.iconClassName} />
        </Link>
    );
};

// TOOD: add isactive styles
// TODO: set default props and prop types

export default Icon;
