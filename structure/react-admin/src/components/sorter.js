import React from 'react';

export default class Sorter extends React.Component{
    constructor(props) {
        super(props);
        this.parent = props.parent;
        this.model = props.model;
        this.state = {
            direction:props.direction
        }
    }

    sort = ()=> {
        let model = this.model;
        let direction = this.state.direction;
        let new_direction = (direction === 'up' ? 'down' : 'up');
        let ordering = direction === 'up' ? '-'+model : model;
        $(this.parent.$dataTableThead).find(".tb-sort").removeClass().addClass("tb-sort fa fa-sort");
        this.setState({
            direction:new_direction
        });
        this.props.fetchData({ordering:ordering})
    }

    render() {
        let model = this.model;
        let direction = this.state.direction;
        return <span>
            <i onClick={this.sort} data-sort-name={ model } className={"tb-sort fa fa-"+(direction ? (direction === 'up' ? 'sort-amount-asc' : 'sort-amount-desc') : 'sort')} style={{cursor:"pointer",marginLeft:"5px"}}></i>
        </span>
    }
}