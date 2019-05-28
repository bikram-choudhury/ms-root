import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class NavComponent extends Component {
  render() {
    return (
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          {
            this.props.courseList.map((course, index) => {
              return (
                <li className="nav-item" key={index}>
                  <Link className="nav-link" to={{
                    pathname: "/register/"+course.name.toLowerCase(),
                    state: {
                      courseId: course._id
                    }
                  }}>
                  <span data-feather={course.name.toLowerCase()} />
                    {course.name}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

NavComponent.defaultProps = {
  courseList: []
}

NavComponent.propTypes = {
  courseList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string
  }))
}