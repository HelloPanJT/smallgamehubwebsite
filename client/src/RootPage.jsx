import React from 'react'
import HeaderModule from './HeaderModule'
import CoursesDisplay from './CoursesDisplay'
import Auth from './Auth'

class RootPage extends React.Component {
  render () {
    const username = Auth.getUserName();
    return (
      <div>
        <HeaderModule username={username} />
        <CoursesDisplay username={username} />
      </div>
    );
  }
}

export default RootPage;
