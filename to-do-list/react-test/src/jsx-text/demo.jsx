/* @jsx h */

// var profile = <div>
//   <img src="avatar.png" className="profile"/>
//   <h3>{[user.firstName, user.lastName]}</h3>
// </div>

class Input extends Component {
  render() {
    return (
      <div>
        <input value={this.state.title}/>
        <button onClick={this.chilckHandle.bind(this)}>submit</button>
      </div>
    )
  }
}