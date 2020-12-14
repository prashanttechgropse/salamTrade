import React, { Component } from 'react'

export default class NeedHelpDropdown extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({
            showMenu: !this.state.showMenu,
        }, () => this.props.hideModal());
    }

    openReturnModal = () => {
        this.setState({
            showMenu: false
        }, () => this.props.showModal())
    }

    render() {
        return (
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" onClick={() => this.openReturnModal()}>
                    Need help with you item?
                    <span class="caret"></span>
                </button>
                {
                    this.state.showMenu
                        ? (
                            <ul>
                                <li><button class="btn" onClick={() => this.openReturnModal()}>Return or replace items</button></li>
                                <li><button class="btn">Leave delivery feedback</button></li>
                            </ul>
                        )
                        : (
                            null
                        )
                }
            </div>
        );
    }
}
