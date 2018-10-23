import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Comment.css'
import { getFullDateTime } from '../../utils/date'

const Comment = ({ reviewer, commentDate, content }) => (
    <li>
        <div>
            <span styleName='reviewer'>{reviewer}</span>
            <span styleName='commentDate'><i>@{getFullDateTime(commentDate)}</i></span>
        </div>
        <div>
            <p>{content}</p>
        </div>
    </li>
)

export default CSSModules(Comment, styles)