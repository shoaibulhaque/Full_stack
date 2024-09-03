import { useState } from "react";

const Anecdote = ({ anecdote, votes, increaseVote }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdote}</div>
      <p>has {votes} votes</p>
      <button onClick={increaseVote}>Vote</button>
    </div>
  );
};

const MostVotedAnecdote = ({ maxVoteAnecdote }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{maxVoteAnecdote}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const selectRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const increaseVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const findMaxVoteAnecdote = () => {
    let maxVotes = 0;
    let maxVoteAnecdote = "";

    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > maxVotes) {
        maxVotes = votes[i];
        maxVoteAnecdote = anecdotes[i];
      }
    }

    return maxVoteAnecdote
      ? maxVoteAnecdote + " (has " + maxVotes + " votes)"
      : null;
  };

  return (
    <>
      <Anecdote
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        increaseVote={increaseVote}
      />
      <button onClick={selectRandomAnecdote}>Next Anecdote</button>
      <MostVotedAnecdote maxVoteAnecdote={findMaxVoteAnecdote()} />
    </>
  );
};

export default App;
