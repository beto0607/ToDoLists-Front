//@author: beto0607
//generated by create_container

import React from 'react';
import { Redirect } from 'react-router-dom'

import List from '../../components/List';
import ListNew from '../../components/ListNew';
import styles from './Dashboard.module.scss';

import NotificationSystem from '../../components/NotificationSystem';
import { FaPlus } from 'react-icons/fa';


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        if(
            !localStorage.getItem('token') || //User not logged in
            new Date(localStorage.getItem('token_expires')) < new Date()//Token expired
        ){
            this.state = {
                redirect: true,
                redirect_target: '/auth'
            };
        }else{
            this.state = {
                user_lists_url: props.base_url+`users/${localStorage.getItem('user_id')}/lists`,
                lists_url: props.base_url+'lists',
                user_token: localStorage.getItem('token'),
                lists:[],
                showListNew: false,
                messages: []
            }
            this.lists = null;
            this.authorization_header = new Headers({
                'Content-type':'application/json',
                'Authorization': String.raw`Basic ${this.state.user_token}`
            });
            this.closeLists = this.closeLists.bind(this);
            this.handleAddButonClick = this.handleAddButonClick.bind(this);
            this.closeAddList = this.closeAddList.bind(this);
            this.listAdded = this.listAdded.bind(this);
            this.listRemoved = this.listRemoved.bind(this);
        }
    }
    closeAddList(){
        this.setState({showListNew: false});
    }
    redirect(to = '/auth'){
        this.setState({redirect: true, redirect_target: to});
    }
    componentDidMount(){
        if(this.state.redirect){return;}
        fetch(this.state.user_lists_url, {headers: this.authorization_header})
        .then(response => {
            if(!response.ok){throw new Error(response.status);}
            return response.json()
        }).then((data) => {
            this.lists_ref =new Array(data.data.length);
            this.lists = data.data.map((element, index)=>{
                this.lists_ref[index] = React.createRef();
                return (
                    <List 
                        key={`list#${element.id}`} 
                        {...element}
                        ref={this.lists_ref[index]}
                        authorization_header={this.authorization_header}
                        base_url={this.props.base_url}
                        listRemoved={this.listRemoved}
                        closeLists={this.closeLists}
                        />
                );
            });
            this.setState(this.state);
        }).catch((err)=>{
            console.log(err);
            if(err === 401){
                this.redirect('/auth');
            }
        });
    }
    listAdded(data){
        this.lists_ref.push(React.createRef());
        this.lists.push(
            (<List 
                key={`list#${this.lists_ref.length-1}`} 
                {...data.data} 
                closeLists={this.closeLists}
                ref={this.lists_ref[this.lists_ref.length-1]}
                authorization_header={this.authorization_header}
                base_url={this.props.base_url}
                listRemoved={this.listRemoved}
            />)
        );
        this.setState({
            messages: [{
                title: 'New list:',
                detail: String.raw`Created list #${data.data.id}`,
                type:'good'
            }]
        });
        this.closeAddList();
    }
    closeLists(){
        this.lists_ref.forEach(element => element.current.close());
    }
    handleAddButonClick(){
        this.setState({showListNew: true});
    }
    listRemoved(id){
        this.lists = this.lists.filter((value, index, arr)=>{
            if(value.props.id === id){
                this.lists_ref.splice(index, 1); 
                return false;
            }
            return true;
        });
        this.setState(this.state);
    }
	render(){
        if(this.state.redirect){return (<Redirect to={this.state.redirect_target} />);}
		return (
            <div className={styles['dashboard-container']}>
                <NotificationSystem messages={this.state.messages || []}/>
                <h1>Dashboard</h1>
                <div className={styles['add-button-container']} onClick={this.handleAddButonClick}>
                    <FaPlus />
                </div>
                {(
                    this.state.showListNew && 
                    <ListNew 
                        base_url={this.props.base_url} 
                        close={this.closeAddList} 
                        listAdded={this.listAdded}
                        authorization_header={this.authorization_header}
                        />
                )}
                <div className={styles['lists-container']}>
                    {this.lists}
                </div>
            </div>
        );
	}

}
export default Dashboard;
