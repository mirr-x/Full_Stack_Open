import { useState } from 'react';

const FeedbackButtons = (props) => {
  const {setGood, setNeutral, setBad} = props
  return (
    <div id='FeedbackButtons'>
      <h1>give feedback</h1>
      <button onClick={() => setGood((n) => n + 1)}>good</button>
      <button onClick={() => setNeutral((n) => n + 1)}>neutral</button>
      <button onClick={() => setBad((n) => n + 1)}>bad</button>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <th>{props.name}</th>
      <td>
        {props.info}
        {props.name === 'positive' ? ' %' : ''}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  let total = props.goodNums + props.neutralNums + props.badNums
  let avg = total / 3
  let positive = (props.goodNums / total) * 100
  if (total == 0)
  {
    return (<div id='Statistics'><p>No feedback given</p></div>)
  }
  return (
    <div id='Statistics'>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine name={'good'} info={props.goodNums} />
          <StatisticLine name={'neutral'} info={props.neutralNums} />
          <StatisticLine name={'bad'} info={props.badNums} />
          <StatisticLine name={'all'} info={total} />
          <StatisticLine name={'average'} info={avg} />
          <StatisticLine name={'positive'} info={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [goodNums, setGood] = useState(0);
  const [neutralNums, setNeutral] = useState(0);
  const [badNums, setBad] = useState(0);

  return (
    <div>
      <FeedbackButtons setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <Statistics goodNums={goodNums} neutralNums={neutralNums} badNums={badNums} />
    </div>
  );
}

export default App;