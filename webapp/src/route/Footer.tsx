import * as React from 'react';
import * as styles from './Footer.scss';

export class Footer extends React.Component {
    render() {
        return (
            <div className={styles.footer}>
                Data from <a href="https://api.tfl.gov.uk/">TfL</a> and <a href="http://www.nationalrail.co.uk/46391.aspx">NRE</a>
            </div>
        );
    }
}