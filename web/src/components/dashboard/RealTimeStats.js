/*eslint-disable */
import React, {PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import {white, purple600, purple500} from 'material-ui/styles/colors'
import {LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {typography} from 'material-ui/styles'

const RealTimeStats = (props) => {
  const styles = {
    paper: {
      backgroundColor: purple500,
      height: 150
    },
    div: {
      height: 95,
      padding: '5px 15px 0 15px'
    },
    header: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      color: white,
      backgroundColor: purple600,
      padding: 10
    }
  }

  return (
    <Paper style={styles.paper}>
      <div style={{...styles.header}}>Temperature Timeline</div>
      <div style={styles.div}>
        <ResponsiveContainer >
          <LineChart data={props.data}>
            <Line type='monotone' dataKey='temp' stroke='#8884d8' strokeWidth={2} />
            <Tooltip />
            <XAxis dataKey="name" hide={true}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  )
}

RealTimeStats.propTypes = {
  data: PropTypes.array
}

export default RealTimeStats
/*eslint-enable */
