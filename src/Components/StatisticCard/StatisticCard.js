import { Card, Statistic } from 'antd'
import React from 'react'

const StatisticCard = (props) => {
  return (
    <Card hoverable bordered={false} style={{background: '#59a4ff'}}>
        <Statistic
          title={props.title}
          value={props.value}
          precision={2}
          valueStyle={{
            color: '#000',
            fontWeight: 800,
            fontSize:24
          }}
        />
      </Card>
  )
}

export default StatisticCard