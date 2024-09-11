// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchcard} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = matchcard
  const matchStatusColor = matchStatus === 'Won' ? 'won-style' : 'lost-style'
  return (
    <li className="each-match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-image"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={matchStatusColor}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
