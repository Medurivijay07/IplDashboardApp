// Write your code here
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {recentmatches: {}, isLoading: true}

  componentDidMount() {
    this.getRecentMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getRecentMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(Item =>
        this.getFormattedData(Item),
      ),
    }
    this.setState({recentmatches: formattedData, isLoading: false})
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderMatchCardsList = () => {
    const {recentmatches} = this.state
    const {recentMatches} = recentmatches

    return (
      <ul className="match-cards-list">
        {recentMatches.map(Item => (
          <MatchCard key={Item.id} matchcard={Item} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {recentmatches} = this.state
    const {teamBannerUrl, latestMatchDetails} = recentmatches
    return (
      <div className="responsive-teammatches-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <h1 className="latest-matches">Latest Matches</h1>
        <LatestMatch
          key={latestMatchDetails.id}
          latestMatch={latestMatchDetails}
        />
        {this.renderMatchCardsList()}
      </div>
    )
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`
    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
