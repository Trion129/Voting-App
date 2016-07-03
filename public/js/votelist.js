var React = require('react');
var ReactDOM = require('react-dom');

var votes=[
  [
    {
      link: "#",
      head: "Kejriwal vs Modi",
      description: "Who would win the polls?"
    },
    {
      link: "#",
      head: "Spooderman or superman",
      description: "Who is better?"
    },
    {
      link: "#",
      head: "Spooderman or superman",
      description: "Who is better?"
    }
  ],
  [
    {
      link: "#",
      head: "Kejriwal vs Modi",
      description: "Who would win the polls?"
    },
    {
      link: "#",
      head: "Spooderman or superman",
      description: "Who is better?"
    },
    {
      link: "#",
      head: "Spooderman or superman",
      description: "Who is better?"
    }
  ]

];

var VoteView = React.createClass({
  render: function(){
    var Voterows = this.props.votes.map(
      function(voteRow,index){
        return (<VoteRow voteRow = {voteRow} key={index} />);
      }
    );
    return(
      <div className="container">
          {Voterows}
      </div>
    );
  }
});

var VoteRow = React.createClass({
  render: function(){
    var votes = this.props.voteRow.map(
      function(vote,index){
        return (<Vote key = {index} vote = {vote}/>)
      }
    )
    return(
      <div className="row text-center">
        {votes}
      </div>
    )
  }
});

var Vote = React.createClass({
  render: function(){
    return (
      <div className="col-sm-3 vote-item">
        <a className="text-muted" href={this.props.vote.link}>
          <h4>{this.props.vote.head}</h4>
          <div className="vote-caption">
            <p class="small-text">{this.props.vote.description}</p>
          </div>
        </a>
      </div>
    )
  }
});

ReactDOM.render(<VoteView votes={votes} />, document.getElementById("RecentVotes"))
