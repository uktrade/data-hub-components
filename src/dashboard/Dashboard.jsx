import React from 'react'
import MyCompaniesTile from './tiles/my-companies/MyCompaniesTile'

const dashboardTiles = {
  'my-companies': MyCompaniesTile,
}

function Dashboard({ tiles }) {
  function renderTile(tile) {
    if (tile.name in dashboardTiles) {
      const component = dashboardTiles[tile.name]
      return component({
        data: tile.data,
      })
    }
    return null
  }

  return (
    <div>
      {tiles.map(renderTile)}
    </div>
  )
}

export default Dashboard
