import React, { Component } from 'react';

class SearchTeachers extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

  render() {
    let teachersList = this.props.teachers.map((teacher) => (
        <button className="dropdown-item ygi-dropdown__option">
            <img className="yi-teacher-dropdown__image--small" src={teacher.image} alt="Teacher" />
            <span>{teacher.name}</span>
        </button>
    ))

    return (
        <div className="col-lg col-md-6 col-xs-12 mt-2">
            <div className="ygi-dropdown__wrapper yi-teacher-dropdown nopadding d-block yi-dropdown--beneath-modal">
                <button
                onClick={() => {
                    if (this.state.toggleTeachers === 'dropdown-menu ygi-dropdown__menu'){
                        let newToggleState = intialToggleState;
                        newToggleState.toggleTeachers = 'dropdown-menu ygi-dropdown__menu show';
                        this.setState(newToggleState);
                    } else {
                        this.setState({toggleTeachers: 'dropdown-menu ygi-dropdown__menu'});
                    }
                }} 
                className="btn dropdown-toggle ygi-dropdown__placeholder" id="dropdown-teacher" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="true">Teacher</button>
                <div className={this.state.toggleTeachers} aria-labelledby="dropdown-teacher">
                    <div className="yi-teacher-dropdown__wrapper-desktop" style={{display: "block"}}>
                        {teachersList}
                    </div>
                </div>
            </div>
        </div>

    );
  }
}

export default SearchTeachers;
