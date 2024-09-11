// Write your code here
import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class TeamCard extends Component {
  render() {
    const {teamdetails} = this.props
    const {name, id, teamImageUrl} = teamdetails
    return (
      <Link to={`/team-matches/${id}`} className="item-link">
        <li className="each-team-card">
          <img src={teamImageUrl} alt={name} className="team-image-style" />
          <p className="team-name">{name}</p>
        </li>
      </Link>
    )
  }
}

export default TeamCard
