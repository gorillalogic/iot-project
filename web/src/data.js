/*eslint-disable */
import React from 'react'
import Assessment from 'material-ui/svg-icons/action/assessment'
import GridOn from 'material-ui/svg-icons/image/grid-on'
import PermIdentity from 'material-ui/svg-icons/action/perm-identity'
import Web from 'material-ui/svg-icons/av/web'
import {cyan600, pink600, purple600} from 'material-ui/styles/colors'
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import Settings from 'material-ui/svg-icons/action/settings'
import ShowChart from 'material-ui/svg-icons/editor/show-chart'

const data = {
  menus: [
    // { text: 'DashBoard', icon: <Assessment/>, link: '/dashboard' },
    // { text: 'Form Page', icon: <Web/>, link: '/form' },
    // { text: 'Table Page', icon: <GridOn/>, link: '/table' },
    // { text: 'Login Page', icon: <PermIdentity/>, link: '/login' },
    { text: 'Settings', icon: <Settings />, link: '/settings' },
    { text: 'Stats', icon: <ShowChart />, link: '/stats' }
  ]
}

export default data
/*eslint-enable */
