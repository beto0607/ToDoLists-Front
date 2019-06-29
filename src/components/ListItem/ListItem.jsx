//@author: beto0607
//generated by create_container

import React from 'react';
import styles from './ListItem.module.scss';

class ListItem extends React.Component{

	// constructor(props){
	// 	super(props);
	// }

	render(){
		return (
            <li className={styles['container']}>
                <span>{this.props.description}</span>
                <div className={styles['status-container']}>
                    {this.props.status}
                </div>
            </li>
        );
	}

}
export default ListItem;
