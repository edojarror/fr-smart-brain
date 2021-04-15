import React from 'react';

const Rank = ({name, entries}) => {
    // const { name, entries } = this.props
    return (
        <div className="center-text">
            <div className="white f3">{`${name}, your current rank is...`}</div>
            <div className="white f1">{entries}</div>
        </div>
    )
}

export default Rank;