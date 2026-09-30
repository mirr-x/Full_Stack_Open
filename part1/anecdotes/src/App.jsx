import { useState } from "react"

const randNum = (max) => {
    return Math.floor(Math.random() * (max))
}

const AddOneVote = (votes, anecdote, setVotes) => {
    const oldVotes = votes
    const newVotes = [...votes]
    newVotes[anecdote] = newVotes[anecdote] + 1
    return (() => {
        setVotes(newVotes)
    })
}

const RanddomAnecdote = (props) => {
    const { anecdotes, anecdote, setAnecdotes, votes, setVotes } = props
    const anecdotesLen = anecdotes.length

    return (
        <div id="random-anecdote">
            <h1>Anecdote of the day</h1>
            <p>
                {anecdotes[anecdote]}
            </p>
            <p>
                has {votes[anecdote]} votes
            </p>
            <button onClick={AddOneVote(votes, anecdote, setVotes)}>Vote</button>{" "}
            <button onClick={() => setAnecdotes(randNum(anecdotes.length))}>
                Next anecdote
            </button>
        </div>
    )
}

const App = () => {
    const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
    ]
    const [anecdote, setAnecdotes] = useState(randNum(anecdotes.length))
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    return (
        <div>
            <RanddomAnecdote
                anecdotes={anecdotes}
                anecdote={anecdote}
                setAnecdotes={setAnecdotes}
                votes={votes}
                setVotes={setVotes}
            />
        </div>
    )
}

export default App;