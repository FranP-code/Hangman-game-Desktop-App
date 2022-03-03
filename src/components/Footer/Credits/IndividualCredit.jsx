import React from 'react'

const IndividualCredit = ({titleElement, resource, resourceLink, author, authorLink}) => {
    return (
        <li className="credit">
            <h3>{titleElement}</h3>
            <p>
                <a href={resourceLink}>
                    {resource}
                </a>
                &nbsp;by&nbsp;
                <a href={authorLink}>
                    {author}
                </a>
            </p>
        </li>
    )
}

export default IndividualCredit
