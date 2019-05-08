import React from 'react'

export default class ActivityFeedFilters extends React.Component {
	render() {
    return (
      <form>
        <div>Show me <label><input type="checkbox" />My filters</label></div>
				<div>Activity type <select><option>All activity</option></select></div>
      </form>
    )
  }
}
